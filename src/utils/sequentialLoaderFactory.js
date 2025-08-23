/**
 * Factory para crear configuraciones de SequentialLoader de manera consistente
 * Simplifica la creación de loaders y proporciona patrones reutilizables
 */

import { useMemo, useCallback } from 'react';

/**
 * Crea configuraciones estándar de loaders para componentes comunes
 */
export const createStandardLoaders = {
  // Loader para una sola función fetch
  single: (fetchFunction, dependencies = [], options = {}) => [
    {
      fetchFunction,
      dependencies,
      options: { delay: 0, ...options }
    }
  ],

  // Loader para fetch principal + datos relacionados
  withRelated: (mainFetch, relatedFetch, dependencies = [], options = {}) => [
    {
      fetchFunction: mainFetch,
      dependencies,
      options: { delay: 0, ...options.main }
    },
    {
      fetchFunction: relatedFetch,
      dependencies,
      options: { delay: 100, ...options.related }
    }
  ],

  // Loader para fetch con filtros
  withFilters: (fetchFunction, filters, dependencies = [], options = {}) => [
    {
      fetchFunction: () => fetchFunction(filters),
      dependencies: [filters, ...dependencies],
      options: { delay: 0, ...options }
    }
  ],

  // Loader para múltiples fuentes de datos independientes
  multiple: (fetchFunctions, dependencies = [], options = {}) => 
    fetchFunctions.map((fetchFunction, index) => ({
      fetchFunction,
      dependencies,
      options: { delay: index * 50, ...options }
    }))
};

/**
 * Crea renderContent estándar con orden de aparición predefinido
 */
export const createStandardRenderContent = (config) => {
  return useCallback((allData, loaderStates, { allVisible, progress }) => {
    const elements = config.elements.map((element, index) => ({
      ...element,
      style: {
        ...element.style,
        opacity: allVisible ? 1 : 0,
        transform: allVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: `all 0.6s ease ${index * 0.2}s`
      }
    }));

    return config.render(allData, elements, { allVisible, progress });
  }, config.dependencies || []);
};

/**
 * Crea skeleton estándar basado en el tipo de componente
 */
export const createStandardSkeleton = (type, isDarkTheme) => {
  const skeletonStyle = {
    background: "var(--color-border-light)",
    borderRadius: "8px"
  };

  const skeletons = {
    list: () => (
      <div className="exploration-section" data-theme={isDarkTheme ? "dark" : "light"}>
        <div className="exploration-container">
          {/* Header skeleton */}
          <div className="section-header">
            <div style={{ height: "3rem", ...skeletonStyle, marginBottom: "1rem" }} />
            <div style={{ height: "2rem", ...skeletonStyle, width: "70%" }} />
          </div>
          
          {/* Grid skeleton */}
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", 
            gap: "2rem",
            marginTop: "2rem" 
          }}>
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} style={{ height: "350px", ...skeletonStyle }} />
            ))}
          </div>
        </div>
      </div>
    ),

    detail: () => (
      <div className="exploration-section" data-theme={isDarkTheme ? "dark" : "light"}>
        <div className="exploration-container">
          {/* Title skeleton */}
          <div style={{ height: "4rem", ...skeletonStyle, marginBottom: "2rem" }} />
          
          {/* Content skeleton */}
          <div style={{ display: "grid", gap: "1rem" }}>
            <div style={{ height: "1.5rem", ...skeletonStyle }} />
            <div style={{ height: "1.5rem", ...skeletonStyle, width: "90%" }} />
            <div style={{ height: "1.5rem", ...skeletonStyle, width: "75%" }} />
          </div>

          {/* Sections skeleton */}
          <div style={{ marginTop: "3rem", display: "grid", gap: "3rem" }}>
            {[1, 2].map(i => (
              <div key={i}>
                <div style={{ height: "2.5rem", ...skeletonStyle, marginBottom: "1.5rem", width: "200px" }} />
                <div style={{ 
                  display: "grid", 
                  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", 
                  gap: "1.5rem" 
                }}>
                  {[1, 2, 3].map(j => (
                    <div key={j} style={{ height: "200px", ...skeletonStyle }} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),

    filters: () => (
      <div className="exploration-section" data-theme={isDarkTheme ? "dark" : "light"}>
        <div className="exploration-container">
          {/* Header skeleton */}
          <div className="section-header">
            <div style={{ height: "2rem", ...skeletonStyle, marginBottom: "1rem", width: "150px" }} />
            <div style={{ height: "3rem", ...skeletonStyle, marginBottom: "1rem" }} />
            <div style={{ height: "1.5rem", ...skeletonStyle, width: "70%" }} />
          </div>

          {/* Filters skeleton */}
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "2rem" }}>
            {[1, 2, 3].map(i => (
              <div key={i} style={{ height: "3rem", ...skeletonStyle, width: "200px" }} />
            ))}
          </div>

          {/* Content skeleton */}
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", 
            gap: "2rem" 
          }}>
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} style={{ height: "350px", ...skeletonStyle }} />
            ))}
          </div>
        </div>
      </div>
    )
  };

  return useCallback(() => skeletons[type] ? skeletons[type]() : skeletons.list(), [isDarkTheme]);
};

