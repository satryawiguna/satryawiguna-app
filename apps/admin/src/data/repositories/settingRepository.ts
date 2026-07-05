import { settingService } from 'shared-api';
import type { SettingResponse, UpdateSettingRequest } from 'shared-types';

export class SettingRepository {
  async getSetting(): Promise<SettingResponse> {
    return settingService.getSetting();
  }

  async updateSetting(data: UpdateSettingRequest): Promise<SettingResponse> {
    return settingService.updateSetting(data);
  }
}

export const settingRepository = new SettingRepository();
