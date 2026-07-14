/**
 * Subscription entity types
 */

export interface SubscribeRequest {
  email: string;
}

export interface SubscribeData {
  email: string;
  email_sent: boolean;
}

export interface SubscribeResponse {
  success: boolean;
  status: number;
  message: string;
  data: SubscribeData;
  timestamp: string;
}

export interface SubscriptionItem {
  id: number;
  email: string;
  verified_at: string | null;
  subscribed_at: string;
  created_at: string;
  updated_at: string;
}
