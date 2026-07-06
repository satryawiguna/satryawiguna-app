/**
 * Domain entity for Blog Post (matches API + computed UI fields)
 */
export interface BlogCategory {
  id: number;
  name: string;
  slug: string;
  type: string;
  /** Computed display label (uppercased name) */
  label: string;
  /** Computed deterministic background color */
  bgColor: string;
  /** Computed deterministic text color */
  textColor: string;
}

export interface BlogTag {
  id: number;
  name: string;
  slug: string;
}

export type BlogPostStatus = 'draft' | 'published' | 'archived';

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  thumbnail_url: string | null;
  image_url: string | null;
  image: string | null;
  status: BlogPostStatus;
  author_id: number;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  /** Formatted publish date (e.g. "OCT 24, 2023") */
  date: string;
  /** Computed reading time (e.g. "12 min read") */
  readingTime: string;
  categories: BlogCategory[];
  tags: BlogTag[];
}

export interface BlogPagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

/**
 * Domain entity for Project (matches API response shape)
 */
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

export interface ProjectPagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

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
  images: ProjectImage[];
  skills: ProjectSkill[];
  categories: ProjectCategory[];
}

export interface ProjectsListData {
  data: Project[];
  pagination: ProjectPagination;
}
