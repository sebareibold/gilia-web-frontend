"use client"

import { useAuth } from "../contexts/AuthContext"
import { Navigate, useLocation } from "react-router-dom"

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <div>Cargando...</div>
      </div>
    )
  }

  if (!isAuthenticated) {
    // Redirigir al login pero recordar la ubicación intentada
    return <Navigate to="/admin/login" state={{ from: location }} replace />
  }

  return children
}

export default ProtectedRoute
