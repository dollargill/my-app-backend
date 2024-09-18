// controllers/authController.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

exports.registerUser = async (req, res) => {
  // Validate request body
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  const { name, email, password } = req.body;

  try {
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
    }

    // Create new user instance
    user = new User({
      name,
      email,
      password, // Password will be hashed in the model's pre-save hook
    });

    // Save user to database
    await user.save();

    // Generate JWT token
    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' }, // Token expires in 1 hour
      (err, token) => {
        if (err) throw err;
        res.status(201).json({ token });
      }
    );
  } catch (err) {
    console.error('Server Error:', err.message);
    res.status(500).send('Server error');
  }
};

// controllers/authController.js

exports.loginUser = async (req, res) => {
    // Validate request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    const { email, password } = req.body;
  
    try {
      // Check if user exists
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid credentials' }] });
      }
  
      
      // Generate JWT token
      const payload = {
        user: {
          id: user.id,
        },
      };
  
      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: '1h' }, // Token expires in 1 hour
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error('Server Error:', err.message);
      res.status(500).send('Server error');
    }
  };
  
  const crypto = require('crypto');

exports.requestPasswordReset = async (req, res) => {
  const { email } = req.body;
  try {
    // Find user by email
    let user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'User with that email does not exist' }] });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(20).toString('hex');

    // Set token and expiration on user object
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

    // Save user
    await user.save();

    // TODO: Send email with resetToken

    res.json({ msg: 'Password reset token generated', resetToken });
  } catch (err) {
    console.error('Server Error:', err.message);
    res.status(500).send('Server error');
  }
};

exports.resetPassword = async (req, res) => {
    const { resetToken, newPassword } = req.body;
    try {
      // Find user by reset token and check if token is still valid
      let user = await User.findOne({
        resetPasswordToken: resetToken,
        resetPasswordExpires: { $gt: Date.now() },
      });
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid or expired reset token' }] });
      }
  
      // Update user's password
      user.password = newPassword;
      // Clear reset token fields
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
  
      // Save user
      await user.save();
  
      res.json({ msg: 'Password has been reset' });
    } catch (err) {
      console.error('Server Error:', err.message);
      res.status(500).send('Server error');
    }
  };
  