"use client";

import React, { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/utils/cn';

interface HeaderProps {
  className?: string;
}

export function Header({ className }: HeaderProps) {
  const [mode, setMode] = useState<'simple' | 'pro'>('simple');

  // Load mode from localStorage on initial render
  useEffect(() => {
    const savedMode = localStorage.getItem('optifi-mode');
    if (savedMode === 'pro') {
      setMode('pro');
    }
  }, []);

  // Save mode to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('optifi-mode', mode);
    // Dispatch an event so other components can react to the mode change
    window.dispatchEvent(new CustomEvent('optifi-mode-change', { detail: { mode } }));
  }, [mode]);

  // Animate the toggle switch using GSAP
  const handleModeToggle = () => {
    // First animate, then set state
    const newMode = mode === 'simple' ? 'pro' : 'simple';
    
    gsap.to('.mode-indicator', {
      x: mode === 'simple' ? '100%' : '0%',
      duration: 0.3,
      ease: 'power2.out',
      onComplete: () => {
        setMode(newMode);
      }
    });
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-border bg-card px-4",
        "dark:bg-card-dark dark:border-border-dark",
        className
      )}
    >
      <div className="flex lg:hidden">
        {/* This space is for the mobile sidebar toggle which is in the Sidebar component */}
      </div>
      
      <div className="hidden lg:block">
        <h1 className="font-bold text-xl text-primary">Optifi</h1>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <span className={cn(
            "text-sm font-medium",
            mode === 'simple' ? 'text-foreground dark:text-foreground-dark' : 'text-foreground/70 dark:text-foreground-dark/70'
          )}>
            Simple
          </span>
          
          <div className="relative">
            <Switch
              checked={mode === 'pro'}
              onCheckedChange={handleModeToggle}
              className="data-[state=checked]:bg-primary"
            />
          </div>
          
          <span className={cn(
            "text-sm font-medium",
            mode === 'pro' ? 'text-foreground dark:text-foreground-dark' : 'text-foreground/70 dark:text-foreground-dark/70'
          )}>
            Pro
          </span>
        </div>
      </div>
    </header>
  );
} 