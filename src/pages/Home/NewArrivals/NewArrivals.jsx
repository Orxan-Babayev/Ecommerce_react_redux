import React, { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchNewArrivals,
  selectNewArrivalsData,
  selectNewArrivalsSkip,
  selectNewArrivalsHasMore,
  selectNewArrivalsLoading,
  selectNewArrivalsError,
} from "../../../redux/slice/productSlice";
import SectionWrapper from "../SectionWrapper";
import Product from "../../Shop/Product";
import Button from "../../Product/Button";
import styles from "./NewArrivals.module.scss";

const NewArrivals = memo(() => {
  const dispatch = useDispatch();
  const newArrivals = useSelector(selectNewArrivalsData);
  const start = useSelector(selectNewArrivalsSkip);
  const hasMore = useSelector(selectNewArrivalsHasMore);
  const loading = useSelector(selectNewArrivalsLoading);
  const error = useSelector(selectNewArrivalsError);

  const handleLoadMore = () => {
    if (loading) return; // prevent multiple simultaneous fetches
    dispatch(fetchNewArrivals({ start, batchSize: 4 }));
  };

  return (
    <SectionWrapper
      title="New Arrivals"
      subtitle="We have your occasion covered"
      loading={loading}
      error={error}
      onRetry={() => dispatch(fetchNewArrivals({ start: 0, limit: 8 }))}
      data={newArrivals}
    >
      <div className="container">
        <div className={styles.grid}>
          {newArrivals.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </div>
        {hasMore && (
          <div className={styles.btnContainer}>
            <Button
              onClick={handleLoadMore}
              className={styles.button}
              disabled={loading}
              aria-label="Load 4 more new arrivals"
            >
              {loading ? "Loading..." : "Discover More"}
            </Button>
          </div>
        )}
      </div>
    </SectionWrapper>
  );
});

NewArrivals.displayName = "NewsArrivals";

export default NewArrivals;
