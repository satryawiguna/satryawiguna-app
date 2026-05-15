'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { useLogout } from '../../hooks/useAuth';
import { ConfirmDialog } from './ConfirmDialog';

const navItems = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: '/assets/dashboard/icon-dashboard.svg',
    iconW: 18,
    iconH: 18,
  },
  {
    label: 'Projects',
    href: '/dashboard/projects',
    icon: '/assets/dashboard/icon-projects.svg',
    iconW: 20,
    iconH: 16,
  },
  {
    label: 'Media Library',
    href: '/dashboard/media',
    icon: '/assets/dashboard/icon-media.svg',
    iconW: 18.5,
    iconH: 16,
  },
  {
    label: 'Blog',
    href: '/dashboard/blog',
    icon: '/assets/dashboard/icon-blog.svg',
    iconW: 18,
    iconH: 18,
  },
  {
    label: 'Users',
    href: '/dashboard/users',
    icon: '/assets/dashboard/icon-users.svg',
    iconW: 22,
    iconH: 16,
  },
  {
    label: 'Settings',
    href: '/dashboard/settings',
    icon: '/assets/dashboard/icon-settings.svg',
    iconW: 18,
    iconH: 24,
  },
];

interface SidebarProps {
  open?: boolean;
  onClose?: () => void;
}

export function Sidebar({ open = false, onClose }: SidebarProps) {
  const pathname = usePathname();
  const { logout } = useLogout();
  const [confirmOpen, setConfirmOpen] = useState(false);

  return (
    <aside
      className={`fixed left-0 top-0 h-full w-[256px] bg-[#020617] border-r border-[rgba(255,255,255,0.1)] z-30 flex flex-col transition-transform duration-300 ${
        open ? 'translate-x-0 pointer-events-auto' : '-translate-x-full pointer-events-none'
      } lg:translate-x-0 lg:pointer-events-auto`}
    >
      <div className="flex flex-col h-full py-8 justify-between">
        {/* Brand */}
        <div className="flex flex-col gap-1 pb-10 px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Image src="/assets/dashboard/icon-terminal.svg" alt="" width={20} height={16} />
              <span className="font-['Space_Grotesk',sans-serif] font-black text-[20px] text-[#22d3ee]">
                DevShell v1.0
              </span>
            </div>
            {/* Mobile close button */}
            <button
              onClick={onClose}
              className="lg:hidden border-0 bg-transparent text-[#64748b] hover:text-white cursor-pointer p-1"
              aria-label="Close sidebar"
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
          <span className="font-['Space_Grotesk',sans-serif] text-[16px] text-[#64748b] tracking-[-0.8px]">
            Superuser Session
          </span>
        </div>

        {/* Nav items */}
        <nav className="flex flex-col gap-2 flex-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`no-underline flex items-center gap-3 py-3 rounded-none transition-colors ${
                  isActive
                    ? 'bg-[rgba(34,211,238,0.1)] border-r-2 border-[#22d3ee] text-[#22d3ee] pl-6 pr-[18px]'
                    : 'text-[#64748b] hover:text-[#94a3b8] hover:bg-[rgba(255,255,255,0.03)] px-6'
                }`}
              >
                <Image src={item.icon} alt="" width={item.iconW} height={item.iconH} />
                <span className="font-['Space_Grotesk',sans-serif] text-[14px]">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Logout button */}
        <div className="pt-6 px-6">
          <button
            onClick={() => setConfirmOpen(true)}
            className="relative w-full flex items-center justify-center py-3 rounded-[2px] bg-[#00f0ff] text-[#006970] font-['Space_Grotesk',sans-serif] text-[14px] text-center hover:bg-[#22d3ee] transition-colors shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]"
          >
            Logout
          </button>
        </div>
      </div>

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
    </aside>
  );
}
