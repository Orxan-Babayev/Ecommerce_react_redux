import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import axios from "axios";

// Async Thunks
export const fetchData = createAsyncThunk(
  "shop/fetchData",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("http://localhost:8001/products");
      return res.data;
    } catch (error) {
      console.error("Error fetching products:", error.message);
      return rejectWithValue({ message: error.message });
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
      return res.data;
    } catch (error) {
      console.error("Error fetching colors:", error.message);
      return rejectWithValue({ message: error.message });
    }
  }
);

export const fetchBrands = createAsyncThunk(
  "shop/fetchBrands",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("http://localhost:8001/brands");
      return res.data;
    } catch (error) {
      console.error("Error fetching brands:", error.message);
      return rejectWithValue({ message: error.message });
    }
  }
);

//  asyncThunk for handle global remote states async operations which have connect to external world
// asyncThunk take arguments name like in reducer name and , actions shop/fetchedBrands
// and  _  which shows async is not take any argument rejectWithValue object if fetched prosses will not get success
// try and catch for better handle result
//use axios get method for fetched from endpoint
// return res data
// catch for error take error message and console error
//  return rejectWithValue get error mesage

// Initial State
const initialState = {
  data: [],
  categories: [],
  colors: [],
  brands: [],
  loading: false,
  error: null,
  searchQuery: "",
  minPrice: 0,
  maxPrice: undefined,
  sortingOption: "",
  selectedCategory: null,
  selectedSubcategory: "",
  selectedColors: [],
  selectedBrands: [],
};

//  data, categories, colors, brands, is array which getted from asyncThunk fetchData result will added
// loading is false and used in asyncThunk life pedding...
//  error null is means their is no error and mainly result which comes from rejectWithValue is string
// searchQuery is string because get e target vcalue from input
//  minPrice 0 number from input
//  can be a string because it is  a number and can be 0 because 0 minPirice and 0 maxPrice can be Filterd it oi a wrong
//  unefined when maxPrice didnt given it shows all products above minPrice
//  sorting it also get dispatched value from select
//  selcctCategory is not select and === null shows no category is selected it only select one category and subCategory ""
// means it pass all subCategories

// Slice Definition
export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    // gets disPatched e target value which may use to local state and sent to payload
    setPriceFilter: (state, action) => {
      state.minPrice = isNaN(action.payload.minPrice)
        ? 0
        : action.payload.minPrice;
      state.maxPrice = isNaN(action.payload.maxPrice)
        ? undefined
        : action.payload.maxPrice;
    },
    // get input data and isNan fro if some one leave empty input or write string it isNan(Nan) will give 0
    // else give number or in maxPrice sutiatoin Nan give undeifned means bo number selected oelse give number
    setSortingOption: (state, action) => {
      state.sortingOption = action.payload;
    },
    //  it gives value select and
    setCategory: (state, action) => {
      state.selectedCategory = action.payload;
      state.selectedSubcategory = "";
      state.selectedColors = [];
      state.selectedBrands = [];
    },
    // when Cateegory selcted it get one category and make selectedSubcategry to "" fro pass all subCategroies
    setSubcategory: (state, action) => {
      state.selectedSubcategory = action.payload;
    },
    // it will select sub Cat
    toggleColor: (state, action) => {
      const color = action.payload;
      state.selectedColors = state.selectedColors.includes(color)
        ? state.selectedColors.filter((c) => c !== color)
        : [...state.selectedColors, color];
    },
    //  get payload = color  we mutate color and if selectedColors arr includes color filter selectedColors
    // interesting why because selectedColors  = selctedColors filter color which i thing it mutation briefly
    // if selectedColors state include color filkter this color from selectedColors state else crate new arr spread
    // sel;ectedColors and add color object

    toggleBrand: (state, action) => {
      const brand = action.payload;
      state.selectedBrands = state.selectedBrands.includes(brand)
        ? state.selectedBrands.filter((b) => b !== brand)
        : [...state.selectedBrands, brand];
    },
    //  same logic as a selcectedColors

    resetFilters: (state) => {
      state.searchQuery = "";
      state.minPrice = 0;
      state.maxPrice = undefined;
      state.sortingOption = "";
      state.selectedCategory = null;
      state.selectedSubcategory = "";
      state.selectedColors = [];
      state.selectedBrands = [];
    },
  },
  //  rset states searchQueary min max, sortingOptions, Categories and subCategories, selectedColors, selectedBrands

  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // loading true  error null means no error
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      // data arr get fetchedData return
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      // if rejected means loading state become false and error take mesage why use this loading ui for spinner
      // isloading return spinner

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
        state.error = action.payload.shortcutsmessage;
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
//

