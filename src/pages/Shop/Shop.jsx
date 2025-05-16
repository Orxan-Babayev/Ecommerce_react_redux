// import { useCallback, useEffect, useRef } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchData,
//   fetchBrands,
//   fetchColors,
//   selectFilteredProducts,
//   selectCategories,
//   selectColors,
//   selectBrands,
//   setPriceFilter,
//   setCategory,
//   setSubcategory,
//   toggleColor,
//   toggleBrand,
//   setSortingOption,
//   resetFilters,
//   fetchCategories,
// } from "../../redux/slice/productSlice";
// import styles from "./Shop.module.scss";
// import { debounce } from "lodash";

// const Shop = () => {
//   const dispatch = useDispatch();
//   const isInitialMount = useRef(true);

//   // Selectors
//   const products = useSelector(selectFilteredProducts);
//   const { loading, error, filters } = useSelector((state) => state.product);
//   const categories = useSelector(selectCategories);
//   const colors = useSelector(selectColors);
//   const brands = useSelector(selectBrands);

//   // Destructure filters
//   const {
//     minPrice,
//     maxPrice,
//     selectedCategory,
//     selectedSubcategory,
//     selectedColors,
//     selectedBrands,
//     sortingOption,
//   } = filters;

//   // Get subcategories based on selected category
//   const subcategories = selectedCategory
//     ? categories.find((cat) => cat.name === selectedCategory)?.sub_categories ||
//       []
//     : [];

//   // Effect for initial data loading (only once)
//   useEffect(() => {
//     // Load static data only once on mount
//     dispatch(fetchCategories());
//     dispatch(fetchColors());
//     dispatch(fetchBrands());

//     // Initial products fetch
//     dispatch(fetchData({}));
//   }, [dispatch]);

//   const debouncedSetPriceFilter = useCallback(
//     debounce((priceFilter) => {
//       dispatch(setPriceFilter(priceFilter));
//     }, 400),
//     [dispatch]
//   );

//   useEffect(() => {
//     return () => {
//       debouncedSetPriceFilter.cancel();
//     };
//   }, [debouncedSetPriceFilter]);

//   const handlePriceChange = (field, value) => {
//     const parsedValue = value === "" ? null : Number(value);
//     debouncedSetPriceFilter({
//       minPrice: field === "minPrice" ? parsedValue : minPrice,
//       maxPrice: field === "maxPrice" ? parsedValue : maxPrice,
//     });
//   };

//   // Separate effect for filter changes
//   useEffect(() => {
//     // Skip on initial mount since we already fetch products in the first effect
//     if (isInitialMount.current) {
//       isInitialMount.current = false;
//       return;
//     }

//     // Log what's triggering this effect
//     console.log("Filter changed, fetching with:", {
//       category: selectedCategory,
//       subcategory: selectedSubcategory,
//       minPrice,
//       maxPrice,
//       color: selectedColors,
//       brands: selectedBrands,
//       sortingOption,
//     });

//     // Fetch products with current filters
//     dispatch(
//       fetchData({
//         category: selectedCategory,
//         subcategory: selectedSubcategory,
//         minPrice,
//         maxPrice,
//         color: selectedColors,
//         brands: selectedBrands,
//         sortingOption,
//       })
//     );
//   }, [
//     selectedCategory,
//     selectedSubcategory,
//     minPrice,
//     maxPrice,
//     selectedColors,
//     selectedBrands,
//     sortingOption,
//     dispatch,
//   ]);

//   // Rest of the component remains the same...
//   return (
//     <div className={styles.shop}>
//       <div className={styles.filters}>
//         <div className={styles.priceFilter}>
//           <input
//             type="number"
//             value={minPrice ?? ""}
//             onChange={(e) => handlePriceChange("minPrice", e.target.value)}
//             placeholder="Min Price"
//             min="0"
//             className={styles.priceInput}
//             aria-label="Minimum price"
//           />
//           <input
//             type="number"
//             value={maxPrice ?? ""}
//             onChange={(e) => handlePriceChange("maxPrice", e.target.value)}
//             placeholder="Max Price"
//             min={minPrice || 0}
//             className={styles.priceInput}
//             aria-label="Maximum price"
//           />
//         </div>

//         <select
//           value={selectedCategory || ""}
//           onChange={(e) => dispatch(setCategory(e.target.value || null))}
//           className={styles.select}
//           aria-label="Select category"
//         >
//           <option value="">All Categories</option>
//           {categories.length > 0 ? (
//             categories.map((cat) => (
//               <option key={cat.id} value={cat.name}>
//                 {cat.name}
//               </option>
//             ))
//           ) : (
//             <option disabled>No categories available</option>
//           )}
//         </select>

