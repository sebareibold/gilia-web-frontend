"use client"

import { useState, useEffect } from "react"
import { useTheme } from "../../context/ThemeContext"
import { TeamOutlined, UserOutlined, MailOutlined, PhoneOutlined } from "@ant-design/icons"
import Loader from "../Loader/Loader"
import { fetchAboutUsData } from "./AboutAPI"
import PeopleCard from "./PeopleCard"
import { API_BASE_URL } from "../../config/apiConfig"
import "../shared/FuturisticStyles.css"

const AboutUs = () => {
  const { theme } = useTheme()
  const [data, setData] = useState(null)
  const isDarkTheme = theme.token.backgroundColor === "#0a0a0a"

  useEffect(() => {
    const getData = async () => {
      const fetchedData = await fetchAboutUsData(API_BASE_URL)
      console.log(fetchedData)
      setData(fetchedData)
    }

    getData()
  }, [])

  if (!data) {
    return (
      <div className="futuristic-container" data-theme={isDarkTheme ? "dark" : "light"}>
        <div className="futuristic-loading">
          <Loader />
        </div>
      </div>
    )
  }

  const ordenarPorRol = (people) => {
    if (!Array.isArray(people)) return []
    const roleOrder = ["Director", "Investigador", "Colaborador", "Becario"]
    return people.sort((a, b) => roleOrder.indexOf(a.role_person) - roleOrder.indexOf(b.role_person))
  }

  const sortedPeople = data.people ? ordenarPorRol(data.people) : []

  return (
    <div className="futuristic-container" data-theme={isDarkTheme ? "dark" : "light"}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Header Section */}
        <div className="futuristic-card" style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div className="futuristic-badge" style={{ marginBottom: "1rem" }}>
            <TeamOutlined style={{ marginRight: "0.5rem" }} />
            Nuestro Equipo
          </div>

          <h1 className="futuristic-title">¿Quiénes Somos?</h1>

          <p className="futuristic-subtitle">
            {data.description ||
              "Somos un grupo de investigación dedicado a explorar las fronteras del conocimiento en inteligencia artificial, procesamiento de lenguaje natural y tecnologías emergentes."}
          </p>
        </div>

        {/* Team Image */}
        {data.image && (
          <div className="futuristic-card" style={{ marginBottom: "2rem", textAlign: "center" }}>
            <img
              src={`${API_BASE_URL}${data.image?.url}`}
              alt="Imagen del equipo"
              style={{
                width: "100%",
                maxHeight: "400px",
                objectFit: "cover",
                borderRadius: "4px",
                border: "1px solid rgba(255, 255, 255, 0.1)",
              }}
            />
          </div>
        )}

        {/* Team Members */}
        <div className="futuristic-card" style={{ marginBottom: "2rem" }}>
          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: "600",
              color: "var(--colorTextBase)",
              marginBottom: "1.5rem",
              textAlign: "center",
            }}
          >
            <UserOutlined style={{ marginRight: "0.5rem" }} />
            Equipo de Investigación
          </h2>

          <div className="futuristic-grid futuristic-grid-4">
            {sortedPeople.map((person) => (
              <PeopleCard key={person.id} person={person} theme={theme} />
            ))}
          </div>
        </div>

        {/* Information Section */}
        <div className="futuristic-card">
          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: "600",
              color: "var(--colorTextBase)",
              marginBottom: "1.5rem",
              textAlign: "center",
            }}
          >
            Información Adicional
          </h2>

          <div
            style={{
              fontSize: "1rem",
              color: "var(--colorTextSecondary)",
              lineHeight: "1.6",
              textAlign: "justify",
            }}
          >
            {data.information ||
              "Nuestro grupo se dedica a la investigación de vanguardia en múltiples áreas de las ciencias de la computación, con especial énfasis en inteligencia artificial, procesamiento de lenguaje natural, sistemas inteligentes y ética en la computación."}
          </div>

          <hr className="futuristic-divider" />

          <div className="futuristic-grid futuristic-grid-2" style={{ marginTop: "1.5rem" }}>
            <div className="futuristic-list-item">
              <h3 style={{ color: "var(--colorTextBase)", marginBottom: "0.5rem" }}>
                <MailOutlined style={{ marginRight: "0.5rem" }} />
                Contacto
              </h3>
              <p style={{ color: "var(--colorTextSecondary)", margin: 0 }}>gilia@universidad.edu.ar</p>
            </div>

            <div className="futuristic-list-item">
              <h3 style={{ color: "var(--colorTextBase)", marginBottom: "0.5rem" }}>
                <PhoneOutlined style={{ marginRight: "0.5rem" }} />
                Ubicación
              </h3>
              <p style={{ color: "var(--colorTextSecondary)", margin: 0 }}>Facultad de Ciencias Exactas y Naturales</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutUs
