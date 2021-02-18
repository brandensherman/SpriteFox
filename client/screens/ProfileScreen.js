import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import CreateArtboard from '../components/CreateArtboard';

const ProfileScreen = ({ location, history }) => {
  const [artboards, setArtboards] = useState([]);

  const userInfo = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null;

  async function fetchArtboards() {
    const { data } = await axios.get(`api/user/artboards/${userInfo._id}`);
    setArtboards(data.artboards);
  }

  useEffect(() => {
    console.log(artboards);
    fetchArtboards();
  }, []);

  return (
    <div>
      <Navbar />
      <CreateArtboard location={location} history={history} />
      <div>
        <div className='home-container'>
          <h2>Artboards</h2>
          {artboards.map((artboard) => (
            <div key={artboard._id}>
              <Link to={`/canvas/${artboard.name}`}>
                View Artboard {`${artboard.name}`}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;
