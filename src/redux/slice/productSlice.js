import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import axios from "axios";

export const buildQuery = (filters) => {
  const params = new URLSearchParams();
  const paramMap = {
    category: "category_name",
    subcategory: "sub_category",
    newArrived: "newArrived",
    bestsellers: "bestsellers",
    minPrice: "price_gte",
    maxPrice: "price_lte",
    searchQuery: "title_like",
    color: "color",
    brands: "brand",
    limit: "_limit",
    start: "_start",
    sort: "_sort",
    order: "_order",
  };

  const sanitize = (value) => {
    if (value === null || value === undefined) return "";
    return encodeURIComponent(String(value));
  };

  Object.entries(filters).forEach(([key, value]) => {
    if (key in paramMap && value !== undefined && value !== null) {
      const mappedKey = paramMap[key];
      if (Array.isArray(value)) {
        value.forEach((val) => {
          if (val !== null && val !== undefined && val !== "") {
            params.append(mappedKey, sanitize(val));
          }
        });
      } else {
        const sanitizedValue = sanitize(value);
        if (sanitizedValue !== "") {
          params.append(mappedKey, sanitizedValue);
        }
      }
    }
  });

  const query = params.toString();
  console.log(query);
  return query ? `?${query}` : "";
};

export const validateFilters = ({ minPrice, maxPrice, color, brands }) => {
  if (minPrice !== undefined && minPrice < 0) {
    throw new Error("minPrice cannot be negative");
  }
  if (maxPrice !== undefined && maxPrice < minPrice) {
    throw new Error("maxPrice cannot be less than minPrice");
  }
  if (color && !Array.isArray(color)) {
    throw new Error("colors must be an array");
  }
  if (brands && !Array.isArray(brands)) {
    throw new Error("brands must be an array");
  }
};

export const fetchData = createAsyncThunk(
  "product/fetchData",
  async (
    {
      category,
      subcategory,
      minPrice,
      maxPrice,
      searchQuery,
      color,
      brands,
      sortingOption,
    } = {},
    { rejectWithValue }
  ) => {
    try {
      validateFilters({ minPrice, maxPrice, color, brands });

      // Base filters (excluding color and brands for multi-select)
      const baseFilters = {
        category,
        subcategory,
        minPrice,
        maxPrice,
        searchQuery,
      };

      // Apply sorting
      if (sortingOption === "price_low_to_high") {
        baseFilters.sort = "price";
        baseFilters.order = "asc";
      } else if (sortingOption === "price_high_to_low") {
        baseFilters.sort = "price";
        baseFilters.order = "desc";
      }

      // Special case: both color and brands have multiple selections
      if (
        (Array.isArray(color) && color.length > 0) ||
        (Array.isArray(brands) && brands.length > 0)
      ) {
        // We'll use a Set to avoid duplicate products
        const productMap = new Map();

        // If colors are selected, fetch products for each color
        if (Array.isArray(color) && color.length > 0) {
          for (const singleColor of color) {
            const colorFilter = { ...baseFilters, color: singleColor };

            // If brands are also selected, we need to handle combinations
            if (Array.isArray(brands) && brands.length > 0) {
              for (const singleBrand of brands) {
                const combinedFilter = { ...colorFilter, brands: singleBrand };
                const query = buildQuery(combinedFilter);

                console.log(
                  `Fetching color: ${singleColor}, brand: ${singleBrand} with query: ${query}`
                );
                const res = await axios.get(
                  `http://localhost:8001/products${query}`
                );

                if (Array.isArray(res.data)) {
                  // Add products to our map using ID as key to avoid duplicates
                  res.data.forEach((product) => {
                    productMap.set(product.id, product);
                  });
                }
              }
            } else {
              // Only color is selected, no brands
              const query = buildQuery(colorFilter);

              console.log(
                `Fetching color: ${singleColor} with query: ${query}`
              );
              const res = await axios.get(
                `http://localhost:8001/products${query}`
              );

              if (Array.isArray(res.data)) {
                res.data.forEach((product) => {
                  productMap.set(product.id, product);
                });
              }
            }
          }
        }
        // If only brands are selected (no colors)
        else if (Array.isArray(brands) && brands.length > 0) {
          for (const singleBrand of brands) {
            const brandFilter = { ...baseFilters, brands: singleBrand };
            const query = buildQuery(brandFilter);

            console.log(`Fetching brand: ${singleBrand} with query: ${query}`);
            const res = await axios.get(
              `http://localhost:8001/products${query}`
            );

            if (Array.isArray(res.data)) {
              res.data.forEach((product) => {
                productMap.set(product.id, product);
              });
            }
          }
        }

        // Convert map values to array
        const allProducts = [...productMap.values()];

        // Apply sorting to combined results
        if (sortingOption === "price_low_to_high") {
          allProducts.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        } else if (sortingOption === "price_high_to_low") {
          allProducts.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        }

        return allProducts;
      }

      // For single filters or no filters, use the original approach
      const filters = {
        category,
        subcategory,
        minPrice,
        maxPrice,
        searchQuery,
        color: Array.isArray(color) && color.length === 1 ? color[0] : color,
        brands:
          Array.isArray(brands) && brands.length === 1 ? brands[0] : brands,
      };

      if (sortingOption === "price_low_to_high") {
        filters.sort = "price";
        filters.order = "asc";
      } else if (sortingOption === "price_high_to_low") {
        filters.sort = "price";
        filters.order = "desc";
      }

      const query = buildQuery(filters);
      console.log("Fetching with query:", query);
      const res = await axios.get(`http://localhost:8001/products${query}`);
      console.log(res.data);

      if (!Array.isArray(res.data)) {
        throw new Error("Expected an array of products");
      }

      return res.data;
    } catch (error) {
      console.error("Error fetching products:", error.message);
      return rejectWithValue(error.message);
    }
  }
);

