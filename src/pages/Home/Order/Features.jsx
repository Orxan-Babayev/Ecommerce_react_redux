import React from "react";
import styles from "./Features.module.css";

const Feature = ({ feature }) => {
  return (
    <li className={styles.item}>
      <div className={styles.icon}> {feature.icon}</div>
      <div className={styles.text}>
        <span className={styles.title}>{feature.title}</span>
        <span className={styles.subtitle}>{feature.subtitle}</span>
      </div>
    </li>
  );
};

export default Feature;
