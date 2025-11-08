import React, { memo } from "react";
import { Link, useLocation } from "react-router-dom";
import { MdArrowForwardIos } from "react-icons/md";
import styles from "./Breadcrumbs.module.css";

function Breadcrumbs() {
  const location = useLocation();
  console.log(location);
  const pathnames = location.pathname.split("/").filter(Boolean);

  const searchParams = new URLSearchParams(location.search);
  const category = searchParams.get("category");
  const subcategory = searchParams.get("subcategory");

  const breadcrumbs = [
    { label: "Home", path: "/" },
    { label: "Shop", path: "/shop" },
  ];

  if (category) {
    breadcrumbs.push({
      label: category,
      path: `/shop?category=${category}`,
    });
  }

  if (subcategory) {
    breadcrumbs.push({
      label: subcategory,
      path: `/shop?category=${category}&subcategory=${subcategory}`,
    });
  }

  return (
    <nav className="container">
      <ul className={styles.nav}>
        {breadcrumbs.map((crumb, index) => (
          <li key={crumb.path}>
            <Link to={crumb.path}>{crumb.label}</Link>
            {index < breadcrumbs.length - 1 && (
              <MdArrowForwardIos className={styles.icon} />
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}

const MemoizeBreadcrumbs = memo(Breadcrumbs);

export default MemoizeBreadcrumbs;
