const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { protect } = require("../middleware/auth");

const router = express.Router();

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// ==============================
// Register User
// POST /api/auth/register
// ==============================
router.post("/register", async (req, res) => {
  try {
    const { name, email, mobile, password, confirmPassword } = req.body;

    // Required Fields
    if (!name || !email || !mobile || !password || !confirmPassword) {
      return res.status(400).json({
        message: "Please fill in all fields",
      });
    }

    const trimmedName = name.trim();
    const trimmedEmail = email.trim().toLowerCase();

    // Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(trimmedEmail)) {
      return res.status(400).json({
        message: "Invalid email address",
      });
    }

    // Mobile Validation
    if (!/^[6-9]\d{9}$/.test(mobile)) {
      return res.status(400).json({
        message: "Invalid mobile number",
      });
    }

    // Password Validation
    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters",
      });
    }

    // Confirm Password
    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "Passwords do not match",
      });
    }

    // Email Exists
    const emailExists = await User.findOne({
      email: trimmedEmail,
    });

    if (emailExists) {
      return res.status(400).json({
        message: "Email already registered",
      });
    }

    // Mobile Exists
    const mobileExists = await User.findOne({
      mobile,
    });

    if (mobileExists) {
      return res.status(400).json({
        message: "Mobile already registered",
      });
    }

    // Create User
    const user = await User.create({
      name: trimmedName,
      email: trimmedEmail,
      mobile,
      password,
    });

    // Response
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      mobile: user.mobile,
      token: generateToken(user._id),
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

// ==============================
// Login User
// POST /api/auth/login
// ==============================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Please enter email and password",
      });
    }

    const user = await User.findOne({
      email: email.trim().toLowerCase(),
    });

    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      mobile: user.mobile,
      token: generateToken(user._id),
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

// ==============================
// Get Logged In User
// GET /api/auth/me
// ==============================
router.get("/me", protect, async (req, res) => {
  res.status(200).json(req.user);
});

module.exports = router;