import { Playlist } from '../models/Playlist.js';
import { User } from '../models/User.js';
import { AppError } from '../utils/AppError.js';

export const getPlaylists = async (req, res) => {
  const playlists = await Playlist.find({ user: req.user._id }).sort({ updatedAt: -1 });
  res.json({ success: true, items: playlists });
};

export const createPlaylist = async (req, res) => {
  const playlist = await Playlist.create({ user: req.user._id, ...req.body });
  res.status(201).json({ success: true, item: playlist });
};

export const getPlaylistById = async (req, res) => {
  const playlist = await Playlist.findOne({ _id: req.params.id, user: req.user._id });
  if (!playlist) throw new AppError('Playlist not found', 404);
  res.json({ success: true, item: playlist });
};

export const updatePlaylist = async (req, res) => {
  const playlist = await Playlist.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    req.body,
    { new: true }
  );

  if (!playlist) throw new AppError('Playlist not found', 404);
  res.json({ success: true, item: playlist });
};

export const deletePlaylist = async (req, res) => {
  const playlist = await Playlist.findOneAndDelete({ _id: req.params.id, user: req.user._id });
  if (!playlist) throw new AppError('Playlist not found', 404);
  res.json({ success: true, message: 'Playlist deleted' });
};

export const addTrackToPlaylist = async (req, res) => {
  const playlist = await Playlist.findOne({ _id: req.params.id, user: req.user._id });
  if (!playlist) throw new AppError('Playlist not found', 404);

  const exists = playlist.tracks.some((track) => track.videoId === req.body.videoId);
  if (!exists) playlist.tracks.push(req.body);

  await playlist.save();
  res.json({ success: true, item: playlist });
};

export const removeTrackFromPlaylist = async (req, res) => {
  const playlist = await Playlist.findOne({ _id: req.params.id, user: req.user._id });
  if (!playlist) throw new AppError('Playlist not found', 404);

  playlist.tracks = playlist.tracks.filter((track) => track.videoId !== req.params.videoId);
  await playlist.save();
  res.json({ success: true, item: playlist });
};

export const getLikedSongs = async (req, res) => {
  const user = await User.findById(req.user._id).select('likedSongs');
  res.json({ success: true, items: user.likedSongs || [] });
};

export const toggleLikeSong = async (req, res) => {
  const user = await User.findById(req.user._id);
  const existing = user.likedSongs.find((song) => song.videoId === req.body.videoId);

  if (existing) {
    user.likedSongs = user.likedSongs.filter((song) => song.videoId !== req.body.videoId);
  } else {
    user.likedSongs.unshift(req.body);
  }

  await user.save();
  res.json({ success: true, items: user.likedSongs });
};

export const getRecentlyPlayed = async (req, res) => {
  const user = await User.findById(req.user._id).select('recentlyPlayed');
  res.json({ success: true, items: user.recentlyPlayed || [] });
};

export const addRecentlyPlayed = async (req, res) => {
  const user = await User.findById(req.user._id);
  user.recentlyPlayed = user.recentlyPlayed.filter((song) => song.videoId !== req.body.videoId);
  user.recentlyPlayed.unshift({ ...req.body, playedAt: new Date() });
  user.recentlyPlayed = user.recentlyPlayed.slice(0, 50);

  await user.save();
  res.json({ success: true, items: user.recentlyPlayed });
};
