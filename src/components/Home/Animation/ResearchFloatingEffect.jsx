"use client"

import { useRef, useEffect } from "react"
import { useTheme } from "../../../context/ThemeContext"

// Datos de las líneas de investigación con palabras clave y símbolos
const RESEARCH_LINES = [
  {
    name: "Ontologías y Web Semántica",
    keywords: ["RDF", "OWL", "SPARQL", "Ontología", "Semántica", "Metadatos"],
    symbols: ["🕸️", "🔗", "📊", "🏗️"],
    color: "#64B5F6",
  },
  {
    name: "Procesamiento del Lenguaje Natural",
    keywords: ["NLP", "Tokenización", "Análisis", "Corpus", "Sintaxis", "Semántica"],
    symbols: ["💬", "📝", "🗣️", "📖"],
    color: "#81C784",
  },
  {
    name: "Robótica y Sistemas Embebidos",
    keywords: ["Arduino", "Sensores", "IoT", "Actuadores", "Microcontroladores", "Automatización"],
    symbols: ["🤖", "⚙️", "🔧", "📡"],
    color: "#FFB74D",
  },
  {
    name: "Sistemas Inteligentes",
    keywords: ["IA", "Machine Learning", "Algoritmos", "Redes Neuronales", "Deep Learning", "Clasificación"],
    symbols: ["🧠", "⚡", "🎯", "🔮"],
    color: "#F06292",
  },
  {
    name: "Educación en Ciencias de la Computación",
    keywords: ["Pedagogía", "E-learning", "Didáctica", "Metodología", "Evaluación", "Competencias"],
    symbols: ["🎓", "📚", "👨‍🏫", "💡"],
    color: "#BA68C8",
  },
  {
    name: "Lenguajes de Programación",
    keywords: ["Compiladores", "Sintaxis", "Paradigmas", "Interpretadores", "Gramáticas", "Parsing"],
    symbols: ["</> ", "{ }", "( )", "[ ]"],
    color: "#4DB6AC",
  },
  {
    name: "Ética en Ciencias de la Computación",
    keywords: ["Privacidad", "Transparencia", "Responsabilidad", "Sesgo", "Equidad", "Derechos"],
    symbols: ["⚖️", "🛡️", "🤝", "🔒"],
    color: "#A1887F",
  },
]

