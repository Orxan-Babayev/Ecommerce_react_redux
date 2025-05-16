import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTopCategories,
  setCategory,
  setSubcategory,
  selectTopCategories,
  selectCategories,
} from "../../../redux/slice/productSlice";
import styles from "./TopCategories.module.scss";

const TopCategories = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const topCategories = useSelector(selectTopCategories);
  const categories = useSelector(selectCategories);
  const { loading, error } = useSelector((state) => state.product);
  console.log(topCategories);

  useEffect(() => {
    dispatch(fetchTopCategories());
  }, [dispatch]);

  const handleCategoryClick = (topCategoryName) => {
    const parentCategory = categories.find((cat) =>
      cat.sub_categories.some((sub) => sub.name === topCategoryName)
    );

    if (parentCategory) {
      dispatch(setCategory(parentCategory.name));
      dispatch(setSubcategory(topCategoryName));
    } else {
      dispatch(setCategory(topCategoryName));
      dispatch(setSubcategory(""));
    }
    navigate("/shop");
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.main}>Explore Top Categories</h3>
      </div>
      {topCategories.length ? (
        <div className={styles.items}>
          {topCategories.map((category) => (
            <div key={category.id} className={styles.item}>
              <Link
                to="/shop"
                onClick={() => handleCategoryClick(category.name)}
                className={styles.link}
                aria-label={`Shop ${category.name}`}
              >
                <div className={styles.imageContainer}>
                  <img
                    className={styles.img}
                    src={category.image}
                    alt={`Shop ${category.name}`}
                    loading="lazy"
                    onError={(e) => (e.target.src = "/fallback-image.jpg")} // Fallback image
                  />
                </div>
              </Link>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className={styles.error} aria-live="assertive">
          Error: {error}
          <button onClick={() => dispatch(fetchTopCategories())}>Retry</button>
        </div>
      ) : loading ? (
        <div className={styles.loader} aria-live="polite">
          Loading...
        </div>
      ) : (
        <div className={styles.empty} aria-live="polite">
          No categories found
        </div>
      )}
    </div>
  );
};

export default TopCategories;
