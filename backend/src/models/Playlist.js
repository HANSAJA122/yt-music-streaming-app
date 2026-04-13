import mongoose from 'mongoose';

const trackSchema = new mongoose.Schema(
  {
    videoId: { type: String, required: true },
    title: { type: String, required: true },
    channelTitle: { type: String, required: true },
    thumbnail: { type: String, required: true },
    duration: { type: String, default: '0:00' }
  },
  { _id: false }
);

const playlistSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    coverImage: { type: String, default: '' },
    tracks: { type: [trackSchema], default: [] },
    isPublic: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export const Playlist = mongoose.model('Playlist', playlistSchema);
