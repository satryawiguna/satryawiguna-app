import { settingRepository } from '../../data/repositories';
import type { SettingResponse } from 'shared-types';

export class GetSettingUseCase {
  async execute(): Promise<SettingResponse> {
    return settingRepository.getSetting();
  }
}

export const getSettingUseCase = new GetSettingUseCase();
