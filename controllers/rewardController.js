// controllers/rewardController.js
const Reward = require('../models/Reward');
const { validationResult } = require('express-validator');

exports.getRewards = async (req, res) => {
  try {
    const rewards = await Reward.find({});
    res.json(rewards);
  } catch (err) {
    console.error('Server Error:', err.message);
    res.status(500).send('Server error');
  }
};

exports.createReward = async (req, res) => {
  // Validate request body
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { name, description, pointsRequired } = req.body;

  try {
    const reward = new Reward({
      name,
      description,
      pointsRequired,
    });
    await reward.save();
    res.status(201).json(reward);
  } catch (err) {
    console.error('Server Error:', err.message);
    res.status(500).send('Server error');
  }
};

exports.deleteReward = async (req, res) => {
  try {
    const reward = await Reward.findById(req.params.id);
    if (!reward) {
      return res.status(404).json({ msg: 'Reward not found' });
    }
    await reward.remove();
    res.json({ msg: 'Reward removed' });
  } catch (err) {
    console.error('Server Error:', err.message);
    res.status(500).send('Server error');
  }
};
