"use client"

import { useRef, useEffect } from "react"
import { useTheme } from "../../../context/ThemeContext"

// ===== CONFIGURACIÓN MEJORADA =====
const ANIMATION_CONFIG = {
  speed: {
    base: 0.03,
    variation: 0.12,
    timeMultiplier: 0.016,
  },
  glow: {
    enabled: true,
    intensity: 0.15,
    frequency: 0.02,
    duration: 20,
    blurRadius: 15,
    colorIntensity: 0.8,
  },
  opacity: {
    darkTheme: {
      base: 0.3,
      grayRange: [120, 255],
    },
    lightTheme: {
      base: 0.25,
      grayRange: [80, 160],
    },
  },
  visual: {
    fontSize: 18,
    columnSpacing: 2.2,
    fadeBackground: 15,
    resetProbability: 0.9992,
    specialSymbolChance: 0.15,
  },
  waves: {
    enabled: true,
    amplitude: 1,
    frequency: 0.02,
    speed: 0.01,
  },
}

// Símbolos expandidos y categorizados por líneas de investigación
const RESEARCH_SYMBOLS = {
  
  nlp: [
    "λ",
    "Σ",
    "∈",
    "∩",
    "∪",
    "→",
    "↔",
    "∧",
    "∨",
    "¬",
  ],
  robotics: [

    "⟲",
    "⟳",
    "⚡",
    "🔧",
    "⚙️",
    "📡",
  ],
  ai: [
    "AI",
    "ML",
    "DL",
  ],
  languages: [
    "{",
    "}",
    "[",
    "]",
    "(",
    ")",
    "<",
    ">",
    "::=",
    "→",
    "⇒",
    "⊢",
    "⊨",
  ],
  ethics: [
    "⚖️",
    "🛡️",
    "🔒",
    "🔍",
    "🌍",
    "⭐",
  ],
  complexity: [
    "NEXP",    "co-NP",    "L",
    "NP",
    "P",
    "NL",
  ],
  

}

// Crear símbolos ponderados con mayor variedad
const createWeightedSymbols = () => {
  const weighted = []

  Object.entries(RESEARCH_SYMBOLS).forEach(([category, symbols]) => {
    symbols.forEach((symbol) => {
      // Términos técnicos largos aparecen menos frecuentemente
      const weight = symbol.length > 8 ? 1 : symbol.length > 4 ? 2 : 3
      // Símbolos especiales tienen peso extra
      const isSpecial = /[⟨⟩∀∃⊆⊇≡⊤⊥∩∪→↔∧∨¬λΣ∈γδεθμσ∇∂∑∏∞αβ⚖️🛡️🔒🤝✓⚠️🔍👁️🌍⭐⚡🔧⚙️📡⟲⟳]/.test(symbol)
      const finalWeight = isSpecial ? weight + 1 : weight

      for (let i = 0; i < finalWeight; i++) {
        weighted.push({ symbol, category, isSpecial })
      }
    })
  })

  return weighted
}

const WEIGHTED_SYMBOLS = createWeightedSymbols()

