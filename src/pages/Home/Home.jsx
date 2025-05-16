import Swiper from "../Home/Swiper/Swiper";
import TopCategories from "./TopCategories/TopCategories.jsx";
import NewArrivals from "./NewArrivals/NewArrivals";
import BrandSwiper from "./BrandSwiper/BrandSwiper.jsx";
import Categories from "./Categories/Categories.jsx";
import BestSeller from "./BestSeller/BestSeller.jsx";
import News from "./News/News.jsx";
import Order from "./Order/Order.jsx";
import "../../style/style.css";

const Home = () => {
  return (
    <div>
      <Swiper />

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
