import { Router } from 'express';
import { predictY } from '../services/model.service.js';

const router = Router();

// GET /api/predict?x=5
router.get('/', async (req, res, next) => {
  try {
    const x = req.query.x;
    if (x === undefined) {
      return res.status(400).json({ error: 'Query param x is required, e.g. /api/predict?x=5' });
    }
    const y = await predictY(x);
    res.json({ backend: 'tfjs (cpu)', model: 'linear(y≈m*x+b)', x: Number(x), y });
  } catch (err) {
    next(err);
  }
});

export default router;
