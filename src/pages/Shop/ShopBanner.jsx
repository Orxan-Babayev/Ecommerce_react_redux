import React, { memo } from "react";
import styles from "./ShopBanner.module.css";

function ShopBanner({ selectedCategory, selectedSubcategory }) {
  return (
    <section className={styles.wrapper}>
      <h2 className={styles.bannerHeader}>
        {selectedCategory ? selectedCategory : "All products"}
      </h2>
    </section>
  );
}

const MemoizeShopBanner = memo(ShopBanner);

export default MemoizeShopBanner;
