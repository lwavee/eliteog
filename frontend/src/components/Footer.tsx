'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaLinkedin, FaFacebook, FaTwitter, FaInstagram, FaRegEnvelope } from 'react-icons/fa';
import api from '../utils/api';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState({ text: '', type: '' });

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitting(true);
    setMsg({ text: '', type: '' });

    try {
      const data = await api.post('/public/subscribe', { email });
      if (data.success) {
        setMsg({ text: 'Thank you for subscribing!', type: 'success' });
        setEmail('');
      } else {
        setMsg({ text: data.message || 'Subscription failed.', type: 'error' });
      }
    } catch (err: any) {
      setMsg({ text: err.message || 'An error occurred.', type: 'error' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <footer className="bg-navy-950 border-t border-white/5 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        {/* Company Info */}
        <div className="flex flex-col gap-6">
          <Link href="/" className="relative w-44 h-12 flex items-center">
            <Image src="/logo.png" alt="EliteOps Global Logo" fill className="object-contain" />
          </Link>
          <p className="text-sm text-gray-400 leading-relaxed">
            EliteOps Global (EOG) is an enterprise outsourcing and digital transformation partner delivering reliable back-office, technology solutions, and virtual assistance worldwide.
          </p>
          <div className="flex items-center gap-4 text-gray-400">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              <FaLinkedin size={18} />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              <FaFacebook size={18} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              <FaTwitter size={18} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              <FaInstagram size={18} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-6 font-display">Services</h4>
          <ul className="flex flex-col gap-3.5 text-sm text-gray-400">
            <li><Link href="#services" className="hover:text-white transition-colors">Virtual Assistance</Link></li>
            <li><Link href="#services" className="hover:text-white transition-colors">Web Development</Link></li>
            <li><Link href="#services" className="hover:text-white transition-colors">Insurance Back Office</Link></li>
            <li><Link href="#services" className="hover:text-white transition-colors">School & College solutions</Link></li>
            <li><Link href="#services" className="hover:text-white transition-colors">Administrative Support</Link></li>
          </ul>
        </div>

        {/* Industries */}
        <div>
          <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-6 font-display">Industries</h4>
          <ul className="flex flex-col gap-3.5 text-sm text-gray-400">
            <li><Link href="/industries/insurance" className="hover:text-white transition-colors">Insurance Agencies</Link></li>
            <li><Link href="/industries/education" className="hover:text-white transition-colors">Educational Solutions</Link></li>
            <li><Link href="/industries/healthcare" className="hover:text-white transition-colors">Hospitals & Clinics</Link></li>
            <li><Link href="/industries/real-estate" className="hover:text-white transition-colors">Real Estate & Finance</Link></li>
            <li><Link href="/industries/startups" className="hover:text-white transition-colors">Startups & Small Business</Link></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="flex flex-col gap-6">
          <h4 className="text-sm font-semibold text-white uppercase tracking-wider font-display">Newsletter</h4>
          <p className="text-sm text-gray-400 leading-relaxed">
            Stay updated with our latest industry insights, tech trends, and back-office solutions.
          </p>
          <form onSubmit={handleSubscribe} className="relative flex items-center">
            <input
              type="email"
              required
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-navy-900 border border-white/10 rounded-full py-3 pl-5 pr-12 text-xs text-white focus:outline-none focus:border-royal-500 transition-colors"
            />
            <button
              type="submit"
              disabled={submitting}
              className="absolute right-1 px-4 py-2 bg-gradient-to-r from-royal-600 to-blue-500 text-white rounded-full hover:from-royal-500 hover:to-blue-400 focus:outline-none cursor-pointer disabled:opacity-50"
            >
              <FaRegEnvelope size={14} />
            </button>
          </form>
          {msg.text && (
            <span className={`text-xs ${msg.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
              {msg.text}
            </span>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
        <p>&copy; {new Date().getFullYear()} EliteOps Global. All rights reserved.</p>
        <div className="flex items-center gap-6">
          <Link href="#privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link href="#terms" className="hover:text-white transition-colors">Terms of Service</Link>
          <Link href="#cookies" className="hover:text-white transition-colors">Cookie Settings</Link>
          <Link href="/admin" className="hover:text-white text-royal-400 font-semibold transition-colors">Admin Portal</Link>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
