'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, ArrowLeft } from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <div className="pt-32 pb-24 px-6 md:px-12 bg-brand-bg dark:bg-brand-dark min-h-screen">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-brand-gold hover:text-brand-burgundy transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>RETURN TO HOME</span>
        </Link>

        <div className="mb-12 border-b border-brand-burgundy/15 dark:border-white/15 pb-8">
          <div className="flex items-center gap-2 text-xs font-mono tracking-[0.25em] text-brand-gold uppercase mb-2">
            <ShieldCheck className="w-4 h-4" />
            <span>LEGAL &amp; PRIVACY DISCLOSURES</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-serif font-bold text-brand-burgundy dark:text-white tracking-tight mb-4">
            Privacy Policy
          </h1>
          <p className="text-xs font-mono text-brand-muted uppercase">
            LAST UPDATED: AUGUST 2026 • JULIAN VANCE ENTERPRISES
          </p>
        </div>

        <div className="prose dark:prose-invert max-w-none space-y-6 text-sm sm:text-base font-sans text-brand-burgundy/80 dark:text-white/80 leading-relaxed">
          <h2 className="text-xl font-serif font-bold text-brand-burgundy dark:text-white">
            1. Information We Collect
          </h2>
          <p>
            When you visit JulianVance.com, subscribe to our weekly dispatch, or purchase tour tickets and merchandise, we collect personal information that you voluntarily provide (such as your name, email address, mailing address, and payment information).
          </p>

          <h2 className="text-xl font-serif font-bold text-brand-burgundy dark:text-white">
            2. How We Use Your Information
          </h2>
          <p>
            We use your personal data strictly to fulfill newsletter subscriptions, process ticket requests, deliver merchandise orders, and send occasional announcements regarding tour dates and new book releases. We do not sell or rent your personal data to third parties.
          </p>

          <h2 className="text-xl font-serif font-bold text-brand-burgundy dark:text-white">
            3. Cookies &amp; Analytics
          </h2>
          <p>
            Our website uses minimal privacy-respecting analytics cookies to measure page traffic and site performance. You may disable cookies in your browser settings at any time without affecting your ability to use the site.
          </p>

          <h2 className="text-xl font-serif font-bold text-brand-burgundy dark:text-white">
            4. Contact Us
          </h2>
          <p>
            If you have any questions regarding this Privacy Policy or wish to request data deletion, please contact us at <a href="mailto:privacy@julianvance.com" className="text-brand-gold underline">privacy@julianvance.com</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
