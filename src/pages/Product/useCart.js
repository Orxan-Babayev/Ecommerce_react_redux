import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, updateCartItemQuantity } from "../../redux/slice/cartSlice";

const useCart = (product) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");

  const handleSizeChange = (size) => {
    setSelectedSize(size);
    setQuantity(1); // Reset quantity when size changes
  };

  const handleQuantityChange = (newQuantity) => {
    setQuantity(Math.max(1, newQuantity)); // Ensure quantity is at least 1
  };

  const handleAddToCart = () => {
    if (!product) {
      return { success: false, message: "Product not available" };
    }
    if (!selectedSize) {
      return { success: false, message: "Please select a size" };
    }
    if (quantity > product.InStock.stockCount) {
      return {
        success: false,
        message: `Only ${product.InStock.stockCount} items available in stock`,
      };
    }

    const existingCartItem = cartItems.find(
      (item) => item.id === product.id && item.size === selectedSize
    );
    if (existingCartItem) {
      const newQuantity = existingCartItem.quantity + quantity;
      dispatch(
        updateCartItemQuantity({
          id: product.id,
          size: selectedSize,
          quantity: newQuantity,
        })
      );
    } else {
      dispatch(addItem({ ...product, quantity, size: selectedSize }));
    }

    setQuantity(1); // Reset quantity after adding
    // Optionally keep selectedSize for repeated additions
    return { success: true, message: "Item added to cart" };
  };

  return {
    quantity,
    selectedSize,
    handleSizeChange,
    handleQuantityChange,
    handleAddToCart,
  };
};

export default useCart;
