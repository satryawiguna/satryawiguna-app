import { apiClient } from '../client';
import type { SettingResponse, UpdateSettingRequest } from 'shared-types';

export class SettingService {
  private readonly basePath = '/admin/settings';

  async getSetting(): Promise<SettingResponse> {
    return apiClient.get<SettingResponse>(this.basePath);
  }

  async updateSetting(data: UpdateSettingRequest): Promise<SettingResponse> {
    return apiClient.put<SettingResponse>(this.basePath, data);
  }
}

export const settingService = new SettingService();
