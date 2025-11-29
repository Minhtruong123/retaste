// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../src/context/AuthContext";

export default function ProtectedRoute({ children, requiredRole }) {
  const { isAuthenticated, role, loading } = useAuth();

  if (loading) return <div>Đang tải...</div>;

  if (!isAuthenticated) {
    const currentPath = window.location.pathname + window.location.search;
    return (
      <Navigate
        to={`/auth?redirect=${encodeURIComponent(currentPath)}`}
        replace
      />
    );
  }

  if (requiredRole && role !== requiredRole) {
    return <Navigate to="/403" replace />;
  }

  return children;
}
