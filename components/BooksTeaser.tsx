'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { BookOpen, ArrowRight, ShoppingBag } from 'lucide-react';
import { booksData, BookItem } from '../data/books';

interface BooksTeaserProps {
  onSelectBookExcerpt?: (book: BookItem) => void;
}

export const BooksTeaser: React.FC<BooksTeaserProps> = ({ onSelectBookExcerpt }) => {
  return (
    <section className="py-24 px-6 md:px-12 bg-brand-bg dark:bg-brand-dark border-b border-brand-subtle/60 dark:border-white/10">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono tracking-[0.25em] text-brand-gold uppercase mb-2">
              <BookOpen className="w-4 h-4" />
              <span>PUBLISHED WORKS</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-serif font-bold text-brand-burgundy dark:text-white tracking-tight">
              Books &amp; Publications
            </h2>
          </div>

          <Link
            href="/books"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-brand-burgundy dark:text-white hover:text-brand-gold dark:hover:text-brand-gold transition-colors group"
          >
            <span>EXPLORE ALL BOOKS ({booksData.length})</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-brand-gold" />
          </Link>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {booksData.map((book, idx) => (
            <motion.div
              key={book.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group flex flex-col justify-between rounded-2xl bg-brand-card/70 dark:bg-white/5 border border-brand-burgundy/10 dark:border-white/10 p-6 hover:border-brand-gold transition-all duration-300 shadow-sm hover:shadow-xl"
            >
              <div>
                {/* Book Cover */}
                <div className="relative aspect-[2/3] rounded-xl overflow-hidden mb-6 shadow-md group-hover:shadow-2xl transition-all duration-500 bg-neutral-900">
                  <img
                    src={book.coverImage}
                    alt={book.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />

                  {book.isBestseller && (
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-brand-gold text-black font-mono text-[10px] font-bold tracking-widest uppercase shadow-md">
                      NYT BESTSELLER
                    </span>
                  )}

                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="text-[10px] font-mono text-brand-gold tracking-widest uppercase block">
                      {book.publishedYear} • {book.publisher}
                    </span>
                  </div>
                </div>

                {/* Book Details */}
                <h3 className="text-xl font-serif font-bold text-brand-burgundy dark:text-white group-hover:text-brand-gold transition-colors mb-1">
                  {book.title}
                </h3>
                <p className="text-xs font-mono text-brand-muted uppercase tracking-wider mb-3">
                  {book.subtitle}
                </p>
                <p className="text-xs font-sans text-brand-burgundy/80 dark:text-white/80 line-clamp-3 leading-relaxed mb-6">
                  {book.blurb}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-brand-burgundy/10 dark:border-white/10 flex flex-col gap-2">
                {onSelectBookExcerpt && (
                  <button
                    onClick={() => onSelectBookExcerpt(book)}
                    className="w-full py-2.5 rounded-xl border border-brand-burgundy/20 dark:border-white/20 bg-brand-bg/80 dark:bg-white/10 text-brand-burgundy dark:text-white hover:bg-brand-burgundy hover:text-white text-xs font-mono tracking-widest uppercase transition-all flex items-center justify-center gap-2"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-brand-gold" />
                    <span>Read Sample</span>
                  </button>
                )}

                <a
                  href={book.buyLinks[0]?.url || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-xl bg-brand-burgundy hover:bg-brand-burgundy/90 text-white text-xs font-mono tracking-widest uppercase transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  <ShoppingBag className="w-3.5 h-3.5 text-brand-gold" />
                  <span>Buy Book</span>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
