'use client';

import { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddIcon from '@mui/icons-material/Add';
import { Datatable } from 'shared-datatable';
import type { DatatableColumn } from 'shared-datatable';
import type { Strength, CreateStrengthRequest, UpdateStrengthRequest } from 'shared-types';
import {
  useStrengths,
  useStrengthDetail,
  useCreateStrength,
  useUpdateStrength,
  useDeleteStrength,
} from '@/presentation/hooks';
import { StrengthDrawer } from './StrengthDrawer';
import { ConfirmDialog } from '@/presentation/components/common';

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

// ── Content component ─────────────────────────────────────────────

export function StrengthContent() {
  const { strengths, pagination, isLoading, isFetching, filters, setPage, setKeyword } =
    useStrengths();

  // ── Drawer state ─────────────────────────────────────────────
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const { data: detailResponse, isLoading: detailLoading } = useStrengthDetail(editId);
  const editData = detailResponse?.data ?? null;

  const createMutation = useCreateStrength(() => {
    setDrawerOpen(false);
  });
  const updateMutation = useUpdateStrength(editId, () => {
    setDrawerOpen(false);
    setEditId(null);
  });
  const deleteMutation = useDeleteStrength(() => {
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

  async function handleSubmit(values: CreateStrengthRequest | UpdateStrengthRequest) {
    if (editId) {
      await updateMutation.mutateAsync(values as UpdateStrengthRequest);
    } else {
      await createMutation.mutateAsync(values as CreateStrengthRequest);
    }
  }

  function handleCloseDrawer() {
    setDrawerOpen(false);
    setEditId(null);
  }

  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  // ── Columns ──────────────────────────────────────────────────
  const columns: DatatableColumn<Strength>[] = [
    {
      key: 'description',
      label: 'DESCRIPTION',
      width: '60%',
      render: (row) => (
        <span
          style={{
            color: '#dae2fd',
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 13,
            fontWeight: 500,
          }}
        >
          {row.description}
        </span>
      ),
    },
    {
      key: 'sort_order',
      label: 'SORT',
      width: '14%',
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
              Strengths Management
            </h1>
            <p
              className="text-[14px] md:text-[18px] leading-[1.7] max-w-[620px]"
              style={{ color: '#94a3b8' }}
            >
              Manage the strengths displayed on your resume. Add, edit, or remove professional
              strengths and adjust their display order.
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
            <span className="leading-tight text-center">Add New Strength</span>
          </button>
        </div>

        {/* Data Table */}
        <Datatable
          data={strengths}
          columns={columns}
          rowKey="id"
          searchPlaceholder="Search by description…"
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
            <div className="flex flex-col items-center gap-3 py-16">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" opacity={0.3}>
                <rect
                  x="4"
                  y="8"
                  width="40"
                  height="32"
                  rx="3"
                  stroke="#94a3b8"
                  strokeWidth="2"
                  fill="none"
                />
                <path
                  d="M14 20h20M14 28h12"
                  stroke="#94a3b8"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              <p
                style={{
                  color: '#64748b',
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 14,
                }}
              >
                No strengths found
              </p>
            </div>
          }
        />
      </div>

      {/* Drawer */}
      <StrengthDrawer
        open={drawerOpen}
        editData={editId ? editData : null}
        isSubmitting={isSubmitting || detailLoading}
        onClose={handleCloseDrawer}
        onSubmit={handleSubmit}
      />

      {/* Delete confirmation */}
      <ConfirmDialog
        open={deleteId !== null}
        title="Delete Strength"
        message="Are you sure you want to delete this strength? This action cannot be undone."
        confirmLabel="Delete"
        onConfirm={() => deleteId !== null && deleteMutation.mutate(deleteId)}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
