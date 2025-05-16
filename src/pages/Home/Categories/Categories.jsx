import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  fetchTopCategories,
  selectCategories,
  selectTopCategories,
  setCategory,
  setSubcategory,
} from "../../../redux/slice/productSlice";
import styles from "./Categories.module.scss";

const Categories = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const topCategories = useSelector(selectTopCategories);
  const categories = useSelector(selectCategories);
  const { loading, error } = useSelector((state) => state.product);

  // Fetch top categories on mount
  useEffect(() => {
    dispatch(fetchTopCategories());
  }, [dispatch]);

  // Handle category click
  const handleCategoryClick = (categoryName) => {
    const parentCategory = categories.find((cat) =>
      cat.sub_categories.some((sub) => sub.name === categoryName)
    );

    dispatch(setCategory(parentCategory.name));
    dispatch(setSubcategory(categoryName));
    navigate("/shop");
  };

  return (
    <section className={styles.container}>
      <div className={styles.sectitle}>
        <h3 className={styles.subtitle}>There's More to Explore</h3>
      </div>
      {topCategories.length ? (
        <div className={styles.items}>
          {/* First large item (e.g., Women) */}
          {topCategories[0] && (
            <div className={styles.item}>
              <Link
                to="/shop"
                className={styles.link}
                onClick={() => handleCategoryClick(topCategories[0].name)}
                aria-label={`Explore ${topCategories[0].name} category`}
              >
                <img
                  className={styles.catitem}
                  src={topCategories[0].image}
                  alt={topCategories[0].name}
                  loading="lazy"
                />
                <button className={styles.button}>
                  {topCategories[0].name}
                </button>
              </Link>
            </div>
          )}
          {/* Second large item (e.g., Men) */}
          {topCategories[1] && (
            <div className={styles.item}>
              <Link
                to="/shop"
                className={styles.link}
                onClick={() => handleCategoryClick(topCategories[1].name)}
                aria-label={`Explore ${topCategories[1].name} category`}
              >
                <img
                  className={styles.catitem}
                  src={topCategories[1].image}
                  alt={topCategories[1].name}
                  loading="lazy"
                />
                <button className={styles.button}>
                  {topCategories[1].name}
                </button>
              </Link>
            </div>
          )}
          {/* Split item (e.g., Shoes, Accessories) */}
          {topCategories[2] && topCategories[3] && (
            <div className={styles.item}>
              <div className={styles.splitItem}>
                <Link
                  to="/shop"
                  className={styles.link}
                  onClick={() => handleCategoryClick(topCategories[2].name)}
                  aria-label={`Explore ${topCategories[2].name} category`}
                >
                  <img
                    className={styles.product}
                    src={topCategories[2].image}
                    alt={topCategories[2].name}
                    loading="lazy"
                  />
                  <button className={styles.button}>
                    {topCategories[2].name}
                  </button>
                </Link>
              </div>
              <div className={styles.splitItem}>
                <Link
                  to="/shop"
                  className={styles.link}
                  onClick={() => handleCategoryClick(topCategories[3].name)}
                  aria-label={`Explore ${topCategories[3].name} category`}
                >
                  <img
                    className={styles.product}
                    src={topCategories[3].image}
                    alt={topCategories[3].name}
                    loading="lazy"
                  />
                  <button className={styles.button}>
                    {topCategories[3].name}
                  </button>
                </Link>
              </div>
            </div>
          )}
        </div>
      ) : error ? (
        <div className={styles.error} aria-live="assertive">
          Error: {error}
        </div>
      ) : loading ? (
        <div className={styles.loader} aria-live="polite">
          Loading categories...
        </div>
      ) : (
        <div className={styles.empty} aria-live="polite">
          No categories available
        </div>
      )}
    </section>
  );
};

export default Categories;
