import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import 'express-async-errors';
import { env } from './config/env.js';
import routes from './routes/index.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';

const app = express();

app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'PulseTube backend is running',
    health: '/api/health'
  });
});

app.use(
  cors({
    origin: env.frontendUrl,
    credentials: true
  })
);
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json({ limit: '1mb' }));

app.use('/api', routes);
app.use(notFound);
app.use(errorHandler);

export default app;
