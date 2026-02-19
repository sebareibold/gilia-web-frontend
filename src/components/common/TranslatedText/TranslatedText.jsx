import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { translateText } from '../../../services/translationService';

/**
 * Componente que traduce automaticamente el texto de sus children
 * cuando el idioma de la app cambia de espanol a otro idioma.
 *
 * Uso:
 *   <TranslatedText>{textoDinamicoDeLaAPI}</TranslatedText>
 *   <TranslatedText tag="h1">{titulo}</TranslatedText>
 *   <TranslatedText tag="p" className="descripcion">{descripcion}</TranslatedText>
 *
 * @param {Object} props
 * @param {string} props.children - El texto a traducir
 * @param {string} [props.tag] - Tag HTML opcional para envolver el texto (renderiza solo texto si se omite)
 * @param {string} [props.className] - Clase CSS opcional si se especifica tag
 * @param {Object} [props.style] - Estilos inline opcionales si se especifica tag
 */
export default function TranslatedText({ children, tag, className, style, ...rest }) {
  const { i18n } = useTranslation();
  const [translatedText, setTranslatedText] = useState(children);

  useEffect(() => {
    if (!children || typeof children !== 'string') {
      setTranslatedText(children);
      return;
    }

    if (i18n.language === 'es') {
      setTranslatedText(children);
      return;
    }

    let cancelled = false;

    translateText(children, 'es', i18n.language).then((result) => {
      if (!cancelled) {
        setTranslatedText(result);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [children, i18n.language]);

  // Si se especifica un tag, renderizar envuelto en ese tag
  if (tag) {
    const Tag = tag;
    return <Tag className={className} style={style} {...rest}>{translatedText}</Tag>;
  }

  // Si no, solo retornar el texto
  return translatedText;
}
