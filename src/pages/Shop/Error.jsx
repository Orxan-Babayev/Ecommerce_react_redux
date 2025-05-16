import React from "react";
import "./Error.css";

const Error = ({ error, onRetry }) => {
  return (
    <div className="error" role="alert" aria-live="assertive">
      <span className="error-icon">⚠️</span>
      <p className="error-message">{error}</p>
      {onRetry && (
        <button className="error-retry" onClick={onRetry} aria-label="Retry">
          Retry
        </button>
      )}
    </div>
  );
};

export default Error;
