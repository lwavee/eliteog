import { Request, Response } from 'express';
import Service from '../models/Service';
import Portfolio from '../models/Portfolio';
import Blog from '../models/Blog';
import Enquiry from '../models/Enquiry';
import JobApplication from '../models/JobApplication';
import Testimonial from '../models/Testimonial';
import Faq from '../models/Faq';
import Subscriber from '../models/Subscriber';
import Setting from '../models/Setting';
import User from '../models/User';

// --- SERVICE CRUD ---
export const addService = async (req: Request, res: Response) => {
  try {
    const service = await Service.create(req.body);
    res.status(201).json({ success: true, data: service });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const editService = async (req: Request, res: Response) => {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!service) return res.status(404).json({ success: false, message: 'Service not found' });
    res.status(200).json({ success: true, data: service });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteService = async (req: Request, res: Response) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) return res.status(404).json({ success: false, message: 'Service not found' });
    res.status(200).json({ success: true, data: {} });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// --- PORTFOLIO CRUD ---
export const addPortfolio = async (req: Request, res: Response) => {
  try {
    const portfolio = await Portfolio.create(req.body);
    res.status(201).json({ success: true, data: portfolio });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const editPortfolio = async (req: Request, res: Response) => {
  try {
    const portfolio = await Portfolio.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!portfolio) return res.status(404).json({ success: false, message: 'Portfolio item not found' });
    res.status(200).json({ success: true, data: portfolio });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const deletePortfolio = async (req: Request, res: Response) => {
  try {
    const portfolio = await Portfolio.findByIdAndDelete(req.params.id);
    if (!portfolio) return res.status(404).json({ success: false, message: 'Portfolio item not found' });
    res.status(200).json({ success: true, data: {} });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// --- BLOG CRUD ---
export const addBlog = async (req: Request, res: Response) => {
  try {
    const blog = await Blog.create(req.body);
    res.status(201).json({ success: true, data: blog });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const editBlog = async (req: Request, res: Response) => {
  try {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!blog) return res.status(404).json({ success: false, message: 'Blog post not found' });
    res.status(200).json({ success: true, data: blog });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteBlog = async (req: Request, res: Response) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) return res.status(404).json({ success: false, message: 'Blog post not found' });
    res.status(200).json({ success: true, data: {} });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// --- ENQUIRY MANAGEMENT ---
export const getEnquiries = async (req: Request, res: Response) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: enquiries });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateEnquiryStatus = async (req: Request, res: Response) => {
  try {
    const enquiry = await Enquiry.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    if (!enquiry) return res.status(404).json({ success: false, message: 'Enquiry not found' });
    res.status(200).json({ success: true, data: enquiry });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteEnquiry = async (req: Request, res: Response) => {
  try {
    const enquiry = await Enquiry.findByIdAndDelete(req.params.id);
    if (!enquiry) return res.status(404).json({ success: false, message: 'Enquiry not found' });
    res.status(200).json({ success: true, data: {} });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// --- JOB APPLICATION MANAGEMENT ---
export const getApplications = async (req: Request, res: Response) => {
  try {
    const applications = await JobApplication.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: applications });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateApplicationStatus = async (req: Request, res: Response) => {
  try {
    const application = await JobApplication.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    if (!application) return res.status(404).json({ success: false, message: 'Application not found' });
    res.status(200).json({ success: true, data: application });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteApplication = async (req: Request, res: Response) => {
  try {
    const application = await JobApplication.findByIdAndDelete(req.params.id);
    if (!application) return res.status(404).json({ success: false, message: 'Application not found' });
    res.status(200).json({ success: true, data: {} });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// --- TESTIMONIAL CRUD ---
export const addTestimonial = async (req: Request, res: Response) => {
  try {
    const testimonial = await Testimonial.create(req.body);
    res.status(201).json({ success: true, data: testimonial });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const editTestimonial = async (req: Request, res: Response) => {
  try {
    const testimonial = await Testimonial.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!testimonial) return res.status(404).json({ success: false, message: 'Testimonial not found' });
    res.status(200).json({ success: true, data: testimonial });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteTestimonial = async (req: Request, res: Response) => {
  try {
    const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
    if (!testimonial) return res.status(404).json({ success: false, message: 'Testimonial not found' });
    res.status(200).json({ success: true, data: {} });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// --- FAQ CRUD ---
export const addFaq = async (req: Request, res: Response) => {
  try {
    const faq = await Faq.create(req.body);
    res.status(201).json({ success: true, data: faq });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const editFaq = async (req: Request, res: Response) => {
  try {
    const faq = await Faq.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!faq) return res.status(404).json({ success: false, message: 'FAQ not found' });
    res.status(200).json({ success: true, data: faq });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteFaq = async (req: Request, res: Response) => {
  try {
    const faq = await Faq.findByIdAndDelete(req.params.id);
    if (!faq) return res.status(404).json({ success: false, message: 'FAQ not found' });
    res.status(200).json({ success: true, data: {} });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// --- NEWSLETTER SUBSCRIBERS ---
export const getSubscribers = async (req: Request, res: Response) => {
  try {
    const subscribers = await Subscriber.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: subscribers });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateSubscriberStatus = async (req: Request, res: Response) => {
  try {
    const subscriber = await Subscriber.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    if (!subscriber) return res.status(404).json({ success: false, message: 'Subscriber not found' });
    res.status(200).json({ success: true, data: subscriber });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteSubscriber = async (req: Request, res: Response) => {
  try {
    const subscriber = await Subscriber.findByIdAndDelete(req.params.id);
    if (!subscriber) return res.status(404).json({ success: false, message: 'Subscriber not found' });
    res.status(200).json({ success: true, data: {} });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// --- SETTINGS (SEO, CONFIG) ---
export const getSettings = async (req: Request, res: Response) => {
  try {
    const settings = await Setting.find();
    res.status(200).json({ success: true, data: settings });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateSetting = async (req: Request, res: Response) => {
  try {
    const { key, value } = req.body;
    const setting = await Setting.findOneAndUpdate({ key }, { value }, { new: true, upsert: true });
    res.status(200).json({ success: true, data: setting });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// --- ROLE MANAGEMENT ---
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find({}, '-password');
    res.status(200).json({ success: true, data: users });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateUserRole = async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, { role: req.body.role }, { new: true });
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    res.status(200).json({ success: true, data: user });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// --- DASHBOARD STATISTICS ---
export const getDashboardStats = async (req: Request, res: Response) => {
  try {
    const totalServices = await Service.countDocuments();
    const totalProjects = await Portfolio.countDocuments();
    const totalBlogs = await Blog.countDocuments();
    const totalEnquiries = await Enquiry.countDocuments();
    const pendingEnquiries = await Enquiry.countDocuments({ status: 'unread' });
    const totalApplications = await JobApplication.countDocuments();
    const pendingApplications = await JobApplication.countDocuments({ status: 'pending' });
    const totalSubscribers = await Subscriber.countDocuments({ status: 'active' });
    const totalUsers = await User.countDocuments();

    // Industry stats breakdown
    const industriesBreakdown = await Enquiry.aggregate([
      { $group: { _id: '$industry', count: { $sum: 1 } } }
    ]);

    // Service stats breakdown
    const servicesBreakdown = await Enquiry.aggregate([
      { $group: { _id: '$service', count: { $sum: 1 } } }
    ]);

    res.status(200).json({
      success: true,
      data: {
        counts: {
          services: totalServices,
          projects: totalProjects,
          blogs: totalBlogs,
          enquiries: totalEnquiries,
          pendingEnquiries,
          applications: totalApplications,
          pendingApplications,
          subscribers: totalSubscribers,
          users: totalUsers,
        },
        analytics: {
          industries: industriesBreakdown,
          services: servicesBreakdown,
        }
      }
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
