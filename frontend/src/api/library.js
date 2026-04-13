import api from './client';

export const getPlaylists = () => api.get('/library/playlists');
export const createPlaylist = (payload) => api.post('/library/playlists', payload);
export const getPlaylist = (id) => api.get(`/library/playlists/${id}`);
export const addTrackToPlaylist = (id, track) => api.post(`/library/playlists/${id}/tracks`, track);
export const removeTrackFromPlaylist = (id, videoId) => api.delete(`/library/playlists/${id}/tracks/${videoId}`);

export const getLikedSongs = () => api.get('/library/liked');
export const toggleLikeSong = (track) => api.post('/library/liked/toggle', track);

export const getRecentlyPlayed = () => api.get('/library/recent');
export const addRecentlyPlayed = (track) => api.post('/library/recent', track);
