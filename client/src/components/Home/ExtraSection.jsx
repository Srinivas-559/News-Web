import React, { useEffect } from 'react';
import { Typography, Button } from '@mui/material';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Parallax } from 'react-scroll-parallax';

const ExtraSection = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView();
  const [updatesRef, updatesInView] = useInView();

  useEffect(() => {
    if (inView) controls.start('visible');
    if (updatesInView) controls.start('visible');
  }, [controls, inView, updatesInView]);

  const values = [
    { title: 'Integrity', description: 'Upholding the highest standards of honesty in our reporting.' },
    { title: 'Transparency', description: 'Providing clarity about our sources and processes.' },
    { title: 'Innovation', description: 'Leveraging technology to enhance your news experience.' },
    { title: 'Community', description: 'Building a platform that connects and informs people everywhere.' },
  ];

  const updates = [
    { title: 'Semester Exams Schedule', description: 'Check out the latest updates on the upcoming semester exams and preparation tips.' },
    { title: 'Annual Fest 2024', description: 'Join us for the most exciting cultural fest of the year. Don\'t miss out!' },
    { title: 'Research Grants', description: 'Apply now for university-sponsored research grants. Deadline approaching soon!' },
    { title: 'Sports Meet Highlights', description: 'Relive the best moments from this year\'s inter-college sports meet.' },
  ];

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="w-full bg-white text-gray-800 py-16 relative overflow-hidden">
      {/* Animated Background Elements */}
      <Parallax y={[-20, 20]} className="absolute top-0 left-0">
        <div className="w-48 h-48 bg-blue-100 rounded-full blur-3xl opacity-30" />
      </Parallax>

      {/* Header Section with Animated SVG */}
      <motion.div 
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  className="text-center max-w-3xl mx-auto px-4"
>
  {/* Enhanced Animated Newspaper Icon */}
  <motion.div
    className="w-24 h-24 mx-auto mb-6"
    whileHover={{ scale: 1.1, rotate: 10 }}
    whileTap={{ scale: 0.9 }}
    animate={{ rotate: [0, 360] }}
    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-full h-full text-blue-600"
    >
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <path d="M8 8h8v8H8z" />
    </svg>
  </motion.div>

  <Typography
    variant="h3"
    className="font-bold text-gray-900 mb-4"
  >
    Our <span className="text-blue-600">Dynamic</span> Community
  </Typography>
  <Typography
    variant="body1"
    className="text-gray-600 text-lg leading-relaxed"
  >
    Discover the principles that guide our mission to innovate, connect, and inspire communities.
  </Typography>
</motion.div>

{/* Values Section with Enhanced Animations */}
<motion.div 
  ref={ref}
  initial="hidden"
  animate={controls}
  variants={{
    visible: { transition: { staggerChildren: 0.3 } }
  }}
  className="mt-10 flex flex-wrap justify-center gap-6 px-4"
>
  {values.map((value, index) => (
    <motion.div
      key={index}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
      }}
      whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)" }}
      className="bg-white rounded-lg p-6 w-80 transition-all duration-300 shadow-md hover:shadow-lg relative group border border-gray-200"
    >
      {/* Gradient Overlay on Hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-10 transition-opacity rounded-lg" />
      
      {/* Icon and Title */}
      <div className="flex items-center gap-3 mb-4">
        <motion.div
          whileHover={{ rotate: 15 }}
          className="p-2 bg-blue-100 rounded-full"
        >
          <span className="text-blue-600 text-2xl">✨</span>
        </motion.div>
        <Typography
          variant="h5"
          className="font-bold text-gray-900"
        >
          {value.title}
        </Typography>
      </div>

      {/* Description */}
      <Typography variant="body2" className="text-gray-700">
        {value.description}
      </Typography>
    </motion.div>
  ))}
</motion.div>
      {/* Latest Updates Section with Parallax */}
      <div className="mt-16 mx-auto max-w-4xl px-4">
        <Parallax y={[-10, 10]}>
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-1 rounded-full">
            <div className="bg-white p-8 rounded-2xl">
              <Typography variant="h4" className="font-bold text-center mb-6">
                🚀 What's New?
              </Typography>
              <div className="space-y-6">
                {updates.map((update, index) => (
                  <motion.div 
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    className="p-6 rounded-xl border-l-4 border-blue-500 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <Typography variant="h6" className="font-bold mb-2">
                      {update.title}
                    </Typography>
                    <Typography variant="body2" className="text-gray-600">
                      {update.description}
                    </Typography>
                    <Button 
                      variant="text" 
                      className="mt-3 text-blue-600 hover:bg-blue-50"
                      endIcon={<span>→</span>}
                    >
                      Learn More
                    </Button>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </Parallax>
      </div>

      {/* Floating Newsletter CTA */}
      <motion.div 
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ 
          repeat: Infinity,
          repeatType: 'reverse',
          duration: 2
        }}
        className="mt-16 text-center px-4"
      >
        <div className="inline-block bg-gradient-to-r from-blue-500 to-purple-500 p-1 rounded-2xl shadow-xl">
          <div className="bg-white rounded-xl p-8">
            <Typography variant="h5" className="font-bold mb-4">
              📬 Stay Updated!
            </Typography>
            <div className="flex gap-4 justify-center">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Button 
                variant="contained" 
                className="bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all"
              >
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ExtraSection;