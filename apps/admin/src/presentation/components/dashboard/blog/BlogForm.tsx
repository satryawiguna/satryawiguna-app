'use client';

import { useState, useEffect, useDeferredValue } from 'react';
import dynamic from 'next/dynamic';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Autocomplete, TextField, Chip, CircularProgress } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';
import type {
  BlogPostDetail,
  BlogPostStatus,
  CreateBlogPostRequest,
  UpdateBlogPostRequest,
} from 'shared-types';
import { useBlogCategoriesSearch, useTagsSearch } from '@/presentation/hooks';
import { MediaPickerModal } from '@/presentation/components/common';

const MDXEditorField = dynamic(
  () =>
    import('@/presentation/components/common/MDXEditorField').then((m) => ({
      default: m.MDXEditorField,
    })),
  { ssr: false }
);

// ── Validation schema ─────────────────────────────────────────────

const blogSchema = Yup.object({
  title: Yup.string().required('Title is required').max(255),
  slug: Yup.string()
    .required('Slug is required')
    .matches(/^[a-z0-9-]+$/, 'Only lowercase letters, numbers and hyphens')
    .max(255),
  excerpt: Yup.string().required('Excerpt is required'),
  content: Yup.string().required('Content is required'),
  thumbnail_url: Yup.string().url('Must be a valid URL').nullable(),
  image_url: Yup.string().url('Must be a valid URL').nullable(),
  status: Yup.string().oneOf(['draft', 'published', 'archived']).required('Status is required'),
  category_ids: Yup.array().of(Yup.number()),
  tag_ids: Yup.array().of(Yup.number()),
  published_at: Yup.string().nullable(),
});

// ── Form values type ──────────────────────────────────────────────

interface FormValues {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  thumbnail_url: string;
  image_url: string;
  status: BlogPostStatus;
  category_ids: number[];
  tag_ids: number[];
  published_at: string | null;
}

// ── Props ─────────────────────────────────────────────────────────

