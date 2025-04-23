import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./QuickView.css";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../../redux/slice/wishlistSlice";
import {
  addItem,
  updateCartItemQuantity,
} from "../../../redux/slice/cartSlice"; // Import actions
import { FaHeart } from "react-icons/fa";

const QuickViewModal = ({ product, isOpen, onClose }) => {
  const wishlistItems = useSelector((state) => state.wishlist.items);
  // get arr
  const cartItems = useSelector((state) => state.cart.items);
  // get arr

  const dispatch = useDispatch();

  const [selectedSize, setSelectedSize] = useState("");
  // size state
  const [quantity, setQuantity] = useState(1);
  // why i use state i have state in quantity
  const modalRef = useRef(null);

  const isInWishlist = (product) => {
    return wishlistItems.some((item) => item.id === product.id);
  };
  // product is find if product in array it gives in some true

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      console.log(product);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleAddToCart = () => {
    if (selectedSize) {
      const existingCartItem = cartItems.find(
        (item) => item.id === product.id && item.size === selectedSize
      );
      if (existingCartItem) {
        const newQuantity = existingCartItem.quantity + quantity;
        dispatch(
          updateCartItemQuantity({ id: product.id, quantity: newQuantity })
        );
      } else {
        dispatch(addItem({ ...product, quantity, size: selectedSize }));
      }
      setQuantity(1);
      setSelectedSize("");
      shortcuts;
    } else {
      alert("Please select a size.");
    }
  };

  const handleToggleWishlist = () => {
    if (isInWishlist(product)) {
      dispatch(removeFromWishlist(product));
    } else {
      dispatch(addToWishlist(product));
    }
  };

  return (
    <div className="quick-view-modal">
      <div className="quick-view-modal-content" ref={modalRef}>
        <span className="quick-view-close" onClick={onClose}>
          &times;
        </span>
        <div>
          <div>
            <img src={product.image} alt="" />
            <h2>{product.title}</h2>
            <p>{product.price}</p>
            <p>{product.description}</p>
            <p>Category: {product.category.name}</p>
            <p>In Stock: {product.InStock.stockCount}</p>
            {product.sizes && (
              <div className="product_sizes">
                <p>Size:</p>
                <ul>
                  {product.sizes.map((size) => (
                    <li
                      key={size.id}
                      onClick={() => setSelectedSize(size.name)}
                      className={selectedSize === size.name ? "selected" : ""}
                    >
                      <span>{size.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="product_detailed_btns">
              <div className="product_quantity_actions_detailed">
                <button
                  onClick={() =>
                    setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1))
                  }
                >
                  -
                </button>
                <span>{quantity}</span>
                <button
                  onClick={() =>
                    setQuantity((prevQuantity) => prevQuantity + 1)
                  }
                >
                  +
                </button>
              </div>
              <button
                className="product_detailed_add_btn"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
              <button
                className="product_detailed_wish_btn"
                onClick={handleToggleWishlist}
              >
                {isInWishlist(product) ? <FaHeart color="red" /> : <FaHeart />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;
