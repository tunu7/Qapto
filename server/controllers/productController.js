import Product from '../models/Product.js';

// GET products by shop
export const getProductsByShop = async (req, res) => {
  try {
    const { shopId } = req.params;
    const products = await Product.find({ shop: shopId });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ADD a new product
export const addProduct = async (req, res) => {
  try {
    const { name, description, ratePerSqFt, shop } = req.body;

    if (!name || !ratePerSqFt || !shop) {
      return res.status(400).json({ message: 'Name, ratePerSqFt, and shop ID are required' });
    }

    const product = new Product({ name, description, ratePerSqFt, shop });
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
