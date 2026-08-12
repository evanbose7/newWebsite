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
  const isFinalSentence = sentenceIdx === SEQUENCE_WORDS.length - 1;

  const triggerNextSentence = (nextIdx: number) => {
    if (revealTimerRef.current) clearInterval(revealTimerRef.current);

    // Stop after final sentence ("Don't just skim past this question.")
    if (nextIdx >= SEQUENCE_WORDS.length) {
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
    if (isRevealing || isFinalSentence) return;
    triggerNextSentence(sentenceIdx + 1);
  };

  return (
    <div
      onClick={handleTap}
      className="relative w-full h-[100dvh] overflow-hidden bg-[#0a080c] select-none touch-none flex items-center justify-center p-5 cursor-pointer"
    >
      {/* Dynamic Ambient Background Aura */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full pointer-events-none z-0 bg-[radial-gradient(circle_at_center,_#EC4899_0%,_#8B5CF6_30%,_#1E1B4B_75%,_#0a080c_100%)] opacity-25 blur-3xl transform-gpu" />

      <motion.div
        key={`sentence-${sentenceIdx}`}
        initial={{ opacity: 1 }}
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

      {/* TAP INSTRUCTION CUE (HIDDEN ON FINAL SENTENCE) */}
      {!isFinalSentence && (
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
    </div>
  );
};
