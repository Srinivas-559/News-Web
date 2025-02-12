import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const FeaturedCarousel = ({ featuredArticles }) => (
  <div className="mb-10">
    <h1 className="text-3xl font-bold mb-6">Featured News</h1>
    <Carousel 
      autoPlay
      infiniteLoop
      interval={5000}
      showThumbs={false}
      showStatus={false}
      transitionTime={1000}
      className="rounded-lg"
    >
      {featuredArticles.map((article, index) => (
        <div key={index} className="relative">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-[400px] object-cover rounded-lg"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="text-white text-center px-4">
              <h2 className="text-2xl md:text-4xl font-bold">{article.title}</h2>
              <p className="mt-4 text-sm md:text-base hidden sm:block">
                {article.content.substring(0, 150)}...
              </p>
              <p className="mt-6 text-sm">By {article.author}</p>
            </div>
          </div>
        </div>
      ))}
    </Carousel>
  </div>
);

export default FeaturedCarousel;
