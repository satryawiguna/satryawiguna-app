export interface AuthRole {
  id: number;
  name: string;
}

export interface AuthUser {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
  roles: AuthRole[];
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresIn: string;
  refreshExpiresIn: string;
}

export interface AuthLoginResponse {
  success: boolean;
  status: number;
  message: string;
  data: AuthTokens & { user: AuthUser };
  timestamp: string;
}

export interface Login2faRequest {
  email: string;
}

export interface Verify2faRequest {
  email: string;
  otp: string;
}

export interface AuthData {
  isLogin: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  tokenType: string | null;
  expiresIn: string | null;
  refreshExpiresIn: string | null;
  user: AuthUser | null;
}

export const AUTH_DATA_DEFAULTS: AuthData = {
  isLogin: false,
  accessToken: null,
  refreshToken: null,
  tokenType: null,
  expiresIn: null,
  refreshExpiresIn: null,
  user: null,
};
