import { useSelector } from "react-redux";
import {
  selectCategories,
  selectCategoriesError,
  selectCategoriesLoading,
  selectTopCategories,
} from "../../../redux/slice/productSlice";
import styles from "./Categories.module.scss";
import { memo } from "react";
import { useShopNavigation } from "../useShopNavigation";
import SectionWrapper from "../SectionWrapper";

const Categories = memo(() => {
  const topCategories = useSelector(selectTopCategories);
  const categories = useSelector(selectCategories);
  const { goToShop } = useShopNavigation();
  const loading = useSelector(selectCategoriesLoading);
  const error = useSelector(selectCategoriesError);

  console.log(categories);

  // Fetch top categories on mount

  // Handle category click
  // const handleCategoryClick = (categoryName) => {
  //   console.log(categoryName);
  //   const parentCategory = categories.find((cat) =>
  //     cat.subCategories.some((sub) => sub.name === categoryName)
  //   );
  //   console.log(parentCategory);
  //   dispatch(setCategory(parentCategory.name));
  //   dispatch(setSubcategory(categoryName));
  //   navigate("/shop");
  // };

  const handleCategoryClick = (categoryName) => {
    console.log(categoryName);

    const parentCategory = categories.find((cat) =>
      cat.subCategories.some((sub) => sub.name === categoryName)
    );

    const category = parentCategory ? parentCategory.name : categoryName;
    const subcategory = parentCategory ? categoryName : "";
    console.log(category, subcategory);

    goToShop({ category, subcategory });
  };

  return (
    <SectionWrapper
      title="There's More to Explore"
      loading={loading}
      error={error}
      data={topCategories}
    >
      {topCategories.length > 0 && (
        <div className={`${styles.items} container`}>
          {/* First large item (e.g., Women) */}
          {topCategories[0] && (
            <div
              role="link"
              className={styles.item}
              onClick={() => handleCategoryClick(topCategories[0].name)}
              aria-label={`Explore ${topCategories[0].name} category`}
            >
              <img
                className={styles.catitem}
                src={topCategories[0].image}
                alt={topCategories[0].name}
                loading="lazy"
              />
              <button className={styles.button}>{topCategories[0].name}</button>
            </div>
          )}
          {/* Second large item (e.g., Men) */}
          {topCategories[1] && (
            <div
              role="link"
              className={styles.item}
              onClick={() => handleCategoryClick(topCategories[1].name)}
              aria-label={`Explore ${topCategories[1].name} category`}
            >
              <img
                className={styles.catitem}
                src={topCategories[1].image}
                alt={topCategories[1].name}
                loading="lazy"
              />
              <button className={styles.button}>{topCategories[1].name}</button>
            </div>
          )}
          {/* Split item (e.g., Shoes, Accessories) */}
          {/* {topCategories[2] && topCategories[3] && ( */}

          <div
            role="link"
            className={styles.splitItem}
            onClick={() => handleCategoryClick(topCategories[2].name)}
            aria-label={`Explore ${topCategories[2].name} category`}
          >
            <img
              className={styles.product}
              src={topCategories[2].image}
              alt={topCategories[2].name}
              loading="lazy"
            />
            <button className={styles.button}>{topCategories[2].name}</button>
          </div>

          <div
            role="link"
            className={styles.splitItem}
            onClick={() => handleCategoryClick(topCategories[3].name)}
            aria-label={`Explore ${topCategories[3].name} category`}
          >
            <img
              className={styles.product}
              src={topCategories[3].image}
              alt={topCategories[3].name}
              loading="lazy"
            />
            <button className={styles.button}>{topCategories[3].name}</button>
          </div>
        </div>
      )}
    </SectionWrapper>
  );
});

Categories.displayName = "Categories";

export default Categories;
