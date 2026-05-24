'use client';

import { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useAuthState } from '../../hooks/useAuth';
import { MediaPickerModal } from './MediaPickerModal';
import { profileService } from 'shared-api';

// ── Validation schema ─────────────────────────────────────────────

const profileSchema = Yup.object({
  name: Yup.string().required('Full name is required').max(255),
  phone: Yup.string().max(50),
});

// ── Styles ────────────────────────────────────────────────────────

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

// ── Props ─────────────────────────────────────────────────────────

interface ProfileModalProps {
  open: boolean;
  onClose: () => void;
}

// ── Component ─────────────────────────────────────────────────────

export function ProfileModal({ open, onClose }: ProfileModalProps) {
  const { user } = useAuthState();
  const [avatarPickerOpen, setAvatarPickerOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  // Reset message on open
  useEffect(() => {
    if (open) setSaveMessage(null);
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-[480px] max-h-[90vh] overflow-y-auto rounded-[12px]"
        style={{
          background: 'rgba(15,23,42,0.98)',
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '0 24px 80px rgba(0,0,0,0.5)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <Formik
          initialValues={{
            name: user?.name ?? '',
            avatar_url: user?.avatar_url ?? '',
            phone: (user as unknown as Record<string, string>)?.phone ?? '',
          }}
          validationSchema={profileSchema}
          enableReinitialize
          onSubmit={async (values) => {
            setSaving(true);
            setSaveMessage(null);
            try {
              await profileService.update(values);
              setSaveMessage('Profile updated successfully!');
              setTimeout(() => {
                setSaveMessage(null);
                onClose();
              }, 1500);
            } catch {
              setSaveMessage('Failed to update profile.');
            } finally {
              setSaving(false);
            }
          }}
        >
          {({ values, errors, touched, setFieldValue }) => (
            <Form>
              {/* Header */}
              <div
                className="flex items-center justify-between px-[24px] py-[20px]"
                style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
              >
                <h2 className="font-['Space_Grotesk',sans-serif] font-bold text-[18px] text-white leading-[28px] tracking-[-0.45px] m-0">
                  Profile Details
                </h2>
                <button
                  type="button"
                  onClick={onClose}
                  className="border-0 bg-transparent text-[#64748b] hover:text-white cursor-pointer p-1"
                  disabled={saving}
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path
                      d="M4 4L14 14M14 4L4 14"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>

              {/* Body */}
              <div className="flex flex-col gap-5 px-[24px] py-[24px]">
                {/* Avatar */}
                <div className="flex flex-col items-center gap-3 pb-2">
                  <div className="relative">
                    {values.avatar_url ? (
                      <div
                        className="rounded-full overflow-hidden"
                        style={{
                          width: 88,
                          height: 88,
                          border: '2px solid rgba(34,211,238,0.3)',
                        }}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={values.avatar_url}
                          alt="avatar"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div
                        className="rounded-full flex items-center justify-center"
                        style={{
                          width: 88,
                          height: 88,
                          background: '#0d1526',
                          border: '2px dashed rgba(255,255,255,0.15)',
                        }}
                      >
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                          <circle cx="12" cy="8" r="4" stroke="#64748b" strokeWidth="1.5" />
                          <path
                            d="M4 20c0-4 3.6-6 8-6s8 2 8 6"
                            stroke="#64748b"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                          />
                        </svg>
                      </div>
                    )}
                    {/* Camera overlay */}
                    <button
                      type="button"
                      onClick={() => setAvatarPickerOpen(true)}
                      className="absolute bottom-0 right-0 w-[28px] h-[28px] rounded-full flex items-center justify-center border-none cursor-pointer hover:opacity-90 transition-opacity"
                      style={{
                        background: '#00f0ff',
                        border: '2px solid #020617',
                      }}
                      disabled={saving}
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2v11z"
                          stroke="#020617"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <circle cx="12" cy="13" r="4" stroke="#020617" strokeWidth="2" />
                      </svg>
                    </button>
                  </div>
                  <span className="font-['Space_Grotesk',sans-serif] text-[11px] text-[#64748b] tracking-[1.4px] uppercase">
                    Profile Photo
                  </span>
                </div>

                {/* Full Name */}
                <div>
                  <label style={labelStyle}>Full Name *</label>
                  <Field name="name" placeholder="Your full name" style={inputStyle} />
                  {touched.name && errors.name && <p style={errorStyle}>{errors.name}</p>}
                </div>

                {/* Email (read-only) */}
                <div>
                  <label style={labelStyle}>Email Address</label>
                  <input
                    type="email"
                    value={user?.email ?? ''}
                    disabled
                    style={{
                      ...inputStyle,
                      opacity: 0.5,
                      cursor: 'not-allowed',
                    }}
                  />
                </div>

                {/* Phone */}
                <div>
                  <label style={labelStyle}>Phone</label>
                  <Field name="phone" placeholder="+1 234 567 8900" style={inputStyle} />
                  {touched.phone && errors.phone && (
                    <p style={errorStyle}>{errors.phone as string}</p>
                  )}
                </div>

                {/* Save message */}
                {saveMessage && (
                  <div
                    className="px-4 py-2 rounded-[4px] text-center text-[13px] font-['Space_Grotesk',sans-serif]"
                    style={{
                      background: saveMessage.includes('success')
                        ? 'rgba(78,222,163,0.1)'
                        : 'rgba(248,113,113,0.1)',
                      color: saveMessage.includes('success') ? '#4edea3' : '#f87171',
                      border: `1px solid ${saveMessage.includes('success') ? 'rgba(78,222,163,0.3)' : 'rgba(248,113,113,0.3)'}`,
                    }}
                  >
                    {saveMessage}
                  </div>
                )}
              </div>

              {/* Footer */}
              <div
                className="flex justify-end gap-3 px-[24px] py-[20px]"
                style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
              >
                <button
                  type="button"
                  onClick={onClose}
                  disabled={saving}
                  className="px-5 py-2.5 rounded-[2px] text-[12px] font-['Space_Grotesk',sans-serif] border-none outline-none cursor-pointer hover:opacity-80 transition-opacity disabled:opacity-40"
                  style={{ background: 'rgba(255,255,255,0.05)', color: '#64748b' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2.5 rounded-[2px] text-[12px] font-['Space_Grotesk',sans-serif] border-none outline-none cursor-pointer hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ background: '#00f0ff', color: '#006970' }}
                >
                  {saving ? 'Saving…' : 'Save Changes'}
                </button>
              </div>
              {/* Avatar picker */}
              <MediaPickerModal
                open={avatarPickerOpen}
                multiple={false}
                onClose={() => setAvatarPickerOpen(false)}
                onSelect={([url]) => {
                  if (url) setFieldValue('avatar_url', url);
                }}
              />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
