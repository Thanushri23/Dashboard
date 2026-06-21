const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/auth');

// Get employees
router.get('/', auth, async (req, res) => {
  const users = await User.find({ role: 'employee' });
  res.json(users);
});

// Add employee
router.post('/', auth, async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.json(user);
});

// Delete
router.delete('/:id', auth, async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ msg: "Deleted" });
});

// Get current user profile
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ msg: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: "Server Error" });
  }
});

module.exports = router;