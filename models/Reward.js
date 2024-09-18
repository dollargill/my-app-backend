const mongoose = require('mongoose');

const RewardSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    pointsRequired: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Reward', RewardSchema);
