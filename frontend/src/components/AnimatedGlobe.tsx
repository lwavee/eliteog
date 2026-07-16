'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const AnimatedGlobe: React.FC = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center min-h-[400px]">
      {/* Outer Glowing Ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        className="absolute w-80 h-80 rounded-full border border-dashed border-royal-500/20 flex items-center justify-center"
      >
        <div className="absolute top-0 w-2.5 h-2.5 rounded-full bg-blue-400 shadow-[0_0_10px_#60a5fa] animate-pulse"></div>
        <div className="absolute bottom-0 w-2 h-2 rounded-full bg-royal-400 shadow-[0_0_8px_#3b82f6] animate-pulse"></div>
      </motion.div>

      {/* Middle Orbit Ring */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
        className="absolute w-64 h-64 rounded-full border border-royal-400/10 flex items-center justify-center"
      >
        <div className="absolute left-0 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]"></div>
        <div className="absolute right-0 w-2.5 h-2.5 rounded-full bg-indigo-500 shadow-[0_0_10px_#6366f1]"></div>
      </motion.div>

      {/* Main Globe Sphere */}
      <div className="relative w-48 h-48 rounded-full bg-gradient-to-tr from-navy-950 via-navy-900 to-royal-950 flex items-center justify-center overflow-hidden border border-white/10 shadow-[0_0_60px_rgba(37,99,235,0.25)]">
        {/* Globe Grid lines (Vertical Lines) */}
        <motion.div
          animate={{ x: ['-50%', '0%'] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 w-[200%] h-full opacity-20 flex"
          style={{
            backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(96,165,250,0.4) 40px, rgba(96,165,250,0.4) 42px)`,
          }}
        />

        {/* Globe Grid lines (Horizontal Lines) */}
        <div className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 30px, rgba(96,165,250,0.4) 30px, rgba(96,165,250,0.4) 31px)`,
          }}
        />

        {/* Glowing hotspots */}
        <div className="absolute top-[25%] left-[30%] w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_10px_#fff] animate-ping" />
        <div className="absolute bottom-[35%] right-[25%] w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee] animate-pulse" />
        <div className="absolute top-[60%] left-[20%] w-1 h-1 rounded-full bg-royal-400 shadow-[0_0_8px_#3b82f6] animate-pulse" />
        <div className="absolute top-[45%] right-[40%] w-1.5 h-1.5 rounded-full bg-indigo-400 shadow-[0_0_10px_#818cf8] animate-ping" />

        {/* Center overlay glow */}
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-royal-500/5 to-transparent pointer-events-none" />
      </div>

      {/* Floating particles */}
      <motion.div
        animate={{
          y: [-10, 10, -10],
          x: [-5, 5, -5]
        }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-10 right-20 bg-royal-500/10 text-royal-300 border border-royal-500/20 text-[10px] px-3 py-1 rounded-full backdrop-blur-md shadow-lg"
      >
        Enterprise Scaling
      </motion.div>

      <motion.div
        animate={{
          y: [10, -10, 10],
          x: [5, -5, 5]
        }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute bottom-10 left-20 bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 text-[10px] px-3 py-1 rounded-full backdrop-blur-md shadow-lg"
      >
        Business Automation
      </motion.div>
    </div>
  );
};
export default AnimatedGlobe;
