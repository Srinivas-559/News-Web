

import React from 'react';
import HeroSection from '../components/Home/HeroSection';
import OurGoal from '../components/Home/OurGoal';
import HowWeGather from '../components/Home/HowWeGather';
import Highlights from '../components/Home/Highlights';
import ExtraSection from '../components/Home/ExtraSection';
import Footer from '../components/Home/Footer';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <HeroSection />
      <section id="our-mission-and-vision">
        <OurGoal />
      </section>
      <section id="how-we-gather">
        <HowWeGather />
      </section>
      <section id="highlights">
        <Highlights />
      </section>
      <section id="our-values">
        <ExtraSection />
      </section>
      <Footer />
    </div>
  );
};

export default HomePage;
