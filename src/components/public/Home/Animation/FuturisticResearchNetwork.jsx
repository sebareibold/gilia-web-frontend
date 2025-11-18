"use client"

import { useRef, useEffect } from "react"
import { useTheme } from "../../../context/ThemeContext"

// Datos de las líneas de investigación con representación futurista
const RESEARCH_NODES = [
  {
    id: 1,
    name: "Ontologías",
    shortName: "ONT",
    keywords: ["RDF", "OWL", "SPARQL"],
    color: "#00E5FF",
    position: { x: 0.2, y: 0.3 },
  },
  {
    id: 2,
    name: "NLP",
    shortName: "NLP",
    keywords: ["Tokenización", "Análisis", "Corpus"],
    color: "#76FF03",
    position: { x: 0.8, y: 0.2 },
  },
  {
    id: 3,
    name: "Robótica",
    shortName: "ROB",
    keywords: ["IoT", "Sensores", "Arduino"],
    color: "#FF6D00",
    position: { x: 0.7, y: 0.7 },
  },
  {
    id: 4,
    name: "IA",
    shortName: "AI",
    keywords: ["ML", "Deep Learning", "Redes"],
    color: "#E91E63",
    position: { x: 0.3, y: 0.8 },
  },
  {
    id: 5,
    name: "Educación",
    shortName: "EDU",
    keywords: ["E-learning", "Pedagogía", "Didáctica"],
    color: "#9C27B0",
    position: { x: 0.1, y: 0.6 },
  },
  {
    id: 6,
    name: "Lenguajes",
    shortName: "LANG",
    keywords: ["Compiladores", "Parsing", "Sintaxis"],
    color: "#00BCD4",
    position: { x: 0.6, y: 0.4 },
  },
  {
    id: 7,
    name: "Ética",
    shortName: "ETH",
    keywords: ["Privacidad", "Transparencia", "Equidad"],
    color: "#795548",
    position: { x: 0.4, y: 0.1 },
  },
]

