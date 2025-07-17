import express from 'express';
import { getProductsByShop, addProduct } from '../controllers/productController.js';

const router = express.Router();

router.get('/shop/:shopId', getProductsByShop);
router.post('/', addProduct); 

export default router;
