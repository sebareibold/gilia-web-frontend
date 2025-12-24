import { Link } from "react-router-dom";
import { FacebookOutlined, LinkedinOutlined } from "@ant-design/icons";
import "./Footer.css";

const Footer = () => {
  /* Secciones de acceso rapido */
  const sections = {
    GILIA: [
      { name: "Inicio", path: "/" },
      { name: "Investigación", path: "/investigacion" },
      { name: "Publicaciones", path: "/publicaciones" },
      { name: "Extensión", path: "/extension" },
    ],
    Recursos: [
      { name: "Equipo", path: "/about" },
      { name: "Contacto", path: "/contact" },
      {name: "Galeria", path: "/galery"},
    ],
  };

  /* Redes sociales */
  const socialLinks = [
    { icon: <FacebookOutlined />, url: "https://facebook.com" },
    { icon: <LinkedinOutlined />, url: "https://linkedin.com" },
  ];

  return (
    <footer className="footer-container">
      <div className="footer-content">
        {/* Contenido del footer */}
        <div className="footer-main">
          <div className="footer-about">
            <h1 className="hero-titile">
              <span className="hero-title-highlight footer-title-gilia">G.I.L.I.A</span>
            </h1>
            <p className="footer-description hero-title-highlight">
              Grupo de Investigación en Lenguajes e Inteligencia Artificial.
              Universidad Nacional del Comahue
            </p>
          </div>
          <div className="footer-links-container">
            {Object.entries(sections).map(([title, links]) => (
              <div className="footer-section" key={title}>
                <h4 className="footer-title">{title}</h4>
                <ul className="footer-list">
                  {links.map((link, index) => (
                    <li key={index}>
                      <Link to={link.path} className="footer-link">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Pie de pagina */}
        <div className="footer-bottom">
          <p className="footer-copyright">
            © {new Date().getFullYear()} G.I.L.I.A. Todos los derechos
            reservados.
          </p>
          <div className="footer-socials">
            {socialLinks.map((social, index) => (
              <a
                href={social.url}
                key={index}
                className="social-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
