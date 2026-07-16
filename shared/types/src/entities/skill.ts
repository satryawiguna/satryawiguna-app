// ── Skill category (nested in detail response) ────────────────────

export interface SkillCategory {
  id: number;
  name: string;
  slug: string;
  type: string;
}

// ── Core skill types ──────────────────────────────────────────────

export interface Skill {
  id: number;
  name: string;
  category_id: number;
  level: number;
  icon_url: string;
  sort_order: number;
  category: SkillCategory | null;
  created_at: string;
  updated_at: string;
}

// ── API response shapes ───────────────────────────────────────────

export interface SkillPagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface SkillListResponse {
  success: boolean;
  status: number;
  message: string;
  data: Skill[];
  pagination: SkillPagination;
  timestamp: string;
}

export interface SkillDetailResponse {
  success: boolean;
  status: number;
  message: string;
  data: Skill;
  timestamp: string;
}

export interface SkillMutationResponse {
  success: boolean;
  status: number;
  message: string;
  data: Skill;
  timestamp: string;
}

// ── Query / request params ────────────────────────────────────────

export interface SkillQueryParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  keyword?: string;
  category_id?: number;
  level?: number;
  level_operator?: 'gte' | 'lte' | 'gt' | 'lt' | 'eq';
}

export interface CreateSkillRequest {
  name: string;
  category_id: number;
  level: number;
  icon_url: string;
  sort_order: number;
}

export interface UpdateSkillRequest {
  name: string;
  category_id: number;
  level: number;
  icon_url: string;
  sort_order: number;
}
