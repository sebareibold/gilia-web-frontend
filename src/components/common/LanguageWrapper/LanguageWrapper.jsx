import { useEffect } from 'react';
import { useParams, useNavigate, useLocation, Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const IDIOMAS_VALIDOS = ['es', 'en'];

/**
 * Componente wrapper que sincroniza el idioma de la URL con i18next.
 * Lee el parametro :lang de la ruta y setea el idioma de i18n.
 * Si el idioma no es valido, redirige a /es/.
 * Renderiza el children (Outlet) una vez que el idioma esta sincronizado.
 */
export default function LanguageWrapper() {
  const { lang } = useParams();
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Si el idioma de la URL no es valido, redirigir a /es/
    if (!lang || !IDIOMAS_VALIDOS.includes(lang)) {
      const idiomaGuardado = localStorage.getItem('language') || 'es';
      const rutaActual = location.pathname.replace(`/${lang}`, '') || '/';
      navigate(`/${idiomaGuardado}${rutaActual}${location.search}${location.hash}`, { replace: true });
      return;
    }

    // Sincronizar el idioma de la URL con i18next
    if (i18n.language !== lang) {
      i18n.changeLanguage(lang);
      localStorage.setItem('language', lang);
    }
  }, [lang, i18n, navigate, location]);

  // Si el idioma no es valido, no renderizar nada (se esta redirigiendo)
  if (!lang || !IDIOMAS_VALIDOS.includes(lang)) {
    return null;
  }

  return <Outlet />;
}
