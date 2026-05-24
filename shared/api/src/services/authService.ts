import { apiClient } from '../client';
import { AuthLoginResponse, Login2faRequest, Verify2faRequest } from 'shared-types';

export class AuthService {
  private readonly basePath = '/auth';

  /**
   * Step 1: Initiate 2FA challenge - sends OTP to email
   * POST /api/v1/auth/login/2fa
   * Returns 204 on success
   */
  async initiate2fa(data: Login2faRequest): Promise<void> {
    await apiClient.post<void>(`${this.basePath}/login/2fa`, data);
  }

  /**
   * Step 2: Verify OTP and complete login
   * POST /api/v1/auth/verify/2fa
   * Returns 200 with tokens and user data
   */
  async verify2fa(data: Verify2faRequest): Promise<AuthLoginResponse> {
    return apiClient.post<AuthLoginResponse>(`${this.basePath}/verify/2fa`, data);
  }
}

export const authService = new AuthService();
