// import Spinner from "./Spinner";
// import Error from "./Error";
// import NoData from "./NoData";
// import Product from "./Product";
// import styles from "./ProductList.module.css";
// import { TfiLayoutGrid3Alt } from "react-icons/tfi";
// import { TfiLayoutGrid4Alt } from "react-icons/tfi";
// import { memo, useEffect, useRef, useState } from "react";

// // const SkeletonProduct = () => (
// //   <div>
// //     <div></div>
// //     <div>
// //       <div></div>
// //       <div></div>
// //     </div>
// //   </div>
// // );

// const ProductList = ({
//   products,
//   loading,
//   error,
//   onRetry,
//   hasMore,
//   loadMore,
// }) => {
//   const [gridColumns, setGridColumns] = useState(
//     () => Number(localStorage.getItem("gridColumns")) || 3
//   );

//   const listRef = useRef(null);
//   const loadMoreRef = useRef(null);

//   useEffect(() => {
//     localStorage.setItem("gridColumns", gridColumns);
//   }, [gridColumns]);

//   useEffect(() => {
//     if (!hasMore || loading) return;

//     const observer = new IntersectionObserver(
//       (entries) => {
//         if (entries[0].isIntersecting) {
//           loadMore();
//         }
//       },
//       { threshold: 0.1 }
//     );
//     if (loadMoreRef.current) {
//       observer.observe(loadMoreRef.current);
//     }
//     return () => {
//       if (loadMoreRef.current) {
//         observer.unobserve(loadMoreRef.current);
//       }
//     };
//   }, [hasMore, loading, loadMore, products]);

//   if (loading && products.length === 0) {
//     return <Spinner primary="5rem" />;
//   }
//   if (error) {
//     return <Error error={error} onRetry={onRetry} />;
//   }

//   if (products.length === 0) {
//     return <NoData />;
//   }

//   const itemCount = loading
//     ? products.length + 6
//     : products.length + (hasMore ? 1 : 0);

//   return (
//     <div>
//       <div className={styles.viewButtons}>
//         <button
//           onClick={() => setGridColumns(3)}
//           className={gridColumns === 3 ? styles.active : ""}
//           aria-pressed={gridColumns === 3}
//         >
//           <TfiLayoutGrid3Alt />
//         </button>
//         <button
//           className={gridColumns === 4 ? styles.active : ""}
//           onClick={() => setGridColumns(4)}
//           aria-pressed={gridColumns === 4}
//         >
//           <TfiLayoutGrid4Alt size={20} />
//         </button>
//       </div>
//       <div
//         className={styles.products}
//         style={{ gridTemplateColumns: `repeat(${gridColumns}, 1fr)` }}
//       >
//         {products.map((product) => (
//           <Product key={product.id} product={product} />
//         ))}
//         <div
//           ref={loadMoreRef}
//           style={{ height: "20px", marginTop: "1rem" }}
//         ></div>
//       </div>
//     </div>
//   );
// };
// const MemoizedProductList = memo(ProductList);

// // Export the named memoized component
// export default MemoizedProductList;

import Spinner from "./Spinner";
import Error from "./Error";
import NoData from "./NoData";
import Product from "./Product";
import styles from "./ProductList.module.css";
import { TfiLayoutGrid3Alt, TfiLayoutGrid4Alt } from "react-icons/tfi";
import { memo, useEffect, useRef, useState } from "react";

const SkeletonProduct = () => (
  <div className={styles.skeletonProduct}>
    <div className={styles.skeletonLinkImg}>
      <div className={styles.skeletonImage} />
      <div className={styles.skeletonImgIconPlaceholder} />
    </div>
    <div className={styles.skeletonText}>
      <div className={styles.skeletonTitle} />
      <div className={styles.skeletonPrice} />
    </div>
  </div>
);

const ProductList = ({
  products,
  loading,
  error,
  onRetry,
  hasMore,
  loadMore,
}) => {
  const [gridColumns, setGridColumns] = useState(
    () => Number(localStorage.getItem("gridColumns")) || 3
  );

  const loadMoreRef = useRef(null);

  // Save grid preference
  useEffect(() => {
    localStorage.setItem("gridColumns", gridColumns);
  }, [gridColumns]);

  // Infinite scroll
  useEffect(() => {
    if (!hasMore || loading) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          loadMore();
        }
      },
      { rootMargin: "200px" } // Load earlier
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [hasMore, loading, loadMore]); // Removed `products` dependency

  // Early returns
  if (loading && products.length === 0) return <Spinner primary="5rem" />;
  if (error) return <Error error={error} onRetry={onRetry} />;
  if (products.length === 0) return <NoData />;

  return (
    <div>
      {/* Toggle Buttons */}
      <div className={styles.viewButtons}>
        <button
          onClick={() => setGridColumns(3)}
          className={gridColumns === 3 ? styles.active : ""}
          aria-pressed={gridColumns === 3}
        >
          <TfiLayoutGrid3Alt />
        </button>
        <button
          onClick={() => setGridColumns(4)}
          className={gridColumns === 4 ? styles.active : ""}
          aria-pressed={gridColumns === 4}
        >
          <TfiLayoutGrid4Alt size={20} />
        </button>
      </div>

      {/* Product Grid */}
      <div
        className={styles.products}
        style={{
          gridTemplateColumns: `repeat(${gridColumns}, 1fr)`,
        }}
      >
        {/* Real Products */}
        {products.map((product) => (
          <Product key={product.id} product={product} />
        ))}

        {/* Skeletons (only when loading more) */}
        {loading &&
          Array.from({ length: 6 }).map((_, i) => (
            <SkeletonProduct key={`skeleton-${i}`} />
          ))}

        {/* Sentinel for infinite scroll */}
        {hasMore && (
          <div
            ref={loadMoreRef}
            style={{ gridColumn: "1 / -1", height: 20 }}
            aria-hidden="true"
          />
        )}
      </div>
    </div>
  );
};

