'use client';

import { useState, type ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { useLogout } from '../../hooks/useAuth';
import { ConfirmDialog } from './ConfirmDialog';

const IconDashboard = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M10 6V0H18V6H10V6M0 10V0H8V10H0V10M10 18V8H18V18H10V18M0 18V12H8V18H0V18M2 8H6V2H2V8V8M12 16H16V10H12V16V16M12 4H16V2H12V4V4M2 16H6V14H2V16V16"
      fill="currentColor"
    />
  </svg>
);

const IconProjects = () => (
  <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M2 16C1.45 16 0.979167 15.8042 0.5875 15.4125C0.195833 15.0208 0 14.55 0 14V2C0 1.45 0.195833 0.979167 0.5875 0.5875C0.979167 0.195833 1.45 0 2 0H18C18.55 0 19.0208 0.195833 19.4125 0.5875C19.8042 0.979167 20 1.45 20 2V14C20 14.55 19.8042 15.0208 19.4125 15.4125C19.0208 15.8042 18.55 16 18 16H2V16M2 14H18V14V14V4H2V14V14V14V14M5.5 13L4.1 11.6L6.675 9L4.075 6.4L5.5 5L9.5 9L5.5 13V13M10 13V11H16V13H10V13"
      fill="currentColor"
    />
  </svg>
);

const IconMedia = () => (
  <svg width="19" height="16" viewBox="0 0 19 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1.5 1.5H17.5C17.7761 1.5 18 1.72386 18 2V14C18 14.2761 17.7761 14.5 17.5 14.5H1.5C1.22386 14.5 1 14.2761 1 14V2C1 1.72386 1.22386 1.5 1.5 1.5ZM0 2C0 1.17157 0.671573 0.5 1.5 0.5H17.5C18.3284 0.5 19 1.17157 19 2V14C19 14.8284 18.3284 15.5 17.5 15.5H1.5C0.671573 15.5 0 14.8284 0 14V2ZM6 4C5.44772 4 5 4.44772 5 5C5 5.55228 5.44772 6 6 6C6.55228 6 7 5.55228 7 5C7 4.44772 6.55228 4 6 4ZM4 5C4 3.89543 4.89543 3 6 3C7.10457 3 8 3.89543 8 5C8 6.10457 7.10457 7 6 7C4.89543 7 4 6.10457 4 5ZM1.14645 12.8536L5.5 8.5L8.5 11.5L12.5 8.5L17.8536 12.8536L17.1464 13.1464L12.5 9.5L8.5 12.5L5.5 9.5L1.85355 13.1464L1.14645 12.8536Z"
      fill="currentColor"
    />
  </svg>
);

const IconBlog = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M4 14H11V12H4V14V14M4 10H14V8H4V10V10M4 6H14V4H4V6V6M2 18C1.45 18 0.979167 17.8042 0.5875 17.4125C0.195833 17.0208 0 16.55 0 16V2C0 1.45 0.195833 0.979167 0.5875 0.5875C0.979167 0.195833 1.45 0 2 0H16C16.55 0 17.0208 0.195833 17.4125 0.5875C17.8042 0.979167 18 1.45 18 2V16C18 16.55 17.8042 17.0208 17.4125 17.4125C17.0208 17.8042 16.55 18 16 18H2V18M2 16H16V16V16V2V2V2H2V2V2V16V16V16V16"
      fill="currentColor"
    />
  </svg>
);

