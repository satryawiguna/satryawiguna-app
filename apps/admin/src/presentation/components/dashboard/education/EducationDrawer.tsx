'use client';

import { Drawer } from '@mui/material';
import type { Education, CreateEducationRequest, UpdateEducationRequest } from 'shared-types';
import { EducationForm } from './EducationForm';

interface EducationDrawerProps {
  open: boolean;
  editData?: Education | null;
  isSubmitting?: boolean;
  onClose: () => void;
  onSubmit: (values: CreateEducationRequest | UpdateEducationRequest) => Promise<void>;
}

export function EducationDrawer({
  open,
  editData,
  isSubmitting,
  onClose,
  onSubmit,
}: EducationDrawerProps) {
  const isEditMode = editData !== null && editData !== undefined;

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: { xs: '100vw', sm: 560 },
          bgcolor: '#060e20',
          borderLeft: '1px solid rgba(255,255,255,0.06)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        },
      }}
    >
      {/* Drawer header */}
      <div
        className="flex items-center justify-between px-6 py-5 shrink-0"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
      >
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <svg width="8" height="8" viewBox="0 0 10 10" fill="none">
              <circle cx="5" cy="5" r="4" stroke="#00dbe9" strokeWidth="1.5" />
              <circle cx="5" cy="5" r="1.5" fill="#00dbe9" />
            </svg>
            <span
              className="text-[11px] uppercase tracking-[2px] font-['Space_Grotesk',sans-serif] font-bold"
              style={{ color: '#00dbe9' }}
            >
              {isEditMode ? 'EDIT EDUCATION' : 'NEW EDUCATION'}
            </span>
          </div>
          <h2
            className="text-[20px] font-bold font-['Space_Grotesk',sans-serif]"
            style={{ color: '#dae2fd' }}
          >
            {isEditMode ? 'Update Education' : 'Add New Education'}
          </h2>
        </div>
        <button
          onClick={onClose}
          className="border-none bg-transparent cursor-pointer p-2 rounded transition-colors hover:bg-white/5"
          aria-label="Close drawer"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M3 3L13 13M13 3L3 13"
              stroke="#64748b"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      {/* Scrollable form body */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        <EducationForm
          initialData={editData}
          isSubmitting={isSubmitting}
          onSubmit={onSubmit}
          onCancel={onClose}
        />
      </div>
    </Drawer>
  );
}
