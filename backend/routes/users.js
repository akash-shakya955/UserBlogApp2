import express from 'express';
import multer from 'multer';
import path from 'path';
import User from '../models/User.js';

const router = express.Router();

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// Middleware to log request body for debugging
router.use((req, res, next) => {
  console.log('Incoming User Request Body:', req.body);
  next();
});

// GET Users with Search and Pagination
router.get('/', async (req, res) => {
  try {
    const { search, page = 1, limit = 5 } = req.query;
    let query = {};

    // Search by firstName or lastName (case-insensitive)
    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } }
      ];
    }

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    const users = await User.find(query)
      .skip(skip)
      .limit(limitNum);

    const total = await User.countDocuments(query);

    res.status(200).json({
      users,
      total,
      page: pageNum,
      totalPages: Math.ceil(total / limitNum)
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// NEW Endpoint: GET User Names for Author Dropdown
router.get('/names', async (req, res) => {
  try {
    const users = await User.find({}, 'firstName'); // Only fetch firstName field
    const names = users.map(user => user.firstName);
    res.status(200).json(names);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', upload.single('profileImage'), async (req, res) => {
  try {
    const userData = { ...req.body };
    if (req.file) userData.profileImage = `/uploads/${req.file.filename}`;
    const user = new User(userData);
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    console.log('User Creation Error:', err);
    res.status(400).json({ message: err.message });
  }
});

router.put('/:id', upload.single('profileImage'), async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    if (req.file) req.body.profileImage = `/uploads/${req.file.filename}`;
    Object.assign(user, req.body);
    const updatedUser = await user.save();
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;