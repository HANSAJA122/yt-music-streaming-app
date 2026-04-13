import { Router } from 'express';
import {
  addRecentlyPlayed,
  addTrackToPlaylist,
  createPlaylist,
  deletePlaylist,
  getLikedSongs,
  getPlaylistById,
  getPlaylists,
  getRecentlyPlayed,
  removeTrackFromPlaylist,
  toggleLikeSong,
  updatePlaylist
} from '../controllers/library.controller.js';
import { protect } from '../middleware/auth.js';

const router = Router();

router.use(protect);

router.get('/playlists', getPlaylists);
router.post('/playlists', createPlaylist);
router.get('/playlists/:id', getPlaylistById);
router.patch('/playlists/:id', updatePlaylist);
router.delete('/playlists/:id', deletePlaylist);
router.post('/playlists/:id/tracks', addTrackToPlaylist);
router.delete('/playlists/:id/tracks/:videoId', removeTrackFromPlaylist);

router.get('/liked', getLikedSongs);
router.post('/liked/toggle', toggleLikeSong);

router.get('/recent', getRecentlyPlayed);
router.post('/recent', addRecentlyPlayed);

export default router;
