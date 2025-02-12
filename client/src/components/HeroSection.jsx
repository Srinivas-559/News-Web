// components/HeroSection.js
import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="relative bg-cover bg-center h-[500px]" style={{ backgroundImage: 'url("https://via.placeholder.com/1500x500")' }}>
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 max-w-7xl mx-auto text-center text-white py-24 px-5">
        <h1 className="text-5xl font-bold mb-4">Welcome to University News</h1>
        <p className="text-xl mb-6">Stay updated with the latest happenings inside and outside the university.</p>
        <Link
          to="/university-news"
          className="inline-block bg-yellow-500 hover:bg-yellow-600 text-white text-lg font-semibold py-3 px-6 rounded-md"
        >
          Explore University News
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;
