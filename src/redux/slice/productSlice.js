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
    count: "count",
  };
  Object.entries(filters).forEach(([key, value]) => {
    if (key in paramMap && value != null) {
      const mappedKey = paramMap[key];
      if (Array.isArray(value)) {
        value.forEach(
          (val) => val && params.append(mappedKey, val)
          //  (val) => val && params.append(mappedKey, encodeURIComponent(val))
        );
      } else {
        params.append(mappedKey, value);
      }
    }
  });
  return params.toString() ? `?${params.toString()}` : "";
};

export const validateFilters = ({ minPrice, maxPrice }) => {
  if (minPrice != null && minPrice < 0)
    throw new Error("minPrice cannot be negative");
  if (maxPrice != null && maxPrice < minPrice)
    throw new Error("maxPrice cannot be less than minPrice");
};

export const fetchData = createAsyncThunk(
  "product/fetchData",
  async (args = {}, { rejectWithValue }) => {
    try {
      const {
        category,
        subcategory,
        minPrice,
        maxPrice,
        searchQuery,
        color,
        brands,
        sortingOption,
        start,
        limit,
        count,
      } = args;

      validateFilters({ minPrice, maxPrice });

      const usedStart = Number.isFinite(start) ? start : 0;
      const usedLimit = Number.isFinite(limit) ? limit : 12;

      const sortOptions = {
        price_low_to_high: { sort: "price", order: "asc" },
        price_high_to_low: { sort: "price", order: "desc" },
        title_asc: { sort: "title", order: "asc" },
        title_desc: { sort: "title", order: "desc" },
      };

      const filters = {
        category,
        subcategory,
        minPrice,
        maxPrice,
        searchQuery,
        color,
        brands,
        limit: usedLimit,
        start: usedStart,
        count,
        ...(sortOptions[sortingOption] || { sort: "id", order: "asc" }),
      };

      console.log("📦 Filters being sent:", filters);

      const query = buildQuery(filters);
      const res = await axios.get(`http://localhost:8001/products${query}`);

      const data = res.data;

      // 🧩 Auto-normalize: detect structure type
      let products, total;
      if (Array.isArray(data)) {
        // normal mode: backend returned array
        products = data;
        total = null;
      } else if (data.products && Array.isArray(data.products)) {
        // count mode: backend returned object
        products = data.products;
        total = data.total ?? null;
      } else {
        throw new Error("Unexpected backend response format");
      }

      console.log("✅ Normalized:", { products, total, usedStart, usedLimit });

      return {
        products,
        total,
        start: usedStart,
        limit: usedLimit,
      };
    } catch (error) {
      console.error("❌ fetchData error:", error);
      return rejectWithValue(error.message);
    }
  }
);

