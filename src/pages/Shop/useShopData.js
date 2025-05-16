import { useEffect, useRef, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchData,
  fetchBrands,
  fetchColors,
  fetchCategories,
} from "../../redux/slice/productSlice";

export const useShopData = () => {
  const dispatch = useDispatch();
  const isInitialMount = useRef(true);
  const { filters, loading, error } = useSelector((state) => state.product);

  // Memoize filter dependencies
  const filterDeps = useMemo(
    () => ({
      category: filters.selectedCategory,
      subcategory: filters.selectedSubcategory,
      minPrice: filters.minPrice,
      maxPrice: filters.maxPrice,
      color: filters.selectedColors,
      brands: filters.selectedBrands,
      sortingOption: filters.sortingOption,
    }),
    [
      filters.selectedCategory,
      filters.selectedSubcategory,
      filters.minPrice,
      filters.maxPrice,
      filters.selectedColors,
      filters.selectedBrands,
      filters.sortingOption,
    ]
  );

  // Initial data fetching
  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchColors());
    dispatch(fetchBrands());
    dispatch(fetchData({}));
  }, [dispatch]);

  // Filter changes
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    console.log("Filter changed, fetching with:", filterDeps);
    // Skip fetch if price range is invalid
    if (
      filterDeps.maxPrice !== undefined &&
      filterDeps.minPrice !== null &&
      filterDeps.maxPrice < filterDeps.minPrice
    ) {
      console.warn("Invalid price range, skipping fetch");
      return;
    }
    dispatch(fetchData(filterDeps));
  }, [filterDeps, dispatch]);

  return {
    filters,
    loading,
    error,
    fetchProducts: () => dispatch(fetchData(filterDeps)), // For retry or manual fetch
  };
};
