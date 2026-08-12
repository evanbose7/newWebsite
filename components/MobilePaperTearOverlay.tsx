'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, MotionValue } from 'framer-motion';

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

// Single replacement words sequence for scroll
const REPLACE_WORDS = ['I', 'BRIDGE', 'THE', 'GAP', 'BETWEEN', 'IDEAS', '&', 'EXECUTION.'];

// Display component showing only 1 single white word at the EXACT CENTER of the pinned black background
const SingleWordScrollDisplay: React.FC<{ wordIdxValue: MotionValue<number> }> = ({ wordIdxValue }) => {
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    const unsubscribe = wordIdxValue.on('change', (latest) => {
      const idx = Math.min(REPLACE_WORDS.length - 1, Math.max(0, Math.floor(latest)));
      setCurrentIdx(idx);
    });
    const initialIdx = Math.min(REPLACE_WORDS.length - 1, Math.max(0, Math.floor(wordIdxValue.get())));
    setCurrentIdx(initialIdx);
    return () => unsubscribe();
  }, [wordIdxValue]);

  return (
    <div className="sticky top-0 left-0 w-full h-[100dvh] flex items-center justify-center bg-black text-center overflow-hidden z-30 pointer-events-none">
      <AnimatePresence mode="wait">
        <motion.h2
          key={currentIdx}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.08 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-playfair text-4xl sm:text-5xl font-black tracking-tight text-white select-none uppercase drop-shadow-md z-40"
        >
          {REPLACE_WORDS[currentIdx]}
        </motion.h2>
      </AnimatePresence>
    </div>
  );
};

