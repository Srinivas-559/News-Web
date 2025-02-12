import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Highlights = () => {
  const highlights = [
    {
      title: 'External News',
      description: 'Catch up on the latest global news and updates.',
    },
    {
      title: 'University News',
      description: 'Stay informed with the latest happenings at the university.',
    },
    {
      title: 'Trending Topics',
      description: 'Read about the latest trends and hot topics.',
    },
  ];

  return (
    <Box
      sx={{
        py: 12,
        background: 'linear-gradient(to right, #ece9e6, #ffffff)',
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          fontWeight="bold"
          textAlign="center"
          color="text.primary"
          gutterBottom
        >
          Highlights
        </Typography>
        <Typography
          variant="body1"
          textAlign="center"
          color="text.secondary"
          sx={{ maxWidth: 600, mx: 'auto', mb: 6 }}
        >
          Discover what’s making the buzz – from global events to university insights.
        </Typography>

        <Box
          sx={{
            position: 'relative',
            mt: 4,
          }}
        >
          {highlights.map((highlight, index) => (
            <HighlightStep
              key={index}
              title={highlight.title}
              description={highlight.description}
              stepNumber={index + 1}
              isRightAligned={index % 2 === 0}
            />
          ))}

          {/* Connecting line */}
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: '100%' }}
            transition={{ duration: 1.5 }}
            style={{
              position: 'absolute',
              top: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 4,
              background: '#1976d2',
            }}
          />
        </Box>
      </Container>
    </Box>
  );
};

const HighlightStep = ({ title, description, stepNumber, isRightAligned }) => {
  const { ref, inView } = useInView({
    threshold: 0.2, // Trigger animation when 20% of the element is visible
    triggerOnce: true, // Trigger only once
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isRightAligned ? -50 : 50 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 1, delay: stepNumber * 0.3 }}
      style={{
        display: 'flex',
        justifyContent: isRightAligned ? 'flex-end' : 'flex-start',
        marginBottom: 60,
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: '45%',
          background: 'white',
          borderRadius: 3,
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
          padding: 3,
          zIndex: 1,
        }}
      >
        <Typography
          variant="h6"
          fontWeight="bold"
          color="text.primary"
          sx={{
            mb: 2,
            fontSize: '1.25rem',
            textAlign: isRightAligned ? 'right' : 'left',
          }}
        >
          {stepNumber}. {title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            textAlign: isRightAligned ? 'right' : 'left',
          }}
        >
          {description}
        </Typography>
        {/* Decorative Circle */}
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
            left: isRightAligned ? '-20px' : 'auto',
            right: isRightAligned ? 'auto' : '-20px',
            width: 20,
            height: 20,
            background: '#1976d2',
            borderRadius: '50%',
          }}
        />
      </Box>
    </motion.div>
  );
};

export default Highlights;
