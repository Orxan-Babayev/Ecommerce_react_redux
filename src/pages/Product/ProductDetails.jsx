import ProductImage from "./ProductImage";

function ProductDetails({ product, enableMagnifier }) {
  return (
    <div className="product-details">
      <ProductImage
        src={product.image}
        alt={product.title}
        img={product.smallImages}
        enableMagnifier={enableMagnifier}
      />
      <h2>{product.title}</h2>
      <p>{product.description}</p>
      <p>Category: {product.category_name}</p>
      <p>{product.InStock.stockCount}</p>
    </div>
  );
}

export default ProductDetails;