export const MobilePaperTearOverlay: React.FC = () => {
  const bridgeSectionRef = useRef<HTMLDivElement>(null);

  const [sentenceIdx, setSentenceIdx] = useState(0);
  const [visibleCount, setVisibleCount] = useState(1);
  const [isRevealing, setIsRevealing] = useState(false);

  // Flow stages for phone: 'question' | 'statement' | 'portrait'
  const [flowStage, setFlowStage] = useState<'question' | 'statement' | 'portrait'>('question');

  const revealTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Unlock window scroll when reaching Hero Portrait stage
  useEffect(() => {
    if (flowStage === 'portrait') {
      document.body.style.overflowY = 'auto';
      document.body.style.touchAction = 'pan-y';
      document.documentElement.style.overflowY = 'auto';
    } else {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
      document.documentElement.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = 'auto';
      document.body.style.touchAction = 'auto';
      document.documentElement.style.overflow = 'auto';
    };
  }, [flowStage]);

  // Track scroll progress for pinned black section
  const { scrollYProgress: bridgeScrollProgress } = useScroll({
    target: bridgeSectionRef,
    offset: ['start start', 'end end'],
  });

  // Map scroll progress (0.05 -> 0.95) to active word index (0 -> 7)
  const wordIdxValue = useTransform(bridgeScrollProgress, [0.05, 0.95], [0, REPLACE_WORDS.length - 0.01]);

  const currentWords = sentenceIdx < SEQUENCE_WORDS.length ? SEQUENCE_WORDS[sentenceIdx] : SEQUENCE_WORDS[SEQUENCE_WORDS.length - 1];

  const triggerNextSentence = (nextIdx: number) => {
    if (revealTimerRef.current) clearInterval(revealTimerRef.current);

    // After final sentence ("Don't just skim past this question."), transition to statement screen
    if (nextIdx >= SEQUENCE_WORDS.length) {
      setFlowStage('statement');
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
    if (isRevealing) return;

    if (flowStage === 'question') {
      triggerNextSentence(sentenceIdx + 1);
    } else if (flowStage === 'statement') {
      setFlowStage('portrait');
    }
  };

  return (
    <div
      onClick={flowStage !== 'portrait' ? handleTap : undefined}
      className={`relative w-full ${
        flowStage === 'portrait'
          ? 'min-h-[500vh] bg-[#000000] touch-pan-y'
          : 'h-[100dvh] overflow-hidden bg-[#0a080c] touch-none'
      } select-none flex flex-col items-center justify-start cursor-pointer`}
    >
      {/* HARDWARE ACCELERATED 60FPS EXPANDING INDIGO & BLUE AURA DOT FOR PHONE */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: flowStage !== 'question' ? 3.0 : 0,
          opacity: flowStage !== 'question' ? 1 : 0,
        }}
        transition={{
          duration: 2.2,
          ease: [0.16, 1, 0.3, 1],
        }}
        style={{ willChange: 'transform, opacity' }}
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vw] max-w-[500px] max-h-[500px] rounded-full pointer-events-none z-0 bg-[radial-gradient(circle_at_center,_#EC4899_0%,_#8B5CF6_30%,_#3B82F6_55%,_#1E1B4B_80%,_#0d0d2e_100%)] transform-gpu translate-z-0"
      />

      {/* Dynamic Ambient Indigo & Violet Depth Layer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: flowStage !== 'question' ? 1 : 0 }}
        transition={{ duration: 2.2, ease: 'easeInOut' }}
        style={{ willChange: 'opacity' }}
        className="fixed inset-0 w-full h-full pointer-events-none z-0 bg-gradient-to-b from-[#1E1035] via-[#1E1B4B] to-[#0d0d2e] transform-gpu"
      />

      {/* STAGE 1: QUESTION SENTENCES WORD-BY-WORD TAP REVEAL */}
      {flowStage === 'question' && (
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

      {/* STAGE 2: BRIGHT VIBRANT STATISTICAL OBSERVATION FOLD */}
      <AnimatePresence mode="wait">
        {flowStage === 'statement' && (
          <motion.section
            key="statement-screen"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-20 w-full h-[100dvh] flex flex-col items-center justify-center p-5 overflow-hidden bg-transparent"
          >
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 max-w-md mx-auto text-center flex flex-col items-center justify-center gap-5 transform-gpu"
            >
              <div className="flex flex-col items-center justify-center gap-5">
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
              </div>
            </motion.div>

            {/* ELEGANT TAP PROMPT TO DISSOLVE INTO HERO PORTRAIT */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="absolute bottom-8 left-0 right-0 text-center pointer-events-auto flex flex-col items-center justify-center gap-2 z-30"
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setFlowStage('portrait');
                }}
                className="btn-gradient relative inline-flex items-center justify-center whitespace-nowrap rounded-full px-6 py-3 text-[11px] font-bold uppercase tracking-widest text-white shadow-[0_4px_25px_rgba(233,30,140,0.6)] animate-pulse"
              >
                Explore Portrait &rarr;
              </button>
            </motion.div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* STAGE 3: HERO POLAROID PORTRAIT + PINNED SOLID BLACK WORD REPLACEMENT */}
      {flowStage === 'portrait' && (
        <>
          {/* HERO POLAROID PORTRAIT CARD */}
          <motion.section
            key="portrait-screen"
            initial={{ opacity: 0, scale: 0.92, y: 25 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-20 w-full min-h-[100dvh] px-5 py-8 flex flex-col items-center justify-center overflow-hidden bg-transparent"
          >
            <div className="w-full max-w-sm flex flex-col items-center justify-center gap-6 relative z-10 transform-gpu">
              {/* Top: Floating Hero Polaroid Portrait Frame */}
              <div className="flex flex-col items-center justify-center">
                <motion.div
                  animate={{
                    y: [-5, 5, -5],
                    rotate: [2, 3.5, 2],
                  }}
                  transition={{
                    duration: 4.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="relative w-[min(72vw,255px)] my-1 cursor-pointer select-none transform-gpu will-change-transform"
                >
                  {/* Polaroid Radial Glow */}
                  <div className="pointer-events-none absolute inset-0 m-auto h-[85%] w-[85%] rounded-full blur-2xl bg-gradient-to-r from-[#FFB3CB]/40 via-[#E91E8C]/30 to-transparent" />

                  {/* White Polaroid Card */}
                  <div className="relative bg-white p-2.5 shadow-2xl shadow-black/80 rounded-sm transform-gpu">
                    <div className="relative overflow-hidden aspect-[2/3] bg-[#F5F0EB]">
                      <img
                        src="/assets/kamna-portrait.jpg"
                        alt="Arnav — Content Strategist"
                        className="w-full h-full object-cover object-center select-none"
                      />
                    </div>

                    {/* Handwritten Polaroid Caption */}
                    <p className="text-center text-[#0A0A0A]/85 font-caveat text-base pt-1.5 pb-0.5 tracking-wide font-semibold">
                      @ariimakesflims
                    </p>
                  </div>

                  {/* --- HANDWRITTEN POPUP STICKERS FROM KAMNA-PORTFOLIO --- */}

                  {/* 1. Sticker Top-Left: "21 years old" */}
                  <motion.div
                    initial={{ scale: 0, opacity: 0, rotate: -15 }}
                    animate={{ scale: 1, opacity: 1, rotate: -6 }}
                    transition={{ delay: 0.3, duration: 0.5, ease: 'backOut' }}
                    className="pointer-events-none absolute -top-3.5 -left-3 z-30"
                  >
                    <div className="bg-[#FFB3CB] text-[#0A0A0A] font-caveat text-[11px] font-bold px-2 py-0.5 shadow-[3px_4px_0_rgba(0,0,0,0.35)] whitespace-nowrap">
                      21 years old
                    </div>
                  </motion.div>

                  {/* 2. Sticker Top-Right: "social media strategist" */}
                  <motion.div
                    initial={{ scale: 0, opacity: 0, rotate: 15 }}
                    animate={{ scale: 1, opacity: 1, rotate: 6 }}
                    transition={{ delay: 0.45, duration: 0.5, ease: 'backOut' }}
                    className="pointer-events-none absolute -top-3.5 -right-3 z-30"
                  >
                    <div className="bg-[#E91E8C] text-[#F5F0EB] font-caveat text-[11px] font-bold px-2 py-0.5 shadow-[3px_4px_0_rgba(0,0,0,0.35)] whitespace-nowrap">
                      social media strategist
                    </div>
                  </motion.div>

                  {/* 3. Sticker Middle-Left: "ghostwriter" */}
                  <motion.div
                    initial={{ scale: 0, opacity: 0, rotate: -25 }}
                    animate={{ scale: 1, opacity: 1, rotate: -12 }}
                    transition={{ delay: 0.6, duration: 0.5, ease: 'backOut' }}
                    className="pointer-events-none absolute top-1/2 -left-4 transform -translate-y-1/2 z-30"
                  >
                    <div className="bg-[#FFB3CB] text-[#0A0A0A] font-caveat text-[11px] font-bold px-2 py-0.5 shadow-[3px_4px_0_rgba(0,0,0,0.35)] whitespace-nowrap">
                      ghostwriter
                    </div>
                  </motion.div>

                  {/* 4. Sticker Bottom-Left: "content creator" */}
                  <motion.div
                    initial={{ scale: 0, opacity: 0, rotate: 10 }}
                    animate={{ scale: 1, opacity: 1, rotate: 3 }}
                    transition={{ delay: 0.75, duration: 0.5, ease: 'backOut' }}
                    className="pointer-events-none absolute -bottom-3.5 -left-2 z-30"
                  >
                    <div className="bg-[#FFB3CB] text-[#0A0A0A] font-caveat text-[11px] font-bold px-2 py-0.5 shadow-[3px_4px_0_rgba(0,0,0,0.35)] whitespace-nowrap">
                      content creator
                    </div>
                  </motion.div>

                  {/* 5. Sticker Bottom-Right: "storyteller" */}
                  <motion.div
                    initial={{ scale: 0, opacity: 0, rotate: -10 }}
                    animate={{ scale: 1, opacity: 1, rotate: -3 }}
                    transition={{ delay: 0.9, duration: 0.5, ease: 'backOut' }}
                    className="pointer-events-none absolute -bottom-3.5 -right-2 z-30"
                  >
                    <div className="bg-[#E91E8C] text-[#F5F0EB] font-caveat text-[11px] font-bold px-2 py-0.5 shadow-[3px_4px_0_rgba(0,0,0,0.35)] whitespace-nowrap">
                      storyteller
                    </div>
                  </motion.div>
                </motion.div>
              </div>

              {/* Bottom: Heading & Branding */}
              <div className="flex flex-col gap-3 text-center px-2">
                <h1 className="font-black uppercase leading-[1.08] tracking-tight text-[#F5F0EB] text-2xl font-playfair drop-shadow-lg">
                  Hi, I&apos;m{' '}
                  <span className="bg-gradient-to-r from-[#F5F0EB] via-[#FFB3CB] to-[#E91E8C] bg-clip-text text-transparent">
                    Arnav
                  </span>
                </h1>

                <div className="flex flex-col gap-1.5 max-w-xs mx-auto">
                  <p className="font-dmsans text-sm text-[#F5F0EB] font-light leading-relaxed">
                    Building my brand while teaching you to build yours{' '}
                    <span className="text-[#E91E8C]">⭐️</span>
                  </p>
                  <p className="font-dmsans text-[11px] text-[#F5F0EB]/70 font-light leading-relaxed">
                    Personal brand strategist, Content creator, Storyteller, and Ghostwriter.
                  </p>
                </div>
              </div>
            </div>

            {/* SCROLL DOWN CUE */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="absolute bottom-4 left-0 right-0 text-center pointer-events-none flex flex-col items-center justify-center gap-1 z-30"
            >
              <span className="font-mono-meta text-[10px] text-pink-300 uppercase tracking-[0.3em] font-bold drop-shadow">
                SCROLL DOWN
              </span>
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                className="text-pink-400 text-lg font-light drop-shadow-md"
              >
                ↓
              </motion.div>
            </motion.div>
          </motion.section>

          {/* PINNED SOLID BLACK SECTION: SINGLE-WORD SCROLL REPLACEMENT AT EXACT CENTER OF BLACK BACKGROUND */}
          <section
            ref={bridgeSectionRef}
            className="relative z-30 w-full h-[500vh] bg-black border-t border-white/10"
          >
            <SingleWordScrollDisplay wordIdxValue={wordIdxValue} />
          </section>
        </>
      )}
    </div>
  );
};
