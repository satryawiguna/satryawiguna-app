import { User } from 'shared-types';

/**
 * Domain entity for Dashboard statistics
 */
export interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  totalRevenue: number;
  growth: number;
}

/**
 * Domain entity for Admin User with additional fields
 */
export interface AdminUser extends User {
  permissions: string[];
  lastLogin?: Date;
}
