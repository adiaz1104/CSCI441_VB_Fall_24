//written by: Cody Hinz and Nathan Diaz
//tested by: Cody Hinz and Nathan Diaz
//debugged by: Cody Hinz and Nathan Diaz

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';
import './styles/Header.css';

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header>
      <div className="header-content">
        <div className="logo-menu-container">
          <div className="logo-container">
            <svg className="logo-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
            <h1>CheckedOff</h1>
          </div>
          {isAuthenticated && (
            <button className="hamburger-menu" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></span>
              <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></span>
              <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></span>
            </button>
          )}
        </div>

        <nav className={isMenuOpen ? 'open' : ''}>
          {isAuthenticated ? (
            <>
              <ul>
                <li><Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link></li>
                <li><Link to="/calendar" onClick={() => setIsMenuOpen(false)}>Calendar</Link></li>
                <li><Link to="/tasks" onClick={() => setIsMenuOpen(false)}>Tasks</Link></li>
                <li><Link to="/shopping" onClick={() => setIsMenuOpen(false)}>Groceries</Link></li>
                <li><Link to="/recipes" onClick={() => setIsMenuOpen(false)}>Recipes</Link></li>
                <li><Link to="/documents" onClick={() => setIsMenuOpen(false)}>Documents</Link></li>
              </ul>
              <div className="auth-info">
                <span className="user-info">{user.name} | {user.family}</span>
                <button onClick={logout} className="logout-btn">Logout</button>
              </div>
            </>
          ) : (
            <ul>
              <li><Link to="/login">Login</Link></li>
            </ul>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;