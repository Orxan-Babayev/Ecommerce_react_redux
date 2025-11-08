import React from "react";
import styles from "./Delivery.module.css";

function Delivery() {
  return (
    <div className={styles.delivery}>
      <span>
        Your order is eligible for <strong>FREE Delivery.</strong>
      </span>
      <div className={styles.deliveryHighlight}>
        <span></span>
      </div>
    </div>
  );
}

export default Delivery;
