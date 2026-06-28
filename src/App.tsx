/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { countdownDays } from './data/countdownDays';
import { DayDetailsCard } from './components/DayDetailsCard';
import { IntroScreen } from './components/IntroScreen';
import { BougainvilleaRain } from './components/BougainvilleaRain';
import { MusicPlayer } from './components/MusicPlayer';
import { 
  Sparkles, Heart, Compass, Calendar, Gift, HelpCircle, 
  ChevronRight, Smile, Map, BookOpen, Clock 
} from 'lucide-react';

export default function App() {
  const [isEntered, setIsEntered] = useState<boolean>(false);
  const [selectedDayIdx, setSelectedDayIdx] = useState<number>(0);
  const [forceUnlockAll, setForceUnlockAll] = useState<boolean>(true); // Enabled by default to bypass May/June restrictions!
  const [activeTab, setActiveTab] = useState<'journey' | 'about_her'>('journey');

  const selectedDay = countdownDays[selectedDayIdx];

  // Auto-align index to the current calendar day if available, else default to 0
  useEffect(() => {
    const today = new Date();
    const curMonth = today.getMonth(); // 6 = July
    const curDate = today.getDate();
    const curYear = today.getFullYear();

    if (curYear === 2026 && curMonth === 6 && curDate >= 1 && curDate <= 10) {
      setSelectedDayIdx(curDate - 1);
    }
  }, []);

  // Soft helper to check if a specific day is naturally unlocked based on computer clock
  const isDayNaturallyUnlocked = (dayNum: number): boolean => {
    const today = new Date();
    const curMonth = today.getMonth(); // 0-indexed, 6 = July
    const curDate = today.getDate();
    const curYear = today.getFullYear();

    if (curYear > 2026) return true;
    if (curYear === 2026) {
      if (curMonth > 6) return true; // August+
      if (curMonth === 6) {
        return curDate >= dayNum; // July day match
      }
    }
    return false; // Earlier than July 1st, 2026
  };

  const handleNextDay = () => {
    if (selectedDayIdx < countdownDays.length - 1) {
      setSelectedDayIdx(prev => prev + 1);
    }
  };

  const handlePrevDay = () => {
    if (selectedDayIdx > 0) {
      setSelectedDayIdx(prev => prev - 1);
    }
  };

  return (
    <div className="relative min-h-screen w-full font-poppins text-slate-800 transition-colors duration-1000 overflow-x-hidden selection:bg-pink-200">
      
      {/* Background Bougainvillea Floating Flower Engine */}
      {isEntered && <BougainvilleaRain themeType={selectedDay.colorTheme.bougainvilleaType} />}

      {/* Dynamic Background Gradient shifting based on active chapter theme */}
      <div 
        className={`absolute inset-0 bg-gradient-to-tr transition-all duration-1000 ease-in-out -z-20 ${
          isEntered 
            ? selectedDay.colorTheme.bgGradient 
            : 'from-[#2a0845]/5 via-[#64173e]/5 to-[#b83b5e]/5'
        }`} 
      />

      {/* Ambient background blur elements for scrapbook cozy texture */}
      {isEntered && (
        <>
          <div className="absolute top-1/3 left-10 w-72 h-72 rounded-full bg-pink-400/5 blur-[90px] -z-10" />
          <div className="absolute bottom-1/4 right-10 w-96 h-96 rounded-full bg-purple-400/5 blur-[120px] -z-10" />
        </>
      )}

      <AnimatePresence mode="wait">
        {!isEntered ? (
          /* INTRO / COUNTDOWN TIMER ENTRY POINT */
          <motion.div 
            key="intro"
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8 }}
          >
            <IntroScreen onEnter={() => setIsEntered(true)} />
          </motion.div>
        ) : (
          /* MAIN COUNTDOWN EXPERIENCE SCRAPBOOK */
          <motion.div
            key="scrapbook-main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full flex flex-col items-center py-6 px-4 md:px-8 relative"
          >
            {/* FLOATING HEADER BAR & MUSIC TOGGLE DOCK */}
            <MusicPlayer />

            {/* HEADER DESIGN: PORTAL CONTROLLER & TIMER */}
            <header className="w-full max-w-4xl flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 border-b border-pink-100/30 pb-6">
              <div className="flex items-center gap-3">
                {/* Custom glowing heart app icon */}
                <div className="w-10 h-10 rounded-full bg-[#e25875] flex items-center justify-center text-white shadow-md shadow-pink-500/10 z-20">
                  <Heart size={18} className="fill-white" />
                </div>
                <div>
                  <h1 className="text-sm font-serif-elegant font-bold tracking-wider text-slate-800">
                    Ammu Sagufta
                  </h1>
                  <span className="text-[10px] font-mono tracking-widest text-[#e25875] uppercase block">
                    Birthday Chronicles 💛
                  </span>
                </div>
              </div>

              {/* TIMEPASS POCKET WATCH: DATE LOCK BYPASS CONTROLS */}
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-2.5 px-4   bg-white/75 backdrop-blur-md border border-pink-100/50 rounded-full shadow-sm pr-2 text-xs select-none"
              >
                <div className="flex items-center gap-1.5 py-2 pl-1">
                  <Clock size={13} className="text-[#e25875]" />
                  <span className="text-slate-600 font-medium">Chintu's Pocket Watch:</span>
                </div>
                <button
                  onClick={() => setForceUnlockAll(!forceUnlockAll)}
                  className={`px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                    forceUnlockAll 
                      ? 'bg-amber-100 text-amber-700 shadow-sm border border-amber-200' 
                      : 'bg-slate-100 text-slate-500'
                  }`}
                  id="magic-clock-bypass"
                >
                  {forceUnlockAll ? '⏳ Dream Portal On' : '🔒 Strict Date'}
                </button>
              </motion.div>
            </header>

            {/* DYNAMIC CARD-HOLDER SELECTOR SLIDER: THE 10 ENVELOPE SECTIONS */}
            <div className="w-full max-w-4xl mb-4">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono tracking-widest text-slate-400 uppercase flex items-center gap-1">
                  <Compass size={12} className="text-[#e25875]" /> Select Secret Chapters ✦
                </span>
                <span className="text-xs font-mono text-slate-400">
                  {selectedDayIdx + 1} of 10 Unlocked
                </span>
              </div>

              {/* Scrollable List of Envelopes */}
              <div className="flex gap-2.5 overflow-x-auto pb-4 pt-1 snap-x scrollbar-thin scrollbar-thumb-pink-200 scrollbar-track-transparent">
                {countdownDays.map((dayData, idx) => {
                  const isCur = selectedDayIdx === idx;
                  const unlocked = forceUnlockAll || isDayNaturallyUnlocked(dayData.dayNumber);

                  return (
                    <button
                      key={dayData.dayNumber}
                      onClick={() => setSelectedDayIdx(idx)}
                      className={`flex-none snap-start w-20 sm:w-24 py-3 rounded-2xl border transition-all flex flex-col items-center justify-center cursor-pointer relative ${
                        isCur 
                          ? 'bg-[#e25875] text-white border-transparent shadow-md shadow-pink-500/10 scale-103' 
                          : unlocked 
                            ? 'bg-white hover:bg-slate-50 text-slate-700 border-pink-100/40 shadow-sm'
                            : 'bg-slate-100/60 text-slate-400 border-slate-200'
                      }`}
                    >
                      {/* Chapter Indicator label */}
                      <span className={`text-[9px] font-mono tracking-widest uppercase block mb-1 ${isCur ? 'text-pink-100' : 'text-slate-400'}`}>
                        Day {dayData.dayNumber}
                      </span>

                      {/* Small visual icons corresponding to lock statuses */}
                      {unlocked ? (
                        idx === 9 ? (
                          <Gift size={16} className={isCur ? 'text-yellow-200 animate-bounce' : 'text-amber-500'} />
                        ) : (
                          <Heart size={14} className={isCur ? 'fill-white text-white animate-pulse' : 'text-[#e25875] fill-pink-50'} />
                        )
                      ) : (
                        <span className="text-slate-400 text-xs">🔒</span>
                      )}

                      {/* Small indicator light */}
                      {isCur && (
                        <span className="absolute bottom-1 w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ACTIVE DAY DETAILS CARD WITH RE-RENDER ANIMATION */}
            <div className="w-full flex justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedDayIdx}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.55 }}
                  className="w-full flex justify-center"
                >
                  <DayDetailsCard 
                    day={selectedDay}
                    isUnlocked={isDayNaturallyUnlocked(selectedDay.dayNumber)}
                    onNavigateNext={handleNextDay}
                    onNavigatePrev={handlePrevDay}
                    isFirst={selectedDayIdx === 0}
                    isLast={selectedDayIdx === countdownDays.length - 1}
                    forceUnlockActive={forceUnlockAll}
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* CENTRAL SYSTEM FOOTER LABELS AND LOVE MESSAGES */}
            <footer className="w-full max-w-4xl mt-12 mb-8 pt-6 border-t border-pink-100/35 flex flex-col sm:flex-row items-center justify-between text-center gap-4">
              <div>
                <span className="font-handwritten text-lg text-[#e25875] select-none block">
                  "Tumhari smile honestly duniya ka cutest thing hai."
                </span>
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mt-1 block">
                  Every rose petal sings of you.
                </span>
              </div>
              <div className="text-xs font-mono text-slate-400 select-none">
                Made with 💛 and Bougainvillea by <strong className="text-slate-600 font-semibold">Chintu</strong> for <strong className="text-[#e25875] font-semibold">Ammu Sagufta</strong>
              </div>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
