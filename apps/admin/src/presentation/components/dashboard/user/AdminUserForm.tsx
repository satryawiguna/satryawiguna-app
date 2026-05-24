'use client';

import { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import type { AdminUser, CreateAdminUserRequest, UpdateAdminUserRequest } from 'shared-types';
import { MediaPickerModal } from '@/presentation/components/common';

// ── Validation schema ─────────────────────────────────────────────

const createSchema = Yup.object({
  name: Yup.string().required('Name is required').max(255),
  email: Yup.string().email('Invalid email').required('Email is required').max(255),
  phone: Yup.string().max(50),
  avatar_url: Yup.string(),
  password: Yup.string().min(6, 'Min 6 characters').required('Password is required'),
});

const updateSchema = Yup.object({
  name: Yup.string().required('Name is required').max(255),
  phone: Yup.string().max(50),
  avatar_url: Yup.string(),
});

// ── Form values type ──────────────────────────────────────────────

interface FormValues {
  name: string;
  email: string;
  phone: string;
  avatar_url: string;
  password: string;
}

// ── Props ─────────────────────────────────────────────────────────

interface AdminUserFormProps {
  initialData?: AdminUser | null;
  isSubmitting?: boolean;
  onSubmit: (values: CreateAdminUserRequest | UpdateAdminUserRequest) => Promise<void>;
  onCancel: () => void;
}

// ── Shared styles ─────────────────────────────────────────────────

const inputStyle: React.CSSProperties = {
  width: '100%',
  background: '#0d1526',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: 4,
  color: '#dae2fd',
  fontFamily: "'Space Grotesk', sans-serif",
  fontSize: 13,
  padding: '10px 12px',
  outline: 'none',
  boxSizing: 'border-box',
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  marginBottom: 6,
  fontSize: 11,
  fontFamily: "'Space Grotesk', sans-serif",
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '1.4px',
  color: '#64748b',
};

const errorStyle: React.CSSProperties = {
  fontSize: 11,
  color: '#f87171',
  fontFamily: "'Space Grotesk', sans-serif",
  marginTop: 4,
};

// ── Component ─────────────────────────────────────────────────────

export function AdminUserForm({
  initialData,
  isSubmitting,
  onSubmit,
  onCancel,
}: AdminUserFormProps) {
  const isEditMode = initialData !== null && initialData !== undefined;
  const [avatarPickerOpen, setAvatarPickerOpen] = useState(false);

  const initialValues: FormValues = {
    name: initialData?.name ?? '',
    email: initialData?.email ?? '',
    phone: initialData?.phone ?? '',
    avatar_url: initialData?.avatar_url ?? '',
    password: '',
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={isEditMode ? updateSchema : createSchema}
      enableReinitialize
      onSubmit={async (values) => {
        if (isEditMode) {
          const { name, phone, avatar_url } = values;
          await onSubmit({ name, phone, avatar_url } as UpdateAdminUserRequest);
        } else {
          await onSubmit(values as CreateAdminUserRequest);
        }
      }}
    >
      {({ values, errors, touched, setFieldValue }) => (
        <Form className="flex flex-col gap-5">
          {/* Avatar */}
          <div>
            <label style={labelStyle}>Avatar</label>
            <div className="flex items-center gap-3">
              {values.avatar_url ? (
                <div
                  className="relative rounded-full overflow-hidden shrink-0"
                  style={{ width: 72, height: 72, border: '1px solid rgba(255,255,255,0.1)' }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={values.avatar_url}
                    alt="avatar"
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => setFieldValue('avatar_url', '')}
                    className="absolute top-0.5 right-0.5 w-5 h-5 rounded-full flex items-center justify-center border-none outline-none cursor-pointer"
                    style={{ background: 'rgba(0,0,0,0.7)' }}
                  >
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                      <path
                        d="M1 1L7 7M7 1L1 7"
                        stroke="#94a3b8"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                </div>
              ) : (
                <div
                  className="rounded-full flex items-center justify-center shrink-0"
                  style={{
                    width: 72,
                    height: 72,
                    background: '#0d1526',
                    border: '1px dashed rgba(255,255,255,0.15)',
                  }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="8" r="4" stroke="#64748b" strokeWidth="1.5" />
                    <path
                      d="M4 20c0-4 3.6-6 8-6s8 2 8 6"
                      stroke="#64748b"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              )}
              <button
                type="button"
                onClick={() => setAvatarPickerOpen(true)}
                className="px-4 py-2 rounded-[2px] text-[12px] font-['Space_Grotesk',sans-serif] border-none outline-none cursor-pointer hover:opacity-80 transition-opacity"
                style={{
                  background: 'rgba(255,255,255,0.07)',
                  color: '#94a3b8',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
              >
                {values.avatar_url ? 'Change' : 'Select from Media Library'}
              </button>
            </div>
            <MediaPickerModal
              open={avatarPickerOpen}
              multiple={false}
              onClose={() => setAvatarPickerOpen(false)}
              onSelect={([url]) => {
                if (url) setFieldValue('avatar_url', url);
              }}
            />
          </div>

          {/* Name */}
          <div>
            <label style={labelStyle}>Name *</label>
            <Field name="name" placeholder="John Doe" style={inputStyle} />
            {touched.name && errors.name && <p style={errorStyle}>{errors.name}</p>}
          </div>

          {/* Email (create only) */}
          {!isEditMode && (
            <div>
              <label style={labelStyle}>Email *</label>
              <Field name="email" type="email" placeholder="user@example.com" style={inputStyle} />
              {touched.email && errors.email && <p style={errorStyle}>{errors.email}</p>}
            </div>
          )}

          {/* Phone */}
          <div>
            <label style={labelStyle}>Phone</label>
            <Field name="phone" placeholder="+1234567890" style={inputStyle} />
            {touched.phone && errors.phone && <p style={errorStyle}>{errors.phone}</p>}
          </div>

          {/* Password (create only) */}
          {!isEditMode && (
            <div>
              <label style={labelStyle}>Password *</label>
              <Field
                name="password"
                type="password"
                placeholder="Min 6 characters"
                style={inputStyle}
              />
              {touched.password && errors.password && <p style={errorStyle}>{errors.password}</p>}
            </div>
          )}

          {/* Actions */}
          <div
            className="flex gap-3 pt-4 border-t"
            style={{ borderColor: 'rgba(255,255,255,0.06)' }}
          >
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 py-3 rounded-[2px] text-[13px] font-['Space_Grotesk',sans-serif] font-bold border-none outline-none cursor-pointer transition-opacity hover:opacity-90 disabled:opacity-50"
              style={{ background: '#00f0ff', color: '#006970' }}
            >
              {isSubmitting ? 'Saving…' : isEditMode ? 'Update User' : 'Create User'}
            </button>
            <button
              type="button"
              onClick={onCancel}
              disabled={isSubmitting}
              className="flex-1 py-3 rounded-[2px] text-[13px] font-['Space_Grotesk',sans-serif] border-none outline-none cursor-pointer transition-opacity hover:opacity-80 disabled:opacity-50"
              style={{ background: 'rgba(255,255,255,0.07)', color: '#94a3b8' }}
            >
              Cancel
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
