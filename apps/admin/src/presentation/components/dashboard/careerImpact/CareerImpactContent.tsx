'use client';

import { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddIcon from '@mui/icons-material/Add';
import { Datatable } from 'shared-datatable';
import type { DatatableColumn } from 'shared-datatable';
import type {
  CareerImpact,
  CreateCareerImpactRequest,
  UpdateCareerImpactRequest,
} from 'shared-types';
import {
  useCareerImpacts,
  useCareerImpactDetail,
  useCreateCareerImpact,
  useUpdateCareerImpact,
  useDeleteCareerImpact,
} from '@/presentation/hooks';
import { CareerImpactDrawer } from './CareerImpactDrawer';
import { ConfirmDialog } from '@/presentation/components/common';

// ── Date formatter ────────────────────────────────────────────────

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

// ── Icon box ──────────────────────────────────────────────────────

function IconBox({ iconUrl, title }: { iconUrl: string; title: string }) {
  const [imgError, setImgError] = useState(false);
  const showImage = iconUrl && !imgError;

  return (
    <div
      className="flex items-center justify-center rounded-sm shrink-0 overflow-hidden"
      style={{
        width: 36,
        height: 36,
        background: showImage ? 'transparent' : 'linear-gradient(134deg, #00f0ff 0%, #00363a 100%)',
      }}
    >
      {showImage ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={iconUrl}
          alt={title}
          className="w-full h-full object-cover"
          onError={() => setImgError(true)}
        />
      ) : (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M9 1L17 5V13L9 17L1 13V5L9 1Z" stroke="#00f0ff" strokeWidth="1.5" fill="none" />
          <circle cx="9" cy="9" r="3" stroke="#00f0ff" strokeWidth="1.5" fill="none" />
        </svg>
      )}
    </div>
  );
}

// ── Content component ─────────────────────────────────────────────

export function CareerImpactContent() {
  const { careerImpacts, pagination, isLoading, isFetching, filters, setPage, setKeyword } =
    useCareerImpacts();

  // ── Drawer state ─────────────────────────────────────────────
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const { data: detailResponse } = useCareerImpactDetail(editId);
  const editData = detailResponse?.data ?? null;

  const createMutation = useCreateCareerImpact(() => {
    setDrawerOpen(false);
  });
  const updateMutation = useUpdateCareerImpact(editId, () => {
    setDrawerOpen(false);
    setEditId(null);
  });
  const deleteMutation = useDeleteCareerImpact(() => {
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

  async function handleSubmit(values: CreateCareerImpactRequest | UpdateCareerImpactRequest) {
    if (editId) {
      await updateMutation.mutateAsync(values as UpdateCareerImpactRequest);
    } else {
      await createMutation.mutateAsync(values as CreateCareerImpactRequest);
    }
  }

  function handleCloseDrawer() {
    setDrawerOpen(false);
    setEditId(null);
  }

  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  // ── Columns ──────────────────────────────────────────────────
  const columns: DatatableColumn<CareerImpact>[] = [
    {
      key: 'title',
      label: 'TITLE',
      width: '25%',
      render: (row) => (
        <div className="flex items-center gap-3">
          <IconBox iconUrl={row.icon_url} title={row.title} />
          <span
            style={{
              color: '#dae2fd',
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 13,
              fontWeight: 500,
            }}
          >
            {row.title}
          </span>
        </div>
      ),
    },
    {
      key: 'quote',
      label: 'QUOTE',
      width: '25%',
      render: (row) => (
        <span
          style={{
            fontFamily: '"Nimbus Mono PS", "Courier New", monospace',
            fontSize: 12,
            color: '#00dbe9',
            fontStyle: 'italic',
          }}
        >
          {row.quote.length > 60 ? `${row.quote.slice(0, 60)}...` : row.quote}
        </span>
      ),
    },
    {
      key: 'sort_order',
      label: 'SORT',
      width: '10%',
      render: (row) => (
        <span style={{ fontFamily: 'monospace', fontSize: 12, color: '#64748b' }}>
          {row.sort_order}
        </span>
      ),
    },
    {
      key: 'created_at',
      label: 'CREATED',
      width: '16%',
      render: (row) => (
        <span style={{ fontFamily: 'monospace', fontSize: 12, color: '#94a3b8' }}>
          {formatDate(row.created_at)}
        </span>
      ),
    },
    {
      key: 'actions',
      label: '',
      width: '10%',
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
              Career Impacts
            </h1>
            <p
              className="text-[14px] md:text-[18px] leading-[1.7] max-w-[620px]"
              style={{ color: '#94a3b8' }}
            >
              Manage the career impact stories displayed on your About page. Add, edit, or remove
              impact cards highlighting your professional trajectory.
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
            <AddIcon sx={{ fontSize: 18 }} />
            Add New Career Impact
          </button>
        </div>

        {/* Datatable */}
        <Datatable
          columns={columns}
          data={careerImpacts}
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
          searchValue={filters.keyword}
          onSearchChange={setKeyword}
          searchPlaceholder="Search career impacts..."
          emptyState={
            <div className="flex flex-col items-center gap-3 py-16">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" opacity={0.3}>
                <rect
                  x="4"
                  y="4"
                  width="40"
                  height="40"
                  rx="4"
                  stroke="#64748b"
                  strokeWidth="2"
                  fill="none"
                />
                <circle cx="18" cy="18" r="4" stroke="#64748b" strokeWidth="2" fill="none" />
                <path
                  d="M44 32L34 22L8 44"
                  stroke="#64748b"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span
                className="text-[14px] font-['Space_Grotesk',sans-serif]"
                style={{ color: '#64748b' }}
              >
                No career impacts found. Create one to get started.
              </span>
            </div>
          }
        />
      </div>

      {/* Drawer */}
      <CareerImpactDrawer
        open={drawerOpen}
        editData={editData}
        isSubmitting={isSubmitting}
        onClose={handleCloseDrawer}
        onSubmit={handleSubmit}
      />

      {/* Delete confirmation */}
      <ConfirmDialog
        open={deleteId !== null}
        title="Delete Career Impact"
        message="Are you sure you want to delete this career impact? This action cannot be undone."
        confirmLabel="Delete"
        onConfirm={async () => {
          if (deleteId !== null) {
            await deleteMutation.mutateAsync(deleteId);
          }
        }}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
