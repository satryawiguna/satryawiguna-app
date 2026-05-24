'use client';

import { useState, useDeferredValue, useMemo, useRef, useEffect, useCallback } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import TuneIcon from '@mui/icons-material/Tune';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import AddIcon from '@mui/icons-material/Add';
import { Autocomplete, TextField, CircularProgress } from '@mui/material';
import { Datatable } from 'shared-datatable';
import type { DatatableColumn } from 'shared-datatable';
import type {
  BlogPost,
  BlogPostDetail,
  BlogPostStatus,
  CreateBlogPostRequest,
  UpdateBlogPostRequest,
} from 'shared-types';
import {
  useBlogPosts,
  useBlogPostDetail,
  useCreateBlogPost,
  useUpdateBlogPost,
  useDeleteBlogPost,
  useBlogCategoriesSearch,
  useTagsSearch,
} from '@/presentation/hooks';
import { BlogDrawer } from './BlogDrawer';
import { ConfirmDialog } from '@/presentation/components/common';

// ── Status helpers ────────────────────────────────────────────────

function StatusBadge({ status }: { status: BlogPostStatus }) {
  if (status === 'published') {
    return (
      <span
        className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px]"
        style={{
          background: 'rgba(0,165,114,0.2)',
          border: '1px solid rgba(78,222,163,0.2)',
          color: '#4edea3',
        }}
      >
        <span className="size-1.5 rounded-full bg-[#4edea3]" />
        Published
      </span>
    );
  }
  if (status === 'archived') {
    return (
      <span
        className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px]"
        style={{
          background: 'rgba(148,163,184,0.1)',
          border: '1px solid rgba(148,163,184,0.2)',
          color: '#94a3b8',
        }}
      >
        <span className="size-1.5 rounded-full bg-[#94a3b8]" />
        Archived
      </span>
    );
  }
  // draft
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px]"
      style={{
        background: '#222a3d',
        border: '1px solid rgba(255,255,255,0.1)',
        color: '#94a3b8',
      }}
    >
      <span className="size-1.5 rounded-full bg-[#64748b]" />
      Draft
    </span>
  );
}

// ── Thumbnail icon box ────────────────────────────────────────────

function ThumbnailBox({ thumbnailUrl, title }: { thumbnailUrl: string | null; title: string }) {
  const hasThumb = Boolean(thumbnailUrl);
  return (
    <div
      className="flex items-center justify-center rounded-sm shrink-0 overflow-hidden"
      style={{
        width: 40,
        height: 40,
        background: hasThumb ? 'transparent' : 'linear-gradient(134deg, #00f0ff 0%, #00363a 100%)',
      }}
    >
      {hasThumb ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={thumbnailUrl!} alt={title} className="w-full h-full object-cover" />
      ) : (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <rect
            x="3"
            y="3"
            width="14"
            height="14"
            rx="2"
            stroke="#00f0ff"
            strokeWidth="1.5"
            fill="none"
          />
          <path d="M7 10h6M10 7v6" stroke="#00f0ff" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      )}
    </div>
  );
}

// ── Filter popup ──────────────────────────────────────────────────

const ALL_STATUSES: BlogPostStatus[] = ['draft', 'published', 'archived'];

const STATUS_LABELS: Record<BlogPostStatus, string> = {
  draft: 'Draft',
  published: 'Published',
  archived: 'Archived',
};

// ── Autocomplete shared styles ────────────────────────────────────

const autocompleteInputSx = {
  '& .MuiOutlinedInput-root': {
    background: '#0a1120',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '4px',
    color: '#dae2fd',
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: 12,
    padding: '2px 6px',
    '&:hover': { borderColor: 'rgba(255,255,255,0.2)' },
    '&.Mui-focused': { borderColor: '#22d3ee' },
  },
  '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
  '& .MuiAutocomplete-input': {
    color: '#dae2fd',
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: 12,
    padding: '4px 0 !important',
    '&::placeholder': { color: '#475569', opacity: 1 },
  },
};

