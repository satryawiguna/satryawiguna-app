'use client';

import { useState } from 'react';
import { AuthGuard } from '@/presentation/components/auth';
import { Sidebar, Topbar } from '@/presentation/components/common';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <AuthGuard>
      <div className="flex min-h-screen bg-[#060e20]">
        {/* Mobile overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-20 bg-black/50 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="flex flex-col flex-1 min-w-0 lg:pl-[256px]">
          <Topbar onMenuClick={() => setSidebarOpen((prev) => !prev)} />
          <main className="flex-1">{children}</main>
        </div>
      </div>
    </AuthGuard>
  );
}
