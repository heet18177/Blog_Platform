import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ allowedRoles = [], children }) => {
  const { userdata } = useSelector((state) => state.user);

  // 1. Check if user is logged in
  if (!userdata) {
    return <Navigate to="/login" replace />;
  }

  // 2. Check for Role Access (if roles are defined)
  if (allowedRoles.length > 0 && !allowedRoles.includes(userdata.role)) {
    // User is logged in but doesn't have permission
    return <Navigate to="/" replace />;
  }

  // 3. Render children (or Outlet if used as layout)
  return children ? children : <Outlet />;
};

export default ProtectedRoute;
