import React from 'react';
import { Container, Typography, Box, Stack, Card, CardContent, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const HowWeGather = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  const dataPoints = [
    {
      title: 'Trusted Sources',
      description: 'We collaborate with verified news agencies and reporters to ensure credibility.',
      icon: '📰',
    },
    {
      title: 'Fact Verification',
      description: 'Every story is cross-checked against reliable references for authenticity.',
      icon: '✅',
    },
    {
      title: 'Simplified Delivery',
      description: 'Complex news stories are presented in a format that’s easy to digest.',
      icon: '📢',
    },
    {
      title: 'Community Contributions',
      description: 'Empowering university members to share insights and stories directly.',
      icon: '🤝',
    },
    {
      title: 'Breaking News Alerts',
      description: 'Real-time updates delivered instantly through our robust notification system.',
      icon: '⚡',
    },
    {
      title: 'Personalized Content',
      description: 'Tailored news recommendations based on your interests and preferences.',
      icon: '🎯',
    },
  ];

  return (
    <Box
      sx={{
        width: '100vw',
        py: 12,
        px: 3,
        background: 'radial-gradient(circle, #ffffff, #f3f4f6)',
        position: 'relative',
        overflow: 'hidden',
      }}
      ref={ref}
    >
      {/* Layered Background Animation */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: inView ? 0.4 : 0, scale: inView ? 1 : 0.8 }}
        transition={{ duration: 3, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          top: '-20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '350%',
          height: '350%',
          background: 'radial-gradient(circle at center, rgba(0, 136, 204, 0.15), transparent)',
          zIndex: 0,
        }}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: inView ? 0.2 : 0, scale: inView ? 1 : 0.8 }}
        transition={{ duration: 3, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          top: '-30%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '400%',
          height: '400%',
          background: 'radial-gradient(circle at center, rgba(0, 100, 180, 0.1), transparent)',
          zIndex: 0,
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Section Heading */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: inView ? 0 : -50, opacity: inView ? 1 : 0 }}
          transition={{ duration: 1 }}
        >
          <Typography
            variant="h3"
            align="center"
            fontWeight="bold"
            color="text.primary"
            gutterBottom
          >
            How We Gather and Share News
          </Typography>
          <Typography
            variant="subtitle1"
            align="center"
            color="text.secondary"
            sx={{ maxWidth: 800, mx: 'auto', mt: 2 }}
          >
            Our commitment to accuracy, credibility, and clarity ensures you always stay informed. Here’s a look at our process:
          </Typography>
        </motion.div>

        {/* Dynamic Cards Section */}
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={4}
          sx={{ mt: 6, justifyContent: 'center', alignItems: 'center' }}
        >
          {dataPoints.map((point, index) => (
            <motion.div
              key={index}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: inView ? 0 : 50, opacity: inView ? 1 : 0 }}
              transition={{ delay: inView ? index * 0.3 : 0, duration: 1 }}
              whileHover={{ scale: 1.05 }}
            >
              <Card
                sx={{
                  maxWidth: 300,
                  textAlign: 'center',
                  boxShadow: 6,
                  borderRadius: 3,
                  overflow: 'hidden',
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  '&:hover': { boxShadow: 10 },
                }}
              >
                <CardContent>
                  <motion.div whileHover={{ rotate: 10, scale: 1.2 }}>
                    <Typography
                      variant="h4"
                      color="primary"
                      sx={{ mb: 2 }}
                      style={{ fontSize: '2.5rem' }}
                    >
                      {point.icon}
                    </Typography>
                  </motion.div>
                  <Typography variant="h6" fontWeight="bold" color="text.primary">
                    {point.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    {point.description}
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </Stack>

        {/* Call to Action */}
        <Box textAlign="center" sx={{ mt: 8 }}>
          <Typography variant="h5" fontWeight="bold" color="text.primary" gutterBottom>
            Want to know more?
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Explore our commitment to delivering trustworthy and accurate news tailored for you.
          </Typography>
          <Button variant="contained" color="primary" size="large">
            Learn More
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default HowWeGather;
