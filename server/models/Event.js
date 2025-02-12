const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    title: { type: String, required: true }, // Name of the event
    description: { type: String, required: true }, // Detailed description of the event
    organizer: { type: String, required: true }, // Name of the event organizer
    date: { type: Date, required: true }, // Date of the event
    time: { type: String, required: true }, // Time of the event
    location: { type: String, required: true }, // Venue/Location
    image: { type: String }, // Event banner or image URL
    capacity: { type: Number, required: true }, // Maximum number of participants
    participants: [
        {
            userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Reference to User model
            joinedAt: { type: Date, default: Date.now }, // Timestamp of joining
        },
    ],
    tags: [String], // Tags for categorizing the event
    category: { type: String, required: true }, // Category of the event
    isPublished: { type: Boolean, default: false }, // Publish status
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // User who created the event
    createdAt: { type: Date, default: Date.now }, // Timestamp of creation
    updatedAt: { type: Date, default: Date.now }, // Timestamp of last update
});

const Event = mongoose.models.Event || mongoose.model("Event", eventSchema);

module.exports = Event;
