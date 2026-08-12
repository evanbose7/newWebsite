'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- PORTFOLIO DATA ---
interface ProjectItem {
  id: string;
  title: string;
  category: 'AI VIDEO' | 'SOCIAL CONTENT' | 'VIDEO EDITING' | 'UGC' | 'YOUTUBE' | 'LONG-FORM';
  desc: string;
  tag: string;
}

const PORTFOLIO_PROJECTS: ProjectItem[] = [
  {
    id: 'p1',
    title: 'Neon Cyber Genesis',
    category: 'AI VIDEO',
    desc: 'Turning raw concepts into AI-generated cinematic visual stories for tech brands.',
    tag: 'AI Animation & Gen-AI',
  },
  {
    id: 'p2',
    title: 'Architectural Heritage',
    category: 'SOCIAL CONTENT',
    desc: 'High-converting organic social video series showcasing luxury interior spaces.',
    tag: '4L+ Views Campaign',
  },
  {
    id: 'p3',
    title: 'Creator Voice Edit',
    category: 'VIDEO EDITING',
    desc: 'Dynamic short-form editing with retention hooks, motion typography, and sound design.',
    tag: 'Short-Form Reels',
  },
  {
    id: 'p4',
    title: 'Paws & Living UGC',
    category: 'UGC',
    desc: 'Relatable creator-led lifestyle UGC content for premium pet and wellness brands.',
    tag: 'Organic UGC',
  },
  {
    id: 'p5',
    title: 'Brand Origin Documentary',
    category: 'YOUTUBE',
    desc: 'Deep storytelling YouTube documentary editing for founder-led startup brands.',
    tag: 'YouTube Storytelling',
  },
  {
    id: 'p6',
    title: 'Jewellery Craft Series',
    category: 'LONG-FORM',
    desc: 'Cinematic long-form visual craft series highlighting bespoke jewellery artisans.',
    tag: 'Long-Form Craft',
  },
];

// --- DICE ROLL PHILOSOPHY QUOTES ---
const DICE_QUOTES = [
  "Every post is another chance. Every idea is another roll. 🎲",
  "You can spend three days making something... or post an ordinary Tuesday thought that hits 100k! 🚀",
  "I can't promise every video will blow up. Nobody can. But I promise to care about the process. ✦",
  "Somewhere between the flops, experiments, and jackpot moments — you find what makes people care. 💡",
  "So, shall we roll the dice? 🎲",
];

