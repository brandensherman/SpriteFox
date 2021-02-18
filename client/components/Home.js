import React, { useEffect } from 'react';
import Canvas from './Canvas';
import Navbar from './Navbar';
import axios from 'axios';

const Home = () => {
  return (
    <div>
      <Navbar />
      <Canvas />
    </div>
  );
};

export default Home;
