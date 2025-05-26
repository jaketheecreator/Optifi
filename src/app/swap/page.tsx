"use client";

import React, { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { Button } from '@/components/ui/button';

export default function SwapPage() {
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

  // Animate the swap card when it appears
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.swap-card',
        { 
          opacity: 0, 
          y: 20,
        },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.4,
          ease: 'power2.out',
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold tracking-tight mb-6">Swap</h1>
      
      <div className="swap-card p-6 rounded-lg border border-border bg-card dark:bg-card-dark dark:border-border-dark">
        <div className="space-y-4">
          {/* From token */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <label className="text-sm font-medium text-foreground/70 dark:text-foreground-dark/70">From</label>
              <span className="text-sm text-foreground/70 dark:text-foreground-dark/70">Balance: 0.45</span>
            </div>
            <div className="flex items-center space-x-2 p-3 border border-border dark:border-border-dark rounded-md bg-background dark:bg-background-dark">
              <button className="px-2 py-1 flex items-center space-x-1 bg-card dark:bg-card-dark rounded-md border border-border dark:border-border-dark">
                <div className="w-5 h-5 rounded-full bg-primary"></div>
                <span>ETH</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m6 9 6 6 6-6"/>
                </svg>
              </button>
              <input 
                type="text" 
                className="w-full bg-transparent focus:outline-none text-right" 
                placeholder="0.0" 
                value="0.1"
              />
            </div>
          </div>
          
          {/* Swap icon */}
          <div className="flex justify-center">
            <div className="p-2 rounded-full border border-border dark:border-border-dark bg-background dark:bg-background-dark">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m17 10-5-5-5 5"/>
                <path d="m17 14-5 5-5-5"/>
              </svg>
            </div>
          </div>
          
          {/* To token */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <label className="text-sm font-medium text-foreground/70 dark:text-foreground-dark/70">To</label>
              <span className="text-sm text-foreground/70 dark:text-foreground-dark/70">Balance: 1240.32</span>
            </div>
            <div className="flex items-center space-x-2 p-3 border border-border dark:border-border-dark rounded-md bg-background dark:bg-background-dark">
              <button className="px-2 py-1 flex items-center space-x-1 bg-card dark:bg-card-dark rounded-md border border-border dark:border-border-dark">
                <div className="w-5 h-5 rounded-full bg-primary/70"></div>
                <span>MONAD</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m6 9 6 6 6-6"/>
                </svg>
              </button>
              <input 
                type="text" 
                className="w-full bg-transparent focus:outline-none text-right" 
                placeholder="0.0" 
                value="2,432.14"
                readOnly
              />
            </div>
          </div>
          
          {/* Details */}
          {mode === 'pro' && (
            <div className="p-3 rounded-md bg-background dark:bg-background-dark space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-foreground/70 dark:text-foreground-dark/70">Rate</span>
                <span>1 ETH = 24,321.4 MONAD</span>
              </div>
              <div className="flex justify-between">
                <span className="text-foreground/70 dark:text-foreground-dark/70">Price Impact</span>
                <span className="text-green-500">0.05%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-foreground/70 dark:text-foreground-dark/70">Route</span>
                <span>ETH → MONAD</span>
              </div>
              <div className="flex justify-between">
                <span className="text-foreground/70 dark:text-foreground-dark/70">Slippage Tolerance</span>
                <span>0.5%</span>
              </div>
            </div>
          )}
          
          {/* Button */}
          <Button className="w-full" size="lg">Swap</Button>
        </div>
      </div>
    </div>
  );
} 