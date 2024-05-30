import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedAuthRoute = ({ children }: { children: any }) => {
  const [cookieValue, setCookieValue] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('accesstoken');
    console.log(token, "tokk");
    setCookieValue(token);
  }, []);

  if (cookieValue) {
    console.log(cookieValue, "cookieValue");
    return children;
  } else {
    console.log("ProtectedAuthRoute to login");
    return <Navigate to="/login" replace />;
  }
};

export default ProtectedAuthRoute;