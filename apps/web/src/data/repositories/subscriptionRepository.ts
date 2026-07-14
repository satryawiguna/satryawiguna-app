import { subscriptionService } from 'shared-api';
import type { SubscribeRequest, SubscribeResponse } from 'shared-types';

export class SubscriptionRepository {
  async subscribe(data: SubscribeRequest): Promise<SubscribeResponse> {
    return subscriptionService.subscribe(data);
  }
}

export const subscriptionRepository = new SubscriptionRepository();
