import { settingRepository } from '../../data/repositories';
import type { SettingResponse, UpdateSettingRequest } from 'shared-types';

export class UpdateSettingUseCase {
  async execute(data: UpdateSettingRequest): Promise<SettingResponse> {
    return settingRepository.updateSetting(data);
  }
}

export const updateSettingUseCase = new UpdateSettingUseCase();
