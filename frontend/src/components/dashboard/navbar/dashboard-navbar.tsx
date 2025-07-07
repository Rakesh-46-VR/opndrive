'use client';

import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

import Image from 'next/image';
import NavbarUserProfile from './navbar-user-profile';

interface DashboardNavbarProps {
  toggleSidebar: () => void;
  role: string;
}

export function DashboardNavbar({ toggleSidebar, role }: DashboardNavbarProps) {
  return (
    <header className="w-full bg-secondary py-3 px-6 z-30">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center">
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="text-muted-foreground hover:text-foreground hover:bg-accent mr-2"
              aria-label="Toggle Sidebar"
            >
              <Menu size={20} />
              <span className="sr-only">Toggle Sidebar</span>
            </Button>
          </div>

          <div className="items-center hidden space-x-2 lg:flex">
            <Image
              src="/logo-nobg.png"
              width={50}
              height={50}
              className="h-10 w-auto"
              alt="Organization Logo"
            />
            <span className="text-foreground font-medium text-xl mr-2">
              Opn<span className="text-primary">drive</span>
            </span>
          </div>

          <div className="hidden lg:block">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="text-muted-foreground hover:text-foreground hover:bg-accent ml-4"
              aria-label="Toggle Sidebar"
            >
              <Menu size={20} />
              <span className="sr-only">Toggle Sidebar</span>
            </Button>
          </div>
        </div>
        <NavbarUserProfile role={role} />
      </div>
    </header>
  );
}