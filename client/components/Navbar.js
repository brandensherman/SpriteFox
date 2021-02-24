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
          <Link to='/login' className='btn btn-nav btn-login'>
            Login
          </Link>
          <Link to='/register' className='btn btn-nav'>
            Register
          </Link>
        </div>
      ) : (
        <div>
          <Link to='/' className='btn btn-nav' onClick={handleLogout}>
            Logout
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
