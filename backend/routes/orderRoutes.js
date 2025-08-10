import express from 'express';
import {
  createOrder,
  getUserOrders,
  getAllOrders,
  updateOrderStatus,
  getOrderById
} from '../controllers/orderController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import adminAuth from '../middleware/adminAuth.js';

const router = express.Router();

// User must be authenticated for all order routes
router.use(protect);

// User routes
router.post('/' , protect ,createOrder);
router.get('/my-orders', getUserOrders);

// Admin-only routes
router.get('/', adminAuth, getAllOrders);
router.get('/:id', adminAuth, getOrderById);
router.patch('/:id/status',adminAuth , updateOrderStatus);

export default router;