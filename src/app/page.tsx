'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  FaBriefcase, FaEnvelope, FaGlobe, FaPhone, FaCalendarCheck, FaChartBar, FaRocket, FaShieldAlt,
  FaUsers, FaTrophy, FaLightbulb, FaHeadset, FaFileContract, FaSyncAlt, FaArrowRight
} from 'react-icons/fa';
import api from '../utils/api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import LoadingScreen from '../components/LoadingScreen';
import CursorAnimation from '../components/CursorAnimation';
import AnimatedGlobe from '../components/AnimatedGlobe';
import FaqAccordion from '../components/FaqAccordion';
import PortfolioFilter from '../components/PortfolioFilter';
import TestimonialCarousel from '../components/TestimonialCarousel';
import InfiniteMarquee from '../components/InfiniteMarquee';

// --- Default Mock Data in case backend is empty/offline ---
const defaultServices = [
  { title: 'Virtual Assistance', icon: 'FaHeadset', desc: 'Email management, calendar sync, CRM maintenance, meeting prep, and calendar scheduling.' },
  { title: 'Administrative Support', icon: 'FaBriefcase', desc: 'Travel arrangements, document digitizing, follow-up calls, and client communication logs.' },
  { title: 'Insurance Back Office', icon: 'FaFileContract', desc: 'Detailed policy entry, claims intake processing, renewal verification, and quote comparisons.' },
  { title: 'Data Processing', icon: 'FaDatabase', desc: 'Medical files coding, product catalogue uploads, Excel data parsing, and image annotations.' },
  { title: 'Web Development', icon: 'FaLaptopCode', desc: 'Modern landing pages, Next.js sites, customized web applications, database management, and maintenance.' },
  { title: 'School & College Solutions', icon: 'FaGraduationCap', desc: 'Dynamic ERP student portals, fee management grids, LMS modules, and academic result dashboards.' },
  { title: 'E-Commerce Solutions', icon: 'FaShoppingCart', desc: 'Shopify storefront configurations, product entry, stock auditing, and secure payout gateways.' },
  { title: 'Business Automation', icon: 'FaSyncAlt', desc: 'Workflow design, email auto-responders, Zoho/CRM API syncs, and custom process optimization.' },
];

const steps = [
  { number: '01', title: 'Consultation', desc: 'Discuss your scaling bottlenecks and specific service requirements.' },
  { number: '02', title: 'Analysis', desc: 'Our operational experts detail workflows, resources, and SLA expectations.' },
  { number: '03', title: 'Planning', desc: 'Define project scope, build custom teams, and establish secure network gates.' },
  { number: '04', title: 'Execution', desc: 'Commence active service operations with direct slack updates and dashboard stats.' },
  { number: '05', title: 'Quality Check', desc: 'Daily compliance and accuracy reviews under a dedicated QA Manager.' },
  { number: '06', title: 'Delivery & Support', desc: 'Seamless daily execution backed by a 24/7 service infrastructure.' },
];

const jobs = [
  { title: 'Insurance Back Office Specialist', type: 'Full-Time', location: 'Remote', desc: 'Process insurance claims entry, verify client policy renewals, and compare premium quotes.' },
  { title: 'Virtual Assistant / Lead Gen Executive', type: 'Part-Time / Full-Time', location: 'Remote', desc: 'Manage client inbox schedules, arrange calendar travel sheets, and run outbound cold leads campaigns.' },
  { title: 'Junior Web Developer (React / NextJS)', type: 'Full-Time', location: 'Remote', desc: 'Develop responsive client dashboards, integrate Express APIs, and build clean landing layouts.' },
];

