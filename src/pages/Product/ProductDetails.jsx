import SizeSelector from "./SizeSelector";
import styles from "./ProductDetails.module.css";

function ProductDetails({ product, selectedSize, handleSizeChange }) {
  console.log(product);
  return (
    <div className="product-details">
      <h1 className={styles.title}>{product.title}</h1>
      <span className={styles.price}>${product.price}</span>
      {/* <p>{product.description}</p> */}
      <span className={styles.category}>
        Category: {product.category?.name?.toUpperCase()}
      </span>
      <span className={styles.size}>
        Size:{selectedSize ? selectedSize : null}
      </span>
      <p className={styles.stock}>
        In stock: {product.stockCount} - Ready to ship
      </p>

      {product.sizes?.length > 0 && (
        <SizeSelector
          sizes={product.sizes}
          selectedSize={selectedSize}
          handleSizeChange={handleSizeChange}
        />
      )}
    </div>
  );
}

export default ProductDetails;
