'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Calendar, ArrowUpRight, Filter, ChevronRight, X } from 'lucide-react';
import { newsFeedData, NewsItem } from '../data/news';

export const NewsFeed: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeItem, setActiveItem] = useState<NewsItem | null>(null);

  const categories = ['All', 'Tour Announcement', 'Book Release', 'Press & Honors', 'Podcast'];

  const filteredNews = selectedCategory === 'All'
    ? newsFeedData
    : newsFeedData.filter(item => item.category === selectedCategory);

  return (
    <section className="py-24 px-6 md:px-12 bg-brand-bg dark:bg-brand-dark border-b border-brand-subtle/60 dark:border-white/10">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono tracking-[0.25em] text-brand-gold uppercase mb-2">
              <MapPin className="w-4 h-4" />
              <span>TIMELINE & DISPATCHES</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-serif font-bold text-brand-burgundy dark:text-white tracking-tight">
              Where&apos;s Julian?
            </h2>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all ${
                  selectedCategory === cat
                    ? 'bg-brand-burgundy text-white font-bold shadow-sm'
                    : 'bg-brand-card dark:bg-white/10 text-brand-burgundy/80 dark:text-white/80 hover:bg-brand-burgundy/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Timeline Feed List */}
        <div className="space-y-4">
          {filteredNews.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
            >
              <div
                onClick={() => setActiveItem(item)}
                className="group relative p-6 sm:p-8 rounded-2xl bg-brand-card/60 dark:bg-white/5 border border-brand-burgundy/10 dark:border-white/10 hover:border-brand-gold transition-all duration-300 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-lg"
              >
                {/* Date Badge & Category */}
                <div className="flex items-center gap-4 min-w-[200px]">
                  <div className="px-4 py-2 rounded-xl bg-brand-burgundy text-white text-center flex-shrink-0">
                    <span className="text-xs font-mono font-bold block text-brand-gold uppercase tracking-wider">
                      {item.date}
                    </span>
                    <span className="text-[10px] font-mono text-white/70 block">
                      {item.year}
                    </span>
                  </div>

                  <span className="inline-block px-3 py-1 rounded-full bg-brand-gold/15 text-brand-burgundy dark:text-brand-gold text-[10px] font-mono font-bold tracking-widest uppercase">
                    {item.category}
                  </span>
                </div>

                {/* Content Details */}
                <div className="flex-1">
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-brand-burgundy dark:text-white group-hover:text-brand-gold transition-colors mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm font-sans text-brand-burgundy/80 dark:text-white/80 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Arrow Icon */}
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-brand-burgundy dark:text-white group-hover:text-brand-gold transition-colors self-end md:self-center">
                  <span className="hidden sm:inline">READ UPDATE</span>
                  <div className="w-8 h-8 rounded-full border border-brand-burgundy/20 dark:border-white/20 flex items-center justify-center group-hover:bg-brand-burgundy group-hover:text-white group-hover:border-transparent transition-all">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* News Detail Modal */}
      <AnimatePresence>
        {activeItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
            onClick={() => setActiveItem(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-brand-bg dark:bg-brand-dark border border-brand-burgundy/20 dark:border-white/20 rounded-2xl max-w-xl w-full p-8 shadow-2xl relative overflow-hidden"
            >
              <button
                onClick={() => setActiveItem(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-brand-card dark:bg-white/10 text-brand-burgundy dark:text-white hover:bg-brand-burgundy hover:text-white transition-all"
              >
                <X className="w-4 h-4" />
              </button>

              <span className="inline-block px-3 py-1 rounded-full bg-brand-burgundy text-brand-gold text-[10px] font-mono font-bold tracking-widest uppercase mb-4">
                {activeItem.category} • {activeItem.date}, {activeItem.year}
              </span>

              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-brand-burgundy dark:text-white mb-4">
                {activeItem.title}
              </h3>

              {activeItem.image && (
                <div className="aspect-video rounded-xl overflow-hidden mb-4 border border-brand-subtle">
                  <img src={activeItem.image} alt={activeItem.title} className="w-full h-full object-cover" />
                </div>
              )}

              <p className="text-sm font-sans text-brand-burgundy/80 dark:text-white/80 leading-relaxed mb-6">
                {activeItem.description}
              </p>

              {activeItem.linkUrl && (
                <div className="pt-4 border-t border-brand-subtle/60 dark:border-white/10 flex justify-end">
                  <Link
                    href={activeItem.linkUrl}
                    onClick={() => setActiveItem(null)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-burgundy text-white text-xs font-mono tracking-widest uppercase hover:bg-brand-burgundy/90 transition-all"
                  >
                    <span>{activeItem.linkText || 'View Details'}</span>
                    <ArrowUpRight className="w-4 h-4 text-brand-gold" />
                  </Link>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
