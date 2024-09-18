// models/Intex.js
const mongoose = require('mongoose');

const IntexSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    points: {
      type: Number,
      required: true,
    },
    level: {
      type: String,
      required: true,
    },
    rewards: [
      {
        type: String,
      },
    ],
  },
  {
    collection: 'intex', // Specify the existing collection name
    timestamps: true,
  }
);

module.exports = mongoose.model('Intex', IntexSchema);