const autocompleteListboxSx = {
  background: '#1e293b',
  border: '1px solid rgba(255,255,255,0.12)',
  borderRadius: '4px',
  color: '#dae2fd',
  fontFamily: "'Space Grotesk', sans-serif",
  fontSize: 12,
  '& .MuiAutocomplete-option': {
    color: '#cbd5e1',
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: 12,
    '&:hover, &.Mui-focused': {
      background: 'rgba(34,211,238,0.12)',
      color: '#22d3ee',
    },
    '&[aria-selected="true"]': {
      background: 'rgba(34,211,238,0.08)',
    },
  },
};

interface FilterPopupProps {
  onClose: () => void;
  activeStatuses: BlogPostStatus[];
  onApply: (statuses: BlogPostStatus[], categoryId: number | null, tagId: number | null) => void;
  activeCategoryId: number | null;
  activeTagId: number | null;
}

function FilterPopup({
  onClose,
  activeStatuses,
  onApply,
  activeCategoryId,
  activeTagId,
}: FilterPopupProps) {
  const [statuses, setStatuses] = useState<BlogPostStatus[]>(activeStatuses);

  // Category autocomplete
  const [categoryKeyword, setCategoryKeyword] = useState('');
  const deferredCategoryKeyword = useDeferredValue(categoryKeyword);
  const { data: categoryOptions = [], isLoading: categoriesLoading } =
    useBlogCategoriesSearch(deferredCategoryKeyword);
  const [selectedCategory, setSelectedCategory] = useState<(typeof categoryOptions)[number] | null>(
    () =>
      activeCategoryId ? (categoryOptions.find((c) => c.id === activeCategoryId) ?? null) : null
  );

  // Tag autocomplete
  const [tagKeyword, setTagKeyword] = useState('');
  const deferredTagKeyword = useDeferredValue(tagKeyword);
  const { data: tagOptions = [], isLoading: tagsLoading } = useTagsSearch(deferredTagKeyword);
  const [selectedTag, setSelectedTag] = useState<(typeof tagOptions)[number] | null>(() =>
    activeTagId ? (tagOptions.find((t) => t.id === activeTagId) ?? null) : null
  );

  const toggleStatus = (s: BlogPostStatus) =>
    setStatuses((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));

  return (
    <div
      className="absolute right-0 top-full mt-2 z-50 w-[220px] sm:w-[240px] rounded-lg p-4 sm:p-5 flex flex-col gap-4"
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
          Filter by Status
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
        {ALL_STATUSES.map((s) => (
          <label key={s} className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={statuses.includes(s)}
              onChange={() => toggleStatus(s)}
              className="w-3.5 h-3.5 accent-[#22d3ee] cursor-pointer"
            />
            <span
              className="text-[12px] font-['Space_Grotesk',sans-serif]"
              style={{ color: '#94a3b8' }}
            >
              {STATUS_LABELS[s]}
            </span>
          </label>
        ))}
      </div>

      {/* Category filter */}
      <div className="flex flex-col gap-1.5">
        <span
          className="text-[10px] font-['Space_Grotesk',sans-serif] font-bold uppercase tracking-[1.2px]"
          style={{ color: '#64748b' }}
        >
          Category
        </span>
        <Autocomplete
          size="small"
          disablePortal
          filterOptions={(x) => x}
          options={categoryOptions}
          getOptionLabel={(opt) => opt.name}
          isOptionEqualToValue={(opt, val) => opt.id === val.id}
          value={selectedCategory}
          loading={categoriesLoading}
          inputValue={categoryKeyword}
          onInputChange={(_e, val) => {
            setCategoryKeyword(val);
          }}
          onChange={(_e, selected) => {
            setSelectedCategory(selected);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Search categories…"
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {categoriesLoading ? <CircularProgress color="inherit" size={14} /> : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
              sx={autocompleteInputSx}
            />
          )}
          noOptionsText={
            <span style={{ color: '#64748b', fontFamily: 'monospace', fontSize: 11 }}>
              {categoryKeyword ? 'No categories found' : 'Type to search…'}
            </span>
          }
          ListboxProps={{ sx: autocompleteListboxSx }}
        />
      </div>

      {/* Tag filter */}
      <div className="flex flex-col gap-1.5">
        <span
          className="text-[10px] font-['Space_Grotesk',sans-serif] font-bold uppercase tracking-[1.2px]"
          style={{ color: '#64748b' }}
        >
          Tag
        </span>
        <Autocomplete
          size="small"
          disablePortal
          filterOptions={(x) => x}
          options={tagOptions}
          getOptionLabel={(opt) => opt.name}
          isOptionEqualToValue={(opt, val) => opt.id === val.id}
          value={selectedTag}
          loading={tagsLoading}
          inputValue={tagKeyword}
          onInputChange={(_e, val) => {
            setTagKeyword(val);
          }}
          onChange={(_e, selected) => {
            setSelectedTag(selected);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Search tags…"
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {tagsLoading ? <CircularProgress color="inherit" size={14} /> : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
              sx={autocompleteInputSx}
            />
          )}
          noOptionsText={
            <span style={{ color: '#64748b', fontFamily: 'monospace', fontSize: 11 }}>
              {tagKeyword ? 'No tags found' : 'Type to search…'}
            </span>
          }
          ListboxProps={{ sx: autocompleteListboxSx }}
        />
      </div>

      <div className="flex gap-2 pt-3 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        <button
          onClick={() => {
            setStatuses([]);
            setSelectedCategory(null);
            setSelectedTag(null);
            onApply([], null, null);
            onClose();
          }}
          className="flex-1 py-2 rounded-[2px] text-[12px] font-['Space_Grotesk',sans-serif] border-none outline-none cursor-pointer hover:opacity-80 transition-opacity"
          style={{ background: 'rgba(255,255,255,0.05)', color: '#64748b' }}
        >
          Clear
        </button>
        <button
          onClick={() => {
            onApply(statuses, selectedCategory?.id ?? null, selectedTag?.id ?? null);
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

export default function BlogContent() {
  // ── Data / pagination state ───────────────────────────────────
  const {
    blogPosts,
    pagination,
    isLoading,
    isFetching,
    setPage,
    setKeyword,
    setCategoryId,
    setTagId,
    refetch,
  } = useBlogPosts();

  // ── Drawer state ──────────────────────────────────────────────
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editPostId, setEditPostId] = useState<number | null>(null);

  const { data: editDetailResponse, isLoading: isLoadingDetail } = useBlogPostDetail(editPostId);
  const editData: BlogPostDetail | null = editDetailResponse?.data ?? null;

  // ── Delete state ──────────────────────────────────────────────
  const [deleteTarget, setDeleteTarget] = useState<BlogPost | null>(null);

  // ── Local filter state ────────────────────────────────────────
  const [search, setSearch] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [filterStatuses, setFilterStatuses] = useState<BlogPostStatus[]>([]);
  const [filterCategoryId, setFilterCategoryId] = useState<number | null>(null);
  const [filterTagId, setFilterTagId] = useState<number | null>(null);
  const filterRef = useRef<HTMLDivElement>(null);

  // Debounce keyword
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
    setEditPostId(null);
  }, []);

  const { mutateAsync: createBlogPost, isPending: isCreating } = useCreateBlogPost(closeDrawer);
  const { mutateAsync: updateBlogPost, isPending: isUpdating } = useUpdateBlogPost(
    editPostId ?? 0,
    closeDrawer
  );
  const { mutateAsync: deleteBlogPost, isPending: isDeleting } = useDeleteBlogPost(() => {
    setDeleteTarget(null);
    refetch();
  });

  const handleSubmit = useCallback(
    async (values: CreateBlogPostRequest | UpdateBlogPostRequest) => {
      if (editPostId) {
        await updateBlogPost(values as UpdateBlogPostRequest);
      } else {
        await createBlogPost(values as CreateBlogPostRequest);
      }
    },
    [editPostId, createBlogPost, updateBlogPost]
  );

  // ── Client-side status filter ─────────────────────────────────
  const filtered = useMemo(
    () =>
      filterStatuses.length === 0
        ? blogPosts
        : blogPosts.filter((p) => filterStatuses.includes(p.status)),
    [blogPosts, filterStatuses]
  );

  // ── Columns ───────────────────────────────────────────────────
  const columns: DatatableColumn<BlogPost>[] = useMemo(
    () => [
      {
        key: 'title',
        label: 'POST TITLE',
        width: '38%',
        render: (row) => (
          <div className="flex items-center gap-3">
            <ThumbnailBox thumbnailUrl={row.thumbnail_url} title={row.title} />
            <div className="flex flex-col">
              <span
                className="text-[14px] font-['Space_Grotesk',sans-serif]"
                style={{ color: '#dae2fd' }}
              >
                {row.title}
              </span>
              <span className="text-[10px] font-mono mt-0.5" style={{ color: '#64748b' }}>
                /{row.slug}
              </span>
            </div>
          </div>
        ),
      },
      {
        key: 'excerpt',
        label: 'EXCERPT',
        width: '30%',
        render: (row) => (
          <span
            className="text-[12px] font-['Space_Grotesk',sans-serif] leading-snug block line-clamp-2"
            style={{ color: '#94a3b8' }}
          >
            {row.excerpt}
          </span>
        ),
      },
      {
        key: 'status',
        label: 'STATUS',
        width: '14%',
        align: 'center',
        render: (row) => <StatusBadge status={row.status} />,
      },
      {
        key: 'created_at',
        label: 'DATE',
        subLabel: 'CREATED',
        width: '10%',
        render: (row) => (
          <span className="text-[12px] font-mono leading-[16px] block" style={{ color: '#94a3b8' }}>
            {new Date(row.created_at).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </span>
        ),
      },
      {
        key: 'actions',
        label: 'ACTIONS',
        width: '8%',
        align: 'right',
        render: (row) => (
          <div className="flex items-center justify-end gap-1">
            <button
              onClick={() => {
                setEditPostId(row.id);
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
              Blog Management
            </h1>
            <p
              className="text-[14px] md:text-[18px] leading-[1.7] max-w-[620px]"
              style={{ color: '#94a3b8' }}
            >
              Create, edit, and publish blog posts. Manage drafts, categories, tags, and publishing
              schedules from a central command center.
            </p>
          </div>
          <button
            onClick={() => {
              setEditPostId(null);
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
            <span className="leading-tight text-center">Add New Post</span>
          </button>
        </div>

        {/* Data Table */}
        <Datatable<BlogPost>
          data={filtered}
          columns={columns}
          rowKey="id"
          searchValue={search}
          onSearchChange={setSearch}
          searchPlaceholder="Filter by post title…"
          loading={isLoading || (isFetching && !isLoading)}
          pagination={
            pagination
              ? {
                  currentPage: pagination.page,
                  totalPages: pagination.totalPages,
                  totalItems: pagination.total,
                  displayedItems: filtered.length,
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
                      color:
                        filterOpen ||
                        filterStatuses.length > 0 ||
                        filterCategoryId !== null ||
                        filterTagId !== null
                          ? '#22d3ee'
                          : '#94a3b8',
                    }}
                  />
                </button>
                {filterOpen && (
                  <FilterPopup
                    onClose={() => setFilterOpen(false)}
                    activeStatuses={filterStatuses}
                    activeCategoryId={filterCategoryId}
                    activeTagId={filterTagId}
                    onApply={(statuses, categoryId, tagId) => {
                      setFilterStatuses(statuses);
                      setFilterCategoryId(categoryId);
                      setFilterTagId(tagId);
                      setCategoryId(categoryId);
                      setTagId(tagId);
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

      {/* Blog Drawer (Create / Edit) */}
      <BlogDrawer
        open={drawerOpen}
        editData={isLoadingDetail ? null : editData}
        isSubmitting={isCreating || isUpdating}
        onClose={closeDrawer}
        onSubmit={handleSubmit}
      />

      {/* Delete Confirmation */}
      <ConfirmDialog
        open={deleteTarget !== null}
        title="Delete Blog Post"
        message={`Are you sure you want to delete "${deleteTarget?.title}"? This action cannot be undone.`}
        confirmLabel={isDeleting ? 'Deleting…' : 'Delete'}
        cancelLabel="Cancel"
        onConfirm={() => {
          if (deleteTarget) deleteBlogPost(deleteTarget.id);
        }}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
