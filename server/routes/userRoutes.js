import express from 'express';
import {
  getUserProfile,
  updateUserProfile,
  getUsers,
  getUserById,
  updateUser,
  deleteUser
  ,applyForVendor,
} from '../controllers/userController.js';
import { protect, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

// Profile (private)
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

// Role-specific endpoints (place before parameterized routes)

router.put('/apply-vendor', protect, applyForVendor);

// Admin user management
router
  .route('/')
  .get(protect, authorizeRoles('admin'), getUsers);

// CRUD on specific user by ID (admin only)
router
  .route('/:id')
  .get(protect, authorizeRoles('admin'), getUserById)
  .put(protect, authorizeRoles('admin'), updateUser)
  .delete(protect, authorizeRoles('admin'), deleteUser);

export default router;
