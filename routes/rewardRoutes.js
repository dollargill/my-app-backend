// routes/rewardRoutes.js
const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const { check } = require('express-validator');
const rewardController = require('../controllers/rewardController');

// @route   GET /api/rewards
// @desc    Get all rewards
// @access  Public
router.get('/', rewardController.getRewards);

// @route   POST /api/rewards
// @desc    Create a new reward
// @access  Private (Admin)
router.post(
  '/',
  [
    auth,
    check('name', 'Name is required').notEmpty(),
    check('pointsRequired', 'Points required must be a number').isNumeric(),
  ],
  rewardController.createReward
);

// @route   DELETE /api/rewards/:id
// @desc    Delete a reward
// @access  Private (Admin)
router.delete('/:id', auth, rewardController.deleteReward);

module.exports = router;

const roleCheck = require('../middlewares/roleCheck');

// In rewardRoutes.js
router.post(
  '/',
  [
    auth,
    roleCheck('admin'),
    check('name', 'Name is required').notEmpty(),
    check('pointsRequired', 'Points required must be a number').isNumeric(),
  ],
  rewardController.createReward
);
