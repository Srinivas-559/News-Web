const express = require("express");
const {
    createEvent,
    getEvents,
    getEventById,
    updateEvent,
    deleteEvent,
    registerForEvent,
    getParticipants,
} = require("../controllers/eventController");
const { protect, isAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

// Create a new event (Admin only)
router.post("/create", protect, isAdmin, createEvent);
router.get("/getEvents", protect,getEvents);

// Get event by ID (Public)
router.get("/:id", protect, getEventById);

// Update event details (Admin only)
router.put("/updateEvent/:id", protect, isAdmin, updateEvent);

// Delete event (Admin only)
router.delete("/deleteEvent/:id", protect, isAdmin, deleteEvent);

// Register for an event (User only)
router.post("/registerForEvent/:id/register", protect, registerForEvent);

// Get participants of an event (Admin only)
router.get("/getParticipants/:id/participants", protect, isAdmin, getParticipants);

module.exports = router;
