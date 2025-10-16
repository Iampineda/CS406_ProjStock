import { Router } from 'express';
import { predictY } from '../services/model.service.js';

const router = Router();

// GET /api/predict?x=5
router.get('/', async (req, res) => {
  const x = req.query.x;
  const y = await predictY(x);
  res.json({ model: 'y=2x-1', x: Number(x), y });
});

export default router;
