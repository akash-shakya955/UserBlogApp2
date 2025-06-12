import express from 'express';
import Blog from '../models/Blog.js';

const router = express.Router();

// Middleware to log request body for debugging
router.use((req, res, next) => {
  console.log('Incoming Blog Request Body:', req.body);
  console.log('Incoming Blog Query Params:', req.query); // Debug query params
  next();
});

router.get('/', async (req, res) => {
  try {
    const { title, tag, category, page = 1, limit = 5 } = req.query;
    let query = {};

    // Filter by title (case-insensitive)
    if (title) {
      query.title = { $regex: title, $options: 'i' };
    }

    // Filter by tag (check if tag exists in the tags array)
    if (tag) {
      query.tags = tag;
    }

    // Filter by category
    if (category) {
      query.category = category;
    }

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    const blogs = await Blog.find(query)
      .skip(skip)
      .limit(limitNum);

    const total = await Blog.countDocuments(query);

    res.status(200).json({
      blogs,
      total,
      page: pageNum,
      totalPages: Math.ceil(total / limitNum)
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const blog = new Blog(req.body);
    const newBlog = await blog.save();
    res.status(201).json(newBlog);
  } catch (err) {
    console.log('Blog Creation Error:', err);
    res.status(400).json({ message: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    blog.updatedDate = Date.now();
    Object.assign(blog, req.body);
    const updatedBlog = await blog.save();
    res.status(200).json(updatedBlog);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    res.status(200).json({ message: 'Blog deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    res.status(200).json(blog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;