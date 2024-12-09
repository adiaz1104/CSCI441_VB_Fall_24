//written by: Cody Hinz and Nathan Diaz
//tested by: Cody Hinz and Nathan Diaz
//debugged by: Cody Hinz and Nathan Diaz

import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="unauthorized-message">
        <h2>Please log in to access this page</h2>
        <Link to="/login" className="login-link">Go to Login</Link>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;