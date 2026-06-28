/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, VolumeX, Music, Heart } from 'lucide-react';
import romanticSynth from '../utils/audioSynth';

export const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.25);
  const [showSlider, setShowSlider] = useState<boolean>(false);

  useEffect(() => {
    // Check initial state
    setIsPlaying(romanticSynth.getIsRunning());
  }, []);

  const togglePlayback = () => {
    if (isPlaying) {
      romanticSynth.stop();
      setIsPlaying(false);
    } else {
      romanticSynth.play();
      setIsPlaying(true);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    romanticSynth.setVolume(newVol);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
      <AnimatePresence>
        {isPlaying && (
          <motion.div
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 15 }}
            className="hidden sm:flex bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-pink-100 shadow-md text-[10px] font-mono text-[#e25875] items-center gap-2 select-none"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
            <span>Kuch Kuch Hota Hai 🎵</span>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showSlider && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.9 }}
            className="bg-white/80 backdrop-blur-md px-4 py-2 rounded-full shadow-lg border border-pink-100 flex items-center gap-2"
          >
            <button
              onClick={() => {
                const nv = volume === 0 ? 0.25 : 0;
                setVolume(nv);
                romanticSynth.setVolume(nv);
              }}
              className="text-[#e25875] hover:scale-110 transition-transform"
            >
              {volume === 0 ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>
            <input
              type="range"
              min="0"
              max="0.6"
              step="0.05"
              value={volume}
              onChange={handleVolumeChange}
              className="w-20 accent-[#e25875] h-1 bg-[#ffccd5] rounded-lg appearance-none cursor-pointer"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative group">
        {/* Floating Soundwave visualization bars */}
        {isPlaying && (
          <div className="absolute -top-7 left-1/2 transform -translate-x-1/2 flex items-end gap-[3px] h-5 px-2 py-1 rounded-md bg-white/50 backdrop-blur-[2px]">
            <span className="w-[3px] bg-[#e25875] rounded-full animate-pulse h-3" style={{ animationDuration: '0.6s' }}></span>
            <span className="w-[3px] bg-[#e25875] rounded-full animate-pulse h-5" style={{ animationDuration: '0.4s' }}></span>
            <span className="w-[3px] bg-[#e25875] rounded-full animate-pulse h-2" style={{ animationDuration: '0.5s' }}></span>
            <span className="w-[3px] bg-[#e25875] rounded-full animate-pulse h-4" style={{ animationDuration: '0.7s' }}></span>
          </div>
        )}

        {/* Core Music Button */}
        <motion.button
          onClick={togglePlayback}
          onMouseEnter={() => setShowSlider(true)}
          onMouseLeave={() => {
            // Keep slider visible slightly for accessibility
            setTimeout(() => {
              // Only hide if cursor didn't move over slider, but keep it basic
            }, 2000);
          }}
          className={`flex items-center justify-center w-12 h-12 rounded-full shadow-lg border ${
            isPlaying 
              ? 'bg-[#e25875] text-white border-transparent glow-romantic' 
              : 'bg-white text-[#e25875] border-pink-100 hover:bg-pink-50'
          } relative cursor-pointer focus:outline-none`}
          id="music-toggle-btn"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {isPlaying ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Music size={18} />
            </motion.div>
          ) : (
            <Heart size={20} className="text-[#e25875] fill-pink-50" />
          )}
        </motion.button>
      </div>

      <button
        onClick={() => setShowSlider(!showSlider)}
        className="hidden sm:block text-xs font-mono text-[#e25875]/80 bg-white/40 hover:bg-white/70 px-2 py-1 rounded-full border border-pink-100/40 select-none cursor-pointer"
      >
        {isPlaying ? 'ambient active' : 'silent'}
      </button>
    </div>
  );
};
export default MusicPlayer;
