import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import WishlistButton from "./WishlistButton/WishlistButton";
import QuickViewModal from "./QuickViewModal/QuickViewModal";
import {
  fetchData,
  selectData,
  fetchCategories,
  selectCategories,
  fetchColors,
  fetchBrands,
  selectColors,
  selectBrands,
  selectFilteredProducts,
  setPriceFilter,
  setSortingOption,
  setCategory,
  setSubcategory,
  toggleColor,
  toggleBrand,
  resetFilters,
  selectSortingOption,
} from "../../redux/slice/productSlice";
import {
  addToWishlist,
  removeFromWishlist,
  selectWishlistItems,
} from "../../redux/slice/wishlistSlice";
import { addItem } from "../../redux/slice/cartSlice";
import style from "./Shop.module.scss";

const Shop = () => {
  const data = useSelector(selectData);
  const categories = useSelector(selectCategories);
  const colors = useSelector(selectColors);
  const brands = useSelector(selectBrands);
  // fetched  from

  const filteredProducts = useSelector(selectFilteredProducts);

  const wishlistItems = useSelector(selectWishlistItems);

  const dispatch = useDispatch();

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchData());
    dispatch(fetchCategories());
    dispatch(fetchColors());
    dispatch(fetchBrands());
  }, [dispatch]);

  const handlePriceFilter = () => {
    const min = parseInt(minPrice) || 0;
    const max = maxPrice ? parseInt(maxPrice) : undefined;
    dispatch(setPriceFilter({ minPrice: min, maxPrice: max }));
  };

  const handleResetFilters = () => {
    setMinPrice("");
    setMaxPrice("");
    dispatch(resetFilters());
  };

  const handleIncreaseMinPrice = () => {
    const newMinPrice = (parseInt(minPrice) || 0) + 1;
    setMinPrice(newMinPrice.toString());
  };
  const handleDecreaseMinPrice = () => {
    const current = parseInt(minPrice) || 0;
    if (current <= 0) return;
    setMinPrice((current - 1).toString());
  };

  const handleIncreaseMaxPrice = () => {
    const newMaxPrice = (parseInt(maxPrice) || 0) + 1;
    setMaxPrice(newMaxPrice.toString());
  };

  const handleDecreaseMaxPrice = () => {
    const current = parseInt(maxPrice) || 0;
    if (current <= 0) return;
    setMaxPrice((current - 1).toString());
  };

  const handleSortChange = (e) => {
    dispatch(setSortingOption(e.target.value));
  };

  const handleCategorySelect = (categoryName) => {
    dispatch(setCategory(categoryName));
  };

  const handleSubcategorySelect = (subcategoryName) => {
    dispatch(setSubcategory(subcategoryName));
  };

  const handleColorSelect = (color) => {
    dispatch(toggleColor(color));
  };

  const handleBrandSelect = (brand) => {
    dispatch(toggleBrand(brand));
  };

  const isInWishlist = (product) =>
    wishlistItems.some((item) => item.id === product.id);

  const handleToggleWishlist = (product) => {
    if (isInWishlist(product)) {
      dispatch(removeFromWishlist(product));
    } else {
      dispatch(addToWishlist(product));
    }
  };

  const handleAddToCart = (item) => {
    dispatch(addItem(item));
  };

  const handleQuickView = (item) => {
    setSelectedProduct(item);
    setIsQuickViewOpen(true);
  };

  const handleCloseQuickView = () => {
    setIsQuickViewOpen(false);
  };

  return (
    <div className={style.container}>
      <h2>All Products</h2>
      <section className={style.filters}>
        <div className={style.filterGroup}>
          <h3>Categories</h3>
          {categories.map((category) => (
            <div key={category.id}>
              <span
                role="button"
                tabIndex={0}
                onClick={() => handleCategorySelect(category.name)}
                onKeyDown={(e) =>
                  e.key === "Enter" && handleCategorySelect(category.name)
                }
                className={style.filterItem}
              >
                {category.name}
              </span>
              <div className={style.subcategories}>
                {category.sub_categories.map((sub) => (
                  <span
                    key={sub.id}
                    role="button"
                    tabIndex={0}
                    onClick={() => handleSubcategorySelect(sub.name)}
                    onKeyDown={(e) =>
                      e.key === "Enter" && handleSubcategorySelect(sub.name)
                    }
                    className={style.filterItem}
                  >
                    {sub.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className={style.filterGroup}>
          <h3>Colors</h3>
          {colors.map((color) => (
            <div key={color.id}>
              <span
                role="button"
                tabIndex={0}
                onClick={() => handleColorSelect(color.color)}
                onKeyDown={(e) =>
                  e.key === "Enter" && handleColorSelect(color.color)
                }
                className={style.filterItem}
              >
                {color.color}
              </span>
            </div>
          ))}
        </div>

        <div className={style.filterGroup}>
          <h3>Brands</h3>
          {brands.map((brand) => (
            <div key={brand.id}>
              <span
                role="button"
                tabIndex={0}
                onClick={() => handleBrandSelect(brand.brand)}
                onKeyDown={(e) =>
                  e.key === "Enter" && handleBrandSelect(brand.brand)
                }
                className={style.filterItem}
              >
                {brand.brand}
              </span>
            </div>
          ))}
        </div>

        <div className={style.filterGroup}>
          <h3>Price</h3>
          <div className={style.priceInputs}>
            <button
              onClick={handleDecreaseMinPrice}
              aria-label="Decrease minimum price"
            >
              -
            </button>
            <input
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              placeholder="Min price"
              aria-label="Minimum price"
            />
            <button
              onClick={handleIncreaseMinPrice}
              aria-label="Increase minimum price"
            >
              +
            </button>
          </div>
          <div className={style.priceInputs}>
            <button
              onClick={handleDecreaseMaxPrice}
              aria-label="Decrease maximum price"
            >
              -
            </button>
            <input
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              placeholder="Max price"
              aria-label="Maximum price"
            />
            <button
              onClick={handleIncreaseMaxPrice}
              aria-label="Increase maximum price"
            >
              +
            </button>
          </div>
          <div className={style.priceButtons}>
            <button onClick={handlePriceFilter}>Apply</button>
            <button onClick={handleResetFilters}>Reset</button>
          </div>
        </div>

        <div className={style.filterGroup}>
          <h3>Sort By</h3>
          <select
            onChange={handleSortChange}
            value={selectSortingOption}
            aria-label="Sort products"
          >
            <option value="">Sort by...</option>
            <option value="price_low_to_high">Price: Low to High</option>
            <option value="price_high_to_low">Price: High to Low</option>
          </select>
        </div>
      </section>

      <section className={style.products}>
        {filteredProducts.length === 0 && <p>No products found.</p>}
        {filteredProducts.map((item) => (
          <div key={item.id} className={style.product}>
            <Link to={`/product/${item.id}`} aria-label={`View ${item.title}`}>
              <img src={item.image} alt={item.title} className={style.image} />
            </Link>
            <WishlistButton
              product={item}
              isInWishlist={isInWishlist}
              handleToggleWishlist={handleToggleWishlist}
            />
            <button onClick={() => handleAddToCart(item)}>Add to Cart</button>
            <button onClick={() => handleQuickView(item)}>Quick View</button>
            <h3>{item.title}</h3>
            <p>${item.price}</p>
          </div>
        ))}
        <QuickViewModal
          product={selectedProduct}
          isOpen={isQuickViewOpen}
          onClose={handleCloseQuickView}
        />
      </section>
    </div>
  );
};

export default Shop;
