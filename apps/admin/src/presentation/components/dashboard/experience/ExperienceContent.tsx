'use client';

import { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddIcon from '@mui/icons-material/Add';
import { Datatable } from 'shared-datatable';
import type { DatatableColumn } from 'shared-datatable';
import type {
  Experience,
  CreateExperienceRequest,
  UpdateExperienceRequest,
  EmploymentType,
} from 'shared-types';
import {
  useExperiences,
  useExperienceDetail,
  useCreateExperience,
  useUpdateExperience,
  useDeleteExperience,
} from '@/presentation/hooks';
import { ExperienceDrawer } from './ExperienceDrawer';
import { ConfirmDialog } from '@/presentation/components/common';

// ── Employment type badge helper ──────────────────────────────────

const EMPLOYMENT_LABELS: Record<EmploymentType, string> = {
  FULL_TIME: 'Full Time',
  PART_TIME: 'Part Time',
  CONTRACT: 'Contract',
  FREELANCE: 'Freelance',
  INTERNSHIP: 'Internship',
};

const EMPLOYMENT_COLORS: Record<EmploymentType, string> = {
  FULL_TIME: '#4edea3',
  PART_TIME: '#22d3ee',
  CONTRACT: '#facc15',
  FREELANCE: '#f97316',
  INTERNSHIP: '#a78bfa',
};

function EmploymentBadge({ type }: { type: EmploymentType }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px]"
      style={{
        background: `${EMPLOYMENT_COLORS[type]}20`,
        border: `1px solid ${EMPLOYMENT_COLORS[type]}40`,
        color: EMPLOYMENT_COLORS[type],
      }}
    >
      <span className="size-1.5 rounded-full" style={{ background: EMPLOYMENT_COLORS[type] }} />
      {EMPLOYMENT_LABELS[type]}
    </span>
  );
}

// ── Date range display ────────────────────────────────────────────

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  return `${months[d.getMonth()]} ${d.getFullYear()}`;
}

function DateRange({ start, end }: { start: string; end: string | null }) {
  return (
    <span style={{ fontFamily: 'monospace', fontSize: 12, color: '#94a3b8' }}>
      {formatDate(start)} — {end ? formatDate(end) : 'Present'}
    </span>
  );
}

// ── Content component ─────────────────────────────────────────────

