import { Router } from 'express';
import { recommendedMusic, searchMusic, trendingMusic } from '../controllers/music.controller.js';
import { protect } from '../middleware/auth.js';

const router = Router();

router.get('/search', protect, searchMusic);
router.get('/trending', protect, trendingMusic);
router.get('/recommended', protect, recommendedMusic);

export default router;
