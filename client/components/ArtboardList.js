import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';

const ArtboardList = ({ saveCanvas, renderGrid, currentGrid }) => {
  const [artboards, setArtboards] = useState([]);
  const [name, setName] = useState('');

  const userInfo = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null;

  useEffect(() => {
    fetchArtboards();
  }, []);

  async function fetchArtboards() {
    if (userInfo) {
      const { data } = await axios.get(`api/user/artboards/${userInfo._id}`);
      setArtboards(data.artboards);
    }
  }

  async function selectArtboard(name) {
    currentGrid(name);
    const { data } = await axios.get(`api/user/artboard/${name}`);

    console.log(data);
    if (data.artboard) {
      renderGrid(data.artboard);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const { data } = await axios.post(`/api/user/artboards`, {
      name,
      user: userInfo._id,
      grid: {},
    });

    if (data.success) {
      saveCanvas(name);
      fetchArtboards();
      setName('');
    }
  }

  return (
    <div className='artboard-container'>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            className='artboard-input'
            type='name'
            placeholder='Enter name of artboard'
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
            <button
              className='artboard-btn'
              name={artboard.name}
              onClick={(e) => selectArtboard(e.target.name)}
            >{`${artboard.name}`}</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArtboardList;
