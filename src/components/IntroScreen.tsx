/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart, Play, Clock } from 'lucide-react';

interface IntroScreenProps {
  onEnter: () => void;
}

export const IntroScreen: React.FC<IntroScreenProps> = ({ onEnter }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [loadStage, setLoadStage] = useState<number>(0);
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const loadingTexts = [
    'Preparing secret envelopes... 💌',
    'Watering the bougainvillea gardens... 🌸',
    'Polishing old romantic Kolkata memories... 🚕',
    'Tuning the ambient strings in Hyderabad... 🎻',
    'Almost ready to make Ammu Sagufta smile... 💛',
  ];

  // Loading Screen Progression
  useEffect(() => {
    const textInterval = setInterval(() => {
      setLoadStage((prev) => {
        if (prev < loadingTexts.length - 1) {
          return prev + 1;
        }
        clearInterval(textInterval);
        return prev;
      });
    }, 1100);

    const finishTimeout = setTimeout(() => {
      setLoading(false);
    }, 5500);

    return () => {
      clearInterval(textInterval);
      clearTimeout(finishTimeout);
    };
  }, []);

  // Real-Time Countdown to July 10, 2026
  useEffect(() => {
    const targetDate = new Date('2026-07-10T00:00:00').getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        // If passed, display zero or calculate next year's countdown
        setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeRemaining({ days, hours, minutes, seconds });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleStart = () => {
    onEnter();
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden font-poppins selection:bg-pink-100 select-none">
      {/* Background gradients resembling warm sunset gold mixed with romantic purple */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#2a0845] via-[#64173e] to-[#b83b5e]" />
      
      {/* Absolute floating warm circular blur overlay */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-pink-500/10 blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-yellow-500/10 blur-[120px]" />

      <AnimatePresence mode="wait">
        {loading ? (
          /* CINEMATIC BLOOM LOADING SCREEN */
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="absolute inset-0 bg-[#120024] flex flex-col items-center justify-center px-6 z-50"
          >
            <div className="relative flex flex-col items-center max-w-sm text-center">
              {/* Petal Blooming Animated Emblem */}
              <div className="relative w-28 h-28 mb-10 flex items-center justify-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-0 rounded-full border border-dashed border-[#ffb7c5]/30"
                />
                
                {/* Nested pulsating glowing heart flower outline */}
                <motion.div
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#e25875] to-[#ffb7c5] flex items-center justify-center shadow-xl shadow-pink-500/20"
                >
                  <Heart size={28} className="text-white fill-white/10" />
                </motion.div>

                {/* Sparkling dots */}
                <span className="absolute top-2 left-6 w-1.5 h-1.5 rounded-full bg-amber-200 animate-ping" />
                <span className="absolute bottom-4 right-5 w-2 h-2 rounded-full bg-pink-300 animate-pulse" />
              </div>

              {/* Progress Text with high-contrast gold/lavender glow */}
              <AnimatePresence mode="wait">
                <motion.p
                  key={loadStage}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                  className="text-pink-100/90 text-sm md:text-base font-light tracking-wide min-h-6 font-space"
                >
                  {loadingTexts[loadStage]}
                </motion.p>
              </AnimatePresence>

              {/* Bottom luxury signature */}
              <div className="absolute bottom-[-140px] text-white/20 text-xs tracking-widest font-mono uppercase">
                A Scrapbook of Hearts
              </div>
            </div>
          </motion.div>
        ) : (
          /* FULL HERO CINEMATIC HERO SCREEN */
          <motion.div
            key="hero"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full max-w-4xl px-6 md:px-12 py-16 flex flex-col items-center text-center z-25 relative"
          >
            {/* Elegant luxury badge overlay */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="mb-6 px-4 py-1.5 rounded-full bg-[#3d122d]/60 border border-[#ffccd5]/20 backdrop-blur-md flex items-center gap-2"
            >
              <Sparkles size={14} className="text-amber-300" />
              <span className="text-[#ffccd5] text-xs font-space tracking-widest uppercase font-medium">
                Kolkata Elegance & Soft Romance
              </span>
            </motion.div>

            {/* Giant display title */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold text-white tracking-tight leading-none mb-6">
              <span className="font-serif-elegant font-medium italic block text-[#ffa6b6] drop-shadow-md">To the prettiest soul</span>
              <span className="font-loveletter text-5xl sm:text-7xl md:text-8xl text-amber-200 block mt-1 drop-shadow-lg tracking-wide hover:scale-105 transition-transform duration-500">
                Ammu Sagufta ✨
              </span>
            </h1>

            {/* Explanatory romantic subtitle */}
            <p className="text-pink-100/80 text-sm sm:text-base md:text-lg max-w-xl mb-12 font-light leading-relaxed">
              “A small journey of memories, feelings, and little surprises leading to your birthday.”
            </p>

            {/* Interactive countdown clock container */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="w-full max-w-lg bg-black/25 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/5 shadow-2xl mb-12"
            >
              <div className="flex items-center justify-center gap-2 mb-4 text-[#ffccd5]/70 text-xs font-mono uppercase tracking-widest">
                <Clock size={12} className="text-pink-400" />
                <span>Countdown to July 10, 2026 🎂</span>
              </div>

              <div className="grid grid-cols-4 gap-3 sm:gap-6">
                <div className="flex flex-col items-center">
                  <span className="text-3xl sm:text-5xl font-semibold font-space text-amber-200 drop-shadow-sm">
                    {String(timeRemaining.days).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] sm:text-xs text-[#ffccd5]/65 font-mono uppercase tracking-wider mt-1">Days</span>
                </div>
                <div className="flex flex-col items-center border-l border-white/5">
                  <span className="text-3xl sm:text-5xl font-semibold font-space text-pink-200">
                    {String(timeRemaining.hours).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] sm:text-xs text-[#ffccd5]/65 font-mono uppercase tracking-wider mt-1">Hrs</span>
                </div>
                <div className="flex flex-col items-center border-l border-white/5">
                  <span className="text-3xl sm:text-5xl font-semibold font-space text-pink-200">
                    {String(timeRemaining.minutes).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] sm:text-xs text-[#ffccd5]/65 font-mono uppercase tracking-wider mt-1">Mins</span>
                </div>
                <div className="flex flex-col items-center border-l border-white/5">
                  <span className="text-3xl sm:text-5xl font-semibold font-space text-[#ffa6b6]">
                    {String(timeRemaining.seconds).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] sm:text-xs text-[#ffccd5]/65 font-mono uppercase tracking-wider mt-1">Secs</span>
                </div>
              </div>
            </motion.div>

            {/* Core Launch Button */}
            <motion.button
              onClick={handleStart}
              className="px-8 py-4 rounded-full bg-gradient-to-r from-[#e25875] to-[#f46b85] text-white font-medium shadow-xl shadow-pink-500/20 hover:shadow-pink-500/40 relative cursor-pointer group flex items-center gap-3 overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              id="begin-journey-btn"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-yellow-400 via-[#e25875] to-purple-600 opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
              <Heart size={18} className="fill-white animate-pulse text-white group-hover:scale-125 transition-transform" />
              <span className="text-base font-space font-medium tracking-wide">
                Begin the Journey 💌
              </span>
            </motion.button>

            {/* Tiny whisper note */}
            <p className="text-[#ffccd5]/40 text-[10px] mt-6 font-mono tracking-wide">
              *Playing background music upon click.*
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
export default IntroScreen;
