"use client"

import { Outlet } from "react-router-dom"
import { useState } from "react"
import Navbar from "../../components/public/Navbar/Navbar"
import Footer from "../../components/public/Footer/Footer"
const PublicLayout = () => {
  const [activeSection, setActiveSection] = useState("home")

  return (
    <div className="public-layout">
      <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />
      <main className="public-main">
        <Outlet />
      </main>
      <Footer/>
    </div>
  )
}

export default PublicLayout
