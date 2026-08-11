'use client';

import React, { useState } from 'react';
import { Sparkles, Check, Share2, RefreshCw, ShieldCheck, Code, Layers, Zap, ChevronDown, ArrowUp } from 'lucide-react';

const ARCHETYPES = [
  { id: 'SILENCE', num: '01', title: 'THE UNMISTAKABLE SILENCE', desc: 'Whispered authority, minimal structure, immaculate detail.' },
  { id: 'ELECTRIC', num: '02', title: 'THE ELECTRIC ENERGY', desc: 'High frequency, magnetic presence, instant room focus.' },
  { id: 'BOLDNESS', num: '03', title: 'THE UNAPOLOGETIC BOLDNESS', desc: 'Heavy weight, raw confidence, loud lasting impact.' },
  { id: 'CRAFTSMANSHIP', num: '04', title: 'THE REFINED CRAFTSMANSHIP', desc: 'Tailored elegance, subtle flex, timeless structure.' },
  { id: 'FUTURISTIC', num: '05', title: 'THE FUTURISTIC EDGE', desc: 'Surreal vision, ahead of time, dark neon precision.' },
  { id: 'REBEL', num: '06', title: 'THE PLAYFUL REBEL', desc: 'Unpredictable, sharp wit, rules are strictly optional.' },
];

const FAQS = [
  {
    q: 'How does the Radial Aura scroll transition work?',
    a: 'It uses Framer Motion useScroll hook to track scroll delta after the final sentence reveal. As you scroll down, a royal pink-purple radial aura expands from scale 0 to 4.8x viewport while the hero typography floats up and dissolves away.',
  },
  {
    q: 'Is the royal pink-purple background canvas an image or video?',
    a: 'No! The royal background is rendered with hardware-accelerated CSS radial and linear gradients for 60 FPS performance across all devices.',
  },
  {
    q: 'Can users interact with all components on the royal canvas?',
    a: 'Yes! All elements are 100% real interactive HTML DOM nodes. You can select archetype cards, input custom brand descriptions, click FAQ accordions, and submit dossiers.',
  },
];

