"use client";

import React, { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { Button } from '@/components/ui/button';

export default function DashboardPage() {
  const [mode, setMode] = useState<'simple' | 'pro'>('simple');

  // Listen for mode changes from the header
  useEffect(() => {
    const handleModeChange = (e: CustomEvent<{ mode: 'simple' | 'pro' }>) => {
      setMode(e.detail.mode);
    };

    // Check localStorage on mount
    const savedMode = localStorage.getItem('optifi-mode');
    if (savedMode === 'pro') {
      setMode('pro');
    }

    window.addEventListener('optifi-mode-change', handleModeChange as EventListener);
    return () => {
      window.removeEventListener('optifi-mode-change', handleModeChange as EventListener);
    };
  }, []);

  // Animate cards when they appear
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.dashboard-card',
        { 
          opacity: 0, 
          y: 20,
        },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.4,
          stagger: 0.1,
          ease: 'power2.out',
        }
      );
    });

    return () => ctx.revert();
  }, [mode]); // Re-run animation when mode changes

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <Button variant="outline" size="sm">Refresh</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Common cards for both modes */}
        <div className="dashboard-card p-6 rounded-lg border border-border bg-card dark:bg-card-dark dark:border-border-dark">
          <h3 className="font-medium mb-2">Total Value Locked</h3>
          <p className="text-3xl font-bold text-primary">$1.24B</p>
        </div>

        <div className="dashboard-card p-6 rounded-lg border border-border bg-card dark:bg-card-dark dark:border-border-dark">
          <h3 className="font-medium mb-2">24h Trading Volume</h3>
          <p className="text-3xl font-bold text-primary">$345.2M</p>
        </div>

        <div className="dashboard-card p-6 rounded-lg border border-border bg-card dark:bg-card-dark dark:border-border-dark">
          <h3 className="font-medium mb-2">Monad Price</h3>
          <div className="flex items-end gap-2">
            <p className="text-3xl font-bold">$24.32</p>
            <span className="text-green-500 text-sm">+2.4%</span>
          </div>
        </div>

        {/* Pro mode cards */}
        {mode === 'pro' && (
          <>
            <div className="dashboard-card p-6 rounded-lg border border-border bg-card dark:bg-card-dark dark:border-border-dark md:col-span-2">
              <h3 className="font-medium mb-2">Market Trends</h3>
              <div className="h-40 flex items-center justify-center border border-dashed border-border dark:border-border-dark rounded-md bg-background/50 dark:bg-background-dark/50">
                <p className="text-foreground/70 dark:text-foreground-dark/70">Chart Placeholder</p>
              </div>
            </div>

            <div className="dashboard-card p-6 rounded-lg border border-border bg-card dark:bg-card-dark dark:border-border-dark">
              <h3 className="font-medium mb-2">Gas Tracker</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-foreground/70 dark:text-foreground-dark/70">Low</span>
                  <span>12 gwei</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground/70 dark:text-foreground-dark/70">Medium</span>
                  <span>15 gwei</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground/70 dark:text-foreground-dark/70">High</span>
                  <span>18 gwei</span>
                </div>
              </div>
            </div>

            <div className="dashboard-card p-6 rounded-lg border border-border bg-card dark:bg-card-dark dark:border-border-dark md:col-span-2">
              <h3 className="font-medium mb-2">Top Pools by TVL</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center p-2 rounded-md bg-background/50 dark:bg-background-dark/50">
                  <span>MONAD-ETH</span>
                  <span className="font-medium">$245.6M</span>
                </div>
                <div className="flex justify-between items-center p-2 rounded-md bg-background/50 dark:bg-background-dark/50">
                  <span>MONAD-USDC</span>
                  <span className="font-medium">$187.3M</span>
                </div>
                <div className="flex justify-between items-center p-2 rounded-md bg-background/50 dark:bg-background-dark/50">
                  <span>ETH-USDC</span>
                  <span className="font-medium">$156.8M</span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
} 