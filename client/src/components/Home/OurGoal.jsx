import React from 'react';

const OurGoal = () => {
  return (
    <div className="w-screen h-screen bg-gradient-to-r from-blue-50 via-white to-blue-50 shadow-lg flex items-center">
      <div className="max-w-5xl mx-auto text-center px-8">
        {/* Section Title */}
        <h2 className="text-5xl md:text-6xl font-extrabold text-gray-800 leading-tight">
          Our Mission and Vision
        </h2>

        {/* Main Description */}
        <p className="text-2xl md:text-3xl text-gray-700 mt-8">
          We are dedicated to delivering <span className="text-blue-500 font-semibold">reliable</span>,
          <span className="text-blue-500 font-semibold"> timely</span>, and <span className="text-blue-500 font-semibold">comprehensive</span>
          news coverage, bridging the gap between you and the world’s most significant events.
        </p>

        {/* Sub Description */}
        <p className="text-lg md:text-xl text-gray-600 mt-6">
          Our mission is to empower informed decisions through trusted journalism, ensuring
          you stay connected to the stories that shape our world. We strive to deliver
          actionable insights and foster understanding in a rapidly changing global landscape.
        </p>

        {/* Added Details */}
        <p className="text-lg md:text-xl text-gray-600 mt-6">
          With a commitment to transparency, inclusivity, and innovation, we aim to set the
          gold standard in news delivery. Our vision is to create a community where everyone
          has access to credible information and meaningful discussions.
        </p>

        {/* Decorative Element */}
        <div className="flex justify-center mt-10">
          <div className="w-24 h-1 bg-blue-500 rounded-full"></div>
        </div>

        {/* Call-to-Action */}
        <div className="mt-16">
          <button className="px-6 py-3 text-lg font-semibold text-white bg-blue-500 rounded-md shadow-md hover:bg-blue-600 transition duration-300">
            Learn More About Us
          </button>
        </div>
      </div>
    </div>
  );
};

export default OurGoal;
