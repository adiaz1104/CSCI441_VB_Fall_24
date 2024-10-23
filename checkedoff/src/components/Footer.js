import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => (
  <footer className="footer">
    <div className="footer-content">
      <Link to="/login" className="footer-link">Login</Link>
      <span className="footer-separator">/</span>
      <Link to="/signup" className="footer-link">Signup</Link>
    </div>
  </footer>
);

export default Footer;