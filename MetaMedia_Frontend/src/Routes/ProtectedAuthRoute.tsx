import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedAuthRoute = ({ children }: { children: any }) => {
  const token = localStorage.getItem('accessToken');
console.log(token,"yyy");

  if (!token) {
    console.log("ProtectedAuthRoute to login");
    return <Navigate to="/login" replace />;
  }

  if (token) {
    console.log(token, "localStorage token");
    return children;
  } else {
    console.log("ProtectedAuthRoute to login");
    return <Navigate to="/login" replace />;
  }
};

export default ProtectedAuthRoute;
