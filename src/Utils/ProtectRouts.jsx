import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
function ProtectRouts() {
  const { user } = useSelector((state) => state.app);
  return user ? <Outlet /> : <Navigate to="/Sign" replace />;
}

export default ProtectRouts