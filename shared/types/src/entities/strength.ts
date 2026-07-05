// ── Core strength types ───────────────────────────────────────────

export interface Strength {
  id: number;
  description: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

// ── API response shapes ───────────────────────────────────────────

export interface StrengthPagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface StrengthListResponse {
  success: boolean;
  status: number;
  message: string;
  data: Strength[];
  pagination: StrengthPagination;
  timestamp: string;
}

export interface StrengthDetailResponse {
  success: boolean;
  status: number;
  message: string;
  data: Strength;
  timestamp: string;
}

export interface StrengthMutationResponse {
  success: boolean;
  status: number;
  message: string;
  data: Strength;
  timestamp: string;
}

// ── Query / request params ────────────────────────────────────────

export interface StrengthQueryParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  keyword?: string;
}

export interface CreateStrengthRequest {
  description: string;
  sort_order: number;
}

export type UpdateStrengthRequest = Partial<CreateStrengthRequest>;
