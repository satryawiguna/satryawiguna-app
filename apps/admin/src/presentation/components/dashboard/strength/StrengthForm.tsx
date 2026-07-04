'use client';

import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import type { Strength, CreateStrengthRequest, UpdateStrengthRequest } from 'shared-types';

// ── Validation schema ─────────────────────────────────────────────

const strengthSchema = Yup.object({
  description: Yup.string().required('Description is required').max(500),
  sort_order: Yup.number()
    .typeError('Sort order must be a number')
    .integer('Must be an integer')
    .min(0, 'Min 0')
    .required('Sort order is required'),
});

// ── Form values type ──────────────────────────────────────────────

interface FormValues {
  description: string;
  sort_order: number;
}

// ── Props ─────────────────────────────────────────────────────────

interface StrengthFormProps {
  initialData?: Strength | null;
  isSubmitting?: boolean;
  onSubmit: (values: CreateStrengthRequest | UpdateStrengthRequest) => Promise<void>;
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

export function StrengthForm({ initialData, isSubmitting, onSubmit, onCancel }: StrengthFormProps) {
  const initialValues: FormValues = {
    description: initialData?.description ?? '',
    sort_order: initialData?.sort_order ?? 0,
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={strengthSchema}
      enableReinitialize
      onSubmit={async (values) => {
        await onSubmit({
          description: values.description,
          sort_order: values.sort_order,
        });
      }}
    >
      {({ errors, touched }) => (
        <Form className="flex flex-col gap-5">
          {/* Description */}
          <div>
            <label style={labelStyle}>Description</label>
            <Field
              as="textarea"
              name="description"
              placeholder="e.g. System Architecture &amp; Scalability"
              style={textareaStyle}
            />
            {errors.description && touched.description && (
              <div style={errorStyle}>{errors.description}</div>
            )}
          </div>

          {/* Sort Order */}
          <div>
            <label style={labelStyle}>Sort Order</label>
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
              {isSubmitting ? 'Saving...' : initialData ? 'Update Strength' : 'Create Strength'}
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
