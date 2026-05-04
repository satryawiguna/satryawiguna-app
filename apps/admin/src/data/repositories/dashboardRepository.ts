import { apiClient } from 'shared-api';
import { DashboardStats } from '../../domain/entities';

/**
 * Dashboard Repository - handles data operations
 */
export class DashboardRepository {
  private readonly basePath = '/dashboard';

  async getStats(): Promise<DashboardStats> {
    return apiClient.get<DashboardStats>(`${this.basePath}/stats`);
  }

  async getRecentActivity(): Promise<any[]> {
    return apiClient.get<any[]>(`${this.basePath}/activity`);
  }
}

export const dashboardRepository = new DashboardRepository();
