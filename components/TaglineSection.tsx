'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

export const TaglineSection: React.FC = () => {
  return (
    <section className="py-24 px-6 md:px-12 bg-brand-burgundy text-white relative overflow-hidden">
      {/* Background Graphic Watermark */}
      <div className="absolute -top-12 -left-12 opacity-5 pointer-events-none select-none text-white">
        <Quote className="w-96 h-96" />
      </div>

      <div className="max-w-5xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="text-xs font-mono tracking-[0.3em] text-brand-gold uppercase block mb-6">
            THE PHILOSOPHY
          </span>

          <blockquote className="text-3xl sm:text-5xl md:text-6xl font-serif font-normal leading-snug sm:leading-tight text-white/95 tracking-tight italic">
            &ldquo;In an age that demands instant outrage, the most radical performance is finding the punchline that helps us remember our shared humanity.&rdquo;
          </blockquote>

          <div className="mt-8 flex items-center justify-center gap-3 text-xs font-mono text-brand-gold/80 tracking-widest uppercase">
            <span className="w-8 h-px bg-brand-gold/40" />
            <span>JULIAN VANCE • KEYNOTE ADDRESS AT THE BFI LONDON</span>
            <span className="w-8 h-px bg-brand-gold/40" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
