'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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

  // Lock body scroll on phone for clean tap interaction
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'unset';
      document.documentElement.style.overflow = 'unset';
    };
  }, []);

  const currentWords = sentenceIdx < SEQUENCE_WORDS.length ? SEQUENCE_WORDS[sentenceIdx] : SEQUENCE_WORDS[SEQUENCE_WORDS.length - 1];

  const triggerNextSentence = (nextIdx: number) => {
    if (revealTimerRef.current) clearInterval(revealTimerRef.current);

    // After final sentence ("Don't just skim past this question."), trigger smooth expanding aura transition
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
      className="relative w-full h-[100dvh] overflow-hidden bg-[#0a080c] select-none touch-none flex items-center justify-center p-5 cursor-pointer"
    >
      {/* EXPANDING CENTRAL CIRCULAR INDIGO & BLUE AURA DOT (SMOOTH & SLOW 3.4S TRANSITION) */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: isStatementScreen ? 7.5 : 0,
          opacity: isStatementScreen ? 1 : 0,
        }}
        transition={{
          duration: 3.4,
          ease: [0.25, 0.1, 0.25, 1.0],
        }}
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full pointer-events-none z-0 bg-[radial-gradient(circle_at_center,_#EC4899_0%,_#8B5CF6_25%,_#3B82F6_50%,_#1E1B4B_82%,_#0d0d2e_100%)] shadow-[0_0_120px_rgba(236,72,153,0.8)] transform-gpu"
      />

      {/* Dynamic Ambient Indigo & Violet Depth Layer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isStatementScreen ? 1 : 0 }}
        transition={{ duration: 3.4, ease: 'easeInOut' }}
        className="fixed inset-0 w-full h-full pointer-events-none z-0 bg-gradient-to-b from-[#1E1035] via-[#1E1B4B] to-[#0d0d2e] transform-gpu"
      />

      {/* PHASE 1: QUESTION SENTENCES WORD-BY-WORD TAP REVEAL */}
      {!isStatementScreen && (
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
      )}

      {/* TAP INSTRUCTION PROMPT */}
      {!isStatementScreen && (
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
      )}

      {/* PHASE 2: BRIGHT VIBRANT STATISTICAL OBSERVATION FOLD */}
      {isStatementScreen && (
        <section className="relative z-20 w-full h-[100dvh] flex items-center justify-center p-5 overflow-hidden">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 25 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 max-w-md mx-auto text-center flex flex-col items-center justify-center gap-5 transform-gpu"
          >
            <motion.div
              animate={{ y: [-6, 6, -6] }}
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
        </section>
      )}
    </div>
  );
};
