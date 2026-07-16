import { Router } from 'express';
import { upload } from '../middleware/upload';
import {
  getServices,
  getPortfolios,
  getBlogs,
  getBlogBySlug,
  submitEnquiry,
  submitJobApplication,
  subscribeNewsletter,
  getFaqs,
  getTestimonials,
  getSeoSettings
} from '../controllers/publicController';

const router = Router();

router.get('/services', getServices);
router.get('/portfolios', getPortfolios);
router.get('/blogs', getBlogs);
router.get('/blogs/:slug', getBlogBySlug);
router.post('/enquiries', submitEnquiry);
router.post('/subscribe', subscribeNewsletter);
router.get('/faqs', getFaqs);
router.get('/testimonials', getTestimonials);
router.get('/seo', getSeoSettings);

// Submit job application with single PDF/doc resume
router.post('/apply', upload.single('resume'), submitJobApplication);

export default router;
