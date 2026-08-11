'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Ticket, Menu } from 'lucide-react';
import { NavMenuOverlay } from './NavMenuOverlay';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-brand-bg/90 dark:bg-brand-dark/90 backdrop-blur-md shadow-md border-b border-brand-subtle/50 dark:border-white/10 py-3.5'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo / Name */}
          <Link
            href="/"
            className="group flex flex-col focus:outline-none"
          >
            <span className="font-serif text-xl sm:text-2xl font-black tracking-widest text-brand-burgundy dark:text-white group-hover:text-brand-gold transition-colors">
              JULIAN VANCE
            </span>
            <span className="text-[9px] font-mono tracking-[0.25em] text-brand-muted uppercase -mt-1 group-hover:text-brand-gold/80 transition-colors">
              EST. 2014 • OFFICIAL SITE
            </span>
          </Link>

          {/* Right Action Controls */}
          <div className="flex items-center gap-3 md:gap-4">
            {/* "Get Tickets" CTA Button */}
            <Link
              href="/shows"
              className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-brand-burgundy hover:bg-brand-burgundy/90 text-white font-mono text-xs uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5"
            >
              <Ticket className="w-3.5 h-3.5 text-brand-gold" />
              <span>Get Tickets</span>
            </Link>

            {/* Hamburger Menu Toggle Button */}
            <button
              onClick={() => setIsMenuOpen(true)}
              aria-label="Open navigation menu"
              className="flex items-center gap-2 px-3.5 py-2 sm:px-4 sm:py-2 rounded-full border border-brand-burgundy/20 dark:border-white/20 bg-brand-card/60 dark:bg-white/10 hover:bg-brand-burgundy hover:text-white dark:hover:bg-white/20 transition-all text-xs font-mono tracking-widest text-brand-burgundy dark:text-white group"
            >
              <Menu className="w-4 h-4 text-brand-gold group-hover:text-white transition-colors" />
              <span className="hidden sm:inline">MENU</span>
            </button>
          </div>
        </div>
      </header>

      {/* Nav Menu Overlay */}
      <NavMenuOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
};
