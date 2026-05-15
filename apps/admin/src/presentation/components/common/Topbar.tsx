'use client';

import Image from 'next/image';
import { useAuthState } from '../../hooks/useAuth';

interface TopbarProps {
  onMenuClick?: () => void;
}

export function Topbar({ onMenuClick }: TopbarProps) {
  const { user } = useAuthState();

  return (
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
        <div className="hidden md:flex self-stretch items-center gap-[8px] bg-[#222a3d] border border-[rgba(255,255,255,0.05)] rounded-[2px] px-[13px] shrink-0">
          <div className="w-[10.5px] h-[10.5px] relative shrink-0">
            <Image src="/assets/dashboard/icon-search.svg" alt="" fill className="object-contain" />
          </div>
          <span className="font-['Space_Grotesk',sans-serif] font-normal text-[10px] text-[#475569] tracking-[1.2px] whitespace-nowrap w-[128px]">
            CMD+K TO SEARCH...
          </span>
        </div>
        <div className="flex items-center gap-[8px] md:gap-[12px]">
          <button className="border-0 bg-transparent hover:opacity-80 transition-opacity w-[16px] h-[20px] relative cursor-pointer">
            <Image
              src="/assets/dashboard/icon-bell.svg"
              alt="notifications"
              fill
              className="object-contain"
            />
          </button>
          <button className="border-0 bg-transparent hover:opacity-80 transition-opacity w-[20px] h-[16px] relative cursor-pointer">
            <Image
              src="/assets/dashboard/icon-monitor.svg"
              alt="monitor"
              fill
              className="object-contain"
            />
          </button>
          <div className="border border-[rgba(34,211,238,0.3)] rounded-[12px] p-px w-[32px] h-[32px] overflow-hidden flex flex-col items-start justify-center">
            {user ? (
              <div className="w-full h-full rounded-full bg-[#22d3ee] flex items-center justify-center">
                <span className="text-[10px] font-bold text-[#020617]">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              </div>
            ) : (
              <Image
                src="/assets/dashboard/admin-avatar.png"
                alt="avatar"
                width={32}
                height={32}
                className="rounded-full object-cover"
              />
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
