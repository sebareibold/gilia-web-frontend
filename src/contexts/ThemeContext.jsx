import { createContext, useState, useContext, useEffect } from 'react';

const ThemeContext = createContext();

// eslint-disable-next-line react/prop-types
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  // Aplicar el tema al documento
  const applyTheme = (newTheme) => {
    document.documentElement.setAttribute('data-theme', newTheme);
    setTheme(newTheme);
  };

  // Inicializar tema desde localStorage o preferencia del sistema
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
    applyTheme(initialTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
  };

  // Crear objeto de tema compatible con el sistema existente
  const themeObject = {
    token: {
      // Colores para modo oscuro
      ...(theme === 'dark' ? {
        colorPrimario: "#ffffff",
        backgroundColor: "#0a0a0a",
        backgroundColorSecondary: "#1a1a1a",
        backgroundColorTertiary: "#2a2a2a",
        colorTextBase: "#ffffff",
        colorTextSecondary: "#b3b3b3",
        colorTextMuted: "#666666",
        colorTextBaseHover: "#e6e6e6",
        efectColorHover: "#333333",
        borderColor: "#333333",
        borderColorLight: "#1a1a1a",
        shadowPrimary: "0 4px 20px rgba(0, 0, 0, 0.3)",
        shadowSecondary: "0 2px 10px rgba(0, 0, 0, 0.2)",
        shadowHover: "0 8px 30px rgba(0, 0, 0, 0.4)",
        statusSuccess: "#ffffff",
        statusWarning: "#cccccc",
        statusError: "#999999",
        statusInfo: "#666666",
        cardBackground: "#1a1a1a",
        cardBorder: "#333333",
        inputBackground: "#2a2a2a",
        buttonPrimary: "#ffffff",
        buttonSecondary: "#333333",
      } : {
        // Colores para modo claro
        colorPrimario: "#000000",
        backgroundColor: "#ffffff",
        backgroundColorSecondary: "#f8f8f8",
        backgroundColorTertiary: "#f0f0f0",
        colorTextBase: "#000000",
        colorTextSecondary: "#4d4d4d",
        colorTextMuted: "#999999",
        colorTextBaseHover: "#1a1a1a",
        efectColorHover: "#f0f0f0",
        borderColor: "#e0e0e0",
        borderColorLight: "#f0f0f0",
        shadowPrimary: "0 4px 20px rgba(0, 0, 0, 0.1)",
        shadowSecondary: "0 2px 10px rgba(0, 0, 0, 0.05)",
        shadowHover: "0 8px 30px rgba(0, 0, 0, 0.15)",
        statusSuccess: "#000000",
        statusWarning: "#333333",
        statusError: "#666666",
        statusInfo: "#999999",
        cardBackground: "#ffffff",
        cardBorder: "#e0e0e0",
        inputBackground: "#f8f8f8",
        buttonPrimary: "#000000",
        buttonSecondary: "#f0f0f0",
      })
    }
  };

  return (
    <ThemeContext.Provider value={{ theme: themeObject, toggleTheme, currentTheme: theme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);