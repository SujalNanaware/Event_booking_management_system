const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Mock user store (replace with MongoDB in production)
const users = [];

// POST /api/auth/register
router.post("/register", [
  body("name").trim().notEmpty().withMessage("Name is required").isLength({ min: 2 }),
  body("email").isEmail().withMessage("Valid email required").normalizeEmail(),
  body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  const { name, email, password } = req.body;

  if (users.find((u) => u.email === email)) {
    return res.status(409).json({ success: false, message: "Email already registered" });
  }

  const hashedPassword = await bcrypt.hash(password, 12);
  const user = { id: Date.now().toString(), name, email, password: hashedPassword, role: "user", createdAt: new Date() };
  users.push(user);

  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET || "eventpulse_secret", { expiresIn: "7d" });

  res.status(201).json({
    success: true,
    message: "Account created successfully",
    token,
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
  });
});

// POST /api/auth/login
router.post("/login", [
  body("email").isEmail().normalizeEmail(),
  body("password").notEmpty(),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  const { email, password } = req.body;
  const user = users.find((u) => u.email === email);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ success: false, message: "Invalid credentials" });
  }

  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET || "eventpulse_secret", { expiresIn: "7d" });

  res.json({
    success: true,
    token,
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
  });
});

module.exports = router;
