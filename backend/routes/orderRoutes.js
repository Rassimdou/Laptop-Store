import express from 'express';
import {
  createOrder,
  getUserOrders,
  getAllOrders,
  updateOrderStatus,
  getOrderById,
  getAnalyticsData
} from '../controllers/orderController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import adminAuth from '../middleware/adminAuth.js';

const router = express.Router();

// User must be authenticated for user order routes
router.post('/', protect, createOrder);
router.get('/my-orders', protect, getUserOrders);

// Admin-only routes
router.get('/', adminAuth, getAllOrders);
router.get('/analytics', adminAuth, getAnalyticsData);
router.get('/:id', adminAuth, getOrderById);
router.patch('/:id/status', adminAuth, updateOrderStatus);

export default router;