export const fetchNewArrivals = createAsyncThunk(
  "product/fetchNewArrivals",
  async ({ start = 0, batchSize = 8 } = {}, { rejectWithValue }) => {
    try {
      const query = buildQuery({
        newArrived: true,
        start,
        limit: batchSize,
        count: true,
      });
      const res = await axios.get(`http://localhost:8001/products${query}`);
      if (!Array.isArray(res.data.products))
        throw new Error("Expected an array of new arrival products");
      const { products, total } = res.data;
      const hasMore =
        start + products.length < total && products.length === batchSize;
      return { products, start, hasMore };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchBestSellers = createAsyncThunk(
  "product/fetchBestSellers",
  async (_, { rejectWithValue }) => {
    try {
      const query = buildQuery({ bestsellers: true });
      const res = await axios.get(`http://localhost:8001/products${query}`);
      if (!Array.isArray(res.data))
        throw new Error("Expected an array of bestseller products");
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchTopCategories = createAsyncThunk(
  "product/fetchTopCategories",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("http://localhost:8001/top-categories");
      if (!Array.isArray(res.data))
        throw new Error("Expected an array of top categories");
      return res.data;
    } catch (error) {
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
      return rejectWithValue(error.message);
    }
  }
);

export const fetchColors = createAsyncThunk(
  "shop/fetchColors",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("http://localhost:8001/colors");
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchBrands = createAsyncThunk(
  "product/fetchBrands",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("http://localhost:8001/brands");
      if (!Array.isArray(res.data))
        throw new Error("Expected an array of brands");
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchNews = createAsyncThunk(
  "product/fetchNews",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("http://localhost:8001/news");
      if (!Array.isArray(res.data))
        throw new Error("Expected an array of news");
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  data: [],
  categories: [],
  colors: [],
  brands: [],
  news: [],
  bestSellersData: [],
  newArrivalsData: [],
  newArrivalsSkip: 0,
  newArrivalsHasMore: true,
  topCategories: [],
  total: 0, // Added for total product
  hasMore: true, // Added to track if more produtcs
  start: 0,
  loading: {
    data: false,
    categories: false,
    colors: false,
    brands: false,
    news: false,
    bestSellers: false,
    newArrivals: false,
    topCategories: false,
  },
  error: {
    data: null,
    categories: null,
    colors: null,
    brands: null,
    news: null,
    bestSellers: null,
    newArrivals: null,
    topCategories: null,
  },
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

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.filters.searchQuery = action.payload;
      state.data = []; //Reset when filter
      state.total = 0;
      state.hasMore = true;
      state.start = 0;
    },

    setPriceFilter: (state, action) => {
      const { minPrice, maxPrice } = action.payload || {};

      state.filters.minPrice =
        typeof minPrice === "number" && Number.isFinite(minPrice)
          ? minPrice
          : null;

      state.filters.maxPrice =
        typeof maxPrice === "number" && Number.isFinite(maxPrice)
          ? maxPrice
          : undefined;
      state.data = []; //Reset when filter
      state.total = 0;
      state.hasMore = true;
    },

    setSortingOption: (state, action) => {
      state.filters.sortingOption = action.payload;
      state.data = []; //Reset when filter
      state.total = 0;
      state.hasMore = true;
      state.start = 0;
    },
    setCategory: (state, action) => {
      state.filters.selectedCategory = action.payload;
      state.filters.selectedSubcategory = "";
      state.filters.selectedColors = [];
      state.filters.selectedBrands = [];
      state.data = []; //Reset when filter
      state.total = 0;
      state.hasMore = true;
      state.start = 0;
    },
    setSubcategory: (state, action) => {
      state.filters.selectedSubcategory = action.payload;
      state.data = []; //Reset when filter
      state.total = 0;
      state.hasMore = true;
      state.start = 0;
    },
    toggleColor: (state, action) => {
      const color = action.payload;
      state.filters.selectedColors = state.filters.selectedColors.includes(
        color
      )
        ? state.filters.selectedColors.filter((c) => c !== color)
        : [...state.filters.selectedColors, color];
      state.data = []; //Reset when filter
      state.total = 0;
      state.hasMore = true;
      state.start = 0;
    },
    setSelectedColors: (state, action) => {
      state.filters.selectedColors = action.payload || [];
      state.data = []; //Reset when filter
      state.total = 0;
      state.hasMore = true;
      state.start = 0;
    },
    setSelectedBrands: (state, action) => {
      state.filters.selectedBrands = action.payload || [];
      state.data = []; //Reset when filter
      state.total = 0;
      state.hasMore = true;
      state.start = 0;
    },
    toggleBrand: (state, action) => {
      const brand = action.payload;
      state.filters.selectedBrands = state.filters.selectedBrands.includes(
        brand
      )
        ? state.filters.selectedBrands.filter((b) => b !== brand)
        : [...state.filters.selectedBrands, brand];
      state.data = []; //Reset when filter
      state.total = 0;
      state.hasMore = true;
      state.start = 0;
    },
    resetFilters: (state) => {
      state.filters.searchQuery = "";
      state.filters.minPrice = null;
      state.filters.maxPrice = undefined;
      state.filters.sortingOption = "";
      state.filters.selectedCategory = null;
      state.filters.selectedSubcategory = "";
      state.filters.selectedColors = [];
      state.filters.selectedBrands = [];
      state.data = []; //Reset when filter
      state.total = 0;
      state.hasMore = true;
      state.start = 0;
    },
    incrementStart: (state, action) => {
      state.start += action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading.data = true;
        state.error.data = null;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading.data = false;
        const { products, total, start, limit } = action.payload;
        console.log(action.payload);
        console.log(products, "4"); // only overrite not
        state.data = start === 0 ? products : [...state.data, ...products];
        if (total !== null) {
          state.total = total;
          state.hasMore =
            start + products.length < total && products.length === limit;
        } else {
          state.hasMore = products.length === limit;
        }
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading.data = false;
        state.error.data = action.payload;
      })
      .addCase(fetchNewArrivals.pending, (state) => {
        state.loading.newArrivals = true;
        state.error.newArrivals = null;
      })
      .addCase(fetchNewArrivals.fulfilled, (state, { payload }) => {
        state.loading.newArrivals = false;
        state.newArrivalsData =
          payload.start === 0
            ? payload.products
            : [...state.newArrivalsData, ...payload.products];
        state.newArrivalsSkip = payload.start + payload.products.length;
        state.newArrivalsHasMore = payload.hasMore;
      })
      .addCase(fetchNewArrivals.rejected, (state, { payload }) => {
        state.loading.newArrivals = false;
        state.error.newArrivals = payload;
      })
      .addCase(fetchBestSellers.pending, (state) => {
        state.loading.bestSellers = true;
        state.error.bestSellers = null;
      })
      .addCase(fetchBestSellers.fulfilled, (state, { payload }) => {
        state.loading.bestSellers = false;
        state.bestSellersData = payload;
      })
      .addCase(fetchBestSellers.rejected, (state, { payload }) => {
        state.loading.bestSellers = false;
        state.error.bestSellers = payload;
      })
      .addCase(fetchTopCategories.pending, (state) => {
        state.loading.topCategories = true;
        state.error.topCategories = null;
      })
      .addCase(fetchTopCategories.fulfilled, (state, { payload }) => {
        state.loading.topCategories = false;
        state.topCategories = payload;
      })
      .addCase(fetchTopCategories.rejected, (state, { payload }) => {
        state.loading.topCategories = false;
        state.error.topCategories = payload;
      })
      .addCase(fetchCategories.pending, (state) => {
        state.loading.categories = true;
        state.error.categories = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading.categories = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading.categories = false;
        state.error.categories = action.payload.message;
      })
      .addCase(fetchColors.pending, (state) => {
        state.loading.colors = true;
        state.error.colors = null;
      })
      .addCase(fetchColors.fulfilled, (state, action) => {
        state.loading.colors = false;
        state.colors = action.payload;
      })
      .addCase(fetchColors.rejected, (state, action) => {
        state.loading.colors = false;
        state.error.colors = action.payload.message;
      })
      .addCase(fetchBrands.pending, (state) => {
        state.loading.brands = true;
        state.error.brands = null;
      })
      .addCase(fetchBrands.fulfilled, (state, action) => {
        state.loading.brands = false;
        state.brands = action.payload;
      })
      .addCase(fetchBrands.rejected, (state, action) => {
        state.loading.brands = false;
        state.error.brands = action.payload.message;
      })
      .addCase(fetchNews.pending, (state) => {
        state.loading.news = true;
        state.error.news = null;
      })
      .addCase(fetchNews.fulfilled, (state, { payload }) => {
        state.loading.news = false;
        state.news = payload;
      })
      .addCase(fetchNews.rejected, (state, { payload }) => {
        state.loading.news = false;
        state.error.news = payload;
      });
  },
});

export const {
  setSearchQuery,
  setPriceFilter,
  setSortingOption,
  setCategory,
  setSubcategory,
  toggleColor,
  toggleBrand,
  setSelectedBrands,
  setSelectedColors,
  resetFilters,
  incrementStart,
} = productSlice.actions;

export const selectData = (state) => state.product.data;
export const selectStart = (state) => state.product.start;
export const selectDataLoading = (state) => state.product.loading.data;
export const selectDataError = (state) => state.product.error.data;
export const selectBestSellersData = (state) => state.product.bestSellersData;
export const selectBestSellersLoading = (state) =>
  state.product.loading.bestSellers;
export const selectBestSellersError = (state) =>
  state.product.error.bestSellers;
export const selectNewArrivalsData = (state) => state.product.newArrivalsData;
export const selectNewArrivalsLoading = (state) =>
  state.product.loading.newArrivals;
export const selectNewArrivalsError = (state) =>
  state.product.error.newArrivals;
export const selectNewArrivalsSkip = (state) => state.product.newArrivalsSkip;
export const selectNewArrivalsHasMore = (state) =>
  state.product.newArrivalsHasMore;
export const selectCategories = (state) => state.product.categories;
export const selectCategoriesLoading = (state) =>
  state.product.loading.categories;
export const selectCategoriesError = (state) => state.product.error.categories;
export const selectNews = (state) => state.product.news;
export const selectNewsLoading = (state) => state.product.loading.news;
export const selectNewsError = (state) => state.product.error.news;
export const selectColors = (state) => state.product.colors;
export const selectBrands = (state) => state.product.brands;
export const selectBrandsLoading = (state) => state.product.loading.brands;
export const selectBrandsError = (state) => state.product.error.brands;
export const selectTopCategories = (state) => state.product.topCategories;
export const selectTopCategoriesLoading = (state) =>
  state.product.loading.topCategories;
export const selectTopCategoriesError = (state) =>
  state.product.error.topCategories;
export const selectFilters = (state) => state.product.filters;
export const selectSearchQuery = (state) => state.product.filters.searchQuery;
export const selectTotal = (state) => state.product.total;
export const selectHasMore = (state) => state.product.hasMore;
export const selectFilteredProducts = createSelector(
  [selectData],
  (products) => [...products]
);

export default productSlice.reducer;
