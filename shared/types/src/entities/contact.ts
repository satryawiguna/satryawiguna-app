/**
 * Contact entity types
 */

export interface SendContactRequest {
  identity: string;
  email_address: string;
  transmission: string;
}

export interface SendContactResponse {
  success: boolean;
  status: number;
  message: string;
  data: null;
  timestamp: string;
}
