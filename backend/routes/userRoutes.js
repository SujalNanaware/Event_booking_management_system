const express = require("express");
const router = express.Router();

// Mock users store (shared with authRoutes in production, use a model)
const mockUser = {
  id: "1",
  name: "Alex Johnson",
  email: "alex@eventpulse.com",
  role: "user",
  joinDate: "2024-01-15",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
  stats: {
    totalBookings: 12,
    eventsAttended: 9,
    totalSpent: 3240,
    rating: 4.9,
  },
};

// GET /api/users/me — current user profile
router.get("/me", (req, res) => {
  res.json({ success: true, data: mockUser });
});

// PUT /api/users/me — update profile
router.put("/me", (req, res) => {
  const { name, email } = req.body;
  if (name) mockUser.name = name;
  if (email) mockUser.email = email;
  res.json({ success: true, message: "Profile updated", data: mockUser });
});

// GET /api/users/stats — user dashboard stats
router.get("/stats", (req, res) => {
  res.json({ success: true, data: mockUser.stats });
});

module.exports = router;
