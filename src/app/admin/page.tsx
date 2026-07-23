'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '../../context/AuthContext';
import { FaLock, FaEnvelope, FaDatabase } from 'react-icons/fa';

export default function AdminLoginPage() {
  const { login, seedDefaultAdmin } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState({ text: '', type: '' });
  const [seededCreds, setSeededCreds] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setMsg({ text: '', type: '' });

    try {
      const res = await login(email, password);
      if (!res.success) {
        setMsg({ text: res.message || 'Invalid credentials.', type: 'error' });
      }
    } catch (err: any) {
      setMsg({ text: err.message || 'An error occurred.', type: 'error' });
    } finally {
      setSubmitting(false);
    }
  };

  const handleSeed = async () => {
    setMsg({ text: '', type: '' });
    try {
      const res = await seedDefaultAdmin();
      if (res.success) {
        setMsg({ text: 'Database seeded successfully with default Admin!', type: 'success' });
        setSeededCreds(res.credentials);
        setEmail(res.credentials.email);
        setPassword(res.credentials.password);
      } else {
        setMsg({ text: res.message || 'Seeding failed or database already has users.', type: 'error' });
      }
    } catch (err: any) {
      setMsg({ text: err.message || 'An error occurred during seeding.', type: 'error' });
    }
  };

  return (
    <main className="min-h-screen bg-navy-950 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Visual background auras */}
      <div className="absolute top-10 left-10 w-84 h-84 bg-royal-600/10 rounded-full blur-[100px] animate-pulse-slow"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '3s' }}></div>

      <div className="w-full max-w-md z-10 flex flex-col gap-8">
        {/* Logo and title */}
        <div className="flex flex-col items-center gap-3">
          <Link href="/" className="mb-8 w-48 h-16 relative">
            <Image sizes="(max-width: 768px) 192px, 192px" src="/logo.png" alt="EliteOps Global Logo" fill className="object-contain" />
          </Link>
          <h2 className="text-sm font-semibold tracking-[0.2em] uppercase text-royal-400 font-display mt-2">
            Admin Panel Login
          </h2>
        </div>

        {/* Login Card */}
        <div className="glass p-8 rounded-3xl border border-white/10 shadow-2xl flex flex-col gap-6">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-xs text-gray-400 uppercase font-semibold">Email Address</label>
              <div className="relative flex items-center">
                <span className="absolute left-4 text-gray-500"><FaEnvelope size={14} /></span>
                <input
                  type="email"
                  required
                  placeholder="kapil@eliteog.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-navy-900 border border-white/10 rounded-xl py-3 pl-11 pr-5 text-sm text-white focus:outline-none focus:border-royal-500 transition-colors"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs text-gray-400 uppercase font-semibold">Password</label>
              <div className="relative flex items-center">
                <span className="absolute left-4 text-gray-500"><FaLock size={14} /></span>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-navy-900 border border-white/10 rounded-xl py-3 pl-11 pr-5 text-sm text-white focus:outline-none focus:border-royal-500 transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 mt-2 bg-gradient-to-r from-royal-600 to-blue-500 hover:from-royal-500 hover:to-blue-400 text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-lg shadow-royal-500/20 cursor-pointer disabled:opacity-50"
            >
              {submitting ? 'Authenticating...' : 'Sign In'}
            </button>
          </form>

          {/* Quick Database Seeder (Invaluable for dev testing) */}
          <div className="border-t border-white/5 pt-5 text-center flex flex-col gap-3">
            <p className="text-xs text-gray-500">First time logging in?</p>
            <button
              type="button"
              onClick={handleSeed}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-royal-600/10 hover:bg-royal-600/20 border border-royal-500/30 text-royal-300 text-xs font-bold rounded-lg cursor-pointer transition-colors"
            >
              <FaDatabase size={12} /> Seed Default Admin
            </button>
            {seededCreds && (
              <div className="bg-royal-500/10 border border-royal-500/20 text-[10px] text-royal-300 rounded-lg p-3 text-left">
                <p className="font-bold mb-1">Seeded Admin User:</p>
                <p>Email: <span className="text-white font-mono">{seededCreds.email}</span></p>
                <p>Password: <span className="text-white font-mono">{seededCreds.password}</span></p>
              </div>
            )}
          </div>

          {msg.text && (
            <div className={`p-3.5 rounded-xl text-xs font-semibold text-center ${msg.type === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
              {msg.text}
            </div>
          )}
        </div>

        {/* Back link */}
        <Link href="/" className="text-xs text-center text-gray-500 hover:text-white transition-colors">
          &larr; Back to main website
        </Link>
      </div>
    </main>
  );
}
