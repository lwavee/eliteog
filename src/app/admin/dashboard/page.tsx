'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../context/AuthContext';
import api from '../../../utils/api';
import {
  FaChartLine, FaConciergeBell, FaProjectDiagram, FaBlog, FaInbox,
  FaFileInvoice, FaUsers, FaQuestionCircle, FaStar, FaSlidersH,
  FaSignOutAlt, FaPlus, FaEdit, FaTrash, FaCheck, FaTimes, FaGlobe, FaChevronRight
} from 'react-icons/fa';

export default function AdminDashboard() {
  const { user, token, loading, logout } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('analytics');

  // Lists State
  const [stats, setStats] = useState<any>(null);
  const [services, setServices] = useState<any[]>([]);
  const [portfolios, setPortfolios] = useState<any[]>([]);
  const [blogs, setBlogs] = useState<any[]>([]);
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const [subscribers, setSubscribers] = useState<any[]>([]);
  const [faqs, setFaqs] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);

  // Action states
  const [msg, setMsg] = useState({ text: '', type: '' });
  const [editingId, setEditingId] = useState<string | null>(null);

  // Forms states
  const [serviceForm, setServiceForm] = useState({ title: '', slug: '', description: '', category: 'Virtual Assistance', icon: 'FaHeadset' });
  const [portfolioForm, setPortfolioForm] = useState({ title: '', description: '', category: 'Websites', tags: '', client: '', year: '', projectUrl: '' });
  const [blogForm, setBlogForm] = useState({ title: '', slug: '', content: '', excerpt: '', coverImage: '/logo.png', tags: '', category: 'Digital Solutions', published: true });
  const [faqForm, setFaqForm] = useState({ question: '', answer: '', category: 'General', order: 0 });
  const [testimonialForm, setTestimonialForm] = useState({ author: '', company: '', position: '', rating: 5, review: '' });

  // Redirect if not authenticated
  useEffect(() => {
    if (!loading && !token) {
      router.push('/admin');
    }
  }, [token, loading]);

  // Fetch Lists
  const fetchDashboardData = async () => {
    if (!token) return;
    try {
      const [statsRes, srvRes, portRes, blogRes, enqRes, appRes, subRes, faqRes, testRes] = await Promise.all([
        api.get('/admin/stats'),
        api.get('/public/services'),
        api.get('/public/portfolios'),
        api.get('/public/blogs'),
        api.get('/admin/enquiries'),
        api.get('/admin/applications'),
        api.get('/admin/subscribers'),
        api.get('/public/faqs'),
        api.get('/public/testimonials')
      ]);

      if (statsRes.success) setStats(statsRes.data);
      if (srvRes.success) setServices(srvRes.data);
      if (portRes.success) setPortfolios(portRes.data);
      if (blogRes.success) setBlogs(blogRes.data);
      if (enqRes.success) setEnquiries(enqRes.data);
      if (appRes.success) setApplications(appRes.data);
      if (subRes.success) setSubscribers(subRes.data);
      if (faqRes.success) setFaqs(faqRes.data);
      if (testRes.success) setTestimonials(testRes.data);
    } catch (err) {
      console.error('Error fetching dashboard listings:', err);
    }
  };

  useEffect(() => {
    if (token) {
      fetchDashboardData();
    }
  }, [token]);

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-navy-950 flex items-center justify-center text-white">
        <p className="text-sm font-semibold tracking-widest uppercase animate-pulse">Verifying Session...</p>
      </div>
    );
  }

  // --- SERVICE OPERATIONS ---
  const handleServiceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg({ text: '', type: '' });
    try {
      let res;
      if (editingId) {
        res = await api.put(`/admin/services/${editingId}`, serviceForm);
      } else {
        res = await api.post('/admin/services', serviceForm);
      }

      if (res.success) {
        setMsg({ text: `Service ${editingId ? 'updated' : 'added'} successfully!`, type: 'success' });
        setServiceForm({ title: '', slug: '', description: '', category: 'Virtual Assistance', icon: 'FaHeadset' });
        setEditingId(null);
        fetchDashboardData();
      }
    } catch (err: any) {
      setMsg({ text: err.message || 'Action failed.', type: 'error' });
    }
  };

  const deleteService = async (id: string) => {
    if (!confirm('Are you sure you want to delete this service?')) return;
    try {
      const res = await api.delete(`/admin/services/${id}`);
      if (res.success) {
        setMsg({ text: 'Service deleted successfully', type: 'success' });
        fetchDashboardData();
      }
    } catch (err: any) {
      setMsg({ text: err.message, type: 'error' });
    }
  };

  // --- PORTFOLIO OPERATIONS ---
  const handlePortfolioSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg({ text: '', type: '' });
    const payload = {
      ...portfolioForm,
      tags: portfolioForm.tags.split(',').map(t => t.trim()),
      images: ['/logo.png']
    };
    try {
      let res;
      if (editingId) {
        res = await api.put(`/admin/portfolio/${editingId}`, payload);
      } else {
        res = await api.post('/admin/portfolio', payload);
      }

      if (res.success) {
        setMsg({ text: `Project ${editingId ? 'updated' : 'added'} successfully!`, type: 'success' });
        setPortfolioForm({ title: '', description: '', category: 'Websites', tags: '', client: '', year: '', projectUrl: '' });
        setEditingId(null);
        fetchDashboardData();
      }
    } catch (err: any) {
      setMsg({ text: err.message || 'Action failed.', type: 'error' });
    }
  };

  const deletePortfolio = async (id: string) => {
    if (!confirm('Delete this case study?')) return;
    try {
      const res = await api.delete(`/admin/portfolio/${id}`);
      if (res.success) {
        setMsg({ text: 'Project deleted', type: 'success' });
        fetchDashboardData();
      }
    } catch (err: any) {
      setMsg({ text: err.message, type: 'error' });
    }
  };

  // --- BLOG OPERATIONS ---
  const handleBlogSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg({ text: '', type: '' });
    const payload = {
      ...blogForm,
      tags: blogForm.tags.split(',').map(t => t.trim()),
    };
    try {
      let res;
      if (editingId) {
        res = await api.put(`/admin/blogs/${editingId}`, payload);
      } else {
        res = await api.post('/admin/blogs', payload);
      }

      if (res.success) {
        setMsg({ text: `Blog post ${editingId ? 'updated' : 'added'}!`, type: 'success' });
        setBlogForm({ title: '', slug: '', content: '', excerpt: '', coverImage: '/logo.png', tags: '', category: 'Digital Solutions', published: true });
        setEditingId(null);
        fetchDashboardData();
      }
    } catch (err: any) {
      setMsg({ text: err.message, type: 'error' });
    }
  };

  const deleteBlog = async (id: string) => {
    if (!confirm('Delete this article?')) return;
    try {
      const res = await api.delete(`/admin/blogs/${id}`);
      if (res.success) {
        setMsg({ text: 'Article deleted', type: 'success' });
        fetchDashboardData();
      }
    } catch (err: any) {
      setMsg({ text: err.message, type: 'error' });
    }
  };

  // --- CONTACT ENQUIRIES STATUS ---
  const markEnquiryRead = async (id: string, status: string) => {
    try {
      const res = await api.put(`/admin/enquiries/${id}`, { status });
      if (res.success) {
        fetchDashboardData();
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  const deleteEnquiry = async (id: string) => {
    if (!confirm('Remove enquiry record?')) return;
    try {
      const res = await api.delete(`/admin/enquiries/${id}`);
      if (res.success) fetchDashboardData();
    } catch (err: any) {
      console.error(err);
    }
  };

  // --- APPLICATIONS STATUS ---
  const updateAppStatus = async (id: string, status: string) => {
    try {
      const res = await api.put(`/admin/applications/${id}`, { status });
      if (res.success) fetchDashboardData();
    } catch (err: any) {
      console.error(err);
    }
  };

  const deleteApplication = async (id: string) => {
    if (!confirm('Remove job application?')) return;
    try {
      const res = await api.delete(`/admin/applications/${id}`);
      if (res.success) fetchDashboardData();
    } catch (err: any) {
      console.error(err);
    }
  };

  const tabs = [
    { id: 'analytics', label: 'Analytics', icon: <FaChartLine /> },
    { id: 'services', label: 'Services', icon: <FaConciergeBell /> },
    { id: 'portfolios', label: 'Portfolios', icon: <FaProjectDiagram /> },
    { id: 'blogs', label: 'Blogs', icon: <FaBlog /> },
    { id: 'enquiries', label: `Inquiries (${enquiries.filter(e => e.status === 'unread').length})`, icon: <FaInbox /> },
    { id: 'careers', label: `Careers (${applications.filter(a => a.status === 'pending').length})`, icon: <FaFileInvoice /> },
    { id: 'subscribers', label: 'Subscribers', icon: <FaUsers /> },
  ];

  return (
    <div className="min-h-screen bg-navy-950 flex flex-col lg:flex-row text-gray-100">
      {/* Sidebar Panel */}
      <aside className="w-full lg:w-72 bg-navy-900 border-r border-white/5 p-6 flex flex-col justify-between gap-8">
        <div className="flex flex-col gap-8">
          {/* Header */}
          <div className="flex items-center gap-3 border-b border-white/5 pb-4">
            <div className="w-10 h-10 rounded-full bg-royal-600 flex items-center justify-center font-bold">
              {user.username.charAt(0).toUpperCase()}
            </div>
            <div>
              <h4 className="font-bold text-sm text-white">{user.username}</h4>
              <p className="text-[10px] text-royal-400 uppercase font-semibold tracking-wider">{user.role}</p>
            </div>
          </div>

          {/* Nav Items */}
          <nav className="flex flex-col gap-1.5">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setEditingId(null);
                  setMsg({ text: '', type: '' });
                }}
                className={`flex items-center gap-3 px-4.5 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider text-left transition-colors cursor-pointer w-full ${
                  activeTab === tab.id
                    ? 'bg-royal-600 text-white shadow-lg shadow-royal-600/25'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Footer actions */}
        <button
          onClick={logout}
          className="flex items-center gap-3 px-4.5 py-3.5 rounded-xl text-xs font-semibold uppercase tracking-wider text-red-400 hover:text-white hover:bg-red-500/10 transition-colors w-full cursor-pointer border border-red-500/20"
        >
          <FaSignOutAlt /> Sign Out
        </button>
      </aside>

      {/* Main Panel Content */}
      <main className="flex-grow p-6 lg:p-10 max-h-screen overflow-y-auto">
        <h2 className="text-xl lg:text-2xl font-bold font-display text-white mb-8 border-b border-white/5 pb-4 uppercase tracking-wider">
          {activeTab} Management
        </h2>

        {msg.text && (
          <div className={`mb-6 p-4 rounded-xl text-xs font-semibold ${msg.type === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
            {msg.text}
          </div>
        )}

        {/* --- ANALYTICS / STATS TAB --- */}
        {activeTab === 'analytics' && stats && (
          <div className="flex flex-col gap-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="glass p-6 rounded-2xl">
                <p className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold">Total Services</p>
                <p className="text-3xl font-extrabold text-white mt-1 font-display">{stats.counts.services}</p>
              </div>
              <div className="glass p-6 rounded-2xl">
                <p className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold">Total Case Studies</p>
                <p className="text-3xl font-extrabold text-white mt-1 font-display">{stats.counts.projects}</p>
              </div>
              <div className="glass p-6 rounded-2xl">
                <p className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold">Pending Enquiries</p>
                <p className="text-3xl font-extrabold text-royal-400 mt-1 font-display">{stats.counts.pendingEnquiries}</p>
              </div>
              <div className="glass p-6 rounded-2xl">
                <p className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold">Newsletter Users</p>
                <p className="text-3xl font-extrabold text-white mt-1 font-display">{stats.counts.subscribers}</p>
              </div>
            </div>

            {/* Recents enquiries list */}
            <div className="glass p-6 rounded-3xl flex flex-col gap-4">
              <h3 className="font-bold text-white text-base font-display">Recent Client Inquiries</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-white/5 text-gray-500">
                      <th className="py-3 px-2">Name</th>
                      <th className="py-3 px-2">Email</th>
                      <th className="py-3 px-2">Service</th>
                      <th className="py-3 px-2">Date</th>
                      <th className="py-3 px-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {enquiries.slice(0, 5).map((e, idx) => (
                      <tr key={idx} className="border-b border-white/5 text-gray-300">
                        <td className="py-3.5 px-2 font-semibold text-white">{e.name}</td>
                        <td className="py-3.5 px-2">{e.email}</td>
                        <td className="py-3.5 px-2">{e.service || 'General'}</td>
                        <td className="py-3.5 px-2">{new Date(e.createdAt).toLocaleDateString()}</td>
                        <td className="py-3.5 px-2">
                          <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold ${e.status === 'unread' ? 'bg-royal-500/20 text-royal-300' : 'bg-green-500/20 text-green-400'}`}>
                            {e.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* --- SERVICES TAB --- */}
        {activeTab === 'services' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="glass p-6 rounded-3xl h-fit border border-white/5">
              <h3 className="font-bold text-white mb-6 font-display">{editingId ? 'Edit Service' : 'Add New Service'}</h3>
              <form onSubmit={handleServiceSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] text-gray-500 uppercase font-semibold">Title</label>
                  <input
                    type="text"
                    required
                    value={serviceForm.title}
                    onChange={(e) => setServiceForm({ ...serviceForm, title: e.target.value, slug: e.target.value.toLowerCase().replace(/ /g, '-') })}
                    className="bg-navy-900 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] text-gray-500 uppercase font-semibold">Slug</label>
                  <input
                    type="text"
                    required
                    value={serviceForm.slug}
                    onChange={(e) => setServiceForm({ ...serviceForm, slug: e.target.value })}
                    className="bg-navy-900 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] text-gray-500 uppercase font-semibold">Category</label>
                  <select
                    value={serviceForm.category}
                    onChange={(e) => setServiceForm({ ...serviceForm, category: e.target.value })}
                    className="bg-navy-900 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white"
                  >
                    <option value="Virtual Assistance">Virtual Assistance</option>
                    <option value="Administrative Support">Administrative Support</option>
                    <option value="Insurance Back Office">Insurance Back Office</option>
                    <option value="Data Entry">Data Entry</option>
                    <option value="Web Development">Web Development</option>
                    <option value="School & College Solutions">School & College Solutions</option>
                    <option value="E-Commerce Solutions">E-Commerce Solutions</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] text-gray-500 uppercase font-semibold">Description</label>
                  <textarea
                    rows={4}
                    required
                    value={serviceForm.description}
                    onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })}
                    className="bg-navy-900 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white resize-none"
                  />
                </div>
                <button type="submit" className="py-3 bg-royal-600 hover:bg-royal-500 text-white text-xs uppercase font-bold rounded-xl shadow-lg cursor-pointer">
                  {editingId ? 'Update Service' : 'Create Service'}
                </button>
              </form>
            </div>

            {/* List */}
            <div className="lg:col-span-2 flex flex-col gap-4">
              {services.map((s) => (
                <div key={s._id} className="glass p-5 rounded-2xl flex items-center justify-between border border-white/5">
                  <div>
                    <h4 className="font-bold text-white text-sm font-display">{s.title}</h4>
                    <span className="text-[10px] text-royal-400 bg-royal-500/10 px-2 py-0.5 rounded">{s.category}</span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setEditingId(s._id);
                        setServiceForm({ title: s.title, slug: s.slug, description: s.description, category: s.category, icon: s.icon });
                      }}
                      className="p-2 bg-royal-600/20 text-royal-400 hover:bg-royal-600 hover:text-white rounded-lg transition-colors cursor-pointer"
                    >
                      <FaEdit size={12} />
                    </button>
                    <button
                      onClick={() => deleteService(s._id)}
                      className="p-2 bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white rounded-lg transition-colors cursor-pointer"
                    >
                      <FaTrash size={12} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- PORTFOLIOS TAB --- */}
        {activeTab === 'portfolios' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="glass p-6 rounded-3xl h-fit border border-white/5">
              <h3 className="font-bold text-white mb-6 font-display">{editingId ? 'Edit Project' : 'Add Project'}</h3>
              <form onSubmit={handlePortfolioSubmit} className="flex flex-col gap-4">
                <input
                  type="text"
                  required
                  placeholder="Project Title"
                  value={portfolioForm.title}
                  onChange={(e) => setPortfolioForm({ ...portfolioForm, title: e.target.value })}
                  className="bg-navy-900 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white"
                />
                <select
                  value={portfolioForm.category}
                  onChange={(e) => setPortfolioForm({ ...portfolioForm, category: e.target.value })}
                  className="bg-navy-900 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white"
                >
                  <option value="Insurance">Insurance</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Schools">Schools</option>
                  <option value="Colleges">Colleges</option>
                  <option value="Websites">Websites</option>
                  <option value="Ecommerce">Ecommerce</option>
                  <option value="Business Automation">Business Automation</option>
                </select>
                <textarea
                  placeholder="Description"
                  rows={3}
                  value={portfolioForm.description}
                  onChange={(e) => setPortfolioForm({ ...portfolioForm, description: e.target.value })}
                  className="bg-navy-900 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white resize-none"
                />
                <input
                  type="text"
                  placeholder="Tags (comma separated: React, NodeJS)"
                  value={portfolioForm.tags}
                  onChange={(e) => setPortfolioForm({ ...portfolioForm, tags: e.target.value })}
                  className="bg-navy-900 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white"
                />
                <input
                  type="text"
                  placeholder="Client"
                  value={portfolioForm.client}
                  onChange={(e) => setPortfolioForm({ ...portfolioForm, client: e.target.value })}
                  className="bg-navy-900 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white"
                />
                <input
                  type="text"
                  placeholder="Year"
                  value={portfolioForm.year}
                  onChange={(e) => setPortfolioForm({ ...portfolioForm, year: e.target.value })}
                  className="bg-navy-900 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white"
                />
                <button type="submit" className="py-3 bg-royal-600 hover:bg-royal-500 text-white text-xs uppercase font-bold rounded-xl shadow-lg cursor-pointer">
                  {editingId ? 'Update Project' : 'Create Project'}
                </button>
              </form>
            </div>

            <div className="lg:col-span-2 flex flex-col gap-4">
              {portfolios.map((p) => (
                <div key={p._id} className="glass p-5 rounded-2xl flex items-center justify-between border border-white/5">
                  <div>
                    <h4 className="font-bold text-white text-sm font-display">{p.title}</h4>
                    <span className="text-[10px] text-royal-400 bg-royal-500/10 px-2 py-0.5 rounded">{p.category}</span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setEditingId(p._id);
                        setPortfolioForm({ title: p.title, description: p.description, category: p.category, tags: p.tags.join(','), client: p.client || '', year: p.year || '', projectUrl: p.projectUrl || '' });
                      }}
                      className="p-2 bg-royal-600/20 text-royal-400 hover:bg-royal-600 hover:text-white rounded-lg transition-colors cursor-pointer"
                    >
                      <FaEdit size={12} />
                    </button>
                    <button onClick={() => deletePortfolio(p._id)} className="p-2 bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white rounded-lg transition-colors cursor-pointer">
                      <FaTrash size={12} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- BLOGS TAB --- */}
        {activeTab === 'blogs' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="glass p-6 rounded-3xl h-fit border border-white/5">
              <h3 className="font-bold text-white mb-6 font-display">{editingId ? 'Edit Article' : 'Write Blog'}</h3>
              <form onSubmit={handleBlogSubmit} className="flex flex-col gap-4">
                <input
                  type="text"
                  required
                  placeholder="Article Title"
                  value={blogForm.title}
                  onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value, slug: e.target.value.toLowerCase().replace(/ /g, '-') })}
                  className="bg-navy-900 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white"
                />
                <input
                  type="text"
                  required
                  placeholder="Slug"
                  value={blogForm.slug}
                  onChange={(e) => setBlogForm({ ...blogForm, slug: e.target.value })}
                  className="bg-navy-900 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white"
                />
                <textarea
                  placeholder="Excerpt"
                  rows={2}
                  required
                  value={blogForm.excerpt}
                  onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })}
                  className="bg-navy-900 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white resize-none"
                />
                <textarea
                  placeholder="Main Markdown Content"
                  rows={6}
                  required
                  value={blogForm.content}
                  onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                  className="bg-navy-900 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white"
                />
                <input
                  type="text"
                  placeholder="Tags (React, Cloud)"
                  value={blogForm.tags}
                  onChange={(e) => setBlogForm({ ...blogForm, tags: e.target.value })}
                  className="bg-navy-900 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white"
                />
                <button type="submit" className="py-3 bg-royal-600 hover:bg-royal-500 text-white text-xs uppercase font-bold rounded-xl shadow-lg cursor-pointer">
                  {editingId ? 'Update Article' : 'Publish Blog'}
                </button>
              </form>
            </div>

            <div className="lg:col-span-2 flex flex-col gap-4">
              {blogs.map((b) => (
                <div key={b._id} className="glass p-5 rounded-2xl flex items-center justify-between border border-white/5">
                  <div>
                    <h4 className="font-bold text-white text-sm font-display">{b.title}</h4>
                    <span className="text-[10px] text-gray-500 uppercase">{b.category} | {new Date(b.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setEditingId(b._id);
                        setBlogForm({ title: b.title, slug: b.slug, content: b.content, excerpt: b.excerpt, coverImage: b.coverImage, tags: b.tags.join(','), category: b.category, published: b.published });
                      }}
                      className="p-2 bg-royal-600/20 text-royal-400 hover:bg-royal-600 hover:text-white rounded-lg transition-colors cursor-pointer"
                    >
                      <FaEdit size={12} />
                    </button>
                    <button onClick={() => deleteBlog(b._id)} className="p-2 bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white rounded-lg transition-colors cursor-pointer">
                      <FaTrash size={12} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- INQUIRIES TAB --- */}
        {activeTab === 'enquiries' && (
          <div className="flex flex-col gap-6">
            {enquiries.map((e) => (
              <div key={e._id} className="glass p-6 rounded-3xl flex flex-col gap-4 border border-white/5 relative">
                <div className="flex items-center justify-between border-b border-white/5 pb-3">
                  <div>
                    <h4 className="font-bold text-white text-base font-display">{e.name}</h4>
                    <p className="text-xs text-gray-500">{e.email} | {e.phone || 'No Phone'} | {e.country || 'No Country'}</p>
                  </div>
                  <span className={`px-2.5 py-1 rounded text-[10px] uppercase font-extrabold ${e.status === 'unread' ? 'bg-royal-500/20 text-royal-300' : 'bg-green-500/20 text-green-400'}`}>
                    {e.status}
                  </span>
                </div>
                <div className="text-sm text-gray-300">
                  <p className="font-semibold text-xs text-gray-500 uppercase mb-1">Company / Industry / Service</p>
                  <p className="text-xs text-white mb-3">{e.company || 'Private'} | {e.industry || 'General'} | <span className="text-royal-400 font-bold">{e.service || 'General'}</span></p>
                  <p className="leading-relaxed bg-navy-950 p-4 rounded-xl text-xs">{e.message}</p>
                </div>
                <div className="flex gap-3 justify-end">
                  {e.status === 'unread' && (
                    <button
                      onClick={() => markEnquiryRead(e._id, 'read')}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-500/10 text-green-400 border border-green-500/20 text-xs font-bold rounded-lg cursor-pointer"
                    >
                      <FaCheck size={10} /> Mark Read
                    </button>
                  )}
                  <button
                    onClick={() => deleteEnquiry(e._id)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-500/10 text-red-400 border border-red-500/20 text-xs font-bold rounded-lg cursor-pointer"
                  >
                    <FaTrash size={10} /> Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* --- CAREERS APPLICATIONS TAB --- */}
        {activeTab === 'careers' && (
          <div className="flex flex-col gap-6">
            {applications.map((app) => (
              <div key={app._id} className="glass p-6 rounded-3xl flex flex-col gap-4 border border-white/5">
                <div className="flex justify-between items-center border-b border-white/5 pb-3">
                  <div>
                    <h4 className="font-bold text-white text-base font-display">{app.name}</h4>
                    <p className="text-xs text-royal-400 font-semibold">{app.position}</p>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold ${app.status === 'pending' ? 'bg-royal-500/20 text-royal-300' : 'bg-green-500/20 text-green-400'}`}>
                    {app.status}
                  </span>
                </div>
                <p className="text-xs text-gray-500">Email: {app.email} | Phone: {app.phone}</p>
                {app.message && <p className="text-xs text-gray-300 bg-navy-950 p-4 rounded-xl leading-relaxed">{app.message}</p>}
                
                <div className="flex items-center justify-between border-t border-white/5 pt-4 mt-2">
                  <a
                    href={`http://localhost:5000${app.resumeUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-royal-400 hover:text-white underline"
                  >
                    Download Resume
                  </a>
                  <div className="flex gap-2">
                    {app.status === 'pending' && (
                      <button
                        onClick={() => updateAppStatus(app._id, 'reviewed')}
                        className="px-3 py-1.5 bg-green-500/10 text-green-400 text-xs font-bold rounded-lg cursor-pointer"
                      >
                        Mark Reviewed
                      </button>
                    )}
                    <button
                      onClick={() => deleteApplication(app._id)}
                      className="px-3 py-1.5 bg-red-500/10 text-red-400 text-xs font-bold rounded-lg cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* --- SUBSCRIBERS TAB --- */}
        {activeTab === 'subscribers' && (
          <div className="glass p-6 rounded-3xl border border-white/5">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-white/5 text-gray-500">
                    <th className="py-3 px-2">Subscriber Email</th>
                    <th className="py-3 px-2">Subscribed Date</th>
                    <th className="py-3 px-2">Status</th>
                    <th className="py-3 px-2 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {subscribers.map((s, idx) => (
                    <tr key={idx} className="border-b border-white/5 text-gray-300">
                      <td className="py-3.5 px-2 font-mono text-white text-sm">{s.email}</td>
                      <td className="py-3.5 px-2">{new Date(s.createdAt).toLocaleDateString()}</td>
                      <td className="py-3.5 px-2">
                        <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold ${s.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                          {s.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-2 text-right">
                        <button
                          onClick={async () => {
                            if (!confirm('Remove subscriber?')) return;
                            const res = await api.delete(`/admin/subscribers/${s._id}`);
                            if (res.success) fetchDashboardData();
                          }}
                          className="text-red-400 hover:text-white p-2 bg-red-500/10 rounded-lg cursor-pointer"
                        >
                          <FaTrash size={10} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
