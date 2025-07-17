import Shop from '../models/Shop.js';

export const getAllShops = async (req, res) => {
  try {
    const shops = await Shop.find();
    res.json(shops);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addShop = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: 'Name is required' });

    const newShop = new Shop({ name });
    const savedShop = await newShop.save();

    res.status(201).json(savedShop);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
