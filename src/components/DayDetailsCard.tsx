/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, Sparkles, MapPin, Calendar, Clock, Lock, 
  Unlock, Volume2, Smile, ArrowRight, BookOpen, Send, Map,
  Gift, ExternalLink
} from 'lucide-react';
import { DayData, MemorialStory, MoodboardItem, ParallelAdventure } from '../types';

const resolveImageUrl = (url: string | undefined): string => {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('/')) {
    return url;
  }
  return `/${url}`;
};

interface DayDetailsCardProps {
  day: DayData;
  isUnlocked: boolean;
  onNavigateNext: () => void;
  onNavigatePrev: () => void;
  isFirst: boolean;
  isLast: boolean;
  forceUnlockActive: boolean;
}

const playMeowSound = () => {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ac = new AudioContextClass();
    const now = ac.currentTime;
    
    const osc1 = ac.createOscillator();
    const osc2 = ac.createOscillator();
    const gainNode = ac.createGain();
    const filterNode = ac.createBiquadFilter();

    osc1.type = 'triangle';
    osc2.type = 'sine';

    osc1.frequency.setValueAtTime(580, now);
    osc1.frequency.exponentialRampToValueAtTime(820, now + 0.12);
    osc1.frequency.exponentialRampToValueAtTime(640, now + 0.35);

    osc2.frequency.setValueAtTime(570, now);
    osc2.frequency.exponentialRampToValueAtTime(810, now + 0.12);
    osc2.frequency.exponentialRampToValueAtTime(630, now + 0.35);

    filterNode.type = 'bandpass';
    filterNode.frequency.setValueAtTime(1000, now);
    filterNode.frequency.exponentialRampToValueAtTime(1400, now + 0.1);
    filterNode.frequency.exponentialRampToValueAtTime(850, now + 0.4);
    filterNode.Q.setValueAtTime(2.0, now);

    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(0.08, now + 0.04);
    gainNode.gain.exponentialRampToValueAtTime(0.05, now + 0.18);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.45);

    osc1.connect(filterNode);
    osc2.connect(filterNode);
    filterNode.connect(gainNode);
    gainNode.connect(ac.destination);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 0.5);
    osc2.stop(now + 0.5);
  } catch (error) {
    console.warn("Failed to play meow sound procedurally", error);
  }
};

const playPurrSound = () => {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ac = new AudioContextClass();
    const now = ac.currentTime;
    
    const osc = ac.createOscillator();
    const modulator = ac.createOscillator();
    const modGain = ac.createGain();
    const gainNode = ac.createGain();
    
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(45, now);
    
    modulator.type = 'sine';
    modulator.frequency.setValueAtTime(25, now);
    
    modGain.gain.setValueAtTime(10, now);
    
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(0.12, now + 0.1);
    gainNode.gain.linearRampToValueAtTime(0.12, now + 0.9);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);
    
    modulator.connect(modGain);
    modGain.connect(osc.frequency);
    osc.connect(gainNode);
    gainNode.connect(ac.destination);
    
    modulator.start(now);
    osc.start(now);
    
    modulator.stop(now + 1.2);
    osc.stop(now + 1.2);
  } catch (error) {
    console.warn("Failed to play purr", error);
  }
};

