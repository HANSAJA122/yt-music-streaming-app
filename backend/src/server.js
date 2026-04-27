import app from './app.js';
import { env } from './config/env.js';
import { connectDB } from './config/db.js';

const start = async () => {
  await connectDB();

  const host = '0.0.0.0';
  app.listen(env.port, host, () => {
    console.log(`Backend listening on http://${host}:${env.port}`);
  });
};

start().catch((err) => {
  console.error('Failed to start server', err);
  process.exit(1);
});
