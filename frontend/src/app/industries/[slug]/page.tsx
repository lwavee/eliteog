'use client';

import React, { use } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaCheckCircle, FaShieldAlt, FaRocket, FaClock } from 'react-icons/fa';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';

interface IndustryConfig {
  title: string;
  subtitle: string;
  description: string;
  bulletPoints: string[];
  metrics: { value: string; label: string }[];
  services: string[];
}

const industryConfigs: Record<string, IndustryConfig> = {
  insurance: {
    title: 'Insurance Agency Back Office',
    subtitle: 'Streamline Policies, Quotes, Claims, and Renewals Processing',
    description: 'We partner with Independent Insurance Agencies, Medicare Brokers, Commercial Brokers, and Property & Casualty agents. Our dedicated assistants manage quote entries, download processing lists, cross-verify policy documents, and coordinate renewals.',
    bulletPoints: [
      'Policy Intake & Document Parsing',
      'Loss Runs Retrieval & Organizing',
      'Quotes Processing & Multi-Carrier Entries',
      'Certificates of Insurance (COI) Issue',
      'Daily Policy Download Auditing',
    ],
    metrics: [
      { value: '40%', label: 'Overhead Cost Savings' },
      { value: '99.8%', label: 'Data Accuracy Rating' },
      { value: '12 Hours', label: 'Average Turnaround Time' },
    ],
    services: ['Policy Processing', 'Quote Comparison Entry', 'Claims Intakes', 'Renewals Verification'],
  },
  education: {
    title: 'School & College Solutions',
    subtitle: 'Next-Generation ERP, Student Information System & LMS Integration',
    description: 'Empower schools, private academies, colleges, and universities with cloud-based management systems. We build student admission registration paths, automate tuition invoicing structures, and configure digital grade cards.',
    bulletPoints: [
      'Student Enrollment & Registrar Automations',
      'Dynamic Billing & Fee Collections',
      'Learning Management Systems (LMS) Setup',
      'Online Exams & Multi-subject Grading Modules',
      'Attendance & Dynamic Class Schedule Trackers',
    ],
    metrics: [
      { value: '15,000+', label: 'Active Students Enrolled' },
      { value: '80%', label: 'Tuition Billing Efficiency' },
      { value: '24/7', label: 'Parent Portal Helpdesk' },
    ],
    services: ['School ERP Implementation', 'LMS Integrations', 'Admissions Processing', 'Tuition Billing Setup'],
  },
  healthcare: {
    title: 'Healthcare & Clinic Systems',
    subtitle: 'HIPAA-Compliant Administrative, Appointment, and Medical Records Processing',
    description: 'Support hospitals, specialized clinics, and medical practitioners. We manage appointment scheduling tables, medical data entry queues, and client document processing under strict data safety protocols.',
    bulletPoints: [
      'Patient Registration & Verification',
      'Appointment Coordination & Reminders',
      'Medical Records Data Entry',
      'Document Digitization',
      'HIPAA Data Isolations',
    ],
    metrics: [
      { value: '100%', label: 'HIPAA Compliance' },
      { value: '30%', label: 'No-Show Reduction' },
      { value: '98%', label: 'Records Entry Accuracy' },
    ],
    services: ['Appointment Scheduling', 'Patient Data Intake', 'Clinic CRM Maintenance', 'Document Digitization'],
  },
  'real-estate': {
    title: 'Real Estate & Finance Support',
    subtitle: 'Mortgage Processing, Property Uploads, and CRM Coordination',
    description: 'Supporting brokerages, real estate agents, property managers, and finance firms. We upload listings, synchronize real estate CRMs, transcribe property records, and prepare valuation packages.',
    bulletPoints: [
      'MLS Property Uploads & Updates',
      'Real Estate CRM & Leads Assignment',
      'Lease Auditing & Invoicing Records',
      'Mortgage Document Pre-qualification Files',
      'Market Valuation Reports Research',
    ],
    metrics: [
      { value: '3X', label: 'Listing Update Speed' },
      { value: '45 Hours', label: 'Monthly Admin Time Saved' },
      { value: '100%', label: 'Leads Follow-Up Rate' },
    ],
    services: ['MLS Listing Auditing', 'Leads Management', 'Property Document Entry', 'CRM Update'],
  },
  startups: {
    title: 'Startups & SMEs Solutions',
    subtitle: 'Scale Rapidly with Dedicated Virtual Assistants and SaaS Developers',
    description: 'We help early-stage ventures and small businesses deploy responsive Next.js storefronts, optimize database records, and run high-converting lead campaigns with fractional team structures.',
    bulletPoints: [
      'Fractional Developer & VA Allocations',
      'Email Campaigns & Leads Sourcing',
      'Social Media Creatives & Post Schedulers',
      'Corporate Web Applications Development',
      'Process Automations & API Integrations',
    ],
    metrics: [
      { value: '60%', label: 'Staff Cost Reduction' },
      { value: '10 Days', label: 'MVP Development Time' },
      { value: '24/7', label: 'Support Infrastructure' },
    ],
    services: ['SaaS Prototyping', 'Cold Outreach Leads Sourcing', 'Social Media Management', 'Next.js App Build'],
  },
};

