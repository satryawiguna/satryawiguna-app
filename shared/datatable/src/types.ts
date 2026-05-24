import type { ReactNode } from 'react';

/**
 * Configuration for a single column in the datatable.
 */
export interface DatatableColumn<T> {
  /** Unique key for the column (used as React key and for data access) */
  key: string;
  /** Header label displayed in the table head */
  label: string;
  /** Optional sub-label rendered below the header (e.g. "DATE\nCREATED") */
  subLabel?: string;
  /** Width style value for the column (percentage or px) */
  width?: string;
  /** Text alignment within the column */
  align?: 'left' | 'center' | 'right';
  /** Custom render function for the cell. Receives the row data and row index. */
  render: (row: T, index: number) => ReactNode;
  /** Enable sorting on this column */
  sortable?: boolean;
  /** Header class name override */
  headerClassName?: string;
  /** Cell class name override */
  cellClassName?: string;
}

/**
 * Pagination state for the datatable.
 */
export interface DatatablePagination {
  /** Current page number (1-based) */
  currentPage: number;
  /** Total number of pages */
  totalPages: number;
  /** Total number of records across all pages */
  totalItems: number;
  /** Number of items currently displayed */
  displayedItems: number;
  /** Callback when page changes */
  onPageChange: (page: number) => void;
}

/**
 * Props for the Datatable component.
 */
export interface DatatableProps<T> {
  /** Array of data rows */
  data: T[];
  /** Column definitions */
  columns: DatatableColumn<T>[];
  /** Unique key accessor for each row (defaults to 'id') */
  rowKey?: keyof T | ((row: T) => string | number);
  /** Search placeholder text */
  searchPlaceholder?: string;
  /** Current search value */
  searchValue?: string;
  /** Callback when search value changes */
  onSearchChange?: (value: string) => void;
  /** Pagination configuration. Omit to hide pagination. */
  pagination?: DatatablePagination;
  /** Toolbar action buttons rendered next to search */
  toolbarActions?: ReactNode;
  /** Custom empty state */
  emptyState?: ReactNode;
  /** Loading state */
  loading?: boolean;
  /** Additional CSS class for the wrapper */
  className?: string;
}
