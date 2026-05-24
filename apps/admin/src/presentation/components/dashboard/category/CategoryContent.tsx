'use client';

import { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import TuneIcon from '@mui/icons-material/Tune';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import AddIcon from '@mui/icons-material/Add';
import { Datatable } from 'shared-datatable';
import type { DatatableColumn } from 'shared-datatable';
import type { Category, CreateCategoryRequest, UpdateCategoryRequest } from 'shared-types';
import {
  useCategories,
  useCategoryDetail,
  useCreateCategory,
  useUpdateCategory,
  useDeleteCategory,
} from '@/presentation/hooks';
import { CategoryDrawer } from './CategoryDrawer';
import { ConfirmDialog } from '@/presentation/components/common';

// ── Type badge ────────────────────────────────────────────────────

const TYPE_LABELS: Record<string, string> = {
  PROJECT: 'Project',
  BLOG_POST: 'Blog Post',
  SKILL: 'Skill',
};

const TYPE_COLORS: Record<string, string> = {
  PROJECT: '#22d3ee',
  BLOG_POST: '#4edea3',
  SKILL: '#facc15',
};

function TypeBadge({ type }: { type: string }) {
  const color = TYPE_COLORS[type] ?? '#94a3b8';
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px]"
      style={{
        background: `${color}18`,
        border: `1px solid ${color}30`,
        color,
      }}
    >
      <span className="size-1.5 rounded-full" style={{ background: color }} />
      {TYPE_LABELS[type] ?? type}
    </span>
  );
}

// ── Filter popup ──────────────────────────────────────────────────

const ALL_TYPES = ['PROJECT', 'BLOG_POST', 'SKILL'] as const;

interface FilterPopupProps {
  onClose: () => void;
  onApply: (type: string | null) => void;
  activeType: string | null;
}

