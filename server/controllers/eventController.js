const Event = require("../models/Event");

const mongoose = require('mongoose');
// Create a new event
exports.createEvent = async (req, res) => {
    const { title, description, organizer, date, time, location, capacity, tags, image ,category} = req.body;

    try {
        // Get the user's name from req.user (set by the `protect` middleware)
        const createdBy = req.user.id;
        // console.log(req.user);
        console.log(createdBy)

        const event = new Event({
            title,
            description,
            organizer,
            date,
            time,
            location,
            capacity,
            tags,
            image,
            createdBy,
            category// Use the name of the user who created the event
        });

        await event.save();
        res.status(201).json({ message: "Event created successfully", event });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error creating event", error });
    }
};

// Get all events

exports.getEvents = async (req, res) => {
    try {
        const { userId } = req.query;
        let filter = {};
        if (userId) {
            if (!mongoose.Types.ObjectId.isValid(userId)) {
                return res.status(400).json({ message: "Invalid userId" });
            }
            filter.createdBy = userId;
        }

        const events = await Event.find(filter);
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: "Error fetching events", error });
    }
};


// Get event by ID
exports.getEventById = async (req, res) => {
    const { id } = req.params;

    try {
        const event = await Event.findById(id);
        if (!event) return res.status(404).json({ message: "Event not found" });

        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ message: "Error fetching event", error });
    }
};

// Update event
exports.updateEvent = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    try {
        const event = await Event.findByIdAndUpdate(id, updates, { new: true });
        if (!event) return res.status(404).json({ message: "Event not found" });

        res.status(200).json({ message: "Event updated successfully", event });
    } catch (error) {
        res.status(500).json({ message: "Error updating event", error });
    }
};

// Delete event
exports.deleteEvent = async (req, res) => {
    const { id } = req.params;

    try {
        const event = await Event.findByIdAndDelete(id);
        if (!event) return res.status(404).json({ message: "Event not found" });

        res.status(200).json({ message: "Event deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting event", error });
    }
};

// Register for an event
exports.registerForEvent = async (req, res) => {
    const { id } = req.params;
    const { userId } = req.body; 
    try {
        const event = await Event.findById(id);
        if (!event) return res.status(404).json({ message: "Event not found" });

        if (event.participants.length >= event.capacity) {
            return res.status(400).json({ message: "Event is full" });
        }

        const isAlreadyRegistered = event.participants.some((p) => p.userId.toString() === userId);
        if (isAlreadyRegistered) {
            return res.status(400).json({ message: "You are already registered for this event" });
        }

        event.participants.push({ userId });
        await event.save();

        res.status(200).json({ success : true ,  message: "Registered successfully", event });
    } catch (error) {
        res.status(500).json({ message: "Error registering for event", error });
    }
};

// Get participants of an event
exports.getParticipants = async (req, res) => {
    const { id } = req.params;

    try {
        const event = await Event.findById(id).populate("participants.userId", "name email");
        if (!event) return res.status(404).json({ message: "Event not found" });

        res.status(200).json(event.participants);
    } catch (error) {
        res.status(500).json({ message: "Error fetching participants", error });
    }
};
exports.updateEvent = async (req, res) => {
    try {
        const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(event);
      } catch (error) {
        res.status(400).json({ message: 'Error updating event', error });
      }
}

  