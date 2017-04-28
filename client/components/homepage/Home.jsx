import React from 'react';
import Intro from './Intro';
import Customers from './Customers';
import Features from './Features';
import Testimonials from './testimonials/Testimonials';
import Contact from './contact/Contact';

const Home = () => (
  <div>
    <Intro />
    <Customers />
    <Features />
    <Testimonials />
    <Contact />
  </div>
);

export default Home;
