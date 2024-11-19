import React from 'react';
import { Link } from 'react-router-dom';
import './styles/AccountNav.css';

const AccountNav = () => {
  return (
    <div className="account-nav">
      <Link to="/login" className="auth-links">
        <svg 
          className="auth-icon" 
          viewBox="0 0 24 24"
        >
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
        Login
      </Link>
      <Link to="/signup" className="auth-links">
        <svg 
          className="auth-icon" 
          viewBox="0 0 24 24"
        >
          <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="8.5" cy="7" r="4" />
          <line x1="20" y1="8" x2="20" y2="14" />
          <line x1="23" y1="11" x2="17" y2="11" />
        </svg>
        Signup
      </Link>
    </div>
  );
};

export default AccountNav;