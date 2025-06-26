import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useTheme } from "./context/ThemeContext";
import Navbar from "./components/Navbar/Navbar";
import AboutUs from "./components/AboutUs/AboutUs";
import HomeContainer from './components/Home/HomeContainer/HomeContainer';
import LinesDetailContainer from "./components/research_line_Detail/LinesDetailContainer";
import PostsList from './components/Post/PostList';
import ExtensionList from "./components/linea_extension/ExtensionLista";
import ExtensionDetails from "./components/linea_extension/ExtensionDetails";
import Galery from './components/Galery/GaleryContainer/GaleryContainer';
import ProyectoDetail from './components/Proyectos/Proyectos';
import "./App.css"


function App() {
  const { theme } = useTheme();
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    Object.entries(theme.token).forEach(([key, value]) => {
      document.body.style.setProperty(`--${key}`, value);
    });
    document.body.style.ovreflowX = "hidden";
  }, [theme]);

  return (
    <Router>
      <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />
      <Routes>
        <Route path="/" element={<HomeContainer />} />
        <Route path="/lineas-de-investigacion/:id" element={<LinesDetailContainer />} />
        <Route path="/post" element={<PostsList />} />
        {/*<Route path="/objectives" element={<Objectives />} /> */}
        <Route path="/linea-extension" element={<ExtensionList />} />
        <Route path="/linea-extension/:id" element={<ExtensionDetails />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/galery" element={<Galery />} />
        <Route path="/proyecto/:id" element={<ProyectoDetail />} />
      
      </Routes>
    </Router>
  );
}

export default App;
