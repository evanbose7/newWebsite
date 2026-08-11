'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUp, Youtube, Podcast, Instagram, Twitter, Mail, Sparkles } from 'lucide-react';
import { siteConfig } from '../data/site';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#12040B] text-white pt-20 pb-12 px-6 md:px-12 border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto">
        {/* Top Newsletter & Dispatch Sign Up */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-brand-burgundy to-[#250817] border border-white/15 mb-16 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="max-w-xl">
            <span className="text-xs font-mono tracking-[0.25em] text-brand-gold uppercase block mb-2">
              THE WEEKLY DISPATCH
            </span>
            <h3 className="text-2xl sm:text-4xl font-serif font-bold text-white mb-3">
              Subscribe to Julian Vance&apos;s Gazette
            </h3>
            <p className="text-xs sm:text-sm font-sans text-white/80 leading-relaxed">
              Unfiltered essays, tour announcements, exclusive presale codes, and early audio previews delivered every Sunday morning. No spam, ever.
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("Thank you for subscribing to Julian Vance's Weekly Dispatch!");
            }}
            className="w-full lg:w-auto flex flex-col sm:flex-row gap-3 min-w-[320px]"
          >
            <input
              type="email"
              required
              placeholder="Enter your email address..."
              className="px-5 py-3.5 rounded-full bg-black/50 border border-white/20 text-white placeholder-white/40 text-xs font-mono focus:outline-none focus:border-brand-gold flex-1 min-w-[240px]"
            />
            <button
              type="submit"
              className="px-6 py-3.5 rounded-full bg-brand-gold hover:bg-brand-goldLight text-black font-mono text-xs font-bold uppercase tracking-widest transition-all shadow-lg flex-shrink-0"
            >
              SUBSCRIBE
            </button>
          </form>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          {/* Brand Info */}
          <div className="md:col-span-5">
            <Link href="/" className="inline-block mb-4">
              <span className="font-serif text-2xl font-black tracking-widest text-white block">
                JULIAN VANCE
              </span>
              <span className="text-[10px] font-mono tracking-[0.25em] text-brand-gold uppercase block">
                AUTHOR • COMEDIAN • PODCASTER
              </span>
            </Link>
            <p className="text-xs font-sans text-white/70 leading-relaxed max-w-sm mb-6">
              {siteConfig.tagline}
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {siteConfig.socials.map((social) => (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Follow Julian Vance on ${social.platform}`}
                  className="w-10 h-10 rounded-full border border-white/20 bg-white/5 hover:bg-brand-gold hover:text-black hover:border-brand-gold transition-all duration-300 flex items-center justify-center text-white/80"
                >
                  <span className="text-xs font-mono font-bold">{social.platform.substring(0, 2)}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Navigation Repeat */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-mono text-brand-gold tracking-[0.2em] uppercase mb-4">
              NAVIGATION
            </h4>
            <ul className="space-y-2.5 text-xs font-mono tracking-wider text-white/80">
              <li>
                <Link href="/" className="hover:text-brand-gold transition-colors">HOME</Link>
              </li>
              <li>
                <Link href="/shows" className="hover:text-brand-gold transition-colors">SHOWS & TOUR DATES</Link>
              </li>
              <li>
                <Link href="/watch-listen" className="hover:text-brand-gold transition-colors">WATCH & LISTEN</Link>
              </li>
              <li>
                <Link href="/books" className="hover:text-brand-gold transition-colors">BOOKS & PUBLICATIONS</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-brand-gold transition-colors">BIOGRAPHY & PRESS</Link>
              </li>
              <li>
                <Link href="/store" className="hover:text-brand-gold transition-colors">OFFICIAL STORE</Link>
              </li>
            </ul>
          </div>

          {/* Management & Inquiries */}
          <div className="md:col-span-4">
            <h4 className="text-xs font-mono text-brand-gold tracking-[0.2em] uppercase mb-4">
              REPRESENTATION & CONTACT
            </h4>
            <div className="space-y-3 text-xs font-mono text-white/70">
              <div>
                <span className="text-[10px] text-white/40 block">GENERAL ENQUIRIES</span>
                <a href={`mailto:${siteConfig.contactEmail}`} className="text-white hover:text-brand-gold transition-colors">
                  {siteConfig.contactEmail}
                </a>
              </div>
              <div>
                <span className="text-[10px] text-white/40 block">PRESS & MEDIA</span>
                <a href={`mailto:${siteConfig.pressEmail}`} className="text-white hover:text-brand-gold transition-colors">
                  {siteConfig.pressEmail}
                </a>
              </div>
              <div>
                <span className="text-[10px] text-white/40 block">TOUR BOOKINGS & MANAGEMENT</span>
                <a href={`mailto:${siteConfig.bookingEmail}`} className="text-white hover:text-brand-gold transition-colors">
                  {siteConfig.bookingEmail}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-white/50">
          <div className="flex flex-wrap items-center gap-4">
            <span>© {new Date().getFullYear()} JULIAN VANCE. ALL RIGHTS RESERVED.</span>
            <span>•</span>
            <Link href="/legal/privacy-policy" className="hover:text-brand-gold transition-colors">
              PRIVACY POLICY
            </Link>
          </div>

          <div className="flex items-center gap-6">
            <span className="text-white/40">
              SITE CREATED BY <span className="text-brand-gold font-bold">ANTIGRAVITY EDITORIAL STUDIO</span>
            </span>

            <button
              onClick={scrollToTop}
              aria-label="Back to top of page"
              className="p-2.5 rounded-full border border-white/20 bg-white/5 hover:bg-brand-gold hover:text-black hover:border-brand-gold transition-all"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