export const DayDetailsCard: React.FC<DayDetailsCardProps> = ({
  day,
  isUnlocked,
  onNavigateNext,
  onNavigatePrev,
  isFirst,
  isLast,
  forceUnlockActive,
}) => {
  // Local state for interactive modules
  const [smileQuotient, setSmileQuotient] = useState<number>(100);
  const [activePolaroid, setActivePolaroid] = useState<string | null>(null);
  const [flippedPolaroids, setFlippedPolaroids] = useState<Record<string, boolean>>({});
  const [activeVoiceClip, setActiveVoiceClip] = useState<number | null>(null);
  const [letterOpened, setLetterOpened] = useState<boolean>(false);
  const [activeUniverseIdx, setActiveUniverseIdx] = useState<number>(0);
  const [heartbeatActive, setHeartbeatActive] = useState<boolean>(false);
  const [scanProgress, setScanProgress] = useState<number>(0);
  const [scanMessage, setScanMessage] = useState<string>('Align finger on target and press...');

  // Minni Sagufta's Cat Interactive Section States
  const [minniPhase, setMinniPhase] = useState<'door' | 'intro' | 'play'>('door');
  const [currentMeowIdx, setCurrentMeowIdx] = useState<number>(0);
  const [showMeowBubble, setShowMeowBubble] = useState<boolean>(false);
  const [virtualHugActive, setVirtualHugActive] = useState<boolean>(false);
  const [yarnSpin, setYarnSpin] = useState<number>(0);
  const [unlockedEasterEgg, setUnlockedEasterEgg] = useState<boolean>(false);
  const [easterEggFound, setEasterEggFound] = useState<boolean>(false);

  // Station Meeting Day 5 Interactive States
  const [flowerPlaced, setFlowerPlaced] = useState<boolean>(false);
  const [activePhotoIdx, setActivePhotoIdx] = useState<number>(0);
  const [hugHeartRate, setHugHeartRate] = useState<number>(75);
  const [isHugHovered, setIsHugHovered] = useState<boolean>(false);
  const [cokeLevel, setCokeLevel] = useState<number>(100);
  const [chocolateBites, setChocolateBites] = useState<number>(0);
  const [showFullMeetupMessage, setShowFullMeetupMessage] = useState<boolean>(false);

  // Day 9 Interactive States for Goodness & Gift
  const [unboxedGift, setUnboxedGift] = useState<boolean>(false);
  const [giftTab, setGiftTab] = useState<'card' | 'stuffed' | 'flowers'>('card');
  const [stuffedPatted, setStuffedPatted] = useState<number>(0);
  const [sprinkledSparkles, setSprinkledSparkles] = useState<boolean>(false);

  // Day 6 Friendship Mixer States
  const [activeMixerIngredients, setActiveMixerIngredients] = useState<string[]>([]);
  const [isBrewing, setIsBrewing] = useState<boolean>(false);
  const [brewComplete, setBrewComplete] = useState<boolean>(false);

  // Day 6 Birthday Excitement States
  const [completedExcitementTasks, setCompletedExcitementTasks] = useState<string[]>([]);

  // Sound Synthesizers for Day 5
  const playCameraClick = () => {
    try {
      const ac = new (window.AudioContext || (window as any).webkitAudioContext)();
      const now = ac.currentTime;
      // White noise for shutter shhh
      const bufferSize = ac.sampleRate * 0.1;
      const buffer = ac.createBuffer(1, bufferSize, ac.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      const noise = ac.createBufferSource();
      noise.buffer = buffer;
      const filter = ac.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 1000;
      const gain = ac.createGain();
      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);
      
      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ac.destination);
      noise.start(now);
      
      // Metallic mechanical click tone
      const osc = ac.createOscillator();
      const clickGain = ac.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1200, now);
      osc.frequency.exponentialRampToValueAtTime(80, now + 0.05);
      clickGain.gain.setValueAtTime(0.08, now);
      clickGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);
      osc.connect(clickGain);
      clickGain.connect(ac.destination);
      osc.start(now);
      osc.stop(now + 0.06);
    } catch (e) {}
  };

  const playSparkleChime = () => {
    try {
      const ac = new (window.AudioContext || (window as any).webkitAudioContext)();
      const now = ac.currentTime;
      const frequencies = [523.25, 659.25, 783.99, 1046.50]; // Sweet C major arpeggio
      frequencies.forEach((f, idx) => {
        const osc = ac.createOscillator();
        const gain = ac.createGain();
        osc.type = 'sine';
        osc.frequency.value = f;
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.05, now + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.08 + 0.4);
        osc.connect(gain);
        gain.connect(ac.destination);
        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.5);
      });
    } catch (e) {}
  };

  const playDrinkFizzy = () => {
    try {
      const ac = new (window.AudioContext || (window as any).webkitAudioContext)();
      const now = ac.currentTime;
      // High pitch pop-fizz using oscillator frequency modulation
      const osc = ac.createOscillator();
      const gain = ac.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(3000, now);
      osc.frequency.linearRampToValueAtTime(400, now + 0.25);
      gain.gain.setValueAtTime(0.03, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.25);
      osc.connect(gain);
      gain.connect(ac.destination);
      osc.start(now);
      osc.stop(now + 0.3);
    } catch (e) {}
  };

  const playHeartbeatThump = () => {
    try {
      const ac = new (window.AudioContext || (window as any).webkitAudioContext)();
      const now = ac.currentTime;
      
      const playThump = (time: number, isMajor: boolean) => {
        const osc = ac.createOscillator();
        const gain = ac.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(65, time);
        osc.frequency.exponentialRampToValueAtTime(20, time + 0.15);
        gain.gain.setValueAtTime(isMajor ? 0.35 : 0.2, time);
        gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.15);
        osc.connect(gain);
        gain.connect(ac.destination);
        osc.start(time);
        osc.stop(time + 0.18);
      };

      playThump(now, true);
      playThump(now + 0.12, false); // Lub-dub double beat
    } catch (e) {}
  };

  // Keep heartrate climbing while hovered
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isHugHovered) {
      interval = setInterval(() => {
        setHugHeartRate(prev => {
          const next = prev + Math.floor(Math.random() * 4) + 2;
          if (next >= 135) return 135; // Cap at 135 bpm
          return next;
        });
        playHeartbeatThump();
      }, 500);
    } else {
      // Slower cooling down to normal rate
      interval = setInterval(() => {
        setHugHeartRate(prev => {
          if (prev <= 75) return 75;
          return prev - 3;
        });
      }, 400);
    }
    return () => clearInterval(interval);
  }, [isHugHovered]);

  const actualUnlocked = isUnlocked || forceUnlockActive;

  // Toggle polaroid flipping
  const toggleFlip = (id: string) => {
    setFlippedPolaroids(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Run hand heartbeat scan simulation on Day 9
  const triggerHeartbeatScan = () => {
    if (heartbeatActive) return;
    setHeartbeatActive(true);
    setScanProgress(0);
    setScanMessage('Calibrating coordinates with Ammu Sagufta...');

    let current = 0;
    const interval = setInterval(() => {
      current += 4;
      if (current >= 100) {
        setScanProgress(100);
        setScanMessage('Match Confirmed! 100% Heartbeat Cohesion 💛');
        clearInterval(interval);
      } else {
        setScanProgress(current);
        if (current === 40) setScanMessage('Tracing Secunderabad to Howrah paths...');
        if (current === 72) setScanMessage('Measuring standard emotional excitement rates...');
      }
    }, 120);
  };

  return (
    <div className="w-full max-w-4xl px-4 md:px-0 py-8 min-h-[80vh] flex flex-col justify-center font-poppins text-slate-800">
      
      {/* LOCKED SCREEN TEMPLATE */}
      {!actualUnlocked ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/70 backdrop-blur-md rounded-3xl p-12 text-center border border-pink-100/40 shadow-2xl flex flex-col items-center justify-center max-w-lg mx-auto"
        >
          <div className="w-20 h-20 bg-pink-50 rounded-full flex items-center justify-center mb-6 relative">
            <Lock size={32} className="text-[#e25875]" />
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 rounded-full border border-dashed border-pink-200"
            />
          </div>
          <h3 className="text-2xl font-serif-elegant font-bold text-[#e25875] mb-2">{day.title}</h3>
          <p className="text-xs font-mono text-slate-400 tracking-wider uppercase mb-6">{day.subtitle}</p>
          
          <div className="bg-[#fffbfa] px-6 py-4 rounded-xl border border-pink-50 text-sm italic text-slate-500 mb-8 leading-relaxed">
            “Every beautiful thing has its perfect minute, Sagufta. This gift is sleeping right now, waiting for the sun to rise on its special calendar day.”
          </div>

          <div className="flex flex-col items-center gap-1.5 font-mono text-[11px] text-slate-400">
            <span className="flex items-center gap-1">
              <Calendar size={12} />
              Unlocks on: July {day.dayNumber}, 2026
            </span>
            <span>(Use Chintu’s Time Portal at the top to simulate unlocking!)</span>
          </div>
        </motion.div>
      ) : (
        
        /* UNLOCKED SCRAPBOOK CARD LAYOUT */
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          className="relative w-full bg-white/80 backdrop-blur-lg rounded-3xl overflow-hidden shadow-2xl border border-white/40 flex flex-col lg:flex-row min-h-[550px]"
        >
          {/* DAY INDICATOR TAG */}
          <div className="absolute top-4 left-4 bg-gradient-to-r from-[#e25875] to-[#f46b85] text-white px-4 py-1.5 rounded-full text-xs font-space tracking-widest uppercase font-semibold shadow-md z-30 flex items-center gap-1.5">
            <Sparkles size={12} className="animate-pulse" />
            <span>Day {day.dayNumber}</span>
          </div>

          {/* LEFT PANEL: PHOTO FRAME & METADATA */}
          <div className={`w-full lg:w-[38%] p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-100 bg-[#fffbfc]`}>
            <div>
              {/* Photo Frame Container resembling classic Polaroid collage */}
              <div className="mt-8 mb-6 relative group flex justify-center">
                <motion.div 
                  whileHover={{ rotate: -2, scale: 1.02 }}
                  className="vintage-photo-frame w-64 rotate-2 transform transition-transform"
                >
                  <img 
                    src={resolveImageUrl(day.photos[0])} 
                    alt="Memory Visual" 
                    className="w-full h-48 object-cover rounded"
                    referrerPolicy="no-referrer"
                  />
                  <div className="mt-4 text-center">
                    <span className="font-handwritten text-[#e25875] text-lg select-none">
                      {day.title}
                    </span>
                  </div>
                </motion.div>

                {/* Sparkling aesthetic particles */}
                <div className="absolute -top-3 -left-3 animate-ping w-2 h-2 rounded-full bg-yellow-300" />
                <div className="absolute -bottom-2 -right-3 animate-bounce w-3 h-3 rounded-full bg-pink-100" />
              </div>

              <div className="text-center lg:text-left">
                <h2 className="text-xs font-mono tracking-widest text-[#e25875] uppercase font-bold mb-1">
                  {day.subtitle}
                </h2>
                <h3 className="text-2xl font-serif-elegant font-bold text-slate-800 leading-tight">
                  {day.title}
                </h3>
              </div>
            </div>

            {/* Bottom Emotional Hinglish Excerpt */}
            <div className="mt-8 pt-6 border-t border-slate-100 text-center lg:text-left">
              <span className="text-[#e25875] text-sm font-semibold tracking-wider block uppercase mb-1 font-space">
                Heart Whispers
              </span>
              <p className="text-slate-600 font-poppins text-xs leading-relaxed italic">
                {day.emotionalExcerpt}
              </p>
            </div>
          </div>

          {/* RIGHT PANEL: RICH STORY CONTENT & INTERACTIVE SECTION */}
          <div className="w-full lg:w-[62%] p-8 flex flex-col justify-between">
            <div className="mb-8">
              {/* Story Header */}
              <h4 className="text-xl font-serif-elegant font-bold text-slate-800 mb-4">
                {day.storyHeading}
              </h4>

              {/* Story Paragraphs */}
              <div className="space-y-4 text-[#2d262a]/95 text-xs sm:text-sm leading-relaxed font-light">
                {day.storyParagraphs.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>

              {/* INTERACTIVE MODULE INSERT */}
              <div className="mt-8 pt-6 border-t border-pink-50">
                <span className="text-[#e25875]/80 font-mono text-[10px] uppercase tracking-wider block mb-4">
                  ✦ Interactive Surprise ✦
                </span>

                {/* DAY 1: Smile Meter */}
                {day.interactiveType === 'smile_meter' && (
                  <div className="bg-pink-50/50 rounded-2xl p-5 border border-pink-100/30">
                    <div className="flex items-center justify-between mb-3 text-xs font-space font-medium text-slate-700">
                      <span className="flex items-center gap-1 text-[#e25875]">
                        <Smile size={16} /> Adorable Quotient:
                      </span>
                      <span className="text-[#e25875]">{smileQuotient}%</span>
                    </div>
                    <input 
                      type="range"
                      min="100"
                      max="1000"
                      step="50"
                      value={smileQuotient}
                      onChange={(e) => setSmileQuotient(Number(e.target.value))}
                      className="w-full accent-[#e25875] bg-pink-100/60 pb-3"
                    />
                    <div className="mt-3 text-xs text-slate-500 font-light italic leading-relaxed">
                      {smileQuotient < 300 && "“Tumhari smile honestly duniya ka cutest thing hai.” 💛"}
                      {smileQuotient >= 300 && smileQuotient < 700 && "“When you smile, Victoria Memorial and Hyderabad minarets shine together!” 🌟"}
                      {smileQuotient >= 700 && "“Critical Sweetness! Bougainvillea bloom speed is now 10x! Chintu’s heart is fully melting! 🌸💕”"}
                    </div>
                    <ul className="mt-4 grid grid-cols-2 gap-2 text-[10px] font-mono text-[#e25875]">
                      {day.interactiveData.factsAboutHerSmile.slice(0, 2).map((fact: string, idx: number) => (
                        <li key={idx} className="flex items-center gap-1 bg-white/60 p-1.5 rounded-lg">
                          ✨ {fact}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* DAY 2: Polaroid Scrapbook Gallery */}
                {day.interactiveType === 'polaroid_gallery' && (
                  <div className="grid grid-cols-2 gap-4">
                    {day.interactiveData.polaroids.map((item: any) => {
                      const isFlipped = flippedPolaroids[item.id] || false;
                      return (
                        <div 
                          key={item.id}
                          onClick={() => toggleFlip(item.id)}
                          className="relative h-44 cursor-pointer select-none perspective-1000 group"
                        >
                          <motion.div
                            animate={{ rotateY: isFlipped ? 180 : 0 }}
                            transition={{ duration: 0.6 }}
                            className="w-full h-full transform-style-3d relative"
                          >
                            {/* POLAROID FRONT */}
                            <div className="absolute inset-0 backface-hidden bg-white p-2.5 rounded shadow-md border border-slate-100 flex flex-col justify-between">
                              <img 
                                src={resolveImageUrl(item.image)} 
                                alt={item.caption}
                                className="w-full h-24 object-cover rounded"
                                referrerPolicy="no-referrer"
                              />
                              <div className="text-center font-handwritten text-[#e25875] text-[13px] pt-1 truncate">
                                {item.caption}
                              </div>
                            </div>

                            {/* POLAROID BACK */}
                            <div className="absolute inset-0 backface-hidden bg-[#faf4ef] p-4 rounded shadow-md border border-pink-100 flex flex-col justify-center items-center text-center rotate-y-180">
                              <Heart size={18} className="text-[#e25875] fill-pink-100 mb-1" />
                              <span className="text-[11px] text-slate-600 leading-normal font-light italic">
                                "{item.caption} represent our cozy bond. A picture perfect soul in every coordinates."
                              </span>
                            </div>
                          </motion.div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* DAY 3: Audio Transcripts */}
                {day.interactiveType === 'voice_note' && (
                  <div className="space-y-3">
                    {day.interactiveData.audioClips.map((clip: any, idx: number) => (
                      <div 
                        key={idx}
                        className={`p-3 rounded-xl border transition-all ${
                          activeVoiceClip === idx
                            ? 'bg-amber-50/50 border-amber-200 shadow-md shadow-amber-100/10'
                            : 'bg-white border-slate-100 hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <button
                            onClick={() => {
                              setActiveVoiceClip(activeVoiceClip === idx ? null : idx);
                              // Simple acoustic single note synthesizer beep for active feedback
                              try {
                                const ac = new (window.AudioContext || (window as any).webkitAudioContext)();
                                const osc = ac.createOscillator();
                                const gain = ac.createGain();
                                osc.connect(gain);
                                gain.connect(ac.destination);
                                osc.frequency.setValueAtTime(idx === 0 ? 329.63 : idx === 1 ? 392.00 : 440.00, ac.currentTime); // Mi, Sol, La
                                gain.gain.setValueAtTime(0.04, ac.currentTime);
                                gain.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + 1.2);
                                osc.start();
                                osc.stop(ac.currentTime + 1.3);
                              } catch(e) {}
                            }}
                            className="flex items-center gap-2 text-slate-800 text-xs font-semibold cursor-pointer"
                          >
                            <Volume2 size={16} className="text-amber-500 animate-pulse" />
                            <span>{clip.title}</span>
                          </button>
                          <span className="text-[10px] font-mono text-slate-400">{clip.length}</span>
                        </div>
                        <AnimatePresence>
                          {activeVoiceClip === idx && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="mt-2.5 pl-6 border-l-2 border-amber-200 text-xs text-slate-600 font-light italic"
                            >
                              {clip.transcript}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                )}

                {/* DAY 4: Distance Train Map Route */}
                {day.interactiveType === 'hyd_to_kol_map' && (
                  <div className="bg-blue-50/20 rounded-2xl p-5 border border-blue-100/30 flex flex-col items-center">
                    {/* SVG Map of India coordinates */}
                    <div className="relative w-full h-32 md:h-40 bg-white/70 rounded-xl overflow-hidden shadow-inner border border-blue-100/40 p-4">
                      <svg viewBox="0 0 400 200" className="w-full h-full">
                        {/* Background map route vector wires */}
                        <path 
                          d="M 120,150 Q 220,130 310,70" 
                          stroke="#ffccd5" 
                          strokeWidth="2.5" 
                          strokeDasharray="4 4" 
                          fill="none" 
                        />
                        
                        {/* Animated glowing golden connection line representing love */}
                        <motion.path 
                          d="M 120,150 Q 220,130 310,70" 
                          stroke="#e25875" 
                          strokeWidth="3.2" 
                          strokeDasharray="400"
                          initial={{ strokeDashoffset: 400 }}
                          animate={{ strokeDashoffset: 0 }}
                          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
                          fill="none" 
                        />

                        {/* Point A: Hyderabad */}
                        <circle cx="120" cy="150" r="5" fill="#0288d1" className="animate-ping" />
                        <circle cx="120" cy="150" r="4" fill="#0288d1" />
                        <text x="76" y="166" className="text-[10px] font-mono fill-slate-700 font-semibold uppercase">
                          Hyderabad 📍
                        </text>

                        {/* Point B: Kolkata */}
                        <circle cx="310" cy="70" r="5" fill="#e25875" className="animate-ping" />
                        <circle cx="310" cy="70" r="4" fill="#e25875" />
                        <text x="312" y="58" className="text-[10px] font-mono fill-slate-700 font-semibold uppercase">
                          Kolkata 🏙️
                        </text>

                        {/* Mini Paper Plane Gliding along path */}
                        <motion.g
                          animate={{ 
                            x: [120, 220, 310], 
                            y: [150, 130, 70],
                            rotate: [15, -15, -35]
                          }}
                          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
                        >
                          <svg x="-6" y="-6" width="12" height="12" viewBox="0 0 24 24">
                            <Heart className="text-[#e25875] fill-[#e25875]" size={14} />
                          </svg>
                        </motion.g>
                      </svg>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-4 w-full text-center">
                      <div className="bg-white p-2.5 rounded-xl shadow-sm border border-blue-50">
                        <span className="text-[9px] font-mono uppercase text-slate-400">Total Distance</span>
                        <div className="text-sm font-semibold text-[#0288d1]">{day.interactiveData.distance}</div>
                      </div>
                      <div className="bg-white p-2.5 rounded-xl shadow-sm border border-blue-50">
                        <span className="text-[9px] font-mono uppercase text-slate-400">Longing Duration</span>
                        <div className="text-sm font-semibold text-[#e25875]">{day.interactiveData.travelTime}</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* DAY 5: 15 Minutes of Magic (Station Meeting) */}
                {day.interactiveType === 'station_meeting' && (
                  <div className="space-y-6 pt-2 font-poppins">
                    
                    {/* Scene banner */}
                    <div className="bg-gradient-to-r from-amber-50 to-orange-100 rounded-2xl p-4 border border-orange-200/50 shadow-sm flex items-center justify-between gap-3 overflow-hidden relative">
                      <div className="z-10">
                        <span className="text-[9px] font-mono uppercase tracking-widest text-[#e65100] bg-orange-100/60 px-2 py-0.5 rounded">Platform Magic</span>
                        <h4 className="text-sm font-semibold text-slate-800 mt-1 font-serif-elegant">Our 15-Min Station Meeting 🚉</h4>
                        <p className="text-[10px] text-slate-600 mt-0.5 leading-normal max-w-sm">
                          Every engine whistle, announcement, and passing train faded. It was just Sagufta and Chintu.
                        </p>
                      </div>
                      <span className="text-4xl select-none opacity-40 absolute right-4 top-2 pointer-events-none">✨🚂</span>
                    </div>

                    {/* Interactive grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      
                      {/* Section 1: Placing the stolen flower */}
                      <div className="bg-white rounded-2xl p-4 border border-orange-100/40 shadow-sm flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-1.5 mb-2">
                            <span className="p-1 rounded-lg bg-pink-50 text-pink-500 text-xs">🌸</span>
                            <span className="text-xs font-semibold text-slate-800">The Garden Flower Escapade</span>
                          </div>
                          <p className="text-[10px] text-slate-500 leading-relaxed font-light mb-4">
                            Chintu couldn't find a flower shop on the way, so he picked a few fresh gold/pink blossoms from outside a random house. He felt like a thief, but he just wanted to bring you flowers!
                          </p>
                        </div>

                        {/* Interactive Area */}
                        <div className="bg-[#fffcf9] rounded-xl p-3 border border-pink-50/50 flex flex-col items-center justify-center text-center py-5 relative">
                          <div className="relative w-24 h-24 rounded-full border-2 border-dashed border-pink-200 flex items-center justify-center overflow-hidden mb-3 bg-pink-50/20">
                            {/* Inner illustrations */}
                            {flowerPlaced ? (
                              <motion.div
                                initial={{ scale: 0, rotate: -45 }}
                                animate={{ scale: 1, rotate: 0 }}
                                className="absolute top-2 right-4 text-2xl"
                              >
                                🌸
                              </motion.div>
                            ) : null}
                            
                            {/* Face representation / illustration */}
                            <div className="text-4xl filter saturate-100 select-none">
                              {flowerPlaced ? '👼' : '👧'}
                            </div>

                            {/* Hair curly accent overlay */}
                            <div className="absolute inset-0 border-4 border-amber-900/10 rounded-full pointer-events-none" />
                          </div>

                          <div className="text-xs text-slate-700 min-h-[44px] flex items-center justify-center px-2">
                            {flowerPlaced ? (
                              <motion.div
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-[11px] text-pink-600 font-serif leading-relaxed"
                              >
                                "The smile you gave me when I placed that flower is something I'll never forget. You looked like an angel standing there." 🌸🥹
                              </motion.div>
                            ) : (
                              <span className="text-[10px] text-slate-400 font-mono">
                                Sagufta's curly hair is missing a flower!
                              </span>
                            )}
                          </div>

                          <button
                            onClick={() => {
                              if (!flowerPlaced) {
                                setFlowerPlaced(true);
                                playSparkleChime();
                              } else {
                                setFlowerPlaced(false);
                              }
                            }}
                            className={`mt-3 w-full py-2 px-3 rounded-xl text-[10px] font-mono tracking-wider uppercase transition-all ${
                              flowerPlaced 
                                ? 'bg-pink-100 text-pink-700 font-semibold' 
                                : 'bg-[#e25875] text-white hover:bg-pink-600 shadow-sm'
                            }`}
                          >
                            {flowerPlaced ? '🌸 Take Flower Back' : '🌸 Place Stolen Flower'}
                          </button>
                        </div>
                      </div>

                      {/* Section 2: Chintu's Camera Shutter */}
                      <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800 shadow-md text-white flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[9px] font-mono text-pink-500 uppercase tracking-widest flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-ping inline-block" /> REC MODE — PHOTO SESSION
                            </span>
                            <span className="text-[8px] font-mono text-slate-500">ISO 400 | F/2.8</span>
                          </div>
                          
                          {/* Retro Camera Frame */}
                          <div className="bg-black aspect-video rounded-xl border border-slate-800 relative overflow-hidden flex items-center justify-center">
                            {/* Viewfinder focus box */}
                            <div className="absolute inset-1.5 border border-slate-850 pointer-events-none rounded flex items-center justify-center z-13">
                              <div className="w-4 h-4 border-t border-l border-white/50 absolute top-0 left-0" />
                              <div className="w-4 h-4 border-t border-r border-white/50 absolute top-0 right-0" />
                              <div className="w-4 h-4 border-b border-l border-white/50 absolute bottom-0 left-0" />
                              <div className="w-4 h-4 border-b border-r border-white/50 absolute bottom-0 right-0" />
                              <div className="w-3 h-3 rounded-full border border-pink-500/30" />
                            </div>

                            {/* Viewable Snapshot */}
                            <img 
                              src={
                                activePhotoIdx === 0 
                                  ? '/images/shutter_0.jpg'
                                  : activePhotoIdx === 1
                                    ? '/images/shutter_2.jpg'
                                    : activePhotoIdx === 2
                                      ? '/images/shutter_3.jpg'
                                      : '/images/shutter_4.jpg'
                              }
                              alt="Meeting Snapshot"
                              className="w-full h-full object-cover select-none"
                              referrerPolicy="no-referrer"
                            />

                            {/* Index status banner overlay */}
                            <div className="absolute bottom-1 right-2 bg-black/75 px-1.5 py-0.5 text-[8px] font-mono text-yellow-400 rounded">
                              SNAP {activePhotoIdx + 1}/4
                            </div>
                          </div>
                        </div>

                        {/* Dialogue bubble */}
                        <div className="text-[10px] text-slate-300 font-light italic mt-3 min-h-[38px] leading-tight px-1 bg-slate-900/60 p-2 rounded-lg border border-slate-800/40">
                          {activePhotoIdx % 2 === 0 ? (
                            <span>
                              <strong className="text-[#e25875]">Sagufta:</strong> “How many pictures you want to take, man nahi bhara kya?” 😅
                            </span>
                          ) : (
                            <span>
                              <strong className="text-yellow-400">Chintu:</strong> “Clicks of yours feel completely different. I just wanted to lock that beautiful minute forever.” 📸🤍
                            </span>
                          )}
                        </div>

                        {/* Shutter button */}
                        <button
                          onClick={() => {
                            setActivePhotoIdx(prev => (prev + 1) % 4);
                            playCameraClick();
                          }}
                          className="mt-3 w-full bg-slate-800 hover:bg-slate-700 text-[10px] font-mono text-white py-2 px-3 rounded-xl uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          📸 Snap Shutter Click
                        </button>
                      </div>

                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      
                      {/* Section 3: Sweet drink and diet coke */}
                      <div className="bg-white rounded-2xl p-4 border border-orange-100/40 shadow-sm flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-1.5 mb-2">
                            <span className="p-1 rounded-lg bg-orange-50 text-orange-600 text-xs">🎒</span>
                            <span className="text-xs font-semibold text-slate-800">Sagufta's Sweet Platform Treats</span>
                          </div>
                          <p className="text-[10px] text-slate-500 leading-relaxed font-light mb-4">
                            You bought Diet Coke and sweet chocolates for me. It felt so incredibly nice to be cared for by you in those simple platform minutes!
                          </p>
                        </div>

                        <div className="grid grid-cols-2 gap-3 mt-2">
                          {/* Diet Coke container */}
                          <div 
                            onClick={() => {
                              if (cokeLevel > 0) {
                                setCokeLevel(prev => prev - 25);
                                playDrinkFizzy();
                              } else {
                                setCokeLevel(100);
                              }
                            }}
                            className="bg-red-50/20 border border-red-100/50 rounded-xl p-3 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-red-50/50 transition-colors select-none"
                          >
                            <span className="text-2xl animate-bounce">🥤</span>
                            <span className="text-[10px] text-slate-700 font-semibold mt-1">Diet Coke</span>
                            
                            {/* Fluid Level Bar */}
                            <div className="w-full bg-slate-100 h-2 rounded mt-2 overflow-hidden border border-slate-200">
                              <div 
                                className="bg-red-500 h-full transition-all duration-300"
                                style={{ width: `${cokeLevel}%` }}
                              />
                            </div>
                            <span className="text-[8px] font-mono text-[#e65100] mt-1 font-semibold">
                              {cokeLevel > 0 ? `${cokeLevel}% Full` : 'Refill Coke! 🔄'}
                            </span>
                          </div>

                          {/* Sweet Chocolate Bar */}
                          <div 
                            onClick={() => {
                              if (chocolateBites < 4) {
                                setChocolateBites(prev => prev + 1);
                                playDrinkFizzy(); // similar crunch/nibble pop sound
                              } else {
                                setChocolateBites(0);
                              }
                            }}
                            className="bg-amber-50/20 border border-amber-100/50 rounded-xl p-3 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-amber-50/50 transition-colors select-none"
                          >
                            <span className="text-2xl">🍫</span>
                            <span className="text-[10px] text-slate-700 font-semibold mt-1">Chocolates</span>
                            
                            {/* Grid representing bites eaten */}
                            <div className="flex gap-0.5 mt-2 h-2 justify-center w-full">
                              {[0, 1, 2, 3].map((idx) => (
                                <div 
                                  key={idx}
                                  className={`w-3 h-2 rounded-sm transition-all duration-300 ${
                                    idx < chocolateBites ? 'bg-amber-100 border border-dashed border-amber-300' : 'bg-amber-800'
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-[8px] font-mono text-amber-800 mt-1 font-semibold">
                              {chocolateBites < 4 ? `${4 - chocolateBites} Pieces Left` : 'Refill Pack 💖'}
                            </span>
                          </div>
                        </div>

                        <div className="text-[9px] text-slate-500 text-center font-mono mt-4 leading-normal bg-[#fffcf9] p-2 rounded-lg border border-orange-50/60 font-light">
                          {cokeLevel === 0 && chocolateBites === 4 
                            ? '“Nothing made me feel more loved than you looking after me on that station.” 🥛🍫'
                            : 'Tap Coke and Chocolates to enjoy Sagufta’s sweets!'}
                        </div>
                      </div>

                      {/* Section 4: 15-Minute Side Hug Heartbeat */}
                      <div className="bg-white rounded-2xl p-4 border border-orange-100/40 shadow-sm flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-1.5 mb-2">
                            <span className="p-1 rounded-lg bg-pink-50 text-pink-500 text-xs">💓</span>
                            <span className="text-xs font-semibold text-slate-800">The 10-Second Platform Side Hug</span>
                          </div>
                          <p className="text-[10px] text-slate-500 leading-relaxed font-light mb-4">
                            My heart was beating so incredibly fast but I was trying to act super normal. Hold down the heartbeat trigger to feel Chintu\'s actual state when you cuddled in!
                          </p>
                        </div>

                        <div className="bg-[#fffbfa] rounded-xl p-3 border border-pink-50 flex flex-col items-center justify-center py-5 relative overflow-hidden select-none">
                          {/* Animated beating heart background pulse based on state */}
                          <motion.div
                            animate={{ 
                              scale: isHugHovered ? [1, 1.3, 1] : [1, 1.05, 1],
                              opacity: isHugHovered ? [0.15, 0.35, 0.15] : 0.05
                            }}
                            transition={{ 
                              duration: isHugHovered ? (60 / hugHeartRate) : 1.2, 
                              repeat: Infinity, 
                              ease: 'easeInOut' 
                            }}
                            className="absolute text-8xl text-red-500 pointer-events-none"
                          >
                            ♥
                          </motion.div>

                          <span className="text-3xl filter saturate-100 mb-2">🥲🤍</span>

                          {/* Heartrate count */}
                          <div className="text-center z-10">
                            <span className="text-[9px] font-mono uppercase text-slate-400 tracking-wider">Chintu\'s Heartrate</span>
                            <div className={`text-2xl font-bold font-mono transition-colors ${isHugHovered ? 'text-red-500' : 'text-slate-700'}`}>
                              {hugHeartRate} <span className="text-xs font-normal">BPM</span>
                            </div>
                          </div>

                          <div className="mt-3 text-[10px] text-[#e25875] text-center font-mono font-medium max-w-[200px] min-h-[30px] flex items-center justify-center">
                            {isHugHovered 
                              ? '“Lub-Dub! Heart thumping, palms sweaty, trying hard to play it ultra cool... 🚀”' 
                              : 'Press & Hold button to recreate the hug!'}
                          </div>

                          <button
                            onMouseDown={() => { setIsHugHovered(true); playHeartbeatThump(); }}
                            onMouseUp={() => setIsHugHovered(false)}
                            onMouseLeave={() => setIsHugHovered(false)}
                            onTouchStart={() => { setIsHugHovered(true); playHeartbeatThump(); }}
                            onTouchEnd={() => setIsHugHovered(false)}
                            className={`w-full py-2.5 px-3 rounded-xl text-[10px] font-mono tracking-wider uppercase transition-all mt-4 cursor-pointer select-none ${
                              isHugHovered 
                                ? 'bg-red-500 text-white shadow-inner scale-98' 
                                : 'bg-red-50 hover:bg-red-100 text-red-600 border border-red-200'
                            }`}
                          >
                            {isHugHovered ? '🎯 Active Side Hug!' : '🤝 Press & Hold for Hug'}
                          </button>
                        </div>
                      </div>

                    </div>

                    {/* Section 5: The Post-Meet Letter */}
                    <div className="bg-gradient-to-br from-amber-50/50 to-orange-100/20 rounded-2xl p-5 border border-amber-100/40 shadow-sm relative overflow-hidden flex flex-col justify-between">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-2">
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-yellow-500 text-xs">✉️</span>
                            <span className="text-xs font-semibold text-slate-800">The Message I Sent You Right After Meet</span>
                          </div>
                          <p className="text-[10px] text-slate-500 font-light mt-0.5">
                            It was just a fifteen-minute encounter, but when you left, my phone could barely keep up with my racing mind...
                          </p>
                        </div>
                        
                        <button
                          onClick={() => {
                            setShowFullMeetupMessage(!showFullMeetupMessage);
                            playSparkleChime();
                          }}
                          className="px-3 py-1.5 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg text-[9px] font-mono uppercase tracking-wider shadow-sm cursor-pointer whitespace-nowrap self-end sm:self-auto"
                        >
                          {showFullMeetupMessage ? 'Close Message x' : 'Expand Message 📝'}
                        </button>
                      </div>

                      <AnimatePresence>
                        {showFullMeetupMessage && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden"
                          >
                            {/* Real Notebook background styling */}
                            <div className="bg-white rounded-xl p-5 border border-yellow-100 mt-4 font-handwritten text-[#5d4037] text-xs leading-relaxed max-h-72 overflow-y-auto shadow-inner select-text whitespace-pre-line border-l-4 border-l-red-300">
                              {day.interactiveData.originalMessage}
                            </div>
                            
                            <div className="bg-[#fffcf9] border border-orange-200/40 rounded-lg p-3 text-[10px] mt-3 flex items-center gap-2 font-mono">
                              <span className="text-orange-500">🏡</span>
                              <span className="text-slate-600">
                                <strong>Platform Memory Highlight:</strong> Sagufta turned back and looked one final time before leaving, completely locking that exact coordinate in Chintu\'s mind. She introduced him properly to her mom, which was incredibly comforting and beautiful.
                              </span>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                  </div>
                )}

                {/* DAY 6: Memory Timeline (Replaced with Friendship Mixer for maximum warmth and zero confusion) */}
                {day.interactiveType === 'friendship_mixer' && (
                  <div className="flex flex-col items-center w-full max-w-sm mx-auto">
                    {!brewComplete ? (
                      <div className="w-full space-y-4">
                        <div className="text-center">
                          <p className="text-xs text-slate-500 font-light mb-3">
                            Select ingredients to craft your perfect cup of supportive friendship:
                          </p>
                        </div>

                        {/* Ingredients Checklist Grid */}
                        <div className="grid grid-cols-1 gap-2.5">
                          {day.interactiveData.ingredients.map((ing: any) => {
                            const isSelected = activeMixerIngredients.includes(ing.name);
                            return (
                              <button
                                key={ing.name}
                                onClick={() => {
                                  if (isSelected) {
                                    setActiveMixerIngredients(activeMixerIngredients.filter(n => n !== ing.name));
                                  } else {
                                    setActiveMixerIngredients([...activeMixerIngredients, ing.name]);
                                  }
                                  playDrinkFizzy();
                                }}
                                className={`p-3 rounded-2xl border text-left transition-all flex items-start gap-3 relative cursor-pointer ${
                                  isSelected 
                                    ? 'bg-lime-50/50 border-lime-400 shadow-sm ring-1 ring-lime-400/35' 
                                    : 'bg-white border-slate-100 hover:border-lime-200 hover:bg-lime-50/10'
                                }`}
                              >
                                <span className="text-2xl pt-0.5">{ing.emoji}</span>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center justify-between">
                                    <h5 className="text-[11px] font-bold text-slate-800">{ing.name}</h5>
                                    <span className="text-[10px] font-mono text-lime-600 font-semibold">{ing.pct}%</span>
                                  </div>
                                  <p className="text-[10px] text-slate-500 font-light mt-0.5 leading-relaxed">{ing.desc}</p>
                                </div>
                                {isSelected && (
                                  <div className="absolute top-2 right-2 text-lime-600 text-xs font-bold">✓</div>
                                )}
                              </button>
                            );
                          })}
                        </div>

                        {/* Mug / Brewing Button */}
                        <div className="pt-3 text-center">
                          <button
                            disabled={activeMixerIngredients.length === 0 || isBrewing}
                            onClick={() => {
                              setIsBrewing(true);
                              playSparkleChime();
                              setTimeout(() => {
                                setIsBrewing(false);
                                setBrewComplete(true);
                                playPurrSound();
                              }, 1600);
                            }}
                            className={`w-full py-3 px-4 rounded-full text-xs font-bold tracking-wider uppercase transition-all shadow-md inline-flex items-center justify-center gap-2 cursor-pointer ${
                              activeMixerIngredients.length === 0
                                ? 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed shadow-none'
                                : isBrewing
                                ? 'bg-amber-150 text-amber-800 border border-amber-300 animate-pulse'
                                : 'bg-[#65a30d] text-white hover:scale-[1.02] active:scale-95 shadow-lime-500/10'
                            }`}
                          >
                            {isBrewing ? (
                              <>☕ Brewing Friendship Cup... Bubble, Bubble...</>
                            ) : (
                              <>
                                ☕ Brew Friendship Cup ({activeMixerIngredients.length}/{day.interactiveData.ingredients.length})
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    ) : (
                      /* BREWED RESULT SPLASH */
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="w-full bg-gradient-to-b from-lime-50/50 via-emerald-50/20 to-white border border-lime-200 rounded-3xl p-5 text-center shadow-md relative overflow-hidden"
                      >
                        {/* Floating elements inside mug representation */}
                        <div className="absolute top-2 left-4 text-xs animate-bounce delay-150">🌱</div>
                        <div className="absolute top-3 right-6 text-sm animate-pulse">✨</div>
                        
                        <div className="text-6xl mb-4 animate-bounce">☕✨🌸</div>
                        
                        <h4 className="font-serif-elegant text-base font-bold text-slate-800 mb-1">
                          Our Cozy Friendship Cup is Ready!
                        </h4>
                        
                        <div className="inline-block bg-lime-100 border border-lime-200 rounded-full px-3 py-1 text-[10px] font-bold text-lime-700 tracking-wider uppercase mb-4">
                          Comfort Rating: 100% Pure Sanctuary 💖
                        </div>

                        {/* Selected ingredients breakdown list */}
                        <div className="flex flex-wrap gap-1.5 justify-center mb-4">
                          {activeMixerIngredients.map(name => {
                            const found = day.interactiveData.ingredients.find((i: any) => i.name === name);
                            return (
                              <span key={name} className="text-[9px] bg-white border border-lime-100 rounded-full px-2 py-0.5 text-slate-600">
                                {found?.emoji} {name}
                              </span>
                            );
                          })}
                        </div>

                        <p className="text-xs text-slate-600 font-light leading-relaxed mb-5 text-left bg-white/70 p-3 rounded-2xl border border-lime-100/30 shadow-inner">
                          {activeMixerIngredients.includes('Unconditional Support') && activeMixerIngredients.includes('Minni Memes & Silly Updates') && activeMixerIngredients.includes('Pure Peace & Absolute Trust')
                            ? "This brew is outstanding! Sagufta's gentle presence combined with cute kitten spam and absolute mutual support creates a sturdy golden bridge of companionship. No complex demands, no fancy requirements—just a warm safe haven where you can fully be yourself. 🤝🌸"
                            : "A warm, comforting sip of genuine support. Having someone you can chat with about everything without pretending or hiding is a rare, beautiful gem. Sagufta, you are truly a marvelous friend and a steady source of daily cheer in Chinto’s life! 🤗🌻"
                          }
                        </p>

                        <button
                          onClick={() => {
                            setBrewComplete(false);
                            setActiveMixerIngredients([]);
                            playSparkleChime();
                          }}
                          className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[10px] font-bold tracking-wider uppercase rounded-full transition-all cursor-pointer"
                        >
                          🔄 Mix A New Brew
                        </button>
                      </motion.div>
                    )}
                  </div>
                )}

                {/* DAY 6: Birthday Excitement Simulator */}
                {day.interactiveType === 'birthday_excitement' && (
                  <div className="flex flex-col items-center w-full max-w-sm mx-auto p-4 bg-gradient-to-tr from-amber-50/40 to-rose-50/40 rounded-3xl border border-rose-100 shadow-sm">
                    {/* Visual Gauge header */}
                    <div className="text-center w-full mb-4">
                      <span className="text-[10px] font-mono font-bold text-rose-500 uppercase tracking-widest block mb-1">
                        Chintu's Birthday Excitement Tracker 📊✨
                      </span>
                      <h4 className="font-serif-elegant font-bold text-slate-800 text-sm">
                        Anticipation Meter: {Math.min(100, day.interactiveData.initialMeter + (completedExcitementTasks.length * 7.5))}%
                      </h4>
                    </div>

                    {/* Progress Bar Container */}
                    <div className="w-full h-4 bg-rose-100/50 rounded-full p-0.5 overflow-hidden shadow-inner relative flex mb-5">
                      <motion.div
                        initial={{ width: `${day.interactiveData.initialMeter}%` }}
                        animate={{ width: `${Math.min(100, day.interactiveData.initialMeter + (completedExcitementTasks.length * 7.5))}%` }}
                        className="h-full bg-gradient-to-r from-rose-400 via-pink-400 to-rose-500 rounded-full shadow-md"
                      />
                      {/* Interactive percentage pin */}
                      <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-slate-700 select-none">
                        {Math.min(100, day.interactiveData.initialMeter + (completedExcitementTasks.length * 7.5)) === 100 ? '🎉 BURSTING WITH EXCITED ENERGY! 🎉' : 'Powering up further... ⚡'}
                      </span>
                    </div>

                    {/* Completion Message card */}
                    {completedExcitementTasks.length === day.interactiveData.checklist.length ? (
                      <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="bg-white border border-rose-200 p-4 rounded-2xl shadow-md text-center"
                      >
                        <div className="text-4xl mb-2 animate-bounce">🎈🥳😻</div>
                        <h5 className="font-serif-elegant font-bold text-rose-600 text-xs mb-1">
                          Excitement Meter is at 100%!
                        </h5>
                        <p className="text-[11px] text-slate-600 font-light leading-relaxed mb-4">
                          <strong>Chintu says:</strong> “Sagufta, you are seriously a phenomenal, outstanding friend! I can’t stop talking about how much I cherish having you in my life. Seeing your happiness and excitement on your birthday is my single biggest goal this season. 🐾✨”
                        </p>
                        <button
                          onClick={() => {
                            setCompletedExcitementTasks([]);
                            playSparkleChime();
                          }}
                          className="px-4 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 text-[10px] font-bold rounded-full transition-all cursor-pointer"
                        >
                          🔄 Reset Checklist
                        </button>
                      </motion.div>
                    ) : (
                      <div className="w-full space-y-2">
                        <div className="text-[10px] font-medium text-slate-400 uppercase tracking-wider mb-2 font-mono text-center">
                          Checklist tasks from Chintu:
                        </div>
                        {day.interactiveData.checklist.map((item: any) => {
                          const isDone = completedExcitementTasks.includes(item.id);
                          return (
                            <button
                              key={item.id}
                              onClick={() => {
                                if (isDone) {
                                  setCompletedExcitementTasks(completedExcitementTasks.filter(id => id !== item.id));
                                  playDrinkFizzy();
                                } else {
                                  setCompletedExcitementTasks([...completedExcitementTasks, item.id]);
                                  if (item.id === 'c1') {
                                    playPurrSound();
                                  } else {
                                    playSparkleChime();
                                  }
                                }
                              }}
                              className={`w-full p-2.5 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                                isDone
                                  ? 'bg-rose-50/40 border-rose-300 shadow-sm'
                                  : 'bg-white border-slate-100 hover:border-rose-200'
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <span className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center text-[8px] ${
                                  isDone ? 'bg-rose-500 border-rose-500 text-white' : 'border-slate-300'
                                }`}>
                                  {isDone && '✓'}
                                </span>
                                <span className="text-[11px] text-slate-700 font-light">{item.task}</span>
                              </div>
                              {isDone && (
                                <motion.span
                                  initial={{ opacity: 0, x: 5 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  className="text-[9px] font-mono text-rose-600 font-semibold bg-rose-100/55 px-1.5 py-0.5 rounded"
                                >
                                  {item.reward}
                                </motion.span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}

                {/* DAY 7: Handwritten letter wax seal toggle */}
                {day.interactiveType === 'handwritten_letter' && (
                  <div className="flex flex-col items-center">
                    {!letterOpened ? (
                      /* LOCKED WAX ENVELOPE */
                      <motion.div 
                        whileHover={{ scale: 1.02, rotate: -1 }}
                        className="w-72 h-44 rounded-xl relative bg-orange-100/40 border border-amber-200/60 shadow-xl overflow-hidden flex flex-col items-center justify-center cursor-pointer p-4 select-none"
                        onClick={() => {
                          setLetterOpened(true);
                          // Sweet paper unseal play sound effect
                          try{
                            const ac = new (window.AudioContext || (window as any).webkitAudioContext)();
                            const osc = ac.createOscillator();
                            const gain = ac.createGain();
                            osc.connect(gain);
                            gain.connect(ac.destination);
                            osc.type = 'triangle';
                            osc.frequency.setValueAtTime(523.25, ac.currentTime); // C5
                            osc.frequency.setValueAtTime(659.25, ac.currentTime + 0.15); // E5
                            gain.gain.setValueAtTime(0.04, ac.currentTime);
                            gain.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + 0.6);
                            osc.start();
                            osc.stop(ac.currentTime + 0.7);
                          } catch(e){}
                        }}
                      >
                        <div className="absolute top-0 right-0 left-0 bg-white/20 h-10 border-b border-dashed border-amber-200" />
                        <span className="text-[10px] font-mono tracking-widest text-[#f57f17] uppercase mb-4">
                          Envelope Sealed 📬
                        </span>
                        
                        {/* Red vintage wax seal sphere */}
                        <motion.div 
                          className="w-14 h-14 rounded-full bg-gradient-to-tr from-amber-600 to-[#e25875] shadow-lg flex items-center justify-center flex-col relative group cursor-pointer border border-[#ffe082]"
                          animate={{ scale: [1, 1.06, 1] }}
                          transition={{ duration: 1.8, repeat: Infinity }}
                        >
                          <span className="text-[9px] font-loveletter text-white fill-white select-none">Warm</span>
                          <Heart size={14} className="text-white fill-white" />
                        </motion.div>
                        <span className="text-[10px] font-mono text-[#f57f17] mt-4 uppercase animate-pulse">
                          Click Wax Seal to Slide Open
                        </span>
                      </motion.div>
                    ) : (
                      /* LETTERS OPENED AND UNFOLDED */
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="letter-scrapbook-texture w-full rounded-2xl p-6 shadow-lg border border-[#ffe082]/60 font-handwritten text-[#5d4037] relative text-sm md:text-base leading-relaxed"
                      >
                        {/* Letter stamp in corner */}
                        <div className="absolute top-3 right-3 w-10 h-12 bg-[#ffb7c5]/20 border border-dashed border-[#e25875] rounded flex items-center justify-center">
                          <Heart size={14} className="text-[#e25875]" />
                        </div>
                        {/* Letter Text paragraphs */}
                        <p className="whitespace-pre-line leading-loose text-base font-medium select-text">
                          {day.interactiveData.letterContent}
                        </p>
                        
                        <button 
                          onClick={() => setLetterOpened(false)}
                          className="mt-6 text-[10px] font-mono text-[#f57f17] hover:underline uppercase block cursor-pointer"
                        >
                          Close Letter Envelope ↩
                        </button>
                      </motion.div>
                    )}
                  </div>
                )}

                {/* DAY 8: Minni the Cat Interactive Playroom */}
                {day.interactiveType === 'minni_cat' && (
                  <div className="bg-[#fffefe]/40 backdrop-blur-sm rounded-2xl p-5 border border-pink-100/30 text-slate-800">
                    
                    {/* Floating elements if play mode is active */}
                    {minniPhase === 'play' && (
                      <div className="absolute top-0 left-0 right-0 h-full pointer-events-none overflow-hidden z-20">
                        {/* CSS animated soft floating hearts and paw prints */}
                        <div className="absolute animate-bounce opacity-40 text-pink-400 text-sm left-[10%] top-[20%]">🐾</div>
                        <div className="absolute animate-pulse opacity-40 text-pink-400 text-sm right-[15%] top-[10%]">💖</div>
                        <div className="absolute animate-bounce opacity-40 text-pink-400 text-md left-[80%] bottom-[30%]">🐾</div>
                        <div className="absolute animate-bounce opacity-30 text-pink-400 text-md left-[30%] bottom-[12%]">🧶</div>
                        <div className="absolute animate-pulse opacity-50 text-pink-400 text-xs right-[40%] bottom-[40%]">🐾</div>
                      </div>
                    )}

                    {/* PHASE 1: DOOR */}
                    {minniPhase === 'door' && (
                      <div className="text-center py-6 flex flex-col items-center">
                        <motion.div 
                          initial={{ scale: 0.9 }}
                          animate={{ scale: [1, 1.05, 1] }}
                          transition={{ repeat: Infinity, duration: 2 }}
                          className="w-16 h-16 bg-pink-100/70 rounded-full flex items-center justify-center mb-4 text-3xl cursor-pointer shadow-md"
                          onClick={() => {
                            setMinniPhase('intro');
                            playMeowSound();
                          }}
                        >
                          ✨🐱✨
                        </motion.div>
                        <h5 className="text-sm font-semibold tracking-wide text-slate-800 mb-2">
                          Meow? A gentle, glowing starlight is scratching at Sagufta's door... 🐾🌟
                        </h5>
                        <p className="text-xs text-slate-500 font-light mb-4 leading-relaxed max-w-sm mx-auto">
                          A sweet, familiar passenger has traveled all the way from the celestial meadows to bring Sagufta a warm kiss.
                        </p>
                        <button
                          onClick={() => {
                            setMinniPhase('intro');
                            playMeowSound();
                          }}
                          className="px-5 py-2.5 bg-gradient-to-r from-[#e25875] to-[#f46b85] hover:from-[#d04664] hover:to-[#e15771] text-white text-xs font-semibold rounded-full shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center gap-1.5"
                        >
                          <span>Open the Starry Gate 🌟🚪</span>
                        </button>
                      </div>
                    )}

                    {/* PHASE 2: OPENING ANIMATION AND LETTER INTRO */}
                    {minniPhase === 'intro' && (
                      <div className="py-4 relative overflow-hidden">
                        {/* Cat Silhouette custom svg footsteps */}
                        <div className="flex justify-center gap-2 mb-4 text-slate-300">
                          <motion.span initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0.4] }} transition={{ delay: 0.2 }} className="text-lg">🐾</motion.span>
                          <motion.span initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0.4] }} transition={{ delay: 0.5 }} className="text-lg">🐾</motion.span>
                          <motion.span initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0.4] }} transition={{ delay: 0.8 }} className="text-lg">🐾</motion.span>
                          <motion.span initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 1] }} transition={{ delay: 1.1 }} className="text-lg text-pink-500">🐈</motion.span>
                        </div>

                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6 }}
                          className="bg-pink-50/40 p-5 rounded-2xl border border-pink-100/40 shadow-sm text-center"
                        >
                          <p className="text-xs md:text-sm text-slate-700 italic font-medium leading-relaxed mb-3">
                            "She was there for your quiet tears, your studies, your exams, your tired yawns, and your happiest moments..."
                          </p>
                          <p className="text-xs md:text-sm text-slate-700 italic font-medium leading-relaxed mb-3">
                            "Though she runs in the endless golden meadows now, a soft bond like yours doesn’t have an expiry date..."
                          </p>
                          <p className="text-xs md:text-sm text-slate-700 italic font-medium leading-relaxed mb-4">
                            "For just this special week, she begged the angels for a tiny set of celestial wings to fly down and hold you close."
                          </p>
                          
                          <motion.div 
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 1.2, type: 'spring' }}
                            className="bg-gradient-to-r from-pink-500 to-rose-400 text-white font-space text-[11px] uppercase tracking-wider px-4 py-1.5 rounded-full inline-flex items-center gap-1.5 font-bold mb-5 shadow-sm"
                          >
                            ⭐ Minni – Your Fluffy Guardian Angel 🐾🕊️ ⭐
                          </motion.div>

                          <div className="flex justify-center">
                            <button
                              onClick={() => {
                                setMinniPhase('play');
                                playPurrSound();
                              }}
                              className="px-5 py-2 hover:bg-pink-100 border border-pink-200 text-slate-800 text-xs font-semibold rounded-full transition-all cursor-pointer flex items-center gap-1.5"
                            >
                              <span>Step into Her Dream Meadow ☁️🌸</span>
                            </button>
                          </div>
                        </motion.div>
                      </div>
                    )}

                    {/* PHASE 3: PLAYROOM */}
                    {minniPhase === 'play' && (
                      <div className="space-y-6">
                        
                        {/* Cat Avatar with Speech Bubble */}
                        <div className="flex flex-col items-center relative py-2">
                          <AnimatePresence>
                            {showMeowBubble && (
                              <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                className="absolute top-[-52px] bg-white border border-pink-150 rounded-2xl px-4 py-2 text-center text-[10px] sm:text-[11px] font-medium leading-relaxed shadow-lg max-w-xs z-30 text-rose-500"
                              >
                                {day.interactiveData.meowPhrases[currentMeowIdx]}
                                {/* Triangular tail for speech bubble */}
                                <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-r border-b border-pink-150 rotate-45" />
                              </motion.div>
                            )}
                          </AnimatePresence>

                          {/* Animated Cat Avatar */}
                          <div className="relative group cursor-pointer mt-4">
                            <motion.div
                              whileHover={{ scale: 1.05 }}
                              animate={{ 
                                y: [0, -3, 0],
                                rotate: [0, 1, -1, 0]
                              }}
                              transition={{ 
                                repeat: Infinity, 
                                duration: 3,
                                ease: 'easeInOut'
                              }}
                              onClick={() => {
                                // Cycle meows
                                const nextIdx = (currentMeowIdx + 1) % day.interactiveData.meowPhrases.length;
                                setCurrentMeowIdx(nextIdx);
                                setShowMeowBubble(true);
                                playMeowSound();
                                
                                // Reset meow bubble fade after 5 seconds
                                setTimeout(() => {
                                  setShowMeowBubble(false);
                                }, 4500);
                              }}
                              className="w-24 h-24 bg-gradient-to-b from-pink-50 to-pink-100 rounded-full flex flex-col items-center justify-center border-2 border-pink-200 relative shadow-md"
                            >
                              {/* Virtual Cat Whiskers and Ears */}
                              <span className="text-4xl select-none">🐱</span>
                              <div className="absolute inset-x-0 bottom-1.5 text-center text-[8px] font-mono tracking-widest uppercase font-bold text-[#e25875]">Minni</div>
                              {/* Breathing halo wrapper */}
                              <motion.span 
                                animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0, 0.3] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                                className="absolute inset-0 rounded-full border border-pink-300"
                              />
                            </motion.div>

                            {/* Click invitation hint */}
                            <div className="absolute right-[-20px] top-[10px] bg-yellow-105 border border-yellow-200 text-yellow-800 text-[8px] px-1.5 py-0.5 rounded-full font-mono animate-pulse">
                              Tap Me! 🐾
                            </div>
                          </div>

                          <p className="text-[10px] text-slate-400 mt-2 text-center italic">
                            Click Minni’s avatar to hear her real synthesized cute meows from the stars and read her heavenly wishes!
                          </p>
                        </div>

                        {/* Interactive Photo Frames / Memory Box */}
                        <div className="border-t border-dashed border-pink-100 pt-5">
                          <span className="text-[11px] font-mono font-bold text-slate-700 block mb-3 uppercase tracking-wider text-center">
                            🐈 Minni's Sacred Snuggle Snapshots
                          </span>
                          
                          <div className="grid grid-cols-2 gap-3 max-w-xs mx-auto">
                            {day.interactiveData.pics.map((pic: string, idx: number) => (
                              <motion.div
                                key={idx}
                                whileHover={{ scale: 1.05, rotate: idx % 2 === 0 ? -3 : 3 }}
                                className="bg-white p-1.5 rounded-lg border border-pink-100 shadow-sm relative overflow-hidden transition-all"
                              >
                                <img 
                                  src={resolveImageUrl(pic)} 
                                  alt={`Minni Memory ${idx + 1}`} 
                                  className="w-full h-24 object-cover rounded"
                                  referrerPolicy="no-referrer"
                                />
                                <div className="text-[10px] text-center font-handwritten text-[#e25875] pt-1.5 truncate">
                                  {idx === 0 
                                    ? 'Watching You 💛'
                                    : 'Together Forever 🔒'
                                  }
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>

                        {/* EASTER EGG SECTION / MINI TOYS AREA */}
                        <div className="border-t border-dashed border-pink-100 pt-5">
                          <span className="text-[11px] font-mono font-bold text-slate-700 block mb-2 uppercase tracking-wide text-center">
                            🧸 Minni's Heavenly Toybox
                          </span>
                          <p className="text-[10px] text-slate-400 mb-3 text-center">
                            Minni left some of her favorite earthly memories behind. Is there a message under her food bowl?
                          </p>

                          <div className="flex justify-center gap-6 mb-3">
                            {/* Toy 1: Yarn Ball */}
                            <button
                              onClick={() => {
                                setYarnSpin(prev => prev + 180);
                                playPurrSound();
                              }}
                              className="flex flex-col items-center cursor-pointer group"
                            >
                              <motion.div 
                                animate={{ rotate: yarnSpin }}
                                transition={{ type: 'spring', stiffness: 80 }}
                                className="text-2xl w-10 h-10 bg-orange-50 rounded-full flex items-center justify-center shadow border hover:shadow-md"
                              >
                                🧶
                              </motion.div>
                              <span className="text-[8px] text-slate-500 mt-1 uppercase font-mono tracking-widest group-hover:text-pink-500">Yarn Ball</span>
                            </button>

                            {/* Toy 2: Mouse Toy */}
                            <button
                              onClick={() => {
                                playMeowSound();
                              }}
                              className="flex flex-col items-center cursor-pointer group"
                            >
                              <motion.div 
                                className="text-2xl w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center shadow border hover:shadow-md"
                              >
                                🐭
                              </motion.div>
                              <span className="text-[8px] text-slate-500 mt-1 uppercase font-mono tracking-widest group-hover:text-pink-500">Mouse Toy</span>
                            </button>

                            {/* Toy 3: Food Bowl (The Easter Egg) */}
                            <button
                              onClick={() => {
                                setUnlockedEasterEgg(true);
                                playPurrSound();
                              }}
                              className="flex flex-col items-center cursor-pointer group relative"
                            >
                              <div className="text-2xl w-10 h-10 bg-[#fffde6] rounded-full flex items-center justify-center shadow border hover:shadow-md border-amber-200">
                                🥣
                              </div>
                              <span className="text-[8px] text-slate-500 mt-1 uppercase font-mono tracking-widest group-hover:text-pink-500 font-bold">Food Bowl</span>
                              {/* Glint effect */}
                              <span className="absolute top-0 right-0 w-2.5 h-2.5 rounded-full bg-yellow-400 animate-ping" />
                            </button>
                          </div>

                          {/* Easter Egg Reveal letter */}
                          <AnimatePresence>
                            {unlockedEasterEgg && (
                              <motion.div 
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="bg-[#fffdf0] border border-amber-200/60 rounded-xl p-4 mt-4 shadow-inner relative overflow-hidden"
                              >
                                <span className="absolute top-2 right-2 text-md">💌</span>
                                <div className="text-[10px] tracking-wider uppercase font-mono font-bold text-amber-700 mb-1">
                                  ✨ Sagufta's Heaven-Sent Letter Unlocked ✨
                                </div>
                                <p className="text-[11px] text-amber-955 leading-normal italic font-medium font-poppins text-slate-700">
                                  "Dear Sagufta-Mamma, hello from the star-meadows! Thank you for the delicious chicken treats, the softest blankets, and for whispering to me in that cute baby talk when nobody else was looking. Even though I sleep in the golden skies now, you make our memories the warmest place in Kolkata. Chintu tells me secrets about how much he adores Sagufta-Mamma, and from my little star up here, I approve and bless you both. Purrrrr... 🐾🐾💛"
                                </p>
                                <button 
                                  onClick={() => setUnlockedEasterEgg(false)} 
                                  className="text-[8px] font-mono text-amber-500 underline mt-2 uppercase block hover:text-amber-700"
                                >
                                  Tuck Letter Back Under Bowl ↩
                                </button>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>

                        {/* SPECIAL VIRTUAL HUG ENDING */}
                        <div className="border-t border-dashed border-pink-100 pt-5 flex flex-col items-center">
                          <button
                            onClick={() => {
                              setVirtualHugActive(true);
                              playPurrSound();
                            }}
                            className="w-full max-w-sm py-2.5 bg-gradient-to-r from-pink-500 to-[#e25875] hover:from-pink-600 hover:to-[#ce4c67] text-white text-xs font-semibold rounded-full shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5"
                          >
                            <span>🤗 Get a Virtual Hug from Minni 🤗</span>
                          </button>

                          <AnimatePresence>
                            {virtualHugActive && (
                              <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4"
                                onClick={() => setVirtualHugActive(false)}
                              >
                                <motion.div
                                  initial={{ y: 20 }}
                                  animate={{ y: 0 }}
                                  exit={{ y: 20 }}
                                  onClick={(e) => e.stopPropagation()}
                                  className="bg-white/95 rounded-3xl p-8 border border-pink-50 max-w-md w-full shadow-2xl relative text-center flex flex-col items-center"
                                >
                                  {/* Floating hearts inside modal */}
                                  <div className="text-5xl mb-4 animate-bounce">😸🐾💞</div>
                                  
                                  <h4 className="text-lg font-serif-elegant font-bold text-pink-600 mb-2">
                                    Meow meow cuddle! Minni’s Heavenly Hug Engaged! 💖
                                  </h4>
                                  <p className="text-xs text-slate-500 uppercase tracking-widest font-mono mb-4 animate-pulse">
                                    [ Immortal Angel Kitty Therapy Engaged ]
                                  </p>

                                  <div className="bg-pink-50/50 p-4 rounded-xl border border-pink-100 text-xs text-slate-700 font-light italic leading-relaxed text-left space-y-2">
                                    <p>“Minni rubs her soft cheeks against Sagufta’s hand, purring at 200 Hz. She tucks her warm fluffy body tightly next to Sagufta’s heart.”</p>
                                    <p>“Even though she runs in the infinite celestial fields, her love for you is immortal, and she is always, always right beside you whenever you take a quiet breath. All worries, school fatigue, and gray thoughts melt away instantly. 🐾”</p>
                                    <p className="text-center font-medium text-pink-600 pt-1">“I'll see you in another life, when we are both cats. 🐈✨”</p>
                                  </div>

                                  {/* Close modal button */}
                                  <button
                                    onClick={() => setVirtualHugActive(false)}
                                    className="mt-6 px-5 py-2 bg-pink-100/60 text-slate-800 hover:bg-pink-100 text-xs font-semibold rounded-full transition-all cursor-pointer"
                                  >
                                    Aww, Thank You Minni! 💛
                                  </button>
                                </motion.div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>

                      </div>
                    )}

                  </div>
                )}

                {/* DAY 9: Goodness & Birthday E-Gift Box */}
                {day.interactiveType === 'goodness_gift' && (
                  <div className="flex flex-col items-center w-full">
                    {!unboxedGift ? (
                      <motion.div 
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="text-center py-6 px-4 bg-gradient-to-b from-amber-50/60 to-rose-50/60 rounded-3xl border-2 border-dashed border-rose-200 w-full max-w-sm shadow-md"
                      >
                        <div className="text-5xl mb-4 animate-bounce">🎁✨</div>
                        <h4 className="font-serif-elegant text-lg font-bold text-rose-700 mb-2">
                          A Gift Package from Chintu!
                        </h4>
                        <p className="text-xs text-slate-500 font-light mb-6">
                          Wrapped with warmth, endless talks, and deep appreciation for your sweet presence.
                        </p>
                        
                        <button
                          onClick={() => {
                            setUnboxedGift(true);
                            playSparkleChime();
                          }}
                          className="px-6 py-3 bg-gradient-to-r from-rose-500 to-pink-600 text-white text-xs font-bold tracking-wider uppercase rounded-full shadow-lg shadow-rose-500/20 hover:scale-105 active:scale-95 transition-all cursor-pointer inline-flex items-center gap-2"
                        >
                          <Gift size={14} className="animate-pulse" /> Unbox Sagufta's Gift 🌸
                        </button>
                      </motion.div>
                    ) : (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="w-full"
                      >
                        {/* Selector Tabs with customized cute styling */}
                        <div className="flex border-b border-rose-100 mb-5 relative justify-center gap-1 sm:gap-2">
                          <button
                            onClick={() => { setGiftTab('card'); playSparkleChime(); }}
                            className={`px-3 py-2 text-xs font-semibold rounded-t-xl transition-all ${
                              giftTab === 'card' 
                                ? 'bg-rose-500 text-white shadow-sm' 
                                : 'text-slate-500 hover:text-rose-600 hover:bg-rose-50/50'
                            }`}
                          >
                            🎟️ Gift Card
                          </button>
                          <button
                            onClick={() => { setGiftTab('stuffed'); playPurrSound(); }}
                            className={`px-3 py-2 text-xs font-semibold rounded-t-xl transition-all ${
                              giftTab === 'stuffed' 
                                ? 'bg-rose-500 text-white shadow-sm' 
                                : 'text-slate-500 hover:text-rose-600 hover:bg-rose-50/50'
                            }`}
                          >
                            🧸 Stuffed Mini
                          </button>
                          <button
                            onClick={() => { setGiftTab('flowers'); playSparkleChime(); }}
                            className={`px-3 py-2 text-xs font-semibold rounded-t-xl transition-all ${
                              giftTab === 'flowers' 
                                ? 'bg-rose-500 text-white shadow-sm' 
                                : 'text-slate-500 hover:text-rose-600 hover:bg-rose-50/50'
                            }`}
                          >
                            💐 Bouquet
                          </button>
                        </div>

                        {/* TAB 1: E-Gift Card Details */}
                        {giftTab === 'card' && (
                          <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="bg-gradient-to-tr from-amber-50 to-pink-50/80 p-5 rounded-2xl border border-rose-200/50 shadow-inner text-left"
                          >
                            <div className="border border-amber-300 bg-gradient-to-r from-amber-400 to-amber-500 p-4 rounded-xl shadow-md text-white relative overflow-hidden mb-4">
                              <div className="absolute right-2 top-2 text-white/10 text-6xl font-bold select-none">
                                Mini
                              </div>
                              <span className="text-[10px] uppercase tracking-widest font-mono opacity-80">Chintu’s Special Birthday Pass</span>
                              <h5 className="font-serif-elegant text-base font-bold my-1">Ammu's Pampering Ticket 🎫</h5>
                              <div className="flex justify-between items-end mt-4">
                                <span className="font-mono text-xs tracking-wider font-semibold select-all bg-white/20 px-2 py-0.5 rounded">
                                  {day.interactiveData.giftCardCode}
                                </span>
                                <span className="text-[10px] font-mono opacity-90">From Chintu with Love 💛</span>
                              </div>
                            </div>

                            <p className="text-xs text-slate-700 font-light leading-relaxed mb-4">
                              <Sparkles className="inline text-amber-500 mr-1 pb-0.5" size={13} />
                              <strong>Chintu's Birthday Wish:</strong> Since I’m miles away, this is a small ticket to bring some real joy to your day. Please use the link below to redeem some wonderful chocolate treats and a beautiful fresh set of flowers. Treat yourself, Sagufta, because your goodness deserves the absolute best!
                            </p>

                            <a 
                              href={day.interactiveData.giftCardLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-full py-2.5 bg-rose-500 hover:bg-rose-600 text-white text-xs font-semibold rounded-xl transition-all shadow-md inline-flex items-center justify-center gap-1.5"
                            >
                              Redeem Your Gift Card <ExternalLink size={12} />
                            </a>
                          </motion.div>
                        )}

                        {/* TAB 2: Stuffed Mini Cat */}
                        {giftTab === 'stuffed' && (
                          <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="bg-stone-50 p-5 rounded-2xl border border-stone-200 text-center"
                          >
                            <div className="text-5xl mb-3 inline-block">😸🐾</div>
                            <h5 className="font-serif-elegant text-sm font-bold text-slate-800 mb-1">
                              Cute Stuffed Mini Kitten Plush 🧸
                            </h5>
                            <p className="text-xs text-slate-600 font-light mb-4">
                              {day.interactiveData.teddyCatStory}
                            </p>

                            <div className="bg-white/80 p-3 rounded-xl border border-stone-100 text-left mb-4 min-h-[50px] flex items-center justify-center">
                              <p className="text-xs text-slate-500 italic text-center leading-relaxed">
                                {stuffedPatted === 0 && "[ Tap the fluff ball below to pet her and check physical therapy! ]"}
                                {stuffedPatted > 0 && stuffedPatted <= 3 && "“The stuffed kitty purrs happily! Her small whiskers twitch softly against Sagufta’s palms. 🐾💖”"}
                                {stuffedPatted > 3 && "“Oh! Sagufta patted her so much that she did a high-pitched happy baby wiggle! She is forever your little fluffy cuddle-guard. 🌟😻”"}
                              </p>
                            </div>

                            <button
                              onClick={() => {
                                setStuffedPatted(prev => prev + 1);
                                if (stuffedPatted > 1) {
                                  playMeowSound();
                                } else {
                                  playPurrSound();
                                }
                              }}
                              className="px-5 py-2 bg-stone-200 hover:bg-stone-300 text-stone-800 text-xs font-bold rounded-full transition-all cursor-pointer"
                            >
                              🐱 Pat Furry Cat Plush {stuffedPatted > 0 && `(${stuffedPatted})`}
                            </button>
                          </motion.div>
                        )}

                        {/* TAB 3: Bouquet */}
                        {giftTab === 'flowers' && (
                          <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="bg-[#fff9fa] p-5 rounded-2xl border border-rose-100 text-center relative overflow-hidden"
                          >
                            {/* Visual floating mini-petals if sprinkled */}
                            {sprinkledSparkles && (
                              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                                <span className="absolute animate-bounce text-sm text-pink-400 left-4 top-2 select-none">🌸</span>
                                <span className="absolute animate-pulse text-xs text-rose-300 right-5 top-8 select-none">✨</span>
                                <span className="absolute animate-bounce text-sm text-amber-400 left-8 bottom-4 select-none">🌼</span>
                                <span className="absolute animate-pulse text-xs text-rose-400 right-10 bottom-6 select-none">🌸</span>
                              </div>
                            )}

                            <div className="text-5xl mb-3">💐🏺</div>
                            <h5 className="font-serif-elegant text-sm font-bold text-rose-700 mb-1">
                              Lavender, Lilies & Bougainvillea Vase
                            </h5>
                            <p className="text-xs text-slate-600 font-light leading-relaxed mb-4">
                              <strong>Suggested Flowers:</strong> {day.interactiveData.flowersType}. A lovely physical bunch of these will look perfect on your desk!
                            </p>

                            <div className="bg-rose-100/30 p-3 rounded-xl block border border-rose-100/50 mb-4 min-h-[50px] flex items-center justify-center">
                              <p className="text-xs text-rose-800 italic font-light text-center">
                                {!sprinkledSparkles 
                                  ? "“The vase is clean and waiting. Click below to add Chintu's magical pollen spray... ✨🌻”"
                                  : "“Whoosh! The room feels sweet and bright. Lavender blossoms and fresh white petals are dancing gently in the evening wind! 🌸🌬️”"
                                }
                              </p>
                            </div>

                            <button
                              onClick={() => {
                                setSprinkledSparkles(true);
                                playSparkleChime();
                              }}
                              className="px-5 py-2 bg-rose-100 hover:bg-rose-200 text-rose-700 text-xs font-bold rounded-full transition-all cursor-pointer inline-flex items-center gap-1.5"
                            >
                              <Sparkles size={13} /> Spray Enchanted Flourish ✨
                            </button>
                          </motion.div>
                        )}
                      </motion.div>
                    )}
                  </div>
                )}

                {/* DAY 10: Special Cinematic Congratulation List */}
                {day.interactiveType === 'final_cinematic' && (
                  <div className="bg-[#1a082e] p-6 rounded-2xl shadow-xl border border-yellow-200/20 relative overflow-hidden text-yellow-100">
                    <div className="absolute right-[-24px] bottom-[-24px] opacity-10">
                      <Heart size={140} className="fill-yellow-300 text-yellow-300" />
                    </div>

                    <h5 className="text-xs font-mono uppercase tracking-widest text-[#ffd700] mb-4 flex items-center gap-1.5 border-b border-white/5 pb-2">
                      <Sparkles size={12} /> Ammu's Birthday Blessings List
                    </h5>
                    
                    <ul className="space-y-2.5 text-xs font-light leading-relaxed">
                      {day.interactiveData.specialWishes.map((wish: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-xs text-[#ffd700] mt-0.5">⭐</span>
                          <span>{wish}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Highly polished, heartfelt custom quote card for Day 10 */}
                    <div className="mt-6 p-4 rounded-xl bg-[#2e104d]/90 border border-yellow-300/15 relative overflow-hidden text-center shadow-lg shadow-[#ffd700]/5">
                      <p className="text-yellow-100/95 font-serif-elegant italic text-sm md:text-base leading-relaxed">
                        “You are in my heart, you shall be in There forever.”
                      </p>
                      <p className="text-yellow-200/90 font-serif-elegant italic text-sm md:text-base leading-relaxed mt-2.5">
                        “My greatest wish is that you are happy when you think of me, I am When I think of you.”
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-white/5 text-right font-loveletter text-2xl text-amber-300">
                      — {day.interactiveData.signer}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* LOWER BOTTOM SYSTEM NAVIGATION CONTROL DOCKS */}
            <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
              {/* Back navigation button */}
              <button
                disabled={isFirst}
                onClick={onNavigatePrev}
                className="px-4 py-2 text-xs font-mono tracking-wider font-semibold uppercase text-[#e25875] disabled:text-slate-300 disabled:cursor-not-allowed cursor-pointer hover:underline flex items-center gap-1 bg-pink-50/10 hover:bg-pink-50/40 rounded-full"
              >
                ◀ Left Chapter
              </button>

              {/* Day reminder text block */}
              <span className="text-[10px] font-mono text-slate-400 hidden sm:inline">
                {isLast ? 'The ultimate dream portal unlocked ✨' : 'Come back tomorrow for one more secret envelope 💛'}
              </span>

              {/* Next navigation button */}
              <button
                disabled={isLast}
                onClick={onNavigateNext}
                className="px-4 py-2 text-xs font-mono tracking-wider font-semibold uppercase text-[#e25875] disabled:text-slate-300 disabled:cursor-not-allowed cursor-pointer hover:underline flex items-center gap-1 bg-pink-50/10 hover:bg-pink-50/40 rounded-full"
              >
                Right Chapter ▶
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};
export default DayDetailsCard;
