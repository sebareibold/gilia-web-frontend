import { useRef, useEffect } from "react";
import * as THREE from "three";
import { useTheme } from "../../../context/ThemeContext";

// Componente que genera un efecto de partículas animadas con Three.js.
// eslint-disable-next-line react/prop-types
const ParticleEffect = ({ children }) => {
  const mountRef = useRef(null); // Referencia al contenedor donde se montará la escena de Three.js.
  const { theme } = useTheme(); // Obtiene el tema actual desde el contexto.

  useEffect(() => {
    // Configuración inicial de la escena de Three.js.
    const scene = new THREE.Scene(); // Crea una nueva escena.
    const camera = new THREE.PerspectiveCamera(
      75, // Ángulo de visión.
      window.innerWidth / window.innerHeight, // Relación de aspecto.
      0.1, // Plano cercano.
      1000 // Plano lejano.
    );

    // Renderizador WebGL con fondo transparente.
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Agrega el canvas del renderizador al contenedor.
    mountRef.current.appendChild(renderer.domElement);

    // Cantidad de partículas en la simulación.
    const particleCount = 400;
    const geometry = new THREE.BufferGeometry(); // Geometría de las partículas.
    const positions = new Float32Array(particleCount * 3); // Posiciones de las partículas (x, y, z).
    const velocities = new Float32Array(particleCount * 3); // Velocidades de las partículas (x, y, z).

    // Función para generar nuevas partículas cuando salgan del área visible.
    const resetParticle = (index) => {
      positions[index * 3] = 0; // Resetea la posición en X.
      positions[index * 3 + 1] = 0; // Resetea la posición en Y.
      positions[index * 3 + 2] = 0; // Resetea la posición en Z.

      let dir = new THREE.Vector3(
        Math.random() * 2 - 1,
        Math.random() * 2 - 1,
        Math.random() * 2 - 1
      ).normalize(); // Se normaliza para obtener un vector unitario.

      const speed = Math.random() * 0.1 + 0.02;
      velocities[index * 3] = dir.x * speed;
      velocities[index * 3 + 1] = dir.y * speed;
      velocities[index * 3 + 2] = dir.z * speed;
    };

    for (let i = 0; i < particleCount; i++) {
      resetParticle(i);
    }

    // Asigna las posiciones a la geometría.
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    // Obtiene el color de las partículas desde el tema.
    const particleColor = new THREE.Color(theme.token.colorTextBase);

    // Función para crear una textura circular en un canvas.
    const createCircleTexture = () => {
      const size = 128; // Tamaño del canvas.
      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext("2d");

      ctx.beginPath();
      ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2); // Dibuja un círculo.
      ctx.fillStyle = "#FFFFFF";
      ctx.fill();

      return new THREE.CanvasTexture(canvas); // Retorna la textura generada.
    };

    // Material de las partículas con transparencia y textura circular.
    const material = new THREE.PointsMaterial({
      color: particleColor,
      size: 0.1, // Tamaño de las partículas.
      map: createCircleTexture(),
      transparent: true,
      alphaTest: 0.5, // Define un umbral de transparencia.
    });

    // Crea el sistema de partículas y lo añade a la escena.
    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    camera.position.z = 10; // Ubica la cámara para ver las partículas.

    let animationFrameId; // Almacena el ID del frame de animación.

    //Nueva
    let explosionPhase = true; // Estado inicial: explosión
    const slowDownFactor = 0.995; // Factor de desaceleración más suave
    const minVelocity = 0.002; // Velocidad mínima para evitar vibraciones
    
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const positions = particles.geometry.attributes.position.array;
    
      for (let i = 0; i < positions.length; i += 3) {
        positions[i] += velocities[i]; // Movimiento en X.
        positions[i + 1] += velocities[i + 1]; // Movimiento en Y.
        positions[i + 2] += velocities[i + 2]; // Movimiento en Z.
    
        // Si la partícula se alejó bastante, pasamos a la fase de desaceleración
        if (explosionPhase && Math.hypot(positions[i], positions[i + 1], positions[i + 2]) > 5) {
          explosionPhase = false; 
        }
    
        // Fase de desaceleración progresiva
        if (!explosionPhase) {
          velocities[i] *= slowDownFactor;
          velocities[i + 1] *= slowDownFactor;
          velocities[i + 2] *= slowDownFactor;
        }
    
        // Evitar que las partículas se detengan completamente y empiecen a vibrar
        if (Math.abs(velocities[i]) < minVelocity) velocities[i] = Math.sign(velocities[i]) * minVelocity;
        if (Math.abs(velocities[i + 1]) < minVelocity) velocities[i + 1] = Math.sign(velocities[i + 1]) * minVelocity;
        if (Math.abs(velocities[i + 2]) < minVelocity) velocities[i + 2] = Math.sign(velocities[i + 2]) * minVelocity;
      }
    
      particles.geometry.attributes.position.needsUpdate = true;
      renderer.render(scene, camera);
    };
    

    animate(); // Inicia la animación.

    // Función para manejar cambios en el tamaño de la pantalla.
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    // Se agrega un listener para redimensionar el canvas cuando cambia el tamaño de la ventana.
    window.addEventListener("resize", handleResize);

    // Cleanup al desmontar el componente.
    return () => {
      cancelAnimationFrame(animationFrameId); // Detiene la animación.
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement); // Remueve el canvas.
      }
      renderer.dispose(); // Libera recursos del renderizador.
      window.removeEventListener("resize", handleResize); // Elimina el listener de redimensionamiento.
    };
  }, [theme]); // Se ejecuta cada vez que el tema cambia.

  return (
    <div
      ref={mountRef}
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        background: "var(--backgroundColor)", // Usa la variable CSS del fondo.
      }}
    >
      {children && ( // Si hay hijos, los renderiza en una capa superior.
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
            pointerEvents: "none", // Evita que afecte la interacción del usuario.
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default ParticleEffect;
