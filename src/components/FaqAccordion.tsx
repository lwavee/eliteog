'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown } from 'react-icons/fa';

interface FaqItem {
  _id?: string;
  question: string;
  answer: string;
  category?: string;
}

interface FaqAccordionProps {
  faqs: FaqItem[];
}

export const FaqAccordion: React.FC<FaqAccordionProps> = ({ faqs }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    if (activeIndex === index) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };

  return (
    <div className="flex flex-col gap-4 max-w-3xl mx-auto">
      {faqs.map((faq, index) => {
        const isOpen = activeIndex === index;
        return (
          <div
            key={faq._id || index}
            className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm transition-all duration-300"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex items-center justify-between p-6 text-left text-navy-950 focus:outline-none cursor-pointer"
            >
              <span className="font-semibold text-base md:text-lg font-display pr-4">
                {faq.question}
              </span>
              <span
                className={`p-2 rounded-full bg-slate-50 text-royal-600 transition-transform duration-300 ${
                  isOpen ? 'rotate-180 bg-royal-100' : ''
                }`}
              >
                <FaChevronDown size={12} />
              </span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                  <div className="p-6 pt-0 text-sm md:text-base text-slate-600 border-t border-slate-100 leading-relaxed">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};
export default FaqAccordion;
