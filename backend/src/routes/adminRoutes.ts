import { Router } from 'express';
import { protect, authorize } from '../middleware/auth';
import {
  addService, editService, deleteService,
  addPortfolio, editPortfolio, deletePortfolio,
  addBlog, editBlog, deleteBlog,
  getEnquiries, updateEnquiryStatus, deleteEnquiry,
  getApplications, updateApplicationStatus, deleteApplication,
  addTestimonial, editTestimonial, deleteTestimonial,
  addFaq, editFaq, deleteFaq,
  getSubscribers, updateSubscriberStatus, deleteSubscriber,
  getSettings, updateSetting,
  getUsers, updateUserRole,
  getDashboardStats
} from '../controllers/adminController';
import { upload } from '../middleware/upload';

const router = Router();

// Apply protect middleware to all admin routes
router.use(protect);

// Dashboard metrics
router.get('/stats', getDashboardStats);

// Services
router.post('/services', addService);
router.put('/services/:id', editService);
router.delete('/services/:id', deleteService);

// Portfolio
router.post('/portfolio', addPortfolio);
router.put('/portfolio/:id', editPortfolio);
router.delete('/portfolio/:id', deletePortfolio);

// Blogs
router.post('/blogs', addBlog);
router.put('/blogs/:id', editBlog);
router.delete('/blogs/:id', deleteBlog);

// Enquiries
router.get('/enquiries', getEnquiries);
router.put('/enquiries/:id', updateEnquiryStatus);
router.delete('/enquiries/:id', deleteEnquiry);

// Job Applications
router.get('/applications', getApplications);
router.put('/applications/:id', updateApplicationStatus);
router.delete('/applications/:id', deleteApplication);

// Testimonials
router.post('/testimonials', addTestimonial);
router.put('/testimonials/:id', editTestimonial);
router.delete('/testimonials/:id', deleteTestimonial);

// FAQs
router.post('/faqs', addFaq);
router.put('/faqs/:id', editFaq);
router.delete('/faqs/:id', deleteFaq);

// Subscribers
router.get('/subscribers', getSubscribers);
router.put('/subscribers/:id', updateSubscriberStatus);
router.delete('/subscribers/:id', deleteSubscriber);

// Settings
router.get('/settings', getSettings);
router.post('/settings', updateSetting);

// Users (Super-admin only role)
router.get('/users', authorize('admin'), getUsers);
router.put('/users/:id/role', authorize('admin'), updateUserRole);

// File Upload endpoint (utility for blogs/portfolios cover images)
router.post('/media/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'No file uploaded' });
  }
  res.status(200).json({
    success: true,
    url: `/uploads/media/${req.file.filename}`,
  });
});

export default router;
