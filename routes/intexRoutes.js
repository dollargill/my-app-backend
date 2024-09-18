// routes/intexRoutes.js
const express = require('express');
const router = express.Router();
const Intex = require('../models/Intex');

// GET /api/intex
router.get('/', async (req, res) => {
  try {
    const intexDocs = await Intex.find({});
    res.json(intexDocs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
