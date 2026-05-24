'use client';

import { useState, useCallback, useRef, useMemo } from 'react';
import { Dialog } from '@mui/material';
import type { Asset, AssetThumbnailMap } from 'shared-types';
import { mapMediaToAsset } from 'shared-types';
import { useMedia, useMediaUpload } from '@/presentation/hooks';

const MEDIA_THUMBNAILS: AssetThumbnailMap = {
  image: '/assets/media/thumb-image.svg',
  video: '/assets/media/thumb-video.svg',
  document: '/assets/media/thumb-document.svg',
  audio: '/assets/media/thumb-audio.svg',
};

type TabType = 'upload' | 'library';
type FilterType = 'all' | 'image' | 'video' | 'document' | 'audio';

interface MediaPickerModalProps {
  open: boolean;
  multiple?: boolean;
  onClose: () => void;
  /** Called with the selected public URL(s) */
  onSelect: (urls: string[]) => void;
}

export function MediaPickerModal({
  open,
  multiple = false,
  onClose,
  onSelect,
}: MediaPickerModalProps) {
  const { media, isLoading, isFetching, pagination, setPage, refetch } = useMedia();
  const onUploadSuccess = useCallback(() => {
    refetch();
    setTab('library');
  }, [refetch]);
  const { snapshot, upload, isUploading } = useMediaUpload(onUploadSuccess);

  const [tab, setTab] = useState<TabType>('library');
  const [filter, setFilter] = useState<FilterType>('all');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [activeAsset, setActiveAsset] = useState<Asset | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const assets = useMemo(() => media.map((m) => mapMediaToAsset(m, MEDIA_THUMBNAILS)), [media]);

  const filteredAssets = useMemo(() => {
    let result = filter === 'all' ? assets : assets.filter((a) => a.type === filter);
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter((a) => a.fileName.toLowerCase().includes(q));
    }
    return result;
  }, [assets, filter, search]);

  const toggleAsset = useCallback(
    (asset: Asset) => {
      setActiveAsset(asset);
      setSelected((prev) => {
        const next = new Set(prev);
        if (next.has(asset.publicUrl)) {
          next.delete(asset.publicUrl);
        } else {
          if (!multiple) next.clear();
          next.add(asset.publicUrl);
        }
        return next;
      });
    },
    [multiple]
  );

  const handleConfirm = () => {
    onSelect(Array.from(selected));
    setSelected(new Set());
    setActiveAsset(null);
    onClose();
  };

  const handleClose = () => {
    setSelected(new Set());
    setActiveAsset(null);
    onClose();
  };

  // ── Drag & Drop ───────────────────────────────────────────────
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragOver(false);
      const files = e.dataTransfer.files;
      if (files.length > 0 && !isUploading) upload(files[0]);
    },
    [upload, isUploading]
  );

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files && files.length > 0 && !isUploading) upload(files[0]);
      if (fileInputRef.current) fileInputRef.current.value = '';
    },
    [upload, isUploading]
  );

  const totalAssets = pagination?.total ?? assets.length;

  const uploadedAt = activeAsset
    ? new Date(activeAsset.uploadedAt)
        .toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        .toUpperCase()
    : '';

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth={false}
      PaperProps={{
        sx: {
          bgcolor: 'rgba(15,23,42,0.97)',
          backdropFilter: 'blur(6px)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '8px',
          width: '980px',
          maxWidth: '95vw',
          height: '740px',
          maxHeight: '90vh',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0px 25px 50px -12px rgba(0,0,0,0.25)',
        },
      }}
    >
      {/* ── Header ─────────────────────────────────────────────── */}
      <div
        className="shrink-0 flex items-center justify-between px-4 sm:px-6 py-3 sm:py-0"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}
      >
        <div className="flex items-center gap-2 sm:gap-4 min-w-0">
          {/* Title */}
          <h2 className="text-[20px] sm:text-[26px] font-medium font-['Space_Grotesk',sans-serif] text-white whitespace-nowrap leading-none shrink-0">
            Insert Media
          </h2>
          {/* Vertical divider — hidden on very small screens */}
          <div
            className="hidden sm:block w-px h-4 shrink-0"
            style={{ background: 'rgba(255,255,255,0.1)' }}
          />
          {/* Tabs */}
          <div className="flex items-center">
            {(['upload', 'library'] as TabType[]).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className="border-none outline-none bg-transparent cursor-pointer flex items-center justify-center px-2 sm:px-4"
                style={{
                  paddingTop: tab === t ? 12 : 13,
                  paddingBottom: tab === t ? 14 : 13,
                  borderBottom: `2px solid ${tab === t ? '#22d3ee' : 'transparent'}`,
                }}
              >
                <span
                  className="text-[10px] sm:text-[12px] font-semibold font-['Space_Grotesk',sans-serif] tracking-[1px] sm:tracking-[1.2px] uppercase leading-[12px] whitespace-nowrap"
                  style={{ color: tab === t ? '#22d3ee' : '#94a3b8' }}
                >
                  {t === 'upload' ? 'UPLOAD FILES' : 'MEDIA LIBRARY'}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Close button */}
        <button
          onClick={handleClose}
          className="w-8 h-8 sm:w-10 sm:h-10 rounded-[12px] flex items-center justify-center border-none outline-none bg-transparent cursor-pointer hover:opacity-70 transition-opacity shrink-0 ml-2"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M1 1L13 13M13 1L1 13"
              stroke="#64748b"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      {/* ── Upload Files Tab ────────────────────────────────────── */}
      {tab === 'upload' && (
        <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-12">
          <div
            className={`border-2 border-dashed rounded-[8px] p-8 sm:p-12 flex flex-col items-center gap-5 transition-colors w-full max-w-[520px] ${
              isDragOver
                ? 'border-[#22d3ee] bg-[rgba(34,211,238,0.08)]'
                : 'border-[rgba(255,255,255,0.1)]'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="bg-[rgba(34,211,238,0.1)] rounded-[10px] w-12 h-12 flex items-center justify-center">
              <svg width="22" height="17" viewBox="0 0 28 20" fill="none">
                <path
                  d="M22 8C22 3.58 18.42 0 14 0C9.58 0 6 3.58 6 8C2.69 8.6 0.1 11.42 0 14.75C-0.1 18.1 2.69 20.9 6 20H22C25.31 20 28 17.31 28 14C28 10.69 25.31 8 22 8Z"
                  stroke="#22d3ee"
                  strokeWidth="1.5"
                />
                <path
                  d="M14 14V6M10 10L14 6L18 10"
                  stroke="#22d3ee"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="flex flex-col items-center gap-3 text-center">
              <p className="text-[13px] font-['Space_Grotesk',sans-serif] text-[#94a3b8]">
                Drag & drop your files here
              </p>
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                onChange={handleFileSelect}
                accept="image/*,video/*,audio/*,.pdf,.svg"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="border-0 cursor-pointer bg-[#22d3ee] px-5 py-2 rounded-[2px] font-['Space_Grotesk',sans-serif] font-bold text-[11px] text-[#020617] tracking-[1.2px] uppercase disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isUploading ? `UPLOADING ${snapshot?.progress ?? 0}%` : 'UPLOAD FILE'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Media Library Tab ───────────────────────────────────── */}
      {tab === 'library' && (
        <>
          {/* Search & Filter bar */}
          <div
            className="shrink-0 flex flex-wrap items-center gap-2 px-4 sm:px-6 py-2 sm:py-3"
            style={{
              background: 'rgba(6,14,32,0.5)',
              borderBottom: '1px solid rgba(255,255,255,0.05)',
            }}
          >
            {/* Search + dropdown row */}
            <div className="flex flex-1 items-center gap-2 min-w-0">
              {/* Search input */}
              <div className="relative flex-1 sm:flex-none min-w-0">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg width="10.5" height="10.5" viewBox="0 0 12 12" fill="none">
                    <circle cx="5" cy="5" r="4" stroke="#6b7280" strokeWidth="1.2" />
                    <path
                      d="M8.5 8.5L11 11"
                      stroke="#6b7280"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search assets..."
                  className="w-full sm:w-56 bg-[rgba(0,0,0,0.4)] border border-[rgba(255,255,255,0.1)] rounded-[4px] pl-[36px] pr-3 py-[7px] text-[13px] font-normal text-[#dae2fd] placeholder:text-[#6b7280] outline-none"
                />
              </div>

              {/* Type filter dropdown */}
              <div className="relative shrink-0">
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value as FilterType)}
                  className="appearance-none bg-[rgba(0,0,0,0.4)] border border-[rgba(255,255,255,0.1)] rounded-[4px] pl-3 pr-7 py-[7px] text-[13px] text-[#cbd5e1] outline-none cursor-pointer"
                >
                  <option value="all">All media items</option>
                  <option value="image">Images</option>
                  <option value="video">Videos</option>
                  <option value="document">Documents</option>
                  <option value="audio">Audio</option>
                </select>
                <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                    <path
                      d="M3 4.5L6 7.5L9 4.5"
                      stroke="#94a3b8"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Asset count — hidden on narrow */}
            <span className="hidden sm:block text-[11px] font-['Space_Grotesk',sans-serif] text-[#64748b] tracking-[1.2px] whitespace-nowrap shrink-0">
              {isLoading || isFetching
                ? 'Loading…'
                : `Showing ${filteredAssets.length} of ${totalAssets} assets`}
            </span>
          </div>

          {/* Content body: grid + sidebar */}
          <div className="flex-1 flex min-h-0 overflow-hidden">
            {/* Asset grid */}
            <div className="flex-1 overflow-auto p-3 sm:p-6">
              {isLoading ? (
                <div className="flex items-center justify-center h-32">
                  <span className="text-[13px] font-mono text-[#64748b]">Loading media…</span>
                </div>
              ) : filteredAssets.length === 0 ? (
                <div className="flex items-center justify-center h-32">
                  <span className="text-[13px] font-mono text-[#64748b]">No media found.</span>
                </div>
              ) : (
                <>
                  <div
                    className="grid gap-2 sm:gap-4"
                    style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(90px, 1fr))' }}
                  >
                    {filteredAssets.map((asset) => {
                      const isSelected = selected.has(asset.publicUrl);
                      return (
                        <button
                          key={asset.id}
                          onClick={() => toggleAsset(asset)}
                          className="relative flex flex-col overflow-hidden border-none outline-none cursor-pointer transition-all rounded-[4px]"
                          style={{
                            border: `2px solid ${isSelected ? '#22d3ee' : 'rgba(255,255,255,0.1)'}`,
                            padding: isSelected ? '2px' : '1px',
                            background: 'transparent',
                            boxShadow: isSelected ? '0px 0px 15px 0px rgba(0,240,255,0.2)' : 'none',
                          }}
                        >
                          {/* Thumbnail */}
                          <div
                            className="relative w-full overflow-hidden"
                            style={{ height: 90, background: '#0d1526' }}
                          >
                            {asset.type === 'image' ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img
                                src={asset.publicUrl}
                                alt={asset.fileName}
                                className="absolute inset-0 w-full h-full object-cover"
                              />
                            ) : (
                              <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 bg-[#222a3d]">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                  src={asset.thumbnailUrl}
                                  alt={asset.type}
                                  className="w-6 h-5 opacity-70"
                                />
                                <p className="text-[9px] font-['Space_Grotesk',sans-serif] text-[#94a3b8] truncate px-1 w-full text-center">
                                  {asset.fileName}
                                </p>
                              </div>
                            )}
                            {isSelected && (
                              <div className="absolute inset-0 bg-[rgba(34,211,238,0.1)]" />
                            )}
                          </div>

                          {/* Checkmark badge */}
                          {isSelected && (
                            <div
                              className="absolute top-1.5 right-1.5 rounded-[12px] flex items-center justify-center"
                              style={{
                                width: 20,
                                height: 20,
                                background: '#22d3ee',
                                boxShadow: '0px 4px 6px -4px rgba(0,0,0,0.1)',
                              }}
                            >
                              <svg width="9" height="7" viewBox="0 0 9.5 7" fill="none">
                                <path
                                  d="M1 3.5L3.5 6L8.5 1"
                                  stroke="#020617"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Pagination */}
                  {pagination && pagination.totalPages > 1 && (
                    <div className="flex items-center justify-center gap-2 mt-4 sm:mt-6">
                      <button
                        onClick={() => setPage(pagination.page - 1)}
                        disabled={!pagination.hasPreviousPage}
                        className="px-3 py-1.5 rounded-[2px] text-[11px] font-mono border-none outline-none cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed transition-opacity hover:opacity-80"
                        style={{ background: 'rgba(255,255,255,0.05)', color: '#94a3b8' }}
                      >
                        ← Prev
                      </button>
                      <span className="text-[11px] font-mono text-[#64748b]">
                        {pagination.page} / {pagination.totalPages}
                      </span>
                      <button
                        onClick={() => setPage(pagination.page + 1)}
                        disabled={!pagination.hasNextPage}
                        className="px-3 py-1.5 rounded-[2px] text-[11px] font-mono border-none outline-none cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed transition-opacity hover:opacity-80"
                        style={{ background: 'rgba(255,255,255,0.05)', color: '#94a3b8' }}
                      >
                        Next →
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* ── Attachment Details Sidebar (md+ only) ────────── */}
            <div
              className="hidden md:flex shrink-0 w-64 lg:w-80 overflow-auto flex-col gap-5 pl-5 pr-5 py-5"
              style={{
                background: 'rgba(0,0,0,0.4)',
                borderLeft: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              {activeAsset ? (
                <>
                  {/* Details block */}
                  <div className="flex flex-col gap-3">
                    <h4 className="text-[11px] font-semibold font-['Space_Grotesk',sans-serif] tracking-[1.2px] text-[#64748b] leading-[12px]">
                      ATTACHMENT DETAILS
                    </h4>

                    {/* Preview */}
                    <div
                      className="rounded-[4px] overflow-hidden"
                      style={{
                        background: '#060e20',
                        border: '1px solid rgba(255,255,255,0.1)',
                        padding: '4px 1px 1px',
                      }}
                    >
                      <div className="aspect-video w-full relative overflow-hidden">
                        {activeAsset.type === 'image' ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={activeAsset.publicUrl}
                            alt={activeAsset.fileName}
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center bg-[#0d1526]">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={activeAsset.thumbnailUrl}
                              alt={activeAsset.type}
                              className="w-12 h-12 opacity-40"
                            />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* File info */}
                    <div className="flex flex-col gap-1 pt-0.5">
                      <p className="text-[12px] font-bold text-white leading-[16px] truncate">
                        {activeAsset.fileName}
                      </p>
                      <p className="text-[10px] font-['Space_Grotesk',sans-serif] text-[#64748b] leading-[15px]">
                        {uploadedAt} — {activeAsset.size}
                      </p>
                      {activeAsset.dimensions && (
                        <p className="text-[10px] font-['Space_Grotesk',sans-serif] text-[#64748b] leading-[15px]">
                          {activeAsset.dimensions}
                        </p>
                      )}
                    </div>

                    {/* Quick actions */}
                    <div className="flex items-center gap-2">
                      <button className="border-none outline-none bg-transparent cursor-pointer py-[4.5px] hover:opacity-70 transition-opacity">
                        <span className="text-[10px] font-['Space_Grotesk',sans-serif] text-[#22d3ee] leading-[15px]">
                          EDIT IMAGE
                        </span>
                      </button>
                      <span className="text-[#334155] text-[16px] leading-[24px]">|</span>
                      <button className="border-none outline-none bg-transparent cursor-pointer py-[4.5px] hover:opacity-70 transition-opacity">
                        <span className="text-[10px] font-['Space_Grotesk',sans-serif] text-[#f87171] leading-[15px]">
                          DELETE PERMANENTLY
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Metadata fields */}
                  <div className="flex flex-col gap-3">
                    {/* Alt text */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-['Space_Grotesk',sans-serif] text-[#94a3b8] leading-[15px]">
                        ALT TEXT
                      </label>
                      <textarea
                        rows={3}
                        className="w-full rounded-[2px] px-3 py-2 text-[13px] text-[#dae2fd] outline-none resize-none font-normal leading-[18px]"
                        style={{
                          background: 'rgba(0,0,0,0.6)',
                          border: '1px solid rgba(255,255,255,0.1)',
                        }}
                        defaultValue=""
                      />
                      <p className="text-[10px] italic text-[#64748b] leading-[14px]">
                        Describe the purpose of the image for accessibility.
                      </p>
                    </div>

                    {/* Title */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-['Space_Grotesk',sans-serif] text-[#94a3b8] leading-[15px]">
                        TITLE
                      </label>
                      <input
                        type="text"
                        className="w-full rounded-[2px] px-3 py-2 text-[13px] text-[#dae2fd] outline-none font-normal"
                        style={{
                          background: 'rgba(0,0,0,0.6)',
                          border: '1px solid rgba(255,255,255,0.1)',
                        }}
                        defaultValue=""
                      />
                    </div>

                    {/* Caption */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-['Space_Grotesk',sans-serif] text-[#94a3b8] leading-[15px]">
                        CAPTION
                      </label>
                      <input
                        type="text"
                        className="w-full rounded-[2px] px-3 py-2 text-[13px] text-[#6b7280] outline-none font-normal"
                        style={{
                          background: 'rgba(0,0,0,0.6)',
                          border: '1px solid rgba(255,255,255,0.1)',
                        }}
                        placeholder="Add a caption..."
                      />
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <p className="text-[12px] font-['Space_Grotesk',sans-serif] text-[#64748b] text-center leading-[16px]">
                    Select an asset to view details.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* ── Selected info + metadata (mobile only) ── */}
          {activeAsset && (
            <div
              className="md:hidden shrink-0 overflow-auto flex flex-col gap-3 px-4 py-3"
              style={{
                maxHeight: '220px',
                background: 'rgba(0,0,0,0.5)',
                borderTop: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              {/* File info row */}
              <div className="flex items-center gap-3">
                {activeAsset.type === 'image' && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={activeAsset.publicUrl}
                    alt={activeAsset.fileName}
                    className="w-10 h-10 rounded-[2px] object-cover shrink-0"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] font-bold text-white truncate leading-none">
                    {activeAsset.fileName}
                  </p>
                  <p className="text-[10px] text-[#64748b] leading-[16px]">{activeAsset.size}</p>
                </div>
              </div>

              {/* Alt text */}
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-['Space_Grotesk',sans-serif] text-[#94a3b8] tracking-[1px] uppercase leading-none">
                  Alt Text
                </label>
                <textarea
                  rows={2}
                  className="w-full rounded-[2px] px-3 py-2 text-[12px] text-[#dae2fd] outline-none resize-none font-normal leading-[18px]"
                  style={{
                    background: 'rgba(0,0,0,0.6)',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                  placeholder="Describe the image…"
                />
              </div>

              {/* Title + Caption side by side */}
              <div className="flex gap-2">
                <div className="flex flex-col gap-1 flex-1 min-w-0">
                  <label className="text-[10px] font-['Space_Grotesk',sans-serif] text-[#94a3b8] tracking-[1px] uppercase leading-none">
                    Title
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-[2px] px-3 py-2 text-[12px] text-[#dae2fd] outline-none font-normal"
                    style={{
                      background: 'rgba(0,0,0,0.6)',
                      border: '1px solid rgba(255,255,255,0.1)',
                    }}
                  />
                </div>
                <div className="flex flex-col gap-1 flex-1 min-w-0">
                  <label className="text-[10px] font-['Space_Grotesk',sans-serif] text-[#94a3b8] tracking-[1px] uppercase leading-none">
                    Caption
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-[2px] px-3 py-2 text-[12px] text-[#6b7280] outline-none font-normal"
                    style={{
                      background: 'rgba(0,0,0,0.6)',
                      border: '1px solid rgba(255,255,255,0.1)',
                    }}
                    placeholder="Add a caption…"
                  />
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {/* ── Footer ─────────────────────────────────────────────── */}
      <div
        className="shrink-0 flex items-center justify-between px-4 sm:px-6 py-2.5"
        style={{ background: '#060e20', borderTop: '1px solid rgba(255,255,255,0.1)' }}
      >
        {/* Left: save status — hidden on narrow */}
        <div className="hidden sm:flex items-center gap-2">
          <svg width="13" height="9.33" viewBox="0 0 14 10" fill="none">
            <path
              d="M1 5C3 1.5 11 1.5 13 5C11 8.5 3 8.5 1 5Z"
              stroke="#64748b"
              strokeWidth="1"
              strokeLinejoin="round"
            />
            <circle cx="7" cy="5" r="1.5" stroke="#64748b" strokeWidth="1" />
          </svg>
          <span className="text-[12px] font-normal text-[#64748b] leading-[16px] whitespace-nowrap">
            All changes saved to cloud storage
          </span>
        </div>

        {/* Right: actions */}
        <div className="flex items-center gap-2 sm:gap-3 ml-auto">
          <button
            onClick={handleClose}
            className="flex items-center justify-center px-4 sm:px-5 py-2 rounded-[2px] border-none outline-none bg-transparent cursor-pointer hover:opacity-80 transition-opacity"
          >
            <span className="text-[11px] sm:text-[12px] font-semibold font-['Space_Grotesk',sans-serif] text-[#cbd5e1] tracking-[1.2px] uppercase leading-[12px]">
              CANCEL
            </span>
          </button>
          <button
            onClick={handleConfirm}
            disabled={selected.size === 0}
            className="flex items-center justify-center px-4 sm:px-6 py-2 rounded-[2px] border-none outline-none cursor-pointer hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap"
            style={{
              background: '#22d3ee',
              filter: 'drop-shadow(0px 0px 10px rgba(0,240,255,0.3))',
            }}
          >
            <span className="text-[11px] sm:text-[12px] font-bold font-['Space_Grotesk',sans-serif] text-black tracking-[1.2px] uppercase leading-[12px]">
              INSERT INTO POST
            </span>
          </button>
        </div>
      </div>
    </Dialog>
  );
}
