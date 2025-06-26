"use client";

import { useRef, useEffect } from "react";
import { useTheme } from "../../../context/ThemeContext";

// ===== VARIABLES DE CONFIGURACIÓN =====
const ANIMATION_CONFIG = {
  // Velocidad de la animación
  speed: {
    base: 0.02, // ↓ Más lento
    variation: 0.08, // ↓ Menos variación
    timeMultiplier: 0.01, // ↓ Menos FPS
  },
  // Configuración de destellos/brillo
  glow: {
    enabled: true,
    intensity: 0.1, // ↓ Menos intenso
    frequency: 0.01, // ↓ Menos frecuente
    duration: 15, // ↓ Menos duradero
  },
  // Opacidad de símbolos
  opacity: {
    darkTheme: {
      base: 0.2, // Opacidad base en tema oscuro
      grayRange: [140, 200], // Rango de valores de gris
    },
    lightTheme: {
      base: 0.2, // Opacidad base en tema claro
      grayRange: [100, 140], // Rango de valores de gris
    },
  },

  // Configuración visual
  visual: {
    fontSize: 16,
    columnSpacing: 2.5, // Multiplicador del fontSize para espaciado
    fadeBackground: 12, // Intensidad del fade del fondo (hex)
    resetProbability: 0.9995, // Probabilidad de reset (más alto = menos resets)
  },
};

// Símbolos y términos específicos para cada línea de investigación
const RESEARCH_SYMBOLS = {
  ontologies: [
    // Ontologías y Web Semántica
    "RDF",
    "OWL",
    "SPARQL",
    "URI",
    "XML",
    "RDFS",
    "Turtle",
    "N3",
    "JSON-LD",
    "Protégé",
    "Jena",
    "Sesame",
    "Virtuoso",
    "DBpedia",
    "FOAF",
    "SKOS",
    "⟨⟩",
    "∀",
    "∃",
    "⊆",
    "⊇",
    "≡",
    "⊤",
    "⊥",
    "∩",
    "∪",
  ],
  nlp: [
    // Procesamiento del Lenguaje Natural
    "NLP",
    "TOKEN",
    "PARSE",
    "STEM",
    "POS",
    "NER",
    "NLTK",
    "spaCy",
    "BERT",
    "GPT",
    "Transformer",
    "Word2Vec",
    "GloVe",
    "FastText",
    "Corpus",
    "Lemma",
    "Syntax",
    "Semantic",
    "Pragmatic",
    "Morphology",
    "Phonology",
    "Lexicon",
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
    // Robótica y Sistemas Embebidos
    "IoT",
    "Arduino",
    "Raspberry",
    "PWM",
    "GPIO",
    "I2C",
    "SPI",
    "UART",
    "CAN",
    "Sensor",
    "Actuator",
    "Servo",
    "Stepper",
    "PID",
    "ROS",
    "Gazebo",
    "SLAM",
    "Lidar",
    "IMU",
    "GPS",
    "Bluetooth",
    "WiFi",
    "LoRa",
    "Zigbee",
    "MQTT",
    "→",
    "↑",
    "↓",
    "←",
    "⟲",
    "⟳",
    "⚡",
    "🔧",
    "⚙️",
    "📡",
  ],
  ai: [
    // Sistemas Inteligentes
    "AI",
    "ML",
    "DL",
    "NN",
    "CNN",
    "RNN",
    "LSTM",
    "GAN",
    "SVM",
    "KNN",
    "Random Forest",
    "Gradient",
    "Backprop",
    "Epoch",
    "Batch",
    "Learning Rate",
    "Overfitting",
    "Regularization",
    "Cross-validation",
    "Feature",
    "Dataset",
    "TensorFlow",
    "PyTorch",
    "Keras",
    "Scikit",
    "Pandas",
    "NumPy",
    "∇",
    "∂",
    "∑",
    "∏",
    "∞",
    "α",
    "β",
    "γ",
    "δ",
    "ε",
    "θ",
    "λ",
    "μ",
    "σ",
  ],
  education: [
    // Educación en las Ciencias de la Computación
    "Pedagogía",
    "Didáctica",
    "E-learning",
    "MOOC",
    "LMS",
    "Moodle",
    "Canvas",
    "Gamification",
    "Assessment",
    "Rubric",
    "Competency",
    "Curriculum",
    "STEM",
    "Constructivism",
    "Bloom",
    "Piaget",
    "Vygotsky",
    "Scaffolding",
    "Metacognition",
    "UX",
    "UI",
    "Accessibility",
    "Responsive",
    "Adaptive",
    "Personalization",
    "α",
    "β",
    "γ",
    "δ",
    "ε",
    "ζ",
    "η",
    "θ",
    "ι",
    "κ",
    "λ",
    "μ",
  ],
  languages: [
    // Lenguajes de Programación
    "Compiler",
    "Interpreter",
    "Lexer",
    "Parser",
    "AST",
    "CFG",
    "BNF",
    "EBNF",
    "Yacc",
    "Bison",
    "Flex",
    "ANTLR",
    "LLVM",
    "GCC",
    "Clang",
    "JIT",
    "AOT",
    "Syntax",
    "Semantic",
    "Pragmatic",
    "Type System",
    "Garbage Collection",
    "Lambda",
    "Closure",
    "Monad",
    "Functor",
    "Polymorphism",
    "Inheritance",
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
    // Ética en Ciencias de la Computación
    "Ethics",
    "Privacy",
    "GDPR",
    "Bias",
    "Fairness",
    "Transparency",
    "Accountability",
    "Explainability",
    "Trust",
    "Security",
    "Consent",
    "Anonymization",
    "Pseudonymization",
    "Algorithmic Justice",
    "Digital Rights",
    "AI Ethics",
    "Responsible AI",
    "Human-centered",
    "Inclusive",
    "Equitable",
    "Sustainable",
    "Democratic",
    "⚖️",
    "🛡️",
    "🔒",
    "🤝",
    "✓",
    "⚠️",
    "🔍",
    "👁️",
    "🌍",
    "⭐",
  ],
};

