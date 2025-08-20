import {getAllClients} from "../controllers/ClientController.js";
import express from 'express';

const router = express.Router();


router.get('/' , getAllClients); 


export default router;