// eslint-disable-next-line react/prop-types
const FuturisticResearchNetwork = ({ children }) => {
  const canvasRef = useRef(null)
  const { theme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()

    // Variables de animación
    let animationId
    let time = 0
    const nodes = []
    const connections = []
    const dataPackets = []
    const backgroundParticles = []

    // Inicializar nodos
    const initializeNodes = () => {
      RESEARCH_NODES.forEach((nodeData) => {
        const node = {
          ...nodeData,
          x: nodeData.position.x * canvas.width,
          y: nodeData.position.y * canvas.height,
          radius: 40,
          pulsePhase: Math.random() * Math.PI * 2,
          glowIntensity: 0.5,
          activity: 0,
          lastActivity: 0,
        }
        nodes.push(node)
      })
    }

    // Crear conexiones entre nodos
    const createConnections = () => {
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const distance = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y)
          if (distance < 400 || Math.random() < 0.3) {
            connections.push({
              from: nodes[i],
              to: nodes[j],
              strength: Math.random() * 0.5 + 0.2,
              active: false,
              lastPulse: 0,
            })
          }
        }
      }
    }

    // Crear partículas de fondo
    const createBackgroundParticles = () => {
      for (let i = 0; i < 30; i++) {
        backgroundParticles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 2 + 1,
          opacity: Math.random() * 0.3 + 0.1,
          color: theme.token.colorTextSecondary,
        })
      }
    }

    // Crear paquete de datos
    const createDataPacket = (connection) => {
      dataPackets.push({
        connection,
        progress: 0,
        speed: 0.01 + Math.random() * 0.02,
        size: 3 + Math.random() * 2,
        color: connection.from.color,
        life: 1.0,
      })
    }

    // Dibujar hexágono futurista
    const drawHexagon = (ctx, x, y, radius, color, glow) => {
      ctx.save()

      // Glow effect
      if (glow > 0) {
        ctx.shadowColor = color
        ctx.shadowBlur = 20 * glow
        ctx.shadowOffsetX = 0
        ctx.shadowOffsetY = 0
      }

      // Hexágono exterior
      ctx.beginPath()
      for (let i = 0; i < 6; i++) {
        const angle = (i * Math.PI) / 3
        const px = x + Math.cos(angle) * radius
        const py = y + Math.sin(angle) * radius
        if (i === 0) ctx.moveTo(px, py)
        else ctx.lineTo(px, py)
      }
      ctx.closePath()

      // Fondo con gradiente
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius)
      gradient.addColorStop(0, `${color}20`)
      gradient.addColorStop(0.7, `${color}10`)
      gradient.addColorStop(1, `${color}05`)
      ctx.fillStyle = gradient
      ctx.fill()

      // Borde brillante
      ctx.strokeStyle = color
      ctx.lineWidth = 2
      ctx.stroke()

      // Hexágono interior
      ctx.beginPath()
      for (let i = 0; i < 6; i++) {
        const angle = (i * Math.PI) / 3
        const px = x + Math.cos(angle) * (radius * 0.6)
        const py = y + Math.sin(angle) * (radius * 0.6)
        if (i === 0) ctx.moveTo(px, py)
        else ctx.lineTo(px, py)
      }
      ctx.closePath()
      ctx.strokeStyle = `${color}80`
      ctx.lineWidth = 1
      ctx.stroke()

      ctx.restore()
    }

    // Dibujar conexión futurista
    const drawConnection = (ctx, from, to, strength, active) => {
      ctx.save()

      const opacity = active ? strength * 0.8 : strength * 0.3
      ctx.globalAlpha = opacity

      // Línea principal
      ctx.strokeStyle = theme.token.colorTextSecondary
      ctx.lineWidth = active ? 2 : 1
      ctx.setLineDash(active ? [] : [5, 5])

      if (active) {
        ctx.shadowColor = from.color
        ctx.shadowBlur = 10
      }

      ctx.beginPath()
      ctx.moveTo(from.x, from.y)
      ctx.lineTo(to.x, to.y)
      ctx.stroke()

      ctx.restore()
    }

    // Dibujar texto futurista
    const drawNodeText = (ctx, node) => {
      ctx.save()

      // Nombre corto en el centro
      ctx.font = "bold 12px 'Courier New', monospace"
      ctx.fillStyle = node.color
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.shadowColor = node.color
      ctx.shadowBlur = 5
      ctx.fillText(node.shortName, node.x, node.y - 5)

      // Keywords debajo
      ctx.font = "8px 'Courier New', monospace"
      ctx.fillStyle = `${theme.token.colorTextSecondary}80`
      ctx.shadowBlur = 2
      node.keywords.forEach((keyword, index) => {
        ctx.fillText(keyword, node.x, node.y + 10 + index * 10)
      })

      ctx.restore()
    }

    initializeNodes()
    createConnections()
    createBackgroundParticles()

    const animate = () => {
      time += 0.016

      // Limpiar canvas
      ctx.fillStyle = theme.token.backgroundColor
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Animar partículas de fondo
      backgroundParticles.forEach((particle) => {
        particle.x += particle.vx
        particle.y += particle.vy

        // Rebote en bordes
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

        // Dibujar partícula
        ctx.save()
        ctx.globalAlpha = particle.opacity
        ctx.fillStyle = particle.color
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      })

      // Actividad aleatoria en nodos
      if (Math.random() < 0.05) {
        const randomNode = nodes[Math.floor(Math.random() * nodes.length)]
        randomNode.activity = 1.0
        randomNode.lastActivity = time

        // Crear paquetes de datos desde este nodo
        connections
          .filter((conn) => conn.from === randomNode || conn.to === randomNode)
          .forEach((conn) => {
            if (Math.random() < 0.7) {
              conn.active = true
              conn.lastPulse = time
              createDataPacket(conn)
            }
          })
      }

      // Dibujar conexiones
      connections.forEach((connection) => {
        const isActive = time - connection.lastPulse < 2.0
        drawConnection(ctx, connection.from, connection.to, connection.strength, isActive)
        connection.active = isActive
      })

      // Animar y dibujar paquetes de datos
      for (let i = dataPackets.length - 1; i >= 0; i--) {
        const packet = dataPackets[i]
        packet.progress += packet.speed
        packet.life -= 0.01

        if (packet.progress >= 1 || packet.life <= 0) {
          // Activar nodo destino
          packet.connection.to.activity = Math.max(packet.connection.to.activity, 0.8)
          packet.connection.to.lastActivity = time
          dataPackets.splice(i, 1)
          continue
        }

        // Interpolar posición
        const from = packet.connection.from
        const to = packet.connection.to
        const x = from.x + (to.x - from.x) * packet.progress
        const y = from.y + (to.y - from.y) * packet.progress

        // Dibujar paquete
        ctx.save()
        ctx.globalAlpha = packet.life
        ctx.fillStyle = packet.color
        ctx.shadowColor = packet.color
        ctx.shadowBlur = 10
        ctx.beginPath()
        ctx.arc(x, y, packet.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }

      // Animar y dibujar nodos
      nodes.forEach((node) => {
        // Decaimiento de actividad
        node.activity *= 0.95

        // Efecto de pulso
        node.pulsePhase += 0.05
        const pulse = Math.sin(node.pulsePhase) * 0.1 + 1
        const currentRadius = node.radius * pulse

        // Intensidad de glow basada en actividad
        node.glowIntensity = 0.3 + node.activity * 0.7

        // Dibujar nodo
        drawHexagon(ctx, node.x, node.y, currentRadius, node.color, node.glowIntensity)

        // Dibujar texto
        drawNodeText(ctx, node)
      })

      // Líneas de escaneo ocasionales
      if (Math.random() < 0.01) {
        ctx.save()
        ctx.strokeStyle = `${theme.token.colorTextBase}30`
        ctx.lineWidth = 1
        ctx.setLineDash([2, 4])
        ctx.beginPath()
        ctx.moveTo(0, Math.random() * canvas.height)
        ctx.lineTo(canvas.width, Math.random() * canvas.height)
        ctx.stroke()
        ctx.restore()
      }

      animationId = requestAnimationFrame(animate)
    }

    animate()

    // Manejar redimensionamiento
    const handleResize = () => {
      const oldWidth = canvas.width
      const oldHeight = canvas.height
      resizeCanvas()

      // Reescalar posiciones de nodos
      nodes.forEach((node) => {
        node.x = (node.x / oldWidth) * canvas.width
        node.y = (node.y / oldHeight) * canvas.height
      })

      // Reposicionar partículas
      backgroundParticles.forEach((particle) => {
        particle.x = (particle.x / oldWidth) * canvas.width
        particle.y = (particle.y / oldHeight) * canvas.height
      })
    }

    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", handleResize)
    }
  }, [theme])

  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        background: "var(--backgroundColor)",
        overflow: "hidden",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
        }}
      />
      {children && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "90%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1,
            pointerEvents: "none",
          }}
        >
          {children}
        </div>
      )}
    </div>
  )
}

export default FuturisticResearchNetwork
