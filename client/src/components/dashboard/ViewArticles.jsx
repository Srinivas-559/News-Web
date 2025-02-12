import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Grid } from '@mui/material';
import axios from 'axios';

const ViewArticles = () => {
  const [articles, setArticles] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentArticle, setCurrentArticle] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: '',
    tags: '',
    image: '',
  });

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get('http://localhost:5005/api/articles/getArticles', {
          withCredentials: true,
        });
        setArticles(response.data.articles);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    fetchArticles();
  }, []);

  // Handle delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5005/api/articles/deleteArticle/${id}`, {
        withCredentials: true,
      });
      setArticles(articles.filter((article) => article._id !== id)); // Remove article from state
    } catch (error) {
      console.error('Error deleting article:', error);
    }
  };

  // Handle edit
  const handleEdit = (article) => {
    setCurrentArticle(article);
    setFormData({
      title: article.title,
      content: article.content,
      category: article.category,
      tags: article.tags.join(', '),
      image: article.image,
    });
    setOpen(true);
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Submit the edited article
  const handleSubmitEdit = async () => {
    try {
      const updatedArticle = await axios.put(
        `http://localhost:5005/api/articles/editArticle/${currentArticle._id}`,
        formData,
        {
          withCredentials: true,
        }
      );
      setArticles(
        articles.map((article) =>
          article._id === currentArticle._id ? updatedArticle.data.article : article
        )
      );
      setOpen(false);
    } catch (error) {
      console.error('Error updating article:', error);
    }
  };

  // Close dialog
  const handleCloseDialog = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={3}>
        {articles.map((article) => (
          <Grid item xs={12} sm={6} md={4} key={article._id}>
            <Paper elevation={3} sx={{ p: 3, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                  {article.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {article.content.length > 100 ? `${article.content.substring(0, 100)}...` : article.content}
                </Typography>
                <Typography variant="body2" color="text.primary" sx={{ mb: 1 }}>
                  <strong>Author:</strong> {article.author}
                </Typography>
                <Typography variant="body2" color="text.primary" sx={{ mb: 1 }}>
                  <strong>Category:</strong> {article.category}
                </Typography>
                <Typography variant="body2" color="text.primary" sx={{ mb: 1 }}>
                  <strong>Tags:</strong> {article.tags.join(', ')}
                </Typography>
                <Typography variant="body2" color="text.primary" sx={{ mb: 1 }}>
                  <strong>Views:</strong> {article.views}
                </Typography>
                <Typography variant="body2" color="text.primary" sx={{ mb: 2 }}>
                  {article.isFeatured ? (
                    <span style={{ color: 'gold', fontWeight: 'bold' }}>Featured Article</span>
                  ) : (
                    'Regular Article'
                  )}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => handleEdit(article)}
                  sx={{ width: '48%' }}
                >
                  Edit
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => handleDelete(article._id)}
                  sx={{ width: '48%' }}
                >
                  Delete
                </Button>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Edit Article Dialog */}
      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>Edit Article</DialogTitle>
        <DialogContent sx={{ minWidth: 400 }}>
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
            label="Content"
            variant="outlined"
            name="content"
            value={formData.content}
            onChange={handleChange}
            sx={{ mb: 2 }}
            multiline
            rows={4}
          />
          <TextField
            fullWidth
            label="Category"
            variant="outlined"
            name="category"
            value={formData.category}
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmitEdit} color="primary">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ViewArticles;
