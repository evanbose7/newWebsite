'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, ShoppingBag, Quote, ArrowRight } from 'lucide-react';
import { booksData, BookItem } from '../../data/books';
import { ExcerptModal } from '../../components/ExcerptModal';

export default function BooksPage() {
  const [selectedBook, setSelectedBook] = useState<BookItem | null>(null);

  return (
    <div className="pt-32 pb-24 px-6 md:px-12 bg-brand-bg dark:bg-brand-dark min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16 border-b border-brand-burgundy/15 dark:border-white/15 pb-8">
          <div className="flex items-center gap-2 text-xs font-mono tracking-[0.25em] text-brand-gold uppercase mb-2">
            <BookOpen className="w-4 h-4" />
            <span>BIBLIOGRAPHY &amp; ESSAY COLLECTIONS</span>
          </div>
          <h1 className="text-5xl sm:text-7xl font-serif font-black text-brand-burgundy dark:text-white tracking-tight mb-4">
            Books &amp; Works
          </h1>
          <p className="text-base sm:text-lg font-sans text-brand-burgundy/80 dark:text-white/80 max-w-2xl leading-relaxed">
            Discover Julian Vance&apos;s New York Times bestsellers, essay collections, road memoirs, and limited edition cultural dispatches.
          </p>
        </div>

        {/* Detailed Book Catalog */}
        <div className="space-y-16">
          {booksData.map((book, idx) => (
            <motion.div
              key={book.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-8 sm:p-12 rounded-3xl bg-brand-card/60 dark:bg-white/5 border border-brand-burgundy/15 dark:border-white/15 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center hover:border-brand-gold transition-all duration-300 shadow-md"
            >
              {/* Cover Column */}
              <div className="lg:col-span-4 flex flex-col items-center">
                <div className="relative aspect-[2/3] w-full max-w-xs rounded-2xl overflow-hidden shadow-2xl bg-neutral-900 border border-black/20">
                  <img
                    src={book.coverImage}
                    alt={book.title}
                    className="w-full h-full object-cover"
                  />
                  {book.isBestseller && (
                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-brand-gold text-black font-mono text-[10px] font-bold tracking-widest uppercase shadow-md">
                      #1 NYT BESTSELLER
                    </span>
                  )}
                </div>
              </div>

              {/* Info Column */}
              <div className="lg:col-span-8 flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-brand-gold uppercase mb-2">
                    <span>{book.publisher}</span>
                    <span>•</span>
                    <span>PUBLISHED {book.publishedYear}</span>
                    <span>•</span>
                    <span className="text-brand-muted">{book.format}</span>
                  </div>

                  <h2 className="text-3xl sm:text-5xl font-serif font-bold text-brand-burgundy dark:text-white mb-2">
                    {book.title}
                  </h2>
                  <h3 className="text-sm sm:text-base font-mono text-brand-muted uppercase tracking-wider mb-6">
                    {book.subtitle}
                  </h3>

                  <p className="text-base font-sans text-brand-burgundy/90 dark:text-white/90 leading-relaxed mb-6">
                    {book.blurb}
                  </p>

                  {/* Praise Quotes */}
                  <div className="p-4 rounded-xl bg-brand-bg/80 dark:bg-white/5 border-l-4 border-brand-gold mb-8">
                    <p className="text-xs sm:text-sm font-serif italic text-brand-burgundy/80 dark:text-white/80 mb-1">
                      &ldquo;{book.praiseQuotes[0].quote}&rdquo;
                    </p>
                    <span className="text-[10px] font-mono text-brand-gold uppercase tracking-widest font-bold block">
                      — {book.praiseQuotes[0].source}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center gap-4">
                  <button
                    onClick={() => setSelectedBook(book)}
                    className="px-6 py-3.5 rounded-full bg-brand-burgundy hover:bg-brand-burgundy/90 text-white font-mono text-xs uppercase tracking-widest transition-all inline-flex items-center gap-2 shadow-md hover:shadow-lg"
                  >
                    <BookOpen className="w-4 h-4 text-brand-gold" />
                    <span>Read Sample Excerpt</span>
                  </button>

                  <div className="flex flex-wrap gap-2">
                    {book.buyLinks.map((link) => (
                      <a
                        key={link.storeName}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-3 rounded-full border border-brand-burgundy/20 dark:border-white/20 hover:border-brand-gold text-brand-burgundy dark:text-white hover:bg-brand-gold hover:text-black font-mono text-xs uppercase tracking-wider transition-all inline-flex items-center gap-1.5"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>{link.storeName}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <ExcerptModal book={selectedBook} onClose={() => setSelectedBook(null)} />
    </div>
  );
}
