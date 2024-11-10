import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AccountNav from './AccountNav';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header>
      <div className="header-content">
        <div className="logo-menu-container">
          <h1>CheckedOff</h1>
          <button className="hamburger-menu" onClick={toggleMenu} aria-label="Toggle menu">
            <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></span>
            <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></span>
            <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></span>
          </button>
        </div>

        <nav className={isMenuOpen ? 'open' : ''}>
          <ul>
            <li><Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link></li>
            <li><Link to="/calendar" onClick={() => setIsMenuOpen(false)}>Calendar</Link></li>
            <li><Link to="/tasks" onClick={() => setIsMenuOpen(false)}>Tasks</Link></li>
            <li><Link to="/shopping" onClick={() => setIsMenuOpen(false)}>Shopping List</Link></li>
            <li><Link to="/recipes" onClick={() => setIsMenuOpen(false)}>Recipes</Link></li>
            <li><Link to="/documents" onClick={() => setIsMenuOpen(false)}>Documents</Link></li>
          </ul>
        </nav>

        <AccountNav />
      </div>
    </header>
  );
};

export default Header;