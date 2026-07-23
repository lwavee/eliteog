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
    <footer className="relative bg-slate-50/90 border-t border-slate-200/80 pt-20 pb-10 overflow-hidden">
      {/* Top accent glowing gradient line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-royal-500/50 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        {/* Company Info */}
        <div className="flex flex-col gap-6">
          <Link href="/" className="relative w-44 h-12 flex items-center transition-transform hover:scale-[1.02]">
            <Image sizes="(max-width: 768px) 176px, 176px" src="/logo.png" alt="EliteOps Global Logo" fill className="object-contain filter mix-blend-multiply opacity-90" />
          </Link>
          <p className="text-sm text-slate-500 leading-relaxed font-medium">
            EliteOps Global (EOG) is an enterprise outsourcing and digital transformation partner delivering reliable back-office, technology solutions, and virtual assistance worldwide.
          </p>
          <div className="flex items-center gap-3">
            {[
              { icon: <FaLinkedin size={16} />, href: "https://linkedin.com" },
              { icon: <FaFacebook size={16} />, href: "https://facebook.com" },
              { icon: <FaTwitter size={16} />, href: "https://twitter.com" },
              { icon: <FaInstagram size={16} />, href: "https://instagram.com" },
            ].map((social, idx) => (
              <a
                key={idx}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-white border border-slate-200 text-slate-500 hover:text-royal-600 hover:border-royal-300 hover:bg-royal-50/50 rounded-xl transition-all shadow-2xs hover:scale-110"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-sm font-semibold text-navy-950 uppercase tracking-wider mb-6 font-display">Services</h4>
          <ul className="flex flex-col gap-3.5 text-sm text-slate-500">
            <li><Link href="#services" className="hover:text-royal-600 transition-colors">Virtual Assistance</Link></li>
            <li><Link href="#services" className="hover:text-royal-600 transition-colors">Web Development</Link></li>
            <li><Link href="#services" className="hover:text-royal-600 transition-colors">Insurance Back Office</Link></li>
            <li><Link href="#services" className="hover:text-royal-600 transition-colors">School & College solutions</Link></li>
            <li><Link href="#services" className="hover:text-royal-600 transition-colors">Administrative Support</Link></li>
          </ul>
        </div>

        {/* Industries */}
        <div>
          <h4 className="text-sm font-semibold text-navy-950 uppercase tracking-wider mb-6 font-display">Industries</h4>
          <ul className="flex flex-col gap-3.5 text-sm text-slate-500">
            <li><Link href="/industries/insurance" className="hover:text-royal-600 transition-colors">Insurance Agencies</Link></li>
            <li><Link href="/industries/education" className="hover:text-royal-600 transition-colors">Educational Solutions</Link></li>
            <li><Link href="/industries/healthcare" className="hover:text-royal-600 transition-colors">Hospitals & Clinics</Link></li>
            <li><Link href="/industries/real-estate" className="hover:text-royal-600 transition-colors">Real Estate & Finance</Link></li>
            <li><Link href="/industries/startups" className="hover:text-royal-600 transition-colors">Startups & Small Business</Link></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="flex flex-col gap-6">
          <h4 className="text-sm font-semibold text-navy-950 uppercase tracking-wider font-display">Newsletter</h4>
          <p className="text-sm text-slate-500 leading-relaxed">
            Stay updated with our latest industry insights, tech trends, and back-office solutions.
          </p>
          <form onSubmit={handleSubscribe} className="relative flex items-center">
            <input
              type="email"
              required
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-full py-3 pl-5 pr-12 text-xs text-navy-950 focus:outline-none focus:border-royal-500 transition-colors shadow-sm"
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
            <span className={`text-xs ${msg.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
              {msg.text}
            </span>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 border-t border-slate-200 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <p>&copy; {new Date().getFullYear()} EliteOps Global. All rights reserved.</p>
        <div className="flex items-center gap-6">
          <Link href="#privacy" className="hover:text-royal-600 transition-colors">Privacy Policy</Link>
          <Link href="#terms" className="hover:text-royal-600 transition-colors">Terms of Service</Link>
          <Link href="#cookies" className="hover:text-royal-600 transition-colors">Cookie Settings</Link>
          <Link href="/admin" className="hover:text-royal-700 text-royal-600 font-semibold transition-colors">Admin Portal</Link>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
