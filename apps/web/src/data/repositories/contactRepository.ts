import { contactService } from 'shared-api';
import type { SendContactRequest, SendContactResponse } from 'shared-types';

export class ContactRepository {
  async send(data: SendContactRequest): Promise<SendContactResponse> {
    return contactService.send(data);
  }
}

export const contactRepository = new ContactRepository();
