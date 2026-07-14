import { apiClient } from '../client';
import type { SubscribeRequest, SubscribeResponse } from 'shared-types';

export class SubscriptionService {
  private readonly basePath = '/subscriptions';

  /**
   * Subscribe an email to the newsletter
   * POST /api/v1/subscriptions
   */
  async subscribe(data: SubscribeRequest): Promise<SubscribeResponse> {
    return apiClient.post<SubscribeResponse>(this.basePath, data);
  }
}

export const subscriptionService = new SubscriptionService();
