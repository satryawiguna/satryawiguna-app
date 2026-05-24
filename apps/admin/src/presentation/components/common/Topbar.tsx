'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useAuthState, useLogout } from '../../hooks/useAuth';
import { ConfirmDialog } from './ConfirmDialog';
import { ProfileModal } from './ProfileModal';

interface TopbarProps {
  onMenuClick?: () => void;
}

export function Topbar({ onMenuClick }: TopbarProps) {
  const { user } = useAuthState();
  const { logout } = useLogout();
  const [menuOpen, setMenuOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-20 h-[64px] flex items-center justify-between pb-px px-[16px] md:px-[24px] backdrop-blur-[6px] bg-[rgba(2,6,23,0.8)] border-b border-[rgba(255,255,255,0.1)]">
        {/* Left: hamburger + brand + nav */}
        <div className="flex items-center gap-[16px]">
          {/* Hamburger - mobile only */}
          <button
            onClick={onMenuClick}
            className="lg:hidden border-0 bg-transparent text-[#94a3b8] hover:text-white cursor-pointer p-1 shrink-0"
            aria-label="Toggle menu"
          >
            <svg width="20" height="14" viewBox="0 0 20 14" fill="none">
              <path
                d="M1 1H19M1 7H19M1 13H19"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
          <span className="font-['Space_Grotesk',sans-serif] font-bold text-[16px] md:text-[18px] leading-[28px] text-[#22d3ee] tracking-[-0.9px] uppercase">
            DEVADMIN OS
          </span>
          <div className="hidden md:flex items-center gap-[16px] pl-[32px]">
            <button className="border-0 bg-transparent font-['Space_Grotesk',sans-serif] font-bold text-[12px] leading-[16px] text-[#22d3ee] tracking-[1.2px] uppercase cursor-pointer">
              SYSTEM OVERVIEW
            </button>
            <button className="border-0 bg-transparent font-['Space_Grotesk',sans-serif] font-normal text-[12px] leading-[16px] text-[#94a3b8] tracking-[1.2px] uppercase hover:text-[#dbfcff] transition-colors cursor-pointer">
              LIVE METRICS
            </button>
            <button className="border-0 bg-transparent font-['Space_Grotesk',sans-serif] font-normal text-[12px] leading-[16px] text-[#94a3b8] tracking-[1.2px] uppercase hover:text-[#dbfcff] transition-colors cursor-pointer">
              LOGS
            </button>
          </div>
        </div>

        {/* Right: search + actions */}
        <div className="self-stretch flex items-center gap-[8px] md:gap-[16px]">
          <div className="flex items-center gap-[8px] md:gap-[12px]">
            <button className="border-0 bg-transparent hover:opacity-80 transition-opacity w-[16px] h-[20px] relative cursor-pointer">
              <Image
                src="/assets/dashboard/icon-bell.svg"
                alt="notifications"
                fill
                className="object-contain"
              />
            </button>
            <div ref={menuRef} className="relative shrink-0">
              <button
                onClick={() => setMenuOpen((prev) => !prev)}
                className="border border-[rgba(34,211,238,0.3)] rounded-[12px] p-px w-[32px] h-[32px] overflow-hidden flex items-center justify-center bg-transparent cursor-pointer hover:border-[#22d3ee] transition-colors"
              >
                {!user?.avatar_url ? (
                  <div className="w-full h-full rounded-full bg-[#22d3ee] flex items-center justify-center">
                    <span className="text-[10px] font-bold text-[#020617]">
                      {user?.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                ) : (
                  <Image
                    src={user.avatar_url}
                    alt="avatar"
                    width={32}
                    height={32}
                    className="rounded-full object-cover"
                  />
                )}
              </button>

              {/* Dropdown */}
              {menuOpen && (
                <div
                  className="absolute right-0 top-full mt-[8px] w-[224px] rounded-[8px] overflow-hidden z-50"
                  style={{
                    background: 'rgba(15,23,42,0.95)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(12px)',
                    boxShadow: '0 16px 48px rgba(0,0,0,0.4)',
                  }}
                >
                  {/* User info */}
                  <div
                    className="px-[16px] pt-[16px] pb-[12px]"
                    style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
                  >
                    <p className="font-['Space_Grotesk',sans-serif] font-bold text-[14px] text-white leading-[20px] m-0">
                      My Account
                    </p>
                    <p className="font-['Space_Grotesk',sans-serif] font-normal text-[12px] text-[#94a3b8] leading-[18px] mt-[2px] m-0">
                      {user?.name ?? 'Unknown'}
                    </p>
                    <p className="font-mono text-[11px] text-[#64748b] leading-[16px] mt-[2px] m-0 truncate">
                      {user?.email ?? ''}
                    </p>
                  </div>

                  {/* Menu items */}
                  <div className="py-[4px]">
                    <button
                      onClick={() => {
                        setMenuOpen(false);
                        setProfileOpen(true);
                      }}
                      className="w-full flex items-center gap-[10px] px-[16px] py-[10px] border-none bg-transparent text-[#94a3b8] font-['Space_Grotesk',sans-serif] text-[13px] cursor-pointer hover:bg-[rgba(34,211,238,0.08)] hover:text-[#22d3ee] transition-colors text-left"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5" />
                        <path
                          d="M4 20c0-4 3.6-6 8-6s8 2 8 6"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                      Profile
                    </button>
                    <button
                      onClick={() => {
                        setMenuOpen(false);
                        setConfirmOpen(true);
                      }}
                      className="w-full flex items-center gap-[10px] px-[16px] py-[10px] border-none bg-transparent text-[#f87171] font-['Space_Grotesk',sans-serif] text-[13px] cursor-pointer hover:bg-[rgba(248,113,113,0.08)] transition-colors text-left"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M16 17l5-5-5-5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M21 12H9"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <ConfirmDialog
        open={confirmOpen}
        title="Logout"
        message="Are you sure you want to log out?"
        confirmLabel="Logout"
        onConfirm={() => {
          setConfirmOpen(false);
          logout();
        }}
        onCancel={() => setConfirmOpen(false)}
      />

      <ProfileModal open={profileOpen} onClose={() => setProfileOpen(false)} />
    </>
  );
}
