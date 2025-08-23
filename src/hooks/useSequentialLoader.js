import { useState, useEffect, useCallback } from 'react';

/**
 * Hook para manejar la carga secuencial de datos
 * Asegura que los elementos aparezcan en el orden correcto
 * @param {Array} loaders - Array de objetos con fetchFunction, dependencies y options
 * @returns {Object} Estado combinado de todos los loaders
 */
export const useSequentialLoader = (loaders) => {
  const [loaderStates, setLoaderStates] = useState(
    loaders.map((_, index) => ({
      isLoading: true,
      data: null,
      error: null,
      isReady: false,
      order: index
    }))
  );

  const [currentLoaderIndex, setCurrentLoaderIndex] = useState(0);
  const [isSequentialLoading, setIsSequentialLoading] = useState(true);

  // Función para cargar un loader específico
  const loadSingleLoader = useCallback(async (loaderIndex) => {
    const loader = loaders[loaderIndex];
    
    try {
      setLoaderStates(prev => 
        prev.map((state, index) => 
          index === loaderIndex 
            ? { ...state, isLoading: true, error: null }
            : state
        )
      );

      const result = await loader.fetchFunction();
      
      setLoaderStates(prev => 
        prev.map((state, index) => 
          index === loaderIndex 
            ? { 
                ...state, 
                isLoading: false, 
                data: result, 
                error: null,
                isReady: true 
              }
            : state
        )
      );

      // Si hay más loaders, continuar con el siguiente
      if (loaderIndex < loaders.length - 1) {
        setCurrentLoaderIndex(loaderIndex + 1);
      } else {
        // Todos los loaders están completos
        setIsSequentialLoading(false);
      }

    } catch (error) {
      setLoaderStates(prev => 
        prev.map((state, index) => 
          index === loaderIndex 
            ? { 
                ...state, 
                isLoading: false, 
                error, 
                isReady: false 
              }
            : state
        )
      );

      // Continuar con el siguiente loader incluso si hay error
      if (loaderIndex < loaders.length - 1) {
        setCurrentLoaderIndex(loaderIndex + 1);
      } else {
        setIsSequentialLoading(false);
      }
    }
  }, [loaders]);

  // Iniciar la carga secuencial
  useEffect(() => {
    if (currentLoaderIndex < loaders.length) {
      loadSingleLoader(currentLoaderIndex);
    }
  }, [currentLoaderIndex, loadSingleLoader]);

  // Función para recargar todos los loaders
  const reloadAll = useCallback(() => {
    setCurrentLoaderIndex(0);
    setIsSequentialLoading(true);
    setLoaderStates(prev => 
      prev.map(state => ({
        ...state,
        isLoading: false,
        data: null,
        error: null,
        isReady: false
      }))
    );
  }, []);

  // Función para recargar un loader específico
  const reloadLoader = useCallback((loaderIndex) => {
    setLoaderStates(prev => 
      prev.map((state, index) => 
        index === loaderIndex 
          ? { ...state, isLoading: false, data: null, error: null, isReady: false }
          : state
      )
    );
    loadSingleLoader(loaderIndex);
  }, [loadSingleLoader]);

  // Estado general
  const isLoading = isSequentialLoading || loaderStates.some(state => state.isLoading);
  const hasError = loaderStates.some(state => state.error);
  const allData = loaderStates.map(state => state.data);
  const errors = loaderStates.map(state => state.error).filter(Boolean);
  const allReady = loaderStates.every(state => state.isReady);

  // Progreso de carga
  const progress = {
    completed: loaderStates.filter(state => state.isReady).length,
    total: loaders.length,
    percentage: Math.round((loaderStates.filter(state => state.isReady).length / loaders.length) * 100)
  };

  return {
    // Estados generales
    isLoading,
    isSequentialLoading,
    hasError,
    allReady,
    
    // Datos
    allData,
    errors,
    
    // Estados individuales
    loaderStates,
    
    // Progreso
    progress,
    
    // Funciones
    reloadAll,
    reloadLoader,
    
    // Estado del loader actual
    currentLoaderIndex,
    currentLoader: loaderStates[currentLoaderIndex] || null
  };
};

