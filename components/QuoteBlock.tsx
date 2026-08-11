'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Quote, Sparkles } from 'lucide-react';

export const QuoteBlock: React.FC = () => {
  return (
    <section className="py-24 px-6 md:px-12 bg-brand-dark text-white relative overflow-hidden">
      {/* Decorative Oversized Quotation Mark Graphic */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10 text-brand-gold pointer-events-none select-none">
        <Quote className="w-[450px] h-[450px]" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-gold/15 text-brand-gold text-[10px] font-mono tracking-widest uppercase mb-8 border border-brand-gold/30">
            <Sparkles className="w-3 h-3 text-brand-gold" />
            <span>FEATURED CRITICAL PRAISE</span>
          </div>

          <blockquote className="text-3xl sm:text-4xl md:text-5xl font-serif leading-snug sm:leading-relaxed text-white/95 tracking-tight mb-8 italic">
            &ldquo;Vance is that rare breed of comedian-philosopher whose punchlines cut like scalpels and leave you contemplating the human condition long after the curtain falls.&rdquo;
          </blockquote>

          <div className="flex flex-col items-center justify-center gap-2">
            <span className="text-sm font-mono tracking-widest text-brand-gold font-bold uppercase">
              THE NEW YORK TIMES BOOK REVIEW
            </span>
            <span className="text-xs font-mono text-white/60">
              COVER FEATURE • EDITORS&apos; CHOICE 2025
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
