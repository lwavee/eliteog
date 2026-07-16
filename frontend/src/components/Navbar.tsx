'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaChevronDown } from 'react-icons/fa';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDropdown = (name: string) => {
    if (activeDropdown === name) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(name);
    }
  };

  const menuItems = [
    { name: 'About', path: '#about' },
    {
      name: 'Services',
      dropdown: [
        { name: 'Virtual Assistance', path: '#services' },
        { name: 'Administrative Support', path: '#services' },
        { name: 'Insurance Back Office', path: '#services' },
        { name: 'Web Development', path: '#services' },
        { name: 'School & College Solutions', path: '#services' },
        { name: 'E-Commerce Solutions', path: '#services' },
        { name: 'Business Process Outsourcing', path: '#services' },
      ],
    },
    {
      name: 'Industries',
      dropdown: [
        { name: 'Insurance Agencies', path: '/industries/insurance' },
        { name: 'Educational Institutions', path: '/industries/education' },
        { name: 'Healthcare & Hospitals', path: '/industries/healthcare' },
        { name: 'Real Estate & Finance', path: '/industries/real-estate' },
        { name: 'Startups & SMEs', path: '/industries/startups' },
      ],
    },
    { name: 'Process', path: '#process' },
    { name: 'Portfolio', path: '#portfolio' },
    { name: 'FAQ', path: '#faq' },
    { name: 'Careers', path: '#careers' },
    { name: 'Blog', path: '#blog' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? 'py-3 glass shadow-lg' : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="relative w-40 h-12 flex items-center">
          <Image
            src="/logo.png"
            alt="EliteOps Global Logo"
            fill
            className="object-contain"
            priority
          />
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex items-center gap-8">
          {menuItems.map((item, idx) => (
            <div key={idx} className="relative group">
              {item.dropdown ? (
                <button
                  onClick={() => toggleDropdown(item.name)}
                  className="flex items-center gap-1.5 text-sm text-gray-300 hover:text-white font-medium transition-colors focus:outline-none cursor-pointer"
                >
                  {item.name}
                  <FaChevronDown className={`text-[10px] transition-transform duration-300 ${activeDropdown === item.name ? 'rotate-180' : ''}`} />
                </button>
              ) : (
                <Link
                  href={item.path}
                  className="text-sm text-gray-300 hover:text-white font-medium transition-colors"
                >
                  {item.name}
                </Link>
              )}

              {/* Dropdown Menu */}
              {item.dropdown && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-64 glass rounded-xl overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 shadow-2xl py-2">
                  {item.dropdown.map((sub, sIdx) => (
                    <Link
                      key={sIdx}
                      href={sub.path}
                      className="block px-5 py-2.5 text-xs text-gray-300 hover:text-white hover:bg-royal-600/20 transition-all"
                    >
                      {sub.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Action Button */}
        <div className="hidden lg:flex items-center gap-4">
          <Link
            href="#contact"
            className="px-5 py-2 text-xs font-semibold rounded-full bg-gradient-to-r from-royal-600 to-blue-500 hover:from-royal-500 hover:to-blue-400 text-white shadow-md hover:shadow-royal-500/20 hover:scale-[1.03] transition-all"
          >
            Book Free Consultation
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden text-white focus:outline-none cursor-pointer"
        >
          {mobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden w-full glass border-t border-white/5 absolute top-full left-0 overflow-hidden shadow-2xl py-6 px-8 flex flex-col gap-6"
          >
            {menuItems.map((item, idx) => (
              <div key={idx} className="flex flex-col gap-2">
                {item.dropdown ? (
                  <>
                    <button
                      onClick={() => toggleDropdown(item.name)}
                      className="flex items-center justify-between text-base text-gray-300 hover:text-white font-medium py-1.5 border-b border-white/5 text-left w-full cursor-pointer"
                    >
                      {item.name}
                      <FaChevronDown className={`text-xs transition-transform ${activeDropdown === item.name ? 'rotate-180' : ''}`} />
                    </button>
                    {activeDropdown === item.name && (
                      <div className="pl-4 flex flex-col gap-2.5 py-1">
                        {item.dropdown.map((sub, sIdx) => (
                          <Link
                            key={sIdx}
                            href={sub.path}
                            onClick={() => setMobileMenuOpen(false)}
                            className="text-xs text-gray-400 hover:text-white transition-colors"
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-base text-gray-300 hover:text-white font-medium py-1.5 border-b border-white/5"
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}

            <Link
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 text-center w-full px-5 py-3 text-sm font-semibold rounded-full bg-gradient-to-r from-royal-600 to-blue-500 text-white shadow-md"
            >
              Book Free Consultation
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
export default Navbar;
