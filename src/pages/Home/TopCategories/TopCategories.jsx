// import { useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchTopCategories,
//   setCategory,
//   setSubcategory,
//   selectTopCategories,
//   selectCategories,
// } from "../../../redux/slice/productSlice";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/free-mode";
// import "swiper/css/navigation";
// import styles from "./TopCategories.module.scss";
// import Spinner from "../../Shop/Spinner";
// import Error from "../../Shop/Error";
// import NoData from "../../Shop/NoData";

// const TopCategories = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const topCategories = useSelector(selectTopCategories);
//   const categories = useSelector(selectCategories);
//   const { loading, error } = useSelector((state) => state.product);
//   console.log(topCategories);

//   useEffect(() => {
//     dispatch(fetchTopCategories());
//   }, [dispatch]);

//   const handleCategoryClick = (topCategoryName) => {
//     const parentCategory = categories.find((cat) =>
//       cat.sub_categories.some((sub) => sub.name === topCategoryName)
//     );

//     if (parentCategory) {
//       dispatch(setCategory(parentCategory.name));
//       dispatch(setSubcategory(topCategoryName));
//     } else {
//       dispatch(setCategory(topCategoryName));
//       dispatch(setSubcategory(""));
//     }
//     navigate("/shop");
//   };

//   return (
//     <>
//       {loading && <Spinner primary="5rem" />}
//       {error && <Error error={error} onRetry={fetchTopCategories} />}
//       {!loading && !error && !topCategories.length ? (
//         <NoData />
//       ) : (
//         <div className={styles.container}>
//           <div className={styles.header}>
//             <h2 className={styles.main}>Explore Top Categories</h2>
//             <p>Explore the Newest Trends for Both Men and Women!</p>
//           </div>
//           <div className={styles.items}>
//             <Swiper
//               style={{
//                 "--swiper-navigation-size": "25px",
//               }}
//               slidesPerView={4}
//               spaceBetween={10}
//               loop={topCategories.length >= 4} // Loop only if enough products
//               navigation={true}
//               modules={[Navigation]}
//               className={styles.swiper}
//             >
//               {topCategories.map((category) => (
//                 <SwiperSlide key={category.id}>
//                   <div className={styles.item}>
//                     <Link
//                       to="/shop"
//                       onClick={() => handleCategoryClick(category.name)}
//                       className={styles.link}
//                       aria-label={`Shop ${category.name}`}
//                     >
//                       <div className={styles.imageContainer}>
//                         <img
//                           className={styles.img}
//                           src={category.image}
//                           alt={`Shop ${category.name}`}
//                           loading="lazy"
//                           onError={(e) =>
//                             (e.target.src = "/fallback-image.jpg")
//                           } // Fallback image
//                         />
//                       </div>
//                     </Link>
//                     <p>{category.name}</p>
//                   </div>
//                 </SwiperSlide>
//               ))}
//             </Swiper>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default TopCategories;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import {
  fetchTopCategories,
  setCategory,
  setSubcategory,
  selectTopCategories,
  selectCategories,
} from "../../../redux/slice/productSlice";
import SectionWrapper from "../SectionWrapper";
import Category from "./Category";
import { swiperConfig } from "./swiperConfig";
import styles from "./TopCategories.module.scss";

const TopCategories = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const topCategories = useSelector(selectTopCategories);
  const categories = useSelector(selectCategories);
  const { loading, error } = useSelector((state) => state.product);

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
    <SectionWrapper
      title="Explore Top Categories"
      subtitle="Explore the Newest Trends for Both Men and Women!"
      loading={loading}
      error={error}
      onRetry={() => dispatch(fetchTopCategories())}
      data={topCategories}
    >
      <div className={styles.container}>
        <Swiper
          {...swiperConfig}
          loop={topCategories.length >= swiperConfig.slidesPerView}
          className={styles.swiper}
        >
          {topCategories.map((category) => (
            <SwiperSlide key={category.id}>
              <Category category={category} onClick={handleCategoryClick} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </SectionWrapper>
  );
};

export default TopCategories;
