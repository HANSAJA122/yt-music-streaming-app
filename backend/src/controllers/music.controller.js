import { getRecommendedMusic, getTrendingMusic, searchYouTube } from '../services/youtube.service.js';

export const searchMusic = async (req, res) => {
  const { q, filter = 'song', pageToken = '' } = req.query;
  const data = await searchYouTube({ query: q, filter, pageToken });
  res.json({ success: true, ...data });
};

export const trendingMusic = async (req, res) => {
  const items = await getTrendingMusic();
  res.json({ success: true, items });
};

export const recommendedMusic = async (req, res) => {
  const seed = req.query.seed || 'Recommended music mix';
  const items = await getRecommendedMusic(seed);
  res.json({ success: true, items });
};
