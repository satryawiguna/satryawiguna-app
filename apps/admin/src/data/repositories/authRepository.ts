import { authService } from 'shared-api';
import { Login2faRequest, Verify2faRequest, AuthLoginResponse } from 'shared-types';

/**
 * Auth Repository - handles authentication data operations
 */
export class AuthRepository {
  async initiate2fa(data: Login2faRequest): Promise<void> {
    return authService.initiate2fa(data);
  }

  async verify2fa(data: Verify2faRequest): Promise<AuthLoginResponse> {
    return authService.verify2fa(data);
  }
}

export const authRepository = new AuthRepository();
