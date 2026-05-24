'use client';

import { useState, useEffect, useDeferredValue } from 'react';
import dynamic from 'next/dynamic';
import { Formik, Form, Field, FieldArray } from 'formik';
import * as Yup from 'yup';
import { Autocomplete, TextField, Chip, CircularProgress } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';
import type { ProjectDetail, CreateProjectRequest, UpdateProjectRequest } from 'shared-types';
import { useSkillsSearch, useCategoriesSearch } from '@/presentation/hooks';
import { MediaPickerModal } from '@/presentation/components/common';

const MDXEditorField = dynamic(
  () =>
    import('@/presentation/components/common/MDXEditorField').then((m) => ({
      default: m.MDXEditorField,
    })),
  { ssr: false }
);

// ── Validation schema ─────────────────────────────────────────────

const projectSchema = Yup.object({
  title: Yup.string().required('Title is required').max(255),
  sub_title: Yup.string().required('Sub-title is required').max(255),
  slug: Yup.string()
    .required('Slug is required')
    .matches(/^[a-z0-9-]+$/, 'Only lowercase letters, numbers and hyphens')
    .max(255),
  description: Yup.string().required('Description is required'),
  content: Yup.string().required('Content is required'),
  demo_url: Yup.string().url('Must be a valid URL').nullable(),
  repository_url: Yup.string().url('Must be a valid URL').nullable(),
  thumbnail_url: Yup.string().url('Must be a valid URL').nullable(),
  skill_ids: Yup.array().of(Yup.number()),
  image_urls: Yup.array().of(Yup.string().url()),
  category_ids: Yup.array().of(Yup.number()),
  published_at: Yup.string().nullable(),
});

// ── Form values type ──────────────────────────────────────────────

interface FormValues {
  title: string;
  sub_title: string;
  slug: string;
  description: string;
  content: string;
  demo_url: string;
  repository_url: string;
  thumbnail_url: string;
  skill_ids: number[];
  image_urls: string[];
  category_ids: number[];
  published_at: string | null;
}

// ── Props ─────────────────────────────────────────────────────────

interface ProjectFormProps {
  initialData?: ProjectDetail | null;
  isSubmitting?: boolean;
  onSubmit: (values: CreateProjectRequest | UpdateProjectRequest) => Promise<void>;
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

export function ProjectForm({ initialData, isSubmitting, onSubmit, onCancel }: ProjectFormProps) {
  const isEditMode = Boolean(initialData);
  const [thumbnailPickerOpen, setThumbnailPickerOpen] = useState(false);
  const [imagesPickerOpen, setImagesPickerOpen] = useState(false);

  // ── Autocomplete search state (debounced) ────────────────────
  const [skillKeyword, setSkillKeyword] = useState('');
  const [categoryKeyword, setCategoryKeyword] = useState('');
  const deferredSkillKeyword = useDeferredValue(skillKeyword);
  const deferredCategoryKeyword = useDeferredValue(categoryKeyword);

  const { data: skillOptions = [], isLoading: skillsLoading } =
    useSkillsSearch(deferredSkillKeyword);
  const { data: categoryOptions = [], isLoading: categoriesLoading } = useCategoriesSearch(
    deferredCategoryKeyword,
    'PROJECT'
  );

  // Accumulate ALL selected items so they survive search filtering
  const [selectedSkills, setSelectedSkills] = useState<(typeof skillOptions)[number][]>(
    () => initialData?.skills ?? []
  );
  const [selectedCategories, setSelectedCategories] = useState<(typeof categoryOptions)[number][]>(
    () => initialData?.categories ?? []
  );

  // Sync local autocomplete state when edit data loads (initialData starts as null
  // while the detail query is pending, so useState initializers miss the real data)
  useEffect(() => {
    if (initialData) {
      setSelectedSkills(initialData.skills);
      setSelectedCategories(initialData.categories);
    }
  }, [initialData]);

  const initialValues: FormValues = {
    title: initialData?.title ?? '',
    sub_title: initialData?.sub_title ?? '',
    slug: initialData?.slug ?? '',
    description: initialData?.description ?? '',
    content: initialData?.content ?? '',
    demo_url: initialData?.demo_url ?? '',
    repository_url: initialData?.repository_url ?? '',
    thumbnail_url: initialData?.thumbnail_url ?? '',
    skill_ids: initialData?.skills?.map((s) => s.id) ?? [],
    image_urls: initialData?.images?.map((i) => i.image_url) ?? [],
    category_ids: initialData?.categories?.map((c) => c.id) ?? [],
    published_at: initialData?.published_at ?? null,
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={projectSchema}
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
            <Field
              name="title"
              placeholder="E-Commerce Platform"
              style={inputStyle}
              onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                // Auto-fill slug if not manually edited
                if (!values.slug) {
                  setFieldValue('slug', toSlug(e.target.value));
                }
              }}
            />
            {touched.title && errors.title && <p style={errorStyle}>{errors.title}</p>}
          </div>

