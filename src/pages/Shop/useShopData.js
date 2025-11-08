import { useEffect, useRef, useMemo, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { debounce } from "lodash";
import {
  fetchData,
  fetchCategories,
  setCategory,
  setSubcategory,
  setSelectedBrands,
  setSelectedColors,
  setPriceFilter,
  setSortingOption,
  setSearchQuery,
  incrementStart,
  selectFilters,
  selectStart,
  selectDataLoading,
  selectDataError,
  selectTotal,
  selectHasMore,
  fetchBrands,
  fetchColors,
} from "../../redux/slice/productSlice";
import { useSearchParams } from "react-router-dom";

export const useShopData = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const isInitialMount = useRef(true);
  const filters = useSelector(selectFilters);
  const start = useSelector(selectStart);
  const loading = useSelector(selectDataLoading);
  const error = useSelector(selectDataError);
  const total = useSelector(selectTotal);
  const hasMore = useSelector(selectHasMore);
  const [isReady, setIsReady] = useState(false);
  const batchSize = 12;

  const filterDeps = useMemo(
    () => ({
      category: filters.selectedCategory || undefined,
      subcategory: filters.selectedSubcategory || undefined,
      minPrice: filters.minPrice || undefined,
      maxPrice: filters.maxPrice || undefined,
      color: filters.selectedColors.length ? filters.selectedColors : undefined,
      brands: filters.selectedBrands.length
        ? filters.selectedBrands
        : undefined,
      sortingOption: filters.sortingOption || undefined,
      searchQuery: filters.searchQuery || undefined,
      start,
      limit: batchSize,
      count: true,
    }),
    [
      filters.selectedCategory,
      filters.selectedSubcategory,
      filters.minPrice,
      filters.maxPrice,
      filters.selectedColors,
      filters.selectedBrands,
      filters.sortingOption,
      filters.searchQuery,
      start,
    ]
  );

  const debouncedFetch = useCallback(
    debounce((deps) => {
      if (deps.maxPrice && deps.minPrice && deps.maxPrice < deps.minPrice)
        return;
      dispatch(fetchData(deps));
    }, 100),
    [dispatch]
  );

  const updateSearchParams = useCallback(() => {
    const newParams = {};
    Object.entries(filterDeps).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        newParams[key] = Array.isArray(value) ? value : value.toString();
      }
    });
    setSearchParams(newParams, { replace: true });
  }, [filterDeps, setSearchParams]);

  useEffect(() => {
    if (isInitialMount.current) {
      dispatch(setCategory(searchParams.get("category") || ""));
      dispatch(setSubcategory(searchParams.get("subcategory") || ""));
      dispatch(setSelectedBrands(searchParams.getAll("brands")));
      dispatch(setSelectedColors(searchParams.getAll("color")));
      dispatch(
        setPriceFilter({
          minPrice: Number(searchParams.get("minPrice")) || null,
          maxPrice: Number(searchParams.get("maxPrice")) || undefined,
        })
      );
      dispatch(setSortingOption(searchParams.get("sortingOption") || ""));
      dispatch(setSearchQuery(searchParams.get("searchQuery") || ""));
      dispatch(fetchCategories());
      dispatch(fetchBrands());
      dispatch(fetchColors());
      dispatch(fetchData(filterDeps)).then(() => setIsReady(true));
      isInitialMount.current = false;
    } else {
      updateSearchParams();
      debouncedFetch(filterDeps);
    }

    return () => debouncedFetch.cancel();
  }, [dispatch, filterDeps, debouncedFetch, updateSearchParams]);

  const loadMore = useCallback(() => {
    if (!loading && hasMore) dispatch(incrementStart(batchSize));
  }, [dispatch, loading, hasMore, batchSize]);

  return { filters, loading, error, hasMore, loadMore, isReady };
};

export default useShopData;
