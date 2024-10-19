import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import './Header.css';

// Header component containing site navigation
const Header = () => (
  <header>
    <div className="header-content">
      <h1>CheckedOff</h1>
      <nav>
        <ul>
          {/* Navigation links using React Router's Link component */}
          <li><Link to="/">Home</Link></li>
          <li><Link to="/calendar">Calendar</Link></li>
          <li><Link to="/tasks">Tasks</Link></li>
          <li><Link to="/shopping">Shopping List</Link></li>
          <li><Link to="/recipes">Recipes</Link></li>
          <li><Link to="/documents">Documents</Link></li>
        </ul>
      </nav>
      {/* Settings icon link */}
      <Link to="/settings" className="settings-icon"><i className="fas fa-cog"></i></Link>
    </div>
  </header>
);

export default Header;
