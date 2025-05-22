// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import {
//   fetchNewArrivals,
//   selectNewArrivalsData,
//   selectNewArrivalsSkip,
//   selectNewArrivalsHasMore,
// } from "../../../redux/slice/productSlice";
// import styles from "./NewArrivals.module.scss";
// import Spinner from "../../Shop/Spinner";
// import NoData from "../../Shop/NoData";
// import Error from "../../Shop/Error";
// import Button from "../../Product/Button";

// const NewArrivals = () => {
//   const dispatch = useDispatch();

//   const newArrivals = useSelector(selectNewArrivalsData);

//   const start = useSelector(selectNewArrivalsSkip);
//   const hasMore = useSelector(selectNewArrivalsHasMore);
//   const { loading, error } = useSelector((state) => state.product);

//   useEffect(() => {
//     if (newArrivals.length === 0 && !loading) {
//       dispatch(fetchNewArrivals({ start: 0, limit: 8 }));
//     }
//   }, [dispatch]); // Remove newArrivals.length dependency
//   // Handle "Discover More" click to load 4 more products
//   const handleLoadMore = () => {
//     dispatch(fetchNewArrivals({ start, batchSize: 4 }));
//   };
//   return (
//     <>
//       {loading && <Spinner primary="5rem" />}
//       {error && <Error error={error} onRetry={fetchNewArrivals} />}
//       {!loading && !error && !newArrivals.length ? (
//         <NoData />
//       ) : (
//         <section className={styles.container}>
//           <div className={styles.header}>
//             <h3 className={styles.main}>New Arrivals</h3>
//             <p>We have your occasion covered</p>
//           </div>

//           <div className={styles.items}>
//             {newArrivals.map((product) => (
//               <div key={product.id} className={styles.item}>
//                 <Link
//                   to={`/product/${product.id}`}
//                   className={styles.link}
//                   aria-label={`View ${product.title}`}
//                 >
//                   <div className={styles.imageWrapper}>
//                     <img
//                       className={styles.img}
//                       src={product.image}
//                       alt={product.title}
//                       loading="lazy"
//                     />
//                   </div>
//                   <div className={styles.card}>
//                     <h3 className={styles.title}>{product.title}</h3>
//                     <span className={styles.price}>
//                       {product.price.toFixed(2)}
//                     </span>
//                   </div>
//                 </Link>
//               </div>
//             ))}
//           </div>

//           {hasMore && (
//             <Button
//               onClick={handleLoadMore}
//               className={styles.button}
//               disabled={loading}
//               aria-label="Load 4 more new arrivals"
//             >
//               {loading ? "Loading..." : "Discover More"}
//             </Button>
//           )}
//         </section>
//       )}
//     </>
//   );
// };

// export default NewArrivals;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchNewArrivals,
  selectNewArrivalsData,
  selectNewArrivalsSkip,
  selectNewArrivalsHasMore,
} from "../../../redux/slice/productSlice";
import SectionWrapper from "../SectionWrapper";
import Product from "../../Shop/Product";
import Button from "../../Product/Button";
import styles from "./NewArrivals.module.scss";

const NewArrivals = () => {
  const dispatch = useDispatch();
  const newArrivals = useSelector(selectNewArrivalsData);
  const start = useSelector(selectNewArrivalsSkip);
  const hasMore = useSelector(selectNewArrivalsHasMore);
  const { loading, error } = useSelector((state) => state.product);

  useEffect(() => {
    if (!newArrivals.length && !loading) {
      dispatch(fetchNewArrivals({ start: 0, limit: 8 }));
    }
  }, [dispatch, loading]);

  const handleLoadMore = () => {
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
      <div className={styles.items}>
        {newArrivals.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
      {hasMore && (
        <Button
          onClick={handleLoadMore}
          className={styles.button}
          disabled={loading}
          aria-label="Load 4 more new arrivals"
        >
          {loading ? "Loading..." : "Discover More"}
        </Button>
      )}
    </SectionWrapper>
  );
};

export default NewArrivals;
