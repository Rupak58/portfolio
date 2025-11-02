import React from 'react';
import './LoadingSpinner.css';

const LoadingSpinner = ({ size = 'medium' }) => {
  const spinnerClass = `spinner spinner-${size}`;
  
  return (
    <div className="loading-container">
      <div className={spinnerClass}></div>
    </div>
  );
};

export default LoadingSpinner;