import { authRepository } from '../../data/repositories';
import { Login2faRequest } from 'shared-types';

/**
 * Use case: Initiate 2FA login challenge
 * Sends OTP to the provided email address
 */
export class Initiate2faUseCase {
  async execute(data: Login2faRequest): Promise<void> {
    return authRepository.initiate2fa(data);
  }
}

export const initiate2faUseCase = new Initiate2faUseCase();
