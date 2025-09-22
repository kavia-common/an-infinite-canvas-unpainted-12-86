import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

// PUBLIC_INTERFACE
export function ProtectedRoute({ children, roles = [] }) {
  /** Protects routes based on authentication and role membership */
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  if (roles.length > 0 && !roles.includes(user?.role)) {
    return <div className="card" role="alert" style={{margin:16}}>
      <h3>Access denied</h3>
      <p>Your role "{user?.role}" does not have permission to view this page.</p>
    </div>;
  }
  return children;
}
