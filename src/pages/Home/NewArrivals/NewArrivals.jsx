import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchNewArrivals,
  selectNewArrivalsData,
  selectNewArrivalsSkip,
  selectNewArrivalsHasMore,
} from "../../../redux/slice/productSlice";
import styles from "./NewArrivals.module.scss";

const NewArrivals = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectNewArrivalsData);

  const newArrivals = useSelector(selectNewArrivalsData);

  const start = useSelector(selectNewArrivalsSkip);
  const hasMore = useSelector(selectNewArrivalsHasMore);
  const { loading, error } = useSelector((state) => state.product);
  console.log(newArrivals);

  // useEffect(() => {
  //   dispatch(fetchNewArrivals({ start: 0, batchSize: 8 }));
  // }, [dispatch]);

  useEffect(() => {
    if (newArrivals.length === 0 && !loading) {
      dispatch(fetchNewArrivals({ start: 0, limit: 8 }));
    }
  }, [dispatch]); // Remove newArrivals.length dependency
  // Handle "Discover More" click to load 4 more products
  const handleLoadMore = () => {
    dispatch(fetchNewArrivals({ start, batchSize: 4 }));
  };
  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.main}>New Arrivals</h3>
        <p>We have your occasion covered</p>
      </div>
      {newArrivals.length ? (
        <div className={styles.items}>
          {newArrivals.map((product) => (
            <div key={product.id} className={styles.item}>
              <Link
                to={`/product/${product.id}`}
                className={styles.link}
                aria-label={`View ${product.title}`}
              >
                <div className={styles.imageWrapper}>
                  <img
                    className={styles.img}
                    src={product.image}
                    alt={product.title}
                    loading="lazy"
                  />
                </div>
                <div className={styles.card}>
                  <h3 className={styles.title}>{product.title}</h3>
                  <span className={styles.price}>
                    {/* `${product.price.toFixed(2)}` */}
                  </span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className={styles.error} aria-live="assertive">
          Error: {error}
        </div>
      ) : loading ? (
        <div className={styles.loader} aria-live="polite">
          Loading new arrivals...
        </div>
      ) : (
        <div className={styles.empty} aria-live="polite">
          No new arrivals available
        </div>
      )}
      {hasMore && (
        <button
          onClick={handleLoadMore}
          className={styles.button}
          disabled={loading}
          aria-label="Load 4 more new arrivals"
        >
          {loading ? "Loading..." : "Discover More"}
        </button>
      )}
    </section>
  );
};

export default NewArrivals;
