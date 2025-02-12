import React from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography, Box } from "@mui/material";

const EventDialog = ({ event, open, onClose, onParticipate }) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>{event?.title}</DialogTitle>
      <DialogContent>
        {/* Event Image with fixed dimensions */}
        {event?.image && (
          <img
            src={event.image}
            alt={event.title}
            style={{
              width: "100%",
              height: "300px", // Fixed height
              objectFit: "cover", // Ensures the image covers the area without distortion
              borderRadius: "8px",
              marginBottom: "16px",
            }}
          />
        )}

        {/* Event Description */}
        <Typography variant="body1" gutterBottom>
          {event?.description}
        </Typography>

        {/* Event Details */}
        <Typography variant="body2" color="textSecondary">
          <strong>Category:</strong> {event?.category}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          <strong>Organized by:</strong> {event?.organizer}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          <strong>Date:</strong> {new Date(event?.date).toLocaleDateString()} 
          <strong> Time:</strong> {event?.time}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          <strong>Location:</strong> {event?.location}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          <strong>Capacity:</strong> {event?.participants?.length}/{event?.capacity}
        </Typography>

        {/* Participants List */}
        {event?.participants?.length > 0 ? (
          <Box sx={{ marginTop: "16px", padding: "10px", backgroundColor: "#f5f5f5", borderRadius: "8px" }}>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              <strong>Participants:</strong>
            </Typography>
            <ol style={{ paddingLeft: "20px" }}>
              {event?.participants.map((participant, index) => (
                <li
                  key={index}
                  style={{
                    marginBottom: "8px",
                    fontSize: "16px",
                    color: "#333",
                    fontWeight: "500",
                    lineHeight: "1.5",
                  }}
                >
                  <span
                    style={{
                      display: "inline-block",
                      width: "20px",
                      height: "20px",
                      borderRadius: "50%",
                      textAlign: "center",
                      marginRight: "10px",
                      lineHeight: "20px",
                    }}
                  >
                    {index + 1}
                  </span>
                  {participant.name}
                </li>
              ))}
            </ol>
          </Box>
        ) : (
          <Typography variant="body2" color="textSecondary" sx={{ marginTop: "16px", fontStyle: "italic" }}>
            Be the first to participate and get benefits!
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
        <Button onClick={() => onParticipate(event)} color="primary">
          Participate
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EventDialog;
