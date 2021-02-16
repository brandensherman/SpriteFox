import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [artboards, setArtboards] = useState([]);

  async function fetchArtboards() {
    const { data } = await axios.get('/api/user/artboards');
    setArtboards(data.artboards);
  }

  useEffect(() => {
    fetchArtboards();
  }, []);

  return (
    <div>
      <div className='home-container'>
        <h2>Artboards</h2>
        {artboards.map((artboard) => (
          <div key={artboard._id}>
            <Link to={`/artboard/${artboard._id}`}>
              View Artboard {`${artboard.name}`}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
