import React, { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './auth';

const RequireAuth: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  //console.log("isAuthenticated: ", isAuthenticated);
  const [loading, setLoading] = useState(true); // Add loading state
  const location = useLocation();

  useEffect(() => {
    // Check if isAuthenticated is true or false, and set loading accordingly
    if (isAuthenticated !== null) {
      setLoading(false);
    }
  }, [isAuthenticated]);

  // If loading, display loading indicator or placeholder content
  if (loading) {
    return <div>Loading...</div>; // Replace with loading indicator or placeholder
  }

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  }

  return children;
};

export default RequireAuth;