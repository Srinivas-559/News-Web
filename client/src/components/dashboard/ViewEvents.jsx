import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Paper, Chip, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const ViewEvents = () => {
  const [events, setEvents] = useState([]);
    const [open, setOpen] = useState(false);
    const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    organizer: '',
    date: '',
    time: '',
    location: '',
    image: '',
    capacity: 0,
    tags: '',
  });
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    // Fetching events
   const fetchEvents = async () => {
    try {
        console.log(user._id);
        const response = await axios.get(`http://localhost:5005/api/events/getEvents?userId=${user._id}`,
            {withCredentials:true}
        );
        setEvents(response.data);
        console.log(response.data);// Assuming backend wraps the events in { events }
    } catch (error) {
        console.error('Error fetching events:', error);
    }
};
fetchEvents();
  }, []);

  const handleEdit = (event) => {
    setSelectedEvent(event);
    setFormData({
      title: event.title,
      description: event.description,
      organizer: event.organizer,
      date: event.date,
      time: event.time,
      location: event.location,
      image: event.image,
      capacity: event.capacity,
      tags: event.tags.join(', '),
    });
    setOpen(true);
  };

  const handleDelete = async (id) => {
    try {
        await axios.delete(`http://localhost:5005/api/events/deleteEvent/${id}`,
            {
                withCredentials:true
            }
      );
      setEvents(events.filter(event => event._id !== id));
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleSubmitEdit = async () => {
    try {
      const updatedEvent = await axios.put(
        `http://localhost:5005/api/events/updateEvent/${selectedEvent._id}`,
          formData, {
            withCredentials:true
        }
      );
      setEvents(events.map(event => event._id === selectedEvent._id ? updatedEvent.data : event));
      setOpen(false);
    } catch (error) {
      console.error('Error updating event:', error);
    }
  };

  const isEventFinished = (eventDate) => {
    return new Date(eventDate) < new Date();
  };

  return (
    <Box>
      { events.length === 0  ?  <div className='text-blue-700 text-center font-semibold'>No Events To Be Displayed </div>  :       events?.map((event) => (
        <Paper key={event._id} elevation={2} sx={{ p: 3, mb: 2, position: 'relative' }}>
          <Chip
            label={isEventFinished(event.date) ? 'Ended' : 'Soon'}
            color={isEventFinished(event.date) ? 'error' : 'success'}
            sx={{ position: 'absolute', top: 10, right: 10 }}
          />
          <Typography variant="h6">{event.title}</Typography>
          <Typography variant="body2" color="text.secondary">{event.description}</Typography>
          <Typography variant="body2" color="text.primary">Organizer: {event.organizer}</Typography>
          <Typography variant="body2" color="text.primary">Date: {new Date(event.date).toLocaleDateString()}</Typography>
          <Typography variant="body2" color="text.primary">Time: {event.time}</Typography>
          <Typography variant="body2" color="text.primary">Location: {event.location}</Typography>
          <Typography variant="body2" color="text.primary">Tags: {event.tags.join(', ')}</Typography>
          <Typography variant="body2" color="text.primary">Capacity: {event.capacity}</Typography>
          <Box sx={{ mt: 2 }}>
            <Button variant="outlined" color="primary" onClick={() => handleEdit(event)} sx={{ mr: 1 }}>Edit</Button>
            <Button variant="outlined" color="error" onClick={() => handleDelete(event._id)}>Delete</Button>
          </Box>
        </Paper>
      ))}

      {/* Edit Event Dialog */}
      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>Edit Event</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Title"
            variant="outlined"
            name="title"
            value={formData.title}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Description"
            variant="outlined"
            name="description"
            value={formData.description}
            onChange={handleChange}
            sx={{ mb: 2 }}
            multiline
            rows={4}
          />
          <TextField
            fullWidth
            label="Organizer"
            variant="outlined"
            name="organizer"
            value={formData.organizer}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Date"
            variant="outlined"
            name="date"
            value={formData.date}
            onChange={handleChange}
            sx={{ mb: 2 }}
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            fullWidth
            label="Time"
            variant="outlined"
            name="time"
            value={formData.time}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Location"
            variant="outlined"
            name="location"
            value={formData.location}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Tags (comma separated)"
            variant="outlined"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Image URL"
            variant="outlined"
            name="image"
            value={formData.image}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Capacity"
            variant="outlined"
            name="capacity"
            value={formData.capacity}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">Cancel</Button>
          <Button onClick={handleSubmitEdit} color="primary">Save Changes</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ViewEvents;
