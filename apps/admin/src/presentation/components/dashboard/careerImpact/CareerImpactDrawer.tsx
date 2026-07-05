'use client';

import { Drawer } from '@mui/material';
import type {
  CareerImpact,
  CreateCareerImpactRequest,
  UpdateCareerImpactRequest,
} from 'shared-types';
import { CareerImpactForm } from './CareerImpactForm';

interface CareerImpactDrawerProps {
  open: boolean;
  editData?: CareerImpact | null;
  isSubmitting?: boolean;
  onClose: () => void;
  onSubmit: (values: CreateCareerImpactRequest | UpdateCareerImpactRequest) => Promise<void>;
}

export function CareerImpactDrawer({
  open,
  editData,
  isSubmitting,
  onClose,
  onSubmit,
}: CareerImpactDrawerProps) {
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
              className="text-[10px] uppercase tracking-[2px] font-['Space_Grotesk',sans-serif]"
              style={{ color: '#64748b' }}
            >
              ADMINISTRATION SHELL
            </span>
          </div>
          <h2
            className="text-[18px] font-bold font-['Space_Grotesk',sans-serif] m-0"
            style={{ color: '#dae2fd' }}
          >
            {isEditMode ? 'Edit Career Impact' : 'Create Career Impact'}
          </h2>
        </div>
        <button
          onClick={onClose}
          style={{
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 4,
            padding: '6px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#64748b',
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M1 1L13 13M13 1L1 13"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      {/* Drawer body */}
      <div className="flex-1 overflow-y-auto p-6">
        <CareerImpactForm
          initialData={editData ?? null}
          isSubmitting={isSubmitting}
          onSubmit={onSubmit}
          onCancel={onClose}
        />
      </div>
    </Drawer>
  );
}
