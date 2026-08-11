'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Film, Play, Radio, Mic, Tv } from 'lucide-react';
import { mediaData, MediaItem } from '../../data/media';
import { ModalPlayer } from '../../components/ModalPlayer';

export default function WatchListenPage() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [activeEmbedUrl, setActiveEmbedUrl] = useState<string | null>(null);

  const categories = ['All', 'Stand-up Special', 'Podcast Episode', 'TV & Late Night', 'Interview & Feature'];

  const filteredMedia = activeCategory === 'All'
    ? mediaData
    : mediaData.filter(item => item.category === activeCategory);

  return (
    <div className="pt-32 pb-24 px-6 md:px-12 bg-brand-bg dark:bg-brand-dark min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 border-b border-brand-burgundy/15 dark:border-white/15 pb-8">
          <div className="flex items-center gap-2 text-xs font-mono tracking-[0.25em] text-brand-gold uppercase mb-2">
            <Film className="w-4 h-4" />
            <span>VIDEO SPECIALS &amp; AUDIO DISPATCHES</span>
          </div>
          <h1 className="text-5xl sm:text-7xl font-serif font-black text-brand-burgundy dark:text-white tracking-tight mb-4">
            Watch &amp; Listen
          </h1>
          <p className="text-base sm:text-lg font-sans text-brand-burgundy/80 dark:text-white/80 max-w-2xl leading-relaxed">
            Explore Julian Vance&apos;s Netflix specials, weekly podcast episodes of Anatomy of a Rumor, late night TV appearances, and BFI keynote audio recordings.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2 mb-10">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider transition-all ${
                activeCategory === cat
                  ? 'bg-brand-burgundy text-white font-bold shadow-md'
                  : 'bg-brand-card dark:bg-white/10 text-brand-burgundy/80 dark:text-white/80 hover:bg-brand-burgundy/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid of Media Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredMedia.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: idx * 0.08 }}
            >
              <div
                onClick={() => setActiveEmbedUrl(item.embedUrl)}
                className="group cursor-pointer block bg-brand-card dark:bg-white/5 rounded-2xl overflow-hidden border border-brand-burgundy/10 dark:border-white/10 hover:border-brand-gold transition-all duration-300 shadow-sm hover:shadow-2xl"
              >
                {/* Thumbnail */}
                <div className="relative aspect-video overflow-hidden bg-black">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors duration-300" />

                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-[10px] font-mono tracking-widest text-brand-gold uppercase border border-white/10">
                    {item.category}
                  </span>

                  <span className="absolute bottom-3 right-3 px-2.5 py-0.5 rounded bg-black/80 text-[10px] font-mono text-white">
                    {item.duration}
                  </span>

                  {/* Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-brand-burgundy/90 text-white flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:bg-brand-gold group-hover:text-black transition-all duration-300">
                      <Play className="w-6 h-6 fill-current ml-0.5" />
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div className="p-6">
                  <span className="text-[10px] font-mono text-brand-muted uppercase tracking-widest block mb-2">
                    {item.date}
                  </span>
                  <h3 className="text-xl font-serif font-bold text-brand-burgundy dark:text-white group-hover:text-brand-gold transition-colors mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs font-sans text-brand-burgundy/80 dark:text-white/80 leading-relaxed line-clamp-3">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <ModalPlayer embedUrl={activeEmbedUrl} onClose={() => setActiveEmbedUrl(null)} />
    </div>
  );
}
