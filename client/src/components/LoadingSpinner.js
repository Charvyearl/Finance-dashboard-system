import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="loading-container">
      <div>
        <div className="spinner"></div>
        <div className="loading-text">Loading Finance Dashboard...</div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
