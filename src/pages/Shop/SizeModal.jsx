import React, { useEffect, useRef } from "react";
import useCart from "../Product/useCart";
import ProductDetails from "../Product/ProductDetails";
import styles from "./SizeModal.module.css";
import QuantityControl from "../Product/QuantityControl";
import Button from "../Product/Button";
import SizeSelector from "../Product/SizeSelector";

const SizeModal = ({ product, isCart, onClose }) => {
  const {
    quantity,
    selectedSize,
    handleSizeChange,
    handleQuantityChange,
    handleAddToCart,
  } = useCart(product);

  const onAddToCart = () => {
    const { success, message } = handleAddToCart(product);
    if (!success) {
      alert(message);
    } else {
      alert("Product added to cart");
    }
  };

  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isCart) {
      document.addEventListener("mousedown", handleClickOutside);
      console.log(product);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isCart, onClose]);

  if (!isCart) return null;

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent} ref={modalRef}>
        <span onClick={onClose} className={styles.modalClose}>
          &times;
        </span>
        <div className={styles.add}>
          <h2 className={styles.title}>{product.title}</h2>
          <span className={styles.price}>${product.price.toFixed(2)}</span>
          <span className={styles.size}>
            Size:{selectedSize ? selectedSize : null}
          </span>

          {product.sizes?.length > 0 && (
            <SizeSelector
              sizes={product.sizes}
              selectedSize={selectedSize}
              handleSizeChange={handleSizeChange}
            />
          )}

          <QuantityControl
            quantity={quantity}
            onQuantityChange={handleQuantityChange}
          />
          <Button className={styles.addBtn} onClick={onAddToCart}>
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SizeModal;
