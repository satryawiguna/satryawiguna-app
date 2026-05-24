// ── Core category types ───────────────────────────────────────────

export interface Category {
  id: number;
  name: string;
  slug: string;
  type: string;
}

// ── API response shapes ───────────────────────────────────────────

export interface CategoryPagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface CategoryListResponse {
  success: boolean;
  status: number;
  message: string;
  data: Category[];
  pagination: CategoryPagination;
  timestamp: string;
}

export interface CategoryDetailResponse {
  success: boolean;
  status: number;
  message: string;
  data: Category;
  timestamp: string;
}

export interface CategoryMutationResponse {
  success: boolean;
  status: number;
  message: string;
  data: Category;
  timestamp: string;
}

// ── Query / request params ────────────────────────────────────────

export interface CategoryQueryParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  keyword?: string;
  type?: string;
}

export interface CreateCategoryRequest {
  name: string;
  slug: string;
  type: string;
}

export interface UpdateCategoryRequest {
  name: string;
  slug: string;
  type: string;
}
