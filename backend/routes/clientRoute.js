import {getAllClients} from "../controllers/clientController.js";
import express from 'express';

const router = express.Router();


router.get('/' , getAllClients); // Get all clients


export default router;