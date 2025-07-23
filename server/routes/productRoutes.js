import express from 'express';
import {
  getProductsByShop,
  addProduct,
  updateProduct,
  deleteProduct
} from '../controllers/productController.js';

const router = express.Router();

// Fetch all products for a given shop
router.get('/shop/:shopId', getProductsByShop);

// Create a new product
router.post('/', addProduct);

// Update an existing product by ID
router.put('/:id', updateProduct);

// Delete a product by ID
router.delete('/:id', deleteProduct);

export default router;
