import { TotalAmount , TotalUsers , TotalOrders, } from "../controllers/analyticsController.js";
import express from 'express';
import adminAuth from "../middleware/adminAuth.js";


const router = express.Router();
router.get('/total-amount',adminAuth ,TotalAmount);
router.get('/total-users',adminAuth ,TotalUsers);
router.get('/total-orders',adminAuth ,TotalOrders);

export default router;