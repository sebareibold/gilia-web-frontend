import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './i18n'; // Initialize i18n before app renders
import App from './App';
import { ThemeProvider } from './contexts/ThemeContext'; 

createRoot(document.getElementById('root')).render(
  //<StrictMode>
    <ThemeProvider> 
      <App />
    </ThemeProvider>
  //</StrictMode>,
);
