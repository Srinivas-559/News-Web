const Event = require("../models/Event");
const agenda = require('../jobs/agenda');
const mongoose = require('mongoose');
const User = require("../models/User");
const sendEmail = require('../utils/email')
// Create a new event
exports.createEvent = async (req, res) => {
    const { title, description, organizer, date, time, location, capacity, tags, image, category, participants } = req.body;

    try {
        // Get the user's name from req.user (set by the `protect` middleware)
        const createdBy = req.user.id;
        console.log(createdBy);

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
            category,
            participants // Include participants in the event
        });

        await event.save();

        res.status(201).json({ message: "Event created !", event });
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

        const user = await User.findById(userId).select("name email");
        if (!user) return res.status(404).json({ message: "User not found" });

        if (event.participants.length >= event.capacity) {
            return res.status(400).json({ message: "Event is full" });
        }

        // Ensure the user is not already registered
        const isAlreadyRegistered = event.participants.some(p => p.userId.toString() === userId);
        if (isAlreadyRegistered) {
            return res.status(400).json({ message: "You are already registered for this event" });
        }

        // Add user to participants
        event.participants.push({ userId });
        await event.save();

        // Schedule email 1 hour before event
        const eventDateTime = new Date(event.time); // Use event.time directly

        console.log("🕒 Event Date-Time:", eventDateTime);

        if (isNaN(eventDateTime.getTime())) {
            console.log("❌ Invalid event date-time format!");
            return res.status(400).json({ message: "Invalid event date-time format" });
        }

        const notificationTime = new Date(eventDateTime.getTime() - 20 * 60 * 1000);
        console.log("📩 Notification Time (1 hour before):", notificationTime);

        // Schedule email only if notificationTime is in the future
        if (notificationTime > new Date()) {
            agenda.schedule(notificationTime, 'send email notification', {
                email: user.email,
                subject: `Reminder: ${event.title} starts soon!`,
                message:
                `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                  <meta charset="UTF-8">
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                  <title>Event Reminder</title>
                  <style>
                    body, html {
                      margin: 0;
                      padding: 0;
                      font-family: Arial, sans-serif;
                      background-color: #f4f7fc;
                    }
                    .container {
                      max-width: 600px;
                      margin: 0 auto;
                      background-color: #ffffff;
                      padding: 20px;
                      border-radius: 8px;
                      box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
                      text-align: center;
                    }
                    .header h1 {
                      font-size: 24px;
                      color: #333;
                    }
                    .message {
                      color: #555;
                      font-size: 16px;
                      line-height: 1.5;
                    }
                    .event-details {
                      background-color: #007bff;
                      color: white;
                      padding: 15px;
                      border-radius: 5px;
                      font-size: 18px;
                      margin: 20px 0;
                    }
                    .footer {
                      color: #777;
                      font-size: 12px;
                      margin-top: 30px;
                    }
                    .footer a {
                      color: #007bff;
                      text-decoration: none;
                    }
                  </style>
                </head>
                <body>
            
                  <div class="container">
                    <div class="header">
                      <h1>📢 Event Reminder</h1>
                    </div>
            
                    <div class="message">
                      <p>Hi <strong>${user.name}</strong>,</p>
                      <p>Your event <strong>${event.title}</strong> is starting in one hour.</p>
            
                      <div class="event-details">
                        📅 <strong>${event.date}</strong> <br>
                        ⏰ <strong>${event.time}</strong> <br>
                        📍 <strong>${event.location}</strong>
                      </div>
            
                      <p>We look forward to seeing you there!</p>
                    </div>
            
                    <div class="footer">
                      <p>&copy; 2025 University-Newshub. All rights reserved.</p>
                      <p>If you have any questions, feel free to <a href="mailto:support@newshub.com">contact us</a>.</p>
                    </div>
                  </div>
            
                </body>
                </html>
                `
            });
        } else {
            console.log("⚠️ Skipping email scheduling: event is too close or past.");
        }
        // Send Thank You Email Immediately
        await sendEmail(user.email, `✅ Thank You for Registering - ${event.title}`, `
            <!DOCTYPE html>
            <html lang="en">
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Registration Successful</title>
              <style>
                body, html {
                  margin: 0;
                  padding: 0;
                  font-family: Arial, sans-serif;
                  background-color: #f4f7fc;
                }
                .container {
                  max-width: 600px;
                  margin: 0 auto;
                  background-color: #ffffff;
                  padding: 20px;
                  border-radius: 8px;
                  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
                  text-align: center;
                }
                .header h1 {
                  font-size: 24px;
                  color: #28a745;
                }
                .message {
                  color: #555;
                  font-size: 16px;
                  line-height: 1.5;
                }
                .event-details {
                  background-color: #28a745;
                  color: white;
                  padding: 15px;
                  border-radius: 5px;
                  font-size: 18px;
                  margin: 20px 0;
                }
                .footer {
                  color: #777;
                  font-size: 12px;
                  margin-top: 30px;
                }
                .footer a {
                  color: #28a745;
                  text-decoration: none;
                }
              </style>
            </head>
            <body>
        
              <div class="container">
                <div class="header">
                  <h1>🎉 Thank You for Registering!</h1>
                </div>
        
                <div class="message">
                  <p>Dear <strong>${user.name}</strong>,</p>
                  <p>You have successfully registered for <strong>${event.title}</strong>.</p>
        
                  <div class="event-details">
                    📅 <strong>${event.date}</strong> <br>
                    ⏰ <strong>${event.time}</strong> <br>
                    📍 <strong>${event.location}</strong>
                  </div>
        
                  <p>We're excited to have you join us!</p>
                </div>
        
                <div class="footer">
                  <p>&copy; 2025 University-Newshub. All rights reserved.</p>
                  <p>If you have any questions, feel free to <a href="mailto:support@newshub.com">contact us</a>.</p>
                </div>
              </div>
        
            </body>
            </html>
        `);
        
        res.status(200).json({ success: true, message: "Registered successfully", event });
    } catch (error) {
        console.error("Error in registerForEvent:", error);
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

