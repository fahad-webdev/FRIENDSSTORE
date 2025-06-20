import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Logo from "../../assets/fs-logo.png";

const ProtectedRoute = ({ allowedRoles = [], children }) => {
  const { user, loading } = useAuth();

  if (loading)
    return (
      <div className="loading">
        <span></span>
        <img src={Logo} alt="" className="loader-image" />
      </div>
    );
  if (!user) return <Navigate to="/form" />;
  if (allowedRoles.length && !allowedRoles.includes(user.role))
    return <Navigate to="/admin" />;

  return children;
};

export default ProtectedRoute;
