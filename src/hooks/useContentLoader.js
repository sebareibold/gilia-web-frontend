import { useState, useEffect } from 'react';

/**
 * Hook personalizado para manejar el estado de carga de manera consistente
 * @param {Function} fetchFunction - Función que realiza la petición
 * @param {Array} dependencies - Dependencias para useEffect
 * @param {Object} options - Opciones adicionales
 * @returns {Object} Estado de carga y datos
 */
export const useContentLoader = (fetchFunction, dependencies = [], options = {}) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  const {
    initialData = null,
    onSuccess = null,
    onError = null,
    retryOnError = true,
    maxRetries = 3,
    delay = 0
  } = options;

  useEffect(() => {
    let isMounted = true;
    
    const fetchData = async () => {
      if (!isMounted) return;
      
      setIsLoading(true);
      setError(null);
      
      try {
        // Delay opcional para evitar parpadeos
        if (delay > 0) {
          await new Promise(resolve => setTimeout(resolve, delay));
        }
        
        const result = await fetchFunction();
        
        if (isMounted) {
          setData(result);
          if (onSuccess) onSuccess(result);
        }
      } catch (err) {
        if (isMounted) {
          setError(err);
          if (onError) onError(err);
          
          // Reintento automático en caso de error
          if (retryOnError && retryCount < maxRetries) {
            setTimeout(() => {
              setRetryCount(prev => prev + 1);
            }, 1000 * (retryCount + 1)); // Backoff exponencial
          }
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [...dependencies, retryCount]);

  const retry = () => {
    setRetryCount(0);
    setError(null);
    setIsLoading(true);
  };

  const refresh = () => {
    setRetryCount(0);
    setError(null);
    setIsLoading(true);
  };

  return {
    data,
    isLoading,
    error,
    retryCount,
    retry,
    refresh,
    hasData: data !== null && data !== undefined,
    isEmpty: data !== null && Array.isArray(data) && data.length === 0
  };
};

/**
 * Hook para manejar múltiples estados de carga simultáneamente
 * @param {Array} loaders - Array de objetos con fetchFunction y dependencies
 * @returns {Object} Estado combinado de todos los loaders
 */
export const useMultipleContentLoaders = (loaders) => {
  const loaderStates = loaders.map(loader => 
    useContentLoader(loader.fetchFunction, loader.dependencies, loader.options)
  );

  const isLoading = loaderStates.some(loader => loader.isLoading);
  const hasError = loaderStates.some(loader => loader.error);
  const allData = loaderStates.map(loader => loader.data);
  const errors = loaderStates.map(loader => loader.error).filter(Boolean);

  const retryAll = () => {
    loaderStates.forEach(loader => loader.retry());
  };

  const refreshAll = () => {
    loaderStates.forEach(loader => loader.refresh());
  };

  return {
    isLoading,
    hasError,
    allData,
    errors,
    retryAll,
    refreshAll,
    loaderStates
  };
};
