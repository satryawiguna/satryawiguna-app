import axios from 'axios';
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { AuthData, AUTH_DATA_DEFAULTS } from 'shared-types';

const AUTH_STORAGE_KEY = 'auth-data';
const AUTH_COOKIE = 'auth-token';

type QueueEntry = {
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
};

export class ApiClient {
  private instance: AxiosInstance;
  private isRefreshing = false;
  private failedQueue: QueueEntry[] = [];

  constructor(baseURL: string = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api') {
    this.instance = axios.create({
      baseURL,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  // ── Interceptors ─────────────────────────────────────────────

  private setupInterceptors(): void {
    this.instance.interceptors.request.use(
      (config) => {
        const token = this.getAccessToken();
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    this.instance.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => this.handleResponseError(error)
    );
  }

  // ── 401 Handler ──────────────────────────────────────────────

  private async handleResponseError(error: AxiosError): Promise<AxiosResponse> {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
      headers: Record<string, string>;
    };

    // Only attempt refresh on 401, not on the refresh endpoint itself
    if (
      error.response?.status !== 401 ||
      originalRequest._retry ||
      originalRequest.url?.includes('/auth/refresh')
    ) {
      return Promise.reject(error);
    }

    // If already refreshing, queue this request
    if (this.isRefreshing) {
      return new Promise<AxiosResponse>((resolve, reject) => {
        this.failedQueue.push({
          resolve: (token: string) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(this.instance(originalRequest));
          },
          reject,
        });
      });
    }

    originalRequest._retry = true;
    this.isRefreshing = true;

    try {
      const newToken = await this.refreshAccessToken();

      // Process queued requests
      this.failedQueue.forEach((entry) => entry.resolve(newToken));
      this.failedQueue = [];

      // Retry original request
      originalRequest.headers.Authorization = `Bearer ${newToken}`;
      return this.instance(originalRequest);
    } catch (refreshError) {
      // Refresh failed — reject all queued, clear auth, redirect
      this.failedQueue.forEach((entry) => entry.reject(refreshError));
      this.failedQueue = [];
      this.clearAuthAndRedirect();
      return Promise.reject(refreshError);
    } finally {
      this.isRefreshing = false;
    }
  }

  // ── Token helpers ────────────────────────────────────────────

  private getAccessToken(): string | null {
    return this.readAuthData()?.accessToken ?? null;
  }

  private getRefreshToken(): string | null {
    return this.readAuthData()?.refreshToken ?? null;
  }

  private readAuthData(): AuthData | null {
    if (typeof window === 'undefined') return null;
    try {
      const raw = localStorage.getItem(AUTH_STORAGE_KEY);
      return raw ? (JSON.parse(raw) as AuthData) : null;
    } catch {
      return null;
    }
  }

  private writeAuthData(data: AuthData): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(data));
  }

  private setAuthCookie(token: string): void {
    if (typeof window === 'undefined') return;
    document.cookie = `${AUTH_COOKIE}=${token}; path=/; SameSite=Lax`;
  }

  private clearAuthCookie(): void {
    if (typeof window === 'undefined') return;
    document.cookie = `${AUTH_COOKIE}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
  }

  // ── Token refresh ────────────────────────────────────────────

  private async refreshAccessToken(): Promise<string> {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await this.instance.post<{
      data: {
        accessToken: string;
        refreshToken: string;
        tokenType?: string;
        expiresIn?: string;
        refreshExpiresIn?: string;
        user?: any;
      };
    }>('/auth/refresh', { refreshToken });

    const {
      accessToken,
      refreshToken: newRefreshToken,
      tokenType,
      expiresIn,
      refreshExpiresIn,
      user,
    } = response.data.data;

    // Persist new tokens
    const existing = this.readAuthData();
    this.writeAuthData({
      isLogin: true,
      accessToken,
      refreshToken: newRefreshToken,
      tokenType: tokenType ?? existing?.tokenType ?? null,
      expiresIn: expiresIn ?? existing?.expiresIn ?? null,
      refreshExpiresIn: refreshExpiresIn ?? existing?.refreshExpiresIn ?? null,
      user: user ?? existing?.user ?? null,
    });

    // Sync cookie
    this.setAuthCookie(accessToken);

    return accessToken;
  }

  // ── Clear & redirect ─────────────────────────────────────────

  private clearAuthAndRedirect(): void {
    if (typeof window === 'undefined') return;

    this.writeAuthData(AUTH_DATA_DEFAULTS);
    this.clearAuthCookie();

    const currentPath = window.location.pathname + window.location.search;
    window.location.href = `/login?returnUrl=${encodeURIComponent(currentPath)}`;
  }

  // ── Public helpers ───────────────────────────────────────────

  public setAuthData(data: AuthData): void {
    this.writeAuthData(data);
    if (data.accessToken) {
      this.setAuthCookie(data.accessToken);
    }
  }

  public clearAuthData(): void {
    this.writeAuthData(AUTH_DATA_DEFAULTS);
    this.clearAuthCookie();
  }

  // ── HTTP methods ─────────────────────────────────────────────

  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.instance.get(url, config);
    return response.data;
  }

  public async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.instance.post(url, data, config);
    return response.data;
  }

  public async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.instance.put(url, data, config);
    return response.data;
  }

  public async patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.instance.patch(url, data, config);
    return response.data;
  }

  public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.instance.delete(url, config);
    return response.data;
  }

  public getInstance(): AxiosInstance {
    return this.instance;
  }
}

export const apiClient = new ApiClient();
