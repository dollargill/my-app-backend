// routes/jobRoutes.js
const express = require('express');
const Job = require('../models/Job');
const Company = require('../models/Company');
const router = express.Router();

// Create a job posting
router.post('/create', async (req, res) => {
  const { title, description, requirements, location, salary, companyId } = req.body;

  try {
    const job = new Job({ title, description, requirements, location, salary, company: companyId });
    await job.save();

    // Add job to company's jobs list
    await Company.findByIdAndUpdate(companyId, {
      $push: { jobs: job._id },
    });

    res.status(201).json({ message: 'Job created successfully', job });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