export default memo(ProductList);

// import Spinner from "./Spinner";
// import Error from "./Error";
// import NoData from "./NoData";
// import Product from "./Product";
// import styles from "./ProductList.module.css";
// import { TfiLayoutGrid3Alt, TfiLayoutGrid4Alt } from "react-icons/tfi";
// import { memo, useEffect, useRef, useState, useCallback } from "react";
// import { FixedSizeGrid as Grid } from "react-window";

// const SkeletonProduct = () => (
//   <div className={styles.skeleton}>
//     <div></div>
//     <div>
//       <div></div>
//       <div></div>
//     </div>
//   </div>
// );

// const ProductList = ({
//   products,
//   loading,
//   error,
//   onRetry,
//   hasMore,
//   loadMore,
// }) => {
//   const [gridColumns, setGridColumns] = useState(
//     () => Number(localStorage.getItem("gridColumns")) || 3
//   );

//   const containerRef = useRef();
//   const gridRef = useRef();
//   const loadMoreRef = useRef();
//   const [containerWidth, setContainerWidth] = useState(900); // fallback

//   // Save column preference
//   useEffect(() => {
//     localStorage.setItem("gridColumns", gridColumns);
//   }, [gridColumns]);

//   // Measure container width on mount & resize
//   const measureContainer = useCallback(() => {
//     if (containerRef.current) {
//       setContainerWidth(containerRef.current.offsetWidth);
//     }
//   }, []);

//   useEffect(() => {
//     measureContainer();
//     const resizeObserver = new ResizeObserver(measureContainer);
//     if (containerRef.current) {
//       resizeObserver.observe(containerRef.current);
//     }
//     return () => resizeObserver.disconnect();
//   }, [measureContainer]);

//   // Infinite scroll
//   useEffect(() => {
//     if (!hasMore || loading) return;

//     const observer = new IntersectionObserver(
//       (entries) => {
//         if (entries[0].isIntersecting) loadMore();
//       },
//       { threshold: 0.1 }
//     );

//     if (loadMoreRef.current) observer.observe(loadMoreRef.current);
//     return () => {
//       if (loadMoreRef.current) observer.unobserve(loadMoreRef.current);
//     };
//   }, [hasMore, loading, loadMore, products]);

//   if (loading && products.length === 0) return <Spinner primary="5rem" />;
//   if (error) return <Error error={error} onRetry={onRetry} />;
//   if (products.length === 0) return <NoData />;

//   const CELL_HEIGHT = 470;
//   const CELL_GAP = 26;

//   // Calculate column width based on container
//   const columnWidth =
//     (containerWidth - CELL_GAP * (gridColumns - 1)) / gridColumns;

//   // Total items including skeletons and load more trigger
//   const totalItems = products.length + (loading ? 6 : 0) + (hasMore ? 1 : 0);
//   const rowCount = Math.ceil(totalItems / gridColumns);

//   return (
//     <div ref={containerRef} style={{ width: "100%" }}>
//       {/* Grid toggle buttons */}
//       <div className={styles.viewButtons}>
//         <button
//           onClick={() => setGridColumns(3)}
//           className={gridColumns === 3 ? styles.active : ""}
//           aria-pressed={gridColumns === 3}
//         >
//           <TfiLayoutGrid3Alt />
//         </button>
//         <button
//           onClick={() => setGridColumns(4)}
//           className={gridColumns === 4 ? styles.active : ""}
//           aria-pressed={gridColumns === 4}
//         >
//           <TfiLayoutGrid4Alt size={20} />
//         </button>
//       </div>

//       <Grid
//         ref={gridRef}
//         columnCount={gridColumns}
//         columnWidth={columnWidth}
//         height={1100}
//         rowCount={rowCount}
//         rowHeight={CELL_HEIGHT}
//         width={containerWidth}
//         style={{ overflowX: "hidden" }}
//       >
//         {({ columnIndex, rowIndex, style }) => {
//           const productIndex = rowIndex * gridColumns + columnIndex;

//           const isLoadMoreCell =
//             productIndex === products.length + (loading ? 6 : 0);

//           return (
//             <div
//               style={{
//                 ...style,
//                 padding: "0.5rem",
//               }}
//             >
//               {productIndex < products.length ? (
//                 <Product product={products[productIndex]} />
//               ) : productIndex < products.length + (loading ? 6 : 0) ? (
//                 <SkeletonProduct />
//               ) : (
//                 <div ref={loadMoreRef} style={{ height: 20 }} />
//               )}
//             </div>
//           );
//         }}
//       </Grid>
//     </div>
//   );
// };

// export default memo(ProductList);
