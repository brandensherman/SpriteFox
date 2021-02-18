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
      <h2>SpriteLab</h2>

      {!userInfo ? (
        <div className='nav-links'>
          <Link to='/login' className='btn login-btn'>
            Login
          </Link>
          <Link to='/register' className='btn register-btn'>
            Register
          </Link>
        </div>
      ) : (
        <div>
          <Link to='/' className='btn register-btn' onClick={handleLogout}>
            Logout
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
