import React from "react";

function Button({ children, className, onClick, ...props }) {
  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
