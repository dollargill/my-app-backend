// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const User = require('../models/User');

// @route   GET /api/users/me
// @desc    Get current user's profile
// @access  Private
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .select('-password')
      .populate('rewards');
    res.json(user);
  } catch (err) {
    console.error('Server Error:', err.message);
    res.status(500).send('Server error');
  }
});

// @route   PUT /api/users/me
// @desc    Update current user's profile
// @access  Private
router.put('/me', auth, async (req, res) => {
  const { name, email } = req.body;

  const updatedFields = {};
  if (name) updatedFields.name = name;
  if (email) updatedFields.email = email;

  try {
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: updatedFields },
      { new: true }
    ).select('-password');

    res.json(user);
  } catch (err) {
    console.error('Server Error:', err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
