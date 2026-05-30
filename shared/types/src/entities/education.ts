// ── Core education types ──────────────────────────────────────────

export interface Education {
  id: number;
  degree: string;
  institution: string;
  start_year: number;
  end_year: number | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

// ── API response shapes ───────────────────────────────────────────

export interface EducationPagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface EducationListResponse {
  success: boolean;
  status: number;
  message: string;
  data: Education[];
  pagination: EducationPagination;
  timestamp: string;
}

export interface EducationDetailResponse {
  success: boolean;
  status: number;
  message: string;
  data: Education;
  timestamp: string;
}

export interface EducationMutationResponse {
  success: boolean;
  status: number;
  message: string;
  data: Education;
  timestamp: string;
}

// ── Query / request params ────────────────────────────────────────

export interface EducationQueryParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  keyword?: string;
}

export interface CreateEducationRequest {
  degree: string;
  institution: string;
  start_year: number;
  end_year: number | null;
  sort_order: number;
}

export type UpdateEducationRequest = Partial<CreateEducationRequest>;
