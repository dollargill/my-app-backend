// routes/companyRoutes.js
const express = require('express');
const Company = require('../models/Company');
const router = express.Router();

// Register new company
router.post('/register', async (req, res) => {
  const { name, email, password, description, website, location } = req.body;

  try {
    const company = new Company({ name, email, password, description, website, location });
    await company.save();
    res.status(201).json({ message: 'Company registered successfully', company });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