export const fetchBestSellers = createAsyncThunk(
  "product/fetchBestSellers",
  async (_, { rejectWithValue }) => {
    try {
      const query = buildQuery({ bestsellers: true });
      console.log(query);
      const res = await axios.get(`http://localhost:8001/products${query}`);

      if (!Array.isArray(res.data)) {
        throw new Error("Expected an array of bestseller products");
      }

      return res.data;
    } catch (error) {
      console.error("Error fetching bestsellers:", error.message);
      return rejectWithValue(error.message);
    }
  }
);

export const fetchNewArrivals = createAsyncThunk(
  "product/fetchNewArrivals",
  async ({ start = 0, batchSize = 8 } = {}, { rejectWithValue }) => {
    try {
      // Fetch paginated new arrivals
      const query = buildQuery({ newArrived: true, start, limit: batchSize });
      const res = await axios.get(`http://localhost:8001/products${query}`);
      if (!Array.isArray(res.data)) {
        throw new Error("Expected an array of new arrival products");
      }

      // Fetch total count of new arrivals (without pagination)
      const totalQuery = buildQuery({ newArrived: true });
      const totalRes = await axios.get(
        `http://localhost:8001/products${totalQuery}`
      );
      const totalItems = totalRes.data.length;
      console.log(totalItems);

      const hasMore =
        start + res.data.length < totalItems && res.data.length === batchSize;
      console.log(
        start + res.data.length < totalItems && res.data.length === batchSize
      );
      console.log(start);

      return { products: res.data, start, hasMore };
    } catch (error) {
      console.error("Error fetching new arrivals:", error.message);
      return rejectWithValue(error.message);
    }
  }
);

export const fetchTopCategories = createAsyncThunk(
  "product/fetchTopCategories",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("http://localhost:8001/top-categories");
      if (!Array.isArray(res.data)) {
        throw new Error("Expected an array of top categories");
      }
      return res.data;
    } catch (error) {
      console.error("Error fetching top categories:", error.message);
      return rejectWithValue(error.message);
    }
  }
);

export const fetchCategories = createAsyncThunk(
  "shop/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("http://localhost:8001/categories");
      return res.data;
    } catch (error) {
      console.error("Error fetching categories:", error.message);
      return rejectWithValue({ message: error.message });
    }
  }
);

export const fetchColors = createAsyncThunk(
  "shop/fetchColors",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("http://localhost:8001/colors");
      console.log(res.data);
      return res.data;
    } catch (error) {
      console.error("Error fetching colors:", error.message);
      return rejectWithValue({ message: error.message });
    }
  }
);

export const fetchBrands = createAsyncThunk(
  "product/fetchBrands",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("http://localhost:8001/brands");
      if (!Array.isArray(res.data)) {
        throw new Error("Expected an array of brands");
      }

      return res.data;
    } catch (error) {
      console.error("Error fetching brands:", error.message);
      return rejectWithValue(error.message);
    }
  }
);

// Initial State
const initialState = {
  data: [],
  categories: [],
  colors: [],
  brands: [],
  bestSellersData: [],
  newArrivalsData: [],
  newArrivalsSkip: 0, // Track number of products fetched
  newArrivalsHasMore: true, // Track if more products exist
  topCategories: [], // New state for top-categories
  loading: false,
  error: null,

  filters: {
    searchQuery: "",
    minPrice: null,
    maxPrice: undefined,
    sortingOption: "",
    selectedCategory: null,
    selectedSubcategory: "",
    selectedColors: [],
    selectedBrands: [],
  },
};

