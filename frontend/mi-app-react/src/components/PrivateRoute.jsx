import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const token = localStorage.getItem('token'); // Verifica si el usuario está autenticado
  return token ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
