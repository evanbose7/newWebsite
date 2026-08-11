'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

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

export const ScrollPaperTearOverlay: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [sentenceIdx, setSentenceIdx] = useState(0);
  const [visibleCount, setVisibleCount] = useState(1);
  const [isRevealing, setIsRevealing] = useState(false);

  const revealTimerRef = useRef<NodeJS.Timeout | null>(null);

  const currentWords = SEQUENCE_WORDS[sentenceIdx];
  const isLastSentence = sentenceIdx === SEQUENCE_WORDS.length - 1;
  const isSentenceComplete = visibleCount >= currentWords.length;

  // Track native scroll progress relative to container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // VIBRANT ROYAL BLUE-PURPLE RADIAL AURA EXPANSION
  const auraScale = useTransform(scrollYProgress, [0, 0.45], [0, 6.0]);
  const auraOpacity = useTransform(scrollYProgress, [0, 0.05, 0.45, 1], [0, 1, 1, 1]);

  // Hero Text motion (dissolves cleanly)
  const heroTextScale = useTransform(scrollYProgress, [0, 0.22], [1, 1.06]);
  const heroTextOpacity = useTransform(scrollYProgress, [0, 0.18], [1, 0]);
  const heroTextY = useTransform(scrollYProgress, [0, 0.22], [0, -50]);

  // Scroll indicator arrow opacity
  const arrowOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);

  // Statement text motion (Reaches 100% solid 1.0 opacity quickly so it is 100% bright when scrolled)
  const statementScale = useTransform(scrollYProgress, [0.22, 0.48], [0.96, 1]);
  const statementOpacity = useTransform(scrollYProgress, [0.20, 0.45], [0, 1]);
  const statementY = useTransform(scrollYProgress, [0.22, 0.48], [30, 0]);

  const triggerNextSentence = (nextIdx: number) => {
    if (revealTimerRef.current) clearInterval(revealTimerRef.current);

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

  const handleContainerClick = () => {
    if (isRevealing || isLastSentence) return;
    triggerNextSentence(sentenceIdx + 1);
  };

  useEffect(() => {
    return () => {
      if (revealTimerRef.current) clearInterval(revealTimerRef.current);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full ${isLastSentence && isSentenceComplete ? 'min-h-[220vh]' : 'min-h-screen'} bg-black`}
    >
      {/* STICKY FULL-VIEWPORT CANVAS */}
      <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center bg-black z-10">
        {/* SEAMLESS FULL-SCREEN VIBRANT ROYAL AURA EXPANSION LAYER */}
        <motion.div
          style={{
            scale: auraScale,
            opacity: auraOpacity,
          }}
          className="absolute w-[600px] h-[600px] rounded-full pointer-events-none z-0 bg-[radial-gradient(circle,_#EC4899_0%,_#8B5CF6_25%,_#3B82F6_50%,_#1E1B4B_75%,_#0F172A_92%,_#000000_100%)] blur-2xl shadow-[0_0_200px_rgba(236,72,153,0.9)]"
        />

        {/* Dynamic Glowing Ambient Atmosphere Fill */}
        <motion.div
          style={{ opacity: auraOpacity }}
          className="absolute inset-0 w-full h-full pointer-events-none z-0 bg-gradient-to-b from-[#0F172A]/50 via-[#1E1B4B]/80 to-[#0B0F19]"
        />

        {/* Ambient Neon Floating Glow Orbs */}
        <motion.div
          style={{ opacity: auraOpacity }}
          className="absolute top-1/3 left-1/4 w-[450px] h-[450px] rounded-full bg-[#EC4899]/30 blur-[130px] pointer-events-none z-0 animate-pulse"
        />
        <motion.div
          style={{ opacity: auraOpacity }}
          className="absolute bottom-1/3 right-1/4 w-[450px] h-[450px] rounded-full bg-[#00F2FE]/30 blur-[130px] pointer-events-none z-0"
        />

        {/* STAGE 1: CENTERED KINETIC TYPOGRAPHY REVEAL HERO TEXT */}
        <motion.div
          onClick={handleContainerClick}
          style={{
            scale: heroTextScale,
            opacity: heroTextOpacity,
            y: heroTextY,
            pointerEvents: isLastSentence && isSentenceComplete ? 'none' : 'auto',
          }}
          className="relative z-20 w-full max-w-5xl mx-auto text-center flex items-center justify-center p-6 cursor-pointer select-none"
        >
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-center leading-tight flex flex-wrap items-center justify-center gap-x-3.5 sm:gap-x-5 gap-y-2 select-none font-editorial">
            {currentWords.slice(0, visibleCount).map((wordObj, i) => {
              const isEmphasized = wordObj.isEmphasized;

              return (
                <motion.span
                  key={`sentence-${sentenceIdx}-word-${i}`}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.2,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className={
                    isEmphasized
                      ? 'font-extrabold text-[#FF3B30] tracking-wider relative inline-block uppercase drop-shadow-[0_0_20px_rgba(255,59,48,0.6)]'
                      : 'text-white font-semibold inline-block drop-shadow-md'
                  }
                >
                  {wordObj.text}
                </motion.span>
              );
            })}
          </h1>
        </motion.div>

        {/* ELEGANT SCROLL CUE ARROW (Fades out when scrolling begins) */}
        {isLastSentence && isSentenceComplete && (
          <motion.div
            style={{ opacity: arrowOpacity }}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="absolute bottom-10 left-0 right-0 text-center pointer-events-none flex flex-col items-center justify-center gap-2 z-30"
          >
            <span className="font-mono-meta text-[11px] text-pink-300 uppercase tracking-[0.3em] font-bold drop-shadow">
              SCROLL DOWN
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              className="text-pink-400 text-xl font-light drop-shadow-md"
            >
              ↓
            </motion.div>
          </motion.div>
        )}

        {/* STAGE 2: 100% BRIGHT SOLID HIGH-CONTRAST TARGET STATEMENT */}
        {isLastSentence && isSentenceComplete && (
          <motion.div
            style={{
              opacity: statementOpacity,
              scale: statementScale,
              y: statementY,
            }}
            className="absolute inset-0 z-20 flex items-center justify-center p-6 sm:p-12 pointer-events-none"
          >
            <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center justify-center gap-6 sm:gap-8">
              {/* Luminous Neon Pill Badge */}
              <div className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-[#EC4899]/30 border-2 border-[#EC4899] shadow-[0_0_30px_rgba(236,72,153,0.9)] backdrop-blur-xl">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FFD600] animate-ping" />
                <span className="font-dmsans text-xs sm:text-sm uppercase tracking-[0.35em] font-black text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.9)]">
                  STATISTICAL OBSERVATION
                </span>
              </div>

              {/* 100% Solid Pure White & Neon Glowing Statement Typography */}
              <h2 className="font-playfair text-4xl sm:text-6xl md:text-7xl font-black text-white leading-[1.2] tracking-tight drop-shadow-[0_0_35px_rgba(255,255,255,0.95)]">
                &ldquo;do you know tht{' '}
                <span className="text-[#FFD600] font-black drop-shadow-[0_0_30px_rgba(255,214,0,1)]">
                  50% people
                </span>{' '}
                are poor is india because they dont have money above the{' '}
                <span className="text-[#00F5FF] underline decoration-[#00F5FF] decoration-4 underline-offset-8 font-black drop-shadow-[0_0_30px_rgba(0,245,255,1)]">
                  poverty line
                </span>&rdquo;
              </h2>

              {/* Luminous Laser Accent Bar */}
              <div className="w-36 h-2 bg-gradient-to-r from-[#FF2E93] via-[#FFD600] to-[#00F5FF] rounded-full shadow-[0_0_30px_rgba(0,245,255,1)] mt-2 animate-pulse" />
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
