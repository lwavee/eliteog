'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export const LoadingScreen: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-navy-950"
        >
          {/* Background aura */}
          <div className="absolute w-[400px] h-[400px] bg-royal-600/10 rounded-full blur-[100px] animate-pulse-slow"></div>

          {/* Logo container */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative flex flex-col items-center gap-4"
          >
            <div className="relative w-48 h-24">
              <Image
                src="/logo.png"
                alt="EliteOps Global Logo"
                fill
                priority
                className="object-contain"
              />
            </div>
            
            {/* Loading text with scanning glow line */}
            <div className="relative mt-4 w-40 h-[2px] bg-navy-800 rounded-full overflow-hidden">
              <motion.div
                initial={{ left: '-100%' }}
                animate={{ left: '100%' }}
                transition={{
                  repeat: Infinity,
                  duration: 1.5,
                  ease: 'easeInOut',
                }}
                className="absolute top-0 bottom-0 w-1/2 bg-gradient-to-r from-transparent via-royal-500 to-transparent"
              />
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              transition={{ delay: 0.4 }}
              className="text-xs tracking-[0.2em] uppercase font-display text-royal-300"
            >
              Initializing Systems
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
export default LoadingScreen;
