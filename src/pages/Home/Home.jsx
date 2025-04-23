import Swiper from "../Home/Swiper/Swiper";
import TopCategories from "./TopCategories/TopCategories.jsx";
import NewArrivals from "./NewArrivals/NewArrivals";
import BrandSwiper from "./BrandSwiper/BrandSwiper.jsx";
import Categories from "./Categories/Categories.jsx";
import TopSeller from "./TopSeller/TopSeller.jsx";
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
      <TopSeller />
      <News />
      <Order />
    </div>
  );
};

export default Home;
