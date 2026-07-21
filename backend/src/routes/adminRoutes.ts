import { Router } from 'express';

const router = Router();

router.get('/stats', (req, res) => {
  res.json({ success: true, data: { counts: {} } });
});

export default router;
