'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Star, Sparkles, ArrowRight } from 'lucide-react';

const MERCH_ITEMS = [
  {
    id: "item-01",
    title: "Echoes of Midnight — Deluxe Signed Hardcover",
    price: "$45.00",
    category: "Signed Books",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=800&auto=format&fit=crop",
    badge: "LIMITED EDITION",
    desc: "Hand-signed by Julian Vance with custom embossed gold foil stamp and ribbon bookmark."
  },
  {
    id: "item-02",
    title: "The Noise & The Whispers Tour Hoodie",
    price: "$65.00",
    category: "Apparel",
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=800&auto=format&fit=crop",
    badge: "TOUR MERCH",
    desc: "Heavyweight 100% organic French terry cotton with embroidered tour logo on back."
  },
  {
    id: "item-03",
    title: "Anatomy of a Rumor — Official Studio Ceramic Mug",
    price: "$24.00",
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=800&auto=format&fit=crop",
    badge: "BESTSELLER",
    desc: "Matte black ceramic 14oz mug featuring Julian's favorite podcast quote in gold lettering."
  },
  {
    id: "item-04",
    title: "Echoes of Midnight — Special Vinyl Edition",
    price: "$38.00",
    category: "Vinyl & Audio",
    image: "https://images.unsplash.com/photo-1539375665275-f9de415ef9ac?q=80&w=800&auto=format&fit=crop",
    badge: "COLLECTOR VINYL",
    desc: "Double vinyl pressing of Julian's live stand-up special with gatefold sleeve and liner notes."
  }
];

export default function StorePage() {
  return (
    <div className="pt-32 pb-24 px-6 md:px-12 bg-brand-bg dark:bg-brand-dark min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 border-b border-brand-burgundy/15 dark:border-white/15 pb-8">
          <div className="flex items-center gap-2 text-xs font-mono tracking-[0.25em] text-brand-gold uppercase mb-2">
            <ShoppingBag className="w-4 h-4" />
            <span>OFFICIAL MERCHANDISE &amp; EXCLUSIVES</span>
          </div>
          <h1 className="text-5xl sm:text-7xl font-serif font-black text-brand-burgundy dark:text-white tracking-tight mb-4">
            Official Store
          </h1>
          <p className="text-base sm:text-lg font-sans text-brand-burgundy/80 dark:text-white/80 max-w-2xl leading-relaxed">
            Shop signed first editions, official tour hoodies, vinyl pressings, and exclusive collectibles.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {MERCH_ITEMS.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: idx * 0.08 }}
              className="group flex flex-col justify-between rounded-2xl bg-brand-card dark:bg-white/5 border border-brand-burgundy/10 dark:border-white/10 p-6 hover:border-brand-gold transition-all duration-300 shadow-sm hover:shadow-xl"
            >
              <div>
                <div className="relative aspect-square rounded-xl overflow-hidden mb-6 bg-black">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-brand-burgundy text-brand-gold font-mono text-[10px] font-bold tracking-widest uppercase shadow-md">
                    {item.badge}
                  </span>
                </div>

                <span className="text-[10px] font-mono text-brand-muted uppercase tracking-widest block mb-1">
                  {item.category}
                </span>

                <h3 className="text-lg font-serif font-bold text-brand-burgundy dark:text-white group-hover:text-brand-gold transition-colors mb-2">
                  {item.title}
                </h3>

                <p className="text-xs font-sans text-brand-burgundy/80 dark:text-white/80 line-clamp-2 leading-relaxed mb-4">
                  {item.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-brand-burgundy/10 dark:border-white/10 flex items-center justify-between">
                <span className="text-lg font-serif font-bold text-brand-burgundy dark:text-white">
                  {item.price}
                </span>

                <button
                  onClick={() => alert(`Added "${item.title}" to cart!`)}
                  className="px-4 py-2 rounded-full bg-brand-burgundy hover:bg-brand-burgundy/90 text-white font-mono text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-sm"
                >
                  <ShoppingBag className="w-3.5 h-3.5 text-brand-gold" />
                  <span>Buy Now</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
