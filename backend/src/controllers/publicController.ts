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
import { sendEnquiryEmail, sendJobApplicationEmail } from '../utils/mailer';

// Get all services
export const getServices = async (req: Request, res: Response) => {
  try {
    const services = await Service.find();
    res.status(200).json({ success: true, data: services });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all portfolio items
export const getPortfolios = async (req: Request, res: Response) => {
  try {
    const portfolios = await Portfolio.find();
    res.status(200).json({ success: true, data: portfolios });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all blogs (published only)
export const getBlogs = async (req: Request, res: Response) => {
  try {
    const blogs = await Blog.find({ published: true }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: blogs });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get single blog by slug
export const getBlogBySlug = async (req: Request, res: Response) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug, published: true });
    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog post not found' });
    }
    res.status(200).json({ success: true, data: blog });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Submit dynamic contact enquiry
export const submitEnquiry = async (req: Request, res: Response) => {
  try {
    const enquiry = await Enquiry.create(req.body);
    // Send email alert in background
    sendEnquiryEmail(enquiry);

    res.status(201).json({ success: true, data: enquiry, message: 'Enquiry submitted successfully' });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Submit career job application (with file resume)
export const submitJobApplication = async (req: Request, res: Response) => {
  try {
    const { name, email, phone, position, message } = req.body;
    
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Please upload your resume file.' });
    }

    const resumeUrl = `/uploads/resumes/${req.file.filename}`;

    const application = await JobApplication.create({
      name,
      email,
      phone,
      position,
      resumeUrl,
      message,
    });

    // Send email alert in background
    sendJobApplicationEmail(application);

    res.status(201).json({ success: true, data: application, message: 'Application submitted successfully' });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Subscribe to newsletter
export const subscribeNewsletter = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    let subscriber = await Subscriber.findOne({ email });

    if (subscriber) {
      if (subscriber.status === 'active') {
        return res.status(400).json({ success: false, message: 'Email already subscribed' });
      }
      subscriber.status = 'active';
      await subscriber.save();
    } else {
      subscriber = await Subscriber.create({ email });
    }

    res.status(201).json({ success: true, data: subscriber, message: 'Subscribed successfully' });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get FAQs
export const getFaqs = async (req: Request, res: Response) => {
  try {
    const faqs = await Faq.find().sort({ order: 1 });
    res.status(200).json({ success: true, data: faqs });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Testimonials
export const getTestimonials = async (req: Request, res: Response) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: testimonials });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get SEO config setting
export const getSeoSettings = async (req: Request, res: Response) => {
  try {
    const setting = await Setting.findOne({ key: 'seo_metadata' });
    res.status(200).json({ success: true, data: setting ? setting.value : null });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
