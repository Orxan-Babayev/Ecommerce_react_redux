import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductById } from "../../redux/slice/detailSlice";
import { useParams } from "react-router-dom";
import useWishlist from "./useWishlist";
import useCart from "./useCart";
import ProductDetails from "./ProductDetails";
import ProductActions from "./ProductActions";
import SizeSelector from "./SizeSelector";

const ProductSingle = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const item = useSelector((state) =>
    state.productdetail.products.find((product) => product.id === Number(id))
  );

  const { isInWishlist, handleToggleWishlist } = useWishlist(
    item || { id: Number(id) }
  );

  const {
    quantity,
    selectedSize,
    handleSizeChange,
    handleQuantityChange,
    handleAddToCart,
  } = useCart(item);

  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [dispatch, id]);

  const onAddToCart = () => {
    const { success, message } = handleAddToCart();
    if (!success) {
      alert(message); // Replace with toast notification in production
    }
  };

  if (!item) {
    return <div>Product not found</div>;
  }

  return (
    <div>
      <ProductDetails product={item} enableMagnifier={true} />
      {item.sizes && (
        <SizeSelector
          sizes={item.sizes}
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
  );
};

export default ProductSingle;
