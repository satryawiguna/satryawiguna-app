import { subscriptionRepository } from '../../data/repositories';
import type { SubscribeRequest, SubscribeResponse } from 'shared-types';

/**
 * Use case: Subscribe an email to the newsletter
 */
export class SubscribeUseCase {
  async execute(data: SubscribeRequest): Promise<SubscribeResponse> {
    return subscriptionRepository.subscribe(data);
  }
}

export const subscribeUseCase = new SubscribeUseCase();
