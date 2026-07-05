// ── Experience skill (nested) ─────────────────────────────────────

export interface ExperienceSkill {
  id: number;
  name: string;
}

// ── Employment type ───────────────────────────────────────────────

export type EmploymentType = 'FULL_TIME' | 'PART_TIME' | 'CONTRACT' | 'FREELANCE' | 'INTERNSHIP';

// ── Core experience types ─────────────────────────────────────────

export interface Experience {
  id: number;
  title: string;
  company: string;
  employment_type: EmploymentType;
  description: string;
  start_date: string;
  end_date: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface ExperienceDetail extends Experience {
  skills: ExperienceSkill[];
}

// ── API response shapes ───────────────────────────────────────────

export interface ExperiencePagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface ExperienceListResponse {
  success: boolean;
  status: number;
  message: string;
  data: Experience[];
  pagination: ExperiencePagination;
  timestamp: string;
}

export interface ExperienceDetailResponse {
  success: boolean;
  status: number;
  message: string;
  data: ExperienceDetail;
  timestamp: string;
}

export interface ExperienceMutationResponse {
  success: boolean;
  status: number;
  message: string;
  data: ExperienceDetail;
  timestamp: string;
}

// ── Public list response (no pagination) ─────────────────────────

export interface PublicExperienceListResponse {
  success: boolean;
  status: number;
  message: string;
  data: ExperienceDetail[];
  timestamp: string;
}

// ── Query / request params ────────────────────────────────────────

export interface ExperienceQueryParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  keyword?: string;
}

export interface CreateExperienceRequest {
  title: string;
  company: string;
  employment_type: EmploymentType;
  description: string;
  start_date: string;
  end_date: string | null;
  sort_order: number;
  skill_ids: number[];
}

export interface UpdateExperienceRequest extends Partial<CreateExperienceRequest> {}
