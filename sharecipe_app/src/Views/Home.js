import React from 'react';
import NavBar from './Navbar.js';
import Footer from './Footer.js';
import CarouselComponent from './Carousel.js';
import CardComponent from './Cards.js';

function Home() {
  return (
    <div>
      <NavBar />

      <CarouselComponent />
      <CardComponent />

      <Footer/>
      
 
    </div>
  );
}

export default Home;