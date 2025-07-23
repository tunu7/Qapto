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

// UPDATE an existing product
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, ratePerSqFt } = req.body;

    // Find and update
    const updated = await Product.findByIdAndUpdate(
      id,
      { name, description, ratePerSqFt },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE a product
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Product.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
