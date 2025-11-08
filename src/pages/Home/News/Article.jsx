import React from "react";
import { Link } from "react-router-dom";
import styles from "./News.module.css";

function Article({ news }) {
  return (
    <div className={styles.blog}>
      <Link aria-label={news.title}>
        <img
          className={styles.blogImg}
          src={news.image}
          alt={news.alt}
          loading="lazy"
          onError={(e) => (e.target.src = "/fallback-image.jpg")}
        />
      </Link>
      <div>
        <p className={styles.blogTitle}>{news.title}</p>
      </div>
    </div>
  );
}

export default Article;
