'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { BrandCollaborationsSection } from './BrandCollaborationsSection';

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
  const portraitSectionRef = useRef<HTMLDivElement>(null);
  const tearSectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [sentenceIdx, setSentenceIdx] = useState(0);
  const [visibleCount, setVisibleCount] = useState(1);
  const [isRevealing, setIsRevealing] = useState(false);
  const [isStatementScreen, setIsStatementScreen] = useState(false);

  const revealTimerRef = useRef<NodeJS.Timeout | null>(null);
  const tearAnimationRef = useRef<number>(0);
  const phonePointsRef = useRef<number[]>([]);
  const pulseRef = useRef<number>(0);
  const touchStartYRef = useRef<number>(0);
  const isAutoScrollingRef = useRef<boolean>(false);

  // Seed phone procedural curve points (108 points from mobile artifact)
  useEffect(() => {
    const pPoints: number[] = [];
    let pSeed = 98765;
    const pRnd = () => {
      pSeed = (pSeed * 1664525 + 1013904223) % 4294967296;
      return pSeed / 4294967296;
    };
    for (let i = 0; i <= 108; i++) {
      const base = pRnd() * 2 - 1;
      const wave1 = Math.sin(i * 0.27) * 0.6 + Math.cos(i * 0.19) * 0.4;
      const wave2 = Math.sin(i * 1.9) * 0.55 + Math.sin(i * 2.7) * 0.35;
      const noise = (pRnd() - 0.5) * 0.9 + Math.sin(i * 7.3) * 0.22 + Math.sin(i * 13.1) * 0.12;
      pPoints.push(base * 0.35 + wave1 * 0.22 + wave2 * 0.35 + noise * 0.32);
    }
    phonePointsRef.current = pPoints;
  }, []);

  // Lock body scroll during word reveal phase; unlock smooth momentum window scrolling when statement screen is active
  useEffect(() => {
    if (isStatementScreen) {
      document.body.style.overflowY = 'auto';
      document.body.style.touchAction = 'pan-y';
      document.body.style.scrollBehavior = 'smooth';

      document.documentElement.style.overflowY = 'auto';
      document.documentElement.style.scrollBehavior = 'smooth';
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
  }, [isStatementScreen]);

  // Handle Touch Gesture for 1-Scroll Navigation from Phase 2 -> Phase 3
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartYRef.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isStatementScreen || isAutoScrollingRef.current) return;
    const currentY = e.touches[0].clientY;
    const deltaY = touchStartYRef.current - currentY;

    // When swiping down on Phase 2, trigger 1-scroll auto-glide to center Hero Portrait!
    if (deltaY > 12 && window.scrollY < window.innerHeight * 0.4) {
      isAutoScrollingRef.current = true;
      portraitSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        isAutoScrollingRef.current = false;
      }, 900);
    }
  };

  // Track scroll progress for Paper Tear Section on Phone
  const { scrollYProgress: tearScrollProgress } = useScroll({
    target: tearSectionRef,
    offset: ['start 85%', 'end 15%'],
  });

  const tearProgress = useTransform(tearScrollProgress, [0.0, 0.75], [0, 1]);

  const cubicEase = (v: number) => (v < 0.5 ? 4 * v * v * v : 1 - Math.pow(-2 * v + 2, 3) / 2);

  // 60 FPS Mobile Phone Canvas Renderer (Exact Phone Artifact Algorithm)
  const renderCanvas = useCallback(
    (timestamp: number) => {
      const canvas = canvasRef.current;
      if (!canvas) {
        tearAnimationRef.current = requestAnimationFrame(renderCanvas);
        return;
      }
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        tearAnimationRef.current = requestAnimationFrame(renderCanvas);
        return;
      }

      const dpr = Math.max(1, Math.min(2.5, window.devicePixelRatio || 1));
      const w = window.innerWidth;
      const h = window.innerHeight;
      const gw = Math.floor(w * dpr);
      const gh = Math.floor(h * dpr);

      if (canvas.width !== gw || canvas.height !== gh) {
        canvas.width = gw;
        canvas.height = gh;
      }
      if (canvas.style.width !== w + 'px' || canvas.style.height !== h + 'px') {
        canvas.style.width = w + 'px';
        canvas.style.height = h + 'px';
      }

      const rawT = tearProgress.get();
      const t = cubicEase(Math.max(0, Math.min(1, rawT)));

      pulseRef.current = timestamp * 0.0011;
      const pulse = pulseRef.current;

      ctx.clearRect(0, 0, gw, gh);

      // 1. REVEALED BACKGROUND UNDER TEAR LINE: PHONE ARTIFACT #0a080c + PLUM RADIAL GRADIENTS
      ctx.fillStyle = '#0a080c';
      ctx.fillRect(0, 0, gw, gh);

      const baseGrad = ctx.createRadialGradient(gw * 0.5, gh * 0.62, 0, gw * 0.5, gh * 0.62, gw * 1.1);
      baseGrad.addColorStop(0, '#120c14');
      baseGrad.addColorStop(0.3, '#0e0a10');
      baseGrad.addColorStop(0.58, '#0a080c');
      baseGrad.addColorStop(0.85, '#07050a');
      baseGrad.addColorStop(1, '#050508');
      ctx.fillStyle = baseGrad;
      ctx.fillRect(0, 0, gw, gh);

      const cx = gw * 0.5;
      const cy = gh * 0.72;
      const auraRadius = gw * 0.95;
      const pulseMult = 1 + Math.sin(pulse * 0.65) * 0.022;
      const auraGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, auraRadius * pulseMult);
      auraGrad.addColorStop(0, 'rgba(36, 20, 44, 0.18)');
      auraGrad.addColorStop(0.24, 'rgba(28, 16, 32, 0.095)');
      auraGrad.addColorStop(0.46, 'rgba(24, 14, 28, 0.04)');
      auraGrad.addColorStop(0.72, 'rgba(18, 10, 18, 0.015)');
      auraGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = auraGrad;
      ctx.fillRect(0, 0, gw, gh);

      // 2. TOP PAPER MASK REVEAL (DEEP NAVY #0d0d2e)
      const pointsSource = phonePointsRef.current;
      const pointsCount = pointsSource.length ? pointsSource.length - 1 : 108;
      const topY = gh * 0.35;
      const botY = gh * 0.55;
      const cutX = t * gw;
      const pathPoints: { x: number; y: number }[] = [];

      for (let i = 0; i <= pointsCount; i++) {
        const ratio = i / pointsCount;
        const px = ratio * gw;
        if (px > cutX + 0.5) break;
        const py = topY + (botY - topY) * ratio;
        const noiseVal = (pointsSource[i] ?? 0) * (16 * dpr);
        pathPoints.push({ x: px, y: py + noiseVal });
      }

      if (pathPoints.length === 0) pathPoints.push({ x: 0, y: topY });

      ctx.save();
      const clipPath = new Path2D();
      clipPath.moveTo(0, 0);
      clipPath.lineTo(gw, 0);
      clipPath.lineTo(gw, gh);

      if (t < 0.999) {
        clipPath.lineTo(cutX, gh);
      } else {
        clipPath.lineTo(gw, botY);
      }

      for (let i = pathPoints.length - 1; i >= 0; i--) {
        clipPath.lineTo(pathPoints[i].x, pathPoints[i].y);
      }
      clipPath.lineTo(0, 0);
      clipPath.closePath();
      ctx.clip(clipPath);

      ctx.fillStyle = '#0d0d2e';
      ctx.fillRect(0, 0, gw, gh);

      ctx.restore();

      // 3. PHONE RIPPED PAPER FIBER EDGES & 3D DEPTH SHADOWS
      if (t > 0.001 && pathPoints.length > 1) {
        const tearLine = new Path2D();
        tearLine.moveTo(pathPoints[0].x, pathPoints[0].y);
        for (let i = 1; i < pathPoints.length; i++) {
          tearLine.lineTo(pathPoints[i].x, pathPoints[i].y);
        }

        ctx.save();
        ctx.shadowColor = 'rgba(0, 0, 0, 0.52)';
        ctx.shadowBlur = 24 * dpr;
        ctx.shadowOffsetY = 18 * dpr;
        ctx.shadowOffsetX = 8 * dpr;
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.48)';
        ctx.lineWidth = 26 * dpr;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.stroke(tearLine);
        ctx.restore();

        ctx.save();
        ctx.strokeStyle = '#e8e0d5';
        ctx.lineWidth = 11.2 * dpr;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.stroke(tearLine);
        ctx.restore();

        ctx.save();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.85)';
        ctx.lineWidth = 2.6 * dpr;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.stroke(tearLine);
        ctx.restore();
      }

      tearAnimationRef.current = requestAnimationFrame(renderCanvas);
    },
    [tearProgress]
  );

  useEffect(() => {
    tearAnimationRef.current = requestAnimationFrame(renderCanvas);
    return () => {
      cancelAnimationFrame(tearAnimationRef.current);
    };
  }, [renderCanvas]);

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
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onClick={!isStatementScreen ? handleTap : undefined}
      className={`relative w-full ${
        isStatementScreen
          ? 'min-h-[320vh] bg-[#0d0d2e]'
          : 'h-[100dvh] overflow-hidden bg-[#0a080c] touch-none'
      } select-none flex flex-col items-center justify-start cursor-pointer`}
    >
      {/* HARDWARE ACCELERATED 60FPS EXPANDING INDIGO & BLUE AURA DOT FOR PHONE */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: isStatementScreen ? 3.0 : 0,
          opacity: isStatementScreen ? 1 : 0,
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
        animate={{ opacity: isStatementScreen ? 1 : 0 }}
        transition={{ duration: 2.2, ease: 'easeInOut' }}
        style={{ willChange: 'opacity' }}
        className="fixed inset-0 w-full h-full pointer-events-none z-0 bg-gradient-to-b from-[#1E1035] via-[#1E1B4B] to-[#0d0d2e] transform-gpu"
      />

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

      {/* PHASE 2: BRIGHT VIBRANT STATISTICAL OBSERVATION FOLD */}
      {isStatementScreen && (
        <section className="relative z-20 w-full min-h-[100dvh] flex flex-col items-center justify-center p-5 overflow-hidden bg-transparent">
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
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

      {/* PHASE 3: HERO POLAROID PORTRAIT SECTION (1-SCROLL AUTO GLIDE TARGET) */}
      {isStatementScreen && (
        <section
          ref={portraitSectionRef}
          className="relative z-20 w-full min-h-[100dvh] px-5 py-10 flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#1E1035] via-[#1E1B4B] to-[#0d0d2e]"
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
                <div className="pointer-events-none absolute -top-3.5 -left-3 z-30 transform -rotate-6">
                  <div className="bg-[#FFB3CB] text-[#0A0A0A] font-caveat text-[11px] font-bold px-2 py-0.5 shadow-[3px_4px_0_rgba(0,0,0,0.35)] whitespace-nowrap">
                    21 years old
                  </div>
                </div>

                {/* 2. Sticker Top-Right: "social media strategist" */}
                <div className="pointer-events-none absolute -top-3.5 -right-3 z-30 transform rotate-6">
                  <div className="bg-[#E91E8C] text-[#F5F0EB] font-caveat text-[11px] font-bold px-2 py-0.5 shadow-[3px_4px_0_rgba(0,0,0,0.35)] whitespace-nowrap">
                    social media strategist
                  </div>
                </div>

                {/* 3. Sticker Middle-Left: "ghostwriter" */}
                <div className="pointer-events-none absolute top-1/2 -left-4 transform -translate-y-1/2 -rotate-12 z-30">
                  <div className="bg-[#FFB3CB] text-[#0A0A0A] font-caveat text-[11px] font-bold px-2 py-0.5 shadow-[3px_4px_0_rgba(0,0,0,0.35)] whitespace-nowrap">
                    ghostwriter
                  </div>
                </div>

                {/* 4. Sticker Bottom-Left: "content creator" */}
                <div className="pointer-events-none absolute -bottom-3.5 -left-2 z-30 transform rotate-3">
                  <div className="bg-[#FFB3CB] text-[#0A0A0A] font-caveat text-[11px] font-bold px-2 py-0.5 shadow-[3px_4px_0_rgba(0,0,0,0.35)] whitespace-nowrap">
                    content creator
                  </div>
                </div>

                {/* 5. Sticker Bottom-Right: "storyteller" */}
                <div className="pointer-events-none absolute -bottom-3.5 -right-2 z-30 transform -rotate-3">
                  <div className="bg-[#E91E8C] text-[#F5F0EB] font-caveat text-[11px] font-bold px-2 py-0.5 shadow-[3px_4px_0_rgba(0,0,0,0.35)] whitespace-nowrap">
                    storyteller
                  </div>
                </div>
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

              {/* Action Button */}
              <div className="pt-1 flex justify-center">
                <a
                  href="#brands"
                  className="btn-gradient relative inline-flex items-center justify-center whitespace-nowrap rounded-full px-5 py-2.5 text-[11px] font-bold uppercase tracking-widest text-white transition-all duration-300 hover:scale-[1.04] shadow-[0_4px_30px_rgba(233,30,140,0.5)]"
                >
                  Explore Brands & Impact &rarr;
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* PHASE 4 & PHASE 5: CONTINUOUS SMOOTH SCROLLING */}
      {isStatementScreen && (
        <>
          {/* PHASE 4: FULL-SCREEN CANVAS PAPER TEAR TRANSITION */}
          <section
            ref={tearSectionRef}
            className="relative z-20 w-full min-h-[140vh] overflow-hidden"
          >
            <div className="sticky top-0 left-0 w-full h-[100dvh] h-screen overflow-hidden bg-transparent">
              <div className="relative w-full h-full">
                <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block pointer-events-none" />
              </div>
            </div>
          </section>

          {/* PHASE 5: BRANDS & IMPACT SECTION SHIFTED UP TO TOUCH THE PAPER TEAR LINE */}
          <div className="relative z-30 -mt-[45vh] bg-[#0a080c] text-white">
            <BrandCollaborationsSection />
          </div>
        </>
      )}
    </div>
  );
};
