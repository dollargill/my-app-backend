// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const authController = require('../controllers/authController');

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post(
  '/register',
  [
    check('name', 'Name is required').notEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password must be 6 or more characters').isLength({
      min: 6,
    }),
  ],
  authController.registerUser
);

module.exports = router;

// routes/authRoutes.js

// @route   POST /api/auth/login
// @desc    Login user and get token
// @access  Public
router.post(
    '/login',
    [
      check('email', 'Please include a valid email').isEmail(),
      check('password', 'Password is required').exists(),
    ],
    authController.loginUser
  );
  

  // @route   POST /api/auth/password-reset-request
// @desc    Request password reset
// @access  Public
router.post(
    '/password-reset-request',
    [check('email', 'Please include a valid email').isEmail()],
    authController.requestPasswordReset
  );
  
  // @route   POST /api/auth/password-reset
  // @desc    Reset password
  // @access  Public
  router.post(
    '/password-reset',
    [
      check('resetToken', 'Reset token is required').notEmpty(),
      check('newPassword', 'Password must be 6 or more characters').isLength({
        min: 6,
      }),
    ],
    authController.resetPassword
  );
  