export const WebsiteContent: React.FC = () => {
  const [selectedId, setSelectedId] = useState('SILENCE');
  const [customText, setCustomText] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="w-full bg-transparent text-white font-editorial min-h-screen pt-12 pb-20 px-4 sm:px-8">
      <div className="max-w-5xl mx-auto">
        {/* SECTION 1: INTERACTIVE DOSSIER FORM (Displays immediately at top after transition) */}
        {!isSubmitted ? (
          <div className="mb-20">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-500/20 border border-rose-400/40 text-rose-300 font-mono-meta text-xs uppercase tracking-widest font-bold mb-6">
              <Sparkles className="w-3.5 h-3.5 text-rose-400" />
              <span>BRAND DISCOVERY DOSSIER</span>
            </div>

            <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif-hero text-white leading-[1.15] mb-4 drop-shadow-md">
              If your brand could walk into a room, what would people notice first?
            </h2>

            <p className="font-editorial text-sm sm:text-base text-rose-200/80 mb-8 leading-relaxed">
              Select your brand's primary presence archetype below to finalize your discovery dossier.
            </p>

            {/* Archetype Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {ARCHETYPES.map((item) => {
                const isSelected = selectedId === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedId(item.id)}
                    className={`cursor-pointer p-5 rounded-xl border-2 transition-all duration-200 shadow-lg hover:-translate-y-1 ${
                      isSelected
                        ? 'bg-gradient-to-br from-rose-900 to-red-950 text-white border-rose-400 shadow-[0_0_25px_rgba(244,63,94,0.35)]'
                        : 'bg-[#350817]/80 text-white border-rose-500/20 hover:border-rose-400/50 hover:bg-[#470B20]/80'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className={`font-mono-meta text-xs font-bold ${isSelected ? 'text-rose-300' : 'text-rose-400/60'}`}>
                        {item.num}
                      </span>
                      {isSelected && (
                        <span className="w-5 h-5 rounded-full bg-rose-500 text-white flex items-center justify-center shadow">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </span>
                      )}
                    </div>
                    <h3 className="font-serif-hero font-bold text-base sm:text-lg tracking-tight mb-1.5 text-white">
                      {item.title}
                    </h3>
                    <p className={`font-editorial text-xs leading-relaxed ${isSelected ? 'text-rose-100' : 'text-rose-200/70'}`}>
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Custom Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setIsSubmitted(true);
              }}
              className="flex flex-col gap-5 bg-[#300615]/90 p-6 rounded-2xl border border-rose-500/30 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
            >
              <div className="flex flex-col gap-2">
                <label className="font-mono-meta text-xs text-rose-300 uppercase tracking-wider font-bold">
                  OR DESCRIBE THE ENTRANCE IN YOUR OWN WORDS:
                </label>
                <input
                  type="text"
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                  placeholder="e.g. 'A quiet presence in a tailor-made coat, looking straight ahead.'"
                  className="w-full bg-[#1E010B] border border-rose-500/30 rounded-xl px-4 py-3 text-sm font-editorial text-white placeholder-rose-300/40 focus:outline-none focus:ring-2 focus:ring-rose-400 transition-all"
                />
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-editorial font-bold text-sm px-7 py-3.5 rounded-xl border border-rose-400/50 shadow-[0_0_20px_rgba(244,63,94,0.4)] hover:-translate-y-0.5 active:translate-y-0 transition-all uppercase tracking-wider flex items-center gap-2 cursor-pointer"
                >
                  <span>LOCK IN BRAND DOSSIER</span>
                  <Sparkles className="w-4 h-4 fill-current" />
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Submitted Dossier Card */
          <div className="mb-20 bg-[#350817]/90 border-2 border-rose-500/40 rounded-2xl p-6 sm:p-10 shadow-[0_0_40px_rgba(244,63,94,0.25)] relative">
            <div className="border-b border-rose-500/30 pb-4 mb-6 flex items-center justify-between">
              <span className="font-mono-meta text-xs font-bold text-rose-400 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" /> OFFICIAL BRAND ARCHETYPE
              </span>
              <span className="bg-rose-500/20 text-rose-300 text-[11px] font-mono-meta px-3 py-1 rounded-full font-bold border border-rose-500/30">
                ROYAL DOSSIER CONFIRMED
              </span>
            </div>

            <div className="mb-6">
              <span className="font-mono-meta text-xs text-rose-300/70 uppercase block mb-1">
                SELECTED BRAND VOICE:
              </span>
              <h3 className="text-3xl sm:text-5xl font-serif-hero text-white font-bold">
                {ARCHETYPES.find((a) => a.id === selectedId)?.title}
              </h3>
            </div>

            {customText && (
              <div className="mb-6 bg-[#1E010B] p-5 rounded-xl border border-rose-500/30 shadow-inner">
                <span className="font-mono-meta text-[11px] text-rose-400 block mb-1 uppercase font-bold">STATEMENT:</span>
                <p className="font-editorial text-sm sm:text-base text-rose-100 italic">"{customText}"</p>
              </div>
            )}

            <div className="flex items-center justify-between gap-4 pt-4 border-t border-rose-500/20 flex-wrap">
              <button
                onClick={() => setIsSubmitted(false)}
                className="font-mono-meta text-xs text-rose-300 hover:text-white hover:underline flex items-center gap-1.5 font-bold cursor-pointer transition-colors"
              >
                <RefreshCw className="w-4 h-4" /> EDIT SELECTION
              </button>

              <button
                onClick={() => alert('Brand dossier copied to clipboard!')}
                className="bg-gradient-to-r from-rose-600 to-red-600 text-white font-editorial font-bold text-xs px-6 py-3 rounded-xl border border-rose-400/40 shadow-[0_0_15px_rgba(244,63,94,0.3)] flex items-center gap-2 cursor-pointer hover:from-rose-500 hover:to-red-500 transition-all"
              >
                <Share2 className="w-4 h-4" /> SHARE DOSSIER
              </button>
            </div>
          </div>
        )}

        {/* SECTION 2: TECHNICAL FEATURES SHOWCASE GRID */}
        <div className="mb-20">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-400 animate-pulse" />
            <span className="font-mono-meta text-xs font-bold text-rose-300 uppercase tracking-widest">
              ROYAL TRANSITION TECH SPECS
            </span>
          </div>

          <h3 className="text-3xl sm:text-4xl font-serif-hero text-white font-bold mb-8">
            How The Radial Aura Expansion Is Built
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="bg-[#300615]/90 p-6 rounded-2xl border border-rose-500/30 shadow-[0_10px_25px_rgba(0,0,0,0.4)] hover:border-rose-400/60 transition-all">
              <div className="w-10 h-10 rounded-xl bg-rose-500/20 border border-rose-400 flex items-center justify-center mb-4 text-rose-300">
                <Code className="w-5 h-5" />
              </div>
              <h4 className="font-serif-hero text-lg font-bold text-white mb-2">
                Radial Aura Expansion
              </h4>
              <p className="font-editorial text-xs sm:text-sm text-rose-200/70 leading-relaxed">
                <code className="text-rose-300 font-mono-meta">useScroll</code> drives an expanding radial gradient layer from scale 0 to 4.8x viewport, washing the screen in rich royal magenta and deep red.
              </p>
            </div>

            <div className="bg-[#300615]/90 p-6 rounded-2xl border border-rose-500/30 shadow-[0_10px_25px_rgba(0,0,0,0.4)] hover:border-rose-400/60 transition-all">
              <div className="w-10 h-10 rounded-xl bg-rose-900/40 border border-rose-400/40 flex items-center justify-center mb-4 text-rose-300">
                <Layers className="w-5 h-5" />
              </div>
              <h4 className="font-serif-hero text-lg font-bold text-white mb-2">
                Parallax Text Dissolve
              </h4>
              <p className="font-editorial text-xs sm:text-sm text-rose-200/70 leading-relaxed">
                As scrolling begins, the final sentence *"Don't just skim past this question."* gently floats upward (<code className="text-rose-300 font-mono-meta">y: -60px</code>), scales up slightly, and smoothly dissolves away.
              </p>
            </div>

            <div className="bg-[#300615]/90 p-6 rounded-2xl border border-rose-500/30 shadow-[0_10px_25px_rgba(0,0,0,0.4)] hover:border-rose-400/60 transition-all">
              <div className="w-10 h-10 rounded-xl bg-rose-900/40 border border-rose-400/40 flex items-center justify-center mb-4 text-amber-300">
                <Zap className="w-5 h-5" />
              </div>
              <h4 className="font-serif-hero text-lg font-bold text-white mb-2">
                60 FPS Hardware Acceleration
              </h4>
              <p className="font-editorial text-xs sm:text-sm text-rose-200/70 leading-relaxed">
                Smooth CSS transform matrices and GPU composite layers ensure buttery smooth 60 FPS performance without drop frames.
              </p>
            </div>

            <div className="bg-[#300615]/90 p-6 rounded-2xl border border-rose-500/30 shadow-[0_10px_25px_rgba(0,0,0,0.4)] hover:border-rose-400/60 transition-all">
              <div className="w-10 h-10 rounded-xl bg-rose-950/60 border border-rose-400/40 flex items-center justify-center mb-4 text-rose-300">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="font-serif-hero text-lg font-bold text-white mb-2">
                Interactive Royal Canvas
              </h4>
              <p className="font-editorial text-xs sm:text-sm text-rose-200/70 leading-relaxed">
                The revealed canvas features live interactive form inputs, selectable archetype cards, and responsive FAQ accordions.
              </p>
            </div>
          </div>
        </div>

        {/* SECTION 3: FREQUENTLY ASKED QUESTIONS */}
        <div className="mb-20">
          <h3 className="text-3xl sm:text-4xl font-serif-hero text-white font-bold mb-6">
            Frequently Asked Questions
          </h3>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="bg-[#300615]/80 border border-rose-500/30 rounded-xl p-5 cursor-pointer shadow-lg transition-all hover:bg-[#420A1E]/90 hover:border-rose-400/60"
                >
                  <div className="flex items-center justify-between gap-4">
                    <h4 className="font-serif-hero text-base sm:text-lg font-bold text-white">
                      {faq.q}
                    </h4>
                    <ChevronDown
                      className={`w-5 h-5 text-rose-400 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </div>
                  {isOpen && (
                    <p className="font-editorial text-xs sm:text-sm text-rose-200/80 mt-3 pt-3 border-t border-rose-500/20 leading-relaxed">
                      {faq.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* FOOTER */}
        <footer className="pt-10 border-t border-rose-500/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono-meta text-rose-300/70">
          <div>
            © {new Date().getFullYear()} Royal Radial Aura Transition.
          </div>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-1.5 font-bold text-rose-300 hover:text-white transition-colors cursor-pointer"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5 text-rose-400" />
          </button>
        </footer>
      </div>
    </div>
  );
};
