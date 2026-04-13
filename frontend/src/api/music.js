import api from './client';

export const fetchTrending = () => api.get('/music/trending');
export const fetchRecommended = (seed = '') => api.get('/music/recommended', { params: { seed } });
export const searchMusic = (q, filter = 'song') => api.get('/music/search', { params: { q, filter } });