          {/* Sub-title */}
          <div>
            <label style={labelStyle}>Sub-title *</label>
            <Field name="sub_title" placeholder="A full-stack solution" style={inputStyle} />
            {touched.sub_title && errors.sub_title && <p style={errorStyle}>{errors.sub_title}</p>}
          </div>

          {/* Slug */}
          <div>
            <label style={labelStyle}>Slug *</label>
            <Field name="slug" placeholder="ecommerce-platform" style={inputStyle} />
            {touched.slug && errors.slug && <p style={errorStyle}>{errors.slug}</p>}
          </div>

          {/* Description */}
          <div>
            <label style={labelStyle}>Description *</label>
            <Field
              as="textarea"
              name="description"
              placeholder="Short description of the project…"
              rows={3}
              style={{ ...inputStyle, resize: 'vertical' }}
            />
            {touched.description && errors.description && (
              <p style={errorStyle}>{errors.description}</p>
            )}
          </div>

          {/* Content */}
          <div>
            <label style={labelStyle}>Content *</label>
            <MDXEditorField
              value={values.content}
              onChange={(val) => setFieldValue('content', val)}
              placeholder="Detailed write-up, markdown supported…"
              minHeight={320}
            />
            {touched.content && errors.content && <p style={errorStyle}>{errors.content}</p>}
          </div>

          {/* Demo URL */}
          <div>
            <label style={labelStyle}>Demo URL</label>
            <Field name="demo_url" placeholder="https://demo.example.com" style={inputStyle} />
            {touched.demo_url && errors.demo_url && (
              <p style={errorStyle}>{errors.demo_url as string}</p>
            )}
          </div>

          {/* Repository URL */}
          <div>
            <label style={labelStyle}>Repository URL</label>
            <Field
              name="repository_url"
              placeholder="https://github.com/username/repo"
              style={inputStyle}
            />
            {touched.repository_url && errors.repository_url && (
              <p style={errorStyle}>{errors.repository_url as string}</p>
            )}
          </div>

