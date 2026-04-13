import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { AppError } from '../utils/AppError.js';
import { User } from '../models/User.js';

export const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new AppError('Unauthorized access', 401));
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, env.jwtSecret);
    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      return next(new AppError('User no longer exists', 401));
    }

    req.user = user;
    next();
  } catch {
    next(new AppError('Invalid or expired token', 401));
  }
};