const IconUsers = () => (
  <svg width="22" height="16" viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M0 16V13.2C0 12.6333 0.145833 12.1125 0.4375 11.6375C0.729167 11.1625 1.11667 10.8 1.6 10.55C2.63333 10.0333 3.68333 9.64583 4.75 9.3875C5.81667 9.12917 6.9 9 8 9C9.1 9 10.1833 9.12917 11.25 9.3875C12.3167 9.64583 13.3667 10.0333 14.4 10.55C14.8833 10.8 15.2708 11.1625 15.5625 11.6375C15.8542 12.1125 16 12.6333 16 13.2V16H0V16M18 16V13C18 12.2667 17.7958 11.5625 17.3875 10.8875C16.9792 10.2125 16.4 9.63333 15.65 9.15C16.5 9.25 17.3 9.42083 18.05 9.6625C18.8 9.90417 19.5 10.2 20.15 10.55C20.75 10.8833 21.2083 11.2542 21.525 11.6625C21.8417 12.0708 22 12.5167 22 13V16H18V16M8 8C6.9 8 5.95833 7.60833 5.175 6.825C4.39167 6.04167 4 5.1 4 4C4 2.9 4.39167 1.95833 5.175 1.175C5.95833 0.391667 6.9 0 8 0C9.1 0 10.0417 0.391667 10.825 1.175C11.6083 1.95833 12 2.9 12 4C12 5.1 11.6083 6.04167 10.825 6.825C10.0417 7.60833 9.1 8 8 8V8M18 4C18 5.1 17.6083 6.04167 16.825 6.825C16.0417 7.60833 15.1 8 14 8C13.8167 8 13.5833 7.97917 13.3 7.9375C13.0167 7.89583 12.7833 7.85 12.6 7.8C13.05 7.26667 13.3958 6.675 13.6375 6.025C13.8792 5.375 14 4.7 14 4C14 3.3 13.8792 2.625 13.6375 1.975C13.3958 1.325 13.05 0.733333 12.6 0.2C12.8333 0.116667 13.0667 0.0625 13.3 0.0375C13.5333 0.0125 13.7667 0 14 0C15.1 0 16.0417 0.391667 16.825 1.175C17.6083 1.95833 18 2.9 18 4V4M2 14H14V13.2C14 13.0167 13.9542 12.85 13.8625 12.7C13.7708 12.55 13.65 12.4333 13.5 12.35C12.6 11.9 11.6917 11.5625 10.775 11.3375C9.85833 11.1125 8.93333 11 8 11C7.06667 11 6.14167 11.1125 5.225 11.3375C4.30833 11.5625 3.4 11.9 2.5 12.35C2.35 12.4333 2.22917 12.55 2.1375 12.7C2.04583 12.85 2 13.0167 2 13.2V14V14M8 6C8.55 6 9.02083 5.80417 9.4125 5.4125C9.80417 5.02083 10 4.55 10 4C10 3.45 9.80417 2.97917 9.4125 2.5875C9.02083 2.19583 8.55 2 8 2C7.45 2 6.97917 2.19583 6.5875 2.5875C6.19583 2.97917 6 3.45 6 4C6 4.55 6.19583 5.02083 6.5875 5.4125C6.97917 5.80417 7.45 6 8 6V6"
      fill="currentColor"
    />
  </svg>
);

const IconSkill = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 1L17 5V13L9 17L1 13V5L9 1Z" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <circle cx="9" cy="9" r="3" stroke="currentColor" strokeWidth="1.5" fill="none" />
  </svg>
);

const IconCategory = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect
      x="1"
      y="1"
      width="7"
      height="7"
      rx="1.5"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
    />
    <rect
      x="10"
      y="1"
      width="7"
      height="7"
      rx="1.5"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
    />
    <rect
      x="1"
      y="10"
      width="7"
      height="7"
      rx="1.5"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
    />
    <rect
      x="10"
      y="10"
      width="7"
      height="7"
      rx="1.5"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
    />
  </svg>
);

