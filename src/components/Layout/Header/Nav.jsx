import { Link } from "react-router-dom";
import styles from "./header.module.css";
import { useDispatch } from "react-redux";
import { resetFilters } from "../../../redux/slice/productSlice";

function Nav({ className }) {
  const dispatch = useDispatch();

  const nav = [
    { to: "/", title: "HOME" },
    { to: "/shop", title: "SHOP" },
    { to: "/", title: "PRODUCTS" },
    { to: "/", title: "FEATURES" },
    { to: "/", title: "DEAL ZONE" },
    { to: "/", title: "BLOG" },
  ];

  return (
    <ul className={`${styles.navbar} ${className || ""}`}>
      {nav.map((nav, index) => (
        <li key={index}>
          <Link
            to={nav.to}
            onClick={
              nav.to === "/shop" ? () => dispatch(resetFilters()) : undefined
            }
            className={styles.navigate}
          >
            {nav.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default Nav;
