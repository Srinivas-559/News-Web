import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const FeaturedCarousel = ({ featuredEvents }) => (
  <div className="mb-10">
    <h1 className="text-3xl font-bold mb-6">Featured Events</h1>
    <Carousel 
      autoPlay
      infiniteLoop
      interval={5000}
      showThumbs={false}
      showStatus={false}
      transitionTime={1000}
      className="rounded-lg"
    >
      {featuredEvents.map((event, index) => (
        <div key={index} className="relative">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-[400px] object-cover rounded-lg"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="text-white text-center px-4">
              <h2 className="text-2xl md:text-4xl font-bold">{event.title}</h2>
              <p className="mt-4 text-sm md:text-base hidden sm:block">
                {event.description.substring(0, 150)}...
              </p>
              <p className="mt-6 text-sm">Organized by {event.organizer}</p>
            </div>
          </div>
        </div>
      ))}
    </Carousel>
  </div>
);

export default FeaturedCarousel;
