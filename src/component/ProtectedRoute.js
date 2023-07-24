import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
const isLogin = localStorage.getItem("isLogin");

  if (!isLogin) {
    return <Navigate to="/login" />;
  }
  return children;
};