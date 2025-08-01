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
  try {
    const { name, email, password } = req.body;

    console.log('Register payload:', req.body); // debug log

    if (!name || !email || !password) {
      res.status(400);
      throw new Error('All fields are required');
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400);
      throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email: email.toLowerCase().trim(),
      password: hashedPassword,
    });

   const accessToken = generateAccessToken(user._id, user.role);
const refreshToken = generateRefreshToken(user._id, user.role);


    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'None',
      path: '/',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({ user, accessToken });
  } catch (err) {
    console.error('Register Error:', err);

    // Handle duplicate key error (email already exists)
    if (err.code === 11000) {
      res.status(400).json({ message: 'Email already in use' });
    } else if (err.name === 'ValidationError') {
      // Mongoose validation error
      const messages = Object.values(err.errors).map(val => val.message);
      res.status(400).json({ message: messages.join(', ') });
    } else {
      res.status(500).json({ message: err.message || 'Internal Server Error' });
    }
  }
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
    role: 'user'
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

  const accessToken = generateAccessToken(user._id, user.role);

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
