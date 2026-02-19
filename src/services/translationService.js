/**
 * Servicio de traduccion para contenido dinamico.
 * Usa la API gratuita de Google Translate para traducir texto en tiempo real.
 * Incluye cache en memoria + localStorage para evitar llamadas repetidas.
 */

// Cache en memoria para traducciones (mas rapido)
const memoryCache = new Map();

// Prefijo para claves en localStorage
const STORAGE_PREFIX = 'gilia_translation_';

/**
 * Obtiene una traduccion cacheada de localStorage
 */
function getFromStorage(text, targetLang) {
  try {
    const key = `${STORAGE_PREFIX}${targetLang}_${hashText(text)}`;
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

/**
 * Guarda una traduccion en localStorage
 */
function saveToStorage(text, targetLang, translation) {
  try {
    const key = `${STORAGE_PREFIX}${targetLang}_${hashText(text)}`;
    localStorage.setItem(key, translation);
  } catch {
    // localStorage puede estar lleno o no disponible
  }
}

/**
 * Funcion de hash simple para crear claves de cache
 */
function hashText(text) {
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    const char = text.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0; // Convertir a entero de 32 bits
  }
  return Math.abs(hash).toString(36);
}

/**
 * Traduce un texto usando la API de Google Translate (endpoint gratuito)

 */
async function translateText(text, sourceLang = 'es', targetLang = 'en') {
  if (!text || typeof text !== 'string' || text.trim() === '') {
    return text;
  }

  // Si origen = destino, retornar tal cual
  if (sourceLang === targetLang) {
    return text;
  }

  // Buscar en cache de memoria
  const cacheKey = `${sourceLang}_${targetLang}_${text}`;
  if (memoryCache.has(cacheKey)) {
    return memoryCache.get(cacheKey);
  }

  // Buscar en cache de localStorage
  const storedTranslation = getFromStorage(text, targetLang);
  if (storedTranslation) {
    memoryCache.set(cacheKey, storedTranslation);
    return storedTranslation;
  }

  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang}&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error en API de traduccion: ${response.status}`);
    }

    const data = await response.json();

    // Google retorna un array como [[["texto traducido","texto original",...],...],...]
    let translatedText = '';
    if (data && data[0]) {
      translatedText = data[0].map(segment => segment[0]).join('');
    }

    if (translatedText) {
      // Cachear el resultado
      memoryCache.set(cacheKey, translatedText);
      saveToStorage(text, targetLang, translatedText);
      return translatedText;
    }

    return text; // Fallback al texto original
  } catch (error) {
    console.warn('Error en traduccion, usando texto original:', error.message);
    return text; // Fallback al texto original en caso de error
  }
}

/**
 * Traduce multiples textos en lote (reduce cantidad de llamadas a la API)
 * @param {string[]} texts - Array de textos a traducir
 * @param {string} sourceLang
 * @param {string} targetLang
 * @returns {Promise<string[]>} Array de textos traducidos
 */
async function translateBatch(texts, sourceLang = 'es', targetLang = 'en') {
  if (sourceLang === targetLang) return texts;

  const results = await Promise.all(
    texts.map(text => translateText(text, sourceLang, targetLang))
  );

  return results;
}

/**
 * Limpia toda la cache de traducciones
 */
function clearCache() {
  memoryCache.clear();
  try {
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.startsWith(STORAGE_PREFIX)) {
        localStorage.removeItem(key);
      }
    });
  } catch {
    // Ignorar errores
  }
}

export { translateText, translateBatch, clearCache };
