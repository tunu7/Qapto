// controllers/authController.js
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import {
  generateAccessToken,
  generateRefreshToken
} from '../utils/generateTokens.js';

// Helper to build secure cookie options
const refreshCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production', // only over HTTPS in prod
  sameSite: 'Strict',
  path: '/', // scoping
  maxAge: parseInt(process.env.JWT_REFRESH_EXPIRES_MS, 10) || 7 * 24 * 60 * 60 * 1000, // fallback 7 days
};

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
export const register = asyncHandler(async (req, res) => {
  let { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Name, email and password are required');
  }

  email = email.toLowerCase().trim();

  const exists = await User.findOne({ email });
  if (exists) {
    res.status(400);
    throw new Error('Email already in use');
  }

  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name: name.trim(),
    email,
    password: hashedPassword,
    role: 'user', // fixed: string literal
  });

  // Optionally: create tokens here too if you want auto-login on register
 const accessToken = generateAccessToken(user._id, user.role);
const refreshToken = generateRefreshToken(user._id, user.role);


  // Set refresh token cookie
  res.cookie('refreshToken', refreshToken, refreshCookieOptions);

  res.status(201).json({
    accessToken,
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  });
});

// @desc    Login user & get tokens
// @route   POST /api/auth/login
// @access  Public
export const login = asyncHandler(async (req, res) => {
  let { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error('Email and password are required');
  }

  email = email.toLowerCase().trim();

  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    res.status(401);
    throw new Error('Invalid credentials');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    res.status(401);
    throw new Error('Invalid credentials');
  }

  // Generate tokens

  const accessToken = generateAccessToken(user._id, user.role);
const refreshToken = generateRefreshToken(user._id, user.role);


  // Send refresh token as secure httpOnly cookie
  res.cookie('refreshToken', refreshToken, refreshCookieOptions);

  // POST /auth/login
res.json({
  user: {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role
  },
  accessToken
});

});

// @desc    Refresh access token
// @route   POST /api/auth/refresh
// @access  Public (via cookie)
export const refresh = asyncHandler(async (req, res) => {
  const token = req.cookies?.refreshToken;
  if (!token) {
    res.status(401);
    throw new Error('No refresh token provided');
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
  } catch (err) {
    res.status(403);
    throw new Error('Invalid or expired refresh token');
  }

  const user = await User.findById(decoded.userId);
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  // Optionally: you can implement refresh token rotation here (issue new refresh token, revoke old one)

  const accessToken = generateAccessToken(user._id);
  res.json({ accessToken });
});

// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Public
export const logout = asyncHandler(async (req, res) => {
  // Clear the refresh token cookie
  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict',
    path: '/',
  });

  res.json({ message: 'Logged out successfully' });
});
