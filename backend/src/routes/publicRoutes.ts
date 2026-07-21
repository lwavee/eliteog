import { Router } from 'express';

const router = Router();

router.get('/services', (req, res) => {
  res.json({ success: true, data: [] });
});

export default router;
