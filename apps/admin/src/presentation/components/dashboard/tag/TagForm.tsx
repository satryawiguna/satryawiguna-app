'use client';

import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import type { Tag, CreateTagRequest, UpdateTagRequest } from 'shared-types';

// ── Validation schema ─────────────────────────────────────────────

const tagSchema = Yup.object({
  name: Yup.string().required('Name is required').max(255),
  slug: Yup.string()
    .required('Slug is required')
    .matches(/^[a-z0-9-]+$/, 'Only lowercase letters, numbers and hyphens')
    .max(255),
});

// ── Form values type ──────────────────────────────────────────────

interface FormValues {
  name: string;
  slug: string;
}

// ── Props ─────────────────────────────────────────────────────────

interface TagFormProps {
  initialData?: Tag | null;
  isSubmitting?: boolean;
  onSubmit: (values: CreateTagRequest | UpdateTagRequest) => Promise<void>;
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

// ── Helper to auto-generate slug ──────────────────────────────────

function toSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

// ── Component ─────────────────────────────────────────────────────

export function TagForm({ initialData, isSubmitting, onSubmit, onCancel }: TagFormProps) {
  const initialValues: FormValues = {
    name: initialData?.name ?? '',
    slug: initialData?.slug ?? '',
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={tagSchema}
      enableReinitialize
      onSubmit={async (values) => {
        await onSubmit(values as CreateTagRequest | UpdateTagRequest);
      }}
    >
      {({ values, errors, touched, setFieldValue }) => (
        <Form className="flex flex-col gap-5">
          {/* Name */}
          <div>
            <label style={labelStyle}>Name *</label>
            <Field
              name="name"
              placeholder="python"
              style={inputStyle}
              onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                if (!values.slug) {
                  setFieldValue('slug', toSlug(e.target.value));
                }
              }}
            />
            {touched.name && errors.name && <p style={errorStyle}>{errors.name}</p>}
          </div>

          {/* Slug */}
          <div>
            <label style={labelStyle}>Slug *</label>
            <Field name="slug" placeholder="python" style={inputStyle} />
            {touched.slug && errors.slug && <p style={errorStyle}>{errors.slug}</p>}
          </div>

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
              {isSubmitting ? 'Saving…' : initialData ? 'Update Tag' : 'Create Tag'}
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
