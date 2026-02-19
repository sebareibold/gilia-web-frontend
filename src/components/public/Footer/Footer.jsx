import { Link } from "react-router-dom";
import { FacebookOutlined, LinkedinOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { useLanguageNavigation } from "../../../hooks/useLanguageNavigation";
import "./Footer.css";

const Footer = () => {
  const { t } = useTranslation();
  const { langPath } = useLanguageNavigation();

  /* Secciones de acceso rapido */
  const sections = {
    GILIA: [
      { name: t("footer.home"), path: langPath("/") },
      { name: t("footer.research"), path: langPath("/research-lines/1") },
      { name: t("footer.publications"), path: langPath("/posts") },
      { name: t("footer.extension"), path: langPath("/extentions-lines") },
    ],
    [t("footer.resources")]: [
      { name: t("footer.team"), path: langPath("/about") },
      { name: t("footer.contact"), path: langPath("/about") },
      { name: t("footer.gallery"), path: langPath("/gallery") },
    ],
    [t("footer.access")]: [
      { name: t("footer.adminPanel"), path: "/admin/login" }
    ]
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
            <h1 className="footer-title-gilia">G.I.L.I.A</h1>
            <p className="footer-description">
              {t("footer.description")}
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

        <hr className="footer-separator" />
        {/* Pie de pagina */}
        <div className="footer-bottom">
          <p className="footer-copyright">
            &copy; {new Date().getFullYear()} {t("footer.copyright")}
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
