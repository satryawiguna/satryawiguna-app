'use client';

import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { type Dayjs } from 'dayjs';
import type { Education, CreateEducationRequest, UpdateEducationRequest } from 'shared-types';

// ── Validation schema ─────────────────────────────────────────────

const educationSchema = Yup.object({
  degree: Yup.string().required('Degree is required').max(255),
  institution: Yup.string().required('Institution is required').max(255),
  start_year: Yup.number().required('Start year is required').integer().min(1900),
  end_year: Yup.number().nullable().integer().min(1900),
  sort_order: Yup.number().integer().min(0).default(0),
});

// ── Form values type ──────────────────────────────────────────────

interface FormValues {
  degree: string;
  institution: string;
  start_year: number | null;
  end_year: number | null;
  sort_order: number;
}

// ── Props ─────────────────────────────────────────────────────────

interface EducationFormProps {
  initialData?: Education | null;
  isSubmitting?: boolean;
  onSubmit: (values: CreateEducationRequest | UpdateEducationRequest) => Promise<void>;
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

const datePickerSx = {
  width: '100%',
  '& .MuiInputBase-root': {
    background: '#0d1526',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '4px',
    color: '#dae2fd',
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: 13,
    '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.2)' },
    '&.Mui-focused fieldset': { borderColor: '#00dbe9' },
  },
  '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
  '& .MuiSvgIcon-root': { color: '#64748b' },
  '& .MuiInputBase-input': { padding: '10px 12px' },
};

// ── Component ─────────────────────────────────────────────────────

export function EducationForm({
  initialData,
  isSubmitting,
  onSubmit,
  onCancel,
}: EducationFormProps) {
  const initialValues: FormValues = {
    degree: initialData?.degree ?? '',
    institution: initialData?.institution ?? '',
    start_year: initialData?.start_year ?? null,
    end_year: initialData?.end_year ?? null,
    sort_order: initialData?.sort_order ?? 0,
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={educationSchema}
      enableReinitialize
      onSubmit={async (values) => {
        await onSubmit({
          degree: values.degree,
          institution: values.institution,
          start_year: values.start_year!,
          end_year: values.end_year,
          sort_order: values.sort_order,
        });
      }}
    >
      {({ values, errors, touched, setFieldValue }) => (
        <Form className="flex flex-col gap-5">
          {/* Degree */}
          <div>
            <label style={labelStyle}>Degree *</label>
            <Field name="degree" placeholder="Bachelor of Computer Science" style={inputStyle} />
            {touched.degree && errors.degree && <p style={errorStyle}>{errors.degree}</p>}
          </div>

          {/* Institution */}
          <div>
            <label style={labelStyle}>Institution *</label>
            <Field name="institution" placeholder="Udayana University" style={inputStyle} />
            {touched.institution && errors.institution && (
              <p style={errorStyle}>{errors.institution}</p>
            )}
          </div>

          {/* Start Year / End Year */}
          <div className="grid grid-cols-2 gap-4">
            {/* Start Year */}
            <div>
              <label style={labelStyle}>Start Year *</label>
              <DatePicker
                views={['year']}
                openTo="year"
                value={values.start_year ? dayjs().set('year', values.start_year) : null}
                onChange={(newValue: Dayjs | null) => {
                  setFieldValue('start_year', newValue ? newValue.year() : null);
                }}
                sx={datePickerSx}
                slotProps={{
                  textField: { placeholder: 'Select year', size: 'small' },
                  popper: {
                    sx: {
                      '& .MuiPaper-root': {
                        bgcolor: '#0d1526',
                        border: '1px solid rgba(255,255,255,0.1)',
                        color: '#dae2fd',
                      },
                      '& .MuiPickersYear-yearButton': { color: '#dae2fd' },
                      '& .MuiPickersYear-yearButton.Mui-selected': {
                        bgcolor: '#00dbe9',
                        color: '#006970',
                      },
                    },
                  },
                }}
              />
              {touched.start_year && errors.start_year && (
                <p style={errorStyle}>{errors.start_year as string}</p>
              )}
            </div>

            {/* End Year */}
            <div>
              <label style={labelStyle}>End Year</label>
              <DatePicker
                views={['year']}
                openTo="year"
                value={values.end_year ? dayjs().set('year', values.end_year) : null}
                onChange={(newValue: Dayjs | null) => {
                  setFieldValue('end_year', newValue ? newValue.year() : null);
                }}
                sx={datePickerSx}
                slotProps={{
                  textField: { placeholder: 'Present', size: 'small' },
                  popper: {
                    sx: {
                      '& .MuiPaper-root': {
                        bgcolor: '#0d1526',
                        border: '1px solid rgba(255,255,255,0.1)',
                        color: '#dae2fd',
                      },
                      '& .MuiPickersYear-yearButton': { color: '#dae2fd' },
                      '& .MuiPickersYear-yearButton.Mui-selected': {
                        bgcolor: '#00dbe9',
                        color: '#006970',
                      },
                    },
                  },
                }}
              />
              {touched.end_year && errors.end_year && (
                <p style={errorStyle}>{errors.end_year as string}</p>
              )}
            </div>
          </div>

          {/* Sort Order */}
          <div>
            <label style={labelStyle}>Sort Order</label>
            <Field name="sort_order" type="number" min="0" style={inputStyle} />
            {touched.sort_order && errors.sort_order && (
              <p style={errorStyle}>{errors.sort_order as string}</p>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onCancel}
              disabled={isSubmitting}
              className="flex-1 py-3 rounded text-[13px] font-['Space_Grotesk',sans-serif] transition-opacity hover:opacity-80 disabled:opacity-40 cursor-pointer border-none"
              style={{
                background: 'rgba(255,255,255,0.05)',
                color: '#94a3b8',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 py-3 rounded text-[13px] font-['Space_Grotesk',sans-serif] font-bold transition-opacity hover:opacity-90 disabled:opacity-40 cursor-pointer border-none"
              style={{
                background: '#00f0ff',
                color: '#006970',
                boxShadow: '0px 0px 10px rgba(0,240,255,0.2)',
              }}
            >
              {isSubmitting ? 'Saving…' : initialData ? 'Update Education' : 'Add Education'}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
