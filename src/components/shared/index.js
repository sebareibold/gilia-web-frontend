// ===== COMPONENTES COMPARTIDOS =====

// Sistema de Loading Unificado
export { default as ContentLoader } from './ContentLoader/ContentLoader';
export { default as SequentialLoader } from './SequentialLoader/SequentialLoader';

// ===== HOOKS PERSONALIZADOS =====
export { useContentLoader, useMultipleContentLoaders } from '../../hooks/useContentLoader';
export { useSequentialLoader, useSequentialLoaderWithDelay } from '../../hooks/useSequentialLoader';

// ===== UTILIDADES =====
export const LOADING_STATES = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error'
};

export const LOADING_DELAYS = {
  FAST: 100,
  NORMAL: 300,
  SLOW: 500,
  VERY_SLOW: 1000
};
