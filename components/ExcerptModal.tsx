'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, BookOpen, ShoppingBag } from 'lucide-react';
import { BookItem } from '../data/books';

interface ExcerptModalProps {
  book: BookItem | null;
  onClose: () => void;
}

export const ExcerptModal: React.FC<ExcerptModalProps> = ({ book, onClose }) => {
  if (!book) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-3xl bg-brand-bg dark:bg-brand-dark border border-brand-burgundy/20 dark:border-white/20 rounded-3xl p-6 sm:p-10 shadow-2xl overflow-hidden my-8"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            aria-label="Close book excerpt modal"
            className="absolute top-6 right-6 p-2 rounded-full bg-brand-card dark:bg-white/10 text-brand-burgundy dark:text-white hover:bg-brand-burgundy hover:text-white transition-all"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Book Header */}
          <div className="flex flex-col sm:flex-row gap-6 items-start mb-8 pb-6 border-b border-brand-burgundy/15 dark:border-white/15">
            <div className="w-24 sm:w-28 aspect-[2/3] rounded-lg overflow-hidden flex-shrink-0 shadow-md">
              <img src={book.coverImage} alt={book.title} className="w-full h-full object-cover" />
            </div>

            <div>
              <span className="text-xs font-mono text-brand-gold uppercase tracking-widest block mb-1">
                SAMPLE EXCERPT • {book.publisher} ({book.publishedYear})
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-brand-burgundy dark:text-white mb-2">
                {book.title}
              </h3>
              <p className="text-xs font-mono text-brand-muted uppercase mb-4">
                {book.subtitle}
              </p>
              <h4 className="text-sm font-serif font-bold text-brand-burgundy/90 dark:text-white/90 italic">
                {book.sampleExcerpt.chapterTitle}
              </h4>
            </div>
          </div>

          {/* Chapter Content */}
          <div className="space-y-4 font-serif text-base sm:text-lg text-brand-burgundy/90 dark:text-white/90 leading-relaxed mb-8 max-h-96 overflow-y-auto pr-4">
            {book.sampleExcerpt.content.map((paragraph, i) => (
              <p key={i} className="first-letter:text-3xl first-letter:font-bold first-letter:font-serif first-letter:text-brand-burgundy">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Buy Link Footer */}
          <div className="pt-6 border-t border-brand-burgundy/15 dark:border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <span className="text-xs font-mono text-brand-muted uppercase">
              LIKE THIS SAMPLE? ORDER FULL EDITION:
            </span>

            <div className="flex flex-wrap gap-2">
              {book.buyLinks.map((link) => (
                <a
                  key={link.storeName}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-full bg-brand-burgundy hover:bg-brand-burgundy/90 text-white text-xs font-mono tracking-wider uppercase transition-all inline-flex items-center gap-1.5"
                >
                  <ShoppingBag className="w-3 h-3 text-brand-gold" />
                  <span>{link.storeName}</span>
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
