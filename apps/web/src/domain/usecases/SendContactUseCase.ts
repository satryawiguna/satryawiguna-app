import { contactRepository } from '../../data/repositories';
import type { SendContactRequest, SendContactResponse } from 'shared-types';

/**
 * Use case: Send a contact message
 */
export class SendContactUseCase {
  async execute(data: SendContactRequest): Promise<SendContactResponse> {
    return contactRepository.send(data);
  }
}

export const sendContactUseCase = new SendContactUseCase();