// eslint-disable-next-line react/prop-types
const ResearchFloatingEffect = ({ children }) => {
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

    // Elementos flotantes
    const floatingElements = []
    const maxElements = 40 // Reducido para mejor rendimiento

    // Crear elementos flotantes
    const createFloatingElements = () => {
      RESEARCH_LINES.forEach((line, lineIndex) => {
        // Agregar palabras clave
        line.keywords.slice(0, 3).forEach((keyword, keywordIndex) => {
          floatingElements.push({
            type: "text",
            content: keyword,
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.3,
            vy: (Math.random() - 0.5) * 0.3,
            size: 12 + Math.random() * 8,
            opacity: 0.3 + Math.random() * 0.4,
            color: line.color,
            lineIndex,
            rotation: Math.random() * Math.PI * 2,
            rotationSpeed: (Math.random() - 0.5) * 0.01,
          })
        })

        // Agregar símbolos
        line.symbols.slice(0, 2).forEach((symbol, symbolIndex) => {
          floatingElements.push({
            type: "symbol",
            content: symbol,
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.2,
            vy: (Math.random() - 0.5) * 0.2,
            size: 16 + Math.random() * 12,
            opacity: 0.4 + Math.random() * 0.3,
            color: line.color,
            lineIndex,
            pulse: Math.random() * Math.PI * 2,
            pulseSpeed: 0.02 + Math.random() * 0.02,
          })
        })
      })

      // Limitar el número total de elementos
      floatingElements.splice(maxElements)
    }

    createFloatingElements()

    // Variables de animación
    let animationId
    let time = 0

    const animate = () => {
      time += 0.016 // ~60fps

      // Limpiar canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Actualizar y dibujar elementos
      floatingElements.forEach((element, index) => {
        // Actualizar posición
        element.x += element.vx
        element.y += element.vy

        // Rebote en bordes con suavidad
        if (element.x < -50 || element.x > canvas.width + 50) {
          element.vx *= -0.8
          element.x = Math.max(-50, Math.min(canvas.width + 50, element.x))
        }
        if (element.y < -50 || element.y > canvas.height + 50) {
          element.vy *= -0.8
          element.y = Math.max(-50, Math.min(canvas.height + 50, element.y))
        }

        // Aplicar fricción muy suave
        element.vx *= 0.999
        element.vy *= 0.999

        // Movimiento orgánico adicional
        element.x += Math.sin(time * 0.5 + index * 0.1) * 0.1
        element.y += Math.cos(time * 0.3 + index * 0.15) * 0.1

        // Configurar estilo
        ctx.save()
        ctx.globalAlpha = element.opacity

        if (element.type === "text") {
          // Dibujar texto
          ctx.font = `${element.size}px 'Inter', sans-serif`
          ctx.fillStyle = theme.token.colorTextSecondary
          ctx.textAlign = "center"
          ctx.textBaseline = "middle"

          // Rotación sutil
          ctx.translate(element.x, element.y)
          ctx.rotate(element.rotation)
          element.rotation += element.rotationSpeed

          // Sombra sutil para legibilidad
          ctx.shadowColor = theme.token.backgroundColor
          ctx.shadowBlur = 3
          ctx.shadowOffsetX = 1
          ctx.shadowOffsetY = 1

          ctx.fillText(element.content, 0, 0)
        } else if (element.type === "symbol") {
          // Dibujar símbolo con efecto de pulso
          const pulseScale = 1 + Math.sin(element.pulse) * 0.1
          element.pulse += element.pulseSpeed

          ctx.font = `${element.size * pulseScale}px 'Inter', sans-serif`
          ctx.fillStyle = theme.token.colorTextSecondary
          ctx.textAlign = "center"
          ctx.textBaseline = "middle"

          // Sombra para símbolos
          ctx.shadowColor = theme.token.backgroundColor
          ctx.shadowBlur = 2
          ctx.shadowOffsetX = 1
          ctx.shadowOffsetY = 1

          ctx.fillText(element.content, element.x, element.y)
        }

        ctx.restore()
      })

      // Ocasionalmente crear conexiones entre elementos cercanos
      if (Math.random() < 0.02) {
        // 2% de probabilidad por frame
        drawConnections(ctx)
      }

      animationId = requestAnimationFrame(animate)
    }

    // Dibujar conexiones ocasionales entre elementos relacionados
    const drawConnections = (ctx) => {
      const connectionDistance = 150

      for (let i = 0; i < floatingElements.length; i++) {
        for (let j = i + 1; j < floatingElements.length; j++) {
          const elem1 = floatingElements[i]
          const elem2 = floatingElements[j]

          // Solo conectar elementos de la misma línea de investigación ocasionalmente
          if (elem1.lineIndex === elem2.lineIndex && Math.random() < 0.1) {
            const distance = Math.hypot(elem1.x - elem2.x, elem1.y - elem2.y)

            if (distance < connectionDistance) {
              ctx.save()
              ctx.strokeStyle = theme.token.colorTextSecondary
              ctx.globalAlpha = 0.1 * (1 - distance / connectionDistance)
              ctx.lineWidth = 1
              ctx.setLineDash([2, 4])

              ctx.beginPath()
              ctx.moveTo(elem1.x, elem1.y)
              ctx.lineTo(elem2.x, elem2.y)
              ctx.stroke()

              ctx.restore()
              break // Solo una conexión por elemento por frame
            }
          }
        }
      }
    }

    animate()

    // Manejar redimensionamiento
    const handleResize = () => {
      resizeCanvas()
      // Reposicionar elementos que estén fuera de los nuevos límites
      floatingElements.forEach((element) => {
        if (element.x > canvas.width) element.x = canvas.width - 50
        if (element.y > canvas.height) element.y = canvas.height - 50
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

export default ResearchFloatingEffect
