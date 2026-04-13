import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { User } from '../models/User.js';
import { AppError } from '../utils/AppError.js';

const signToken = (id) =>
  jwt.sign({ id }, env.jwtSecret, {
    expiresIn: env.jwtExpiresIn
  });

const sanitizeUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  avatar: user.avatar
});

export const signup = async (req, res) => {
  const { name, email, password } = req.body;

  const existing = await User.findOne({ email });
  if (existing) throw new AppError('Email already in use', 409);

  const user = await User.create({ name, email, password });
  const token = signToken(user._id);

  res.status(201).json({ success: true, token, user: sanitizeUser(user) });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !(await user.comparePassword(password))) {
    throw new AppError('Invalid email or password', 401);
  }

  const token = signToken(user._id);
  res.json({ success: true, token, user: sanitizeUser(user) });
};

export const me = async (req, res) => {
  res.json({ success: true, user: sanitizeUser(req.user) });
};
