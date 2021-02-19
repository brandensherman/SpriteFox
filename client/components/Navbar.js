import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Navbar = () => {
  const userInfo = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null;

  const handleLogout = async () => {
    localStorage.removeItem('userInfo');
    await axios.get('/api/auth/logoout');
  };

  return (
    <div className='nav-container'>
      <Link className='nav-logo' to='/'>
        SpriteLab
      </Link>

      {!userInfo ? (
        <div className='nav-links'>
          <Link to='/login' className='btn nav-btn login-btn'>
            Login
          </Link>
          <Link to='/register' className='btn nav-btn'>
            Register
          </Link>
        </div>
      ) : (
        <div>
          <Link to='/' className='btn nav-btn' onClick={handleLogout}>
            Logout
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
