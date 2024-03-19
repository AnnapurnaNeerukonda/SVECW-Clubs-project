import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navigation.css';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  let log = parseInt(localStorage.getItem('log'), 10) || null; 

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('log');
    navigate('/');
  };

  return (
    <nav className='navbar'>
      <div className='navbar-toggle' onClick={toggleMenu}>
        <div className={`toggle-line ${isOpen ? 'open' : ''}`}></div>
        <div className={`toggle-line ${isOpen ? 'open' : ''}`}></div>
        <div className={`toggle-line ${isOpen ? 'open' : ''}`}></div>
      </div>
      <ul className={`navbar-links ${isOpen ? 'open' : ''}`}>
        {console.log(log)}
        {log === 3 && (
          <>
            <li>
              <Link to="/create-post">Create Post</Link>
            </li>
            <li>
              <Link to="/displaypost">Post</Link>
            </li>
            <li style={{ color: "white" }} onClick={handleLogout}>
              Logout
            </li>
            <li>
              <Link to="/clubs">Clubs</Link>
            </li>
          </>
        )}
        {log === 2 && (
          <>
            <li>
              <Link to="/displaypost">Post</Link>
            </li>
            <li>
              <Link to="/clubs">Clubs</Link>
            </li>
            <li style={{ color: "white" }} onClick={handleLogout}>
              Logout
            </li>
          </>
        )}
        {log !== 2 && log !== 3 &&(
          <>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}


