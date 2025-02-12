import React from 'react';
import { Card, CardContent, CardMedia, Typography, IconButton, Tooltip } from '@mui/material';
import { People } from '@mui/icons-material';

const EventCard = ({ event, onReadMore }) => (
  <Card className="bg-white shadow-lg rounded-lg overflow-hidden m-4">
    <CardMedia
      component="img"
      height="140"
      image={event.image}
      alt={event.title}
      className="w-full h-48 object-cover"
    />
    <CardContent className="p-4">
      <Typography variant="h5" component="div" className="text-lg font-semibold">
        {event.title}
      </Typography>
      <Typography variant="body2" color="text.secondary" className="text-sm text-gray-600 mt-2">
        {event.description.substring(0, 100)}... <button onClick={() => onReadMore(event)} className="text-blue-500 mt-4 text-sm">Read More</button>
      </Typography>
      <div className="flex items-center mt-2">
        <Tooltip title={`Participants: ${event.participants.length}`}>
          <IconButton>
            <People />
          </IconButton>
        </Tooltip>
        <Typography variant="body2" color="text.secondary" className="ml-2">
          {event.participants.length}
        </Typography>
      </div>
    </CardContent>
  </Card>
);

export default EventCard;
