'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, UserCheck, Award } from 'lucide-react';
import { siteConfig } from '../data/site';

export const AboutTeaser: React.FC = () => {
  return (
    <section className="py-24 px-6 md:px-12 bg-brand-card/40 dark:bg-white/5 border-b border-brand-subtle/60 dark:border-white/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Photo Column */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-5 relative"
        >
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-brand-burgundy/15 dark:border-white/15 shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop"
              alt="Julian Vance Editorial Portrait"
              className="w-full h-full object-cover filter contrast-[1.05]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-burgundy/60 via-transparent to-transparent" />

            {/* Badge Overlay */}
            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-black/60 backdrop-blur-md border border-white/15 text-white flex items-center gap-3">
              <Award className="w-6 h-6 text-brand-gold flex-shrink-0" />
              <div className="text-xs">
                <span className="font-mono text-brand-gold font-bold block uppercase tracking-widest text-[10px]">
                  NEW YORK TIMES BESTSELLING AUTHOR
                </span>
                <span className="font-sans text-white/90">
                  2x Primetime Emmy Nominee
                </span>
              </div>
            </div>
          </div>

          {/* Decorative Background Frame */}
          <div className="absolute -bottom-4 -right-4 w-full h-full rounded-2xl border-2 border-brand-gold/30 -z-10 pointer-events-none hidden sm:block" />
        </motion.div>

        {/* Bio Text Column */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-7 flex flex-col justify-center"
        >
          <div className="flex items-center gap-2 text-xs font-mono tracking-[0.25em] text-brand-gold uppercase mb-3">
            <UserCheck className="w-4 h-4" />
            <span>BIOGRAPHY BRIEF</span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-brand-burgundy dark:text-white tracking-tight mb-6 leading-tight">
            Bridging razor-sharp comedy with unvarnished social commentary.
          </h2>

          <p className="text-base sm:text-lg font-sans text-brand-burgundy/80 dark:text-white/80 leading-relaxed mb-6">
            {siteConfig.shortBio}
          </p>

          <p className="text-sm sm:text-base font-sans text-brand-burgundy/70 dark:text-white/70 leading-relaxed mb-8">
            From late-night sets in basement comedy clubs across Chicago and Brooklyn to hosting internationally top-charting audio dispatches, Julian Vance brings a distinct voice to the contemporary cultural landscape.
          </p>

          <div>
            <Link
              href="/about"
              className="inline-flex items-center gap-3 px-6 py-3.5 rounded-full bg-brand-burgundy hover:bg-brand-burgundy/90 text-white font-mono text-xs uppercase tracking-widest transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 group"
            >
              <span>Read Full Biography</span>
              <ArrowRight className="w-4 h-4 text-brand-gold group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
