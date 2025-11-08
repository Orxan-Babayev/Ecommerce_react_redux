import { Link } from "react-router-dom";
import styles from "./header.module.css";
import { useDispatch } from "react-redux";
import { resetFilters } from "../../../redux/slice/productSlice";

function Nav() {
  const dispatch = useDispatch();

  return (
    <div className={styles.head}>
      <nav className={styles.nav}>
        <ul className={styles.navbar}>
          <li>
            <Link to={"/"} className={styles.navigate}>
              HOME
            </Link>
          </li>
          <li>
            <Link
              to={"/shop"}
              onClick={() => dispatch(resetFilters())}
              className={styles.navigate}
            >
              SHOP
            </Link>
          </li>
          <li>
            <Link to={"/"} className={styles.navigate}>
              PRODUCTS
            </Link>
          </li>
          <li>
            <Link to={"/"} className={styles.navigate}>
              FEATURES
            </Link>
          </li>
          <li>
            <Link to={"/"} className={styles.navigate}>
              DEAL ZONE
            </Link>
          </li>
          <li>
            <Link to={"/"} className={styles.navigate}>
              BLOG
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Nav;
