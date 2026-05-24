'use client';

import SearchIcon from '@mui/icons-material/Search';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import type { DatatableProps } from './types';

/**
 * A reusable dark-themed datatable component that matches the Satrya Wiguna
 * admin dashboard design system. Supports search, pagination, custom cell
 * rendering, toolbar actions, and loading/empty states.
 */
function getPageNumbers(current: number, total: number): (number | '...')[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  if (current <= 4) return [1, 2, 3, 4, 5, '...', total];
  if (current >= total - 3) return [1, '...', total - 4, total - 3, total - 2, total - 1, total];
  return [1, '...', current - 1, current, current + 1, '...', total];
}

export function Datatable<T>({
  data,
  columns,
  rowKey = 'id' as keyof T,
  searchPlaceholder = 'Filter...',
  searchValue,
  onSearchChange,
  pagination,
  toolbarActions,
  emptyState,
  loading = false,
  className = '',
}: DatatableProps<T>) {
  const getRowKey = (row: T, index: number): string | number => {
    if (typeof rowKey === 'function') {
      return rowKey(row);
    }
    const val = (row as Record<string, unknown>)[rowKey as string];
    return val != null ? String(val) : index;
  };

  return (
    <div
      className={`w-full rounded-lg ${className}`}
      style={{
        background: 'rgba(15,23,42,0.8)',
        border: '1px solid rgba(255,255,255,0.1)',
        backdropFilter: 'blur(6px)',
      }}
    >
      {/* Table Toolbar */}
      {(onSearchChange || toolbarActions) && (
        <div
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-3 sm:px-6 py-4 sm:py-6"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}
        >
          {/* Search */}
          {onSearchChange && (
            <div className="relative w-full sm:max-w-[448px] sm:flex-1">
              <SearchIcon
                sx={{
                  fontSize: 18,
                  color: '#6b7280',
                  position: 'absolute',
                  left: 12,
                  top: '50%',
                  transform: 'translateY(-50%)',
                }}
              />
              <input
                type="text"
                value={searchValue ?? ''}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder={searchPlaceholder}
                className="w-full rounded-[4px] pt-[11px] pb-[10px] pl-[41px] pr-[17px] text-[14px] text-[#dae2fd] outline-none placeholder:text-[#6b7280]"
                style={{
                  background: '#060e20',
                  border: '1px solid rgba(255,255,255,0.1)',
                  fontFamily: 'monospace',
                }}
              />
            </div>
          )}
          {/* Toolbar Actions */}
          {toolbarActions && <div className="flex items-center gap-3">{toolbarActions}</div>}
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px]">
          <thead>
            <tr style={{ background: 'rgba(34,42,61,0.5)' }}>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`px-3 sm:px-6 ${col.subLabel ? 'py-[12px] sm:py-[16px]' : 'py-[14px] sm:py-[22.5px]'} text-[9px] sm:text-[10px] uppercase tracking-[1.5px] sm:tracking-[2px] font-bold font-['Space_Grotesk',sans-serif] ${col.headerClassName ?? ''}`}
                  style={{
                    color: '#94a3b8',
                    width: col.width,
                    textAlign: col.align ?? 'left',
                  }}
                >
                  {col.label}
                  {col.subLabel && (
                    <>
                      <br />
                      {col.subLabel}
                    </>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-3 sm:px-6 py-16 text-center"
                  style={{ color: '#64748b' }}
                >
                  <span className="text-[14px] font-mono">Loading...</span>
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-3 sm:px-6 py-16 text-center"
                  style={{ color: '#64748b' }}
                >
                  {emptyState ?? <span className="text-[14px] font-mono">No results found</span>}
                </td>
              </tr>
            ) : (
              data.map((row, idx) => (
                <tr
                  key={getRowKey(row, idx)}
                  style={{
                    borderTop: idx > 0 ? '1px solid rgba(255,255,255,0.05)' : undefined,
                  }}
                  className="hover:bg-white/[0.02] transition-colors"
                >
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className={`px-3 sm:px-6 py-[14px] sm:py-[22px] ${col.cellClassName ?? ''}`}
                      style={{ textAlign: col.align ?? 'left' }}
                    >
                      {col.render(row, idx)}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination && (
        <div
          className="flex flex-col sm:flex-row items-center sm:justify-between gap-3 px-3 sm:px-6 py-4"
          style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}
        >
          <span
            className="text-[11px] sm:text-[12px] font-['Space_Grotesk',sans-serif] text-center sm:text-left"
            style={{ color: '#64748b' }}
          >
            Showing {pagination.displayedItems} of {pagination.totalItems} results
          </span>
          <div className="flex items-center gap-0.5">
            <button
              onClick={() => pagination.onPageChange(Math.max(1, pagination.currentPage - 1))}
              disabled={pagination.currentPage === 1}
              className="flex items-center p-[4px] rounded-[2px] border-none outline-none bg-transparent cursor-pointer hover:bg-white/10 transition-colors disabled:opacity-30"
            >
              <ChevronLeftIcon sx={{ fontSize: 16, color: '#94a3b8' }} />
            </button>
            {getPageNumbers(pagination.currentPage, pagination.totalPages).map((page, idx) =>
              page === '...' ? (
                <span
                  key={`ellipsis-${idx}`}
                  className="px-1.5 text-[12px] font-['Space_Grotesk',sans-serif] select-none"
                  style={{ color: '#64748b' }}
                >
                  ...
                </span>
              ) : (
                <button
                  key={page}
                  onClick={() => pagination.onPageChange(page as number)}
                  className="min-w-[28px] px-1.5 py-1 rounded-[2px] text-[12px] font-['Space_Grotesk',sans-serif] border-none outline-none cursor-pointer transition-colors"
                  style={
                    page === pagination.currentPage
                      ? { background: 'rgba(255,255,255,0.08)', color: '#dae2fd' }
                      : { background: 'transparent', color: '#64748b' }
                  }
                >
                  {page}
                </button>
              )
            )}
            <button
              onClick={() =>
                pagination.onPageChange(Math.min(pagination.totalPages, pagination.currentPage + 1))
              }
              disabled={pagination.currentPage === pagination.totalPages}
              className="flex items-center p-[4px] rounded-[2px] border-none outline-none bg-transparent cursor-pointer hover:bg-white/10 transition-colors disabled:opacity-30"
            >
              <ChevronRightIcon sx={{ fontSize: 16, color: '#94a3b8' }} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
