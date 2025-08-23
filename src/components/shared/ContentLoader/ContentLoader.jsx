import React from 'react';
import PropTypes from 'prop-types';
import './ContentLoader.css';

const ContentLoader = ({ 
  isLoading, 
  children, 
  skeleton = false, 
  height = 'auto',
  className = '',
  showSpinner = true 
}) => {
  if (!isLoading) {
    return children;
  }

  if (skeleton) {
    return (
      <div className={`content-loader-skeleton ${className}`} style={{ height }}>
        <div className="skeleton-header"></div>
        <div className="skeleton-content">
          <div className="skeleton-line"></div>
          <div className="skeleton-line"></div>
          <div className="skeleton-line short"></div>
        </div>
        <div className="skeleton-footer">
          <div className="skeleton-button"></div>
          <div className="skeleton-button"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`content-loader ${className}`} style={{ height }}>
      {showSpinner && (
        <div className="loader-spinner">
          <div className="spinner"></div>
          <p>Cargando...</p>
        </div>
      )}
    </div>
  );
};

ContentLoader.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  children: PropTypes.node,
  skeleton: PropTypes.bool,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
  showSpinner: PropTypes.bool
};

export default ContentLoader;
