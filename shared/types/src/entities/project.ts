// ── Project relations ────────────────────────────────────────────

export interface ProjectSkill {
  id: number;
  name: string;
  icon_url: string;
}

export interface ProjectImage {
  id: number;
  image_url: string;
}

export interface ProjectCategory {
  id: number;
  name: string;
  slug: string;
}

// ── Core project types ───────────────────────────────────────────

export interface Project {
  id: number;
  title: string;
  sub_title: string;
  slug: string;
  description: string;
  content: string;
  demo_url: string;
  repository_url: string;
  thumbnail_url: string;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface ProjectDetail extends Project {
  skills: ProjectSkill[];
  images: ProjectImage[];
  categories: ProjectCategory[];
}

// ── API response shapes ──────────────────────────────────────────

export interface ProjectPagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface ProjectListResponse {
  success: boolean;
  status: number;
  message: string;
  data: Project[];
  pagination: ProjectPagination;
  timestamp: string;
}

export interface ProjectDetailResponse {
  success: boolean;
  status: number;
  message: string;
  data: ProjectDetail;
  timestamp: string;
}

export interface ProjectMutationResponse {
  success: boolean;
  status: number;
  message: string;
  data: ProjectDetail;
  timestamp: string;
}

// ── Query / request params ────────────────────────────────────────

export interface ProjectQueryParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  keyword?: string;
  category_id?: number;
  skill_id?: number;
}

export interface CreateProjectRequest {
  title: string;
  sub_title: string;
  slug: string;
  description: string;
  content: string;
  demo_url: string;
  repository_url: string;
  thumbnail_url: string;
  skill_ids: number[];
  image_urls: string[];
  category_ids: number[];
}

export interface UpdateProjectRequest extends Partial<CreateProjectRequest> {
  published_at?: string | null;
}

// ── Skill & Category (for form selects) ──────────────────────────

export interface ProjectSkillOption {
  id: number;
  name: string;
  category?: string;
  level?: number;
  icon_url?: string;
  sort_order?: number;
}

export interface ProjectCategoryOption {
  id: number;
  name: string;
  slug: string;
  type?: string;
}

export interface ProjectSkillOptionListResponse {
  success: boolean;
  status: number;
  message: string;
  data: ProjectSkillOption[];
  timestamp: string;
}

export interface ProjectCategoryOptionListResponse {
  success: boolean;
  status: number;
  message: string;
  data: ProjectCategoryOption[];
  timestamp: string;
}
