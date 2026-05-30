'use client';

import { useState, useEffect, useDeferredValue } from 'react';
import dynamic from 'next/dynamic';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Autocomplete, TextField, Chip, CircularProgress } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import type {
  ExperienceDetail,
  CreateExperienceRequest,
  UpdateExperienceRequest,
  EmploymentType,
} from 'shared-types';
import { useSkillsSearch } from '@/presentation/hooks';

const MDXEditorField = dynamic(
  () =>
    import('@/presentation/components/common/MDXEditorField').then((m) => ({
      default: m.MDXEditorField,
    })),
  { ssr: false }
);

// ── Employment type options ───────────────────────────────────────

const EMPLOYMENT_TYPE_OPTIONS: { value: EmploymentType; label: string }[] = [
  { value: 'FULL_TIME', label: 'Full Time' },
  { value: 'PART_TIME', label: 'Part Time' },
  { value: 'CONTRACT', label: 'Contract' },
  { value: 'FREELANCE', label: 'Freelance' },
  { value: 'INTERNSHIP', label: 'Internship' },
];

// ── Validation schema ─────────────────────────────────────────────

const experienceSchema = Yup.object({
  title: Yup.string().required('Title is required').max(255),
  company: Yup.string().required('Company is required').max(255),
  employment_type: Yup.string()
    .oneOf(['FULL_TIME', 'PART_TIME', 'CONTRACT', 'FREELANCE', 'INTERNSHIP'])
    .required('Employment type is required'),
  description: Yup.string().required('Description is required'),
  start_date: Yup.string().required('Start date is required'),
  end_date: Yup.string().nullable(),
  sort_order: Yup.number().integer().min(0).default(0),
  skill_ids: Yup.array().of(Yup.number()),
});

// ── Form values type ──────────────────────────────────────────────

interface FormValues {
  title: string;
  company: string;
  employment_type: EmploymentType;
  description: string;
  start_date: string;
  end_date: string | null;
  sort_order: number;
  skill_ids: number[];
}

// ── Props ─────────────────────────────────────────────────────────

interface ExperienceFormProps {
  initialData?: ExperienceDetail | null;
  isSubmitting?: boolean;
  onSubmit: (values: CreateExperienceRequest | UpdateExperienceRequest) => Promise<void>;
  onCancel: () => void;
}

// ── Shared input style ────────────────────────────────────────────

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

