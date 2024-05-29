import { Navigate } from "react-router-dom";

const ProtectedAuthRoute = ({ children }: { children: any }) => {
  const token = cook.getItem('accesstoken')
    if (token) {
      return children
    }else{
      return <Navigate to="/login" replace />
     
    }

  };
  
  export default ProtectedAuthRoute;
