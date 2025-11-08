import { Link } from "react-router-dom";
import styles from "./Category.module.css";

const Category = ({ category, onClick }) => {
  return (
    <div className={styles.topCategories}>
      <div
        role="link"
        className={styles.link}
        onClick={() => onClick(category.name)}
        aria-label={`Shop ${category.name}`}
      >
        <div className={styles.img_box}>
          <img
            className={styles.img}
            src={category.image}
            alt={`Image of ${category.name} category`}
            loading="lazy"
            onError={(e) => (e.target.src = "/fallback-image.jpg")}
          />
        </div>
        <p className={styles.categoryName}>{category.name}</p>
      </div>
    </div>
  );
};

export default Category;
