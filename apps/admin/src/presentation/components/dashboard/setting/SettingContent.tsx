'use client';

import { useState, useEffect } from 'react';
import { Skeleton } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { useSetting, useUpdateSetting } from '@/presentation/hooks';
import { DefaultInputSetting } from './DefaultInputSetting';
import { MediaUrlInputSetting } from './MediaUrlInputSetting';

// ── Keys that should render a Media Library picker instead of a plain input ──

const MEDIA_URL_KEYS = new Set(['PROFILE_VIDEO_URL', 'RESUME_FILE_URL']);

// ── Label formatter ───────────────────────────────────────────────

function formatSettingKey(key: string): string {
  return key
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

// ── Skeleton rows while loading ───────────────────────────────────

function SettingSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="flex flex-col gap-2">
          <Skeleton
            variant="text"
            width={120}
            height={14}
            sx={{ bgcolor: 'rgba(255,255,255,0.06)', borderRadius: 1 }}
          />
          <Skeleton
            variant="rectangular"
            height={40}
            sx={{ bgcolor: 'rgba(255,255,255,0.04)', borderRadius: 1 }}
          />
        </div>
      ))}
    </div>
  );
}

// ── Content component ─────────────────────────────────────────────

export function SettingContent() {
  const { data: settingResponse, isLoading } = useSetting();

  const [formValues, setFormValues] = useState<Record<string, string>>({});
  const [saved, setSaved] = useState(false);

  // Sync server data into form state when the query resolves
  useEffect(() => {
    if (settingResponse?.data) {
      setFormValues(settingResponse.data);
    }
  }, [settingResponse]);

  const updateMutation = useUpdateSetting(() => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  });

  function handleChange(key: string, value: string) {
    setFormValues((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSave() {
    await updateMutation.mutateAsync(formValues);
  }

  return (
    <div className="min-h-screen bg-[#020617] p-4 sm:p-6 md:p-8 lg:p-10">
      <div className="max-w-[1200px] mx-auto flex flex-col gap-8 md:gap-20">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <circle cx="5" cy="5" r="4" stroke="#00dbe9" strokeWidth="1.5" />
                <circle cx="5" cy="5" r="1.5" fill="#00dbe9" />
              </svg>
              <span
                className="text-[10px] sm:text-[12px] uppercase tracking-[2.4px] font-['Space_Grotesk',sans-serif]"
                style={{ color: '#00dbe9' }}
              >
                ADMINISTRATION SHELL
              </span>
            </div>
            <h1
              className="text-[36px] sm:text-[48px] md:text-[64px] font-bold leading-tight tracking-[-1.28px] font-['Space_Grotesk',sans-serif]"
              style={{ color: '#dae2fd' }}
            >
              Setting Management
            </h1>
            <p
              className="text-[14px] md:text-[18px] leading-[1.7] max-w-[620px]"
              style={{ color: '#94a3b8' }}
            >
              Configure global application settings. Changes take effect immediately after saving.
            </p>
          </div>

          {/* Save button */}
          <button
            onClick={handleSave}
            disabled={updateMutation.isPending || isLoading}
            className="flex items-center justify-center gap-2 rounded px-6 py-3 md:py-4 text-[12px] font-['Space_Grotesk',sans-serif] font-bold shrink-0 transition-opacity hover:opacity-90 disabled:opacity-50 w-full md:w-auto cursor-pointer border-none"
            style={{
              background: saved ? '#4edea3' : '#00f0ff',
              color: saved ? '#064e3b' : '#006970',
              boxShadow: `0px 0px 10px rgba(${saved ? '78,222,163' : '0,240,255'},0.2)`,
              transition: 'background 0.3s, color 0.3s',
            }}
          >
            {saved ? (
              <>
                <CheckIcon sx={{ fontSize: 14 }} />
                <span>Saved!</span>
              </>
            ) : (
              <span>{updateMutation.isPending ? 'Saving…' : 'Save Setting'}</span>
            )}
          </button>
        </div>

        {/* Settings Form */}
        <div
          className="flex flex-col gap-0"
          style={{
            background: '#060e20',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: 8,
            overflow: 'hidden',
          }}
        >
          {/* Form header */}
          <div className="px-6 py-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <span
              className="text-[11px] uppercase tracking-[2px] font-['Space_Grotesk',sans-serif] font-bold"
              style={{ color: '#00dbe9' }}
            >
              Application Settings
            </span>
          </div>

          {/* Fields */}
          <div className="px-6 py-6 flex flex-col gap-6">
            {isLoading ? (
              <SettingSkeleton />
            ) : Object.keys(formValues).length === 0 ? (
              <p
                style={{
                  color: '#64748b',
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 14,
                }}
              >
                No settings found.
              </p>
            ) : (
              Object.entries(formValues).map(([key, value]) =>
                MEDIA_URL_KEYS.has(key) ? (
                  <MediaUrlInputSetting
                    key={key}
                    name={key}
                    label={formatSettingKey(key)}
                    value={value}
                    onChange={(val) => handleChange(key, val)}
                  />
                ) : (
                  <DefaultInputSetting
                    key={key}
                    name={key}
                    label={formatSettingKey(key)}
                    value={value}
                    onChange={(val) => handleChange(key, val)}
                  />
                )
              )
            )}
          </div>

          {/* Footer save (repeat for long forms) */}
          {!isLoading && Object.keys(formValues).length > 3 && (
            <div
              className="px-6 py-4 flex justify-end"
              style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
            >
              <button
                onClick={handleSave}
                disabled={updateMutation.isPending}
                className="flex items-center gap-2 rounded px-6 py-3 text-[12px] font-['Space_Grotesk',sans-serif] font-bold transition-opacity hover:opacity-90 disabled:opacity-50 cursor-pointer border-none"
                style={{
                  background: saved ? '#4edea3' : '#00f0ff',
                  color: saved ? '#064e3b' : '#006970',
                  boxShadow: '0px 0px 10px rgba(0,240,255,0.2)',
                }}
              >
                {updateMutation.isPending ? 'Saving…' : 'Save Setting'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
