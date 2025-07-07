import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Logo from "../assets/fs-logo.png";
import { useEffect } from "react";

const ProtectedRoute = ({ allowedRoles , children }) => {
  const { user, loading ,verifyUser,isAuthentic} = useAuth();

  useEffect(()=>{
    verifyUser();
  },[])
  if (loading)
    return (
      <div className="loading">
        <span></span>
        <img src={Logo} alt="" className="loader-image" />
      </div>
    );
    
  if (!isAuthentic) return <Navigate to="/form" />;
  if (allowedRoles && user.role != allowedRoles)
    return <Navigate to="/form" />;
  
  return children;
};

export default ProtectedRoute;

