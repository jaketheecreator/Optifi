"use client";

import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { cn } from '@/utils/cn';

interface RootLayoutProps {
  children: React.ReactNode;
}

export function RootLayout({ children }: RootLayoutProps) {
  // Add page transition animation with GSAP
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the page content on initial load
      gsap.fromTo(
        '.page-content',
        { opacity: 0, y: 10 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.4, 
          ease: 'power1.out',
          clearProps: 'all'
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className={cn("min-h-screen bg-background text-foreground dark:bg-background-dark dark:text-foreground-dark")}>
      <Sidebar />
      <div className="lg:pl-64">
        <Header />
        <main className="page-content p-4 pt-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
} 