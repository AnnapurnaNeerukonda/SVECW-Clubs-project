import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className='navbar'>
      <div className='navbar-toggle' onClick={toggleMenu}>
        <div className={`toggle-line ${isOpen ? 'open' : ''}`}></div>
        <div className={`toggle-line ${isOpen ? 'open' : ''}`}></div>
        <div className={`toggle-line ${isOpen ? 'open' : ''}`}></div>
      </div>
      <ul className={`navbar-links ${isOpen ? 'open' : ''}`}>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/clubs">Clubs</Link>
        </li>
        <li>
        <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/displaypost">Post</Link>
        </li>
      </ul>
    </nav>
  );
}

