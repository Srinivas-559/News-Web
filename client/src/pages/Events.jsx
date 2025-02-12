import React, { useState, useEffect } from 'react';
import FeaturedCarousel from "../components/events/FeaturedCorousel";
import EventCard from "../components/events/EventCard";
import EventDialog from "../components/events/EventDialogue";
import Tabs from "../components/events/Tabs";
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify'

const EventsPage = () => {
  const categories = ['All', 'Sports', 'Entertainment', 'Science', 'Social', 'Arts', 'Other'];
  const [events, setEvents] = useState([]);
  const [featuredEvents, setFeaturedEvents] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { user } = useAuth();
  const fetchEvents = async () => {
    try {
      const response = await fetch('http://localhost:5005/api/events/getEvents', {
        method: 'GET',
        credentials: 'include', // This ensures cookies or authentication tokens are sent with the request
        headers: {
          'Content-Type': 'application/json', // Optional, specify content type if needed
        },
      });

      const data = await response.json();
      console.log("data: ", data);
      if (response.ok) {
        setEvents(data); // Assuming the response is { events: [...] }
        setFeaturedEvents(data?.slice(0, 3)); // Set the first 3 events as featured
      } else {
        console.error('Failed to fetch events:', data.message);
      }
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };
  useEffect(() => {
    fetchEvents();
  }, []);

  const handleTabChange = (category) => {
    setSelectedCategory(category);
  };

  const handleReadMore = (event) => {
    setSelectedEvent(event);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleParticipate = async (event) => {
    if (!user) {
      alert("You need to be logged in to register for an event.");
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:5005/api/events/registerForEvent/${event._id}/register`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: user._id }), // Get user ID from auth context
      });
  
      const data = await response.json();
      console.log("response  " , data);
      if (data.success == true ) {
        toast.success("Successfully registered for the event!");
        setDialogOpen(false);
        // Optionally, refetch events to update participant count
        fetchEvents();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error registering for event:", error);
      alert("Failed to register for the event.");
    }
  };
  

  // Filter events based on category
  const filteredEvents = selectedCategory === 'All'
    ? events
    : events?.filter(event => event.category === selectedCategory); // Use category for filtering

  return (
    <div className="container mx-auto px-4">
      <FeaturedCarousel featuredEvents={featuredEvents?.length ? featuredEvents : []} />
      <Tabs activeTab={selectedCategory} tabs={categories} onTabClick={handleTabChange} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredEvents?.length ? (
          filteredEvents?.map(event => (
            <EventCard key={event._id} event={event} onReadMore={handleReadMore} />
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">
            No events found for the selected category.
          </p>
        )}
      </div>
      {selectedEvent && (
        <EventDialog
        event={selectedEvent}
        open={dialogOpen}
        onClose={handleCloseDialog}
        onParticipate={handleParticipate} // Pass updated function
      />
      
      )}
    </div>
  );
};

export default EventsPage;
