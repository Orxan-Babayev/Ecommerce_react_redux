import React from "react";
import styles from "./Product.module.css";
import { Link } from "react-router-dom";

const Product = ({ product }) => {
  return (
    <div className={styles.product}>
      <Link to={`/product/${product.id}`} aria-label={`View ${product.title}`}>
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          className={styles.image}
        />
      </Link>
      <h3 className={styles.productTitle}>{product.title}</h3>
      <p className={styles.productPrice}>${Number(product.price).toFixed(2)}</p>
    </div>
  );
};

export default Product;
