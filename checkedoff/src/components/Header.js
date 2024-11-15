import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AccountNav from './AccountNav';
import './styles/Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header>
      <div className="header-content">
        <div className="logo-menu-container">
          <div className="logo-container">
            <svg 
              className="logo-icon" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
            <h1>CheckedOff</h1>
          </div>
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
            <li><Link to="/shopping" onClick={() => setIsMenuOpen(false)}>Groceries</Link></li>
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