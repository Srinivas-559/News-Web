import React from 'react';
import { Typography, Button } from '@mui/material';


const ExtraSection = () => {
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

  return (
    <div className="w-full bg-white text-gray-800 py-16 relative">
      {/* Header Section */}
      <div className="text-center max-w-3xl mx-auto px-4">
        <Typography
          variant="h3"
          className="font-bold text-gray-900 mb-4"
        >
          Our Core Values
        </Typography>
        <Typography
          variant="body1"
          className="text-gray-600 text-lg leading-relaxed"
        >
          Discover the principles that guide our mission to innovate, connect, and inspire communities.
        </Typography>
      </div>

      {/* Values Section */}
      <div className="mt-10 flex flex-wrap justify-center gap-6 px-4">
        {values.map((value, index) => (
          <div
            key={index}
            className="bg-gray-100 rounded-lg p-6 w-80 hover:scale-105 transition-transform duration-300 shadow-md hover:shadow-lg"
          >
            <Typography
              variant="h5"
              className="font-bold text-gray-900 mb-2"
            >
              {value.title}
            </Typography>
            <Typography
              variant="body2"
              className="text-gray-700 leading-relaxed"
            >
              {value.description}
            </Typography>
          </div>
        ))}
      </div>

      {/* Latest Updates Section */}
      <div className="mt-16 bg-gray-100 py-8 rounded-lg mx-4">
        <Typography
          variant="h4"
          className="font-bold text-center text-gray-900 mb-6"
        >
          Latest Updates
        </Typography>
        <div className="flex flex-wrap justify-center gap-6 px-4">
          {updates.map((update, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-6 w-80 shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <Typography
                variant="h6"
                className="font-bold text-gray-900 mb-2"
              >
                {update.title}
              </Typography>
              <Typography
                variant="body2"
                className="text-gray-700 leading-relaxed"
              >
                {update.description}
              </Typography>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};



export default ExtraSection;
