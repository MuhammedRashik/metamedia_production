import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";

const ProtectedAuthRoute = ({ children }: { children: any }) => {
  const token = localStorage.getItem('accesstoken');
  const userData=useSelector((state:any)=>state.persisted.user.userData)
console.log(userData,"userData");

  if (!token && !userData.userId) {
    console.log("ProtectedAuthRoute to login");
    return <Navigate to="/login" replace />;
  }
  if (token) {
    console.log("I AM WITH TOKEN");
    console.log(token, "localStorage token");
    return children;
  } else {
    console.log("ProtectedAuthRoute to login");
    return <Navigate to="/login" replace />;
  }
};

export default ProtectedAuthRoute;
