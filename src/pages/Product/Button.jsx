import React from "react";

function Button({ children, className, onClick, ...props }) {
  return (
    <button className={className} onClick={onClick} {...props}>
      {children}
    </button>
  );
}

export default Button;