const IconSettings = () => (
  <svg width="18" height="24" viewBox="0 0 18 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M9 4C8.45 4 7.97917 3.80417 7.5875 3.4125C7.19583 3.02083 7 2.55 7 2C7 1.45 7.19583 0.979167 7.5875 0.5875C7.97917 0.195833 8.45 0 9 0C9.55 0 10.0208 0.195833 10.4125 0.5875C10.8042 0.979167 11 1.45 11 2C11 2.55 10.8042 3.02083 10.4125 3.4125C10.0208 3.80417 9.55 4 9 4V4M6 19V7C5 6.91667 3.98333 6.79167 2.95 6.625C1.91667 6.45833 0.933333 6.25 0 6L0.5 4C1.8 4.35 3.18333 4.60417 4.65 4.7625C6.11667 4.92083 7.56667 5 9 5C10.4333 5 11.8833 4.92083 13.35 4.7625C14.8167 4.60417 16.2 4.35 17.5 4L18 6C17.0667 6.25 16.0833 6.45833 15.05 6.625C14.0167 6.79167 13 6.91667 12 7V19H10V13H8V19H6V19M5 24C4.71667 24 4.47917 23.9042 4.2875 23.7125C4.09583 23.5208 4 23.2833 4 23C4 22.7167 4.09583 22.4792 4.2875 22.2875C4.47917 22.0958 4.71667 22 5 22C5.28333 22 5.52083 22.0958 5.7125 22.2875C5.90417 22.4792 6 22.7167 6 23C6 23.2833 5.90417 23.5208 5.7125 23.7125C5.52083 23.9042 5.28333 24 5 24V24M9 24C8.71667 24 8.47917 23.9042 8.2875 23.7125C8.09583 23.5208 8 23.2833 8 23C8 22.7167 8.09583 22.4792 8.2875 22.2875C8.47917 22.0958 8.71667 22 9 22C9.28333 22 9.52083 22.0958 9.7125 22.2875C9.90417 22.4792 10 22.7167 10 23C10 23.2833 9.90417 23.5208 9.7125 23.7125C9.52083 23.9042 9.28333 24 9 24V24M13 24C12.7167 24 12.4792 23.9042 12.2875 23.7125C12.0958 23.5208 12 23.2833 12 23C12 22.7167 12.0958 22.4792 12.2875 22.2875C12.4792 22.0958 12.7167 22 13 22C13.2833 22 13.5208 22.0958 13.7125 22.2875C13.9042 22.4792 14 22.7167 14 23C14 23.2833 13.9042 23.5208 13.7125 23.7125C13.5208 23.9042 13.2833 24 13 24V24"
      fill="currentColor"
    />
  </svg>
);

const IconTag = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M2 2L7 2L16 11L11 16L2 7L2 2Z"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
      strokeLinejoin="round"
    />
    <circle cx="5" cy="5" r="1" fill="currentColor" />
  </svg>
);

const IconExperience = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect
      x="1"
      y="4"
      width="16"
      height="12"
      rx="2"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
    />
    <path
      d="M6 4V3C6 2.44772 6.44772 2 7 2H11C11.5523 2 12 2.44772 12 3V4"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
    />
    <path d="M1 8H17" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="5" cy="11" r="1" fill="currentColor" />
    <circle cx="9" cy="11" r="1" fill="currentColor" />
    <circle cx="13" cy="11" r="1" fill="currentColor" />
  </svg>
);

const IconEducation = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M9 1L17 5L9 9L1 5L9 1Z"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
      strokeLinejoin="round"
    />
    <path
      d="M4 7.5V13C4 13 6 15 9 15C12 15 14 13 14 13V7.5"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
      strokeLinecap="round"
    />
    <path d="M17 5V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const navItems: { label: string; href: string; icon: ReactNode }[] = [
  { label: 'Dashboard', href: '/dashboard', icon: <IconDashboard /> },
  { label: 'Projects', href: '/dashboard/projects', icon: <IconProjects /> },
  { label: 'Media Libraries', href: '/dashboard/medias', icon: <IconMedia /> },
  { label: 'Blogs', href: '/dashboard/blogs', icon: <IconBlog /> },
  { label: 'Experiences', href: '/dashboard/experiences', icon: <IconExperience /> },
  { label: 'Educations', href: '/dashboard/educations', icon: <IconEducation /> },
  { label: 'Skills', href: '/dashboard/skills', icon: <IconSkill /> },
  { label: 'Categories', href: '/dashboard/categories', icon: <IconCategory /> },
  { label: 'Tags', href: '/dashboard/tags', icon: <IconTag /> },
  { label: 'Users', href: '/dashboard/users', icon: <IconUsers /> },
  { label: 'Settings', href: '/dashboard/settings', icon: <IconSettings /> },
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
                {item.icon}
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
