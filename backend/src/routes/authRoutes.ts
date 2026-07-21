import { Router } from 'express';

const router = Router();

router.post('/login', (req, res) => {
  res.json({ success: true, message: 'Auth endpoint' });
});

router.get('/me', (req, res) => {
  res.json({ success: true, message: 'Me endpoint' });
});

router.post('/seed', (req, res) => {
  res.json({ success: true, message: 'Seed endpoint' });
});

export default router;
