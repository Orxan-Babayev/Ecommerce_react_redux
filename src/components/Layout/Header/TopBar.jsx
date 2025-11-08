import { LuPhone } from "react-icons/lu";
import { RiArrowDropDownLine } from "react-icons/ri";
import Flag from "./Flag";
import styles from "./header.module.css";

function TopBar() {
  return (
    <div className={styles.top}>
      <div className={styles.connection}>
        <LuPhone className={styles.phoneIcon} aria-hidden="true" />
        <span className={styles.contact}>AVAILABLE 24/7 AT +566 4444 9940</span>
      </div>
      <span className={styles.order}>
        FREE DELIVERY ON ORDERS OVER $120. DON’T MISS.
      </span>

      <div className={styles.modal}>
        <Flag width={15} height={12} />
        <span>ENGLISH</span>
        <RiArrowDropDownLine className={styles.dropicon} />

        <span>USD $</span>
        <RiArrowDropDownLine className={styles.dropicon} />
      </div>
    </div>
  );
}

export default TopBar;
