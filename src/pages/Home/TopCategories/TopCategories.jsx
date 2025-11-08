import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import {
  fetchTopCategories,
  fetchCategories,
  selectTopCategories,
  selectCategories,
  selectTopCategoriesLoading,
  selectTopCategoriesError,
} from "../../../redux/slice/productSlice";
import SectionWrapper from "../SectionWrapper";
import Category from "./Category";
import { swiperConfig } from "./swiperConfig";
import styles from "./TopCategories.module.scss";
import { memo } from "react";
import { useShopNavigation } from "../useShopNavigation";

const TopCategories = memo(() => {
  const dispatch = useDispatch();
  const { goToShop } = useShopNavigation();
  const topCategories = useSelector(selectTopCategories);
  const categories = useSelector(selectCategories);
  const loading = useSelector(selectTopCategoriesLoading);
  const error = useSelector(selectTopCategoriesError);

  useEffect(() => {
    dispatch(fetchTopCategories());
    dispatch(fetchCategories());
  }, [dispatch]);

  // const handleCategoryClick = async (topCategoryName) => {
  //   if (!categories.length) {
  //     console.log("handleCategoryClick - Categories not loaded yet");
  //     return;
  //   }
  //   const parentCategory = categories.find((cat) =>
  //     cat.subCategories.some((sub) => sub.name === topCategoryName)
  //   );
  //   console.log(
  //     "handleCategoryClick - topCategoryName:",
  //     topCategoryName,
  //     "parentCategory:",
  //     parentCategory
  //   );
  //   const category = parentCategory ? parentCategory.name : topCategoryName;
  //   const subcategory = parentCategory ? topCategoryName : "";

  //   dispatch(setCategory(category));
  //   dispatch(setSubcategory(subcategory));

  //   // build query params
  //   const params = new URLSearchParams();
  //   if (category) params.set("category", category);
  //   if (subcategory) params.set("subcategory", subcategory);

  //   // navigate with query params
  //   navigate(`/shop?${params.toString()}`);
  // };

  const handleCategoryClick = (topCategoryName) => {
    if (!categories.length) {
      console.log("Categories not loaded yet");
      return;
    }
    console.log(topCategoryName);

    // figure out if it`s a parent category or subcategory

    const parentCategory = categories.find((cat) =>
      cat.subCategories.some((sub) => sub.name === topCategoryName)
    );

    console.log(parentCategory);

    const category = parentCategory ? parentCategory.name : topCategoryName;
    const subcategory = parentCategory ? topCategoryName : "";

    console.log(category, subcategory);

    // insteead of dispatch + navigate manually just call goToShop

    goToShop({ category, subcategory });
  };

  return (
    <SectionWrapper
      title="Explore Top Categories"
      subtitle="Explore the Newest Trends for Both Men and Women!"
      loading={loading}
      error={error}
      onRetry={() => dispatch(fetchTopCategories())}
      data={topCategories}
    >
      {topCategories.length > 0 && (
        <div className="container">
          <Swiper
            {...swiperConfig}
            // slidesPerView={5}
            // spaceBetween={25}
            loop={topCategories.length >= swiperConfig.slidesPerView}
            className={styles.swiper}
          >
            {topCategories.map((category) => (
              <SwiperSlide key={category.id}>
                <Category
                  category={category}
                  onClick={() => handleCategoryClick(category.name)}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </SectionWrapper>
  );
});

TopCategories.displayName = "TopCategories";

export default TopCategories;