// this are actions we import tthis actions to component and use it when dispatch like dispatch name of action
// data which we want to dispatch
//  toggle is add to arr or if color in arr to delete
//  toggleColor, toggleBrand is about selectColor and Brand arr in action we put in colors and if color alreadfy in
//  arr we filter it all is mutation
// fetched pro only for map and

// Selectors
export const selectData = (state) => state.product.data;
export const selectCategories = (state) => state.product.categories;
export const selectColors = (state) => state.product.colors;
export const selectBrands = (state) => state.product.brands;
export const selectSortingOption = (state) => state.product.sortingOption || "";
export const selectSearchQuery = (state) => state.product.searchQuery;

//  this are selectros is best way because after write selector in reducer we export object to component
//  we give data from asyncThunk and after select we map this

export const selectFilteredProducts = createSelector(
  [
    selectData,
    (state) => state.product.searchQuery,
    (state) => state.product.minPrice,
    (state) => state.product.maxPrice,
    (state) => state.product.selectedCategory,
    (state) => state.product.selectedSubcategory,
    (state) => state.product.selectedColors,
    (state) => state.product.selectedBrands,
    selectSortingOption,
  ],
  // selectData all products geted from fetchData
  // it like input  other states are states that gets from dispatch
  //  and we use this for filtering
  // products is all products and fiter it = to filtered products
  //

  (
    products,
    searchQuery,
    minPrice,
    maxPrice,
    category,
    subcategory,
    colors,
    brands,
    sortingOption
  ) => {
    let filtered = products.filter(
      (product) =>
        (!searchQuery ||
          product.title.toLowerCase().includes(searchQuery.toLowerCase())) &&
        product.price >= (minPrice || 0) &&
        (!maxPrice || product.price <= maxPrice) &&
        (!category || product.category?.name === category) &&
        (!subcategory || product.category?.sub_category === subcategory) &&
        (colors.length === 0 || colors.includes(product.color)) &&
        (brands.length === 0 || brands.includes(product.brand))
    );
    // if !searchQuery nothing happens if searchQuery exsist  product title LOwerCase includes
    // searchQuery lowerCase can see  product data in data it has title subcategory and ....
    // product single product from data wich export to component name selectDataa which is fetched from fetchData
    // product price we check dispstched minPrice is 0 or get nubmer and max similar if maxprice exsist because if it not
    // exsist it undefined
    // category ? if api error or some products dont have category
    // Thank you for zooming in on the ?. (optional chaining) in the selectFilteredProducts selector,
    // specifically its role in ensuring no error if product.category is undefined.
    // Problem
    // Ideally, every product has a category object with name and sub_category.
    // But, if product.category is undefined (due to inconsistent data, API errors, or incomplete products),
    //  accessing product.category.name would throw:
    // javascript
    // product.category.name // Error if product.category is undefine
    // How ?. Helps
    // Safe Access:
    // product.category?.name:
    // If product.category exists, accesses name (e.g., 'Electronics').
    // If product.category is undefined or null, returns undefined (no error).
    // product.category?.sub_category:
    // Same logic for sub_category (e.g., 'Phones' or undefined if missing).
    // Impact in Filter:
    // The condition product.category?.name === category:
    // If category is set (e.g., 'Electronics'):
    // product.category?.name === 'Electronics':
    // True if product.category.name = 'Electronics'.
    // False if product.category?.name is undefined (i.e., undefined !== 'Electronics').
    // If category = null, !category is true, so the condition passes anyway (no filter).
    // Similarly for product.category?.sub_category === subcategory.
    // Result:
    // Products with missing category fail the filter when category or subcategory is set
    //  (because undefined !== 'Electronics').
    // No runtime errors occur, ensuring the app doesn’t crash.

    if (sortingOption === "price_low_to_high") {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (sortingOption === "price_high_to_low") {
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    }

    return filtered;
  }
);

export default productSlice.reducer;