export function ExperienceContent() {
  const { experiences, pagination, isLoading, isFetching, filters, setPage, setKeyword } =
    useExperiences();

  // ── Drawer state ─────────────────────────────────────────────
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const { data: detailResponse, isLoading: detailLoading } = useExperienceDetail(editId);
  const editData = detailResponse?.data ?? null;

  const createMutation = useCreateExperience(() => {
    setDrawerOpen(false);
  });
  const updateMutation = useUpdateExperience(editId!, () => {
    setDrawerOpen(false);
    setEditId(null);
  });
  const deleteMutation = useDeleteExperience(() => {
    setDeleteId(null);
  });

  // ── Handlers ─────────────────────────────────────────────────
  function handleAdd() {
    setEditId(null);
    setDrawerOpen(true);
  }

  function handleEdit(id: number) {
    setEditId(id);
    setDrawerOpen(true);
  }

  function handleDelete(id: number) {
    setDeleteId(id);
  }

  async function handleSubmit(values: CreateExperienceRequest | UpdateExperienceRequest) {
    if (editId) {
      await updateMutation.mutateAsync(values as UpdateExperienceRequest);
    } else {
      await createMutation.mutateAsync(values as CreateExperienceRequest);
    }
  }

  function handleCloseDrawer() {
    setDrawerOpen(false);
    setEditId(null);
  }

  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  // ── Columns ──────────────────────────────────────────────────
  const columns: DatatableColumn<Experience>[] = [
    {
      key: 'title',
      label: 'POSITION',
      subLabel: 'COMPANY',
      width: '38%',
      render: (row) => (
        <div className="flex flex-col gap-0.5">
          <span
            style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, color: '#dae2fd' }}
          >
            {row.title}
          </span>
          <span style={{ fontFamily: 'monospace', fontSize: 11, color: '#64748b' }}>
            {row.company}
          </span>
        </div>
      ),
    },
    {
      key: 'employment_type',
      label: 'TYPE',
      width: '18%',
      render: (row) => <EmploymentBadge type={row.employment_type} />,
    },
    {
      key: 'date_range',
      label: 'PERIOD',
      subLabel: 'SORT',
      width: '24%',
      render: (row) => (
        <div className="flex flex-col gap-0.5">
          <DateRange start={row.start_date} end={row.end_date} />
          <span style={{ fontFamily: 'monospace', fontSize: 11, color: '#475569' }}>
            Order: {row.sort_order}
          </span>
        </div>
      ),
    },
    {
      key: 'created_at',
      label: 'CREATED',
      width: '12%',
      render: (row) => (
        <span style={{ fontFamily: 'monospace', fontSize: 12, color: '#94a3b8' }}>
          {formatDate(row.created_at)}
        </span>
      ),
    },
    {
      key: 'actions',
      label: '',
      width: '8%',
      align: 'right',
      render: (row) => (
        <div className="flex items-center justify-end gap-1">
          <button
            onClick={() => handleEdit(row.id)}
            className="p-1.5 rounded border-none outline-none cursor-pointer hover:opacity-80 transition-opacity"
            style={{ background: 'rgba(34,211,238,0.1)', color: '#22d3ee' }}
            title="Edit"
          >
            <EditIcon sx={{ fontSize: 16 }} />
          </button>
          <button
            onClick={() => handleDelete(row.id)}
            className="p-1.5 rounded border-none outline-none cursor-pointer hover:opacity-80 transition-opacity"
            style={{ background: 'rgba(248,113,113,0.1)', color: '#f87171' }}
            title="Delete"
          >
            <DeleteOutlineIcon sx={{ fontSize: 16 }} />
          </button>
        </div>
      ),
    },
  ];

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
              Experience Management
            </h1>
            <p
              className="text-[14px] md:text-[18px] leading-[1.7] max-w-[620px]"
              style={{ color: '#94a3b8' }}
            >
              Track your professional journey. Manage work experiences, positions, and achievements
              across your career timeline.
            </p>
          </div>
          <button
            onClick={handleAdd}
            className="flex items-center justify-center gap-2 rounded px-6 py-3 md:py-4 text-[12px] font-['Space_Grotesk',sans-serif] shrink-0 transition-opacity hover:opacity-90 w-full md:w-auto"
            style={{
              background: '#00f0ff',
              color: '#006970',
              boxShadow: '0px 0px 10px rgba(0,240,255,0.2)',
            }}
          >
            <AddIcon sx={{ fontSize: 14 }} />
            <span className="leading-tight text-center">Add New Experience</span>
          </button>
        </div>

        {/* Data Table */}
        <Datatable
          data={experiences}
          columns={columns}
          rowKey="id"
          searchPlaceholder="Search by position or company…"
          searchValue={filters.keyword}
          onSearchChange={setKeyword}
          loading={isLoading || isFetching}
          pagination={
            pagination
              ? {
                  currentPage: pagination.page,
                  displayedItems: pagination.limit,
                  totalItems: pagination.total,
                  totalPages: pagination.totalPages,
                  onPageChange: setPage,
                }
              : undefined
          }
          emptyState={
            <div className="flex flex-col items-center gap-3 py-12">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <rect
                  x="6"
                  y="10"
                  width="36"
                  height="28"
                  rx="3"
                  stroke="#64748b"
                  strokeWidth="1.5"
                  fill="none"
                />
                <path
                  d="M16 20h16M16 26h12M16 32h8"
                  stroke="#64748b"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              <span
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 14,
                  color: '#64748b',
                }}
              >
                No experiences found
              </span>
              <span style={{ fontFamily: 'monospace', fontSize: 12, color: '#475569' }}>
                Add your first experience to get started.
              </span>
            </div>
          }
        />
      </div>

      {/* Drawer */}
      <ExperienceDrawer
        open={drawerOpen}
        editData={editData}
        isSubmitting={isSubmitting || detailLoading}
        onClose={handleCloseDrawer}
        onSubmit={handleSubmit}
      />

      {/* Delete confirmation */}
      <ConfirmDialog
        open={deleteId !== null}
        title="Delete Experience"
        message="Are you sure you want to delete this experience? This action cannot be undone."
        confirmLabel="Delete"
        onConfirm={() => {
          if (deleteId !== null) deleteMutation.mutate(deleteId);
        }}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
