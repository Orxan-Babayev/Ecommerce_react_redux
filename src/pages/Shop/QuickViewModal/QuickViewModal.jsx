import { useEffect, useRef } from "react";
import "./QuickView.css";
import { useCart } from "../../Product/useCart";
import { useWishlist } from "../../Product/useWishlist";
import ProductDetails from "../../Product/ProductDetails";
import ProductActions from "../../Product/ProductActions";
import SizeSelector from "../../Product/SizeSelector";

const QuickViewModal = ({ product, isOpen, onClose }) => {
  const {
    quantity,
    selectedSize,
    handleSizeChange,
    handleQuantityChange,
    handleAddToCart,
  } = useCart(product);

  const { isInWishlist, handleToggleWishlist } = useWishlist(product);

  const onAddToCart = () => {
    const { success, message } = handleAddToCart();
    if (!success) {
      alert(message); // Replace with toast notification in production
    }
  };

  const modalRef = useRef(null);

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

  return (
    <div className="quick-view-modal">
      <div className="quick-view-modal-content" ref={modalRef}>
        <span className="quick-view-close" onClick={onClose}>
          &times;
        </span>
        <div>
          <ProductDetails product={product} enableMagnifier={false} />
          {product.sizes && (
            <SizeSelector
              sizes={product.sizes}
              selectedSize={selectedSize}
              handleSizeChange={handleSizeChange}
            />
          )}
          <ProductActions
            quantity={quantity}
            onQuantityChange={handleQuantityChange}
            onAddToCart={onAddToCart}
            isInWishlist={isInWishlist}
            onToggleWishlist={handleToggleWishlist}
          />
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;
