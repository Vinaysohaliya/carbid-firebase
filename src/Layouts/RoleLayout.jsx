import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const RoleLayout = ({ allowedRoles }) => {
  const { isLoggedIn, role } = useSelector((state) => state.auth);

  if (isLoggedIn) {
    return allowedRoles.includes(role) ? (
      <Outlet />
    ) : (
      <Navigate to="/denied" />
    );
  } else {
    return <Navigate to="/login" />;
  }
};

export default RoleLayout;
