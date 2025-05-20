import React from "react";

function QuantityControl({ quantity, onQuantityControl }) {
  return (
    <div>
      <button onClick={() => onQuantityControl(quantity - 1)}>-</button>
      <span>{quantity}</span>
      <button onClick={() => onQuantityControl(quantity + 1)}>+</button>
    </div>
  );
}

export default QuantityControl;
