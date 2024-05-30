import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedAuthRoute = ({ children }: { children: any }) => {
  const cookieValue = Cookies.get('authToken'); // Replace 'authToken' with your cookie name

  if (!cookieValue) {
    console.log("ProtectedAuthRoute to login");
    return <Navigate to="/login" replace />;
  }


  if (cookieValue) {
    console.log(cookieValue, "cookieValue");
    return children;
  } else {
    console.log("ProtectedAuthRoute to login");
    return <Navigate to="/login" replace />;
  }
};

export default ProtectedAuthRoute;