// eslint-disable-next-line react/prop-types
const CodeMatrixEffect = ({ children }) => {
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

    const fontSize = ANIMATION_CONFIG.visual.fontSize
    const columnSpacing = fontSize * ANIMATION_CONFIG.visual.columnSpacing
    const columns = Math.floor(canvas.width / columnSpacing)

    // Arrays mejorados para cada columna
    const drops = new Array(columns).fill(0).map(() => Math.random() * -100)
    const speeds = new Array(columns)
      .fill(0)
      .map(() => Math.random() * ANIMATION_CONFIG.speed.variation + ANIMATION_CONFIG.speed.base)
    const symbols = new Array(columns).fill(0).map(() => Math.floor(Math.random() * WEIGHTED_SYMBOLS.length))
    const categories = new Array(columns)
      .fill(0)
      .map(() => Object.keys(RESEARCH_SYMBOLS)[Math.floor(Math.random() * Object.keys(RESEARCH_SYMBOLS).length)])
    const trails = new Array(columns).fill(0).map(() => [])
    const waveOffsets = new Array(columns).fill(0).map(() => Math.random() * Math.PI * 2)

    // Arrays para efectos especiales
    const glowEffects = new Array(columns).fill(0).map(() => ({
      active: false,
      intensity: 0,
      duration: 0,
      color: [255, 255, 255],
    }))

    const pulseEffects = new Array(columns).fill(0).map(() => ({
      active: false,
      phase: 0,
      amplitude: 0,
    }))

    let animationId
    let time = 0

    const animate = () => {
      time += ANIMATION_CONFIG.speed.timeMultiplier

      // Fondo con desvanecimiento mejorado
      const fadeAlpha = ANIMATION_CONFIG.visual.fadeBackground.toString(16).padStart(2, "0")
      ctx.fillStyle = `${theme.token.backgroundColor}${fadeAlpha}`
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.font = `${fontSize}px 'Fira Code', 'Courier New', monospace`

      const isDarkTheme = theme.token.backgroundColor === "#0a0a0a"
      const opacityConfig = isDarkTheme ? ANIMATION_CONFIG.opacity.darkTheme : ANIMATION_CONFIG.opacity.lightTheme

      for (let i = 0; i < drops.length; i++) {
        const symbolData = WEIGHTED_SYMBOLS[symbols[i]]
        const symbol = symbolData.symbol
        const isSpecial = symbolData.isSpecial

        // Posición con efecto de onda
        const baseX = i * columnSpacing + columnSpacing / 2
        let waveX = baseX

        if (ANIMATION_CONFIG.waves.enabled) {
          waveOffsets[i] += ANIMATION_CONFIG.waves.speed
          waveX += Math.sin(waveOffsets[i] + time * ANIMATION_CONFIG.waves.frequency) * ANIMATION_CONFIG.waves.amplitude
        }

        const y = drops[i] * (fontSize * 1.9)

        // Generar efectos especiales
        if (ANIMATION_CONFIG.glow.enabled && Math.random() < ANIMATION_CONFIG.glow.frequency) {
          glowEffects[i] = {
            active: true,
            intensity: ANIMATION_CONFIG.glow.intensity,
            duration: ANIMATION_CONFIG.glow.duration,
            color: isSpecial
              ? [0, 229, 255]
              : [
                  opacityConfig.grayRange[0] +
                    Math.random() * (opacityConfig.grayRange[1] - opacityConfig.grayRange[0]),
                  opacityConfig.grayRange[0] +
                    Math.random() * (opacityConfig.grayRange[1] - opacityConfig.grayRange[0]),
                  opacityConfig.grayRange[0] +
                    Math.random() * (opacityConfig.grayRange[1] - opacityConfig.grayRange[0]),
                ],
          }
        }

        // Efecto de pulso para símbolos especiales
        if (isSpecial && Math.random() < 0.01) {
          pulseEffects[i] = {
            active: true,
            phase: 0,
            amplitude: 0.3,
          }
        }

        // Aplicar efectos visuales
        let finalOpacity = opacityConfig.base
        let finalSize = fontSize
        let glowRadius = 0
        let shadowColor = "transparent"

        // Efecto de brillo
        if (glowEffects[i].active) {
          const glow = glowEffects[i]
          const glowIntensity = (glow.duration / ANIMATION_CONFIG.glow.duration) * glow.intensity

          glowRadius = ANIMATION_CONFIG.glow.blurRadius * glowIntensity
          shadowColor = `rgba(${glow.color[0]}, ${glow.color[1]}, ${glow.color[2]}, ${ANIMATION_CONFIG.glow.colorIntensity * glowIntensity})`
          finalOpacity += glowIntensity * 0.5

          glow.duration--
          if (glow.duration <= 0) {
            glow.active = false
          }
        }

        // Efecto de pulso
        if (pulseEffects[i].active) {
          const pulse = pulseEffects[i]
          pulse.phase += 0.2
          const pulseFactor = 1 + Math.sin(pulse.phase) * pulse.amplitude
          finalSize *= pulseFactor
          finalOpacity *= pulseFactor

          if (pulse.phase >= Math.PI * 2) {
            pulse.active = false
          }
        }

        // Configurar estilo
        ctx.shadowBlur = glowRadius
        ctx.shadowColor = shadowColor
        ctx.font = `${finalSize}px 'Fira Code', 'Courier New', monospace`

        // Color basado en categoría y efectos
        let color
        if (isSpecial) {
          color = `rgba(0, 229, 255, ${finalOpacity})`
        } else {
          const grayValue =
            opacityConfig.grayRange[0] + Math.random() * (opacityConfig.grayRange[1] - opacityConfig.grayRange[0])
          color = `rgba(${grayValue}, ${grayValue}, ${grayValue}, ${finalOpacity})`
        }

        ctx.fillStyle = color

        // Dibujar símbolo si está en pantalla
        if (y > -fontSize && y < canvas.height + fontSize) {
          ctx.fillText(symbol, waveX, y)

          // Agregar al trail
          trails[i].push({ x: waveX, y: y, opacity: finalOpacity * 0.3, symbol: symbol })
          if (trails[i].length > 8) {
            trails[i].shift()
          }
        }

        // Dibujar trail
        trails[i].forEach((trailPoint, index) => {
          const trailOpacity = trailPoint.opacity * (index / trails[i].length) * 0.5
          ctx.fillStyle = `rgba(100, 100, 100, ${trailOpacity})`
          ctx.font = `${fontSize * (0.7 + index * 0.05)}px 'Fira Code', 'Courier New', monospace`
          ctx.fillText(trailPoint.symbol, trailPoint.x, trailPoint.y)
        })

        // Resetear configuración
        ctx.shadowBlur = 0
        ctx.shadowColor = "transparent"
        ctx.font = `${fontSize}px 'Fira Code', 'Courier New', monospace`

        // Mover gota
        drops[i] += speeds[i]

        // Resetear cuando llega al final
        if (
          drops[i] * (fontSize * 1.9) > canvas.height + 150 ||
          Math.random() > ANIMATION_CONFIG.visual.resetProbability
        ) {
          drops[i] = Math.random() * -50 - 20
          trails[i] = []

          // Cambiar símbolo ocasionalmente
          if (Math.random() > 0.7) {
            symbols[i] = Math.floor(Math.random() * WEIGHTED_SYMBOLS.length)
            categories[i] =
              Object.keys(RESEARCH_SYMBOLS)[Math.floor(Math.random() * Object.keys(RESEARCH_SYMBOLS).length)]
          }

          // Reset efectos
          glowEffects[i].active = false
          pulseEffects[i].active = false
        }
      }

      animationId = requestAnimationFrame(animate)
    }

    animate()

    // Manejo de redimensionamiento mejorado
    const handleResize = () => {
      resizeCanvas()
      const newColumns = Math.floor(canvas.width / columnSpacing)

      // Redimensionar arrays manteniendo datos existentes
      const resizeArray = (arr, defaultValue) => {
        arr.length = newColumns
        for (let i = 0; i < newColumns; i++) {
          if (arr[i] === undefined) {
            arr[i] = typeof defaultValue === "function" ? defaultValue() : defaultValue
          }
        }
      }

      resizeArray(drops, () => Math.random() * -50 - 20)
      resizeArray(speeds, () => Math.random() * ANIMATION_CONFIG.speed.variation + ANIMATION_CONFIG.speed.base)
      resizeArray(symbols, () => Math.floor(Math.random() * WEIGHTED_SYMBOLS.length))
      resizeArray(
        categories,
        () => Object.keys(RESEARCH_SYMBOLS)[Math.floor(Math.random() * Object.keys(RESEARCH_SYMBOLS).length)],
      )
      resizeArray(trails, () => [])
      resizeArray(waveOffsets, () => Math.random() * Math.PI * 2)
      resizeArray(glowEffects, () => ({ active: false, intensity: 0, duration: 0, color: [255, 255, 255] }))
      resizeArray(pulseEffects, () => ({ active: false, phase: 0, amplitude: 0 }))
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

export default CodeMatrixEffect
