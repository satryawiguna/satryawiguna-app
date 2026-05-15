import { authRepository } from '../../data/repositories';
import { Verify2faRequest, AuthLoginResponse } from 'shared-types';

/**
 * Use case: Verify 2FA OTP and complete authentication
 */
export class Verify2faUseCase {
  async execute(data: Verify2faRequest): Promise<AuthLoginResponse> {
    return authRepository.verify2fa(data);
  }
}

export const verify2faUseCase = new Verify2faUseCase();
