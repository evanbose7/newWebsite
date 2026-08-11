'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Ticket, MapPin, Calendar, ExternalLink, Sparkles, AlertCircle, CheckCircle2 } from 'lucide-react';
import { showsData, ShowEvent } from '../../data/shows';

export default function ShowsPage() {
  const [filter, setFilter] = useState<'All' | 'Available' | 'Sold Out'>('All');
  const [selectedShow, setSelectedShow] = useState<ShowEvent | null>(null);

  const filteredShows = showsData.filter(show => {
    if (filter === 'Available') return show.status !== 'Sold Out';
    if (filter === 'Sold Out') return show.status === 'Sold Out';
    return true;
  });

  return (
    <div className="pt-32 pb-24 px-6 md:px-12 bg-brand-bg dark:bg-brand-dark min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Page Title */}
        <div className="mb-12 border-b border-brand-burgundy/15 dark:border-white/15 pb-8">
          <div className="flex items-center gap-2 text-xs font-mono tracking-[0.25em] text-brand-gold uppercase mb-2">
            <Ticket className="w-4 h-4" />
            <span>2026 WORLD TOUR SCHEDULE</span>
          </div>
          <h1 className="text-5xl sm:text-7xl font-serif font-black text-brand-burgundy dark:text-white tracking-tight mb-4">
            Shows &amp; Appearances
          </h1>
          <p className="text-base sm:text-lg font-sans text-brand-burgundy/80 dark:text-white/80 max-w-2xl leading-relaxed">
            Catch Julian Vance live on stage. Experience all-new stand-up material, post-show Q&amp;A sessions, and exclusive book signings.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex gap-2">
            {(['All', 'Available', 'Sold Out'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider transition-all ${
                  filter === tab
                    ? 'bg-brand-burgundy text-white font-bold shadow-md'
                    : 'bg-brand-card dark:bg-white/10 text-brand-burgundy/80 dark:text-white/80 hover:bg-brand-burgundy/10'
                }`}
              >
                {tab} {tab === 'All' ? `(${showsData.length})` : ''}
              </button>
            ))}
          </div>

          <span className="text-xs font-mono text-brand-muted">
            VIP MEET &amp; GREET TICKETS INCLUDE SIGNED COPY OF ECHOES OF MIDNIGHT
          </span>
        </div>

        {/* Shows List Table / Cards */}
        <div className="space-y-4">
          {filteredShows.map((show, idx) => {
            const isSoldOut = show.status === 'Sold Out';
            return (
              <motion.div
                key={show.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                className={`p-6 sm:p-8 rounded-2xl border transition-all duration-300 flex flex-col lg:flex-row lg:items-center justify-between gap-6 ${
                  isSoldOut
                    ? 'bg-brand-card/30 dark:bg-white/5 border-brand-subtle/50 opacity-75'
                    : 'bg-brand-card dark:bg-white/5 border-brand-burgundy/10 dark:border-white/10 hover:border-brand-gold hover:shadow-xl'
                }`}
              >
                {/* Date & Time */}
                <div className="flex items-center gap-6 min-w-[240px]">
                  <div className="w-20 py-3 rounded-xl bg-brand-burgundy text-white text-center flex-shrink-0">
                    <span className="text-xs font-mono font-bold text-brand-gold uppercase block">
                      {show.date.split(',')[0]}
                    </span>
                    <span className="text-[10px] font-mono text-white/70 block">
                      {show.dayOfWeek}
                    </span>
                  </div>

                  <div>
                    <span className="text-xs font-mono text-brand-muted uppercase block">
                      {show.time}
                    </span>
                    <span className="text-sm font-sans font-bold text-brand-burgundy dark:text-white">
                      {show.country}
                    </span>
                  </div>
                </div>

                {/* City & Venue */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-brand-burgundy dark:text-white">
                      {show.city}
                    </h3>
                    {show.vipAvailable && (
                      <span className="px-2 py-0.5 rounded bg-brand-gold/20 text-brand-burgundy dark:text-brand-gold text-[10px] font-mono font-bold uppercase">
                        VIP PASSES
                      </span>
                    )}
                  </div>
                  <p className="text-sm font-sans text-brand-burgundy/80 dark:text-white/80 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-brand-gold" />
                    <span>{show.venue}</span>
                  </p>
                  {show.notes && (
                    <p className="text-xs font-mono text-brand-muted mt-1 italic">
                      * {show.notes}
                    </p>
                  )}
                </div>

                {/* Status Badge & Ticket Button */}
                <div className="flex items-center gap-4 self-end lg:self-center">
                  <span
                    className={`px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-widest uppercase border ${
                      isSoldOut
                        ? 'bg-neutral-200 dark:bg-white/10 text-neutral-600 border-neutral-300'
                        : show.status === 'Selling Fast'
                        ? 'bg-amber-100 text-amber-900 border-amber-300'
                        : 'bg-emerald-100 text-emerald-900 border-emerald-300'
                    }`}
                  >
                    {show.status}
                  </span>

                  {isSoldOut ? (
                    <button
                      disabled
                      className="px-6 py-3 rounded-full bg-neutral-300 text-neutral-500 text-xs font-mono tracking-widest uppercase cursor-not-allowed"
                    >
                      Sold Out
                    </button>
                  ) : (
                    <a
                      href={show.ticketUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-burgundy hover:bg-brand-burgundy/90 text-white text-xs font-mono tracking-widest uppercase transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
                    >
                      <span>Buy Tickets</span>
                      <ExternalLink className="w-3.5 h-3.5 text-brand-gold" />
                    </a>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
