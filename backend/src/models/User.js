import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const historyItemSchema = new mongoose.Schema(
  {
    videoId: { type: String, required: true },
    title: { type: String, required: true },
    channelTitle: { type: String, required: true },
    thumbnail: { type: String, required: true },
    duration: { type: String, default: '0:00' },
    playedAt: { type: Date, default: Date.now }
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, minlength: 6 },
    avatar: { type: String, default: '' },
    likedSongs: { type: [historyItemSchema], default: [] },
    recentlyPlayed: { type: [historyItemSchema], default: [] }
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

export const User = mongoose.model('User', userSchema);
