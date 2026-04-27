import mongoose from 'mongoose';
import { env } from './env.js';

export const connectDB = async () => {
  if (!env.mongoUri) {
    throw new Error('MONGO_URI is missing in environment variables');
  }

  await mongoose.connect(env.mongoUri);
  console.log('MongoDB connected');
};

export const connectDBWithRetry = async ({
  maxRetries = Number.POSITIVE_INFINITY,
  retryDelayMs = 10000
} = {}) => {
  let attempts = 0;

  while (attempts < maxRetries) {
    attempts += 1;
    try {
      await connectDB();
      return true;
    } catch (error) {
      console.error(
        `MongoDB connection attempt ${attempts} failed: ${error.message}`
      );
      await new Promise((resolve) => setTimeout(resolve, retryDelayMs));
    }
  }

  return false;
};
