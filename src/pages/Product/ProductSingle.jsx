import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductById, resetProduct } from "../../redux/slice/detailSlice";
import { useParams } from "react-router-dom";
import useWishlist from "./useWishlist";
import useCart from "./useCart";
import ProductDetails from "./ProductDetails";
import ProductActions from "./ProductActions";
import ProductImage from "./ProductImage";
import styles from "./ProductSingle.module.css";
import Tabs from "./Tabs";

const ProductSingle = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const product = useSelector((state) => state.productdetail.product);
  const loading = useSelector((state) => state.productdetail.loading);
  const error = useSelector((state) => state.productdetail.error);

  const { isInWishlist, handleToggleWishlist } = useWishlist();

  const {
    quantity,
    selectedSize,
    handleSizeChange,
    handleQuantityChange,
    handleAddToCart,
  } = useCart(product);

  useEffect(() => {
    dispatch(fetchProductById(id));
    return () => {
      dispatch(resetProduct()); // Clear product on unmout
    };
  }, [dispatch, id]);

  const onAddToCart = () => {
    if (!product) {
      alert("Product not loaded yet");
      return;
    }
    const { success, message } = handleAddToCart(product);
    if (!success) {
      alert(message); // Replace with toast notification in production
    } else {
      alert("Product added to cart ");
    }
  };

  if (loading) return <div> Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div className={styles.container}>
      <div className={styles.detail}>
        <ProductImage
          src={product.image}
          alt={product.title}
          img={product.smallImages}
        />
        <div>
          <ProductDetails
            product={product}
            selectedSize={selectedSize}
            handleSizeChange={handleSizeChange}
          />

          <ProductActions
            product={product}
            selectedSize={selectedSize}
            quantity={quantity}
            onQuantityChange={handleQuantityChange}
            onAddToCart={onAddToCart}
            isInWishlist={isInWishlist}
            onToggleWishlist={handleToggleWishlist}
          />
        </div>
      </div>
      <Tabs />
    </div>
  );
};

export default ProductSingle;
