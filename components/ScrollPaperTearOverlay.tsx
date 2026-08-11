'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
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
  const portraitSectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);

  const [sentenceIdx, setSentenceIdx] = useState(0);
  const [visibleCount, setVisibleCount] = useState(1);
  const [isRevealing, setIsRevealing] = useState(false);
  const [isStatementScreen, setIsStatementScreen] = useState(false);
  const [isPaperTearActive, setIsPaperTearActive] = useState(false);

  const revealTimerRef = useRef<NodeJS.Timeout | null>(null);
  const tearAnimationRef = useRef<number>(0);
  const tearProgressRef = useRef<{ t: number; phase: string; phaseStart: number }>({
    t: 0,
    phase: 'closed',
    phaseStart: 0,
  });

  const noisePointsRef = useRef<number[]>([]);

  // Seed procedural jagged points for authentic fibrous paper tear
  useEffect(() => {
    const points: number[] = [];
    let seed = 98765;
    const rnd = () => {
      seed = (seed * 1664525 + 1013904223) % 4294967296;
      return seed / 4294967296;
    };
    for (let i = 0; i <= 30; i++) {
      const a = rnd() * 2 - 1;
      const wave = Math.sin(i * 1.9) * 0.35 + Math.sin(i * 3.7) * 0.25;
      points.push(a * 0.65 + wave * 0.35);
    }
    noisePointsRef.current = points;
  }, []);

  const currentWords = sentenceIdx < SEQUENCE_WORDS.length ? SEQUENCE_WORDS[sentenceIdx] : [];

  // Lock body scroll during kinetic reveal; unlock when paper tear section is active
  useEffect(() => {
    if (isStatementScreen || isPaperTearActive) {
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
  }, [isStatementScreen, isPaperTearActive]);

  // Cubic Easing Function for Natural Physical Paper Resistance
  const cubicEase = (v: number) => (v < 0.5 ? 4 * v * v * v : 1 - Math.pow(-2 * v + 2, 3) / 2);

  // High-Performance 60 FPS Canvas Paper Tear Renderer
  const renderCanvas = useCallback(
    (timestamp: number) => {
      const canvas = canvasRef.current;
      const container = canvasContainerRef.current;
      if (!canvas || !container) {
        tearAnimationRef.current = requestAnimationFrame(renderCanvas);
        return;
      }
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        tearAnimationRef.current = requestAnimationFrame(renderCanvas);
        return;
      }

      const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
      const rect = container.getBoundingClientRect();
      const w = rect.width || container.clientWidth || 1280;
      const h = rect.height || container.clientHeight || w * (9 / 16);
      const gw = Math.floor(w * dpr);
      const gh = Math.floor(h * dpr);

      if (canvas.width !== gw || canvas.height !== gh) {
        canvas.width = gw;
        canvas.height = gh;
      }

      const state = tearProgressRef.current;
      if (isPaperTearActive && state.phase === 'closed') {
        state.phase = 'tearing';
        state.phaseStart = timestamp;
      }

      if (state.phase === 'tearing') {
        const elapsed = timestamp - state.phaseStart;
        const dur = 1600;
        const p = Math.min(1, elapsed / dur);
        state.t = cubicEase(p);
        if (p >= 1) {
          state.phase = 'open';
        }
      }

      ctx.clearRect(0, 0, gw, gh);

      // BOTTOM REVEALED CANVAS LAYER (#0A0A0A / #08080C WITH NEON MAGENTA AURA)
      ctx.fillStyle = '#08080c';
      ctx.fillRect(0, 0, gw, gh);

      // Neon Magenta-Pink Radial Glow (#FF1493 / #E91E8C)
      const cx = gw * 0.7;
      const cy = gh * 0.6;
      const auraRadius = 600 * dpr * (w / 1280 ? Math.max(0.7, w / 1280) : 1);
      const auraGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, auraRadius);
      auraGrad.addColorStop(0, 'rgba(255, 20, 147, 0.95)');
      auraGrad.addColorStop(0.2, 'rgba(233, 30, 140, 0.45)');
      auraGrad.addColorStop(0.4, 'rgba(139, 92, 246, 0.18)');
      auraGrad.addColorStop(0.7, 'rgba(255, 20, 147, 0.04)');
      auraGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = auraGrad;
      ctx.fillRect(0, 0, gw, gh);

      // Subtle Vignette Depth
      const vig = ctx.createRadialGradient(gw * 0.5, gh * 0.5, gh * 0.25, gw * 0.5, gh * 0.5, gw * 0.9);
      vig.addColorStop(0, 'rgba(0,0,0,0)');
      vig.addColorStop(1, 'rgba(0,0,0,0.6)');
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, gw, gh);

      // TOP ROYAL INDIGO PAPER LAYER (DIAGONAL TEAR CLIP MASK)
      const pointsCount = noisePointsRef.current.length ? noisePointsRef.current.length - 1 : 30;
      const topYBoundary = gh * 0.2;
      const botYBoundary = gh * 0.8;
      const cutX = state.t * gw;
      const pathPoints: { x: number; y: number }[] = [];

      for (let i = 0; i <= pointsCount; i++) {
        const ratio = i / pointsCount;
        const px = ratio * gw;
        if (px > cutX + 0.5) break;
        const py = topYBoundary + (botYBoundary - topYBoundary) * ratio;
        const noiseVal = (noisePointsRef.current[i] ?? 0) * (8 * dpr);
        pathPoints.push({ x: px, y: py + noiseVal });
      }

      if (pathPoints.length === 0) pathPoints.push({ x: 0, y: topYBoundary });

      ctx.save();
      const clipPath = new Path2D();
      clipPath.moveTo(0, 0);
      clipPath.lineTo(gw, 0);
      clipPath.lineTo(gw, gh);
      if (state.t < 0.999) {
        clipPath.lineTo(cutX, gh);
      } else {
        clipPath.lineTo(gw, botYBoundary);
      }

      for (let i = pathPoints.length - 1; i >= 0; i--) {
        clipPath.lineTo(pathPoints[i].x, pathPoints[i].y);
      }
      clipPath.lineTo(0, 0);
      clipPath.closePath();
      ctx.clip(clipPath);

      // Royal Indigo Top Paper Canvas Gradient (#1E1035 -> #1E1B4B -> #2A2C4A)
      const topPaperGrad = ctx.createLinearGradient(0, 0, gw, gh);
      topPaperGrad.addColorStop(0, '#1E1035');
      topPaperGrad.addColorStop(0.5, '#1E1B4B');
      topPaperGrad.addColorStop(1, '#2A2C4A');
      ctx.fillStyle = topPaperGrad;
      ctx.fillRect(0, 0, gw, gh);

      ctx.restore();

      // RIPPED PAPER FIBER EDGES & 3D DEPTH SHADOWS
      if (state.t > 0.001 && pathPoints.length > 1) {
        const tearLine = new Path2D();
        tearLine.moveTo(pathPoints[0].x, pathPoints[0].y);
        for (let i = 1; i < pathPoints.length; i++) {
          tearLine.lineTo(pathPoints[i].x, pathPoints[i].y);
        }

        // Heavy Cast Drop Shadow
        ctx.save();
        ctx.shadowColor = 'rgba(0, 0, 0, 0.92)';
        ctx.shadowBlur = 28 * dpr;
        ctx.shadowOffsetY = 15 * dpr;
        ctx.shadowOffsetX = 6 * dpr;
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.9)';
        ctx.lineWidth = 18 * dpr;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.stroke(tearLine);
        ctx.restore();

        // Inner Shadow Edge
        ctx.save();
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.55)';
        ctx.lineWidth = 10 * dpr;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.stroke(tearLine);
        ctx.restore();

        // Cream Fibrous Paper Edge Highlight (#E8E0D5)
        ctx.save();
        ctx.strokeStyle = '#e8e0d5';
        ctx.lineWidth = 3.2 * dpr;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.stroke(tearLine);
        ctx.restore();

        // Crisp White Fiber Outline
        ctx.save();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.85)';
        ctx.lineWidth = 1.2 * dpr;
        ctx.stroke(tearLine);
        ctx.restore();
      }

      tearAnimationRef.current = requestAnimationFrame(renderCanvas);
    },
    [isPaperTearActive]
  );

  useEffect(() => {
    tearAnimationRef.current = requestAnimationFrame(renderCanvas);
    return () => {
      cancelAnimationFrame(tearAnimationRef.current);
    };
  }, [renderCanvas]);

  // Track scroll progress for Phase 4 (Diagonal portrait transition)
  const { scrollYProgress } = useScroll({
    target: portraitSectionRef,
    offset: ['start end', 'end start'],
  });

  const portraitX = useTransform(scrollYProgress, [0.1, 0.55], ['-45vw', '0vw']);
  const portraitY = useTransform(scrollYProgress, [0.1, 0.55], ['40vh', '0vh']);
  const portraitRotate = useTransform(scrollYProgress, [0.1, 0.55], [-16, 4]);
  const portraitScale = useTransform(scrollYProgress, [0.1, 0.55], [0.72, 1.0]);
  const portraitOpacity = useTransform(scrollYProgress, [0.08, 0.25, 0.55], [0, 1, 1]);

  const textContentOpacity = useTransform(scrollYProgress, [0.25, 0.60], [0, 1]);
  const textContentY = useTransform(scrollYProgress, [0.25, 0.60], [40, 0]);

  const triggerNextSentence = (nextIdx: number) => {
    if (revealTimerRef.current) clearInterval(revealTimerRef.current);

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
    if (isRevealing) return;
    if (!isStatementScreen) {
      triggerNextSentence(sentenceIdx + 1);
    } else if (!isPaperTearActive) {
      setIsPaperTearActive(true);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full ${isStatementScreen ? 'min-h-[280vh]' : 'h-[100dvh] overflow-hidden'} bg-[#08080c] select-none touch-pan-y`}
    >
      {/* EXPANDING CENTRAL CIRCULAR AURA DOT */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: isStatementScreen ? 6.5 : 0,
          opacity: isStatementScreen ? 1 : 0,
        }}
        transition={{
          duration: 3.4,
          ease: [0.25, 0.1, 0.25, 1.0],
        }}
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] sm:w-[600px] sm:h-[600px] rounded-full pointer-events-none z-0 bg-[radial-gradient(circle_at_center,_#EC4899_0%,_#8B5CF6_25%,_#3B82F6_50%,_#1E1B4B_82%,_#171233_100%)] shadow-[0_0_120px_rgba(236,72,153,0.8)] transform-gpu will-change-transform"
      />

      {/* Dynamic Ambient Atmosphere Depth Layer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isStatementScreen ? 1 : 0 }}
        transition={{ duration: 3.4, ease: 'easeInOut' }}
        className="fixed inset-0 w-full h-full pointer-events-none z-0 bg-gradient-to-b from-[#1E1035] via-[#1E1B4B] to-[#171233] transform-gpu"
      />

      {/* QUESTION SENTENCES (PHASE 1 - CLICK/TAP TO REVEAL) */}
      {!isStatementScreen && (
        <div
          onClick={handleTap}
          className="relative z-20 w-full h-[100dvh] flex items-center justify-center p-5 sm:p-6 cursor-pointer"
        >
          <motion.div
            key="question-screen"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.03 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-5xl mx-auto text-center"
          >
            <h1 className="text-3xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-center leading-tight flex flex-wrap items-center justify-center gap-x-3 sm:gap-x-5 gap-y-2 select-none font-editorial">
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

          {/* INITIAL INSTRUCTION PROMPT: "TAP ANYWHERE TO CONTINUE" */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: [0.35, 0.85, 0.35] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute bottom-8 sm:bottom-10 left-0 right-0 text-center pointer-events-none flex flex-col items-center justify-center gap-1.5 z-30"
          >
            <span className="font-mono-meta text-[10px] sm:text-[11px] text-white/70 uppercase tracking-[0.35em] font-bold drop-shadow">
              TAP ANYWHERE TO CONTINUE
            </span>
            <span className="text-white/40 text-xs font-light">👆</span>
          </motion.div>
        </div>
      )}

      {/* PHASE 2: STATISTICAL STATEMENT FOLD */}
      {isStatementScreen && !isPaperTearActive && (
        <section
          onClick={handleTap}
          className="relative z-20 w-full min-h-[100dvh] flex items-center justify-center p-5 sm:p-12 overflow-hidden cursor-pointer"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 25 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center justify-center gap-5 sm:gap-8 transform-gpu"
          >
            <motion.div
              animate={{
                y: [-6, 6, -6],
              }}
              transition={{
                duration: 5.0,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="flex flex-col items-center justify-center gap-5 sm:gap-8"
            >
              {/* Luminous Neon Pill Badge */}
              <div className="inline-flex items-center gap-2 sm:gap-2.5 px-4 py-2 sm:px-6 sm:py-2.5 rounded-full bg-[#EC4899]/30 border-2 border-[#EC4899] shadow-[0_0_20px_rgba(236,72,153,0.8)] backdrop-blur-md">
                <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#FFD600] animate-ping" />
                <span className="font-dmsans text-[10px] sm:text-sm uppercase tracking-[0.3em] sm:tracking-[0.35em] font-black text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.9)]">
                  STATISTICAL OBSERVATION
                </span>
              </div>

              {/* 100% Solid Pure White & Neon Glowing Statement Typography */}
              <h2 className="font-playfair text-2xl sm:text-6xl md:text-7xl font-black text-[#FFFFFF] leading-[1.28] sm:leading-[1.2] tracking-tight drop-shadow-[0_0_25px_rgba(255,255,255,0.9)]">
                &ldquo;do you know tht{' '}
                <span className="text-[#FFD600] font-black drop-shadow-[0_0_25px_rgba(255,214,0,1)]">
                  50% people
                </span>{' '}
                are poor is india because they dont have money above the{' '}
                <span className="text-[#00F5FF] underline decoration-[#00F5FF] decoration-2 sm:decoration-4 underline-offset-4 sm:underline-offset-8 font-black drop-shadow-[0_0_25px_rgba(0,245,255,1)]">
                  poverty line
                </span>&rdquo;
              </h2>

              {/* Luminous Laser Accent Bar */}
              <div className="w-24 sm:w-36 h-1.5 sm:h-2 bg-gradient-to-r from-[#FF2E93] via-[#FFD600] to-[#00F5FF] rounded-full shadow-[0_0_25px_rgba(0,245,255,1)] mt-1 sm:mt-2 animate-pulse" />
            </motion.div>
          </motion.div>

          {/* TAP TO TEAR PAPER INSTRUCTION */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.2 }}
            className="absolute bottom-8 sm:bottom-10 left-0 right-0 text-center pointer-events-none flex flex-col items-center justify-center gap-2 z-30"
          >
            <span className="font-mono-meta text-[10px] sm:text-[11px] text-pink-300 uppercase tracking-[0.3em] font-bold drop-shadow">
              TAP ANYWHERE TO TEAR CANVAS
            </span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              className="text-pink-400 text-lg sm:text-xl font-light drop-shadow-md"
            >
              ✂️
            </motion.div>
          </motion.div>
        </section>
      )}

      {/* PHASE 3: PROGRAMMATIC CANVAS PAPER TEAR ANIMATION SHOWCASE */}
      {isPaperTearActive && (
        <section className="relative z-20 w-full min-h-[100dvh] flex flex-col items-center justify-center p-4 sm:p-8 overflow-hidden">
          <div
            ref={canvasContainerRef}
            className="relative w-full max-w-[1280px] aspect-[16/9] rounded-[24px] overflow-hidden bg-[#08080c] shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_24px_80px_-24px_rgba(0,0,0,0.9),0_0_120px_-40px_rgba(255,20,147,0.35)]"
          >
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />
          </div>

          <div className="mt-8 text-center pointer-events-none">
            <span className="font-mono-meta text-[11px] text-pink-300 uppercase tracking-[0.3em] font-bold drop-shadow">
              SCROLL DOWN TO REVEAL PORTFOLIO
            </span>
            <div className="text-pink-400 text-xl font-light mt-1">↓</div>
          </div>
        </section>
      )}

      {/* PHASE 4: HERO POLAROID PORTRAIT DIAGONAL ENTRANCE SECTION */}
      {isPaperTearActive && (
        <section
          ref={portraitSectionRef}
          className="relative z-20 w-full min-h-[120vh] px-6 sm:px-14 md:px-24 py-20 flex items-center justify-center overflow-hidden"
        >
          <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-16 items-center relative z-10">
            {/* Left Column: Heading & Branding */}
            <motion.div
              style={{
                opacity: textContentOpacity,
                y: textContentY,
              }}
              className="flex flex-col gap-6 order-2 lg:order-1 text-center lg:text-left"
            >
              <h1 className="font-black uppercase leading-[1.08] tracking-tight text-[#F5F0EB] text-4xl sm:text-6xl lg:text-7xl font-playfair drop-shadow-lg">
                Hi, I&apos;m{' '}
                <span className="bg-gradient-to-r from-[#F5F0EB] via-[#FFB3CB] to-[#E91E8C] bg-clip-text text-transparent">
                  Arnav
                </span>
              </h1>

              <div className="flex flex-col gap-3 max-w-xl mx-auto lg:mx-0">
                <p className="font-dmsans text-lg sm:text-2xl text-[#F5F0EB] font-light leading-relaxed">
                  Building my brand while teaching you to build yours{' '}
                  <span className="text-[#E91E8C]">⭐️</span>
                </p>
                <p className="font-dmsans text-sm sm:text-base text-[#F5F0EB]/70 font-light leading-relaxed">
                  Personal brand strategist, Content creator, Storyteller, and Ghostwriter.
                </p>
              </div>

              {/* Action Button */}
              <div className="pt-2 flex justify-center lg:justify-start">
                <a
                  href="#connect"
                  className="btn-gradient relative inline-flex items-center justify-center whitespace-nowrap rounded-full px-8 py-3.5 sm:px-10 sm:py-4 text-xs sm:text-sm font-bold uppercase tracking-widest text-white transition-all duration-300 hover:scale-[1.04] shadow-[0_4px_30px_rgba(233,30,140,0.5)]"
                >
                  Connect With Me &rarr;
                </a>
              </div>
            </motion.div>

            {/* Right Column: Hero Polaroid Portrait Frame (Glides diagonally from bottom-left corner to upper-right) */}
            <div className="order-1 lg:order-2 flex flex-col items-center lg:items-end justify-center py-4">
              <motion.div
                style={{
                  x: portraitX,
                  y: portraitY,
                  rotate: portraitRotate,
                  scale: portraitScale,
                  opacity: portraitOpacity,
                }}
                className="relative w-[min(82vw,340px)] sm:w-[360px] my-2 cursor-pointer select-none transform-gpu"
              >
                {/* Polaroid Radial Glow */}
                <div className="pointer-events-none absolute inset-0 m-auto h-[85%] w-[85%] rounded-full blur-3xl bg-gradient-to-r from-[#FFB3CB]/40 via-[#E91E8C]/30 to-transparent" />

                {/* White Polaroid Card */}
                <div className="relative bg-white p-4 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85)] rounded-sm transform transition-all duration-500 ease-out hover:rotate-3 hover:scale-[1.03]">
                  <div className="relative overflow-hidden aspect-[2/3] bg-[#F5F0EB]">
                    <img
                      src="/assets/kamna-portrait.jpg"
                      alt="Arnav — Content Strategist"
                      className="w-full h-full object-cover object-center select-none"
                    />
                  </div>

                  {/* Handwritten Polaroid Caption */}
                  <p className="text-center text-[#0A0A0A]/85 font-caveat text-xl sm:text-2xl pt-3 pb-1 tracking-wide font-semibold">
                    @ariimakesflims
                  </p>
                </div>

                {/* --- HANDWRITTEN POPUP STICKERS FROM KAMNA-PORTFOLIO --- */}

                {/* 1. Sticker Top-Left: "21 years old" */}
                <div className="pointer-events-none absolute -top-6 -left-6 sm:-left-10 z-30 transform -rotate-6">
                  <div className="bg-[#FFB3CB] text-[#0A0A0A] font-caveat text-base sm:text-xl font-bold px-3 py-1 shadow-[4px_6px_0_rgba(0,0,0,0.35)] whitespace-nowrap">
                    21 years old
                  </div>
                </div>

                {/* 2. Sticker Top-Right: "social media strategist" */}
                <div className="pointer-events-none absolute -top-6 -right-6 sm:-right-12 z-30 transform rotate-6">
                  <div className="bg-[#E91E8C] text-[#F5F0EB] font-caveat text-base sm:text-xl font-bold px-3 py-1 shadow-[4px_6px_0_rgba(0,0,0,0.35)] whitespace-nowrap">
                    social media strategist
                  </div>
                </div>

                {/* 3. Sticker Middle-Left: "ghostwriter" */}
                <div className="pointer-events-none absolute top-1/2 -left-10 sm:-left-16 transform -translate-y-1/2 -rotate-12 z-30">
                  <div className="bg-[#FFB3CB] text-[#0A0A0A] font-caveat text-base sm:text-xl font-bold px-3 py-1 shadow-[4px_6px_0_rgba(0,0,0,0.35)] whitespace-nowrap">
                    ghostwriter
                  </div>
                </div>

                {/* 4. Sticker Bottom-Left: "content creator" */}
                <div className="pointer-events-none absolute -bottom-8 -left-4 sm:-left-6 z-30 transform rotate-3">
                  <div className="bg-[#FFB3CB] text-[#0A0A0A] font-caveat text-base sm:text-xl font-bold px-3 py-1 shadow-[4px_6px_0_rgba(0,0,0,0.35)] whitespace-nowrap">
                    content creator
                  </div>
                </div>

                {/* 5. Sticker Bottom-Right: "storyteller" */}
                <div className="pointer-events-none absolute -bottom-8 -right-4 sm:-right-6 z-30 transform -rotate-3">
                  <div className="bg-[#E91E8C] text-[#F5F0EB] font-caveat text-base sm:text-xl font-bold px-3 py-1 shadow-[4px_6px_0_rgba(0,0,0,0.35)] whitespace-nowrap">
                    storyteller
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
