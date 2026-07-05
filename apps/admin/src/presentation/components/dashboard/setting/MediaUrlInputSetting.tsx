'use client';

import { useState } from 'react';
import { MediaPickerModal } from '@/presentation/components/common';
import { inputStyle } from './DefaultInputSetting';

// ── Styles ────────────────────────────────────────────────────────

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

const pickerButtonStyle: React.CSSProperties = {
  background: 'rgba(255,255,255,0.07)',
  color: '#94a3b8',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: 4,
  padding: '10px 16px',
  fontSize: 12,
  fontFamily: "'Space Grotesk', sans-serif",
  cursor: 'pointer',
  whiteSpace: 'nowrap',
  flexShrink: 0,
};

// ── Props ─────────────────────────────────────────────────────────

interface MediaUrlInputSettingProps {
  name: string;
  label: string;
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
}

// ── Component ─────────────────────────────────────────────────────

export function MediaUrlInputSetting({
  name,
  label,
  value,
  placeholder,
  onChange,
}: MediaUrlInputSettingProps) {
  const [pickerOpen, setPickerOpen] = useState(false);

  return (
    <div>
      <label htmlFor={name} style={labelStyle}>
        {label}
      </label>
      <div className="flex items-start gap-3">
        <input
          id={name}
          type="url"
          value={value}
          placeholder={placeholder ?? `Enter ${label.toLowerCase()}...`}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 min-w-0"
          style={inputStyle}
        />

        <button
          type="button"
          onClick={() => setPickerOpen(true)}
          className="hover:opacity-80 transition-opacity"
          style={pickerButtonStyle}
        >
          {value ? 'Change' : 'Select from Media Library'}
        </button>
      </div>

      <MediaPickerModal
        open={pickerOpen}
        multiple={false}
        onClose={() => setPickerOpen(false)}
        onSelect={([url]) => {
          if (url) onChange(url);
        }}
      />
    </div>
  );
}
