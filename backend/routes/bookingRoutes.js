const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");

// Mock bookings store
const bookings = [];

// POST /api/bookings — create booking
router.post("/", [
  body("fullName").trim().notEmpty().withMessage("Full name is required"),
  body("email").isEmail().withMessage("Valid email is required").normalizeEmail(),
  body("mobile").notEmpty().withMessage("Mobile number is required"),
  body("eventId").notEmpty().withMessage("Event ID is required"),
  body("quantity").isInt({ min: 1, max: 10 }).withMessage("Quantity must be between 1 and 10"),
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  const { fullName, email, mobile, eventId, quantity, totalAmount } = req.body;

  const booking = {
    id: `BK${Date.now().toString().slice(-6)}`,
    fullName,
    email,
    mobile,
    eventId,
    quantity,
    totalAmount,
    status: "confirmed",
    createdAt: new Date().toISOString(),
  };

  bookings.push(booking);

  res.status(201).json({
    success: true,
    message: "Booking confirmed successfully",
    data: booking,
  });
});

// GET /api/bookings — list all bookings (admin / demo)
router.get("/", (req, res) => {
  const { email } = req.query;
  const result = email ? bookings.filter((b) => b.email === email) : bookings;
  res.json({ success: true, data: result, total: result.length });
});

// GET /api/bookings/:id — get single booking
router.get("/:id", (req, res) => {
  const booking = bookings.find((b) => b.id === req.params.id);
  if (!booking) return res.status(404).json({ success: false, message: "Booking not found" });
  res.json({ success: true, data: booking });
});

// DELETE /api/bookings/:id — cancel booking
router.delete("/:id", (req, res) => {
  const index = bookings.findIndex((b) => b.id === req.params.id);
  if (index === -1) return res.status(404).json({ success: false, message: "Booking not found" });
  bookings[index].status = "cancelled";
  res.json({ success: true, message: "Booking cancelled", data: bookings[index] });
});

module.exports = router;
