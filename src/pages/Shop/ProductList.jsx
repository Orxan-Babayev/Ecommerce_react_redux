import styles from "./Shop.module.scss";
import Spinner from "./Spinner";
import Error from "./Error";
import NoData from "./NoData";
import Product from "./Product";

const ProductList = ({ products, loading, error, onRetry }) => {
  return (
    <>
      {loading && <Spinner primary="5rem" />}
      {error && <Error error={error} onRetry={onRetry} />}
      {!loading && !error && !products.length ? (
        <NoData />
      ) : (
        <div className={styles.products}>
          {products.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </div>
      )}
    </>
  );
};

export default ProductList;
