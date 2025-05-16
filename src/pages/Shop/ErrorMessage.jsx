const ErrorMessage = ({ error, className }) => {
  return error ? <span className={className}>{error}</span> : null;
};

export default ErrorMessage;
