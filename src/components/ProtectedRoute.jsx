import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { isAuthor } = useContext(AuthContext);

  return isAuthor ? children : <Navigate to="/login" replace />;
}