const defaultConfig: IndustryConfig = {
  title: 'Enterprise Digital Transformation Solutions',
  subtitle: 'Helping Global Enterprises Scale with Digital Back-Office Operations',
  description: 'EliteOps Global delivers highly customized back-office workflows, custom web application buildouts, and dedicated remote staffing profiles tailored to international clients.',
  bulletPoints: [
    'Strategic Resource Allocation',
    'Custom Database & CRM API Syncs',
    'Dedicated QA Managers and Strict SLA Protocols',
    'GDPR & HIPAA Compliant Security Infrastructures',
    'Comprehensive Process SOP Mapping',
  ],
  metrics: [
    { value: '45%', label: 'Operational Cost Reduction' },
    { value: '99.9%', label: 'SLA Quality Retention' },
    { value: '24/7', label: 'Global Dedicated Support' },
  ],
  services: ['Dedicated Virtual Staffing', 'Custom Web Applications', 'Process Audits', 'Enterprise Scale SLA'],
};

interface Params {
  slug: string;
}

export default function IndustryLandingPage({ params }: { params: Promise<Params> }) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;
  const config = industryConfigs[slug.toLowerCase()] || defaultConfig;

  return (
    <>
      <Navbar />
      
      {/* Hero Banner */}
      <section className="relative min-h-[70vh] flex items-center justify-center pt-32 pb-20 bg-navy-950 overflow-hidden">
        <div className="absolute top-20 left-1/4 w-80 h-80 bg-royal-600/10 rounded-full blur-[100px] animate-pulse-slow"></div>
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px] animate-pulse-slow"></div>

        <div className="max-w-5xl mx-auto px-6 text-center z-10 flex flex-col items-center gap-6">
          <Link href="/" className="inline-flex items-center gap-2 text-xs font-semibold text-royal-400 hover:text-white uppercase tracking-wider mb-4 transition-colors">
            <FaArrowLeft /> Back to home
          </Link>
          <span className="text-xs uppercase tracking-[0.2em] font-semibold text-royal-400 bg-royal-500/10 border border-royal-500/20 px-4 py-1.5 rounded-full">
            Industry Showcase
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight font-display">
            {config.title}
          </h1>
          <p className="text-base md:text-lg text-royal-300 font-medium max-w-2xl">
            {config.subtitle}
          </p>
          <p className="text-sm md:text-base text-gray-400 leading-relaxed max-w-3xl">
            {config.description}
          </p>
          <div className="flex gap-4 mt-6">
            <a href="/#contact" className="px-8 py-4 text-sm font-semibold rounded-full bg-gradient-to-r from-royal-600 to-blue-500 text-white shadow-lg">
              Inquire Now
            </a>
          </div>
        </div>
      </section>

      {/* Metrics Banner */}
      <section className="py-16 bg-navy-950 border-y border-white/5 relative">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {config.metrics.map((m, idx) => (
            <div key={idx} className="flex flex-col gap-1.5">
              <span className="text-3xl lg:text-4xl font-extrabold text-gradient font-display">{m.value}</span>
              <span className="text-xs text-gray-500 uppercase tracking-widest font-semibold">{m.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Bullet Points & Capabilities Grid */}
      <section className="py-24 bg-navy-950/40 relative">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-royal-400 mb-4">Capabilities</h3>
            <h2 className="text-2xl md:text-3xl font-bold font-display text-white mb-6">Workflow Excellence & Scope</h2>
            <div className="flex flex-col gap-4">
              {config.bulletPoints.map((pt, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <FaCheckCircle className="text-royal-400 mt-1 flex-shrink-0" size={16} />
                  <p className="text-sm text-gray-300 leading-relaxed">{pt}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {config.services.map((srv, idx) => (
              <div key={idx} className="glass p-6 rounded-2xl flex flex-col gap-4">
                <span className="text-royal-400"><FaRocket size={20} /></span>
                <h4 className="font-bold text-white font-display text-sm uppercase tracking-wider">{srv}</h4>
                <p className="text-xs text-gray-400">Tailored resource deployment and direct pipeline connectivity.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Banner */}
      <section className="py-20 bg-navy-950 relative">
        <div className="max-w-5xl mx-auto px-6 text-center flex flex-col items-center gap-6">
          <div className="p-4 bg-royal-500/10 text-royal-400 border border-royal-500/20 rounded-full w-fit mb-2">
            <FaShieldAlt size={32} />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold font-display text-white">Full Data Isolation & NDA Safety</h2>
          <p className="text-sm text-gray-400 max-w-2xl">
            We understand the sensitive nature of industry records. All back-office support runs through secure VPNs, dual-factor credential configurations, and isolated machines under clean-desk constraints.
          </p>
          <div className="flex gap-8 text-xs text-gray-500 uppercase tracking-widest font-semibold">
            <span className="flex items-center gap-1.5"><FaShieldAlt className="text-royal-400" /> NDA Protected</span>
            <span className="flex items-center gap-1.5"><FaClock className="text-royal-400" /> 24/7 Operations</span>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