// Slice Definition
export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.filters.searchQuery = action.payload;
    },

    setPriceFilter: (state, action) => {
      state.filters.minPrice = isNaN(action.payload.minPrice)
        ? 0
        : action.payload.minPrice;
      state.filters.maxPrice = isNaN(action.payload.maxPrice)
        ? undefined
        : action.payload.maxPrice;
    },

    setSortingOption: (state, action) => {
      state.filters.sortingOption = action.payload;
    },

    setCategory: (state, action) => {
      state.filters.selectedCategory = action.payload;
      state.filters.selectedSubcategory = "";
      state.filters.selectedColors = [];
      state.filters.selectedBrands = [];
    },

    setSubcategory: (state, action) => {
      state.filters.selectedSubcategory = action.payload;
    },

    toggleColor: (state, action) => {
      const color = action.payload;
      state.filters.selectedColors = state.filters.selectedColors.includes(
        color
      )
        ? state.filters.selectedColors.filter((c) => c !== color)
        : [...state.filters.selectedColors, color];
    },

    toggleBrand: (state, action) => {
      const brand = action.payload;
      state.filters.selectedBrands = state.filters.selectedBrands.includes(
        brand
      )
        ? state.filters.selectedBrands.filter((b) => b !== brand)
        : [...state.filters.selectedBrands, brand];
    },

    resetFilters: (state) => {
      state.filters.searchQuery = "";
      state.filters.minPrice = 0;
      state.filters.maxPrice = undefined;
      state.filters.sortingOption = "";
      state.filters.selectedCategory = null;
      state.filters.selectedSubcategory = "";
      state.filters.selectedColors = [];
      state.filters.selectedBrands = [];
    },
  },

  extraReducers: (builder) => {
    builder
      // fetchTopCategories

      .addCase(fetchTopCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTopCategories.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.topCategories = payload;
      })
      .addCase(fetchTopCategories.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })

      // fetchedNewArrials

      .addCase(fetchNewArrivals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchNewArrivals.fulfilled, (state, { payload }) => {
        state.loading = false;
        // Reset newArrivalsData for initial fetch (start: 0), append otherwise
        state.newArrivalsData =
          payload.start === 0
            ? payload.products
            : [...state.newArrivalsData, ...payload.products];
        state.newArrivalsSkip = payload.start + payload.products.length;
        state.newArrivalsHasMore = payload.hasMore;
      })
      .addCase(fetchNewArrivals.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })

      //  fetchedData

      .addCase(fetchData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.data = action.payload;
      })

      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // fetchedbestSellers

      .addCase(fetchBestSellers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBestSellers.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.bestSellersData = payload;
      })
      .addCase(fetchBestSellers.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })

      // fetched category

      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })

      // fetcehedcolors

      .addCase(fetchColors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchColors.fulfilled, (state, action) => {
        state.loading = false;
        state.colors = action.payload;
      })
      .addCase(fetchColors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })

      //  fetchedbrands

      .addCase(fetchBrands.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBrands.fulfilled, (state, action) => {
        state.loading = false;
        state.brands = action.payload;
      })
      .addCase(fetchBrands.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

// Actions
export const {
  setSearchQuery,
  setPriceFilter,
  setSortingOption,
  setCategory,
  setSubcategory,
  toggleColor,
  toggleBrand,
  resetFilters,
} = productSlice.actions;

export const selectData = (state) => state.product.data;
// data get fetched
export const selectBestSellersData = (state) => state.product.bestSellersData;
// best seller fetched
export const selectNewArrivalsData = (state) => state.product.newArrivalsData;
export const selectNewArrivalsSkip = (state) => state.product.newArrivalsSkip;
export const selectNewArrivalsHasMore = (state) =>
  state.product.newArrivalsHasMore;
//  new Arrival and load
export const selectCategories = (state) => state.product.categories;

// all fetched cat
export const selectColors = (state) => state.product.colors;
// fetched color
export const selectBrands = (state) => state.product.brands;
// fetched brand
export const selectTopCategories = (state) => state.product.topCategories;
// fetched top
export const selectFilters = (state) => state.product.filters;

export const selectSearchQuery = (state) => state.product.filters.searchQuery;

export const selectFilteredProducts = createSelector(
  [selectData],
  (products) => [...products]
);

export const selectBestSellers = createSelector(
  [selectBestSellersData],
  (products) => [...products]
);

export const selectNewArrivals = createSelector(
  [selectNewArrivalsData],
  (products) => [...products]
);

export default productSlice.reducer;