          {/* Thumbnail */}
          <div>
            <label style={labelStyle}>Thumbnail</label>
            <div className="flex items-center gap-3">
              {values.thumbnail_url ? (
                <div
                  className="relative rounded overflow-hidden shrink-0"
                  style={{ width: 72, height: 72, border: '1px solid rgba(255,255,255,0.1)' }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={values.thumbnail_url}
                    alt="thumbnail"
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => setFieldValue('thumbnail_url', '')}
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
                onClick={() => setThumbnailPickerOpen(true)}
                className="px-4 py-2 rounded-[2px] text-[12px] font-['Space_Grotesk',sans-serif] border-none outline-none cursor-pointer hover:opacity-80 transition-opacity"
                style={{
                  background: 'rgba(255,255,255,0.07)',
                  color: '#94a3b8',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
              >
                {values.thumbnail_url ? 'Change' : 'Select from Media Library'}
              </button>
            </div>
            {touched.thumbnail_url && errors.thumbnail_url && (
              <p style={errorStyle}>{errors.thumbnail_url as string}</p>
            )}
            <MediaPickerModal
              open={thumbnailPickerOpen}
              multiple={false}
              onClose={() => setThumbnailPickerOpen(false)}
              onSelect={([url]) => {
                if (url) setFieldValue('thumbnail_url', url);
              }}
            />
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

          {/* Categories */}
          <div>
            <label style={labelStyle}>Categories</label>
            <Autocomplete
              multiple
              disableCloseOnSelect
              filterOptions={(x) => x}
              options={categoryOptions}
              getOptionLabel={(opt) => opt.name}
              isOptionEqualToValue={(opt, val) => opt.id === val.id}
              value={selectedCategories}
              loading={categoriesLoading}
              inputValue={categoryKeyword}
              onInputChange={(_e, val, reason) => {
                if (reason !== 'reset') setCategoryKeyword(val);
              }}
              onChange={(_e, selected) => {
                setSelectedCategories(selected);
                setFieldValue(
                  'category_ids',
                  selected.map((c) => c.id)
                );
                setCategoryKeyword('');
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
                        background: 'rgba(78,222,163,0.12)',
                        color: '#4edea3',
                        border: '1px solid rgba(78,222,163,0.25)',
                        borderRadius: '2px',
                        fontFamily: 'monospace',
                        fontSize: 11,
                        height: 24,
                        '& .MuiChip-deleteIcon': {
                          color: '#4edea3',
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
                  {categoryKeyword ? 'No categories found' : 'Type to search categories…'}
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

          {/* Project Images */}
          <div>
            <label style={labelStyle}>Project Images</label>

            {/* Selected images */}
            {values.image_urls.length > 0 && (
              <FieldArray name="image_urls">
                {({ remove }) => (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {values.image_urls.map((url, idx) => (
                      <div
                        key={idx}
                        className="relative rounded overflow-hidden"
                        style={{
                          width: 64,
                          height: 64,
                          border: '1px solid rgba(255,255,255,0.1)',
                        }}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={url} alt={`img-${idx}`} className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => remove(idx)}
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
                    ))}
                  </div>
                )}
              </FieldArray>
            )}

            <button
              type="button"
              onClick={() => setImagesPickerOpen(true)}
              className="px-4 py-2 rounded-[2px] text-[12px] font-['Space_Grotesk',sans-serif] border-none outline-none cursor-pointer hover:opacity-80 transition-opacity"
              style={{
                background: 'rgba(255,255,255,0.07)',
                color: '#94a3b8',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              + Add Images from Media Library
            </button>
            <MediaPickerModal
              open={imagesPickerOpen}
              multiple
              onClose={() => setImagesPickerOpen(false)}
              onSelect={(urls) => {
                const next = Array.from(new Set([...values.image_urls, ...urls]));
                setFieldValue('image_urls', next);
              }}
            />
          </div>

          {/* Published At — edit mode only */}
          {isEditMode && (
            <div>
              <label style={labelStyle}>Published At</label>
              <DateTimePicker
                value={values.published_at ? dayjs(values.published_at) : null}
                onChange={(newValue) => {
                  setFieldValue('published_at', newValue ? newValue.toISOString() : null);
                }}
                slotProps={{
                  textField: {
                    placeholder: 'Select publish date…',
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
                      '& .MuiSvgIcon-root': {
                        fontSize: 18,
                      },
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
                        '&:hover': {
                          background: 'rgba(34,211,238,0.12)',
                          color: '#22d3ee',
                        },
                        '&.Mui-selected': {
                          background: '#00f0ff !important',
                          color: '#006970 !important',
                        },
                      },
                      '& .MuiPickersCalendarHeader-label': {
                        color: '#94a3b8',
                        fontFamily: "'Space Grotesk', sans-serif",
                      },
                      '& .MuiPickersArrowSwitcher-button': {
                        color: '#64748b',
                      },
                      '& .MuiDayCalendar-weekDayLabel': {
                        color: '#475569',
                        fontFamily: "'Space Grotesk', sans-serif",
                      },
                      '& .MuiClockPicker-root, & .MuiClock-root': {
                        '& .MuiClock-clock': {
                          background: '#0d1526',
                        },
                        '& .MuiClockNumber-root': {
                          color: '#cbd5e1',
                          fontFamily: "'Space Grotesk', sans-serif",
                        },
                        '& .MuiClockPointer-root': {
                          background: '#00f0ff',
                        },
                        '& .MuiClockPointer-thumb': {
                          background: '#00f0ff',
                          borderColor: '#00f0ff',
                        },
                      },
                      '& .MuiPickersLayout-actionBar': {
                        '& .MuiButton-root': {
                          color: '#22d3ee',
                          fontFamily: "'Space Grotesk', sans-serif",
                          fontSize: 12,
                        },
                      },
                    },
                  },
                }}
                format="DD/MM/YYYY HH:mm"
              />
              {touched.published_at && errors.published_at && (
                <p style={errorStyle}>{errors.published_at as string}</p>
              )}
            </div>
          )}

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
              {isSubmitting ? 'Saving…' : initialData ? 'Update Project' : 'Create Project'}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
