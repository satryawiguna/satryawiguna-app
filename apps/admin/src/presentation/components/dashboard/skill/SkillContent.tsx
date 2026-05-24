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
import type { Skill, CreateSkillRequest, UpdateSkillRequest } from 'shared-types';
import {
  useSkills,
  useSkillDetail,
  useCreateSkill,
  useUpdateSkill,
  useDeleteSkill,
  useSkillCategoriesSearch,
} from '@/presentation/hooks';
import { SkillDrawer } from './SkillDrawer';
import { ConfirmDialog } from '@/presentation/components/common';

// ── Level badge ───────────────────────────────────────────────────

function LevelBadge({ level }: { level: number }) {
  const color = level >= 80 ? '#4edea3' : level >= 50 ? '#facc15' : '#f87171';
  return (
    <div className="flex items-center gap-2">
      <div
        className="h-1.5 rounded-full"
        style={{
          width: 60,
          background: 'rgba(255,255,255,0.1)',
        }}
      >
        <div
          className="h-full rounded-full transition-all"
          style={{
            width: `${Math.min(level, 100)}%`,
            background: color,
          }}
        />
      </div>
      <span className="text-[11px] font-mono" style={{ color }}>
        {level}%
      </span>
    </div>
  );
}

// ── Icon box ──────────────────────────────────────────────────────

function IconBox({ iconUrl, name }: { iconUrl: string; name: string }) {
  return (
    <div
      className="flex items-center justify-center rounded-sm shrink-0 overflow-hidden"
      style={{
        width: 36,
        height: 36,
        background: iconUrl ? 'transparent' : 'linear-gradient(134deg, #00f0ff 0%, #00363a 100%)',
      }}
    >
      {iconUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={iconUrl} alt={name} className="w-full h-full object-cover" />
      ) : (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M9 1L17 5V13L9 17L1 13V5L9 1Z" stroke="#00f0ff" strokeWidth="1.5" fill="none" />
          <circle cx="9" cy="9" r="3" stroke="#00f0ff" strokeWidth="1.5" fill="none" />
        </svg>
      )}
    </div>
  );
}

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

// ── Filter popup ──────────────────────────────────────────────────

interface FilterPopupProps {
  onClose: () => void;
  onApply: (categoryId: number | null) => void;
  activeCategoryId: number | null;
}

