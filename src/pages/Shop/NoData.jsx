import React from "react";
import styles from "./NoData.module.css";

const NoData = () => {
  return (
    <div className={styles.nodata} role="status" aria-live="polite">
      <span className={styles.nodataicon}>ℹ️</span>
      <p className={styles.nodatamessage}>No data found</p>
    </div>
  );
};

export default NoData;
