import React from "react";
import { Link } from "react-router-dom";
import SB1 from "../../../assets/SB1.jpg";
import SB2 from "../../../assets/sb2.jpg";
import SB3 from "../../../assets/SB3.jpg";
import styles from "./TopCategories.module.scss";

const TopCategories = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.main}> Explore Top Categories</h3>
      </div>
      <div className={styles.items}>
        <div className={styles.item}>
          <Link>
            <div>
              <img className={styles.img} src={SB1} alt="" />
            </div>
            <div className={styles.card}>
              <h3 className={styles.title}>Spring Forward!</h3>
              <button className={styles.button}>Discover More</button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TopCategories;
