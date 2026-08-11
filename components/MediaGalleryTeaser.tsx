'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Play, ArrowRight, Film, Radio } from 'lucide-react';
import { mediaData } from '../data/media';

interface MediaGalleryTeaserProps {
  onSelectMedia?: (embedUrl: string) => void;
}

export const MediaGalleryTeaser: React.FC<MediaGalleryTeaserProps> = ({ onSelectMedia }) => {
  const featuredItems = mediaData.slice(0, 4);

  return (
    <section className="py-24 px-6 md:px-12 bg-brand-bg dark:bg-brand-dark border-b border-brand-subtle/60 dark:border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono tracking-[0.25em] text-brand-gold uppercase mb-2">
              <Film className="w-4 h-4" />
              <span>ON THE SCREEN & AIRWAVES</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-serif font-bold text-brand-burgundy dark:text-white tracking-tight">
              Media — on the screen
            </h2>
          </div>

          <Link
            href="/watch-listen"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-brand-burgundy dark:text-white hover:text-brand-gold dark:hover:text-brand-gold transition-colors group"
          >
            <span>WATCH & LISTEN ALL ({mediaData.length})</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-brand-gold" />
          </Link>
        </div>

        {/* Horizontal Scrolling Row */}
        <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-none snap-x snap-mandatory">
          {featuredItems.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="flex-none w-80 sm:w-96 snap-start"
            >
              <div
                onClick={() => onSelectMedia && onSelectMedia(item.embedUrl)}
                className="group cursor-pointer block bg-brand-card dark:bg-white/5 rounded-2xl overflow-hidden border border-brand-burgundy/10 dark:border-white/10 hover:border-brand-gold transition-all duration-300 shadow-sm hover:shadow-xl"
              >
                {/* Thumbnail Image */}
                <div className="relative aspect-video overflow-hidden bg-neutral-900">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-300" />

                  {/* Category Pill */}
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-mono tracking-widest text-brand-gold uppercase border border-white/10">
                    {item.category}
                  </span>

                  {/* Duration Pill */}
                  <span className="absolute bottom-3 right-3 px-2.5 py-0.5 rounded bg-black/70 text-[10px] font-mono text-white/90">
                    {item.duration}
                  </span>

                  {/* Play Button Hover Icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-brand-burgundy/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-brand-gold group-hover:text-black transition-all duration-300">
                      <Play className="w-5 h-5 fill-current ml-0.5" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <span className="text-[11px] font-mono text-brand-muted uppercase tracking-widest block mb-2">
                    RELEASED • {item.date}
                  </span>
                  <h3 className="text-lg font-serif font-bold text-brand-burgundy dark:text-white group-hover:text-brand-gold transition-colors line-clamp-2 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-brand-burgundy/70 dark:text-white/70 line-clamp-2 leading-relaxed font-sans">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
