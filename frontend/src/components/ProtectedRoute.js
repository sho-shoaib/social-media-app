import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { userData } = useSelector((state) => state.user);

  if (Object.keys(userData).length === 0) {
    return <Navigate to='/' />;
  }
  return children;
};

export default ProtectedRoute;
