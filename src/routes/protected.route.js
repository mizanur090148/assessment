import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.authReducer.data);
  if (!user || !user.token) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default ProtectedRoute;
