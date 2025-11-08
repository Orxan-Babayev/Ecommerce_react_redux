import { Link } from "react-router-dom";
import logo from "../../../assets/logo-dark.avif";
import styles from "./header.module.css";

const Logo = () => {
  return (
    <div>
      <Link to={"/"}>
        <img className={styles.logo} src={logo} alt="Website logo" />
      </Link>
    </div>
  );
};

export default Logo;
