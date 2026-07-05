'use client';

import { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import type {
  CareerImpact,
  CreateCareerImpactRequest,
  UpdateCareerImpactRequest,
} from 'shared-types';
import { MediaPickerModal } from '@/presentation/components/common';

// ── Validation schema ─────────────────────────────────────────────

const careerImpactSchema = Yup.object({
  title: Yup.string().required('Title is required').max(255),
  description: Yup.string().required('Description is required').max(1000),
  quote: Yup.string().required('Quote is required').max(500),
  icon_url: Yup.string().required('Icon URL is required').max(500),
  sort_order: Yup.number()
    .typeError('Sort order must be a number')
    .integer('Must be an integer')
    .min(0, 'Min 0')
    .required('Sort order is required'),
});

// ── Form values type ──────────────────────────────────────────────

interface FormValues {
  title: string;
  description: string;
  quote: string;
  icon_url: string;
  sort_order: number;
}

// ── Props ─────────────────────────────────────────────────────────

interface CareerImpactFormProps {
  initialData?: CareerImpact | null;
  isSubmitting?: boolean;
  onSubmit: (values: CreateCareerImpactRequest | UpdateCareerImpactRequest) => Promise<void>;
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

const textareaStyle: React.CSSProperties = {
  ...inputStyle,
  resize: 'vertical',
  minHeight: 80,
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

export function CareerImpactForm({
  initialData,
  isSubmitting,
  onSubmit,
  onCancel,
}: CareerImpactFormProps) {
  const [iconPickerOpen, setIconPickerOpen] = useState(false);
  const [previewError, setPreviewError] = useState(false);

  const initialValues: FormValues = {
    title: initialData?.title ?? '',
    description: initialData?.description ?? '',
    quote: initialData?.quote ?? '',
    icon_url: initialData?.icon_url ?? '',
    sort_order: initialData?.sort_order ?? 0,
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={careerImpactSchema}
      enableReinitialize
      onSubmit={async (values) => {
        await onSubmit({
          title: values.title,
          description: values.description,
          quote: values.quote,
          icon_url: values.icon_url,
          sort_order: values.sort_order,
        });
      }}
    >
      {({ values, errors, touched, setFieldValue }) => (
        <Form className="flex flex-col gap-5">
          {/* Title */}
          <div>
            <label style={labelStyle}>Title *</label>
            <Field name="title" placeholder="e.g. Regional Full-Stack Role" style={inputStyle} />
            {errors.title && touched.title && <div style={errorStyle}>{errors.title}</div>}
          </div>

          {/* Description */}
          <div>
            <label style={labelStyle}>Description *</label>
            <Field
              as="textarea"
              name="description"
              placeholder="Describe the career impact in detail..."
              style={textareaStyle}
            />
            {errors.description && touched.description && (
              <div style={errorStyle}>{errors.description}</div>
            )}
          </div>

          {/* Quote */}
          <div>
            <label style={labelStyle}>Quote *</label>
            <Field
              name="quote"
              placeholder='e.g. "Scaling platforms for 500k+ daily active users"'
              style={inputStyle}
            />
            {errors.quote && touched.quote && <div style={errorStyle}>{errors.quote}</div>}
          </div>

          {/* Icon (MediaPickerModal) */}
          <div>
            <label style={labelStyle}>Icon *</label>
            <div className="flex items-center gap-3">
              {values.icon_url && !previewError ? (
                <div
                  className="relative rounded overflow-hidden shrink-0"
                  style={{ width: 72, height: 72, border: '1px solid rgba(255,255,255,0.1)' }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={values.icon_url}
                    alt="icon"
                    className="w-full h-full object-cover"
                    onError={() => setPreviewError(true)}
                  />
                  <button
                    type="button"
                    onClick={() => setFieldValue('icon_url', '')}
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
                  className="rounded flex items-center justify-center shrink-0"
                  style={{
                    width: 72,
                    height: 72,
                    background: '#0d1526',
                    border: '1px dashed rgba(255,255,255,0.15)',
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <rect
                      x="3"
                      y="3"
                      width="18"
                      height="18"
                      rx="2"
                      stroke="#64748b"
                      strokeWidth="1.5"
                    />
                    <circle cx="8.5" cy="8.5" r="1.5" stroke="#64748b" strokeWidth="1.5" />
                    <path
                      d="M21 15L16 10L5 21"
                      stroke="#64748b"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              )}
              <button
                type="button"
                onClick={() => setIconPickerOpen(true)}
                className="px-4 py-2 rounded-[2px] text-[12px] font-['Space_Grotesk',sans-serif] border-none outline-none cursor-pointer hover:opacity-80 transition-opacity"
                style={{
                  background: 'rgba(255,255,255,0.07)',
                  color: '#94a3b8',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
              >
                {values.icon_url ? 'Change' : 'Select from Media Library'}
              </button>
            </div>
            {touched.icon_url && errors.icon_url && <div style={errorStyle}>{errors.icon_url}</div>}
            <MediaPickerModal
              open={iconPickerOpen}
              multiple={false}
              onClose={() => setIconPickerOpen(false)}
              onSelect={([url]) => {
                if (url) setFieldValue('icon_url', url);
              }}
            />
          </div>

          {/* Sort Order */}
          <div>
            <label style={labelStyle}>Sort Order *</label>
            <Field type="number" name="sort_order" placeholder="0" style={inputStyle} />
            {errors.sort_order && touched.sort_order && (
              <div style={errorStyle}>{errors.sort_order}</div>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                flex: 1,
                padding: '10px 24px',
                background: isSubmitting
                  ? 'rgba(34,211,238,0.3)'
                  : 'linear-gradient(134deg, #00f0ff 0%, #00363a 100%)',
                border: 'none',
                borderRadius: 4,
                color: '#fff',
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 600,
                fontSize: 13,
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
              }}
            >
              {isSubmitting
                ? 'Saving...'
                : initialData
                  ? 'Update Career Impact'
                  : 'Create Career Impact'}
            </button>
            <button
              type="button"
              onClick={onCancel}
              disabled={isSubmitting}
              style={{
                padding: '10px 24px',
                background: 'transparent',
                border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: 4,
                color: '#94a3b8',
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 600,
                fontSize: 13,
                cursor: 'pointer',
              }}
            >
              Cancel
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
