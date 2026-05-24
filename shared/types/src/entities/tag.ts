// ── Core tag types ────────────────────────────────────────────────

export interface Tag {
  id: number;
  name: string;
  slug: string;
}

// ── API response shapes ───────────────────────────────────────────

export interface TagPagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface TagListResponse {
  success: boolean;
  status: number;
  message: string;
  data: Tag[];
  pagination: TagPagination;
  timestamp: string;
}

export interface TagDetailResponse {
  success: boolean;
  status: number;
  message: string;
  data: Tag;
  timestamp: string;
}

export interface TagMutationResponse {
  success: boolean;
  status: number;
  message: string;
  data: Tag;
  timestamp: string;
}

// ── Query / request params ────────────────────────────────────────

export interface TagQueryParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  keyword?: string;
}

export interface CreateTagRequest {
  name: string;
  slug: string;
}

export interface UpdateTagRequest {
  name: string;
  slug: string;
}
