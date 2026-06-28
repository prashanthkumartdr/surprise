/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

interface Petal {
  id: number;
  x: number; // percentage left
  size: number; // width in px
  delay: number; // seconds
  duration: number; // seconds
  rotateStart: number;
  swaySpeed: number;
}

interface BougainvilleaRainProps {
  themeType?: 'pink' | 'lavender' | 'crimson' | 'gold_glow';
}

export const BougainvilleaRain: React.FC<BougainvilleaRainProps> = ({ themeType = 'pink' }) => {
  const [petals, setPetals] = useState<Petal[]>([]);
  
  // Springy values to track mouse coordinates for interactive sway reactivity
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 40, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 20 });

  useEffect(() => {
    // Generate a fixed set of randomized petals
    const newPetals: Petal[] = Array.from({ length: 22 }).map((_, i) => ({
      id: i,
      x: Math.random() * 95,
      size: Math.random() * 20 + 12, // 12px to 32px
      delay: Math.random() * -20, // Negative delays to pre-populate screen instantly
      duration: Math.random() * 15 + 15, // 15 to 30 seconds
      rotateStart: Math.random() * 360,
      swaySpeed: Math.random() * 2 + 1
    }));
    setPetals(newPetals);

    const handleMouseMove = (e: MouseEvent) => {
      // Normalize cursor positions relative to center of screen
      const normX = (e.clientX - window.innerWidth / 2) / 25;
      const normY = (e.clientY - window.innerHeight / 2) / 35;
      mouseX.set(normX);
      mouseY.set(normY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY]);

  // Determine SVG colors/gradients according to daily themes
  const getPetalColors = () => {
    switch (themeType) {
      case 'lavender':
        return {
          fill1: '#ba68c8',
          fill2: '#e1bee7',
          opacity: 0.85
        };
      case 'crimson':
        return {
          fill1: '#c2185b',
          fill2: '#f8bbd0',
          opacity: 0.8
        };
      case 'gold_glow':
        return {
          fill1: '#ffca28',
          fill2: '#fff59d',
          opacity: 0.9
        };
      case 'pink':
      default:
        return {
          fill1: '#e25875',
          fill2: '#ffb7c5',
          opacity: 0.85
        };
    }
  };

  const colors = getPetalColors();

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden" id="bougainvillea-rain-container">
      {petals.map((petal) => {
        // Individual petals sway based on sine waves + the spring-smoothed mouse position!
        return (
          <div
            key={petal.id}
            className="absolute"
            style={{
              left: `${petal.x}%`,
              // FloatUp custom CSS animation defined in index.css handled here
              animation: `floatUp ${petal.duration}s linear infinite`,
              animationDelay: `${petal.delay}s`,
              width: `${petal.size}px`,
              height: `${petal.size}px`,
            }}
          >
            {/* The actual svg petal, moving with cursor springs for physical reaction! */}
            <motion.div
              style={{
                x: springX,
                y: springY,
                rotate: petal.rotateStart
              }}
              animate={{
                x: [0, 25, -25, 0],
                rotate: [0, 18, -18, 0]
              }}
              transition={{
                duration: petal.duration * 0.4,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
              className="w-full h-full"
            >
              <svg
                viewBox="0 0 100 100"
                className="w-full h-full drop-shadow-md"
                style={{ opacity: colors.opacity }}
              >
                <defs>
                  <linearGradient id={`grad-${petal.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={colors.fill1} />
                    <stop offset="100%" stopColor={colors.fill2} />
                  </linearGradient>
                </defs>
                {/* Bougainvillea petal shapes have beautiful organic heart-like curves */}
                <path
                  d="M 50,0 C 75,25 95,45 85,75 C 75,100 25,100 15,75 C 5,45 25,25 50,0 Z"
                  fill={`url(#grad-${petal.id})`}
                />
                {/* Petal vein for authentic scrapbook elegance */}
                <path
                  d="M 50,15 C 48,35 46,65 50,90"
                  stroke={themeType === 'gold_glow' ? '#f57f17' : '#880e4f'}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  opacity="0.3"
                  fill="none"
                />
              </svg>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
};
export default BougainvilleaRain;