export const MobilePaperTearOverlay: React.FC = () => {
  // Mobile smooth scrolling lock control
  useEffect(() => {
    document.body.style.overflowY = 'auto';
    document.body.style.touchAction = 'pan-y';
    document.documentElement.style.overflowY = 'auto';

    return () => {
      document.body.style.overflow = 'auto';
      document.body.style.touchAction = 'auto';
      document.documentElement.style.overflow = 'auto';
    };
  }, []);

  // Filter state for portfolio
  const [activeCategory, setActiveCategory] = useState<string>('ALL');

  // Contact form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'AI VIDEO',
    details: '',
    budget: '$1,000 - $3,000',
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Dice roll game state
  const [diceIndex, setDiceIndex] = useState(0);
  const [isRolling, setIsRolling] = useState(false);

  const handleRollDice = () => {
    if (isRolling) return;
    setIsRolling(true);
    setTimeout(() => {
      setDiceIndex((prev) => (prev + 1) % DICE_QUOTES.length);
      setIsRolling(false);
    }, 600);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 5000);
  };

  const scrollToContact = () => {
    const el = document.getElementById('contact-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const filteredProjects =
    activeCategory === 'ALL'
      ? PORTFOLIO_PROJECTS
      : PORTFOLIO_PROJECTS.filter((p) => p.category === activeCategory);

  return (
    <div className="w-full min-h-screen bg-[#0A080C] text-[#F5F0EB] font-dmsans select-none overflow-x-hidden relative">
      {/* Dynamic Background Radial Aura */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-[radial-gradient(ellipse_at_top,_rgba(236,72,153,0.15)_0%,_rgba(139,92,246,0.12)_35%,_rgba(10,8,12,1)_85%)]" />

      {/* --- SECTION 01: HERO --- */}
      <section className="relative z-10 min-h-[100dvh] px-5 py-10 flex flex-col items-center justify-center text-center">
        {/* Luminous Brand Tag */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EC4899]/20 border border-[#EC4899]/50 shadow-[0_0_15px_rgba(236,72,153,0.4)] backdrop-blur-md mb-4"
        >
          <span className="w-2 h-2 rounded-full bg-[#FFD600] animate-ping" />
          <span className="font-mono-meta text-[10px] uppercase tracking-[0.3em] font-black text-white">
            IDEAS & EXECUTION ✦
          </span>
        </motion.div>

        {/* Hero Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="font-playfair text-3xl font-black uppercase tracking-tight text-white leading-tight mb-3"
        >
          HI, I’M ARI.
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="font-playfair text-base font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FFB3CB] via-[#E91E8C] to-[#00F5FF] leading-snug mb-4 max-w-xs"
        >
          I BRIDGE THE GAP BETWEEN IDEAS & EXECUTION.
        </motion.p>

        {/* Floating Polaroid Hero Frame with Sticker Tags */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.0, delay: 0.4 }}
          className="relative my-4"
        >
          <motion.div
            animate={{
              y: [-4, 4, -4],
              rotate: [1.5, 3, 1.5],
            }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="relative w-[240px] cursor-pointer select-none"
          >
            {/* Ambient Radial Glow */}
            <div className="pointer-events-none absolute inset-0 m-auto h-[85%] w-[85%] rounded-full blur-2xl bg-gradient-to-r from-[#FFB3CB]/40 via-[#E91E8C]/30 to-transparent" />

            {/* White Polaroid Frame */}
            <div className="relative bg-white p-2.5 shadow-2xl shadow-black/90 rounded-sm">
              <div className="relative overflow-hidden aspect-[2/3] bg-[#F5F0EB]">
                <img
                  src="/assets/kamna-portrait.jpg"
                  alt="ARI — Content Strategist & Visual Creator"
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <p className="text-center text-[#0A0A0A]/85 font-caveat text-base pt-1.5 pb-0.5 tracking-wide font-bold">
                @ariimakesflims
              </p>
            </div>

            {/* --- HANDWRITTEN STICKER TAGS --- */}
            <div className="pointer-events-none absolute -top-3 -left-3 z-20 transform -rotate-6">
              <div className="bg-[#FFB3CB] text-[#0A0A0A] font-caveat text-[10px] font-bold px-2 py-0.5 shadow-[2px_3px_0_rgba(0,0,0,0.35)] whitespace-nowrap">
                AI VIDEO CREATOR
              </div>
            </div>

            <div className="pointer-events-none absolute -top-3 -right-3 z-20 transform rotate-6">
              <div className="bg-[#E91E8C] text-[#F5F0EB] font-caveat text-[10px] font-bold px-2 py-0.5 shadow-[2px_3px_0_rgba(0,0,0,0.35)] whitespace-nowrap">
                CONTENT STRATEGIST
              </div>
            </div>

            <div className="pointer-events-none absolute top-1/2 -left-4 transform -translate-y-1/2 -rotate-12 z-20">
              <div className="bg-[#00F5FF] text-[#0A0A0A] font-caveat text-[10px] font-bold px-2 py-0.5 shadow-[2px_3px_0_rgba(0,0,0,0.35)] whitespace-nowrap">
                VIDEO EDITOR
              </div>
            </div>

            <div className="pointer-events-none absolute top-1/2 -right-4 transform -translate-y-1/2 rotate-12 z-20">
              <div className="bg-[#FFD600] text-[#0A0A0A] font-caveat text-[10px] font-bold px-2 py-0.5 shadow-[2px_3px_0_rgba(0,0,0,0.35)] whitespace-nowrap">
                UGC CREATOR
              </div>
            </div>

            <div className="pointer-events-none absolute -bottom-3 -left-2 z-20 transform rotate-3">
              <div className="bg-[#FFB3CB] text-[#0A0A0A] font-caveat text-[10px] font-bold px-2 py-0.5 shadow-[2px_3px_0_rgba(0,0,0,0.35)] whitespace-nowrap">
                STORYTELLER
              </div>
            </div>

            <div className="pointer-events-none absolute -bottom-3 -right-2 z-20 transform -rotate-3">
              <div className="bg-[#E91E8C] text-[#F5F0EB] font-caveat text-[10px] font-bold px-2 py-0.5 shadow-[2px_3px_0_rgba(0,0,0,0.35)] whitespace-nowrap">
                CONTENT PARTNER
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Description Bio */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.55 }}
          className="text-xs text-[#F5F0EB]/80 font-light leading-relaxed max-w-xs mb-4"
        >
          I help business owners and brands turn what’s in their heads into content that feels, walks and talks like them — through strategy, storytelling, AI, UGC and editing.
        </motion.p>

        {/* Small Line */}
        <p className="font-mono-meta text-[11px] font-bold uppercase tracking-[0.25em] text-[#FFD600] mb-5">
          YOUR IDEA. MY EXECUTION. ✦
        </p>

        {/* Hero Action CTA Button */}
        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={scrollToContact}
          className="btn-gradient relative inline-flex items-center justify-center rounded-full px-7 py-3.5 text-xs font-bold uppercase tracking-widest text-white shadow-[0_4px_25px_rgba(233,30,140,0.6)]"
        >
          WORK WITH ME →
        </motion.button>
      </section>

      {/* --- SECTION 02: THE PROBLEM --- */}
      <section className="relative z-10 px-5 py-12 bg-[#0E0A12] border-y border-white/10">
        <div className="max-w-md mx-auto flex flex-col gap-6">
          <div className="inline-block px-3 py-1 rounded-full bg-[#E91E8C]/20 border border-[#E91E8C]/40 text-[#FFB3CB] font-mono-meta text-[10px] font-bold uppercase tracking-widest w-fit">
            02 — THE PROBLEM
          </div>

          <h2 className="font-playfair text-2xl font-black uppercase text-white leading-tight">
            DOES YOUR BRAND ACTUALLY LOOK & SOUND LIKE YOU?
          </h2>

          <div className="flex flex-col gap-3 text-sm text-[#F5F0EB]/90 leading-relaxed font-light">
            <p className="font-bold text-white text-base">No, seriously.</p>
            <p>Don’t just skim past this question.</p>
            <p>Take two minutes. Really think about it.</p>
          </div>

          {/* Interactive Checklist Box */}
          <div className="bg-[#150F1C] p-4 rounded-xl border border-white/10 flex flex-col gap-3">
            <div className="flex items-start gap-3">
              <span className="text-[#FF3B30] text-base">❓</span>
              <p className="text-xs text-white/90">Does your content look the way you imagined it?</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-[#FF3B30] text-base">❓</span>
              <p className="text-xs text-white/90">Does it sound like you?</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-[#FF3B30] text-base">❓</span>
              <p className="text-xs text-white/90">Does it capture the ideas, personality and feeling you have in your head?</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-[#FF3B30] text-base">❓</span>
              <p className="text-xs text-white/90">Or does it sometimes feel like you’re just putting content out because you have to?</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-[#E91E8C]/20 to-[#3B82F6]/20 p-4 rounded-xl border border-[#E91E8C]/40 flex flex-col gap-2">
            <p className="text-xs font-bold text-white">If the answer is no… Well, it’s your lucky day.</p>
            <p className="text-xs text-white/80">Because you’ve landed on the right page.</p>
          </div>

          <p className="text-xs text-white/80 leading-relaxed">
            I’m here to take those ideas, thoughts and stories in your head and turn them into content that feels real, intentional and actually like you.
          </p>

          <p className="text-xs text-white/80 leading-relaxed">
            And you don’t need a huge production team or an unnecessarily expensive process to make that happen. I combine strategy, storytelling, AI, UGC and editing to make content creation more creative, efficient and cost-effective.
          </p>

          <div className="pt-2 flex flex-col gap-3">
            <div className="p-3 bg-[#E91E8C] text-white text-center font-black tracking-widest text-xs uppercase rounded-lg shadow-lg">
              YOUR IDEAS → MY EXECUTION.
            </div>
            <button
              onClick={scrollToContact}
              className="w-full py-3 rounded-lg border border-white/30 bg-white/5 text-xs font-bold uppercase tracking-widest text-white hover:bg-white/10"
            >
              WORK WITH ME →
            </button>
          </div>
        </div>
      </section>

      {/* --- SECTION 03: EXPERIENCE --- */}
      <section className="relative z-10 px-5 py-12 bg-[#0A080C]">
        <div className="max-w-md mx-auto flex flex-col gap-6">
          <div className="inline-block px-3 py-1 rounded-full bg-[#00F5FF]/20 border border-[#00F5FF]/40 text-[#00F5FF] font-mono-meta text-[10px] font-bold uppercase tracking-widest w-fit">
            03 — EXPERIENCE
          </div>

          <h2 className="font-playfair text-2xl font-black uppercase text-white leading-tight">
            10+ BRANDS. MANY DIFFERENT STORIES.
          </h2>

          <p className="text-xs text-white/80 leading-relaxed font-light">
            I’ve had the opportunity to create content across 10+ brands and multiple industries:
          </p>

          {/* Marquee Industry Badges */}
          <div className="flex flex-wrap gap-2 py-2">
            {[
              'Architecture',
              'Interior Design',
              'Wellness',
              'Food',
              'Jewellery',
              'Animation',
              'Pet & Dog Brands',
              'UGC',
              'YouTube & Long-form',
            ].map((ind, i) => (
              <span
                key={i}
                className="px-3 py-1.5 rounded-full bg-white/5 border border-white/15 text-[11px] font-semibold text-white/90"
              >
                ✦ {ind}
              </span>
            ))}
          </div>

          <div className="p-4 bg-[#150F1C] border-l-4 border-[#00F5FF] rounded-r-xl text-xs leading-relaxed text-white/90 italic">
            &ldquo;Different businesses. Different audiences. Different stories. But every project taught me the same thing: <span className="font-bold text-[#00F5FF] not-italic">Good content starts with understanding what makes a brand worth listening to.</span>&rdquo;
          </div>
        </div>
      </section>

      {/* --- SECTION 04: WHAT I’VE BUILT (METRICS) --- */}
      <section className="relative z-10 px-5 py-12 bg-[#0E0A12] border-y border-white/10">
        <div className="max-w-md mx-auto flex flex-col gap-6">
          <div className="inline-block px-3 py-1 rounded-full bg-[#FFD600]/20 border border-[#FFD600]/40 text-[#FFD600] font-mono-meta text-[10px] font-bold uppercase tracking-widest w-fit">
            04 — WHAT I’VE BUILT
          </div>

          <h2 className="font-playfair text-2xl font-black uppercase text-white leading-tight">
            AND I’VE SEEN WHAT HAPPENS WHEN AN IDEA CONNECTS.
          </h2>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-4 bg-[#150F1C] rounded-xl border border-white/10 flex flex-col gap-1">
              <span className="font-playfair text-2xl font-black text-[#FFD600]">4L+</span>
              <span className="font-mono-meta text-[10px] font-bold text-white uppercase">ORGANIC VIEWS</span>
              <span className="text-[10px] text-white/60">Social campaign</span>
            </div>

            <div className="p-4 bg-[#150F1C] rounded-xl border border-white/10 flex flex-col gap-1">
              <span className="font-playfair text-2xl font-black text-[#EC4899]">2L+</span>
              <span className="font-mono-meta text-[10px] font-bold text-white uppercase">ORGANIC VIEWS</span>
              <span className="text-[10px] text-white/60">Organic social content</span>
            </div>

            <div className="p-4 bg-[#150F1C] rounded-xl border border-white/10 flex flex-col gap-1 col-span-2">
              <span className="font-playfair text-lg font-black text-[#00F5FF]">LONG-FORM YOUTUBE</span>
              <span className="text-[11px] text-white/80">Storytelling, editing & production</span>
            </div>

            <div className="p-4 bg-[#150F1C] rounded-xl border border-white/10 flex flex-col gap-1 col-span-2">
              <span className="font-playfair text-lg font-black text-[#8B5CF6]">AI-POWERED VIDEO</span>
              <span className="text-[11px] text-white/80">Turning ideas and images into complete visual stories</span>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 05: WHAT I CAN DO FOR YOU --- */}
      <section className="relative z-10 px-5 py-12 bg-[#0A080c]">
        <div className="max-w-md mx-auto flex flex-col gap-6">
          <div className="inline-block px-3 py-1 rounded-full bg-[#EC4899]/20 border border-[#EC4899]/40 text-[#FFB3CB] font-mono-meta text-[10px] font-bold uppercase tracking-widest w-fit">
            05 — SERVICES
          </div>

          <h2 className="font-playfair text-2xl font-black uppercase text-white leading-tight">
            FROM “WHAT SHOULD I POST?” TO “LET’S MAKE IT.”
          </h2>

          <div className="flex flex-col gap-3">
            {[
              {
                title: 'CONTENT STRATEGY',
                desc: 'Finding what your brand should actually be saying — from content pillars and ideas to hooks, angles and direction.',
                icon: '🎯',
              },
              {
                title: 'AI VIDEO',
                desc: 'Turn a product, photograph, concept or simple idea into an entire visual story.',
                icon: '🤖',
              },
              {
                title: 'VIDEO EDITING',
                desc: 'Turn raw footage into engaging short-form, social and long-form content.',
                icon: '🎬',
              },
              {
                title: 'UGC',
                desc: 'Create relatable, creator-led content that feels natural to the platform and the people watching it.',
                icon: '🤳',
              },
              {
                title: 'STORYTELLING',
                desc: 'Find the story hiding inside your business and turn it into something people want to hear.',
                icon: '📖',
              },
              {
                title: 'CONTENT CREATION',
                desc: 'Take an idea from the first thought to the finished piece — strategy, scripting, creation and execution.',
                icon: '✨',
              },
            ].map((srv, i) => (
              <div key={i} className="p-4 bg-[#150F1C] rounded-xl border border-white/10 flex flex-col gap-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-base">{srv.icon}</span>
                  <h3 className="font-mono-meta text-xs font-bold uppercase tracking-wider text-white">
                    {srv.title}
                  </h3>
                </div>
                <p className="text-xs text-white/70 leading-relaxed font-light">{srv.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SECTION 06: THE DIFFERENCE --- */}
      <section className="relative z-10 px-5 py-12 bg-[#0E0A12] border-y border-white/10">
        <div className="max-w-md mx-auto flex flex-col gap-6 text-center">
          <div className="inline-block px-3 py-1 rounded-full bg-[#00F5FF]/20 border border-[#00F5FF]/40 text-[#00F5FF] font-mono-meta text-[10px] font-bold uppercase tracking-widest w-fit mx-auto">
            06 — THE DIFFERENCE
          </div>

          <h2 className="font-playfair text-2xl font-black uppercase text-white leading-tight">
            I DON’T WANT TO MAKE CONTENT FOR YOU. I WANT TO FIND YOUR CONTENT.
          </h2>

          <p className="text-xs text-white/80 leading-relaxed font-light">
            There’s a difference. Making content is easy. Finding the right story, the right angle and the right way to communicate it — that’s the interesting part.
          </p>

          <p className="text-xs text-white/80 leading-relaxed font-light">
            I want to understand your business, your personality, your audience and what you’re trying to say. Then we make something that feels like you, not something copied from everyone else.
          </p>

          <div className="p-4 bg-gradient-to-r from-[#EC4899]/30 via-[#8B5CF6]/30 to-[#00F5FF]/30 rounded-xl border border-white/20 font-black text-xs uppercase tracking-widest text-white shadow-xl">
            STRATEGY + CREATIVITY + EXECUTION.
          </div>
        </div>
      </section>

      {/* --- SECTION 07: WHY WORK WITH ME? --- */}
      <section className="relative z-10 px-5 py-12 bg-[#0A080C]">
        <div className="max-w-md mx-auto flex flex-col gap-6">
          <div className="inline-block px-3 py-1 rounded-full bg-[#FFD600]/20 border border-[#FFD600]/40 text-[#FFD600] font-mono-meta text-[10px] font-bold uppercase tracking-widest w-fit">
            07 — WHY WORK WITH ME?
          </div>

          <h2 className="font-playfair text-2xl font-black uppercase text-white leading-tight">
            BEYOND THE CONTENT, HERE’S WHAT YOU GET.
          </h2>

          <div className="flex flex-col gap-4">
            <div className="p-4 bg-[#150F1C] rounded-xl border border-white/10 flex flex-col gap-2">
              <h3 className="font-mono-meta text-xs font-bold text-[#FFD600] uppercase tracking-wider">
                01 — I ACTUALLY LISTEN.
              </h3>
              <p className="text-xs text-white/80 leading-relaxed font-light">
                Not just to your brief — to you. I’ll take the time to understand what you’re imagining, what you’re trying to communicate and what you don’t want your brand to become.
              </p>
              <p className="text-xs italic text-white/60">
                &ldquo;Sometimes the best content idea isn’t in the brief. It’s somewhere in the conversation.&rdquo;
              </p>
            </div>

            <div className="p-4 bg-[#150F1C] rounded-xl border border-white/10 flex flex-col gap-2">
              <h3 className="font-mono-meta text-xs font-bold text-[#EC4899] uppercase tracking-wider">
                02 — I’M IN YOUR CORNER.
              </h3>
              <p className="text-xs text-white/80 leading-relaxed font-light">
                Whether a video gets 10 views or 10 lakh, I’ll still be rooting for you. Content creation is unpredictable. Sometimes you nail it. Sometimes the algorithm has other plans.
              </p>
              <p className="text-xs text-[#EC4899] font-semibold">
                But the effort, the learning and the next idea? I’ll be there for all of it.
              </p>
            </div>

            <div className="p-4 bg-[#150F1C] rounded-xl border border-white/10 flex flex-col gap-2">
              <h3 className="font-mono-meta text-xs font-bold text-[#00F5FF] uppercase tracking-wider">
                03 — I CARE ABOUT THE WHY.
              </h3>
              <p className="text-xs text-white/80 leading-relaxed font-light">
                I don’t want to make something that simply looks good. I want to know: Why are we making this? Who is it for? What should they feel?
              </p>
            </div>

            <div className="p-4 bg-[#150F1C] rounded-xl border border-white/10 flex flex-col gap-2">
              <h3 className="font-mono-meta text-xs font-bold text-[#8B5CF6] uppercase tracking-wider">
                04 — I KEEP IT COST-EFFECTIVE.
              </h3>
              <p className="text-xs text-white/80 leading-relaxed font-light">
                You don’t need a massive production house to make great content. By combining AI, editing, UGC, strategy and creative execution, I can keep the process lean.
              </p>
              <span className="font-mono-meta text-[10px] font-bold text-[#8B5CF6] uppercase tracking-widest">
                SMALLER PROCESS. BIGGER POSSIBILITIES.
              </span>
            </div>

            <div className="p-4 bg-[#150F1C] rounded-xl border border-white/10 flex flex-col gap-2">
              <h3 className="font-mono-meta text-xs font-bold text-[#FFD600] uppercase tracking-wider">
                05 — I’M HERE FOR THE LONG GAME.
              </h3>
              <p className="text-xs text-white/80 leading-relaxed font-light">
                I’m not interested in making one reel and disappearing. I’ll learn your brand. I’ll understand your audience. I’ll learn what works and what doesn’t.
              </p>
              <span className="font-mono-meta text-[10px] font-bold text-[#FFD600] uppercase tracking-widest">
                GOOD CONTENT ISN’T BUILT IN ONE POST.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 08: HOW WE WORK --- */}
      <section className="relative z-10 px-5 py-12 bg-[#0E0A12] border-y border-white/10">
        <div className="max-w-md mx-auto flex flex-col gap-6">
          <div className="inline-block px-3 py-1 rounded-full bg-[#EC4899]/20 border border-[#EC4899]/40 text-[#FFB3CB] font-mono-meta text-[10px] font-bold uppercase tracking-widest w-fit">
            08 — HOW WE WORK
          </div>

          <h2 className="font-playfair text-2xl font-black uppercase text-white leading-tight">
            FROM IDEA TO “LET’S POST IT.”
          </h2>

          <div className="grid grid-cols-1 gap-3">
            {[
              { num: '01', name: 'TALK', desc: 'Tell me about your business, your audience and what you’re trying to achieve.' },
              { num: '02', name: 'FIND', desc: 'We figure out what your brand should actually be saying.' },
              { num: '03', name: 'CREATE', desc: 'Strategy, scripting, UGC, AI, shooting, editing and storytelling — whatever the idea needs.' },
              { num: '04', name: 'DELIVER', desc: 'You get content that’s ready to publish and actually feels like your brand.' },
            ].map((step, i) => (
              <div key={i} className="p-4 bg-[#150F1C] rounded-xl border border-white/10 flex items-start gap-4">
                <span className="font-playfair text-2xl font-black text-[#EC4899]">{step.num}</span>
                <div className="flex flex-col gap-1">
                  <h3 className="font-mono-meta text-xs font-bold uppercase tracking-wider text-white">
                    {step.name}
                  </h3>
                  <p className="text-xs text-white/70 font-light">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SECTION 09: PORTFOLIO --- */}
      <section className="relative z-10 px-5 py-12 bg-[#0A080C]">
        <div className="max-w-md mx-auto flex flex-col gap-6">
          <div className="inline-block px-3 py-1 rounded-full bg-[#00F5FF]/20 border border-[#00F5FF]/40 text-[#00F5FF] font-mono-meta text-[10px] font-bold uppercase tracking-widest w-fit">
            09 — PORTFOLIO
          </div>

          <h2 className="font-playfair text-2xl font-black uppercase text-white leading-tight">
            SOME THINGS I’VE MADE.
          </h2>

          {/* Category Filter Chips */}
          <div className="flex flex-wrap gap-1.5">
            {['ALL', 'AI VIDEO', 'SOCIAL CONTENT', 'VIDEO EDITING', 'UGC', 'YOUTUBE', 'LONG-FORM'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase transition-all ${
                  activeCategory === cat
                    ? 'bg-[#00F5FF] text-[#0A0A0A] shadow-[0_0_12px_rgba(0,245,255,0.6)]'
                    : 'bg-white/5 text-white/70 border border-white/10 hover:bg-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Project List */}
          <div className="flex flex-col gap-3">
            {filteredProjects.map((p) => (
              <div key={p.id} className="p-4 bg-[#150F1C] rounded-xl border border-white/10 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono-meta text-[9px] font-bold uppercase tracking-widest text-[#00F5FF] px-2 py-0.5 rounded bg-[#00F5FF]/10">
                    {p.tag}
                  </span>
                  <span className="text-[10px] text-white/50">{p.category}</span>
                </div>
                <h3 className="font-playfair text-base font-bold text-white">{p.title}</h3>
                <p className="text-xs text-white/70 font-light">{p.desc}</p>
                <button
                  onClick={scrollToContact}
                  className="text-left text-[11px] font-bold text-[#00F5FF] uppercase tracking-wider hover:underline pt-1"
                >
                  VIEW PROJECT →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SECTION 10: ABOUT ARI --- */}
      <section className="relative z-10 px-5 py-12 bg-[#0E0A12] border-y border-white/10">
        <div className="max-w-md mx-auto flex flex-col gap-6">
          <div className="inline-block px-3 py-1 rounded-full bg-[#FFD600]/20 border border-[#FFD600]/40 text-[#FFD600] font-mono-meta text-[10px] font-bold uppercase tracking-widest w-fit">
            10 — ABOUT ARI
          </div>

          <h2 className="font-playfair text-2xl font-black uppercase text-white leading-tight">
            A LITTLE ABOUT ME.
          </h2>

          <div className="flex flex-col gap-3 text-xs text-white/80 leading-relaxed font-light">
            <p>
              I’m Ari — a creator working at the intersection of content, storytelling, video and AI.
            </p>
            <p>
              I started with animation and filmmaking and eventually moved into content creation, editing, social media and AI-powered production.
            </p>
            <p>
              I’ve always loved the process of taking something that exists only as an idea and turning it into something you can actually see, feel and share.
            </p>
            <p>
              Today, I bring all of those skills together to help businesses create content that feels intentional, creative and genuinely theirs.
            </p>
            <div className="p-3 bg-[#150F1C] border-l-4 border-[#FFD600] text-[#FFD600] font-bold italic not-italic">
              &ldquo;I’m not here to make your brand look like everyone else’s. I’m here to help you make it look like you.&rdquo;
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 11: THE PHILOSOPHY (INTERACTIVE DICE ROLL 🎲 GAME) --- */}
      <section className="relative z-10 px-5 py-12 bg-[#0A080C]">
        <div className="max-w-md mx-auto flex flex-col gap-6 text-center">
          <div className="inline-block px-3 py-1 rounded-full bg-[#EC4899]/20 border border-[#EC4899]/40 text-[#FFB3CB] font-mono-meta text-[10px] font-bold uppercase tracking-widest w-fit mx-auto">
            11 — THE PHILOSOPHY
          </div>

          <h2 className="font-playfair text-2xl font-black uppercase text-white leading-tight">
            CONTENT IS A DICEY GAME. 🎲
          </h2>

          {/* Interactive Dice Roller Card */}
          <div className="p-5 bg-[#150F1C] rounded-2xl border border-[#EC4899]/40 flex flex-col items-center gap-4 shadow-[0_0_30px_rgba(236,72,153,0.2)]">
            <motion.div
              animate={{ rotate: isRolling ? 360 : 0 }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
              onClick={handleRollDice}
              className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#EC4899] to-[#FFD600] flex items-center justify-center text-3xl shadow-xl cursor-pointer select-none"
            >
              🎲
            </motion.div>

            <button
              onClick={handleRollDice}
              className="px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-[10px] font-bold uppercase tracking-widest text-white border border-white/20"
            >
              TAP TO ROLL THE DICE 🎲
            </button>

            <AnimatePresence mode="wait">
              <motion.p
                key={diceIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="text-xs text-white/90 font-medium italic leading-relaxed max-w-xs"
              >
                &ldquo;{DICE_QUOTES[diceIndex]}&rdquo;
              </motion.p>
            </AnimatePresence>
          </div>

          <div className="flex flex-col gap-3 text-xs text-white/70 leading-relaxed font-light">
            <p>You never really know what’s going to happen. Every post is another chance. Every idea is another roll.</p>
            <p>And somewhere between the flops, the experiments, and the jackpot moments — you find what makes people care.</p>
          </div>

          <h3 className="font-playfair text-xl font-black uppercase text-[#FFD600] tracking-wider">
            SO, SHALL WE ROLL? 🎲
          </h3>
        </div>
      </section>

      {/* --- SECTION 12: FINAL CTA & SECTION 13: CONTACT FORM --- */}
      <section id="contact-section" className="relative z-10 px-5 py-12 bg-[#0E0A12] border-t border-white/10">
        <div className="max-w-md mx-auto flex flex-col gap-6">
          <div className="inline-block px-3 py-1 rounded-full bg-[#00F5FF]/20 border border-[#00F5FF]/40 text-[#00F5FF] font-mono-meta text-[10px] font-bold uppercase tracking-widest w-fit">
            12 — FINAL CTA & 13 — CONTACT
          </div>

          <h2 className="font-playfair text-2xl font-black uppercase text-white leading-tight">
            HAVE AN IDEA? LET’S MAKE IT REAL.
          </h2>

          <p className="text-xs text-white/80 font-light leading-relaxed">
            Whether you have a complete content plan or just a random idea sitting in your Notes app — send it my way.
          </p>

          {/* Interactive Form */}
          <form onSubmit={handleFormSubmit} className="flex flex-col gap-4 bg-[#150F1C] p-5 rounded-2xl border border-white/10">
            {formSubmitted ? (
              <div className="p-4 bg-[#00F5FF]/20 border border-[#00F5FF] rounded-xl text-center flex flex-col gap-2">
                <span className="text-2xl">🎉</span>
                <p className="font-bold text-white text-xs uppercase tracking-wider">Message Received!</p>
                <p className="text-[11px] text-white/80">I&apos;ll get back to you within 24 hours.</p>
              </div>
            ) : (
              <>
                <div className="flex flex-col gap-1 text-left">
                  <label className="font-mono-meta text-[10px] font-bold uppercase tracking-widest text-white/70">
                    YOUR NAME
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/15 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#00F5FF]"
                  />
                </div>

                <div className="flex flex-col gap-1 text-left">
                  <label className="font-mono-meta text-[10px] font-bold uppercase tracking-widest text-white/70">
                    YOUR EMAIL
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/15 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#00F5FF]"
                  />
                </div>

                <div className="flex flex-col gap-1 text-left">
                  <label className="font-mono-meta text-[10px] font-bold uppercase tracking-widest text-white/70">
                    WHAT DO YOU NEED HELP WITH?
                  </label>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {['AI VIDEO', 'STRATEGY', 'VIDEO EDITING', 'UGC', 'STORYTELLING'].map((srv) => (
                      <button
                        type="button"
                        key={srv}
                        onClick={() => setFormData({ ...formData, service: srv })}
                        className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase transition-all ${
                          formData.service === srv
                            ? 'bg-[#E91E8C] text-white shadow-md'
                            : 'bg-white/5 text-white/60 border border-white/10'
                        }`}
                      >
                        {srv}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-1 text-left">
                  <label className="font-mono-meta text-[10px] font-bold uppercase tracking-widest text-white/70">
                    TELL ME ABOUT YOUR PROJECT
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Share your goals or notes..."
                    value={formData.details}
                    onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/15 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#00F5FF] resize-none"
                  />
                </div>

                <div className="flex flex-col gap-1 text-left">
                  <label className="font-mono-meta text-[10px] font-bold uppercase tracking-widest text-white/70">
                    BUDGET / RANGE
                  </label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#150F1C] border border-white/15 text-xs text-white focus:outline-none focus:border-[#00F5FF]"
                  >
                    <option value="< $1,000">&lt; $1,000</option>
                    <option value="$1,000 - $3,000">$1,000 - $3,000</option>
                    <option value="$3,000 - $5,000">$3,000 - $5,000</option>
                    <option value="$5,000+">$5,000+</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="btn-gradient w-full py-3.5 rounded-xl font-bold uppercase tracking-widest text-xs text-white shadow-[0_4px_25px_rgba(233,30,140,0.6)] mt-2"
                >
                  SEND IT MY WAY →
                </button>
              </>
            )}
          </form>
        </div>
      </section>

      {/* --- SECTION 14: FOOTER --- */}
      <footer className="relative z-10 px-5 py-10 bg-[#0A080C] text-center flex flex-col items-center gap-4">
        <h3 className="font-playfair text-3xl font-black tracking-widest text-white uppercase">ARI</h3>
        <p className="font-mono-meta text-[10px] font-bold uppercase tracking-widest text-white/50">
          AI VIDEO · CONTENT · EDITING · UGC · STRATEGY
        </p>

        <div className="flex items-center justify-center gap-4 text-xs font-semibold text-[#00F5FF]">
          <a href="#" className="hover:underline">Instagram</a>
          <span>·</span>
          <a href="#" className="hover:underline">YouTube</a>
          <span>·</span>
          <a href="#" className="hover:underline">LinkedIn</a>
          <span>·</span>
          <a href="#" className="hover:underline">Email</a>
        </div>

        <p className="text-[10px] text-white/30 pt-2 font-mono-meta">© 2026 ARI. ALL RIGHTS RESERVED.</p>
      </footer>
    </div>
  );
};
