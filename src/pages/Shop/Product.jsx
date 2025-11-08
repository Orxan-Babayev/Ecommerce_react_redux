import React, { memo, useState } from "react";
import styles from "./Product.module.css";
import { Link } from "react-router-dom";
import { LuHeart } from "react-icons/lu";
import { LuShoppingCart } from "react-icons/lu";
import Button from "../Product/Button";
import useCart from "../Product/useCart";
import useWishlist from "../Product/useWishlist";
import { FaHeart } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import QuickViewModal from "./QuickViewModal/QuickViewModal";
import SizeModal from "./SizeModal";

const Product = ({ product }) => {
  const { handleAddToCart } = useCart();
  const { isInWishlist, handleToggleWishlist } = useWishlist();
  const [isOpen, setIsOpen] = useState(false);
  const [isCart, setIsCart] = useState(false);

  const onAddToCart = () => {
    if (!product) {
      alert("Product not loaded yet");
      return;
    }
    const { success, message } = handleAddToCart(product);
    alert(success ? "Product added to cart" : message);
    // if (!success) {
    //   alert(message);
    // } else {
    //   alert("Product added to cart");
    // }
  };

  const onOpen = () => setIsOpen((isOpen) => !isOpen);
  const onCart = () => setIsCart((isCart) => !isCart);

  return (
    <div className={styles.product}>
      <Link
        to={`/product/${product.id}`}
        aria-label={`View ${product.title}`}
        className={styles.linkImg}
      >
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          decoding="async" // Optimize rendering
          className={styles.image}
        />
      </Link>
      <div className={styles.imgIcon}>
        <Button onClick={() => onOpen()} aria-label="Quick View">
          <CiSearch />
        </Button>
        <Button
          onClick={() => handleToggleWishlist(product)}
          aria-label="Add to Wishlist"
        >
          {isInWishlist(product) ? <FaHeart /> : <LuHeart />}
        </Button>
        <Button onClick={() => onCart()} aria-label="Add to Cart">
          <LuShoppingCart />
        </Button>
      </div>
      {isOpen && (
        <QuickViewModal product={product} isOpen={isOpen} onClose={onOpen} />
      )}
      {isCart && (
        <SizeModal product={product} isCart={isCart} onClose={onCart} />
      )}
      <div className={styles.text}>
        <p className={styles.title}>{product.title}</p>
        <span className={styles.price}>
          ${Number(product.price).toFixed(2)}
        </span>
      </div>
    </div>
  );
};

// export default memo(Product);

const MemoizedProduct = memo(Product);

// Export the named memoized component
export default MemoizedProduct;