function FilterPopup({ onClose, onApply, activeCategoryId }: FilterPopupProps) {
  const [categoryKeyword, setCategoryKeyword] = useState('');
  const deferredCategoryKeyword = useDeferredValue(categoryKeyword);
  const { data: categoryOptions = [], isLoading: categoriesLoading } =
    useSkillCategoriesSearch(deferredCategoryKeyword);
  const [selectedCategory, setSelectedCategory] = useState<(typeof categoryOptions)[number] | null>(
    () =>
      activeCategoryId ? (categoryOptions.find((c) => c.id === activeCategoryId) ?? null) : null
  );

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
          Filter by Category
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

      <div className="flex flex-col gap-1.5">
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

      <div className="flex gap-2 pt-3 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        <button
          onClick={() => {
            setSelectedCategory(null);
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
            onApply(selectedCategory?.id ?? null);
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

export default function SkillContent() {
  // ── Data / pagination state ───────────────────────────────────
  const { skills, pagination, isLoading, isFetching, setPage, setKeyword, setCategoryId, refetch } =
    useSkills();

  // ── Drawer state ──────────────────────────────────────────────
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editSkillId, setEditSkillId] = useState<number | null>(null);

  // ── Fetch skill detail when editing ───────────────────────────
  const { data: editDetailResponse, isLoading: isLoadingDetail } = useSkillDetail(editSkillId);
  const editData: Skill | null = editDetailResponse?.data ?? null;

  // ── Delete state ──────────────────────────────────────────────
  const [deleteTarget, setDeleteTarget] = useState<Skill | null>(null);

  // ── Local filter state ────────────────────────────────────────
  const [search, setSearch] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [filterCategoryId, setFilterCategoryId] = useState<number | null>(null);
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
    setEditSkillId(null);
  }, []);

  const { mutateAsync: createSkill, isPending: isCreating } = useCreateSkill(closeDrawer);
  const { mutateAsync: updateSkill, isPending: isUpdating } = useUpdateSkill(
    editSkillId ?? 0,
    closeDrawer
  );
  const { mutateAsync: deleteSkill, isPending: isDeleting } = useDeleteSkill(() => {
    setDeleteTarget(null);
    refetch();
  });

  const handleSubmit = useCallback(
    async (values: CreateSkillRequest | UpdateSkillRequest) => {
      if (editSkillId) {
        await updateSkill(values as UpdateSkillRequest);
      } else {
        await createSkill(values as CreateSkillRequest);
      }
    },
    [editSkillId, createSkill, updateSkill]
  );

  // ── Columns ───────────────────────────────────────────────────
  const columns: DatatableColumn<Skill>[] = useMemo(
    () => [
      {
        key: 'name',
        label: 'SKILL NAME',
        width: '30%',
        render: (row) => (
          <div className="flex items-center gap-3">
            <IconBox iconUrl={row.icon_url} name={row.name} />
            <div className="flex flex-col">
              <span
                className="text-[14px] font-['Space_Grotesk',sans-serif]"
                style={{ color: '#dae2fd' }}
              >
                {row.name}
              </span>
              <span className="text-[10px] font-mono mt-0.5" style={{ color: '#64748b' }}>
                Sort: {row.sort_order}
              </span>
            </div>
          </div>
        ),
      },
      {
        key: 'category',
        label: 'CATEGORY',
        width: '22%',
        render: (row) => (
          <span
            className="text-[12px] font-['Space_Grotesk',sans-serif] block"
            style={{ color: '#94a3b8' }}
          >
            {row.category?.name ?? '—'}
          </span>
        ),
      },
      {
        key: 'level',
        label: 'LEVEL',
        width: '22%',
        render: (row) => <LevelBadge level={row.level} />,
      },
      {
        key: 'created_at',
        label: 'DATE',
        subLabel: 'CREATED',
        width: '18%',
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
                setEditSkillId(row.id);
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
              Skill Management
            </h1>
            <p
              className="text-[14px] md:text-[18px] leading-[1.7] max-w-[620px]"
              style={{ color: '#94a3b8' }}
            >
              Manage your technical skill inventory. Track proficiency levels across categories and
              keep your portfolio skills up to date.
            </p>
          </div>
          <button
            onClick={() => {
              setEditSkillId(null);
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
            <span className="leading-tight text-center">Add New Skill</span>
          </button>
        </div>

        {/* Data Table */}
        <Datatable<Skill>
          data={skills}
          columns={columns}
          rowKey="id"
          searchValue={search}
          onSearchChange={setSearch}
          searchPlaceholder="Filter by skill name…"
          loading={isLoading || (isFetching && !isLoading)}
          pagination={
            pagination
              ? {
                  currentPage: pagination.page,
                  totalPages: pagination.totalPages,
                  totalItems: pagination.total,
                  displayedItems: skills.length,
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
                      color: filterOpen || filterCategoryId !== null ? '#22d3ee' : '#94a3b8',
                    }}
                  />
                </button>
                {filterOpen && (
                  <FilterPopup
                    onClose={() => setFilterOpen(false)}
                    activeCategoryId={filterCategoryId}
                    onApply={(categoryId) => {
                      setFilterCategoryId(categoryId);
                      setCategoryId(categoryId);
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

      {/* Skill Drawer (Create / Edit) */}
      <SkillDrawer
        open={drawerOpen}
        editData={isLoadingDetail ? null : editData}
        isSubmitting={isCreating || isUpdating}
        onClose={closeDrawer}
        onSubmit={handleSubmit}
      />

      {/* Delete Confirmation */}
      <ConfirmDialog
        open={deleteTarget !== null}
        title="Delete Skill"
        message={`Are you sure you want to delete "${deleteTarget?.name}"? This action cannot be undone.`}
        confirmLabel={isDeleting ? 'Deleting…' : 'Delete'}
        cancelLabel="Cancel"
        onConfirm={() => {
          if (deleteTarget) deleteSkill(deleteTarget.id);
        }}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
