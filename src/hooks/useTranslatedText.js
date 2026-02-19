import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { translateText } from '../services/translationService';

/**
 * Hook que traduce automaticamente un texto cuando cambia el idioma.
 * Retorna el texto original en espanol, y el texto traducido en ingles.
 * Incluye estado de carga para mejor UX.
 */
export function useTranslatedText(text) {
  const { i18n } = useTranslation();
  const [translatedText, setTranslatedText] = useState(text);
  const [isTranslating, setIsTranslating] = useState(false);
  const prevLang = useRef(i18n.language);
  const prevText = useRef(text);

  useEffect(() => {
    // Actualizar si el texto cambia O el idioma cambia
    if (text !== prevText.current || i18n.language !== prevLang.current) {
      prevText.current = text;
      prevLang.current = i18n.language;
    }

    if (!text || typeof text !== 'string') {
      setTranslatedText(text);
      return;
    }

    if (i18n.language === 'es') {
      setTranslatedText(text);
      setIsTranslating(false);
      return;
    }

    let cancelled = false;
    setIsTranslating(true);

    translateText(text, 'es', i18n.language).then((result) => {
      if (!cancelled) {
        setTranslatedText(result);
        setIsTranslating(false);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [text, i18n.language]);

  return { text: translatedText, isTranslating };
}

/**
 * Hook para traducir un array de textos.
 * Util para listas, elementos de dropdown, etc.
 *
 * @param {string[]} texts - Array de textos originales en espanol
 * @returns {{ texts: string[], isTranslating: boolean }}
 */
export function useTranslatedTexts(texts) {
  const { i18n } = useTranslation();
  const [translatedTexts, setTranslatedTexts] = useState(texts);
  const [isTranslating, setIsTranslating] = useState(false);

  useEffect(() => {
    if (!texts || texts.length === 0) {
      setTranslatedTexts(texts);
      return;
    }

    if (i18n.language === 'es') {
      setTranslatedTexts(texts);
      setIsTranslating(false);
      return;
    }

    let cancelled = false;
    setIsTranslating(true);

    Promise.all(
      texts.map(t => translateText(t, 'es', i18n.language))
    ).then((results) => {
      if (!cancelled) {
        setTranslatedTexts(results);
        setIsTranslating(false);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [JSON.stringify(texts), i18n.language]);

  return { texts: translatedTexts, isTranslating };
}
