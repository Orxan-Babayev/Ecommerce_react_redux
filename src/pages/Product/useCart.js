import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addItem,
  selectCartItems,
  updateCartItemQuantity,
} from "../../redux/slice/cartSlice";

const useCart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");

  const handleSizeChange = useCallback((size) => {
    setSelectedSize(size);
    setQuantity(1); // Reset quantity when size changes
  }, []);

  const handleQuantityChange = useCallback((newQuantity) => {
    setQuantity(Math.max(1, newQuantity)); // Ensure quantity is at least 1
  }, []);

  const handleAddToCart = useCallback(
    (product) => {
      if (!product) {
        return { success: false, message: "Product not available" };
      }
      if (!selectedSize) {
        return { success: false, message: "Please select a size" };
      }
      if (quantity > product.stockCount) {
        return {
          success: false,
          message: `Only ${product.stockCount} items available in stock`,
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
    },
    [dispatch, selectedSize, quantity, cartItems]
  );

  return {
    quantity,
    selectedSize,
    handleSizeChange,
    handleQuantityChange,
    handleAddToCart,
  };
};

export default useCart;
