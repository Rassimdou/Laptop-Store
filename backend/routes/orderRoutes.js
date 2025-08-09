import express from 'express';
import {
  createOrder,
  getUserOrders,
  getAllOrders,
  updateOrderStatus
} from '../controllers/orderController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// User must be authenticated for all order routes
router.use(protect);

// User routes
router.post('/', createOrder);
router.get('/my-orders', getUserOrders);

// Admin-only routes
router.use(admin);
router.get('/' ,getAllOrders);
router.patch('/:id/status', updateOrderStatus);

export default router;