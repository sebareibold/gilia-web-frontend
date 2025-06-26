"use client"

import { useRef, useEffect } from "react"
import * as THREE from "three"
import { useTheme } from "../../../context/ThemeContext"

// Componente que genera una red neuronal animada con palabras de IA flotantes
// eslint-disable-next-line react/prop-types
const AINetworkEffect = ({ children }) => {
  const mountRef = useRef(null)
  const { theme } = useTheme()

  useEffect(() => {
    // Configuración inicial de la escena
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    mountRef.current.appendChild(renderer.domElement)

    // Configuración de la red neuronal
    const layers = [8, 12, 16, 12, 8] // Neuronas por capa
    const layerSpacing = 4
    const neuronSpacing = 1.5
    const networkWidth = (layers.length - 1) * layerSpacing
    const maxNeurons = Math.max(...layers)
    const networkHeight = (maxNeurons - 1) * neuronSpacing

    // Arrays para almacenar nodos y conexiones
    const neurons = []
    const connections = []
    const pulses = []

    // Colores para diferentes tipos de neuronas
    const colors = {
      input: new THREE.Color(theme.token.colorTextBase).multiplyScalar(0.8),
      hidden: new THREE.Color(theme.token.colorTextSecondary),
      output: new THREE.Color(theme.token.colorTextBase),
      connection: new THREE.Color(theme.token.colorTextBase).multiplyScalar(0.3),
    }

    // Crear neuronas por capas
    layers.forEach((neuronCount, layerIndex) => {
      const layerNeurons = []
      const x = layerIndex * layerSpacing - networkWidth / 2

      for (let i = 0; i < neuronCount; i++) {
        const y = i * neuronSpacing - ((neuronCount - 1) * neuronSpacing) / 2
        const z = (Math.random() - 0.5) * 2

        // Geometría de la neurona
        const geometry = new THREE.SphereGeometry(0.08, 12, 12)

        // Material según el tipo de capa
        let color = colors.hidden
        if (layerIndex === 0) color = colors.input
        if (layerIndex === layers.length - 1) color = colors.output

        const material = new THREE.MeshBasicMaterial({
          color: color,
          transparent: true,
          opacity: 0.7,
        })

        const neuron = new THREE.Mesh(geometry, material)
        neuron.position.set(x, y, z)

        // Datos adicionales para animación
        neuron.userData = {
          layer: layerIndex,
          index: i,
          baseOpacity: 0.7,
          activity: Math.random(),
          lastActivation: 0,
          connections: [],
        }

        layerNeurons.push(neuron)
        scene.add(neuron)
      }
      neurons.push(layerNeurons)
    })

    // Crear conexiones entre capas
    for (let layerIndex = 0; layerIndex < layers.length - 1; layerIndex++) {
      const currentLayer = neurons[layerIndex]
      const nextLayer = neurons[layerIndex + 1]

      currentLayer.forEach((neuron1, i) => {
        nextLayer.forEach((neuron2, j) => {
          // Crear conexión con probabilidad variable
          const connectionProbability = 0.6 + Math.random() * 0.4
          if (Math.random() < connectionProbability) {
            const points = [neuron1.position, neuron2.position]
            const geometry = new THREE.BufferGeometry().setFromPoints(points)

            const material = new THREE.LineBasicMaterial({
              color: colors.connection,
              transparent: true,
              opacity: 0.1,
            })

            const connection = new THREE.Line(geometry, material)
            connection.userData = {
              from: neuron1,
              to: neuron2,
              weight: Math.random() * 2 - 1, // Peso de -1 a 1
              baseOpacity: 0.1,
              active: false,
            }

            connections.push(connection)
            scene.add(connection)

            // Agregar referencia en las neuronas
            neuron1.userData.connections.push(connection)
          }
        })
      })
    }

    // Crear pulsos de datos
    const createPulse = (connection) => {
      const geometry = new THREE.SphereGeometry(0.03, 8, 8)
      const material = new THREE.MeshBasicMaterial({
        color: new THREE.Color(theme.token.colorTextBase),
        transparent: true,
        opacity: 0.8,
      })

      const pulse = new THREE.Mesh(geometry, material)
      pulse.position.copy(connection.userData.from.position)

      pulse.userData = {
        connection: connection,
        progress: 0,
        speed: 0.02 + Math.random() * 0.03,
        life: 1.0,
      }

      pulses.push(pulse)
      scene.add(pulse)
    }

    // Crear partículas de datos flotantes
    const dataParticles = []
    const particleGeometry = new THREE.SphereGeometry(0.02, 6, 6)

    for (let i = 0; i < 30; i++) {
      const material = new THREE.MeshBasicMaterial({
        color: new THREE.Color(theme.token.colorTextSecondary),
        transparent: true,
        opacity: 0.3,
      })

      const particle = new THREE.Mesh(particleGeometry, material)
      particle.position.set((Math.random() - 0.5) * 20, (Math.random() - 0.5) * 15, (Math.random() - 0.5) * 10)

      particle.userData = {
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.01,
          (Math.random() - 0.5) * 0.01,
          (Math.random() - 0.5) * 0.01,
        ),
        life: Math.random() * 100 + 50,
      }

      dataParticles.push(particle)
      scene.add(particle)
    }

    camera.position.set(0, 0, 12)

    let animationFrameId
    let time = 0

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)
      time += 0.016 // ~60fps

      // Simular activación de red neuronal
      if (Math.random() < 0.1) {
        // 10% de probabilidad por frame
        // Activar neurona de entrada aleatoria
        const inputLayer = neurons[0]
        const randomNeuron = inputLayer[Math.floor(Math.random() * inputLayer.length)]
        randomNeuron.userData.activity = 1.0
        randomNeuron.userData.lastActivation = time

        // Crear pulsos desde esta neurona
        randomNeuron.userData.connections.forEach((connection) => {
          if (Math.random() < 0.7) {
            // 70% de probabilidad
            createPulse(connection)
            connection.userData.active = true
          }
        })
      }

      // Animar neuronas
      neurons.forEach((layer) => {
        layer.forEach((neuron) => {
          const userData = neuron.userData

          // Decaimiento de actividad
          userData.activity *= 0.95

          // Pulsación basada en actividad
          const scale = 1 + userData.activity * 0.3
          neuron.scale.setScalar(scale)

          // Opacidad basada en actividad
          const opacity = userData.baseOpacity + userData.activity * 0.3
          neuron.material.opacity = opacity

          // Movimiento sutil
          neuron.position.y += Math.sin(time * 2 + userData.index) * 0.002
          neuron.position.z += Math.cos(time * 1.5 + userData.layer) * 0.001
        })
      })

      // Animar conexiones
      connections.forEach((connection) => {
        const userData = connection.userData

        if (userData.active) {
          userData.active = false
          connection.material.opacity = Math.min(userData.baseOpacity * 3, 0.4)
        } else {
          connection.material.opacity *= 0.95
          if (connection.material.opacity < userData.baseOpacity) {
            connection.material.opacity = userData.baseOpacity
          }
        }
      })

      // Animar pulsos
      for (let i = pulses.length - 1; i >= 0; i--) {
        const pulse = pulses[i]
        const userData = pulse.userData

        userData.progress += userData.speed
        userData.life -= 0.02

        if (userData.progress >= 1 || userData.life <= 0) {
          // Activar neurona destino
          const targetNeuron = userData.connection.userData.to
          targetNeuron.userData.activity = Math.max(targetNeuron.userData.activity, 0.8)

          // Crear nuevos pulsos desde la neurona activada
          if (userData.progress >= 1) {
            targetNeuron.userData.connections.forEach((conn) => {
              if (Math.random() < 0.5) {
                createPulse(conn)
                conn.userData.active = true
              }
            })
          }

          scene.remove(pulse)
          pulses.splice(i, 1)
        } else {
          // Interpolar posición del pulso
          const from = userData.connection.userData.from.position
          const to = userData.connection.userData.to.position
          pulse.position.lerpVectors(from, to, userData.progress)
          pulse.material.opacity = userData.life * 0.8
        }
      }

      // Animar partículas de datos
      dataParticles.forEach((particle) => {
        particle.position.add(particle.userData.velocity)
        particle.rotation.x += 0.02
        particle.rotation.y += 0.01

        // Resetear si sale de los límites
        if (particle.position.length() > 15) {
          particle.position.set((Math.random() - 0.5) * 20, (Math.random() - 0.5) * 15, (Math.random() - 0.5) * 10)
        }

        // Efecto de respiración
        const breathe = 1 + Math.sin(time * 3 + particle.position.x) * 0.2
        particle.scale.setScalar(breathe)
      })

      // Rotación muy sutil de toda la red
      scene.rotation.y += 0.0005
      scene.rotation.x = Math.sin(time * 0.1) * 0.05

      renderer.render(scene, camera)
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
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement)
      }
      renderer.dispose()
      window.removeEventListener("resize", handleResize)
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
