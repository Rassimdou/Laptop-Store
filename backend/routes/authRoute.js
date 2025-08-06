import authController from '../controllers/authController.js';
import express from 'express';
import { checkAdmin } from '../middlewares/authMiddleware.js';



const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);

router.post('/logout', authController.logout);
