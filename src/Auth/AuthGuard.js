import React from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from "prop-types";

const AuthGuard = ({ children }) => {
  const isAuthenticated = true //localStorage.getItem('authToken'); // Replace with your auth logic

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

AuthGuard.propTypes = {
    children: PropTypes.element
}

export default AuthGuard;
