'use client';

import { useState } from 'react';
import {
  Drawer,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';
import type { Asset } from 'shared-types';
import { mediaRepository } from '@/data/repositories';

interface AssetDetailDrawerProps {
  open: boolean;
  asset: Asset | null;
  onClose: () => void;
  onDeleted?: () => void;
}

export function AssetDetailDrawer({ open, asset, onClose, onDeleted }: AssetDetailDrawerProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  if (!asset) return null;

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(asset.publicUrl);
  };

  const handleDownload = () => {
    window.open(asset.publicUrl, '_blank');
  };

  const handleDeleteClick = () => {
    setConfirmOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (isDeleting) return;
    setIsDeleting(true);
    setConfirmOpen(false);
    try {
      await mediaRepository.deleteMedia(asset.id);
      onDeleted?.();
      onClose();
    } catch {
      setIsDeleting(false);
    }
  };

  const typeLabel = () => {
    switch (asset.type) {
      case 'image':
        return 'PNG Image';
      case 'video':
        return 'MP4 Video';
      case 'document':
        return 'PDF Document';
      case 'audio':
        return 'WAV Audio';
      default:
        return asset.mimeType;
    }
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: '320px',
          bgcolor: '#020617',
          borderLeft: '1px solid rgba(255,255,255,0.1)',
          '@media (max-width: 600px)': { width: '100%' },
        },
      }}
      disableScrollLock
    >
      <div className="flex flex-col h-full bg-[#020617]">
        {/* ===== Header ===== */}
        <div className="border-b border-[rgba(255,255,255,0.1)] shrink-0 relative">
          <div className="flex flex-col gap-[4px] items-start pb-[25px] pt-[24px] px-[24px]">
            <h3 className="font-['Space_Grotesk',sans-serif] font-normal text-[18px] text-white leading-[28px]">
              Asset Details
            </h3>
            <span className="font-['Space_Grotesk',sans-serif] font-normal text-[12px] text-[#64748b] leading-[16px] tracking-[1.2px] uppercase">
              SELECTED: 1 FILE
            </span>
          </div>
          {/* Close X */}
          <button
            onClick={onClose}
            className="absolute top-[20px] right-[20px] border-0 bg-transparent cursor-pointer text-[#64748b] hover:text-white transition-colors"
            style={{ outline: 'none' }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M3 3L11 11M11 3L3 11"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* ===== Body ===== */}
        <div className="flex-1 overflow-auto">
          <div className="flex flex-col gap-[24px] items-start p-[24px]">
            {/* Preview */}
            <div className="aspect-video bg-black border border-[rgba(255,255,255,0.05)] overflow-hidden p-px rounded-[4px] w-full">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={asset.thumbnailUrl}
                alt={asset.fileName}
                className="w-full h-full object-contain"
              />
            </div>

            {/* File Name */}
            <div className="flex flex-col gap-[8px] items-start w-full">
              <div className="w-full">
                <p className="font-['Space_Grotesk',sans-serif] font-normal text-[10px] text-[#64748b] leading-[15px] tracking-[1px] uppercase">
                  FILE NAME
                </p>
              </div>
              <div className="flex gap-[8px] items-center w-full">
                <div className="bg-[#131b2e] border border-[rgba(255,255,255,0.1)] flex-1 overflow-hidden p-[9px] rounded-[2px] min-w-0">
                  <p className="font-mono font-normal text-[12px] text-white leading-[16px] truncate">
                    {asset.fileName}
                  </p>
                </div>
                <button
                  className="border-0 bg-transparent cursor-pointer text-[#64748b] hover:text-[#22d3ee] transition-colors shrink-0"
                  style={{ outline: 'none' }}
                >
                  {/* Pencil/edit icon */}
                  <svg width="10.5" height="10.5" viewBox="0 0 11 11" fill="none">
                    <path
                      d="M8 1L10 3L4 9H2V7L8 1Z"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Metadata 2×2 */}
            <div className="grid grid-cols-2 gap-x-[16px] gap-y-[16px] w-full">
              <MetaField label="TYPE" value={typeLabel()} />
              <MetaField label="SIZE" value={asset.size} />
              <MetaField label="DIMENSIONS" value={asset.dimensions || '\u2014'} />
              <MetaField label="UPLOADED" value={asset.uploadedAt} />
            </div>

            {/* Public URL */}
            <div className="flex flex-col gap-[8px] items-start w-full">
              <p className="font-['Space_Grotesk',sans-serif] font-normal text-[10px] text-[#64748b] leading-[15px] tracking-[1px] uppercase">
                PUBLIC URL
              </p>
              <div className="bg-[#131b2e] border border-[rgba(255,255,255,0.1)] flex gap-[8px] items-center overflow-hidden p-[9px] rounded-[2px] w-full">
                <div className="flex-1 overflow-hidden min-w-0">
                  <p className="font-mono font-normal text-[10px] text-[rgba(34,211,238,0.8)] leading-[15px] truncate">
                    {asset.publicUrl}
                  </p>
                </div>
                <button
                  onClick={handleCopyUrl}
                  className="border-0 bg-transparent cursor-pointer text-[#64748b] hover:text-[#22d3ee] transition-colors shrink-0"
                  style={{ outline: 'none' }}
                >
                  {/* Copy icon */}
                  <svg width="10" height="12" viewBox="0 0 10 12" fill="none">
                    <rect
                      x="0.5"
                      y="2.5"
                      width="7"
                      height="9"
                      rx="1"
                      stroke="currentColor"
                      strokeWidth="1.2"
                    />
                    <path
                      d="M2.5 2.5V1.5C2.5 0.947715 2.94772 0.5 3.5 0.5H9.5C10.0523 0.5 10.5 0.947715 10.5 1.5V8.5C10.5 9.05228 10.0523 9.5 9.5 9.5H8.5"
                      stroke="currentColor"
                      strokeWidth="1.2"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="border-t border-[rgba(255,255,255,0.1)] pt-[25px] flex flex-col gap-[12px] items-start w-full">
              <p className="font-['Space_Grotesk',sans-serif] font-normal text-[10px] text-[#64748b] leading-[15px] tracking-[1px] uppercase">
                QUICK ACTIONS
              </p>

              {/* Download File */}
              <button
                onClick={handleDownload}
                className="border border-[rgba(34,211,238,0.2)] bg-[rgba(34,211,238,0.1)] rounded-[2px] w-full cursor-pointer hover:opacity-80 transition-opacity"
                style={{ outline: 'none' }}
              >
                <div className="flex gap-[12px] items-center pb-[11px] pt-[15px] px-[17px]">
                  <svg width="9.333" height="9.333" viewBox="0 0 10 10" fill="none">
                    <path
                      d="M5 1V7M5 7L2.5 4.5M5 7L7.5 4.5"
                      stroke="#22d3ee"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path d="M1 9H9" stroke="#22d3ee" strokeWidth="1.2" strokeLinecap="round" />
                  </svg>
                  <span className="font-['Inter',sans-serif] font-bold text-[#22d3ee] text-[12px] tracking-[1.2px] uppercase leading-[16px]">
                    DOWNLOAD FILE
                  </span>
                </div>
              </button>

              {/* Delete Forever */}
              <button
                onClick={handleDeleteClick}
                disabled={isDeleting}
                className="border border-[rgba(239,68,68,0.2)] bg-[rgba(239,68,68,0.1)] rounded-[2px] w-full cursor-pointer hover:opacity-80 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ outline: 'none' }}
              >
                <div className="flex gap-[12px] items-center px-[17px] py-[11px]">
                  <svg width="9.333" height="10.5" viewBox="0 0 10 11" fill="none">
                    <path
                      d="M1 2.5H9M3.5 1.5H6.5M4 4.5V8.5M6 4.5V8.5"
                      stroke="#f87171"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M2 2.5L2.7 9C2.73442 9.285 2.87194 9.54629 3.08511 9.73312C3.29828 9.91996 3.57213 10.0195 3.854 10.012H6.146C6.42787 10.0195 6.70172 9.91996 6.91489 9.73312C7.12806 9.54629 7.26558 9.285 7.3 9L8 2.5"
                      stroke="#f87171"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="font-['Inter',sans-serif] font-bold text-[#f87171] text-[12px] tracking-[1.2px] uppercase leading-[16px]">
                    {isDeleting ? 'DELETING...' : 'DELETE FOREVER'}
                  </span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Dialog */}
      <Dialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        PaperProps={{
          sx: {
            bgcolor: '#0f172a',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '8px',
            maxWidth: 380,
          },
        }}
      >
        <DialogTitle
          sx={{
            color: 'white',
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '18px',
            fontWeight: 600,
          }}
        >
          Delete Forever
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            sx={{ color: '#94a3b8', fontSize: 13, fontFamily: "'Inter', sans-serif" }}
          >
            Are you sure you want to permanently delete{' '}
            <strong style={{ color: '#f87171' }}>{asset?.fileName}</strong>? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button
            onClick={() => setConfirmOpen(false)}
            sx={{
              color: '#94a3b8',
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: 12,
              textTransform: 'uppercase',
              letterSpacing: '1.2px',
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            disabled={isDeleting}
            sx={{
              color: '#f87171',
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: 12,
              textTransform: 'uppercase',
              letterSpacing: '1.2px',
              fontWeight: 700,
            }}
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>
    </Drawer>
  );
}

function MetaField({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-[4px] items-start">
      <p className="font-['Space_Grotesk',sans-serif] font-normal text-[10px] text-[#64748b] leading-[15px] tracking-[1px] uppercase">
        {label}
      </p>
      <p className="font-mono font-normal text-[12px] text-white leading-[16px]">{value}</p>
    </div>
  );
}
