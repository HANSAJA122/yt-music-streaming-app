import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// When using `npm run dev -w backend`, cwd is `backend/`; README places `.env` at repo root.
const rootEnv = path.resolve(__dirname, '../../../.env');
const packageEnv = path.resolve(__dirname, '../../.env');
dotenv.config({ path: rootEnv });
dotenv.config({ path: packageEnv, override: true });

export const env = {
  port: process.env.PORT || 5000,
  mongoUri: process.env.MONGO_URI || '',
  jwtSecret: process.env.JWT_SECRET || '',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  youtubeApiKey: process.env.YOUTUBE_API_KEY || '',
  youtubeApiBase: 'https://www.googleapis.com/youtube/v3',
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173'
};
