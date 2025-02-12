import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const achievements = [
  {
    title: "Award for Excellence in Research",
    description: "Our university received the prestigious Excellence in Research award for groundbreaking advancements in various fields.",
    image: "https://plus.unsplash.com/premium_photo-1661578947517-e292bf6cea5e?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8c2NpZW50aWZpY3xlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    title: "Top 10 in National Rankings",
    description: "We are proud to be ranked among the top 10 universities in the country, recognized for our academic excellence and innovative programs.",
    image: "https://img.lovepik.com/background/20211021/large/lovepik-blue-background-of-science-and-technology-image_500486349.jpg"
  },
  {
    title: "Innovation in Technology",
    description: "Our state-of-the-art research labs and technology centers foster innovation and creativity, leading to numerous awards and patents.",
    image: "https://images.pexels.com/photos/256381/pexels-photo-256381.jpeg?cs=srgb&dl=pexels-pixabay-256381.jpg&fm=jpg"
  }
];

const HeroSection = () => {
  return (
    <div className="relative">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        className="h-screen"
      >
        {achievements.map((achievement, index) => (
          <SwiperSlide key={index}>
            <div className="bg-cover bg-center h-screen flex items-center justify-center text-center text-white" style={{ backgroundImage: `url(${achievement.image})` }}>
              <div className="bg-black bg-opacity-50 p-10 rounded-lg">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">{achievement.title}</h1>
                <p className="text-lg md:text-xl">{achievement.description}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white p-4 text-center">
        <p className="text-md md:text-lg">Explore our latest achievements and milestones</p>
      </div>
    </div>
  );
};

export default HeroSection;
