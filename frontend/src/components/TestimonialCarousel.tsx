'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight, FaStar, FaQuoteLeft } from 'react-icons/fa';

interface TestimonialItem {
  _id?: string;
  author: string;
  company: string;
  position?: string;
  rating: number;
  review: string;
  avatar?: string;
}

interface TestimonialCarouselProps {
  testimonials: TestimonialItem[];
}

const mockTestimonials: TestimonialItem[] = [
  {
    author: 'Sarah Jenkins',
    company: 'Nexus Insurance Group',
    position: 'Chief Operations Officer',
    rating: 5,
    review: 'EliteOps Global has transformed our policy backlog process. Their insurance back-office team is fast, detailed, and adheres to strict quality checks. It saved us 35% in admin overhead.',
  },
  {
    author: 'Dr. Arthur Pendelton',
    company: 'St. Jude International Academy',
    position: 'Director of Academics',
    rating: 5,
    review: 'The custom School ERP built by EOG streamlined our admissions, grade reporting, and student portals. They are a highly capable and trustworthy technology team.',
  },
  {
    author: 'Marcus Vance',
    company: 'Clearwater Logistics',
    position: 'Founder & President',
    rating: 5,
    review: 'We started with one virtual assistant and now outsource our entire billing data entry to EOG. Excellent accuracy, outstanding speed, and constant communication.',
  },
];

export const TestimonialCarousel: React.FC<TestimonialCarouselProps> = ({ testimonials }) => {
  const [index, setIndex] = useState(0);
  const items = testimonials.length > 0 ? testimonials : mockTestimonials;

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % items.length);
  };

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const current = items[index];

  return (
    <div className="relative max-w-4xl mx-auto flex flex-col items-center py-10 px-6">
      {/* Decorative Quote Icon */}
      <div className="absolute top-0 left-10 text-royal-500/10 pointer-events-none">
        <FaQuoteLeft size={120} />
      </div>

      <div className="relative w-full overflow-hidden min-h-[300px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center text-center gap-6"
          >
            {/* Star Rating */}
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <FaStar
                  key={i}
                  className={i < current.rating ? 'text-yellow-400' : 'text-gray-600'}
                  size={18}
                />
              ))}
            </div>

            {/* Review content */}
            <blockquote className="text-lg md:text-xl lg:text-2xl text-gray-300 italic max-w-2xl font-light leading-relaxed">
              "{current.review}"
            </blockquote>

            {/* Author profile */}
            <div className="flex flex-col items-center gap-1.5 mt-4">
              {current.avatar ? (
                <img
                  src={current.avatar}
                  alt={current.author}
                  className="w-14 h-14 rounded-full object-cover border border-royal-500/30"
                />
              ) : (
                <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-royal-600 to-blue-500 text-white flex items-center justify-center text-lg font-bold shadow-lg shadow-royal-500/10">
                  {current.author.charAt(0)}
                </div>
              )}
              <h5 className="font-bold text-white text-base mt-2 font-display">{current.author}</h5>
              <p className="text-xs text-gray-500">
                {current.position}, <span className="text-royal-400 font-semibold">{current.company}</span>
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Buttons */}
      <div className="flex gap-4 mt-8">
        <button
          onClick={prevSlide}
          className="p-3.5 rounded-full glass hover:bg-royal-600/25 border border-white/5 hover:border-royal-500/30 text-white transition-all cursor-pointer focus:outline-none"
        >
          <FaChevronLeft size={12} />
        </button>
        <button
          onClick={nextSlide}
          className="p-3.5 rounded-full glass hover:bg-royal-600/25 border border-white/5 hover:border-royal-500/30 text-white transition-all cursor-pointer focus:outline-none"
        >
          <FaChevronRight size={12} />
        </button>
      </div>
    </div>
  );
};
export default TestimonialCarousel;