const selectStyle: React.CSSProperties = {
  ...inputStyle,
  appearance: 'none',
  cursor: 'pointer',
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

export function ExperienceForm({
  initialData,
  isSubmitting,
  onSubmit,
  onCancel,
}: ExperienceFormProps) {
  // ── Skills autocomplete ──────────────────────────────────────
  const [skillKeyword, setSkillKeyword] = useState('');
  const deferredSkillKeyword = useDeferredValue(skillKeyword);
  const { data: skillOptions = [], isLoading: skillsLoading } =
    useSkillsSearch(deferredSkillKeyword);

  const [selectedSkills, setSelectedSkills] = useState<(typeof skillOptions)[number][]>(
    () => initialData?.skills ?? []
  );

  useEffect(() => {
    if (initialData) {
      setSelectedSkills(initialData.skills);
    }
  }, [initialData]);

  const initialValues: FormValues = {
    title: initialData?.title ?? '',
    company: initialData?.company ?? '',
    employment_type: initialData?.employment_type ?? 'FULL_TIME',
    description: initialData?.description ?? '',
    start_date: initialData?.start_date ?? '',
    end_date: initialData?.end_date ?? null,
    sort_order: initialData?.sort_order ?? 0,
    skill_ids: initialData?.skills?.map((s) => s.id) ?? [],
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={experienceSchema}
      enableReinitialize
      onSubmit={async (values) => {
        await onSubmit(values);
      }}
    >
      {({ values, errors, touched, setFieldValue }) => (
        <Form className="flex flex-col gap-5">
          {/* Title */}
          <div>
            <label style={labelStyle}>Title *</label>
            <Field name="title" placeholder="Full Stack Developer" style={inputStyle} />
            {touched.title && errors.title && <p style={errorStyle}>{errors.title}</p>}
          </div>

          {/* Company */}
          <div>
            <label style={labelStyle}>Company *</label>
            <Field name="company" placeholder="Explnc" style={inputStyle} />
            {touched.company && errors.company && <p style={errorStyle}>{errors.company}</p>}
          </div>

          {/* Employment Type */}
          <div>
            <label style={labelStyle}>Employment Type *</label>
            <Field as="select" name="employment_type" style={selectStyle}>
              {EMPLOYMENT_TYPE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </Field>
            {touched.employment_type && errors.employment_type && (
              <p style={errorStyle}>{errors.employment_type as string}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label style={labelStyle}>Description *</label>
            <MDXEditorField
              value={values.description}
              onChange={(val) => setFieldValue('description', val)}
              placeholder="Describe the role, responsibilities, and achievements…"
              minHeight={240}
            />
            {touched.description && errors.description && (
              <p style={errorStyle}>{errors.description as string}</p>
            )}
          </div>

          {/* Start Date */}
          <div>
            <label style={labelStyle}>Start Date *</label>
            <DatePicker
              value={values.start_date ? dayjs(values.start_date) : null}
              onChange={(newValue) => {
                setFieldValue('start_date', newValue ? newValue.format('YYYY-MM-DD') : '');
              }}
              slotProps={{
                textField: {
                  placeholder: 'Select start date…',
                  fullWidth: true,
                  sx: {
                    '& .MuiOutlinedInput-root': {
                      background: '#0d1526',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '4px',
                      color: '#dae2fd',
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: 13,
                      '&:hover': { borderColor: 'rgba(255,255,255,0.2)' },
                      '&.Mui-focused': { borderColor: '#22d3ee' },
                    },
                    '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                    '& .MuiInputBase-input': {
                      color: '#dae2fd',
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: 13,
                      '&::placeholder': { color: '#475569', opacity: 1 },
                    },
                    '& .MuiIconButton-root': {
                      color: '#64748b',
                      '&:hover': { color: '#22d3ee' },
                    },
                    '& .MuiSvgIcon-root': { fontSize: 18 },
                  },
                },
                popper: {
                  sx: {
                    '& .MuiPaper-root': {
                      background: '#1e293b',
                      border: '1px solid rgba(255,255,255,0.12)',
                      borderRadius: '4px',
                      color: '#dae2fd',
                    },
                    '& .MuiPickersDay-root': {
                      color: '#cbd5e1',
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: 13,
                      '&:hover': { background: 'rgba(34,211,238,0.12)', color: '#22d3ee' },
                      '&.Mui-selected': {
                        background: '#00f0ff !important',
                        color: '#006970 !important',
                      },
                    },
                    '& .MuiPickersCalendarHeader-label': {
                      color: '#94a3b8',
                      fontFamily: "'Space Grotesk', sans-serif",
                    },
                    '& .MuiPickersArrowSwitcher-button': { color: '#64748b' },
                    '& .MuiDayCalendar-weekDayLabel': {
                      color: '#475569',
                      fontFamily: "'Space Grotesk', sans-serif",
                    },
                    '& .MuiPickersLayout-actionBar .MuiButton-root': {
                      color: '#22d3ee',
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: 12,
                    },
                  },
                },
              }}
              format="YYYY-MM-DD"
            />
            {touched.start_date && errors.start_date && (
              <p style={errorStyle}>{errors.start_date as string}</p>
            )}
          </div>

          {/* End Date */}
          <div>
            <label style={labelStyle}>End Date</label>
            <DatePicker
              value={values.end_date ? dayjs(values.end_date) : null}
              onChange={(newValue) => {
                setFieldValue('end_date', newValue ? newValue.format('YYYY-MM-DD') : null);
              }}
              slotProps={{
                textField: {
                  placeholder: 'Select end date (leave empty for present)…',
                  fullWidth: true,
                  sx: {
                    '& .MuiOutlinedInput-root': {
                      background: '#0d1526',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '4px',
                      color: '#dae2fd',
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: 13,
                      '&:hover': { borderColor: 'rgba(255,255,255,0.2)' },
                      '&.Mui-focused': { borderColor: '#22d3ee' },
                    },
                    '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                    '& .MuiInputBase-input': {
                      color: '#dae2fd',
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: 13,
                      '&::placeholder': { color: '#475569', opacity: 1 },
                    },
                    '& .MuiIconButton-root': {
                      color: '#64748b',
                      '&:hover': { color: '#22d3ee' },
                    },
                    '& .MuiSvgIcon-root': { fontSize: 18 },
                  },
                },
                popper: {
                  sx: {
                    '& .MuiPaper-root': {
                      background: '#1e293b',
                      border: '1px solid rgba(255,255,255,0.12)',
                      borderRadius: '4px',
                      color: '#dae2fd',
                    },
                    '& .MuiPickersDay-root': {
                      color: '#cbd5e1',
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: 13,
                      '&:hover': { background: 'rgba(34,211,238,0.12)', color: '#22d3ee' },
                      '&.Mui-selected': {
                        background: '#00f0ff !important',
                        color: '#006970 !important',
                      },
                    },
                    '& .MuiPickersCalendarHeader-label': {
                      color: '#94a3b8',
                      fontFamily: "'Space Grotesk', sans-serif",
                    },
                    '& .MuiPickersArrowSwitcher-button': { color: '#64748b' },
                    '& .MuiDayCalendar-weekDayLabel': {
                      color: '#475569',
                      fontFamily: "'Space Grotesk', sans-serif",
                    },
                    '& .MuiPickersLayout-actionBar .MuiButton-root': {
                      color: '#22d3ee',
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: 12,
                    },
                  },
                },
              }}
              format="YYYY-MM-DD"
            />
          </div>

          {/* Sort Order */}
          <div>
            <label style={labelStyle}>Sort Order</label>
            <Field name="sort_order" type="number" placeholder="0" style={inputStyle} />
            {touched.sort_order && errors.sort_order && (
              <p style={errorStyle}>{errors.sort_order as string}</p>
            )}
          </div>

          {/* Skills */}
          <div>
            <label style={labelStyle}>Skills</label>
            <Autocomplete
              multiple
              disableCloseOnSelect
              filterOptions={(x) => x}
              options={skillOptions}
              getOptionLabel={(opt) => opt.name}
              isOptionEqualToValue={(opt, val) => opt.id === val.id}
              value={selectedSkills}
              loading={skillsLoading}
              inputValue={skillKeyword}
              onInputChange={(_e, val, reason) => {
                if (reason !== 'reset') setSkillKeyword(val);
              }}
              onChange={(_e, selected) => {
                setSelectedSkills(selected);
                setFieldValue(
                  'skill_ids',
                  selected.map((s) => s.id)
                );
                setSkillKeyword('');
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Search skills…"
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <>
                        {skillsLoading ? <CircularProgress color="inherit" size={18} /> : null}
                        {params.InputProps.endAdornment}
                      </>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      background: '#0d1526',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '4px',
                      color: '#dae2fd',
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: 13,
                      minHeight: 48,
                      padding: '4px 8px',
                      '&:hover': { borderColor: 'rgba(255,255,255,0.2)' },
                      '&.Mui-focused': { borderColor: '#22d3ee' },
                    },
                    '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                    '& .MuiAutocomplete-input': {
                      color: '#dae2fd',
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: 13,
                      '&::placeholder': { color: '#475569', opacity: 1 },
                    },
                  }}
                />
              )}
              renderTags={(tagValue, getTagProps) =>
                tagValue.map((opt, idx) => {
                  const { key, ...rest } = getTagProps({ index: idx });
                  return (
                    <Chip
                      key={key}
                      {...rest}
                      label={opt.name}
                      size="small"
                      sx={{
                        background: 'rgba(0,240,255,0.15)',
                        color: '#00f0ff',
                        border: '1px solid rgba(0,240,255,0.3)',
                        borderRadius: '2px',
                        fontFamily: 'monospace',
                        fontSize: 11,
                        height: 24,
                        '& .MuiChip-deleteIcon': {
                          color: '#00f0ff',
                          fontSize: 16,
                          '&:hover': { color: '#f87171' },
                        },
                      }}
                    />
                  );
                })
              }
              noOptionsText={
                <span style={{ color: '#64748b', fontFamily: 'monospace', fontSize: 12 }}>
                  {skillKeyword ? 'No skills found' : 'Type to search skills…'}
                </span>
              }
              ListboxProps={{
                sx: {
                  background: '#1e293b',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: '4px',
                  color: '#dae2fd',
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 13,
                  '& .MuiAutocomplete-option': {
                    color: '#cbd5e1',
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: 13,
                    '&:hover, &.Mui-focused': {
                      background: 'rgba(34,211,238,0.12)',
                      color: '#22d3ee',
                    },
                    '&[aria-selected="true"]': {
                      background: 'rgba(34,211,238,0.08)',
                    },
                  },
                },
              }}
            />
          </div>

          {/* Actions */}
          <div
            className="flex justify-end gap-3 pt-4"
            style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
          >
            <button
              type="button"
              onClick={onCancel}
              disabled={isSubmitting}
              className="px-5 py-2.5 rounded-[2px] text-[12px] font-['Space_Grotesk',sans-serif] border-none outline-none cursor-pointer hover:opacity-80 transition-opacity disabled:opacity-40"
              style={{ background: 'rgba(255,255,255,0.05)', color: '#64748b' }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2.5 rounded-[2px] text-[12px] font-['Space_Grotesk',sans-serif] border-none outline-none cursor-pointer hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ background: '#00f0ff', color: '#006970' }}
            >
              {isSubmitting ? 'Saving…' : initialData ? 'Update Experience' : 'Create Experience'}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
