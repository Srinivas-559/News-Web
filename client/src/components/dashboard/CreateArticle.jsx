import React, { useEffect, useState } from 'react';
import { TextField, Button, Box, Typography, Paper, MenuItem, InputLabel, Select, FormControl, Alert } from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';

const CreateArticle = () => {
  const { user } = useAuth();


  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: user ? user.name : '',
    category: '',
    image: '',
    tags: '',
    isFeatured: false,
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const response = await axios.post('http://localhost:5005/api/articles/addArticle', formData, {
        withCredentials: true
      });
      setSuccess('Article added successfully!');
      setFormData({
        title: '',
        content: '',
        author: user ? user.name : '',
        category: '',
        image: '',
        tags: '',
        isFeatured: false,
      });
      console.log(response);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add article.');
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 700, mx: 'auto', backgroundColor: '#f9f9f9', borderRadius: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold', mb: 3 }}>
        Create New Article
      </Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
        }}
      >
        <TextField
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          label="Content"
          name="content"
          value={formData.content}
          onChange={handleChange}
          multiline
          rows={4}
          fullWidth
          required
        />
        <TextField
          label="Author"
          name="author"
          value={formData.author}
          onChange={handleChange}
          fullWidth
          disabled
        />
        <FormControl fullWidth required>
          <InputLabel>Category</InputLabel>
          <Select name="category" value={formData.category} onChange={handleChange}>
            <MenuItem value="Technology">Technology</MenuItem>
            <MenuItem value="Science">Science</MenuItem>
            <MenuItem value="Education">Education</MenuItem>
            <MenuItem value="Sports">Sports</MenuItem>
            <MenuItem value="Entertainment">Entertainment</MenuItem>
            <MenuItem value="Others">Others</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Image URL"
          name="image"
          value={formData.image}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          label="Tags (comma-separated)"
          name="tags"
          value={formData.tags}
          onChange={handleChange}
          fullWidth
        />
        <FormControl fullWidth required>
          <InputLabel id="is-featured-label">Is Featured</InputLabel>
          <Select
            labelId="is-featured-label"
            name="isFeatured"
            value={formData.isFeatured.toString()}
            onChange={(e) =>
              setFormData({ ...formData, isFeatured: e.target.value === 'true' })
            }
          >
            <MenuItem value="true">Yes</MenuItem>
            <MenuItem value="false">No</MenuItem>
          </Select>
        </FormControl>
        <Box textAlign="center">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ px: 5, py: 1, fontSize: '1rem' }}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default CreateArticle;
