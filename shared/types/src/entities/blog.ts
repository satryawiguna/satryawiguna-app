// ── Blog relations ────────────────────────────────────────────────

export interface BlogCategory {
  id: number;
  name: string;
  slug: string;
  type: string;
}

export interface BlogTag {
  id: number;
  name: string;
  slug: string;
}

// ── Core blog types ───────────────────────────────────────────────

export type BlogPostStatus = 'draft' | 'published' | 'archived';

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  thumbnail_url: string | null;
  image_url: string | null;
  status: BlogPostStatus;
  author_id: number;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  categories: BlogCategory[];
  tags: BlogTag[];
}

export interface BlogPostDetail extends BlogPost {
  // Inherits all fields including categories and tags from BlogPost
}

// ── API response shapes ───────────────────────────────────────────

export interface BlogPagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface BlogListResponse {
  success: boolean;
  status: number;
  message: string;
  data: BlogPost[];
  pagination: BlogPagination;
  timestamp: string;
}

export interface BlogDetailResponse {
  success: boolean;
  status: number;
  message: string;
  data: BlogPostDetail;
  timestamp: string;
}

export interface BlogMutationResponse {
  success: boolean;
  status: number;
  message: string;
  data: BlogPostDetail;
  timestamp: string;
}

// ── Query / request params ────────────────────────────────────────

export interface BlogQueryParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  keyword?: string;
  status?: BlogPostStatus;
  author_id?: number;
  category_id?: number;
  tag_id?: number;
}

export interface CreateBlogPostRequest {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  thumbnail_url: string;
  image_url: string;
  status: BlogPostStatus;
  author_id: number;
  category_ids: number[];
  tag_ids: number[];
}

export interface UpdateBlogPostRequest extends Partial<CreateBlogPostRequest> {
  published_at?: string | null;
}

// ── Tag (for form autocomplete) ───────────────────────────────────

export interface BlogTagOption {
  id: number;
  name: string;
  slug: string;
}

export interface BlogTagOptionListResponse {
  success: boolean;
  status: number;
  message: string;
  data: BlogTagOption[];
  timestamp: string;
}
