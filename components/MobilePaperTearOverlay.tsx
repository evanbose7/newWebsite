'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface WordItem {
  text: string;
  isEmphasized?: boolean;
}

const SEQUENCE_WORDS: WordItem[][] = [
  // Sentence 0
  [{ text: 'Hey' }],
  // Sentence 1
  [
    { text: 'What' },
    { text: 'does' },
    { text: 'your' },
    { text: 'BRAND', isEmphasized: true },
    { text: 'look' },
    { text: 'like' },
  ],
  // Sentence 2
  [{ text: 'Or' }, { text: 'sound' }, { text: 'like' }],
  // Sentence 3
  [{ text: 'No' }, { text: 'seriously!!' }],
  // Sentence 4
  [
    { text: "Don't" },
    { text: 'just' },
    { text: 'skim' },
    { text: 'past' },
    { text: 'this' },
    { text: 'question.' },
  ],
];

export const MobilePaperTearOverlay: React.FC = () => {
  const [sentenceIdx, setSentenceIdx] = useState(0);
  const [visibleCount, setVisibleCount] = useState(1);
  const [isRevealing, setIsRevealing] = useState(false);
  const [isStatementScreen, setIsStatementScreen] = useState(false);

  const revealTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Lock body scroll during word reveal phase; unlock when statement screen is active
  useEffect(() => {
    if (isStatementScreen) {
      document.body.style.overflow = 'unset';
      document.documentElement.style.overflow = 'unset';
    } else {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = 'unset';
      document.documentElement.style.overflow = 'unset';
    };
  }, [isStatementScreen]);

  const currentWords = sentenceIdx < SEQUENCE_WORDS.length ? SEQUENCE_WORDS[sentenceIdx] : SEQUENCE_WORDS[SEQUENCE_WORDS.length - 1];

  const triggerNextSentence = (nextIdx: number) => {
    if (revealTimerRef.current) clearInterval(revealTimerRef.current);

    // After final sentence ("Don't just skim past this question."), transition to statement screen
    if (nextIdx >= SEQUENCE_WORDS.length) {
      setIsStatementScreen(true);
      return;
    }

    setSentenceIdx(nextIdx);
    setVisibleCount(1);
    setIsRevealing(true);

    const targetWords = SEQUENCE_WORDS[nextIdx].length;

    if (targetWords <= 1) {
      setIsRevealing(false);
      return;
    }

    let count = 1;

    revealTimerRef.current = setInterval(() => {
      count += 1;
      setVisibleCount(count);
      if (count >= targetWords) {
        if (revealTimerRef.current) clearInterval(revealTimerRef.current);
        setIsRevealing(false);
      }
    }, 220);
  };

  const handleTap = () => {
    if (isRevealing || isStatementScreen) return;
    triggerNextSentence(sentenceIdx + 1);
  };

  return (
    <div
      onClick={handleTap}
      className={`relative w-full ${isStatementScreen ? 'min-h-[200dvh] overflow-y-auto touch-pan-y' : 'h-[100dvh] overflow-hidden touch-none'} bg-[#0a080c] select-none flex flex-col items-center justify-start cursor-pointer`}
    >
      {/* PHASE 1: QUESTION SENTENCES WORD-BY-WORD TAP REVEAL */}
      {!isStatementScreen && (
        <div className="w-full h-[100dvh] flex items-center justify-center p-5 relative overflow-hidden bg-[#0a080c]">
          <motion.div
            key={`sentence-${sentenceIdx}`}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.03 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-20 w-full max-w-md mx-auto text-center"
          >
            <h1 className="text-3xl font-bold tracking-tight text-center leading-tight flex flex-wrap items-center justify-center gap-x-3 gap-y-2 select-none font-editorial">
              {currentWords.slice(0, visibleCount).map((wordObj, i) => {
                const isEmphasized = wordObj.isEmphasized;

                return (
                  <motion.span
                    key={`sentence-${sentenceIdx}-word-${i}`}
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.18,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className={
                      isEmphasized
                        ? 'font-extrabold text-[#FF3B30] tracking-wider relative inline-block uppercase drop-shadow-[0_0_15px_rgba(255,59,48,0.6)]'
                        : 'text-white font-semibold inline-block drop-shadow-md'
                    }
                  >
                    {wordObj.text}
                  </motion.span>
                );
              })}
            </h1>
          </motion.div>

          {/* TAP INSTRUCTION PROMPT */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: [0.35, 0.85, 0.35] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute bottom-8 left-0 right-0 text-center pointer-events-none flex flex-col items-center justify-center gap-1.5 z-30"
          >
            <span className="font-mono-meta text-[10px] text-white/70 uppercase tracking-[0.35em] font-bold drop-shadow">
              TAP ANYWHERE TO CONTINUE
            </span>
            <span className="text-white/40 text-xs font-light">👆</span>
          </motion.div>
        </div>
      )}

      {/* PHASE 2: BRIGHT VIBRANT STATISTICAL OBSERVATION FOLD (CLEAN 100dvh FULL SCREEN, NO BORDER PEEKING) */}
      {isStatementScreen && (
        <section className="relative z-20 w-full h-[100dvh] min-h-[100dvh] flex flex-col items-center justify-center p-5 overflow-hidden bg-[#0a080c]">
          {/* Internal Soft Glow (Contained inside Phase 2, strictly prevents bleeding to bottom) */}
          <div className="absolute inset-0 pointer-events-none z-0 bg-[radial-gradient(circle_at_center,_rgba(236,72,153,0.18)_0%,_rgba(139,92,246,0.12)_35%,_rgba(10,8,12,1)_80%)]" />

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 max-w-md mx-auto text-center flex flex-col items-center justify-center gap-5 transform-gpu"
          >
            <motion.div
              animate={{ y: [-5, 5, -5] }}
              transition={{ duration: 5.0, repeat: Infinity, ease: 'easeInOut' }}
              className="flex flex-col items-center justify-center gap-5"
            >
              {/* Luminous Neon Pill Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#EC4899]/30 border-2 border-[#EC4899] shadow-[0_0_20px_rgba(236,72,153,0.8)] backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-[#FFD600] animate-ping" />
                <span className="font-dmsans text-[10px] uppercase tracking-[0.3em] font-black text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.9)]">
                  STATISTICAL OBSERVATION
                </span>
              </div>

              {/* 100% Solid Pure White & Neon Glowing Statement Typography */}
              <h2 className="font-playfair text-2xl font-black text-[#FFFFFF] leading-[1.28] tracking-tight drop-shadow-[0_0_25px_rgba(255,255,255,0.9)]">
                &ldquo;do you know tht{' '}
                <span className="text-[#FFD600] font-black drop-shadow-[0_0_25px_rgba(255,214,0,1)]">
                  50% people
                </span>{' '}
                are poor is india because they dont have money above the{' '}
                <span className="text-[#00F5FF] underline decoration-[#00F5FF] decoration-2 underline-offset-4 font-black drop-shadow-[0_0_25px_rgba(0,245,255,1)]">
                  poverty line
                </span>&rdquo;
              </h2>

              {/* Luminous Laser Accent Bar */}
              <div className="w-24 h-1.5 bg-gradient-to-r from-[#FF2E93] via-[#FFD600] to-[#00F5FF] rounded-full shadow-[0_0_25px_rgba(0,245,255,1)] mt-1 animate-pulse" />
            </motion.div>
          </motion.div>

          {/* SWIPE DOWN CUE */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="absolute bottom-8 left-0 right-0 text-center pointer-events-none flex flex-col items-center justify-center gap-1.5 z-30"
          >
            <span className="font-mono-meta text-[10px] text-pink-300 uppercase tracking-[0.3em] font-bold drop-shadow">
              SWIPE DOWN FOR PORTRAIT
            </span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              className="text-pink-400 text-lg font-light drop-shadow-md"
            >
              ↓
            </motion.div>
          </motion.div>
        </section>
      )}

      {/* PHASE 3: HERO POLAROID PORTRAIT SECTION (REVEALED ONLY WHEN SWIPING DOWN ON PHONE, ZERO PEEKING INTO PHASE 2) */}
      {isStatementScreen && (
        <section className="relative z-20 w-full min-h-[100dvh] px-5 py-16 flex flex-col items-center justify-center overflow-hidden bg-[#0a080c]">
          <div className="w-full max-w-sm flex flex-col items-center justify-center gap-8 relative z-10">
            {/* Top: Hero Polaroid Portrait Frame */}
            <div className="flex flex-col items-center justify-center pt-4">
              <div className="relative w-[min(76vw,270px)] my-2 cursor-pointer select-none transform-gpu rotate-2">
                {/* Polaroid Radial Glow */}
                <div className="pointer-events-none absolute inset-0 m-auto h-[85%] w-[85%] rounded-full blur-3xl bg-gradient-to-r from-[#FFB3CB]/40 via-[#E91E8C]/30 to-transparent" />

                {/* White Polaroid Card */}
                <div className="relative bg-white p-3 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85)] rounded-sm transform transition-all duration-500 ease-out hover:rotate-3 hover:scale-[1.03]">
                  <div className="relative overflow-hidden aspect-[2/3] bg-[#F5F0EB]">
                    <img
                      src="/assets/kamna-portrait.jpg"
                      alt="Arnav — Content Strategist"
                      className="w-full h-full object-cover object-center select-none"
                    />
                  </div>

                  {/* Handwritten Polaroid Caption */}
                  <p className="text-center text-[#0A0A0A]/85 font-caveat text-lg pt-2 pb-1 tracking-wide font-semibold">
                    @ariimakesflims
                  </p>
                </div>

                {/* --- HANDWRITTEN POPUP STICKERS FROM KAMNA-PORTFOLIO --- */}

                {/* 1. Sticker Top-Left: "21 years old" */}
                <div className="pointer-events-none absolute -top-4 -left-3 z-30 transform -rotate-6">
                  <div className="bg-[#FFB3CB] text-[#0A0A0A] font-caveat text-xs font-bold px-2 py-0.5 shadow-[3px_4px_0_rgba(0,0,0,0.35)] whitespace-nowrap">
                    21 years old
                  </div>
                </div>

                {/* 2. Sticker Top-Right: "social media strategist" */}
                <div className="pointer-events-none absolute -top-4 -right-3 z-30 transform rotate-6">
                  <div className="bg-[#E91E8C] text-[#F5F0EB] font-caveat text-xs font-bold px-2 py-0.5 shadow-[3px_4px_0_rgba(0,0,0,0.35)] whitespace-nowrap">
                    social media strategist
                  </div>
                </div>

                {/* 3. Sticker Middle-Left: "ghostwriter" */}
                <div className="pointer-events-none absolute top-1/2 -left-4 transform -translate-y-1/2 -rotate-12 z-30">
                  <div className="bg-[#FFB3CB] text-[#0A0A0A] font-caveat text-xs font-bold px-2 py-0.5 shadow-[3px_4px_0_rgba(0,0,0,0.35)] whitespace-nowrap">
                    ghostwriter
                  </div>
                </div>

                {/* 4. Sticker Bottom-Left: "content creator" */}
                <div className="pointer-events-none absolute -bottom-4 -left-2 z-30 transform rotate-3">
                  <div className="bg-[#FFB3CB] text-[#0A0A0A] font-caveat text-xs font-bold px-2 py-0.5 shadow-[3px_4px_0_rgba(0,0,0,0.35)] whitespace-nowrap">
                    content creator
                  </div>
                </div>

                {/* 5. Sticker Bottom-Right: "storyteller" */}
                <div className="pointer-events-none absolute -bottom-4 -right-2 z-30 transform -rotate-3">
                  <div className="bg-[#E91E8C] text-[#F5F0EB] font-caveat text-xs font-bold px-2 py-0.5 shadow-[3px_4px_0_rgba(0,0,0,0.35)] whitespace-nowrap">
                    storyteller
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom: Heading & Branding */}
            <div className="flex flex-col gap-4 text-center px-2">
              <h1 className="font-black uppercase leading-[1.08] tracking-tight text-[#F5F0EB] text-3xl font-playfair drop-shadow-lg">
                Hi, I&apos;m{' '}
                <span className="bg-gradient-to-r from-[#F5F0EB] via-[#FFB3CB] to-[#E91E8C] bg-clip-text text-transparent">
                  Arnav
                </span>
              </h1>

              <div className="flex flex-col gap-2 max-w-xs mx-auto">
                <p className="font-dmsans text-base text-[#F5F0EB] font-light leading-relaxed">
                  Building my brand while teaching you to build yours{' '}
                  <span className="text-[#E91E8C]">⭐️</span>
                </p>
                <p className="font-dmsans text-xs text-[#F5F0EB]/70 font-light leading-relaxed">
                  Personal brand strategist, Content creator, Storyteller, and Ghostwriter.
                </p>
              </div>

              {/* Action Button */}
              <div className="pt-2 flex justify-center">
                <a
                  href="#brands"
                  className="btn-gradient relative inline-flex items-center justify-center whitespace-nowrap rounded-full px-6 py-3 text-xs font-bold uppercase tracking-widest text-white transition-all duration-300 hover:scale-[1.04] shadow-[0_4px_30px_rgba(233,30,140,0.5)]"
                >
                  Explore Brands & Impact &rarr;
                </a>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
