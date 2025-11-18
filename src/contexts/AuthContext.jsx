"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { logger } from "../config/environment"

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Verificar si hay una sesión guardada al cargar la aplicación
  useEffect(() => {
    const checkAuthStatus = () => {
      try {
        const savedUser = localStorage.getItem("gilia_user")
        const savedToken = localStorage.getItem("gilia_token")

        if (savedUser && savedToken) {
          const userData = JSON.parse(savedUser)
          setUser(userData)
          setIsAuthenticated(true)
          logger.log("AuthContext - Session restored:", userData.email)
        }
      } catch (error) {
        logger.error("AuthContext - Error restoring session:", error)
        // Limpiar datos corruptos
        localStorage.removeItem("gilia_user")
        localStorage.removeItem("gilia_token")
      } finally {
        setLoading(false)
      }
    }

    checkAuthStatus()
  }, [])

  const login = async (email, password) => {
    try {
      setLoading(true)
      logger.log("AuthContext - Login attempt (no simulator):", email)

      // Sin simulador ni API: aceptar login local mínimo para no romper la app
      const userData = { email, name: email?.split("@")[0] || "User" }
      setUser(userData)
      setIsAuthenticated(true)
      localStorage.setItem("gilia_user", JSON.stringify(userData))

      logger.log("AuthContext - Login successful (local)", userData.email)
      return true
    } catch (error) {
      logger.error("AuthContext - Login error:", error)
      setUser(null)
      setIsAuthenticated(false)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    try {
      logger.log("AuthContext - Logout initiated")

      // Limpiar estado local
      setUser(null)
      setIsAuthenticated(false)

      // Limpiar localStorage
      localStorage.removeItem("gilia_user")
      localStorage.removeItem("gilia_token")

      logger.log("AuthContext - Logout completed")
    } catch (error) {
      logger.error("AuthContext - Logout error:", error)
    }
  }

  const updateUser = (userData) => {
    try {
      setUser(userData)
      localStorage.setItem("gilia_user", JSON.stringify(userData))
      logger.log("AuthContext - User updated")
    } catch (error) {
      logger.error("AuthContext - Error updating user:", error)
    }
  }

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    logout,
    updateUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