//         <select
//           value={selectedSubcategory || ""}
//           onChange={(e) => dispatch(setSubcategory(e.target.value || ""))}
//           className={styles.select}
//           disabled={!selectedCategory}
//           aria-label="Select subcategory"
//         >
//           <option value="">All Subcategories</option>
//           {subcategories.length > 0 ? (
//             subcategories.map((sub) => (
//               <option key={sub.id} value={sub.name}>
//                 {sub.name}
//               </option>
//             ))
//           ) : (
//             <option disabled>No subcategories available</option>
//           )}
//         </select>

//         <div className={styles.checkboxGroup}>
//           <span className={styles.checkboxLabel}>Colors</span>
//           {colors.length > 0 ? (
//             colors.map((colorObj) => (
//               <label key={colorObj.id} className={styles.checkboxItem}>
//                 <input
//                   type="checkbox"
//                   checked={selectedColors.includes(colorObj.color)}
//                   onChange={() => dispatch(toggleColor(colorObj.color))}
//                   aria-label={`Filter by ${colorObj.color}`}
//                 />
//                 {colorObj.color}
//               </label>
//             ))
//           ) : (
//             <span className={styles.noOptions}>No colors available</span>
//           )}
//         </div>

//         <div className={styles.checkboxGroup}>
//           <span className={styles.checkboxLabel}>Brands</span>
//           {brands.length > 0 ? (
//             brands.map((brandObj) => (
//               <label key={brandObj.id} className={styles.checkboxItem}>
//                 <input
//                   type="checkbox"
//                   checked={selectedBrands.includes(brandObj.brand)}
//                   onChange={() => dispatch(toggleBrand(brandObj.brand))}
//                   aria-label={`Filter by ${brandObj.brand}`}
//                 />
//                 {brandObj.brand}
//               </label>
//             ))
//           ) : (
//             <span className={styles.noOptions}>No brands available</span>
//           )}
//         </div>

//         <select
//           value={sortingOption}
//           onChange={(e) => {
//             console.log("Sorting option changed to:", e.target.value);
//             dispatch(setSortingOption(e.target.value));
//           }}
//           className={styles.select}
//           aria-label="Sort products"
//         >
//           <option value="">Sort By</option>
//           <option value="price_low_to_high">Price: Low to High</option>
//           <option value="price_high_to_low">Price: High to Low</option>
//         </select>

//         <button
//           onClick={() => dispatch(resetFilters())}
//           className={styles.resetButton}
//           aria-label="Reset all filters"
//         >
//           Reset Filters
//         </button>
//       </div>

//       {loading && !products.length ? (
//         <div className={styles.loader} aria-live="polite">
//           Loading...
//         </div>
//       ) : error ? (
//         <div className={styles.error} aria-live="assertive">
//           Error: {error}
//         </div>
//       ) : !products.length ? (
//         <div className={styles.empty} aria-live="polite">
//           No products found
//         </div>
//       ) : (
//         <div className={styles.products}>
//           {products.map((product) => (
//             <div key={product.id} className={styles.product}>
//               <img
//                 src={product.image}
//                 alt={product.title}
//                 loading="lazy"
//                 className={styles.image}
//               />
//               <h3 className={styles.productTitle}>{product.title}</h3>
//               <p className={styles.productPrice}>
//                 ${Number(product.price).toFixed(2)}
//               </p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Shop;

import { useSelector } from "react-redux";
import {
  selectFilteredProducts,
  selectCategories,
  selectColors,
  selectBrands,
} from "../../redux/slice/productSlice";
import { useShopData } from "./useShopData";
import PriceFilter from "./PriceFilter";
import CategoryFilter from "./CategoryFilter";
import ColorFilter from "./ColorFilter";
import BrandFilter from "./BrandFilter";
import SortFilter from "./SortFilter";
import ResetButton from "./ResetButton";
import ProductList from "./ProductList";
import styles from "./Shop.module.scss";

const Shop = () => {
  const { filters, loading, error, fetchProducts } = useShopData();
  const products = useSelector(selectFilteredProducts);
  const categories = useSelector(selectCategories);
  const colors = useSelector(selectColors);
  const brands = useSelector(selectBrands);

  return (
    <div className={styles.shop}>
      <div className={styles.filters}>
        <PriceFilter minPrice={filters.minPrice} maxPrice={filters.maxPrice} />
        <CategoryFilter
          categories={categories}
          selectedCategory={filters.selectedCategory}
          selectedSubcategory={filters.selectedSubcategory}
        />
        <ColorFilter colors={colors} selectedColors={filters.selectedColors} />
        <BrandFilter brands={brands} selectedBrands={filters.selectedBrands} />
        <SortFilter sortingOption={filters.sortingOption} />
        <ResetButton />
      </div>
      <ProductList
        products={products}
        loading={loading}
        error={error}
        onRetry={fetchProducts}
      />
    </div>
  );
};

export default Shop;
