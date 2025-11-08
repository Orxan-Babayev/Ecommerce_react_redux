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
import ShopBanner from "./ShopBanner";
import Breadcrumbs from "./Breadcrumbs";
import { memo } from "react";
import Spinner from "./Spinner";

const Shop = () => {
  const { filters, loading, error, fetchProducts, hasMore, loadMore, isReady } =
    useShopData();
  const products = useSelector(selectFilteredProducts);
  const categories = useSelector(selectCategories);
  const colors = useSelector(selectColors);
  const brands = useSelector(selectBrands);
  if (!isReady) return <Spinner />;
  return (
    <div>
      <ShopBanner
        selectedCategory={filters.selectedCategory}
        selectedSubcategory={filters.selectedSubcategory}
      />
      <Breadcrumbs />
      <div className="container">
        <div className={`${styles.shopGrid} `}>
          <div className={styles.filters}>
            <CategoryFilter
              categories={categories}
              selectedCategory={filters.selectedCategory}
              selectedSubcategory={filters.selectedSubcategory}
            />
            <ColorFilter
              colors={colors}
              selectedColors={filters.selectedColors}
            />
            <BrandFilter
              brands={brands}
              selectedBrands={filters.selectedBrands}
            />{" "}
            <PriceFilter
              minPrice={filters.minPrice}
              maxPrice={filters.maxPrice}
            />
            <SortFilter sortingOption={filters.sortingOption} />
            <ResetButton />
          </div>
          <ProductList
            products={products}
            loading={loading}
            error={error}
            onRetry={fetchProducts}
            hasMore={hasMore}
            loadMore={loadMore}
          />
        </div>
      </div>
    </div>
  );
};

const MemoizeShop = memo(Shop);

export default MemoizeShop;
