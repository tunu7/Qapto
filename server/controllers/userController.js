import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';

// @desc    Get current user profile
// @route   GET /api/users/profile
// @access  Private
export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.userId).select('-password');
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }
  res.json(user);
});

// @desc    Update current user profile
// @route   PUT /api/users/profile
// @access  Private
export const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.userId);
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  user.name  = req.body.name  || user.name;
  user.email = req.body.email || user.email;

  if (req.body.password) {
    const salt = await bcrypt.genSalt(12);
    user.password = await bcrypt.hash(req.body.password, salt);
  }

  const updated = await user.save();
  res.json({
    _id:   updated._id,
    name:  updated.name,
    email: updated.email,
    role:  updated.role
  });
});

// @desc    Get all users
// @route   GET /api/users
// @access  Admin
export const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}).select('-password');
  res.json(users);
});

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Admin
export const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }
  res.json(user);
});

// @desc    Update any user
// @route   PUT /api/users/:id
// @access  Admin
export const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  user.name  = req.body.name  || user.name;
  user.email = req.body.email || user.email;
  user.role  = req.body.role  || user.role;

  const updated = await user.save();
  res.json({
    _id:   updated._id,
    name:  updated.name,
    email: updated.email,
    role:  updated.role
  });
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Admin
export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }
  await user.remove();
  res.json({ message: 'User removed' });
});


// @desc    Change role from user to vendor
// @route   PUT /api/users/apply-vendor
// @access  Private (only logged-in users)
export const applyForVendor = async (req, res) => {
  try {
    const userId = req.user.id; // assuming 'protect' middleware adds user info to req
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.role === 'vendor') {
      return res.status(400).json({ message: 'User is already a vendor' });
    }

    user.role = 'vendor';
    await user.save();

    res.status(200).json({ message: 'Role updated to vendor', user });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Server Error' });
  }
};

