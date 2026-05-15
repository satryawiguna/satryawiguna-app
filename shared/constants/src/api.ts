/**
 * API Configuration Constants
 */
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api',
  TIMEOUT: 30000,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,
} as const;

/**
 * API Endpoints
 */
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REGISTER: '/auth/register',
    REFRESH: '/auth/refresh',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
  },
  USERS: {
    BASE: '/users',
    ME: '/users/me',
    BY_ID: (id: string) => `/users/${id}`,
  },
  BLOG: {
    BASE: '/blog',
    BY_SLUG: (slug: string) => `/blog/${slug}`,
    BY_TAG: (tag: string) => `/blog/tags/${tag}`,
  },
  PROJECTS: {
    BASE: '/projects',
    FEATURED: '/projects/featured',
    BY_ID: (id: string) => `/projects/${id}`,
  },
  DASHBOARD: {
    STATS: '/dashboard/stats',
    ACTIVITY: '/dashboard/activity',
  },
  MEDIA: {
    BASE: '/media',
  },
} as const;
