import React from "react";
import styles from "./QuantityControl.module.css";

function QuantityControl({ quantity, onQuantityChange }) {
  return (
    <div className={styles.quantityBtn}>
      <button
        className={` ${styles.btn} ${styles.right}`}
        onClick={() => onQuantityChange(quantity - 1)}
      >
        -
      </button>
      <div className={styles.quantity}>{quantity}</div>
      <button
        className={` ${styles.btn} ${styles.left}`}
        onClick={() => onQuantityChange(quantity + 1)}
      >
        +
      </button>
    </div>
  );
}

export default QuantityControl;
