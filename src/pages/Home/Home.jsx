import TopCategories from "./TopCategories/TopCategories.jsx";
import NewArrivals from "./NewArrivals/NewArrivals";
import BrandSwiper from "./BrandSwiper/BrandSwiper.jsx";
import Categories from "./Categories/Categories.jsx";
import BestSeller from "./BestSeller/BestSeller.jsx";
import News from "./News/News.jsx";
import Order from "./Order/Order.jsx";
import "../../style/style.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  fetchBestSellers,
  fetchBrands,
  fetchNewArrivals,
  fetchNews,
  fetchTopCategories,
} from "../../redux/slice/productSlice.js";
import HeroSwiper from "../Home/Swiper/Swiper";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch all homepage data in parallel
    const fetchAll = async () => {
      try {
        await Promise.all([
          dispatch(fetchTopCategories()),
          dispatch(fetchNewArrivals({ start: 0, limit: 8 })),
          dispatch(fetchBestSellers()),
          dispatch(fetchNews()),
          dispatch(fetchBrands()),
        ]);
      } catch (err) {
        console.error("Failed to fetch homepage data:", err);
      }
    };
    fetchAll();
  }, [dispatch]);

  return (
    <div>
      <HeroSwiper />

      <TopCategories />

      <NewArrivals />

      <Categories />

      <BrandSwiper />

      <BestSeller />

      <News />

      <Order />
    </div>
  );
};

export default Home;
