'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Play, Ticket, BookOpen, Film, ArrowRight, Sparkles } from 'lucide-react';
import { siteConfig } from '../data/site';

interface HeroProps {
  onOpenVideoModal?: (embedUrl: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenVideoModal }) => {
  const { heroBadge } = siteConfig;

  return (
    <section className="relative min-h-[90vh] pt-32 pb-16 md:pt-40 md:pb-24 px-6 md:px-12 flex flex-col justify-between overflow-hidden bg-brand-bg dark:bg-brand-dark">
      {/* Background Decorative Ambient Glows */}
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-brand-burgundy/10 dark:bg-brand-burgundy/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-brand-gold/10 dark:bg-brand-gold/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col justify-center">
        {/* LATEST PROJECT BADGE */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          <div className="inline-flex flex-wrap items-center gap-3 p-1.5 pr-5 rounded-full bg-brand-card dark:bg-white/10 border border-brand-burgundy/15 dark:border-white/15 shadow-sm hover:border-brand-gold transition-all group">
            <div className="relative w-9 h-9 rounded-full overflow-hidden bg-black flex-shrink-0 border border-brand-gold/50">
              <img
                src={heroBadge.thumbnail}
                alt={heroBadge.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <Play className="w-3 h-3 text-white fill-white" />
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="px-2 py-0.5 rounded-full bg-brand-burgundy text-brand-gold font-mono font-bold text-[10px] tracking-widest uppercase">
                {heroBadge.label}
              </span>
              <span className="font-sans font-medium text-brand-burgundy dark:text-white line-clamp-1">
                {heroBadge.title}
              </span>
            </div>

            {onOpenVideoModal ? (
              <button
                onClick={() => onOpenVideoModal("https://www.youtube.com/embed/dQw4w9WgXcQ")}
                className="flex items-center gap-1 text-xs font-mono text-brand-gold font-bold hover:underline ml-auto"
              >
                <span>WATCH</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <Link
                href={heroBadge.linkUrl}
                className="flex items-center gap-1 text-xs font-mono text-brand-gold font-bold hover:underline ml-auto"
              >
                <span>EXPLORE</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>
        </motion.div>

        {/* HERO MAIN HEADLINE */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <span className="text-xs sm:text-sm font-mono tracking-[0.3em] uppercase text-brand-gold font-semibold block mb-3">
            AUTHOR • STAND-UP COMEDIAN • PODCASTER
          </span>
          <h1 className="text-6xl sm:text-8xl md:text-9xl font-serif font-black tracking-tight leading-none text-brand-burgundy dark:text-white select-none">
            JULIAN<br />
            <span className="italic font-normal text-brand-gold drop-shadow-sm">VANCE</span>
          </h1>
        </motion.div>

        {/* HERO INTRO SUBTITLE & QUICK NAV LINKS */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pt-4 border-t border-brand-burgundy/15 dark:border-white/15"
        >
          {/* Subtitle */}
          <p className="max-w-xl text-lg sm:text-xl font-sans text-brand-burgundy/80 dark:text-white/80 leading-relaxed font-light">
            Crafting razor-sharp satire, unvarnished human stories, and quiet observations for a noisy world.
          </p>

          {/* 3 QUICK NAV LINKS */}
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/shows"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-brand-burgundy hover:bg-brand-burgundy/90 text-white font-mono text-xs uppercase tracking-widest transition-all shadow-sm hover:-translate-y-0.5 group"
            >
              <Ticket className="w-4 h-4 text-brand-gold group-hover:rotate-12 transition-transform" />
              <span>SHOWS</span>
            </Link>

            <Link
              href="/books"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-brand-burgundy/30 dark:border-white/30 bg-brand-card/50 dark:bg-white/5 hover:bg-brand-burgundy hover:text-white text-brand-burgundy dark:text-white font-mono text-xs uppercase tracking-widest transition-all hover:-translate-y-0.5 group"
            >
              <BookOpen className="w-4 h-4 text-brand-gold" />
              <span>BOOKS</span>
            </Link>

            <Link
              href="/watch-listen"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-brand-burgundy/30 dark:border-white/30 bg-brand-card/50 dark:bg-white/5 hover:bg-brand-burgundy hover:text-white text-brand-burgundy dark:text-white font-mono text-xs uppercase tracking-widest transition-all hover:-translate-y-0.5 group"
            >
              <Film className="w-4 h-4 text-brand-gold" />
              <span>WATCH & LISTEN</span>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Editorial Decorative Footer Tag */}
      <div className="max-w-7xl mx-auto w-full mt-12 flex items-center justify-between text-[11px] font-mono text-brand-muted uppercase tracking-widest">
        <span className="flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-brand-gold" /> 2026 WORLD TOUR NOW ON SALE
        </span>
        <span className="hidden sm:inline">SCROLL FOR DISPATCHES & EXCERPTS</span>
      </div>
    </section>
  );
};
