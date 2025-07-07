'use client';

import type React from 'react';
import { useState, useEffect, useMemo } from 'react';
import { useParams } from 'next/navigation';
import { DashboardBreadcrumb } from '@/components/dashboard/dashboard-breadcrumb';
import { getNavItems } from '@/lib/dashboard-nav-config';
import { UnifiedRoleGuard } from '@/components/auth/unified-role-guard';
import NotFound from '@/app/not-found';
import { VALID_ROLES } from '@/lib/auth-config';
import LoadingBar from '@/components/loading-bar';
import { DashboardNavbar } from '@/components/dashboard/navbar/dashboard-navbar';
import { DashboardSidebar } from '@/components/dashboard/sidebar/dashboard-sidebar';

export default function DynamicDashboardLayout({ children }: { children: React.ReactNode }) {
  const params = useParams();

  const [role, setRole] = useState('');
  const [paramsLoaded, setParamsLoaded] = useState(false);

  useEffect(() => {
    const loadParams = async () => {
      const resolvedParams = await params;
      const resolvedRole =
        typeof resolvedParams.role === 'string' ? resolvedParams.role.toLowerCase() : '';
      setRole(resolvedRole);
      setParamsLoaded(true);
    };
    loadParams();
  }, [params]);

  const isValidRole = useMemo(() => VALID_ROLES.includes(role), [role]);

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const localStorageKeyForOpen = useMemo(() => `sidebarOpen_${role}`, [role]);

  useEffect(() => {
    if (!isValidRole || !paramsLoaded) return;

    const savedState = localStorage.getItem(localStorageKeyForOpen);
    if (savedState !== null) {
      setIsSidebarOpen(savedState === 'true');
    } else if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
  }, [localStorageKeyForOpen, isValidRole, paramsLoaded]);

  const toggleSidebar = () => {
    if (!isValidRole) return;
    setIsSidebarOpen((prev) => {
      const nextState = !prev;
      localStorage.setItem(localStorageKeyForOpen, nextState.toString());
      return nextState;
    });
  };

  const closeSidebar = () => {
    if (!isValidRole) return;
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      setIsSidebarOpen(false);
      localStorage.setItem(localStorageKeyForOpen, 'false');
    }
  };

  const navItems = useMemo(() => getNavItems(role), [role]);
  const basePath = useMemo(() => `/dashboard/${role}`, [role]);

  if (!paramsLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg animate-pulse">Loading...</div>
      </div>
    );
  }

  if (!isValidRole) {
    return <NotFound />;
  }

  return (
    // <UnifiedRoleGuard requiredRole={role}>
    <div className="flex flex-col h-screen bg-secondary">
      <LoadingBar />
      <DashboardNavbar toggleSidebar={toggleSidebar} role={role} />
      <div className="flex flex-1 overflow-hidden">
        <DashboardSidebar
          isOpen={isSidebarOpen}
          closeSidebar={closeSidebar}
          navItems={navItems}
          basePath={basePath}
          role={role}
        />
        <div
          className={`flex flex-col flex-1 overflow-hidden lg:mr-4 lg:mb-4 ${
            !isSidebarOpen ? 'lg:ml-4' : ''
          }`}
        >
          <div className="flex flex-col flex-1 bg-background rounded-3xl border border-border/20">
            <div className="rounded-t-3xl overflow-hidden">
              <DashboardBreadcrumb role={role} />
            </div>
            <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
          </div>
        </div>
      </div>
    </div>
    // </UnifiedRoleGuard>
  );
}
