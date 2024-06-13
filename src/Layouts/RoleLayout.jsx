import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const RoleLayout = ({ allowedRoles }) => {
  const { isLoggedIn, role } = useSelector((state) => state.auth);

  // If user is logged in
  if (isLoggedIn) {
    // Check if user's role is allowed
    if (allowedRoles.includes(role)) {
      return <Outlet />; // Render nested routes
    } else {
      return <Navigate to="/denied" />; // Redirect to access denied page
    }
  } else {
    return <Navigate to="/signin" />; // Redirect to login page if user is not logged in
  }
};

export default RoleLayout;
