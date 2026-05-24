'use client';

import { useState, useMemo, useEffect, useCallback } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import AddIcon from '@mui/icons-material/Add';
import { Datatable } from 'shared-datatable';
import type { DatatableColumn } from 'shared-datatable';
import type { Tag, CreateTagRequest, UpdateTagRequest } from 'shared-types';
import {
  useTags,
  useTagDetail,
  useCreateTag,
  useUpdateTag,
  useDeleteTag,
} from '@/presentation/hooks';
import { TagDrawer } from './TagDrawer';
import { ConfirmDialog } from '@/presentation/components/common';

// ── Main component ────────────────────────────────────────────────

export default function TagContent() {
  // ── Data / pagination state ───────────────────────────────────
  const { tags, pagination, isLoading, isFetching, setPage, setKeyword, refetch } = useTags();

  // ── Drawer state ──────────────────────────────────────────────
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editTagId, setEditTagId] = useState<number | null>(null);

  // ── Fetch tag detail when editing ─────────────────────────────
  const { data: editDetailResponse, isLoading: isLoadingDetail } = useTagDetail(editTagId);
  const editData: Tag | null = editDetailResponse?.data ?? null;

  // ── Delete state ──────────────────────────────────────────────
  const [deleteTarget, setDeleteTarget] = useState<Tag | null>(null);

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
    setEditTagId(null);
  }, []);

  const { mutateAsync: createTag, isPending: isCreating } = useCreateTag(closeDrawer);
  const { mutateAsync: updateTag, isPending: isUpdating } = useUpdateTag(
    editTagId ?? 0,
    closeDrawer
  );
  const { mutateAsync: deleteTag, isPending: isDeleting } = useDeleteTag(() => {
    setDeleteTarget(null);
    refetch();
  });

  const handleSubmit = useCallback(
    async (values: CreateTagRequest | UpdateTagRequest) => {
      if (editTagId) {
        await updateTag(values as UpdateTagRequest);
      } else {
        await createTag(values as CreateTagRequest);
      }
    },
    [editTagId, createTag, updateTag]
  );

  // ── Columns ───────────────────────────────────────────────────
  const columns: DatatableColumn<Tag>[] = useMemo(
    () => [
      {
        key: 'name',
        label: 'TAG NAME',
        width: '50%',
        render: (row) => (
          <div className="flex items-center gap-3">
            <div
              className="flex items-center justify-center rounded-sm shrink-0"
              style={{
                width: 32,
                height: 32,
                background: 'linear-gradient(134deg, #00f0ff 0%, #00363a 100%)',
              }}
            >
              <span className="text-[10px] font-mono font-bold" style={{ color: '#00f0ff' }}>
                #
              </span>
            </div>
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
        width: '34%',
        render: (row) => (
          <span className="text-[12px] font-mono leading-snug block" style={{ color: '#94a3b8' }}>
            /{row.slug}
          </span>
        ),
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
                setEditTagId(row.id);
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
              Tag Management
            </h1>
            <p
              className="text-[14px] md:text-[18px] leading-[1.7] max-w-[620px]"
              style={{ color: '#94a3b8' }}
            >
              Manage your content tags. Create and organize tags used across blog posts and other
              content types.
            </p>
          </div>
          <button
            onClick={() => {
              setEditTagId(null);
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
            <span className="leading-tight text-center">Add New Tag</span>
          </button>
        </div>

        {/* Data Table */}
        <Datatable<Tag>
          data={tags}
          columns={columns}
          rowKey="id"
          searchValue={search}
          onSearchChange={setSearch}
          searchPlaceholder="Filter by tag name…"
          loading={isLoading || (isFetching && !isLoading)}
          pagination={
            pagination
              ? {
                  currentPage: pagination.page,
                  totalPages: pagination.totalPages,
                  totalItems: pagination.total,
                  displayedItems: tags.length,
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

      {/* Tag Drawer (Create / Edit) */}
      <TagDrawer
        open={drawerOpen}
        editData={isLoadingDetail ? null : editData}
        isSubmitting={isCreating || isUpdating}
        onClose={closeDrawer}
        onSubmit={handleSubmit}
      />

      {/* Delete Confirmation */}
      <ConfirmDialog
        open={deleteTarget !== null}
        title="Delete Tag"
        message={`Are you sure you want to delete "${deleteTarget?.name}"? This action cannot be undone.`}
        confirmLabel={isDeleting ? 'Deleting…' : 'Delete'}
        cancelLabel="Cancel"
        onConfirm={() => {
          if (deleteTarget) deleteTag(deleteTarget.id);
        }}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