/**
 * Hook para carga secuencial con delay entre elementos
 * Útil para crear efectos de aparición gradual
 */
export const useSequentialLoaderWithDelay = (loaders, delayBetweenLoaders = 200) => {
  const [loaderStates, setLoaderStates] = useState(
    loaders.map((_, index) => ({
      isLoading: true,
      data: null,
      error: null,
      isReady: false,
      order: index,
      isVisible: false // Para controlar la visibilidad gradual
    }))
  );

  const [currentLoaderIndex, setCurrentLoaderIndex] = useState(0);
  const [isSequentialLoading, setIsSequentialLoading] = useState(true);

  const loadSingleLoader = useCallback(async (loaderIndex) => {
    const loader = loaders[loaderIndex];
    
    try {
      setLoaderStates(prev => 
        prev.map((state, index) => 
          index === loaderIndex 
            ? { ...state, isLoading: true, error: null }
            : state
        )
      );

      const result = await loader.fetchFunction();
      
      // Marcar como listo
      setLoaderStates(prev => 
        prev.map((state, index) => 
          index === loaderIndex 
            ? { 
                ...state, 
                isLoading: false, 
                data: result, 
                error: null,
                isReady: true 
              }
            : state
        )
      );

      // Delay antes de hacer visible
      setTimeout(() => {
        setLoaderStates(prev => 
          prev.map((state, index) => 
            index === loaderIndex 
              ? { ...state, isVisible: true }
              : state
          )
        );
      }, delayBetweenLoaders);

      // Continuar con el siguiente loader
      if (loaderIndex < loaders.length - 1) {
        setTimeout(() => {
          setCurrentLoaderIndex(loaderIndex + 1);
        }, delayBetweenLoaders);
      } else {
        setIsSequentialLoading(false);
      }

    } catch (error) {
      setLoaderStates(prev => 
        prev.map((state, index) => 
          index === loaderIndex 
            ? { 
                ...state, 
                isLoading: false, 
                error, 
                isReady: false 
              }
            : state
        )
      );

      // Continuar con el siguiente loader
      if (loaderIndex < loaders.length - 1) {
        setTimeout(() => {
          setCurrentLoaderIndex(loaderIndex + 1);
        }, delayBetweenLoaders);
      } else {
        setIsSequentialLoading(false);
      }
    }
  }, [loaders, delayBetweenLoaders]);

  useEffect(() => {
    if (currentLoaderIndex < loaders.length) {
      loadSingleLoader(currentLoaderIndex);
    }
  }, [currentLoaderIndex, loadSingleLoader]);

  const reloadAll = useCallback(() => {
    setCurrentLoaderIndex(0);
    setIsSequentialLoading(true);
    setLoaderStates(prev => 
      prev.map(state => ({
        ...state,
        isLoading: false,
        data: null,
        error: null,
        isReady: false,
        isVisible: false
      }))
    );
  }, []);

  const isLoading = isSequentialLoading || loaderStates.some(state => state.isLoading);
  const hasError = loaderStates.some(state => state.error);
  const allData = loaderStates.map(state => state.data);
  const errors = loaderStates.map(state => state.error).filter(Boolean);
  const allReady = loaderStates.every(state => state.isReady);
  const allVisible = loaderStates.every(state => state.isVisible);

  const progress = {
    completed: loaderStates.filter(state => state.isReady).length,
    total: loaders.length,
    percentage: Math.round((loaderStates.filter(state => state.isReady).length / loaders.length) * 100)
  };

  return {
    isLoading,
    isSequentialLoading,
    hasError,
    allReady,
    allVisible,
    allData,
    errors,
    loaderStates,
    progress,
    reloadAll,
    currentLoaderIndex,
    currentLoader: loaderStates[currentLoaderIndex] || null
  };
};
