import React from 'react';
import PropTypes from 'prop-types';
import ContentLoader from '../ContentLoader/ContentLoader';
import { useSequentialLoaderWithDelay } from '../../../hooks/useSequentialLoader';
import './SequentialLoader.css';

const SequentialLoader = ({ 
  loaders, 
  renderContent, 
  renderSkeleton = null,
  delayBetweenElements = 200,
  showProgress = true,
  className = '',
  onComplete = null,
  onError = null
}) => {
  // Usar el hook de carga secuencial
  const {
    isLoading,
    isSequentialLoading,
    hasError,
    allReady,
    allVisible,
    allData,
    errors,
    loaderStates,
    progress,
    reloadAll
  } = useSequentialLoaderWithDelay(loaders, delayBetweenElements);

  // Callback cuando todo está completo
  React.useEffect(() => {
    if (allReady && onComplete) {
      onComplete(allData);
    }
  }, [allReady, allData, onComplete]);

  // Callback cuando hay error
  React.useEffect(() => {
    if (hasError && onError) {
      onError(errors);
    }
  }, [hasError, errors, onError]);

  // Si está cargando, mostrar skeleton o loader
  if (isLoading) {
    if (renderSkeleton) {
      return renderSkeleton(loaderStates, progress);
    }
    
    return (
      <div className={`sequential-loader ${className}`}>
        {showProgress && (
          <div className="sequential-progress">
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${progress.percentage}%` }}
              />
            </div>
            <div className="progress-text">
              Cargando... {progress.completed}/{progress.total} ({progress.percentage}%)
            </div>
          </div>
        )}
        
        <div className="sequential-skeletons">
          {loaderStates.map((state, index) => (
            <div 
              key={index}
              className={`skeleton-item ${state.isReady ? 'ready' : 'loading'}`}
              style={{ 
                animationDelay: `${index * delayBetweenElements}ms`,
                opacity: state.isReady ? 1 : 0.3
              }}
            >
              <ContentLoader 
                isLoading={!state.isReady} 
                skeleton={true}
                height="200px"
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Si hay error, mostrar mensaje de error
  if (hasError) {
    return (
      <div className={`sequential-error ${className}`}>
        <div className="error-icon">⚠️</div>
        <h3>Error al cargar el contenido</h3>
        <p>Algunos elementos no pudieron cargarse correctamente.</p>
        <button onClick={reloadAll} className="retry-button">
          Reintentar
        </button>
        
        {errors.length > 0 && (
          <div className="error-details">
            <h4>Detalles de errores:</h4>
            {errors.map((error, index) => (
              <div key={index} className="error-item">
                <strong>Error {index + 1}:</strong> {error.message || 'Error desconocido'}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Si todo está listo, renderizar el contenido
  if (allReady) {
    return (
      <div className={`sequential-content ${className}`}>
        {renderContent(allData, loaderStates, { allVisible, progress })}
      </div>
    );
  }

  // Estado de carga inicial
  return (
    <div className={`sequential-loader ${className}`}>
      <ContentLoader />
    </div>
  );
};

SequentialLoader.propTypes = {
  loaders: PropTypes.arrayOf(
    PropTypes.shape({
      fetchFunction: PropTypes.func.isRequired,
      dependencies: PropTypes.array,
      options: PropTypes.object
    })
  ).isRequired,
  renderContent: PropTypes.func.isRequired,
  renderSkeleton: PropTypes.func,
  delayBetweenElements: PropTypes.number,
  showProgress: PropTypes.bool,
  className: PropTypes.string,
  onComplete: PropTypes.func,
  onError: PropTypes.func
};

export default SequentialLoader;