interface BlogFormProps {
  initialData?: BlogPostDetail | null;
  isSubmitting?: boolean;
  onSubmit: (values: CreateBlogPostRequest | UpdateBlogPostRequest) => Promise<void>;
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

// ── Helper to auto-generate slug ──────────────────────────────────

function toSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

// ── MediaPicker button / preview ──────────────────────────────────

function MediaField({
  label,
  value,
  onSelect,
  onClear,
}: {
  label: string;
  value: string;
  onSelect: (url: string) => void;
  onClear: () => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <label style={labelStyle}>{label}</label>
      <div className="flex items-center gap-3">
        {value ? (
          <div
            className="relative rounded overflow-hidden shrink-0"
            style={{ width: 72, height: 72, border: '1px solid rgba(255,255,255,0.1)' }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={value} alt={label} className="w-full h-full object-cover" />
            <button
              type="button"
              onClick={onClear}
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
              <rect x="3" y="3" width="18" height="18" rx="2" stroke="#64748b" strokeWidth="1.5" />
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
          onClick={() => setOpen(true)}
          className="px-4 py-2 rounded-[2px] text-[12px] font-['Space_Grotesk',sans-serif] border-none outline-none cursor-pointer hover:opacity-80 transition-opacity"
          style={{
            background: 'rgba(255,255,255,0.07)',
            color: '#94a3b8',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          {value ? 'Change' : 'Select from Media Library'}
        </button>
      </div>
      <MediaPickerModal
        open={open}
        multiple={false}
        onClose={() => setOpen(false)}
        onSelect={([url]) => {
          if (url) onSelect(url);
        }}
      />
    </div>
  );
}

// ── Component ─────────────────────────────────────────────────────

export function BlogForm({ initialData, isSubmitting, onSubmit, onCancel }: BlogFormProps) {
  const isEditMode = Boolean(initialData);

  // ── Autocomplete search state ─────────────────────────────────
  const [categoryKeyword, setCategoryKeyword] = useState('');
  const [tagKeyword, setTagKeyword] = useState('');
  const deferredCategoryKeyword = useDeferredValue(categoryKeyword);
  const deferredTagKeyword = useDeferredValue(tagKeyword);

  const { data: categoryOptions = [], isLoading: categoriesLoading } =
    useBlogCategoriesSearch(deferredCategoryKeyword);
  const { data: tagOptions = [], isLoading: tagsLoading } = useTagsSearch(deferredTagKeyword);

  const [selectedCategories, setSelectedCategories] = useState<(typeof categoryOptions)[number][]>(
    () => initialData?.categories ?? []
  );
  const [selectedTags, setSelectedTags] = useState<(typeof tagOptions)[number][]>(
    () => initialData?.tags ?? []
  );

  // Sync local autocomplete state when edit data loads (initialData starts as null
  // while the detail query is pending, so useState initializers miss the real data)
  useEffect(() => {
    if (initialData) {
      setSelectedCategories(initialData.categories);
      setSelectedTags(initialData.tags);
    }
  }, [initialData]);

  const initialValues: FormValues = {
    title: initialData?.title ?? '',
    slug: initialData?.slug ?? '',
    excerpt: initialData?.excerpt ?? '',
    content: initialData?.content ?? '',
    thumbnail_url: initialData?.thumbnail_url ?? '',
    image_url: initialData?.image_url ?? '',
    status: initialData?.status ?? 'draft',
    category_ids: initialData?.categories?.map((c) => c.id) ?? [],
    tag_ids: initialData?.tags?.map((t) => t.id) ?? [],
    published_at: initialData?.published_at ?? null,
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={blogSchema}
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
              placeholder="My Blog Post Title"
              style={inputStyle}
              onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                if (!values.slug) {
                  setFieldValue('slug', toSlug(e.target.value));
                }
              }}
            />
            {touched.title && errors.title && <p style={errorStyle}>{errors.title}</p>}
          </div>

          {/* Slug */}
          <div>
            <label style={labelStyle}>Slug *</label>
            <Field name="slug" placeholder="my-blog-post-title" style={inputStyle} />
            {touched.slug && errors.slug && <p style={errorStyle}>{errors.slug}</p>}
          </div>

          {/* Excerpt */}
          <div>
            <label style={labelStyle}>Excerpt *</label>
            <Field
              as="textarea"
              name="excerpt"
              placeholder="A short summary of the post…"
              rows={3}
              style={{ ...inputStyle, resize: 'vertical' }}
            />
            {touched.excerpt && errors.excerpt && <p style={errorStyle}>{errors.excerpt}</p>}
          </div>

          {/* Content */}
          <div>
            <label style={labelStyle}>Content *</label>
            <MDXEditorField
              value={values.content}
              onChange={(val) => setFieldValue('content', val)}
              placeholder="Write your blog post content here…"
              minHeight={320}
            />
            {touched.content && errors.content && <p style={errorStyle}>{errors.content}</p>}
          </div>

          {/* Thumbnail */}
          <MediaField
            label="Thumbnail"
            value={values.thumbnail_url}
            onSelect={(url) => setFieldValue('thumbnail_url', url)}
            onClear={() => setFieldValue('thumbnail_url', '')}
          />
          {touched.thumbnail_url && errors.thumbnail_url && (
            <p style={{ ...errorStyle, marginTop: -12 }}>{errors.thumbnail_url as string}</p>
          )}

          {/* Cover Image */}
          <MediaField
            label="Cover Image"
            value={values.image_url}
            onSelect={(url) => setFieldValue('image_url', url)}
            onClear={() => setFieldValue('image_url', '')}
          />
          {touched.image_url && errors.image_url && (
            <p style={{ ...errorStyle, marginTop: -12 }}>{errors.image_url as string}</p>
          )}

          {/* Status */}
          <div>
            <label style={labelStyle}>Status *</label>
            <Field
              as="select"
              name="status"
              style={{
                ...inputStyle,
                appearance: 'none',
                cursor: 'pointer',
              }}
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </Field>
            {touched.status && errors.status && <p style={errorStyle}>{errors.status}</p>}
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
                  sx={autocompleteInputSx}
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
              ListboxProps={{ sx: autocompleteListboxSx }}
            />
          </div>

          {/* Tags */}
          <div>
            <label style={labelStyle}>Tags</label>
            <Autocomplete
              multiple
              disableCloseOnSelect
              filterOptions={(x) => x}
              options={tagOptions}
              getOptionLabel={(opt) => opt.name}
              isOptionEqualToValue={(opt, val) => opt.id === val.id}
              value={selectedTags}
              loading={tagsLoading}
              inputValue={tagKeyword}
              onInputChange={(_e, val, reason) => {
                if (reason !== 'reset') setTagKeyword(val);
              }}
              onChange={(_e, selected) => {
                setSelectedTags(selected);
                setFieldValue(
                  'tag_ids',
                  selected.map((t) => t.id)
                );
                setTagKeyword('');
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Search tags…"
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <>
                        {tagsLoading ? <CircularProgress color="inherit" size={18} /> : null}
                        {params.InputProps.endAdornment}
                      </>
                    ),
                  }}
                  sx={autocompleteInputSx}
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
                  {tagKeyword ? 'No tags found' : 'Type to search tags…'}
                </span>
              }
              ListboxProps={{ sx: autocompleteListboxSx }}
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
              {isSubmitting ? 'Saving…' : isEditMode ? 'Update Post' : 'Create Post'}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
