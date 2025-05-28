// src/components/RequireAuth.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext"; // Ajusta si lo mueves a otra carpeta

const RequireAuth = ({ children, requiredRole }) => {
  const { user, rol, loading } = useAuth();

  if (loading) return <p>Cargando...</p>;

  if (!user) return <Navigate to="/login" />;
  if (requiredRole && rol !== requiredRole) return <Navigate to="/" />;

  return children;
};

export default RequireAuth;
