import app from './app.js';
import { env } from './config/env.js';
import { connectDBWithRetry } from './config/db.js';

const start = async () => {
  const host = '0.0.0.0';
  app.listen(env.port, host, () => {
    console.log(`Backend listening on http://${host}:${env.port}`);
  });

  // Keep the app booted on hosting platforms while DB credentials/network are being fixed.
  void connectDBWithRetry();
};

start().catch((err) => {
  console.error('Failed to start server', err);
  process.exit(1);
});
