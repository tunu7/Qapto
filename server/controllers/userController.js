import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import Shop from '../models/Shop.js';

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



// @desc    Change role from user to vendor and create a shop
// @route   PUT /api/users/apply-vendor
// @access  Private (only logged-in users)
// @route   PUT /api/users/apply-vendor
export const applyForVendor = async (req, res) => {
  try {
    const userId = req.user.id;
    const { shopName } = req.body;

    if (!shopName) {
      return res.status(400).json({ message: 'Shop name is required' });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    if (user.role === 'vendor') {
      return res.status(400).json({ message: 'User is already a vendor' });
    }

    const existingShop = await Shop.findOne({ name: shopName });
    if (existingShop) {
      return res.status(400).json({ message: 'Shop name already exists' });
    }

    const newShop = new Shop({ name: shopName, owner: user._id });
    await newShop.save();

    user.role = 'vendor';
    await user.save();

    res.status(200).json({
      message: 'User promoted to vendor and shop created',
      user,
      shop: newShop,
    });
  } catch (error) {
    console.error('applyForVendor error:', error);
    res.status(500).json({ message: error.message || 'Server Error' });
  }
};