function FilterPopup({ onClose, onApply, activeType }: FilterPopupProps) {
  const [selectedType, setSelectedType] = useState<string | null>(activeType);

  return (
    <div
      className="absolute right-0 top-full mt-2 z-50 w-[200px] rounded-lg p-4 sm:p-5 flex flex-col gap-4"
      style={{
        background: '#0d1526',
        border: '1px solid rgba(255,255,255,0.1)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
      }}
    >
      <div className="flex items-center justify-between">
        <span
          className="text-[11px] font-['Space_Grotesk',sans-serif] font-bold uppercase tracking-[1.5px]"
          style={{ color: '#94a3b8' }}
        >
          Filter by Type
        </span>
        <button
          onClick={onClose}
          className="border-none outline-none bg-transparent cursor-pointer p-1 hover:opacity-70 transition-opacity"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path
              d="M1 1L11 11M11 1L1 11"
              stroke="#64748b"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      <div className="flex flex-col gap-2">
        {ALL_TYPES.map((t) => {
          const color = TYPE_COLORS[t];
          const isActive = selectedType === t;
          return (
            <button
              key={t}
              type="button"
              onClick={() => setSelectedType(isActive ? null : t)}
              className="flex items-center gap-2 px-3 py-2 rounded-[2px] border-none outline-none cursor-pointer transition-colors w-full text-left"
              style={{
                background: isActive ? `${color}18` : 'transparent',
                border: isActive ? `1px solid ${color}30` : '1px solid transparent',
              }}
            >
              <span className="size-2 rounded-full shrink-0" style={{ background: color }} />
              <span
                className="text-[12px] font-['Space_Grotesk',sans-serif]"
                style={{ color: isActive ? color : '#94a3b8' }}
              >
                {TYPE_LABELS[t]}
              </span>
            </button>
          );
        })}
      </div>

      <div className="flex gap-2 pt-3 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        <button
          onClick={() => {
            setSelectedType(null);
            onApply(null);
            onClose();
          }}
          className="flex-1 py-2 rounded-[2px] text-[12px] font-['Space_Grotesk',sans-serif] border-none outline-none cursor-pointer hover:opacity-80 transition-opacity"
          style={{ background: 'rgba(255,255,255,0.05)', color: '#64748b' }}
        >
          Clear
        </button>
        <button
          onClick={() => {
            onApply(selectedType);
            onClose();
          }}
          className="flex-1 py-2 rounded-[2px] text-[12px] font-['Space_Grotesk',sans-serif] border-none outline-none cursor-pointer hover:opacity-90 transition-opacity"
          style={{ background: '#00f0ff', color: '#006970' }}
        >
          Apply
        </button>
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────

export default function CategoryContent() {
  // ── Data / pagination state ───────────────────────────────────
  const { categories, pagination, isLoading, isFetching, setPage, setKeyword, setType, refetch } =
    useCategories();

  // ── Drawer state ──────────────────────────────────────────────
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editCategoryId, setEditCategoryId] = useState<number | null>(null);

  // ── Fetch category detail when editing ────────────────────────
  const { data: editDetailResponse, isLoading: isLoadingDetail } =
    useCategoryDetail(editCategoryId);
  const editData: Category | null = editDetailResponse?.data ?? null;

  // ── Delete state ──────────────────────────────────────────────
  const [deleteTarget, setDeleteTarget] = useState<Category | null>(null);

  // ── Local filter state ────────────────────────────────────────
  const [search, setSearch] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [filterType, setFilterType] = useState<string | null>(null);
  const filterRef = useRef<HTMLDivElement>(null);

  // Debounce keyword to the hook
  useEffect(() => {
    const timer = setTimeout(() => setKeyword(search), 300);
    return () => clearTimeout(timer);
  }, [search, setKeyword]);

  // Close filter popup on outside click
  useEffect(() => {
    if (!filterOpen) return;
    const handler = (e: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) {
        setFilterOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [filterOpen]);

  // ── Mutations ─────────────────────────────────────────────────
  const closeDrawer = useCallback(() => {
    setDrawerOpen(false);
    setEditCategoryId(null);
  }, []);

  const { mutateAsync: createCategory, isPending: isCreating } = useCreateCategory(closeDrawer);
  const { mutateAsync: updateCategory, isPending: isUpdating } = useUpdateCategory(
    editCategoryId ?? 0,
    closeDrawer
  );
  const { mutateAsync: deleteCategory, isPending: isDeleting } = useDeleteCategory(() => {
    setDeleteTarget(null);
    refetch();
  });

  const handleSubmit = useCallback(
    async (values: CreateCategoryRequest | UpdateCategoryRequest) => {
      if (editCategoryId) {
        await updateCategory(values as UpdateCategoryRequest);
      } else {
        await createCategory(values as CreateCategoryRequest);
      }
    },
    [editCategoryId, createCategory, updateCategory]
  );

  // ── Columns ───────────────────────────────────────────────────
  const columns: DatatableColumn<Category>[] = useMemo(
    () => [
      {
        key: 'name',
        label: 'CATEGORY NAME',
        width: '38%',
        render: (row) => (
          <div className="flex flex-col">
            <span
              className="text-[14px] font-['Space_Grotesk',sans-serif]"
              style={{ color: '#dae2fd' }}
            >
              {row.name}
            </span>
          </div>
        ),
      },
      {
        key: 'slug',
        label: 'SLUG',
        width: '24%',
        render: (row) => (
          <span className="text-[12px] font-mono leading-snug block" style={{ color: '#94a3b8' }}>
            /{row.slug}
          </span>
        ),
      },
      {
        key: 'type',
        label: 'TYPE',
        width: '22%',
        render: (row) => <TypeBadge type={row.type} />,
      },
      {
        key: 'actions',
        label: 'ACTIONS',
        width: '16%',
        align: 'right',
        render: (row) => (
          <div className="flex items-center justify-end gap-1">
            <button
              onClick={() => {
                setEditCategoryId(row.id);
                setDrawerOpen(true);
              }}
              className="p-[8px] border-none outline-none bg-transparent cursor-pointer hover:opacity-70 transition-opacity"
              title="Edit"
            >
              <EditIcon sx={{ fontSize: 14, color: '#94a3b8' }} />
            </button>
            <button
              onClick={() => setDeleteTarget(row)}
              className="p-[8px] border-none outline-none bg-transparent cursor-pointer hover:opacity-70 transition-opacity"
              title="Delete"
            >
              <DeleteOutlineIcon sx={{ fontSize: 14, color: '#94a3b8' }} />
            </button>
          </div>
        ),
      },
    ],
    []
  );

  return (
    <div className="min-h-screen bg-[#020617] p-4 sm:p-6 md:p-8 lg:p-10">
      <div className="max-w-[1200px] mx-auto flex flex-col gap-8 md:gap-20">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <circle cx="5" cy="5" r="4" stroke="#00dbe9" strokeWidth="1.5" />
                <circle cx="5" cy="5" r="1.5" fill="#00dbe9" />
              </svg>
              <span
                className="text-[10px] sm:text-[12px] uppercase tracking-[2.4px] font-['Space_Grotesk',sans-serif]"
                style={{ color: '#00dbe9' }}
              >
                ADMINISTRATION SHELL
              </span>
            </div>
            <h1
              className="text-[36px] sm:text-[48px] md:text-[64px] font-bold leading-tight tracking-[-1.28px] font-['Space_Grotesk',sans-serif]"
              style={{ color: '#dae2fd' }}
            >
              Category Management
            </h1>
            <p
              className="text-[14px] md:text-[18px] leading-[1.7] max-w-[620px]"
              style={{ color: '#94a3b8' }}
            >
              Organize your content taxonomy. Create and manage categories for projects, blog posts,
              and skills across your platform.
            </p>
          </div>
          <button
            onClick={() => {
              setEditCategoryId(null);
              setDrawerOpen(true);
            }}
            className="flex items-center justify-center gap-2 rounded px-6 py-3 md:py-4 text-[12px] font-['Space_Grotesk',sans-serif] shrink-0 transition-opacity hover:opacity-90 w-full md:w-auto"
            style={{
              background: '#00f0ff',
              color: '#006970',
              boxShadow: '0px 0px 10px rgba(0,240,255,0.2)',
            }}
          >
            <AddIcon sx={{ fontSize: 14 }} />
            <span className="leading-tight text-center">Add New Category</span>
          </button>
        </div>

        {/* Data Table */}
        <Datatable<Category>
          data={categories}
          columns={columns}
          rowKey="id"
          searchValue={search}
          onSearchChange={setSearch}
          searchPlaceholder="Filter by category name…"
          loading={isLoading || (isFetching && !isLoading)}
          pagination={
            pagination
              ? {
                  currentPage: pagination.page,
                  totalPages: pagination.totalPages,
                  totalItems: pagination.total,
                  displayedItems: categories.length,
                  onPageChange: setPage,
                }
              : undefined
          }
          toolbarActions={
            <>
              <div className="relative" ref={filterRef}>
                <button
                  onClick={() => setFilterOpen((v) => !v)}
                  className="p-[8px] border-none outline-none bg-transparent cursor-pointer hover:opacity-70 transition-opacity"
                >
                  <TuneIcon
                    sx={{
                      fontSize: 18,
                      color: filterOpen || filterType !== null ? '#22d3ee' : '#94a3b8',
                    }}
                  />
                </button>
                {filterOpen && (
                  <FilterPopup
                    onClose={() => setFilterOpen(false)}
                    activeType={filterType}
                    onApply={(type) => {
                      setFilterType(type);
                      setType(type);
                    }}
                  />
                )}
              </div>
              <button className="p-[8px] border-none outline-none bg-transparent cursor-pointer hover:opacity-70 transition-opacity">
                <FileDownloadOutlinedIcon sx={{ fontSize: 18, color: '#94a3b8' }} />
              </button>
            </>
          }
        />
      </div>

      {/* Category Drawer (Create / Edit) */}
      <CategoryDrawer
        open={drawerOpen}
        editData={isLoadingDetail ? null : editData}
        isSubmitting={isCreating || isUpdating}
        onClose={closeDrawer}
        onSubmit={handleSubmit}
      />

      {/* Delete Confirmation */}
      <ConfirmDialog
        open={deleteTarget !== null}
        title="Delete Category"
        message={`Are you sure you want to delete "${deleteTarget?.name}"? This action cannot be undone.`}
        confirmLabel={isDeleting ? 'Deleting…' : 'Delete'}
        cancelLabel="Cancel"
        onConfirm={() => {
          if (deleteTarget) deleteCategory(deleteTarget.id);
        }}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
