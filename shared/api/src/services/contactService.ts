import axios from 'axios';
import type { SendContactRequest, SendContactResponse } from 'shared-types';

export class ContactService {
  private readonly basePath = '/contact';
  private readonly baseURL: string;

  constructor() {
    const rawUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
    this.baseURL = rawUrl.replace(/\/+$/, '');
  }

  /**
   * Send a contact message (public endpoint, no auth required)
   * POST /api/v1/contact
   */
  async send(data: SendContactRequest): Promise<SendContactResponse> {
    const response = await axios.post<SendContactResponse>(`${this.baseURL}${this.basePath}`, data);
    return response.data;
  }
}

export const contactService = new ContactService();
