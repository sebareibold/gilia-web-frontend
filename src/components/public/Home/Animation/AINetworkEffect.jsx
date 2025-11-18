"use client"

import { useRef, useEffect } from "react"
import * as THREE from "three"
import { useTheme } from "../../../context/ThemeContext"

// Datos de las líneas de investigación con representación futurista
const RESEARCH_NODES = [
  {
    id: 1,
    name: "Ontologías y Web Semántica",
    shortName: "ONT",
    keywords: ["RDF", "OWL", "SPARQL", "URI", "Semantic Web"],
    color: "#00E5FF",
    position: { x: 0.15, y: 0.25 },
    connections: [2, 3, 6],
  },
  {
    id: 2,
    name: "Procesamiento de Lenguaje Natural",
    shortName: "NLP",
    keywords: ["Tokenización", "Análisis", "Corpus", "BERT", "GPT"],
    color: "#76FF03",
    position: { x: 0.85, y: 0.2 },
    connections: [1, 3, 4, 7],
  },
  {
    id: 3,
    name: "Sistemas Inteligentes",
    shortName: "AI",
    keywords: ["ML", "Deep Learning", "Redes", "Neural", "Algorithm"],
    color: "#E91E63",
    position: { x: 0.5, y: 0.5 },
    connections: [1, 2, 4, 5, 6, 7],
  },
  {
    id: 4,
    name: "Robótica y Sistemas Embebidos",
    shortName: "ROB",
    keywords: ["IoT", "Sensores", "Arduino", "ROS", "Embedded"],
    color: "#FF6D00",
    position: { x: 0.8, y: 0.75 },
    connections: [2, 3, 5],
  },
  {
    id: 5,
    name: "Educación en Ciencias de la Computación",
    shortName: "EDU",
    keywords: ["E-learning", "Pedagogía", "Didáctica", "MOOC", "Virtual"],
    color: "#9C27B0",
    position: { x: 0.2, y: 0.8 },
    connections: [3, 4, 6],
  },
  {
    id: 6,
    name: "Lenguajes de Programación",
    shortName: "LANG",
    keywords: ["Compiladores", "Parsing", "Sintaxis", "AST", "Grammar"],
    color: "#00BCD4",
    position: { x: 0.3, y: 0.15 },
    connections: [1, 3, 5, 7],
  },
  {
    id: 7,
    name: "Ética en Ciencias de la Computación",
    shortName: "ETH",
    keywords: ["Privacidad", "Transparencia", "Equidad", "AI Ethics", "Trust"],
    color: "#795548",
    position: { x: 0.7, y: 0.35 },
    connections: [2, 3, 6],
  },
]

// Términos técnicos que flotan en el fondo
const FLOATING_TERMS = [
  "Machine Learning",
  "Neural Networks",
  "Deep Learning",
  "Natural Language Processing",
  "Computer Vision",
  "Reinforcement Learning",
  "Semantic Web",
  "Ontologies",
  "Knowledge Graphs",
  "Data Mining",
  "Big Data",
  "Cloud Computing",
  "Artificial Intelligence",
  "Robotics",
  "IoT",
  "Blockchain",
  "Quantum Computing",
  "Edge Computing",
  "Cybersecurity",
  "Human-Computer Interaction",
]

