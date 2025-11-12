import React from "react";
import Product from "./Shop/Product";
import { useSelector } from "react-redux";
import styles from "../pages/Wishlist.module.css";

function Wishlist() {
  const wishlistItems = useSelector((state) => state.wishlist.items);
  return (
    <div className="container">
      <div className={styles.wishlistCon}>
        <h1 className={styles.h1}>Wishlist </h1>
        <div className={styles.wishlist}>
          {wishlistItems && wishlistItems.length > 0 ? (
            wishlistItems.map((item, index) => (
              <Product key={index} product={item} />
            ))
          ) : (
            <p>Your wishlist is empty.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Wishlist;