// Combinar todos los símbolos con pesos diferentes para cada categoría
const createWeightedSymbols = () => {
  const weighted = [];

  // Agregar símbolos con diferentes frecuencias
  Object.entries(RESEARCH_SYMBOLS).forEach(([category, symbols]) => {
    symbols.forEach((symbol) => {
      // Términos técnicos aparecen más frecuentemente
      const weight = symbol.length > 3 ? 3 : 1;
      for (let i = 0; i < weight; i++) {
        weighted.push({ symbol, category });
      }
    });
  });

  return weighted;
};

const WEIGHTED_SYMBOLS = createWeightedSymbols();

// eslint-disable-next-line react/prop-types
const CodeMatrixEffect = ({ children }) => {
  const canvasRef = useRef(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();

    // Configuración usando variables
    const fontSize = ANIMATION_CONFIG.visual.fontSize;
    const columnSpacing = fontSize * ANIMATION_CONFIG.visual.columnSpacing;
    const columns = Math.floor(canvas.width / columnSpacing);

    // Arrays para cada columna
    const drops = new Array(columns).fill(0).map(() => Math.random() * -50);
    const speeds = new Array(columns)
      .fill(0)
      .map(
        () =>
          Math.random() * ANIMATION_CONFIG.speed.variation +
          ANIMATION_CONFIG.speed.base
      );
    const symbols = new Array(columns)
      .fill(0)
      .map(() => Math.floor(Math.random() * WEIGHTED_SYMBOLS.length));
    const categories = new Array(columns)
      .fill(0)
      .map(
        () =>
          Object.keys(RESEARCH_SYMBOLS)[
            Math.floor(Math.random() * Object.keys(RESEARCH_SYMBOLS).length)
          ]
      );

    // Arrays para efectos de destello
    const glowEffects = new Array(columns).fill(0).map(() => ({
      active: false,
      intensity: 0,
      duration: 0,
      color: [255, 255, 255], // RGB
    }));

    let animationId;
    let time = 0;

    const animate = () => {
      time += ANIMATION_CONFIG.speed.timeMultiplier;

      // Fondo con desvanecimiento configurable
      ctx.fillStyle = `${theme.token.backgroundColor}${ANIMATION_CONFIG.visual.fadeBackground.toString(16).padStart(2, "0")}`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Dibujar matriz de código cayendo
      ctx.font = `${fontSize}px 'Courier New', monospace`;

      for (let i = 0; i < drops.length; i++) {
        // Seleccionar símbolo
        const symbolData = WEIGHTED_SYMBOLS[symbols[i]];
        const symbol = symbolData.symbol;

        const isDarkTheme = theme.token.backgroundColor === "#0a0a0a";
        const opacityConfig = isDarkTheme
          ? ANIMATION_CONFIG.opacity.darkTheme
          : ANIMATION_CONFIG.opacity.lightTheme;

        // Generar destello ocasionalmente
        if (
          ANIMATION_CONFIG.glow.enabled &&
          Math.random() < ANIMATION_CONFIG.glow.frequency
        ) {
          glowEffects[i] = {
            active: true,
            intensity: ANIMATION_CONFIG.glow.intensity,
            duration: ANIMATION_CONFIG.glow.duration,
            color: [
              opacityConfig.grayRange[0] +
                Math.random() *
                  (opacityConfig.grayRange[1] - opacityConfig.grayRange[0]),
              opacityConfig.grayRange[0] +
                Math.random() *
                  (opacityConfig.grayRange[1] - opacityConfig.grayRange[0]),
              opacityConfig.grayRange[0] +
                Math.random() *
                  (opacityConfig.grayRange[1] - opacityConfig.grayRange[0]),
            ],
          };
        }

        // Aplicar efecto de destello si está activo
        if (glowEffects[i].active) {
          const glow = glowEffects[i];
          const glowIntensity =
            (glow.duration / ANIMATION_CONFIG.glow.duration) * glow.intensity;

          // Configurar glow
          ctx.shadowBlur = ANIMATION_CONFIG.glow.blurRadius * glowIntensity;
          ctx.shadowColor = `rgba(${glow.color[0]}, ${glow.color[1]}, ${glow.color[2]}, ${ANIMATION_CONFIG.glow.colorIntensity * glowIntensity})`;

          // Color más brillante para el símbolo con glow
          const brightValue = Math.min(255, glow.color[0] + 50);
          ctx.fillStyle = `rgba(${brightValue}, ${brightValue}, ${brightValue}, ${opacityConfig.base + glowIntensity * 0.4})`;

          // Reducir duración del glow
          glow.duration--;
          if (glow.duration <= 0) {
            glow.active = false;
          }
        } else {
          // Sin glow - configuración normal
          ctx.shadowBlur = 0;
          ctx.shadowColor = "transparent";

          const grayValue =
            opacityConfig.grayRange[0] +
            Math.random() *
              (opacityConfig.grayRange[1] - opacityConfig.grayRange[0]);
          ctx.fillStyle = `rgba(${grayValue}, ${grayValue}, ${grayValue}, ${opacityConfig.base})`;
        }

        // Dibujar símbolo con espaciado configurable
        const x = i * columnSpacing + columnSpacing / 2;
        const y = drops[i] * (fontSize * 1.8);

        // Solo dibujar si está en pantalla
        if (y > -fontSize && y < canvas.height + fontSize) {
          ctx.fillText(symbol, x, y);
        }

        // Mover gota hacia abajo usando velocidad configurable
        drops[i] += speeds[i];

        // Resetear cuando llega al final o según probabilidad configurable
        if (
          drops[i] * (fontSize * 1.8) > canvas.height + 100 ||
          Math.random() > ANIMATION_CONFIG.visual.resetProbability
        ) {
          drops[i] = Math.random() * -20 - 10;

          // Cambiar símbolo y categoría ocasionalmente
          if (Math.random() > 0.8) {
            symbols[i] = Math.floor(Math.random() * WEIGHTED_SYMBOLS.length);
            categories[i] =
              Object.keys(RESEARCH_SYMBOLS)[
                Math.floor(Math.random() * Object.keys(RESEARCH_SYMBOLS).length)
              ];
          }

          // Reset del glow effect
          glowEffects[i].active = false;
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    // Manejar redimensionamiento
    const handleResize = () => {
      resizeCanvas();
      const newColumns = Math.floor(canvas.width / columnSpacing);

      // Redimensionar arrays
      drops.length = newColumns;
      speeds.length = newColumns;
      symbols.length = newColumns;
      categories.length = newColumns;
      glowEffects.length = newColumns;

      for (let i = 0; i < newColumns; i++) {
        if (drops[i] === undefined) drops[i] = Math.random() * -20 - 10;
        if (speeds[i] === undefined)
          speeds[i] =
            Math.random() * ANIMATION_CONFIG.speed.variation +
            ANIMATION_CONFIG.speed.base;
        if (symbols[i] === undefined)
          symbols[i] = Math.floor(Math.random() * WEIGHTED_SYMBOLS.length);
        if (categories[i] === undefined)
          categories[i] =
            Object.keys(RESEARCH_SYMBOLS)[
              Math.floor(Math.random() * Object.keys(RESEARCH_SYMBOLS).length)
            ];
        if (glowEffects[i] === undefined)
          glowEffects[i] = {
            active: false,
            intensity: 0,
            duration: 0,
            color: [255, 255, 255],
          };
      }
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, [theme]);

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
  );
};

export default CodeMatrixEffect;
