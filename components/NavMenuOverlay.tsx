'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowUpRight, Ticket, Film, BookOpen, User, ShoppingBag } from 'lucide-react';

interface NavMenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const MENU_TILES = [
  {
    title: "Shows & Events",
    label: "2026 TOUR DATES",
    href: "/shows",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1000&auto=format&fit=crop",
    icon: Ticket,
    accent: "from-amber-600/80 to-amber-950/90",
    badge: "18 CITIES"
  },
  {
    title: "Watch & Listen",
    label: "SPECIALS & PODCASTS",
    href: "/watch-listen",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1000&auto=format&fit=crop",
    icon: Film,
    accent: "from-rose-600/80 to-rose-950/90",
    badge: "EMMY NOMINATED"
  },
  {
    title: "Books & Work",
    label: "ESSAYS & MEMOIRS",
    href: "/books",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1000&auto=format&fit=crop",
    icon: BookOpen,
    accent: "from-purple-600/80 to-purple-950/90",
    badge: "NYT BESTSELLER"
  },
  {
    title: "About Julian",
    label: "BIO & MILESTONES",
    href: "/about",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop",
    icon: User,
    accent: "from-emerald-600/80 to-emerald-950/90",
    badge: "BIOGRAPHY"
  },
  {
    title: "Official Store",
    label: "MERCH & SIGNED EDITIONS",
    href: "/store",
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=1000&auto=format&fit=crop",
    icon: ShoppingBag,
    accent: "from-blue-600/80 to-blue-950/90",
    badge: "NEW MERCH"
  }
];

export const NavMenuOverlay: React.FC<NavMenuOverlayProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="fixed inset-0 z-50 flex flex-col bg-[#12040B]/95 backdrop-blur-xl text-white overflow-y-auto"
        >
          {/* Header Inside Overlay */}
          <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-6 md:px-12 max-w-7xl w-full mx-auto border-b border-white/10 bg-[#12040B]/80 backdrop-blur-md">
            <Link
              href="/"
              onClick={onClose}
              className="text-xl md:text-2xl font-serif font-bold tracking-widest text-brand-gold hover:text-white transition-colors"
            >
              JULIAN VANCE
            </Link>

            <button
              onClick={onClose}
              aria-label="Close navigation menu"
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/5 hover:bg-white/15 transition-all text-xs font-mono tracking-widest uppercase"
            >
              <span>CLOSE</span>
              <X className="w-4 h-4 text-brand-gold" />
            </button>
          </div>

          {/* Grid of Image Tiles */}
          <div className="flex-1 max-w-7xl w-full mx-auto px-6 py-8 md:px-12 flex flex-col justify-center">
            <div className="mb-6">
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-brand-gold/80 block mb-1">
                NAVIGATION DIRECTORY
              </span>
              <h2 className="text-2xl md:text-3xl font-serif text-white/90">
                Explore Julian Vance&apos;s Universe
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {MENU_TILES.map((tile, idx) => {
                const Icon = tile.icon;
                return (
                  <motion.div
                    key={tile.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: idx * 0.06 }}
                  >
                    <Link
                      href={tile.href}
                      onClick={onClose}
                      className="group relative block h-56 sm:h-64 rounded-2xl overflow-hidden border border-white/15 bg-neutral-900 transition-all duration-500 hover:border-brand-gold/70 hover:shadow-2xl hover:shadow-brand-burgundy/50"
                    >
                      {/* Background Image with Hover Scale */}
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110"
                        style={{ backgroundImage: `url('${tile.image}')` }}
                      />

                      {/* Gradient Overlay */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-t ${tile.accent} opacity-85 group-hover:opacity-75 transition-opacity duration-300`}
                      />
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-transparent transition-colors duration-300" />

                      {/* Card Content */}
                      <div className="relative h-full p-6 flex flex-col justify-between z-10">
                        {/* Top Metadata */}
                        <div className="flex items-center justify-between">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-[10px] font-mono tracking-widest text-brand-gold uppercase">
                            <Icon className="w-3 h-3 text-brand-gold" />
                            {tile.badge}
                          </span>
                          <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:bg-brand-gold group-hover:text-black transition-all duration-300 group-hover:scale-110">
                            <ArrowUpRight className="w-4 h-4" />
                          </div>
                        </div>

                        {/* Bottom Title */}
                        <div>
                          <span className="text-[11px] font-mono text-white/70 tracking-widest uppercase block mb-1">
                            {tile.label}
                          </span>
                          <h3 className="text-xl md:text-2xl font-serif font-bold text-white group-hover:text-brand-goldLight transition-colors">
                            {tile.title}
                          </h3>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            {/* Quick Contact Line */}
            <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between text-xs text-white/60 font-mono gap-4">
              <span>MANAGEMENT & BOOKINGS: management@vancearts.com</span>
              <div className="flex gap-4">
                <Link href="/legal/privacy-policy" onClick={onClose} className="hover:text-brand-gold transition-colors">
                  PRIVACY POLICY
                </Link>
                <span>•</span>
                <span>© 2026 JULIAN VANCE</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
