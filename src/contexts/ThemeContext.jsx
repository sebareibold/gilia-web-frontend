import { createContext, useState, useContext, useEffect } from 'react';
import { lightTheme, darkTheme } from '../Assets/styles/themes';

const ThemeContext = createContext();

// eslint-disable-next-line react/prop-types
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(lightTheme);

  const isDarkTheme = theme === darkTheme;

  // Sync data-theme attribute on document.body so global CSS reacts
  useEffect(() => {
    document.body.setAttribute('data-theme', isDarkTheme ? 'dark' : 'light');
  }, [isDarkTheme]);

  const toggleTheme = () => {
    setTheme(theme === lightTheme ? darkTheme : lightTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDarkTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);