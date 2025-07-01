"use client"

import { Outlet } from "react-router-dom"
import { useState } from "react"
import Navbar from "../components/public/Navbar/Navbar"

const PublicLayout = () => {
  const [activeSection, setActiveSection] = useState("home")

  return (
    <div className="public-layout">
      <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />
      <main className="public-main">
        <Outlet />
      </main>
    </div>
  )
}

export default PublicLayout
