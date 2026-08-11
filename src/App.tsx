import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface WordItem {
  text: string;
  isEmphasized?: boolean;
}

interface SentenceStep {
  words: WordItem[];
}

const SEQUENCE: SentenceStep[] = [
  // Initial
  {
    words: [{ text: 'Hey' }],
  },
  // Tap 1
  {
    words: [
      { text: 'What' },
      { text: 'does' },
      { text: 'your' },
      { text: 'BRAND', isEmphasized: true },
      { text: 'look' },
      { text: 'like' },
    ],
  },
  // Tap 2
  {
    words: [
      { text: 'Or' },
      { text: 'sound' },
      { text: 'like' },
    ],
  },
  // Tap 3
  {
    words: [
      { text: 'No' },
      { text: 'seriously!!' },
    ],
  },
  // Tap 4
  {
    words: [
      { text: "Don't" },
      { text: 'just' },
      { text: 'skim' },
      { text: 'past' },
      { text: 'this' },
      { text: 'question.' },
    ],
  },
];

export function App() {
  const [sentenceIdx, setSentenceIdx] = useState(0);
  const [visibleCount, setVisibleCount] = useState(1);
  const [isRevealing, setIsRevealing] = useState(false);
  const revealTimerRef = useRef<NodeJS.Timeout | null>(null);

  const currentSentence = SEQUENCE[sentenceIdx];
  const isLastSentence = sentenceIdx === SEQUENCE.length - 1;

  const triggerNextSentence = (nextIdx: number) => {
    if (revealTimerRef.current) clearInterval(revealTimerRef.current);

    setSentenceIdx(nextIdx);
    setVisibleCount(1);
    setIsRevealing(true);

    const targetWords = SEQUENCE[nextIdx].words.length;
    let count = 1;

    revealTimerRef.current = setInterval(() => {
      count += 1;
      setVisibleCount(count);
      if (count >= targetWords) {
        if (revealTimerRef.current) clearInterval(revealTimerRef.current);
        setIsRevealing(false);
      }
    }, 220); // 220ms word cadence
  };

  const handleScreenClick = () => {
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
      onClick={handleScreenClick}
      className="w-screen h-screen bg-black text-white flex items-center justify-center p-6 cursor-pointer select-none overflow-hidden font-editorial"
    >
      <div className="w-full max-w-5xl mx-auto text-center flex items-center justify-center">
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-center leading-tight flex flex-wrap items-center justify-center gap-x-3.5 sm:gap-x-5 gap-y-2">
          {currentSentence.words.slice(0, visibleCount).map((wordObj, i) => {
            const isNewest = i === visibleCount - 1;

            if (wordObj.isEmphasized) {
              return (
                <motion.span
                  key={`${sentenceIdx}-${i}`}
                  initial={isNewest ? { opacity: 0, scale: 0.97 } : { opacity: 1, scale: 1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                  className="font-extrabold text-[#FF3B30] tracking-wider relative inline-block uppercase"
                >
                  {wordObj.text}
                </motion.span>
              );
            }

            return (
              <motion.span
                key={`${sentenceIdx}-${i}`}
                initial={isNewest ? { opacity: 0, scale: 0.97 } : { opacity: 1, scale: 1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                className="text-white font-medium inline-block"
              >
                {wordObj.text}
              </motion.span>
            );
          })}
        </h1>
      </div>
    </div>
  );
}

export default App;
