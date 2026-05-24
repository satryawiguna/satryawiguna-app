// ── Core admin user types ─────────────────────────────────────────

export interface AdminUser {
  id: number;
  name: string;
  email: string;
  phone: string;
  avatar_url: string;
  created_at: string;
  updated_at: string;
}

// ── API response shapes ───────────────────────────────────────────

export interface AdminUserPagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface AdminUserListResponse {
  success: boolean;
  status: number;
  message: string;
  data: AdminUser[];
  pagination: AdminUserPagination;
  timestamp: string;
}

export interface AdminUserDetailResponse {
  success: boolean;
  status: number;
  message: string;
  data: AdminUser;
  timestamp: string;
}

export interface AdminUserMutationResponse {
  success: boolean;
  status: number;
  message: string;
  data: AdminUser;
  timestamp: string;
}

// ── Query / request params ────────────────────────────────────────

export interface AdminUserQueryParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  keyword?: string;
}

export interface CreateAdminUserRequest {
  name: string;
  email: string;
  phone: string;
  avatar_url: string;
  password: string;
}

export interface UpdateAdminUserRequest {
  name: string;
  phone: string;
  avatar_url: string;
}
