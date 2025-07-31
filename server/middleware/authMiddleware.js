import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/User.js';

export const protect = asyncHandler(async (req, res, next) => {
  let token = null;
  if (
    req.headers.authorization?.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
req.user = {
  ...(await User.findById(decoded.userId).select('-password')).toObject(),
  role: decoded.role // Inject role from JWT
};
  if (!req.user) {
    res.status(401);
    throw new Error('Not authorized');
  }
  next();
});

export const authorizeRoles = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    res.status(403);
    throw new Error(`Access denied: ${req.user.role} is not authorized`);
  }
  next();
};

