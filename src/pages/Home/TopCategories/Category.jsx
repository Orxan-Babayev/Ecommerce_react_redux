import React from "react";
import { Link } from "react-router-dom";

const Category = ({ category, onClick }) => {
  return (
    <div>
      <Link
        to="/shop"
        onClick={() => onClick(category.name)}
        aria-label={`Shop ${category.name}`}
      >
        <div>
          <img
            src={category.image}
            alt={`Shop ${category.name}`}
            loading="lazy"
            onError={(e) => (e.target.src = "/fallback-image.jpg")}
          />
        </div>
      </Link>
      <p>{category.name}</p>
    </div>
  );
};

export default Category;
