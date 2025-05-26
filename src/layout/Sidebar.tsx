"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { gsap } from 'gsap';
import { 
  LayoutDashboard, 
  ArrowRightLeft, 
  Boxes,
  PiggyBank, 
  Coins,
  Briefcase,
  Menu,
  X
} from 'lucide-react';
import { cn } from '@/utils/cn';

interface NavItem {
  name: string;
  href: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  {
    name: 'Dashboard',
    href: '/',
    icon: <LayoutDashboard className="h-5 w-5" />,
  },
  {
    name: 'Swap',
    href: '/swap',
    icon: <ArrowRightLeft className="h-5 w-5" />,
  },
  {
    name: 'Bridge',
    href: '/bridge',
    icon: <Boxes className="h-5 w-5" />,
  },
  {
    name: 'Lend',
    href: '/lend',
    icon: <PiggyBank className="h-5 w-5" />,
  },
  {
    name: 'Stake',
    href: '/stake',
    icon: <Coins className="h-5 w-5" />,
  },
  {
    name: 'Portfolio',
    href: '/portfolio',
    icon: <Briefcase className="h-5 w-5" />,
  },
];

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Handle animation for sidebar open/close
  useEffect(() => {
    if (!sidebarRef.current) return;
    
    const ctx = gsap.context(() => {
      if (isOpen) {
        gsap.to(sidebarRef.current, {
          x: 0,
          duration: 0.3,
          ease: 'power2.out',
        });
        gsap.to(overlayRef.current, {
          opacity: 1,
          visibility: 'visible',
          duration: 0.3,
        });
      } else {
        gsap.to(sidebarRef.current, {
          x: '-100%',
          duration: 0.3,
          ease: 'power2.in',
        });
        gsap.to(overlayRef.current, {
          opacity: 0,
          duration: 0.3,
          onComplete: () => {
            if (overlayRef.current) {
              gsap.set(overlayRef.current, { visibility: 'hidden' });
            }
          },
        });
      }
    });

    return () => ctx.revert();
  }, [isOpen]);

  // Close sidebar on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Mobile menu button */}
      <button
        type="button"
        className="lg:hidden p-2 text-gray-400 hover:text-primary focus:outline-none"
        onClick={() => setIsOpen(true)}
        aria-label="Open sidebar"
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* Overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 lg:hidden opacity-0 invisible"
        onClick={() => setIsOpen(false)}
      />

      {/* Sidebar for mobile (off-canvas) */}
      <div
        ref={sidebarRef}
        className={cn(
          "fixed left-0 top-0 bottom-0 w-64 z-50 bg-card border-r border-border shadow-xl lg:hidden transform -translate-x-full",
          "dark:bg-card-dark dark:border-border-dark"
        )}
      >
        <div className="flex items-center justify-between p-4 border-b border-border dark:border-border-dark">
          <div className="font-bold text-xl text-primary">Optifi</div>
          <button
            type="button"
            className="text-gray-400 hover:text-primary"
            onClick={() => setIsOpen(false)}
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="p-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center px-3 py-2.5 text-sm font-medium rounded-md group w-full",
                pathname === item.href
                  ? "bg-primary/10 text-primary"
                  : "text-foreground/70 hover:bg-card-foreground/5 hover:text-foreground dark:text-foreground-dark/70 dark:hover:text-foreground-dark"
              )}
            >
              {item.icon}
              <span className="ml-3">{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Sidebar for desktop (always visible) */}
      <div className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 border-r border-border dark:border-border-dark">
        <div className="flex flex-col flex-1 bg-card dark:bg-card-dark">
          <div className="flex items-center h-16 px-4 border-b border-border dark:border-border-dark">
            <div className="font-bold text-xl text-primary">Optifi</div>
          </div>
          <nav className="flex-1 p-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center px-3 py-2.5 text-sm font-medium rounded-md group w-full transition-colors",
                  pathname === item.href
                    ? "bg-primary/10 text-primary"
                    : "text-foreground/70 hover:bg-card-foreground/5 hover:text-foreground dark:text-foreground-dark/70 dark:hover:text-foreground-dark"
                )}
              >
                {item.icon}
                <span className="ml-3">{item.name}</span>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
} 