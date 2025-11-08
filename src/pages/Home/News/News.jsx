import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchNews,
  selectNews,
  selectNewsError,
  selectNewsLoading,
} from "../../../redux/slice/productSlice";
import SectionWrapper from "../SectionWrapper";
import { swiperConfig } from "../TopCategories/swiperConfig";
import Article from "./Article";
import { memo } from "react";
import styles from "./News.module.css";

const News = memo(() => {
  const dispatch = useDispatch();

  const newsData = useSelector(selectNews);
  const loading = useSelector(selectNewsLoading);
  const error = useSelector(selectNewsError);

  return (
    <>
      <SectionWrapper
        title="Explore Top Categories"
        subtitle="Explore the Newest Trends for Both Men and Women!"
        loading={loading}
        error={error}
        onRetry={() => dispatch(fetchNews())}
        data={newsData}
        className="background"
      >
        {newsData.length > 0 && (
          <div className="container padding-bottom-sm">
            <Swiper
              // {...swiperConfig}
              slidesPerView={3}
              spaceBetween={30}
              loop={newsData.length >= 3}
            >
              {newsData.map((news) => (
                <SwiperSlide key={news.id}>
                  <Article news={news} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
      </SectionWrapper>
    </>
  );
});

News.displayName = "News";

export default News;
