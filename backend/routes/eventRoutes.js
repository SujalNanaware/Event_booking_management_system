const express = require("express");
const router = express.Router();

// Mock events data
const events = [
  {
    id: "1",
    title: "TechSphere Summit 2026",
    category: "Technology",
    date: "2026-11-15",
    time: "09:00 AM",
    location: "Silicon Valley Convention Center, CA",
    price: 299,
    description: "The premier technology conference bringing together innovators, developers, and visionaries.",
    attendees: 2450,
    maxCapacity: 3000,
    featured: true,
    tags: ["AI", "Cloud", "Web3"],
  },
  {
    id: "2",
    title: "Harmony Music Festival",
    category: "Music",
    date: "2026-12-05",
    time: "04:00 PM",
    location: "Riverside Amphitheater, Austin TX",
    price: 149,
    description: "Three days of incredible live music from 50+ artists across 5 stages.",
    attendees: 8900,
    maxCapacity: 10000,
    featured: true,
    tags: ["Live Music", "Festival", "DJ"],
  },
  {
    id: "3",
    title: "Business Growth Masterclass",
    category: "Business",
    date: "2026-11-22",
    time: "10:00 AM",
    location: "Grand Hyatt Hotel, New York",
    price: 499,
    description: "Learn from Fortune 500 executives and startup unicorn founders.",
    attendees: 340,
    maxCapacity: 500,
    featured: true,
    tags: ["Business", "Startup", "Investment"],
  },
];

// GET /api/events — list all events
router.get("/", (req, res) => {
  const { category, search, page = 1, limit = 10 } = req.query;
  let result = [...events];

  if (category && category !== "All") {
    result = result.filter((e) => e.category === category);
  }

  if (search) {
    const q = search.toLowerCase();
    result = result.filter(
      (e) => e.title.toLowerCase().includes(q) || e.location.toLowerCase().includes(q)
    );
  }

  const start = (page - 1) * limit;
  const paginated = result.slice(start, start + parseInt(limit));

  res.json({
    success: true,
    data: paginated,
    total: result.length,
    page: parseInt(page),
    totalPages: Math.ceil(result.length / limit),
  });
});

// GET /api/events/:id — get event by ID
router.get("/:id", (req, res) => {
  const event = events.find((e) => e.id === req.params.id);
  if (!event) return res.status(404).json({ success: false, message: "Event not found" });
  res.json({ success: true, data: event });
});

// GET /api/events/featured — get featured events
router.get("/featured/list", (req, res) => {
  res.json({ success: true, data: events.filter((e) => e.featured) });
});

module.exports = router;
