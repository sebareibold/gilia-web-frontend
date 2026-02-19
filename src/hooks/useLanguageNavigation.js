import { useTranslation } from 'react-i18next';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

/**
 * Hook que devuelve funciones utiles para navegar con el prefijo de idioma.
 * Asegura que todos los links mantengan el idioma actual en la URL.
 *
 * Uso:
 *   const { langPath, toggleLanguage, currentLang } = useLanguageNavigation();
 *   <Link to={langPath('/about')}>Nosotros</Link>
 */
export function useLanguageNavigation() {
  const { i18n } = useTranslation();
  const { lang } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // Idioma actual (prioridad: URL > i18n)
  const currentLang = lang || i18n.language || 'es';

  /**
   * Genera una ruta con el prefijo de idioma actual
   * @param {string} path - Ruta sin prefijo (ej: '/about')
   * @returns {string} Ruta con prefijo (ej: '/es/about')
   */
  const langPath = (path) => {
    // Si la ruta ya tiene prefijo de idioma, reemplazarlo
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    return `/${currentLang}${cleanPath}`;
  };

  /**
   * Cambia el idioma y actualiza la URL
   */
  const toggleLanguage = () => {
    const newLang = currentLang === 'es' ? 'en' : 'es';
    i18n.changeLanguage(newLang);
    localStorage.setItem('language', newLang);

    // Reemplazar el idioma en la URL actual
    const currentPath = location.pathname;
    const newPath = currentPath.replace(`/${currentLang}`, `/${newLang}`);
    navigate(newPath + location.search + location.hash, { replace: true });
  };

  return { langPath, toggleLanguage, currentLang };
}
