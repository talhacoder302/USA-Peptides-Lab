// src/components/ProtectedRoute.jsx
import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { getMe } from "../service/service.jsx";

const ProtectedRoute = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getMe();
        setUser(response.data.user);
      } catch (error) {
        console.error("Failed to fetch user:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  if (loading) return <div>Loading...</div>;

  const isAdminRoute = location.pathname.startsWith("/admin");
  const isUserRoute = !isAdminRoute; // all non-admin routes are user

  // 🚫 Prevent cross-role navigation
  if (user?.role === "Admin" && isUserRoute) {
    return <Navigate to="/admin/dashboard" replace />;
  }
  if (user?.role === "User" && isAdminRoute) {
    return <Navigate to="/" replace />;
  }


  // ✅ Authorized access
  return children;
};

export default ProtectedRoute;
