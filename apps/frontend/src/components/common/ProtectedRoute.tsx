import React from 'react';
import { Navigate } from 'react-router-dom';
import { tokenManager } from '../../utils/tokenManager';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const accessToken = tokenManager.getAccessToken();
  
  if (!accessToken || tokenManager.isTokenExpired(accessToken)) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};