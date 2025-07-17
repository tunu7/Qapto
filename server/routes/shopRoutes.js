import express from 'express';
import { getAllShops, addShop } from '../controllers/shopController.js';

const router = express.Router();

router.get('/', getAllShops);
router.post('/', addShop);  // ➕ Create a shop

export default router;
