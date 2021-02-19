import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';

const ArtboardList = () => {
  const [artboards, setArtboards] = useState([]);
  const [name, setName] = useState('');

  const userInfo = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null;

  async function fetchArtboards() {
    if (userInfo) {
      const { data } = await axios.get(`api/user/artboards/${userInfo._id}`);
      setArtboards(data.artboards);
    }
  }

  useEffect(() => {
    fetchArtboards();
  }, [artboards, name, userInfo]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data } = await axios.post(`/api/user/artboards`, {
      name,
      user: userInfo._id,
    });

    if (data.success) {
      setName('');
    }
  };

  return (
    <div className='artboard-container'>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            className='artboard-input'
            type='name'
            placeholder='Name of artboard'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button className='btn add-btn' type='submit'>
            Create
          </button>
        </form>
      </div>

      <div className='artboard-list'>
        <h2>Artboards</h2>
        {artboards.map((artboard) => (
          <div key={artboard._id}>
            <button className='artboard-btn'>{`${artboard.name}`}</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArtboardList;