export default function Home() {
  const [services, setServices] = useState<any[]>([]);
  const [portfolios, setPortfolios] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [faqs, setFaqs] = useState<any[]>([]);
  const [blogs, setBlogs] = useState<any[]>([]);

  // Contact form state
  const [contactData, setContactData] = useState({
    name: '', company: '', phone: '', email: '', country: '', industry: '', service: '', message: ''
  });
  const [contactSubmitting, setContactSubmitting] = useState(false);
  const [contactMsg, setContactMsg] = useState({ text: '', type: '' });

  // Career Modal state
  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [applyPosition, setApplyPosition] = useState('');
  const [careerData, setCareerData] = useState({ name: '', email: '', phone: '', message: '' });
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [careerSubmitting, setCareerSubmitting] = useState(false);
  const [careerMsg, setCareerMsg] = useState({ text: '', type: '' });

  // Fetch from database on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [servicesRes, portfoliosRes, testimonialsRes, faqsRes, blogsRes] = await Promise.all([
          api.get('/public/services'),
          api.get('/public/portfolios'),
          api.get('/public/testimonials'),
          api.get('/public/faqs'),
          api.get('/public/blogs')
        ]);

        if (servicesRes.success) setServices(servicesRes.data);
        if (portfoliosRes.success) setPortfolios(portfoliosRes.data);
        if (testimonialsRes.success) setTestimonials(testimonialsRes.data);
        if (faqsRes.success) setFaqs(faqsRes.data);
        if (blogsRes.success) setBlogs(blogsRes.data);
      } catch (err) {
        console.warn('Backend is offline. Running with fallback default data.', err);
      }
    };
    fetchData();
  }, []);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setContactSubmitting(true);
    setContactMsg({ text: '', type: '' });
    try {
      const res = await api.post('/public/enquiries', contactData);
      if (res.success) {
        setContactMsg({ text: 'Thank you! Your enquiry has been received. Our team will contact you shortly.', type: 'success' });
        setContactData({ name: '', company: '', phone: '', email: '', country: '', industry: '', service: '', message: '' });
      } else {
        setContactMsg({ text: res.message || 'Submission failed.', type: 'error' });
      }
    } catch (err: any) {
      setContactMsg({ text: err.message || 'An error occurred.', type: 'error' });
    } finally {
      setContactSubmitting(false);
    }
  };

  const handleCareerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resumeFile) {
      setCareerMsg({ text: 'Please upload your resume file.', type: 'error' });
      return;
    }
    setCareerSubmitting(true);
    setCareerMsg({ text: '', type: '' });

    const formData = new FormData();
    formData.append('name', careerData.name);
    formData.append('email', careerData.email);
    formData.append('phone', careerData.phone);
    formData.append('position', applyPosition);
    formData.append('message', careerData.message);
    formData.append('resume', resumeFile);

    try {
      const res = await api.post('/public/apply', formData, true);
      if (res.success) {
        setCareerMsg({ text: 'Application submitted successfully!', type: 'success' });
        setTimeout(() => {
          setApplyModalOpen(false);
          setCareerData({ name: '', email: '', phone: '', message: '' });
          setResumeFile(null);
          setCareerMsg({ text: '', type: '' });
        }, 2000);
      } else {
        setCareerMsg({ text: res.message || 'Submission failed.', type: 'error' });
      }
    } catch (err: any) {
      setCareerMsg({ text: err.message || 'An error occurred.', type: 'error' });
    } finally {
      setCareerSubmitting(false);
    }
  };

  // Icon mapper helper
  const getIcon = (name: string) => {
    switch (name) {
      case 'FaHeadset': return <FaHeadset size={26} className="text-royal-400" />;
      case 'FaBriefcase': return <FaBriefcase size={26} className="text-royal-400" />;
      case 'FaFileContract': return <FaFileContract size={26} className="text-royal-400" />;
      case 'FaSyncAlt': return <FaSyncAlt size={26} className="text-royal-400" />;
      default:
        return <FaRocket size={26} className="text-royal-400" />;
    }
  };

  const activeServices = services.length > 0 ? services : defaultServices;
  const activeFaqs = faqs.length > 0 ? faqs : [
    { question: 'What is EliteOps Global (EOG)?', answer: 'EOG is a professional technology and outsourcing firm helping businesses scale through tailored virtual assistance, insurance back-office, ERP portals, and custom web development.' },
    { question: 'How do you protect client data?', answer: 'We enforce comprehensive NDA agreements, run end-to-end VPN encryptions, isolate files servers, and follow strict ISO data protection standards.' },
    { question: 'Can we start with a trial?', answer: 'Yes! Contact us to schedule a discussion and we can arrange custom pilot tests matching your operations structure.' },
  ];

  return (
    <>
      <LoadingScreen />
      <CursorAnimation />
      <Navbar />

      {/* --- HERO SECTION --- */}
      <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-white noise-bg bg-grid-pattern">
        {/* Floating ambient glow spheres */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-royal-600/10 rounded-full blur-[120px] animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-10 w-[450px] h-[450px] bg-blue-500/10 rounded-full blur-[140px] animate-pulse-slow" style={{ animationDelay: '3s' }}></div>

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full z-10">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-6"
          >
            {/* Live operational badge */}
            <div className="flex items-center gap-2.5 bg-royal-50/90 border border-royal-200/80 px-4 py-1.5 rounded-full w-fit backdrop-blur-md shadow-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-xs uppercase tracking-[0.2em] font-bold text-royal-700 font-display">
                24/7 Global Operations Active
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-navy-950 leading-[1.12] font-display">
              Enterprise-grade Back Office & <br />
              <span className="text-gradient">Digital Transformation</span>
            </h1>
            
            <p className="text-sm md:text-base text-slate-600 leading-relaxed max-w-xl font-medium">
              EliteOps Global delivers dedicated staffing teams, automated data queues, and custom Next.js web applications to cut operating costs and accelerate business performance worldwide.
            </p>

            <div className="flex flex-wrap gap-4 mt-2">
              <a
                href="#contact"
                className="btn-shine px-8 py-4 text-xs font-bold uppercase tracking-wider rounded-full bg-gradient-to-r from-royal-600 via-royal-500 to-blue-500 hover:from-royal-500 hover:to-blue-400 text-white shadow-[0_10px_25px_rgba(37,99,235,0.35)] hover:shadow-[0_15px_35px_rgba(37,99,235,0.5)] hover:scale-[1.03] transition-all flex items-center gap-2"
              >
                Book Free Consultation <FaCalendarCheck size={14} />
              </a>
              <a
                href="#contact"
                className="px-8 py-4 text-xs font-bold uppercase tracking-wider rounded-full bg-white/90 text-navy-950 border border-slate-300 hover:bg-slate-50 hover:border-royal-500/50 hover:scale-[1.03] shadow-sm transition-all"
              >
                Request a Proposal
              </a>
            </div>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="glass-card-elevated p-4.5 rounded-2xl border-l-4 border-l-royal-500">
                <p className="font-bold text-navy-950 font-display text-sm">4x Faster Onboarding</p>
                <p className="mt-1 text-slate-500 leading-relaxed">Launch dedicated project queues within 10 business days.</p>
              </div>
              <div className="glass-card-elevated p-4.5 rounded-2xl border-l-4 border-l-blue-500">
                <p className="font-bold text-navy-950 font-display text-sm">ISO-Certified Security</p>
                <p className="mt-1 text-slate-500 leading-relaxed">Strict NDA protocols, encrypted VPN gates, and 24/7 compliance.</p>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2 text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold">
              {['Insurance', 'Education', 'Healthcare', 'E-Commerce', 'Real Estate', 'Startups'].map((label) => (
                <span key={label} className="px-3.5 py-1.5 rounded-full bg-white/80 border border-slate-200 shadow-2xs hover:border-royal-300 transition-colors">
                  {label}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Animated Globe with floating SLA badges */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-lg">
              <AnimatedGlobe />

              {/* Floating SLA Badge 1 */}
              <div className="absolute top-10 -left-4 glass-card-elevated p-3.5 rounded-2xl hidden sm:flex items-center gap-3 shadow-xl z-20 animate-float">
                <span className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl font-bold text-sm">✓</span>
                <div>
                  <p className="text-xs font-bold text-navy-950 font-display">99.8% Accuracy SLA</p>
                  <p className="text-[10px] text-slate-500">QA Managed Verification</p>
                </div>
              </div>

              {/* Floating SLA Badge 2 */}
              <div className="absolute bottom-12 -right-4 glass-card-elevated p-3.5 rounded-2xl hidden sm:flex items-center gap-3 shadow-xl z-20 animate-float" style={{ animationDelay: '2.5s' }}>
                <span className="p-2.5 bg-royal-50 text-royal-600 rounded-xl font-bold text-sm">⚡</span>
                <div>
                  <p className="text-xs font-bold text-navy-950 font-display">Global Delivery</p>
                  <p className="text-[10px] text-slate-500">24/7 Shift Coverage</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-slate-50/80 border-t border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-center mb-10">
            <div className="glass-card-elevated p-6 rounded-3xl">
              <span className="text-4xl font-extrabold text-gradient font-display">10+</span>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-[0.25em] mt-2">Years BPO & Tech Experience</p>
            </div>
            <div className="glass-card-elevated p-6 rounded-3xl">
              <span className="text-4xl font-extrabold text-gradient font-display">ISO</span>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-[0.25em] mt-2">Data Security Standard</p>
            </div>
            <div className="glass-card-elevated p-6 rounded-3xl">
              <span className="text-4xl font-extrabold text-gradient font-display">250+</span>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-[0.25em] mt-2">Global Operations Deployed</p>
            </div>
          </div>

          <div className="glass p-8 rounded-3xl relative overflow-hidden">
            <div className="flex flex-col items-center text-center mb-8">
              <p className="text-xs uppercase tracking-[0.3em] text-royal-600 font-semibold">Trusted by growing enterprises</p>
              <h2 className="text-xl md:text-2xl font-bold text-navy-950 font-display mt-3 max-w-2xl">We support high-growth teams that need consistent, secure, and scalable delivery.</h2>
            </div>
            <InfiniteMarquee 
              items={['Atlas Insurance', 'Crescent Education', 'Apex Health', 'BluePeak Realty', 'Zenith Logistics', 'Summit Finance'].map(client => (
                <div key={client} className="glass-light px-8 py-4 rounded-2xl text-center font-bold text-navy-950 text-sm whitespace-nowrap shadow-sm border border-slate-200">
                  {client}
                </div>
              ))}
            />
          </div>
        </div>
      </section>

      {/* --- ABOUT SECTION --- */}
      <section id="about" className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col gap-6"
            >
              <h2 className="text-xs uppercase tracking-[0.25em] font-semibold text-royal-600">Who We Are</h2>
              <h3 className="text-3xl md:text-4xl font-bold font-display text-navy-950">
                EliteOps Global Delivers Scalable Operational Excellence
              </h3>
              <p className="text-sm md:text-base text-slate-500 leading-relaxed">
                EliteOps Global is a professional outsourcing and technology company delivering reliable back-office operations, website development, virtual assistance, administrative support, insurance processing, educational management solutions, and digital transformation services for businesses worldwide.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
                <div className="glass p-5 rounded-2xl">
                  <h4 className="font-bold text-navy-950 mb-2 flex items-center gap-2 text-sm uppercase tracking-wide font-display">
                    <FaRocket className="text-royal-600" /> Our Mission
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    To empower enterprises globally by delivering exceptionally precise, secure, and flexible digital back-office and application assets.
                  </p>
                </div>
                <div className="glass p-5 rounded-2xl">
                  <h4 className="font-bold text-navy-950 mb-2 flex items-center gap-2 text-sm uppercase tracking-wide font-display">
                    <FaLightbulb className="text-royal-600" /> Our Vision
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    To lead the global virtual assistance and ERP space by integrating advanced AI workflows with specialized human verification processes.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Experience Counters Grid */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-6"
            >
              <div className="glass-card p-8 rounded-3xl text-center flex flex-col justify-center items-center">
                <span className="text-4xl lg:text-5xl font-extrabold text-gradient font-display mb-2">10+</span>
                <span className="text-xs text-slate-500 uppercase tracking-widest font-semibold">Years Experience</span>
              </div>
              <div className="glass-card p-8 rounded-3xl text-center flex flex-col justify-center items-center">
                <span className="text-4xl lg:text-5xl font-extrabold text-gradient font-display mb-2">250+</span>
                <span className="text-xs text-slate-500 uppercase tracking-widest font-semibold">Projects Completed</span>
              </div>
              <div className="glass-card p-8 rounded-3xl text-center flex flex-col justify-center items-center">
                <span className="text-4xl lg:text-5xl font-extrabold text-gradient font-display mb-2">15+</span>
                <span className="text-xs text-slate-500 uppercase tracking-widest font-semibold">Countries Served</span>
              </div>
              <div className="glass-card p-8 rounded-3xl text-center flex flex-col justify-center items-center">
                <span className="text-4xl lg:text-5xl font-extrabold text-gradient font-display mb-2">98%</span>
                <span className="text-xs text-slate-500 uppercase tracking-widest font-semibold">Client Retention</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- SERVICES SECTION --- */}
      <section id="services" className="py-24 bg-slate-50 relative border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center flex flex-col items-center gap-4 mb-16">
            <h2 className="text-xs uppercase tracking-[0.25em] font-semibold text-royal-600">Our Services</h2>
            <h3 className="text-3xl md:text-4xl font-bold font-display text-navy-950">Complete Enterprise Operations Directory</h3>
            <p className="text-sm text-slate-500 max-w-xl">
              From business automation to virtual inboxes, our customized services provide global support tailored to your standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {activeServices.map((service, idx) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                key={idx}
                className="glass-card-elevated p-7 rounded-3xl flex flex-col gap-4 relative overflow-hidden group border border-slate-200/80 hover:border-royal-400/50"
              >
                <div className="p-3.5 bg-gradient-to-br from-royal-50 via-blue-50 to-indigo-50 border border-royal-100 rounded-2xl w-fit group-hover:scale-110 transition-transform duration-300 shadow-sm">
                  {getIcon(service.icon)}
                </div>
                <h4 className="text-lg font-bold text-navy-950 font-display group-hover:text-royal-600 transition-colors">{service.title}</h4>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">{service.desc || service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- INDUSTRIES WE SERVE --- */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center flex flex-col items-center gap-4 mb-16">
            <h2 className="text-xs uppercase tracking-[0.25em] font-semibold text-royal-600">Industries We Serve</h2>
            <h3 className="text-3xl md:text-4xl font-bold font-display text-navy-950">Targeted Back Office Domain Expertise</h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {['Insurance', 'Education', 'Healthcare', 'Real Estate', 'Finance', 'Startups', 'Retail', 'Legal'].map((ind, idx) => (
              <Link href={`/industries/${ind.toLowerCase().replace(' ', '-')}`} key={idx}>
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  className="glass p-6 rounded-2xl flex items-center justify-between group cursor-pointer"
                >
                  <span className="font-semibold text-navy-950 group-hover:text-royal-600 transition-colors">{ind}</span>
                  <FaArrowRight size={12} className="text-slate-400 group-hover:text-royal-600 transition-colors" />
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* --- WHY CHOOSE US SECTION --- */}
      <section className="py-24 bg-slate-50 border-t border-slate-200 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Visual Panel */}
            <div className="relative flex justify-center">
              <div className="absolute w-72 h-72 bg-royal-600/5 rounded-full blur-[80px]"></div>
              <div className="glass p-8 rounded-3xl flex flex-col gap-6 max-w-md w-full relative z-10">
                <h4 className="text-gradient font-bold text-lg font-display">Secure & Compliant Operations</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  We sign NDA protocols with every team member and run isolated secure workspaces. Your client lists and insurance documents are protected by the strongest standards.
                </p>
                <div className="flex items-center gap-4 text-xs text-navy-950 font-semibold">
                  <span className="flex items-center gap-1.5"><FaShieldAlt className="text-green-500" /> NDA Protected</span>
                  <span className="flex items-center gap-1.5"><FaShieldAlt className="text-green-500" /> ISO Compliant</span>
                </div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex flex-col gap-6"
            >
              <h2 className="text-xs uppercase tracking-[0.25em] font-semibold text-royal-600">Why EOG</h2>
              <h3 className="text-3xl md:text-4xl font-bold font-display text-navy-950">Partnering for Scalability & Integrity</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                EliteOps Global delivers highly customized staffing structures, state of the art web apps, and automated workflows ensuring you stay competitive at fraction of local costs.
              </p>

              <ul className="flex flex-col gap-4 text-sm text-slate-600">
                <li className="flex gap-3"><FaUsers className="text-royal-600 mt-1" /> <span><strong className="text-navy-950">Dedicated Team</strong>: Resource profiles fully allocated to your queues.</span></li>
                <li className="flex gap-3"><FaShieldAlt className="text-royal-600 mt-1" /> <span><strong className="text-navy-950">Data Security</strong>: Modern endpoints protection and regular backups.</span></li>
                <li className="flex gap-3"><FaSyncAlt className="text-royal-600 mt-1" /> <span><strong className="text-navy-950">Scalable structure</strong>: Grow or reduce team members inside a 15-day notice buffer.</span></li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- PROCESS TIMELINE SECTION --- */}
      <section id="process" className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center flex flex-col items-center gap-4 mb-16">
            <h2 className="text-xs uppercase tracking-[0.25em] font-semibold text-royal-600">Our Process</h2>
            <h3 className="text-3xl md:text-4xl font-bold font-display text-navy-950">How We Onboard & Execute</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {steps.map((step, idx) => (
              <div key={idx} className="glass p-8 rounded-3xl relative flex flex-col gap-4">
                <span className="text-gradient text-3xl font-extrabold font-display">{step.number}</span>
                <h4 className="text-lg font-bold text-navy-950 font-display">{step.title}</h4>
                <p className="text-xs text-slate-500 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- PORTFOLIO SECTION --- */}
      <section id="portfolio" className="py-24 bg-slate-50 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center flex flex-col items-center gap-4 mb-16">
            <h2 className="text-xs uppercase tracking-[0.25em] font-semibold text-royal-600">Case Studies</h2>
            <h3 className="text-3xl md:text-4xl font-bold font-display text-navy-950">Proven Outcomes in the Field</h3>
          </div>
          <PortfolioFilter items={portfolios} />
        </div>
      </section>

      {/* --- TESTIMONIALS SECTION --- */}
      <section className="py-24 bg-slate-50 border-t border-slate-200 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center flex flex-col items-center gap-4 mb-12">
            <h2 className="text-xs uppercase tracking-[0.25em] font-semibold text-royal-600">Client Reviews</h2>
            <h3 className="text-3xl md:text-4xl font-bold font-display text-navy-950">What Our Enterprise Partners Say</h3>
          </div>
          <TestimonialCarousel testimonials={testimonials} />
        </div>
      </section>

      {/* --- TECHNOLOGY STACK --- */}
      <section className="py-24 bg-white relative border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-xs uppercase tracking-[0.25em] font-semibold text-royal-600 mb-12">Technologies We Leverage</h2>
          <div className="flex flex-wrap justify-center gap-6 opacity-60">
            {['React', 'Next.js', 'Node.js', 'Express', 'MongoDB', 'WordPress', 'Laravel', 'PHP', 'Python', 'AWS', 'Google Cloud', 'Docker', 'GitHub'].map((tech) => (
              <span key={tech} className="text-sm font-semibold uppercase tracking-widest text-navy-950 border border-slate-200 bg-slate-50 px-4 py-2 rounded-lg">{tech}</span>
            ))}
          </div>
        </div>
      </section>

      {/* --- PRICING SECTION --- */}
      <section className="py-24 bg-slate-50 border-t border-slate-200 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center flex flex-col items-center gap-4 mb-16">
            <h2 className="text-xs uppercase tracking-[0.25em] font-semibold text-royal-600">Pricing Packages</h2>
            <h3 className="text-3xl md:text-4xl font-bold font-display text-navy-950">Transparent Plans Tailored to Scale</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Package 1 */}
            <div className="glass p-8 rounded-3xl flex flex-col justify-between h-full">
              <div className="flex flex-col gap-4">
                <h4 className="font-bold text-navy-950 text-lg">Starter VA</h4>
                <p className="text-xs text-slate-500">For small businesses needing quick inbox/calendar sync assistance.</p>
                <span className="text-3xl font-extrabold text-navy-950 mt-4 font-display">$899 <span className="text-xs font-normal text-slate-500">/ month</span></span>
                <ul className="flex flex-col gap-3.5 text-xs text-slate-600 mt-6">
                  <li>20 Hours / Week Allocation</li>
                  <li>Email & Inbox Maintenance</li>
                  <li>Dedicated Manager Support</li>
                  <li>Weekly Operational Reports</li>
                </ul>
              </div>
              <a href="#contact" className="mt-8 block text-center py-3 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-navy-950 rounded-full text-xs font-semibold uppercase">Get Started</a>
            </div>

            {/* Package 2 */}
            <div className="glass p-8 rounded-3xl flex flex-col justify-between border-royal-200 shadow-xl shadow-royal-500/5 h-full relative">
              <span className="absolute top-4 right-4 text-[9px] uppercase font-bold tracking-widest bg-royal-100 text-royal-600 px-2 py-0.5 rounded border border-royal-200">Popular</span>
              <div className="flex flex-col gap-4">
                <h4 className="font-bold text-navy-950 text-lg">Professional VA</h4>
                <p className="text-xs text-slate-500">For mid-size agencies needing daily operational assistance.</p>
                <span className="text-3xl font-extrabold text-navy-950 mt-4 font-display">$1,599 <span className="text-xs font-normal text-slate-500">/ month</span></span>
                <ul className="flex flex-col gap-3.5 text-xs text-slate-600 mt-6">
                  <li>40 Hours / Week Allocation</li>
                  <li>Inboxes, Scheduling, CRM Update</li>
                  <li>Insurance / Custom ERP Access</li>
                  <li>Real-time Slack Updates</li>
                </ul>
              </div>
              <a href="#contact" className="mt-8 block text-center py-3 bg-gradient-to-r from-royal-600 to-blue-500 text-white rounded-full text-xs font-semibold uppercase shadow-lg shadow-royal-500/25">Get Started</a>
            </div>

            {/* Package 3 */}
            <div className="glass p-8 rounded-3xl flex flex-col justify-between h-full">
              <div className="flex flex-col gap-4">
                <h4 className="font-bold text-navy-950 text-lg">Enterprise SLA</h4>
                <p className="text-xs text-slate-500">For large operations or multi-agent back-office teams.</p>
                <span className="text-3xl font-extrabold text-navy-950 mt-4 font-display">$2,999 <span className="text-xs font-normal text-slate-500">/ month</span></span>
                <ul className="flex flex-col gap-3.5 text-xs text-slate-600 mt-6">
                  <li>2 Dedicated Full-Time VA Profiles</li>
                  <li>Full Operations SOP Mapping</li>
                  <li>QA Reviews & Manager Coverage</li>
                  <li>Data Isolations Protocols (VPN)</li>
                </ul>
              </div>
              <a href="#contact" className="mt-8 block text-center py-3 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-navy-950 rounded-full text-xs font-semibold uppercase">Get Started</a>
            </div>

            {/* Package 4 */}
            <div className="glass p-8 rounded-3xl flex flex-col justify-between h-full">
              <div className="flex flex-col gap-4">
                <h4 className="font-bold text-navy-950 text-lg">Custom Solutions</h4>
                <p className="text-xs text-slate-500">For custom web applications development, large database entry, or School ERP.</p>
                <span className="text-3xl font-extrabold text-navy-950 mt-4 font-display">Let's Talk</span>
                <ul className="flex flex-col gap-3.5 text-xs text-slate-600 mt-6">
                  <li>Dedicated Architect & Project Lead</li>
                  <li>Service Level Agreement SLA Grid</li>
                  <li>Custom Tech Stack Integration</li>
                  <li>Flexible Payment Terms</li>
                </ul>
              </div>
              <a href="#contact" className="mt-8 block text-center py-3 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-navy-950 rounded-full text-xs font-semibold uppercase">Book Consultation</a>
            </div>
          </div>
        </div>
      </section>

      {/* --- FAQ SECTION --- */}
      <section id="faq" className="py-24 bg-white relative border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center flex flex-col items-center gap-4 mb-16">
            <h2 className="text-xs uppercase tracking-[0.25em] font-semibold text-royal-600">FAQ</h2>
            <h3 className="text-3xl md:text-4xl font-bold font-display text-navy-950">Frequently Asked Questions</h3>
          </div>
          <FaqAccordion faqs={activeFaqs} />
        </div>
      </section>

      {/* --- CONTACT SECTION --- */}
      <section id="contact" className="py-24 bg-slate-50 relative border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Info side */}
            <div className="flex flex-col gap-6">
              <h2 className="text-xs uppercase tracking-[0.25em] font-semibold text-royal-600">Get in Touch</h2>
              <h3 className="text-3xl md:text-4xl font-bold font-display text-navy-950">Let's Scale Your Operations</h3>
              <p className="text-sm text-slate-500 leading-relaxed max-w-md">
                Ready to delegate your data queues or develop a premium Next.js web application? Fill out our form to connect with an EOG specialist.
              </p>

              <div className="flex flex-col gap-6 mt-6 text-sm text-slate-600 font-medium">
                <div className="flex items-center gap-4">
                  <span className="p-3.5 bg-royal-50 border border-royal-100 text-royal-600 rounded-2xl"><FaPhone /></span>
                  <a href="tel:+918005669833" className="hover:text-royal-600 transition-colors">+91 80056 69833</a>
                </div>
                <div className="flex items-center gap-4">
                  <span className="p-3.5 bg-royal-50 border border-royal-100 text-royal-600 rounded-2xl"><FaEnvelope /></span>
                  <a href="mailto:eliteopsglobal@gmail.com" className="hover:text-royal-600 transition-colors">eliteopsglobal@gmail.com</a>
                </div>
                <div className="flex items-center gap-4">
                  <span className="p-3.5 bg-royal-50 border border-royal-100 text-royal-600 rounded-2xl"><FaGlobe /></span>
                  <a href="https://eliteog.vercel.app/" target="_blank" rel="noopener noreferrer" className="hover:text-royal-600 transition-colors">https://eliteog.vercel.app/</a>
                </div>
              </div>

              {/* Logo in contact section */}
              <div className="relative w-44 h-16 mt-8 flex items-center">
                <img src="/logo.png" alt="EliteOps Global Logo" className="w-full h-full object-contain opacity-60 hover:opacity-100 transition-all duration-300 filter mix-blend-multiply" />
              </div>
            </div>

            {/* Form side */}
            <div className="glass p-8 md:p-10 rounded-3xl relative">
              <h4 className="font-bold text-navy-950 text-lg font-display mb-6">Consultation Form</h4>
              <form onSubmit={handleContactSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-slate-500 font-semibold uppercase">Full Name</label>
                  <input
                    type="text"
                    required
                    value={contactData.name}
                    onChange={(e) => setContactData({ ...contactData, name: e.target.value })}
                    className="bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-navy-950 focus:outline-none focus:border-royal-500 transition-colors shadow-sm"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-slate-500 font-semibold uppercase">Company Name</label>
                  <input
                    type="text"
                    value={contactData.company}
                    onChange={(e) => setContactData({ ...contactData, company: e.target.value })}
                    className="bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-navy-950 focus:outline-none focus:border-royal-500 transition-colors shadow-sm"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-slate-500 font-semibold uppercase">Phone Number</label>
                  <input
                    type="text"
                    value={contactData.phone}
                    onChange={(e) => setContactData({ ...contactData, phone: e.target.value })}
                    className="bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-navy-950 focus:outline-none focus:border-royal-500 transition-colors shadow-sm"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-slate-500 font-semibold uppercase">Email Address</label>
                  <input
                    type="email"
                    required
                    value={contactData.email}
                    onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                    className="bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-navy-950 focus:outline-none focus:border-royal-500 transition-colors shadow-sm"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-slate-500 font-semibold uppercase">Country</label>
                  <input
                    type="text"
                    value={contactData.country}
                    onChange={(e) => setContactData({ ...contactData, country: e.target.value })}
                    className="bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-navy-950 focus:outline-none focus:border-royal-500 transition-colors shadow-sm"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-slate-500 font-semibold uppercase">Industry</label>
                  <input
                    type="text"
                    value={contactData.industry}
                    onChange={(e) => setContactData({ ...contactData, industry: e.target.value })}
                    className="bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-navy-950 focus:outline-none focus:border-royal-500 transition-colors shadow-sm"
                  />
                </div>
                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <label className="text-xs text-slate-500 font-semibold uppercase">Service Required</label>
                  <select
                    value={contactData.service}
                    onChange={(e) => setContactData({ ...contactData, service: e.target.value })}
                    className="bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-navy-950 focus:outline-none focus:border-royal-500 transition-colors shadow-sm"
                  >
                    <option value="">Select a service</option>
                    <option value="Virtual Assistance">Virtual Assistance</option>
                    <option value="Administrative Support">Administrative Support</option>
                    <option value="Insurance Back Office">Insurance Back Office</option>
                    <option value="Data Entry & Processing">Data Entry & Processing</option>
                    <option value="Web Development">Web Development</option>
                    <option value="School & College ERP Solutions">School & College ERP Solutions</option>
                    <option value="E-Commerce Management">E-Commerce Management</option>
                    <option value="Business Process Automation">Business Process Automation</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <label className="text-xs text-slate-500 font-semibold uppercase">Message</label>
                  <textarea
                    rows={4}
                    required
                    value={contactData.message}
                    onChange={(e) => setContactData({ ...contactData, message: e.target.value })}
                    className="bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-navy-950 focus:outline-none focus:border-royal-500 transition-colors resize-none shadow-sm"
                  />
                </div>
                <div className="sm:col-span-2 mt-2">
                  <button
                    type="submit"
                    disabled={contactSubmitting}
                    className="w-full py-4 bg-gradient-to-r from-royal-600 to-blue-500 hover:from-royal-500 hover:to-blue-400 text-white rounded-xl font-bold uppercase tracking-wider text-xs shadow-lg shadow-royal-500/25 cursor-pointer disabled:opacity-50"
                  >
                    {contactSubmitting ? 'Sending Request...' : 'Send Enquiry'}
                  </button>
                </div>
              </form>
              {contactMsg.text && (
                <div className={`mt-5 p-4 rounded-xl text-xs font-semibold ${contactMsg.type === 'success' ? 'bg-green-50 text-green-600 border border-green-200' : 'bg-red-50 text-red-600 border border-red-200'}`}>
                  {contactMsg.text}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* --- CAREERS SECTION --- */}
      <section id="careers" className="py-24 bg-white relative border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center flex flex-col items-center gap-4 mb-16">
            <h2 className="text-xs uppercase tracking-[0.25em] font-semibold text-royal-600">Careers</h2>
            <h3 className="text-3xl md:text-4xl font-bold font-display text-navy-950">Join Our Global Team</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {jobs.map((job, idx) => (
              <div key={idx} className="glass p-8 rounded-3xl flex flex-col justify-between h-full">
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between items-center text-[10px] uppercase font-bold text-royal-600">
                    <span>{job.type}</span>
                    <span>{job.location}</span>
                  </div>
                  <h4 className="font-bold text-navy-950 text-lg font-display">{job.title}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">{job.desc}</p>
                </div>
                <button
                  onClick={() => {
                    setApplyPosition(job.title);
                    setApplyModalOpen(true);
                  }}
                  className="mt-6 block text-center py-3 bg-gradient-to-r from-royal-600 to-blue-500 hover:from-royal-500 hover:to-blue-400 text-white rounded-xl text-xs font-semibold uppercase cursor-pointer"
                >
                  Apply Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Dynamic Careers Apply Modal --- */}
      {applyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="glass p-8 rounded-3xl max-w-lg w-full relative border border-white/10 shadow-2xl">
            <h4 className="text-lg font-bold text-white font-display mb-2">Apply for Position</h4>
            <p className="text-xs text-royal-400 font-semibold mb-6">{applyPosition}</p>
            
            <form onSubmit={handleCareerSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-[10px] text-gray-500 uppercase font-semibold">Full Name</label>
                <input
                  type="text"
                  required
                  value={careerData.name}
                  onChange={(e) => setCareerData({ ...careerData, name: e.target.value })}
                  className="bg-navy-900 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-royal-500"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[10px] text-gray-500 uppercase font-semibold">Email Address</label>
                <input
                  type="email"
                  required
                  value={careerData.email}
                  onChange={(e) => setCareerData({ ...careerData, email: e.target.value })}
                  className="bg-navy-900 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-royal-500"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[10px] text-gray-500 uppercase font-semibold">Phone Number</label>
                <input
                  type="text"
                  required
                  value={careerData.phone}
                  onChange={(e) => setCareerData({ ...careerData, phone: e.target.value })}
                  className="bg-navy-900 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-royal-500"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[10px] text-gray-500 uppercase font-semibold">Upload Resume (PDF, DOC)</label>
                <input
                  type="file"
                  required
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => {
                    if (e.target.files && e.target.files.length > 0) {
                      setResumeFile(e.target.files[0]);
                    }
                  }}
                  className="text-xs text-gray-400 bg-navy-900 border border-white/10 rounded-xl p-2.5 file:mr-4 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-[10px] file:font-semibold file:bg-royal-500/20 file:text-royal-300 hover:file:bg-royal-500/30"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[10px] text-gray-500 uppercase font-semibold">Cover Message</label>
                <textarea
                  rows={3}
                  value={careerData.message}
                  onChange={(e) => setCareerData({ ...careerData, message: e.target.value })}
                  className="bg-navy-900 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-royal-500 resize-none"
                />
              </div>

              <div className="flex gap-4 mt-4">
                <button
                  type="button"
                  onClick={() => setApplyModalOpen(false)}
                  className="w-1/2 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl text-xs font-semibold uppercase cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={careerSubmitting}
                  className="w-1/2 py-3 bg-gradient-to-r from-royal-600 to-blue-500 text-white rounded-xl text-xs font-semibold uppercase cursor-pointer disabled:opacity-50"
                >
                  {careerSubmitting ? 'Submitting...' : 'Submit'}
                </button>
              </div>
            </form>
            {careerMsg.text && (
              <div className={`mt-4 p-3 rounded-xl text-[10px] font-semibold text-center ${careerMsg.type === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                {careerMsg.text}
              </div>
            )}
          </div>
        </div>
      )}

      {/* --- BLOG SECTION --- */}
      <section id="blog" className="py-24 bg-slate-50 relative border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center flex flex-col items-center gap-4 mb-16">
            <h2 className="text-xs uppercase tracking-[0.25em] font-semibold text-royal-600">Our Blog</h2>
            <h3 className="text-3xl md:text-4xl font-bold font-display text-navy-950">Latest Corporate Insights</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'The Future of Insurance Back Office Ops', category: 'Insurance', date: 'Jul 15, 2026', desc: 'Discover how machine learning and OCR automation integrations are saving agencies thousands of hours.' },
              { title: 'Virtual Assistants: Scaling Without Overhead', category: 'Virtual Support', date: 'Jul 10, 2026', desc: 'A deep-dive analysis on how dedicated virtual support squads optimize daily calendar tasks.' },
              { title: 'Choosing the Right School ERP Architecture', category: 'Education', date: 'Jul 04, 2026', desc: 'Essential criteria for heads of schools when migrating student profiles databases and tuition fees managers.' }
            ].map((blog, idx) => (
              <div key={idx} className="glass-card rounded-3xl overflow-hidden flex flex-col justify-between h-full group">
                <div className="p-6 flex flex-col gap-3">
                  <div className="flex justify-between items-center text-[10px] text-slate-500 font-semibold uppercase">
                    <span>{blog.category}</span>
                    <span>{blog.date}</span>
                  </div>
                  <h4 className="font-bold text-navy-950 text-base group-hover:text-royal-600 transition-colors font-display">{blog.title}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">{blog.desc}</p>
                </div>
                <span className="p-6 pt-0 inline-flex items-center gap-1 text-xs text-royal-600 hover:text-royal-700 font-semibold cursor-pointer">
                  Read Article <FaArrowRight size={10} />
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Floating Action Button (FAB) */}
      <a 
        href="#contact" 
        className="fixed bottom-6 right-6 z-40 bg-gradient-to-r from-royal-600 to-blue-500 hover:from-royal-500 hover:to-blue-400 text-white p-4 rounded-full shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(37,99,235,0.7)] transition-all hover:scale-110 flex items-center justify-center group"
        aria-label="Contact Us"
      >
        <FaEnvelope size={20} className="group-hover:animate-pulse" />
      </a>

      <Footer />
    </>
  );
}
