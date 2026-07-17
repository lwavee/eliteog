'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaExternalLinkAlt } from 'react-icons/fa';

interface PortfolioItem {
  _id?: string;
  title: string;
  description: string;
  category: string;
  images: string[];
  tags: string[];
  client?: string;
  year?: string;
  projectUrl?: string;
}

interface PortfolioFilterProps {
  items: PortfolioItem[];
}

const mockPortfolios: PortfolioItem[] = [
  {
    title: 'Insurance Policy Automation Suite',
    description: 'Automated 12,000+ commercial P&C policy entry tasks with OCR forms mapping and automated validations.',
    category: 'Insurance',
    images: ['/logo.png'],
    tags: ['OCR Automation', 'NodeJS', 'Excel Work', 'Insurance Back Office'],
    client: 'Beacon P&C Brokers',
    year: '2025',
  },
  {
    title: 'University Student Portal & LMS',
    description: 'Custom portal featuring exam entries, admission registration workflows, and automated fee collections.',
    category: 'Colleges',
    images: ['/logo.png'],
    tags: ['NextJS', 'Express', 'MongoDB', 'LMS Integration'],
    client: 'Global Science Institute',
    year: '2025',
  },
  {
    title: 'Healthcare Patient Booking System',
    description: 'Sleek scheduler connecting clinic practitioners to customer appointment modules under full HIPAA protocols.',
    category: 'Healthcare',
    images: ['/logo.png'],
    tags: ['React', 'Appointment Scheduling', 'Data Security'],
    client: 'Apex Health Group',
    year: '2024',
  },
  {
    title: 'B2B Wholesale Shopify Store',
    description: 'Custom headless storefront implementation with synchronized ERP item indexes and gateway payouts.',
    category: 'Ecommerce',
    images: ['/logo.png'],
    tags: ['Shopify Headless', 'Tailwind', 'Speed Optimization'],
    client: 'Titan Industrial Supplies',
    year: '2025',
  },
  {
    title: 'Workflow Automation & SOP Engine',
    description: 'Configured automated triggers matching client emails to ticketing systems, reducing wait times by 40%.',
    category: 'Business Automation',
    images: ['/logo.png'],
    tags: ['Zapier', 'SOP Documentation', 'Process Automation'],
    client: 'Veritas Holdings',
    year: '2024',
  },
  {
    title: 'Pre-School Enrollment System',
    description: 'Web portal for parent intakes, children record tracking, and automated invoice delivery.',
    category: 'Schools',
    images: ['/logo.png'],
    tags: ['WordPress Website', 'PHP Web Application'],
    client: 'Sunnyvale Montessori',
    year: '2025',
  },
];

export const PortfolioFilter: React.FC<PortfolioFilterProps> = ({ items }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = [
    'All',
    'Insurance',
    'Healthcare',
    'Schools',
    'Colleges',
    'Websites',
    'Ecommerce',
    'Business Automation',
  ];

  const displayedItems = items.length > 0 ? items : mockPortfolios;

  const filteredItems =
    selectedCategory === 'All'
      ? displayedItems
      : displayedItems.filter(
          (item) => item.category.toLowerCase() === selectedCategory.toLowerCase()
        );

  return (
    <div className="flex flex-col gap-10">
      {/* Category Tabs */}
      <div className="flex flex-wrap justify-center gap-2.5 max-w-4xl mx-auto">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
              selectedCategory === cat
                ? 'bg-gradient-to-r from-royal-600 to-blue-500 text-white shadow-lg shadow-royal-500/30'
                : 'bg-white text-slate-500 hover:text-navy-950 hover:bg-slate-50 shadow-sm border border-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Portfolio Grid */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item, idx) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              key={item._id || idx}
              className="bg-white shadow-xl shadow-slate-200/60 hover:shadow-2xl hover:-translate-y-1 hover:shadow-slate-300/60 border border-slate-100 transition-all duration-300 rounded-3xl overflow-hidden flex flex-col h-full group"
            >
              {/* Image Frame */}
              <div className="relative h-48 bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-6 border-b border-slate-100 overflow-hidden">
                <div className="absolute inset-0 bg-grid-pattern opacity-5 group-hover:scale-110 transition-transform duration-500"></div>
                <div className="relative w-36 h-12 flex items-center opacity-70 group-hover:opacity-100 transition-opacity">
                  <img
                    src="/logo.png"
                    alt="EliteOps Global"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="absolute top-4 right-4 bg-white/80 backdrop-blur border border-slate-200 text-[10px] uppercase font-bold tracking-wider text-royal-600 px-3 py-1 rounded-full shadow-sm">
                  {item.category}
                </div>
              </div>

              {/* Content Panel */}
              <div className="p-6 flex flex-col flex-grow justify-between gap-6">
                <div className="flex flex-col gap-2.5">
                  <div className="flex items-center justify-between text-xs text-slate-400 font-semibold uppercase tracking-wider">
                    <span>Client: {item.client || 'EOG Partner'}</span>
                    <span>{item.year || '2025'}</span>
                  </div>
                  <h4 className="text-lg font-bold text-navy-950 group-hover:text-royal-600 transition-colors font-display">
                    {item.title}
                  </h4>
                  <p className="text-sm text-slate-500 leading-relaxed">{item.description}</p>
                </div>

                <div className="flex flex-col gap-4">
                  {/* Technology Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-slate-100 border border-slate-200 text-slate-600 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {item.projectUrl && (
                    <a
                      href={item.projectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-royal-600 hover:text-royal-800 font-bold uppercase tracking-wider transition-colors mt-2"
                    >
                      Visit Case Study <FaExternalLinkAlt size={10} />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
export default PortfolioFilter;
