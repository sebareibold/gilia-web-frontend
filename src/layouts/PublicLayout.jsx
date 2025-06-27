"use client"

import { useTheme } from "../contexts/ThemeContext"
import Navbar from "../components/Navbar/Navbar"
import { useState } from "react"

const PublicLayout = ({ children }) => {
  const { theme } = useTheme()
  const [activeSection, setActiveSection] = useState("home")

  return (
    <div className="public-layout" data-theme={theme.token.backgroundColor === "#0a0a0a" ? "dark" : "light"}>
      <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />
      <main className="public-content">{children}</main>
    </div>
  )
}

export default PublicLayout
