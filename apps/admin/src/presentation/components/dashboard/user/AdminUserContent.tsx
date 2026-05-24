'use client';

import { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import AddIcon from '@mui/icons-material/Add';
import { Datatable } from 'shared-datatable';
import type { DatatableColumn } from 'shared-datatable';
import type { AdminUser, CreateAdminUserRequest, UpdateAdminUserRequest } from 'shared-types';
import {
  useAdminUsers,
  useAdminUserDetail,
  useCreateAdminUser,
  useUpdateAdminUser,
  useDeleteAdminUser,
} from '@/presentation/hooks';
import { AdminUserDrawer } from './AdminUserDrawer';
import { ConfirmDialog } from '@/presentation/components/common';

// ── Avatar box ────────────────────────────────────────────────────

function AvatarBox({ avatarUrl, name }: { avatarUrl: string; name: string }) {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div
      className="flex items-center justify-center rounded-full shrink-0 overflow-hidden"
      style={{
        width: 36,
        height: 36,
        background: avatarUrl ? 'transparent' : 'linear-gradient(134deg, #22d3ee 0%, #00363a 100%)',
      }}
    >
      {avatarUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={avatarUrl} alt={name} className="w-full h-full object-cover" />
      ) : (
        <span
          className="text-[11px] font-bold font-['Space_Grotesk',sans-serif]"
          style={{ color: '#002022' }}
        >
          {initials}
        </span>
      )}
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────

export default function AdminUserContent() {
  // ── Data / pagination state ───────────────────────────────────
  const { users, pagination, isLoading, isFetching, setPage, setKeyword, refetch } =
    useAdminUsers();

  // ── Drawer state ──────────────────────────────────────────────
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editUserId, setEditUserId] = useState<number | null>(null);

  // ── Fetch user detail when editing ────────────────────────────
  const { data: editDetailResponse, isLoading: isLoadingDetail } = useAdminUserDetail(editUserId);
  const editData: AdminUser | null = editDetailResponse?.data ?? null;

  // ── Delete state ──────────────────────────────────────────────
  const [deleteTarget, setDeleteTarget] = useState<AdminUser | null>(null);

  // ── Local filter state ────────────────────────────────────────
  const [search, setSearch] = useState('');

  // Debounce keyword to the hook
  useEffect(() => {
    const timer = setTimeout(() => setKeyword(search), 300);
    return () => clearTimeout(timer);
  }, [search, setKeyword]);

  // ── Mutations ─────────────────────────────────────────────────
  const closeDrawer = useCallback(() => {
    setDrawerOpen(false);
    setEditUserId(null);
  }, []);

  const { mutateAsync: createUser, isPending: isCreating } = useCreateAdminUser(closeDrawer);
  const { mutateAsync: updateUser, isPending: isUpdating } = useUpdateAdminUser(
    editUserId ?? 0,
    closeDrawer
  );
  const { mutateAsync: deleteUser, isPending: isDeleting } = useDeleteAdminUser(() => {
    setDeleteTarget(null);
    refetch();
  });

  const handleSubmit = useCallback(
    async (values: CreateAdminUserRequest | UpdateAdminUserRequest) => {
      if (editUserId) {
        await updateUser(values as UpdateAdminUserRequest);
      } else {
        await createUser(values as CreateAdminUserRequest);
      }
    },
    [editUserId, createUser, updateUser]
  );

  // ── Columns ───────────────────────────────────────────────────
  const columns: DatatableColumn<AdminUser>[] = useMemo(
    () => [
      {
        key: 'name',
        label: 'NAME',
        width: '32%',
        render: (row) => (
          <div className="flex items-center gap-3">
            <AvatarBox avatarUrl={row.avatar_url} name={row.name} />
            <div className="flex flex-col">
              <span
                className="text-[14px] font-['Space_Grotesk',sans-serif]"
                style={{ color: '#dae2fd' }}
              >
                {row.name}
              </span>
            </div>
          </div>
        ),
      },
      {
        key: 'email',
        label: 'EMAIL',
        width: '28%',
        render: (row) => (
          <span className="text-[12px] font-mono leading-snug block" style={{ color: '#94a3b8' }}>
            {row.email}
          </span>
        ),
      },
      {
        key: 'phone',
        label: 'PHONE',
        width: '16%',
        render: (row) => (
          <span
            className="text-[12px] font-['Space_Grotesk',sans-serif] block"
            style={{ color: '#94a3b8' }}
          >
            {row.phone || '—'}
          </span>
        ),
      },
      {
        key: 'created_at',
        label: 'JOINED',
        width: '16%',
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
                setEditUserId(row.id);
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
              User Management
            </h1>
            <p
              className="text-[14px] md:text-[18px] leading-[1.7] max-w-[620px]"
              style={{ color: '#94a3b8' }}
            >
              Manage platform users. Create, edit, and manage user accounts and their access to the
              administration panel.
            </p>
          </div>
          <button
            onClick={() => {
              setEditUserId(null);
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
            <span className="leading-tight text-center">Add New User</span>
          </button>
        </div>

        {/* Data Table */}
        <Datatable<AdminUser>
          data={users}
          columns={columns}
          rowKey="id"
          searchValue={search}
          onSearchChange={setSearch}
          searchPlaceholder="Filter by name or email…"
          loading={isLoading || (isFetching && !isLoading)}
          pagination={
            pagination
              ? {
                  currentPage: pagination.page,
                  totalPages: pagination.totalPages,
                  totalItems: pagination.total,
                  displayedItems: users.length,
                  onPageChange: setPage,
                }
              : undefined
          }
          toolbarActions={
            <>
              <button className="p-[8px] border-none outline-none bg-transparent cursor-pointer hover:opacity-70 transition-opacity">
                <FileDownloadOutlinedIcon sx={{ fontSize: 18, color: '#94a3b8' }} />
              </button>
            </>
          }
        />
      </div>

      {/* User Drawer (Create / Edit) */}
      <AdminUserDrawer
        open={drawerOpen}
        editData={isLoadingDetail ? null : editData}
        isSubmitting={isCreating || isUpdating}
        onClose={closeDrawer}
        onSubmit={handleSubmit}
      />

      {/* Delete Confirmation */}
      <ConfirmDialog
        open={deleteTarget !== null}
        title="Delete User"
        message={`Are you sure you want to delete "${deleteTarget?.name}"? This action cannot be undone.`}
        confirmLabel={isDeleting ? 'Deleting…' : 'Delete'}
        cancelLabel="Cancel"
        onConfirm={() => {
          if (deleteTarget) deleteUser(deleteTarget.id);
        }}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
