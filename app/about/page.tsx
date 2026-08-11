'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { User, Award, Mail, Sparkles, MapPin, CheckCircle } from 'lucide-react';
import { siteConfig } from '../../data/site';

export default function AboutPage() {
  return (
    <div className="pt-32 pb-24 px-6 md:px-12 bg-brand-bg dark:bg-brand-dark min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16 border-b border-brand-burgundy/15 dark:border-white/15 pb-8">
          <div className="flex items-center gap-2 text-xs font-mono tracking-[0.25em] text-brand-gold uppercase mb-2">
            <User className="w-4 h-4" />
            <span>BIOGRAPHY &amp; CAREER HIGHLIGHTS</span>
          </div>
          <h1 className="text-5xl sm:text-7xl font-serif font-black text-brand-burgundy dark:text-white tracking-tight mb-4">
            About Julian Vance
          </h1>
          <p className="text-base sm:text-lg font-sans text-brand-burgundy/80 dark:text-white/80 max-w-2xl leading-relaxed">
            Stand-up comedian, New York Times bestselling author, and podcast host dissecting modern culture with razor-sharp satire.
          </p>
        </div>

        {/* Bio Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20 items-start">
          {/* Main Editorial Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5"
          >
            <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl border border-brand-burgundy/20 dark:border-white/20">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop"
                alt="Julian Vance Portrait"
                className="w-full h-full object-cover filter contrast-[1.05]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-burgundy/80 via-transparent to-transparent" />

              <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl bg-black/70 backdrop-blur-md border border-white/15 text-white">
                <span className="text-xs font-mono text-brand-gold uppercase block mb-1">
                  CHICAGO • BROOKLYN • LONDON
                </span>
                <p className="text-sm font-serif italic text-white/90">
                  &ldquo;Humor is the sound of truth bouncing off a velvet wall.&rdquo;
                </p>
              </div>
            </div>
          </motion.div>

          {/* Extended Bio Text */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-7 space-y-6"
          >
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-brand-burgundy dark:text-white">
              The Journey from Basement Comedy Clubs to International Stages
            </h2>

            {siteConfig.fullBio.map((paragraph, index) => (
              <p key={index} className="text-base sm:text-lg font-sans text-brand-burgundy/85 dark:text-white/85 leading-relaxed">
                {paragraph}
              </p>
            ))}

            {/* Career Accolades Grid */}
            <div className="pt-6 border-t border-brand-burgundy/15 dark:border-white/15 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-brand-card dark:bg-white/5 border border-brand-burgundy/10 dark:border-white/10">
                <Award className="w-6 h-6 text-brand-gold mb-2" />
                <h4 className="text-sm font-serif font-bold text-brand-burgundy dark:text-white">
                  2x Emmy Award Nominee
                </h4>
                <p className="text-xs font-sans text-brand-muted">
                  Outstanding Variety Special &amp; Outstanding Writing (2026)
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-brand-card dark:bg-white/5 border border-brand-burgundy/10 dark:border-white/10">
                <Sparkles className="w-6 h-6 text-brand-gold mb-2" />
                <h4 className="text-sm font-serif font-bold text-brand-burgundy dark:text-white">
                  NYT Bestselling Author
                </h4>
                <p className="text-xs font-sans text-brand-muted">
                  Echoes of Midnight &amp; The Art of Asking Why
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Representation & Contact Card */}
        <div className="p-8 sm:p-12 rounded-3xl bg-brand-burgundy text-white border border-white/15 shadow-2xl">
          <div className="max-w-3xl">
            <span className="text-xs font-mono text-brand-gold tracking-[0.25em] uppercase block mb-2">
              REPRESENTATION &amp; BOOKINGS
            </span>
            <h3 className="text-3xl sm:text-4xl font-serif font-bold text-white mb-4">
              Work with Julian Vance
            </h3>
            <p className="text-sm sm:text-base font-sans text-white/80 leading-relaxed mb-8">
              For corporate keynote speaking, international tour bookings, television writing commissions, or literary press inquiries, please contact management directly:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 font-mono text-xs">
              <div className="p-4 rounded-xl bg-white/10 border border-white/15">
                <span className="text-[10px] text-brand-gold block uppercase mb-1">GENERAL INQUIRIES</span>
                <a href={`mailto:${siteConfig.contactEmail}`} className="hover:underline text-white font-bold">
                  {siteConfig.contactEmail}
                </a>
              </div>

              <div className="p-4 rounded-xl bg-white/10 border border-white/15">
                <span className="text-[10px] text-brand-gold block uppercase mb-1">PRESS &amp; PUBLICITY</span>
                <a href={`mailto:${siteConfig.pressEmail}`} className="hover:underline text-white font-bold">
                  {siteConfig.pressEmail}
                </a>
              </div>

              <div className="p-4 rounded-xl bg-white/10 border border-white/15">
                <span className="text-[10px] text-brand-gold block uppercase mb-1">TOUR BOOKINGS</span>
                <a href={`mailto:${siteConfig.bookingEmail}`} className="hover:underline text-white font-bold">
                  {siteConfig.bookingEmail}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