/**
 * Hook personalizado que combina todas las utilidades
 */
export const useSequentialComponent = (config) => {
  const loaders = useMemo(() => {
    switch (config.type) {
      case 'single':
        return createStandardLoaders.single(config.fetchFunction, config.dependencies, config.options);
      case 'withFilters':
        return createStandardLoaders.withFilters(config.fetchFunction, config.filters, config.dependencies, config.options);
      case 'withRelated':
        return createStandardLoaders.withRelated(config.mainFetch, config.relatedFetch, config.dependencies, config.options);
      case 'multiple':
        return createStandardLoaders.multiple(config.fetchFunctions, config.dependencies, config.options);
      default:
        return config.loaders;
    }
  }, [config]);

  const renderSkeleton = useMemo(() => 
    createStandardSkeleton(config.skeletonType || 'list', config.isDarkTheme),
    [config.skeletonType, config.isDarkTheme]
  );

  return {
    loaders,
    renderSkeleton,
    // Configuración estándar para SequentialLoader
    sequentialConfig: {
      delayBetweenElements: config.delayBetweenElements || 200,
      showProgress: config.showProgress !== false, // true por defecto
      onComplete: config.onComplete || ((data) => console.log('✅ Carga completada:', data)),
      onError: config.onError || ((errors) => console.error('❌ Error en carga:', errors))
    }
  };
};

/**
 * Patrones comunes de configuración para diferentes tipos de componentes
 */
export const componentPatterns = {
  // Patrón para listas con filtros (como PostList)
  filteredList: (fetchFunction, filters, isDarkTheme) => ({
    type: 'withFilters',
    fetchFunction,
    filters,
    skeletonType: 'filters',
    isDarkTheme,
    delayBetweenElements: 200
  }),

  // Patrón para páginas de detalle (como DetallesLineaDeInvestigación)
  detailPage: (mainFetch, relatedFetch, dependencies, isDarkTheme) => ({
    type: 'withRelated',
    mainFetch,
    relatedFetch,
    dependencies,
    skeletonType: 'detail',
    isDarkTheme,
    delayBetweenElements: 300
  }),

  // Patrón para listas simples (como ExtensionLista)
  simpleList: (fetchFunction, isDarkTheme) => ({
    type: 'single',
    fetchFunction,
    skeletonType: 'list',
    isDarkTheme,
    delayBetweenElements: 200
  }),

  // Patrón para dashboards con múltiples datos
  dashboard: (fetchFunctions, isDarkTheme) => ({
    type: 'multiple',
    fetchFunctions,
    skeletonType: 'list',
    isDarkTheme,
    delayBetweenElements: 250
  })
};

/**
 * Utilidad para crear animaciones de aparición escalonada
 */
export const createStaggeredAnimation = (allVisible, baseDelay = 0, staggerDelay = 0.1) => {
  return (index) => ({
    opacity: allVisible ? 1 : 0,
    transform: allVisible ? 'translateY(0)' : 'translateY(20px)',
    transition: `all 0.6s ease ${baseDelay + (index * staggerDelay)}s`
  });
};

/**
 * Constantes para delays estándar
 */
export const ANIMATION_DELAYS = {
  HEADER: 0,
  FILTERS: 0.2,
  CONTENT: 0.4,
  STATS: 0.6,
  CARDS_START: 0.4,
  CARD_STAGGER: 0.1
};
