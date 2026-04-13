import { Router } from 'express';
import authRoutes from './auth.routes.js';
import libraryRoutes from './library.routes.js';
import musicRoutes from './music.routes.js';

const router = Router();

router.get('/health', (req, res) => {
  res.json({ success: true, message: 'API is running' });
});

router.use('/auth', authRoutes);
router.use('/music', musicRoutes);
router.use('/library', libraryRoutes);

export default router;
