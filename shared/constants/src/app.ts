/**
 * Application Configuration
 */
export const APP_CONFIG = {
  NAME: 'Satryawiguna',
  VERSION: '1.0.0',
  DESCRIPTION: 'Full Stack Developer Portfolio',
  AUTHOR: 'Satryawiguna',
  EMAIL: 'contact@satryawiguna.me',
} as const;

/**
 * Admin Configuration
 */
export const ADMIN_CONFIG = {
  NAME: 'Admin Dashboard',
  VERSION: '1.0.0',
  DESCRIPTION: 'Admin dashboard for managing application',
} as const;

/**
 * Pagination
 */
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100,
  PAGE_SIZES: [10, 25, 50, 100] as const,
} as const;

/**
 * Local Storage Keys
 */
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'authToken',
  REFRESH_TOKEN: 'refreshToken',
  USER_PREFERENCES: 'userPreferences',
  THEME: 'theme',
  LANGUAGE: 'language',
} as const;

/**
 * Date Formats
 */
export const DATE_FORMATS = {
  SHORT: 'MM/dd/yyyy',
  LONG: 'MMMM dd, yyyy',
  FULL: 'MMMM dd, yyyy HH:mm:ss',
  TIME: 'HH:mm:ss',
  ISO: "yyyy-MM-dd'T'HH:mm:ss.SSSxxx",
} as const;

/**
 * User Roles
 */
export const USER_ROLES = {
  ADMIN: 'admin',
  USER: 'user',
  GUEST: 'guest',
} as const;

/**
 * Routes
 */
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
  SETTINGS: '/settings',
  ABOUT: '/about',
  CONTACT: '/contact',
  BLOG: '/blog',
  PROJECTS: '/projects',
} as const;
