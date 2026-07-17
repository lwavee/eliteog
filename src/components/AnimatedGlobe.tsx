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
      <div className="relative w-48 h-48 rounded-full bg-gradient-to-tr from-royal-50 via-white to-royal-100 flex items-center justify-center overflow-hidden border border-slate-200 shadow-[0_0_60px_rgba(37,99,235,0.15)]">
        {/* Globe Grid lines (Vertical Lines) */}
        <motion.div
          animate={{ x: ['-50%', '0%'] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 w-[200%] h-full opacity-30 flex"
          style={{
            backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(37,99,235,0.2) 40px, rgba(37,99,235,0.2) 42px)`,
          }}
        />

        {/* Globe Grid lines (Horizontal Lines) */}
        <div className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 30px, rgba(37,99,235,0.2) 30px, rgba(37,99,235,0.2) 31px)`,
          }}
        />

        {/* Glowing hotspots */}
        <div className="absolute top-[25%] left-[30%] w-1.5 h-1.5 rounded-full bg-royal-600 shadow-[0_0_10px_#2563eb] animate-ping" />
        <div className="absolute bottom-[35%] right-[25%] w-1.5 h-1.5 rounded-full bg-cyan-500 shadow-[0_0_10px_#06b6d4] animate-pulse" />
        <div className="absolute top-[60%] left-[20%] w-1 h-1 rounded-full bg-blue-500 shadow-[0_0_8px_#3b82f6] animate-pulse" />
        <div className="absolute top-[45%] right-[40%] w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_10px_#6366f1] animate-ping" />

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
        className="absolute top-10 right-20 bg-white/80 text-royal-600 border border-royal-200 text-[10px] px-3 py-1 rounded-full backdrop-blur-md shadow-lg"
      >
        Enterprise Scaling
      </motion.div>

      <motion.div
        animate={{
          y: [10, -10, 10],
          x: [5, -5, 5]
        }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute bottom-10 left-20 bg-white/80 text-cyan-600 border border-cyan-200 text-[10px] px-3 py-1 rounded-full backdrop-blur-md shadow-lg"
      >
        Business Automation
      </motion.div>
    </div>
  );
};
export default AnimatedGlobe;
