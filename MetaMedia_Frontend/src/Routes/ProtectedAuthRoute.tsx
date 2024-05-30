import { Navigate } from "react-router-dom";
import Cookies from 'js-cookie';
import { useEffect, useState } from "react";

const ProtectedAuthRoute = ({ children }: { children: any }) => {
  const [cookieValue, setCookieValue] = useState('');

    // Get the cookie value by its name
    const token = localStorage.getItem('accesstoken')
    console.log(token,"tokk");
    
    setCookieValue(token);
  // const token = .getItem('accesstoken')
    if (cookieValue) {
      console.log(cookieValue,"cookieValue");
      
      return children
    }else{
      console.log("ProtectedAuthRoute to login");
      
      return <Navigate to="/login" replace />
     
    }

  };
  
  export default ProtectedAuthRoute;
