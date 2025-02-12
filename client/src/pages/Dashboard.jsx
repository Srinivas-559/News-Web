import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Tab, Tabs, Typography, Container, Paper } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ArticleIcon from '@mui/icons-material/Article';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import EventIcon from '@mui/icons-material/Event';
import { useAuth } from '../context/AuthContext';
import CreateArticle from '../components/dashboard/CreateArticle';
import ViewArticles from '../components/dashboard/ViewArticles';
import CreateEvent from '../components/dashboard/CreateEvent'; // Import CreateEvent component
import ViewEvents from '../components/dashboard/ViewEvents';

const Dashboard = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <Box sx={{ textAlign: 'center', mt: 5 }}>
        <Typography variant="h6">Loading...</Typography>
      </Box>
    );
  }

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 3, md: 5 } }}>
      {/* Header Section */}
      <Box sx={{ mb: { xs: 3, md: 5 }, textAlign: 'center' }}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 'bold',
            fontSize: { xs: '1.8rem', md: '2.5rem' },
            mb: 2,
          }}
        >
          Admin Dashboard
        </Typography>
        <Typography
          variant="subtitle1"
          color="text.secondary"
          sx={{
            fontSize: { xs: '0.9rem', md: '1.2rem' },
          }}
        >
          Manage your news portal effectively with the tools provided below.
        </Typography>
      </Box>

      {/* Tabs Section */}
      <Paper elevation={3} sx={{ mb: 3 }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            '& .MuiTab-root': {
              minWidth: { xs: 'auto', md: 120 },
              fontSize: { xs: '0.75rem', md: '1rem' },
            },
          }}
        >
          <Tab
            icon={<AddCircleOutlineIcon />}
            iconPosition="start"
            label="Upload Articles"
          />
          <Tab
            icon={<ArticleIcon />}
            iconPosition="start"
            label="View Articles"
          />
          <Tab
            icon={<AddCircleOutlineIcon />}
            iconPosition="start"
            label="Events"
          />
          <Tab
            icon={<EventIcon />}
            iconPosition="start"
            label="View Events"
          />
          <Tab
            icon={<AnalyticsIcon />}
            iconPosition="start"
            label="Analytics"
          />
        </Tabs>
      </Paper>

      {/* Content Area */}
      <Box>
        {activeTab === 0 && (
          <Box sx={{ p: { xs: 2, md: 3 } }}>
            <CreateArticle />
          </Box>
        )}
        {activeTab === 1 && (
          <Box sx={{ p: { xs: 2, md: 3 } }}>
            <Typography variant="h5" gutterBottom>
              View Your Articles
            </Typography>
            <ViewArticles />
          </Box>
        )}
        
        {activeTab === 2 && (
          <Box sx={{ p: { xs: 2, md: 3 } }}>
            <CreateEvent />
          </Box>
        )}
        {activeTab === 3 && (
          <Box sx={{ p: { xs: 2, md: 3 } }}>
             <Typography variant="h5" gutterBottom>
              View Your Events
            </Typography>
            <ViewEvents />
          </Box>
        )}
        {activeTab === 4 && (
          <Box sx={{ p: { xs: 2, md: 3 }, textAlign: 'center' }}>
            <Typography variant="h5" gutterBottom>
              Analytics Dashboard
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Analytics features coming soon...
            </Typography>
          </Box>
        )}
      </Box>

      {/* Footer */}
      <Box
        sx={{
          mt: { xs: 3, md: 5 },
          textAlign: 'center',
          color: 'text.secondary',
        }}
      >
        <Typography
          variant="body2"
          sx={{
            fontSize: { xs: '0.8rem', md: '1rem' },
          }}
        >
          &copy; 2024 NewsWeb App. All rights reserved.
        </Typography>
      </Box>
    </Container>
  );
};

export default Dashboard;
