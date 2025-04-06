import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Checkbox,
  FormControlLabel,
  Alert,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { DatePicker, LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import axios from "axios";

const CreateEvent = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    organizer: "",
    date: null,
    time: null,
    location: "",
    image: "",
    capacity: "",
    tags: "",
    isPublished: false,
    category: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [file, setFile] = useState(null);
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  const handleUpload = async () => {
    if (!file) {
      setError("Please select an image to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      setLoading(true);
      const { data } = await axios.post("http://localhost:5005/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setFormData((prevData) => ({ ...prevData, image: data.imageUrl }));
      setSuccess("Image uploaded successfully!");
      setError("");
    } catch (error) {
      setError("Failed to upload image.");
    } finally {
      setLoading(false);
    }
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: checked }));
  };

  const handleDateChange = (newDate) => {
    setFormData((prevData) => ({ ...prevData, date: newDate }));
  };

  const handleTimeChange = (newTime) => {
    setFormData((prevData) => ({ ...prevData, time: newTime }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const tagsArray = formData.tags.split(",").map((tag) => tag.trim());
      const payload = { ...formData, tags: tagsArray };

      const response = await axios.post(
        "http://localhost:5005/api/events/create",
        payload,
        {
          withCredentials: true, // Ensure cookies are sent with the request
        }
      );
      setSuccess("Event created successfully!");
      setFormData({
        title: "",
        description: "",
        organizer: "",
        date: null,
        time: null,
        location: "",
        image: "",
        capacity: "",
        tags: "",
        isPublished: false,
        category: "",
      });

      console.log(response);
    } catch (error) {
      console.error("Error creating event:", error);
      setError(error.response?.data?.message || "Failed to create event.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ textAlign: "center", fontWeight: "bold", mb: 3 }}
      >
        Create New Event
      </Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <TextField
            fullWidth
            label="Event Title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
          <TextField
            fullWidth
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            multiline
            rows={4}
            required
          />
          <TextField
            fullWidth
            label="Organizer"
            name="organizer"
            value={formData.organizer}
            onChange={handleInputChange}
            required
          />
          <TextField
            fullWidth
            label="Location"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            required
          />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Date"
              value={formData.date}
              onChange={handleDateChange}
              renderInput={(params) => <TextField fullWidth {...params} />}
              required
            />
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <TimePicker
              label="Time"
              value={formData.time}
              onChange={handleTimeChange}
              renderInput={(params) => <TextField fullWidth {...params} />}
              required
            />
          </LocalizationProvider>
          <TextField
            fullWidth
            label="Capacity"
            name="capacity"
            type="number"
            value={formData.capacity}
            onChange={handleInputChange}
            required
          />
          <TextField
            fullWidth
            label="Tags (comma-separated)"
            name="tags"
            value={formData.tags}
            onChange={handleInputChange}
          />
          <Box>
            <input type="file" accept="image/*" onChange={handleFileChange} />
            <Button variant="contained" color="secondary" onClick={handleUpload} sx={{ ml: 2 }}>
              Upload Image
            </Button>
          </Box>

          <FormControl fullWidth required>
            <InputLabel>Category</InputLabel>
            <Select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
            >
              <MenuItem value="Entertainment">Entertainment</MenuItem>
              <MenuItem value="Science">Science</MenuItem>
              <MenuItem value="Sports">Sports</MenuItem>
              <MenuItem value="Arts">Arts</MenuItem>
              <MenuItem value="Social">Social</MenuItem>
              <MenuItem value="Politics">Politics</MenuItem>
              <MenuItem value="Others">Others</MenuItem>
            </Select>
          </FormControl>
          <FormControlLabel
            control={
              <Checkbox
                name="isPublished"
                checked={formData.isPublished}
                onChange={handleCheckboxChange}
              />
            }
            label="Publish Event"
          />
        </Box>
        <Box
          sx={{
            mt: 3,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
            fullWidth
            sx={{ maxWidth: "300px" }}
          >
            {loading ? "Creating Event..." : "Create Event"}
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default CreateEvent;
