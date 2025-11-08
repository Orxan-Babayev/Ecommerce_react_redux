import { FiUser } from "react-icons/fi";
import { LuHeart } from "react-icons/lu";
import { LuShoppingCart } from "react-icons/lu";
import { Link } from "react-router-dom";

import styles from "./header.module.css";
import React from "react";

const HeaderIcons = React.memo(function HeaderIcons({
  wishlistCount,
  onWishlistClick,
}) {
  return (
    <div className={styles.user}>
      <FiUser
        className={styles.icon}
        aria-label="User account"
        title="User"
        role="button"
      />

      <div>
        <LuHeart
          className={styles.icon}
          onClick={onWishlistClick}
          aria-label={`Wishlist, ${wishlistCount} items`}
          role="button"
          title="wishlist"
        />

        {wishlistCount}
      </div>
      <Link to={"/cart"} aria-label="Shopping cart">
        <LuShoppingCart className={styles.icon} />
      </Link>
    </div>
  );
});

export default HeaderIcons;