// eslint-disable-next-line react/prop-types
const AINetworkEffect = ({ children }) => {
  const mountRef = useRef(null)
  const { theme } = useTheme()

  useEffect(() => {
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    mountRef.current.appendChild(renderer.domElement)

    // Variables de animación
    let animationFrameId
    let time = 0
    const nodes = []
    const connections = []
    const dataPackets = []
    const backgroundParticles = []
    const floatingTexts = []

    // Colores basados en el tema
    const isDarkTheme = theme.token.backgroundColor === "#0a0a0a"
    const baseColor = isDarkTheme ? 0xffffff : 0x000000
    const accentColor = isDarkTheme ? 0x00e5ff : 0x0066cc

    // Inicializar nodos de investigación
    const initializeNodes = () => {
      RESEARCH_NODES.forEach((nodeData) => {
        // Geometría del nodo (esfera con anillos)
        const nodeGroup = new THREE.Group()

        // Esfera central
        const sphereGeometry = new THREE.SphereGeometry(0.15, 16, 16)
        const sphereMaterial = new THREE.MeshBasicMaterial({
          color: new THREE.Color(nodeData.color),
          transparent: true,
          opacity: 0.8,
        })
        const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
        nodeGroup.add(sphere)

        // Anillos orbitales
        for (let i = 0; i < 3; i++) {
          const ringGeometry = new THREE.RingGeometry(0.2 + i * 0.1, 0.22 + i * 0.1, 16)
          const ringMaterial = new THREE.MeshBasicMaterial({
            color: new THREE.Color(nodeData.color),
            transparent: true,
            opacity: 0.3 - i * 0.1,
            side: THREE.DoubleSide,
          })
          const ring = new THREE.Mesh(ringGeometry, ringMaterial)
          ring.rotation.x = Math.random() * Math.PI
          ring.rotation.y = Math.random() * Math.PI
          ring.userData = { rotationSpeed: (Math.random() - 0.5) * 0.02 }
          nodeGroup.add(ring)
        }

        // Posicionar nodo
        nodeGroup.position.set(
          (nodeData.position.x - 0.5) * 20,
          (nodeData.position.y - 0.5) * 15,
          (Math.random() - 0.5) * 5,
        )

        nodeGroup.userData = {
          ...nodeData,
          pulsePhase: Math.random() * Math.PI * 2,
          activity: 0,
          lastActivity: 0,
          baseScale: 1,
        }

        nodes.push(nodeGroup)
        scene.add(nodeGroup)
      })
    }

    // Crear conexiones entre nodos
    const createConnections = () => {
      RESEARCH_NODES.forEach((nodeData) => {
        const fromNode = nodes.find((n) => n.userData.id === nodeData.id)

        nodeData.connections.forEach((toId) => {
          const toNode = nodes.find((n) => n.userData.id === toId)
          if (fromNode && toNode) {
            // Línea de conexión
            const points = [fromNode.position, toNode.position]
            const geometry = new THREE.BufferGeometry().setFromPoints(points)

            const material = new THREE.LineBasicMaterial({
              color: baseColor,
              transparent: true,
              opacity: 0.2,
            })

            const connection = new THREE.Line(geometry, material)
            connection.userData = {
              from: fromNode,
              to: toNode,
              strength: Math.random() * 0.5 + 0.3,
              active: false,
              lastPulse: 0,
              baseOpacity: 0.2,
            }

            connections.push(connection)
            scene.add(connection)
          }
        })
      })
    }

    // Crear partículas de fondo
    const createBackgroundParticles = () => {
      const particleGeometry = new THREE.BufferGeometry()
      const particleCount = 200
      const positions = new Float32Array(particleCount * 3)
      const velocities = new Float32Array(particleCount * 3)

      for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 50
        positions[i * 3 + 1] = (Math.random() - 0.5) * 30
        positions[i * 3 + 2] = (Math.random() - 0.5) * 20

        velocities[i * 3] = (Math.random() - 0.5) * 0.02
        velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.02
        velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.02
      }

      particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
      particleGeometry.setAttribute("velocity", new THREE.BufferAttribute(velocities, 3))

      const particleMaterial = new THREE.PointsMaterial({
        color: baseColor,
        size: 0.05,
        transparent: true,
        opacity: 0.6,
      })

      const particles = new THREE.Points(particleGeometry, particleMaterial)
      backgroundParticles.push(particles)
      scene.add(particles)
    }

    // Crear textos flotantes
    const createFloatingTexts = () => {
      // Esta función crearía sprites de texto, pero por simplicidad usaremos partículas adicionales
      for (let i = 0; i < 15; i++) {
        const textGeometry = new THREE.SphereGeometry(0.02, 8, 8)
        const textMaterial = new THREE.MeshBasicMaterial({
          color: accentColor,
          transparent: true,
          opacity: 0.4,
        })

        const textMesh = new THREE.Mesh(textGeometry, textMaterial)
        textMesh.position.set((Math.random() - 0.5) * 40, (Math.random() - 0.5) * 25, (Math.random() - 0.5) * 15)

        textMesh.userData = {
          velocity: new THREE.Vector3(
            (Math.random() - 0.5) * 0.01,
            (Math.random() - 0.5) * 0.01,
            (Math.random() - 0.5) * 0.01,
          ),
          term: FLOATING_TERMS[Math.floor(Math.random() * FLOATING_TERMS.length)],
        }

        floatingTexts.push(textMesh)
        scene.add(textMesh)
      }
    }

    // Crear paquete de datos
    const createDataPacket = (connection) => {
      const packetGeometry = new THREE.SphereGeometry(0.05, 8, 8)
      const packetMaterial = new THREE.MeshBasicMaterial({
        color: new THREE.Color(connection.userData.from.userData.color),
        transparent: true,
        opacity: 0.9,
      })

      const packet = new THREE.Mesh(packetGeometry, packetMaterial)
      packet.position.copy(connection.userData.from.position)

      packet.userData = {
        connection: connection,
        progress: 0,
        speed: 0.015 + Math.random() * 0.02,
        life: 1.0,
      }

      dataPackets.push(packet)
      scene.add(packet)
    }

    // Inicializar todo
    initializeNodes()
    createConnections()
    createBackgroundParticles()
    createFloatingTexts()

    camera.position.set(0, 0, 15)

    const animate = () => {
      time += 0.016

      // Actividad aleatoria en nodos
      if (Math.random() < 0.08) {
        const randomNode = nodes[Math.floor(Math.random() * nodes.length)]
        randomNode.userData.activity = 1.0
        randomNode.userData.lastActivity = time

        // Crear paquetes de datos
        connections
          .filter((conn) => conn.userData.from === randomNode)
          .forEach((conn) => {
            if (Math.random() < 0.6) {
              conn.userData.active = true
              conn.userData.lastPulse = time
              createDataPacket(conn)
            }
          })
      }

      // Animar nodos
      nodes.forEach((node) => {
        const userData = node.userData

        // Decaimiento de actividad
        userData.activity *= 0.96

        // Efecto de pulso
        userData.pulsePhase += 0.03
        const pulse = Math.sin(userData.pulsePhase) * 0.2 + 1
        const activityScale = 1 + userData.activity * 0.5
        node.scale.setScalar(userData.baseScale * pulse * activityScale)

        // Rotación de anillos
        node.children.forEach((child, index) => {
          if (index > 0) {
            // Skip the central sphere
            child.rotation.x += child.userData.rotationSpeed
            child.rotation.y += child.userData.rotationSpeed * 0.7
          }
        })

        // Movimiento sutil
        node.position.y += Math.sin(time * 1.5 + userData.id) * 0.003
        node.position.x += Math.cos(time * 1.2 + userData.id) * 0.002

        // Actualizar opacidad basada en actividad
        const sphere = node.children[0]
        sphere.material.opacity = 0.8 + userData.activity * 0.2
      })

      // Animar conexiones
      connections.forEach((connection) => {
        const userData = connection.userData
        const isActive = time - userData.lastPulse < 3.0

        if (isActive) {
          connection.material.opacity = userData.baseOpacity + 0.4
          connection.material.color.setHex(accentColor)
        } else {
          connection.material.opacity = userData.baseOpacity
          connection.material.color.setHex(baseColor)
        }

        userData.active = isActive
      })

      // Animar paquetes de datos
      for (let i = dataPackets.length - 1; i >= 0; i--) {
        const packet = dataPackets[i]
        const userData = packet.userData

        userData.progress += userData.speed
        userData.life -= 0.008

        if (userData.progress >= 1 || userData.life <= 0) {
          // Activar nodo destino
          const targetNode = userData.connection.userData.to
          targetNode.userData.activity = Math.max(targetNode.userData.activity, 0.8)

          scene.remove(packet)
          dataPackets.splice(i, 1)
        } else {
          // Interpolar posición
          const from = userData.connection.userData.from.position
          const to = userData.connection.userData.to.position
          packet.position.lerpVectors(from, to, userData.progress)
          packet.material.opacity = userData.life * 0.9

          // Rotación del paquete
          packet.rotation.x += 0.1
          packet.rotation.y += 0.07
        }
      }

      // Animar partículas de fondo
      backgroundParticles.forEach((particleSystem) => {
        const positions = particleSystem.geometry.attributes.position.array
        const velocities = particleSystem.geometry.attributes.velocity.array

        for (let i = 0; i < positions.length; i += 3) {
          positions[i] += velocities[i]
          positions[i + 1] += velocities[i + 1]
          positions[i + 2] += velocities[i + 2]

          // Resetear si sale de los límites
          if (Math.abs(positions[i]) > 25) velocities[i] *= -1
          if (Math.abs(positions[i + 1]) > 15) velocities[i + 1] *= -1
          if (Math.abs(positions[i + 2]) > 10) velocities[i + 2] *= -1
        }

        particleSystem.geometry.attributes.position.needsUpdate = true
      })

      // Animar textos flotantes
      floatingTexts.forEach((textMesh) => {
        textMesh.position.add(textMesh.userData.velocity)

        // Resetear posición si sale de los límites
        if (textMesh.position.length() > 30) {
          textMesh.position.set((Math.random() - 0.5) * 40, (Math.random() - 0.5) * 25, (Math.random() - 0.5) * 15)
        }

        // Efecto de respiración
        const breathe = 1 + Math.sin(time * 2 + textMesh.position.x) * 0.3
        textMesh.scale.setScalar(breathe)

        // Rotación sutil
        textMesh.rotation.x += 0.01
        textMesh.rotation.y += 0.008
      })

      // Rotación muy sutil de toda la escena
      scene.rotation.y += 0.0003
      scene.rotation.x = Math.sin(time * 0.1) * 0.02

      // Efecto de zoom sutil
      camera.position.z = 15 + Math.sin(time * 0.05) * 0.5

      renderer.render(scene, camera)
      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    // Manejo de redimensionamiento
    const handleResize = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }

    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId)
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement)
      }
      renderer.dispose()
      window.removeEventListener("resize", handleResize)

      // Limpiar geometrías y materiales
      nodes.forEach((node) => {
        node.children.forEach((child) => {
          if (child.geometry) child.geometry.dispose()
          if (child.material) child.material.dispose()
        })
      })
      connections.forEach((conn) => {
        if (conn.geometry) conn.geometry.dispose()
        if (conn.material) conn.material.dispose()
      })
      dataPackets.forEach((packet) => {
        if (packet.geometry) packet.geometry.dispose()
        if (packet.material) packet.material.dispose()
      })
      backgroundParticles.forEach((particles) => {
        if (particles.geometry) particles.geometry.dispose()
        if (particles.material) particles.material.dispose()
      })
      floatingTexts.forEach((text) => {
        if (text.geometry) text.geometry.dispose()
        if (text.material) text.material.dispose()
      })
    }
  }, [theme])

  return (
    <div
      ref={mountRef}
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        background: "var(--backgroundColor)",
        overflow: "hidden",
      }}
    >
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

export default AINetworkEffect
