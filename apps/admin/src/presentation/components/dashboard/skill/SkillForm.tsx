'use client';

import { useState, useEffect, useRef, useDeferredValue } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Autocomplete, TextField, CircularProgress } from '@mui/material';
import type { Skill, CreateSkillRequest, UpdateSkillRequest } from 'shared-types';
import { useSkillCategoriesSearch } from '@/presentation/hooks';
import { MediaPickerModal } from '@/presentation/components/common';

// ── Validation schema ─────────────────────────────────────────────

const skillSchema = Yup.object({
  name: Yup.string().required('Name is required').max(255),
  category_id: Yup.number().typeError('Category is required').required('Category is required'),
  level: Yup.number()
    .typeError('Level must be a number')
    .min(0, 'Min 0')
    .max(100, 'Max 100')
    .required('Level is required'),
  icon_url: Yup.string().required('Icon is required'),
  sort_order: Yup.number()
    .typeError('Sort order must be a number')
    .integer('Must be an integer')
    .min(0, 'Min 0')
    .required('Sort order is required'),
});

// ── Form values type ──────────────────────────────────────────────

interface FormValues {
  name: string;
  category_id: number | null;
  level: number;
  icon_url: string;
  sort_order: number;
}

// ── Props ─────────────────────────────────────────────────────────

interface SkillFormProps {
  initialData?: Skill | null;
  isSubmitting?: boolean;
  onSubmit: (values: CreateSkillRequest | UpdateSkillRequest) => Promise<void>;
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

// ── Autocomplete shared styles ────────────────────────────────────

const autocompleteInputSx = {
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
};

const autocompleteListboxSx = {
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
};

// ── Component ─────────────────────────────────────────────────────

export function SkillForm({ initialData, isSubmitting, onSubmit, onCancel }: SkillFormProps) {
  const [iconPickerOpen, setIconPickerOpen] = useState(false);

  // ── Category autocomplete ────────────────────────────────────
  const [categoryKeyword, setCategoryKeyword] = useState('');
  const deferredCategoryKeyword = useDeferredValue(categoryKeyword);
  const { data: categoryOptions = [], isLoading: categoriesLoading } =
    useSkillCategoriesSearch(deferredCategoryKeyword);
  const [selectedCategory, setSelectedCategory] = useState<(typeof categoryOptions)[number] | null>(
    () => {
      if (!initialData?.category_id) return null;
      return categoryOptions.find((c) => c.id === initialData.category_id) ?? null;
    }
  );

  // Populate category from initialData once when options arrive; never override user interaction
  const categoryInitialized = useRef(false);

  useEffect(() => {
    if (initialData?.category_id && !categoryInitialized.current) {
      const match = categoryOptions.find((c) => c.id === initialData.category_id);
      if (match) {
        setSelectedCategory(match);
        categoryInitialized.current = true;
      }
    }
  }, [initialData, categoryOptions]);

  const initialValues: FormValues = {
    name: initialData?.name ?? '',
    category_id: initialData?.category_id ?? null,
    level: initialData?.level ?? 0,
    icon_url: initialData?.icon_url ?? '',
    sort_order: initialData?.sort_order ?? 0,
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={skillSchema}
      enableReinitialize
      onSubmit={async (values) => {
        await onSubmit(values as CreateSkillRequest | UpdateSkillRequest);
      }}
    >
      {({ values, errors, touched, setFieldValue }) => (
        <Form className="flex flex-col gap-5">
          {/* Name */}
          <div>
            <label style={labelStyle}>Name *</label>
            <Field name="name" placeholder="Python" style={inputStyle} />
            {touched.name && errors.name && <p style={errorStyle}>{errors.name}</p>}
          </div>

          {/* Level */}
          <div>
            <label style={labelStyle}>Level *</label>
            <Field
              name="level"
              type="number"
              placeholder="90"
              style={inputStyle}
              min={0}
              max={100}
            />
            {touched.level && errors.level && <p style={errorStyle}>{errors.level}</p>}
          </div>

          {/* Sort Order */}
          <div>
            <label style={labelStyle}>Sort Order *</label>
            <Field name="sort_order" type="number" placeholder="1" style={inputStyle} min={0} />
            {touched.sort_order && errors.sort_order && (
              <p style={errorStyle}>{errors.sort_order}</p>
            )}
          </div>

          {/* Category (single-select Autocomplete) */}
          <div>
            <label style={labelStyle}>Category *</label>
            <Autocomplete
              disablePortal
              filterOptions={(x) => x}
              options={categoryOptions}
              getOptionLabel={(opt) => opt.name}
              isOptionEqualToValue={(opt, val) => opt.id === val.id}
              value={selectedCategory}
              loading={categoriesLoading}
              inputValue={categoryKeyword}
              onInputChange={(_e, val) => {
                setCategoryKeyword(val);
              }}
              onChange={(_e, selected) => {
                setSelectedCategory(selected);
                setFieldValue('category_id', selected?.id ?? null);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Search categories…"
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <>
                        {categoriesLoading ? <CircularProgress color="inherit" size={18} /> : null}
                        {params.InputProps.endAdornment}
                      </>
                    ),
                  }}
                  sx={autocompleteInputSx}
                />
              )}
              noOptionsText={
                <span style={{ color: '#64748b', fontFamily: 'monospace', fontSize: 12 }}>
                  {categoryKeyword ? 'No categories found' : 'Type to search categories…'}
                </span>
              }
              ListboxProps={{ sx: autocompleteListboxSx }}
            />
            {touched.category_id && errors.category_id && (
              <p style={errorStyle}>{errors.category_id as string}</p>
            )}
          </div>

          {/* Icon URL (MediaPickerModal) */}
          <div>
            <label style={labelStyle}>Icon *</label>
            <div className="flex items-center gap-3">
              {values.icon_url ? (
                <div
                  className="relative rounded overflow-hidden shrink-0"
                  style={{ width: 72, height: 72, border: '1px solid rgba(255,255,255,0.1)' }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={values.icon_url} alt="icon" className="w-full h-full object-cover" />
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
            {touched.icon_url && errors.icon_url && (
              <p style={errorStyle}>{errors.icon_url as string}</p>
            )}
            <MediaPickerModal
              open={iconPickerOpen}
              multiple={false}
              onClose={() => setIconPickerOpen(false)}
              onSelect={([url]) => {
                if (url) setFieldValue('icon_url', url);
              }}
            />
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
              style={{
                background: '#00f0ff',
                color: '#006970',
              }}
            >
              {isSubmitting ? 'Saving…' : initialData ? 'Update Skill' : 'Create Skill'}
            </button>
            <button
              type="button"
              onClick={onCancel}
              disabled={isSubmitting}
              className="flex-1 py-3 rounded-[2px] text-[13px] font-['Space_Grotesk',sans-serif] border-none outline-none cursor-pointer transition-opacity hover:opacity-80 disabled:opacity-50"
              style={{
                background: 'rgba(255,255,255,0.07)',
                color: '#94a3b8',
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
