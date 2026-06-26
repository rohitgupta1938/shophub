const express = require('express');
const Product = require('../models/Product');
const { protect } = require('../middleware/auth');

const router = express.Router();

// GET /api/products  — all products (public)
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    const filter = category && category !== 'All' ? { category } : {};
    const products = await Product.find(filter)
      .populate('author', 'name email')
      .sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/products/liked  — products liked by current user
router.get('/liked', protect, async (req, res) => {
  try {
    const products = await Product.find({ likes: req.user._id })
      .populate('author', 'name email')
      .sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/products/mine  — products created by current user
router.get('/mine', protect, async (req, res) => {
  try {
    const products = await Product.find({ author: req.user._id })
      .sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/products  — create
router.post('/', protect, async (req, res) => {
  try {
    const { title, price, category, image, description } = req.body;
    if (!title || !price || !category || !description)
      return res.status(400).json({ message: 'Please fill in all required fields' });

    const product = await Product.create({
      title, price, category, description,
      image: image || `https://placehold.co/300x200/E6F1FB/185FA5?text=${encodeURIComponent(title.slice(0,10))}`,
      author: req.user._id,
    });
    await product.populate('author', 'name email');
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/products/:id  — update (owner only)
router.put('/:id', protect, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    if (product.author.toString() !== req.user._id.toString())
      return res.status(403).json({ message: 'Not authorized' });

    const { title, price, category, image, description } = req.body;
    Object.assign(product, { title, price, category, image, description });
    await product.save();
    await product.populate('author', 'name email');
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /api/products/:id  — delete (owner only)
router.delete('/:id', protect, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    if (product.author.toString() !== req.user._id.toString())
      return res.status(403).json({ message: 'Not authorized' });

    await product.deleteOne();
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/products/:id/like  — toggle like
router.post('/:id/like', protect, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    const idx = product.likes.indexOf(req.user._id);
    if (idx > -1) product.likes.splice(idx, 1);
    else product.likes.push(req.user._id);
    await product.save();
    res.json({ likes: product.likes, liked: idx === -1 });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
