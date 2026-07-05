// ── Core career impact types ───────────────────────────────────────

export interface CareerImpact {
  id: number;
  title: string;
  description: string;
  quote: string;
  icon_url: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

// ── API response shapes ───────────────────────────────────────────

export interface CareerImpactPagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface CareerImpactListResponse {
  success: boolean;
  status: number;
  message: string;
  data: CareerImpact[];
  pagination: CareerImpactPagination;
  timestamp: string;
}

export interface CareerImpactDetailResponse {
  success: boolean;
  status: number;
  message: string;
  data: CareerImpact;
  timestamp: string;
}

export interface CareerImpactMutationResponse {
  success: boolean;
  status: number;
  message: string;
  data: CareerImpact;
  timestamp: string;
}

// ── Public list response (no pagination) ──────────────────────────

export interface CareerImpactPublicListResponse {
  success: boolean;
  status: number;
  message: string;
  data: CareerImpact[];
  timestamp: string;
}

// ── Query / request params ────────────────────────────────────────

export interface CareerImpactQueryParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  keyword?: string;
}

export interface CreateCareerImpactRequest {
  title: string;
  description: string;
  quote: string;
  icon_url: string;
  sort_order: number;
}

export type UpdateCareerImpactRequest = Partial<CreateCareerImpactRequest>;
