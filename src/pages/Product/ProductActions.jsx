import QuantityControl from "./QuantityControl";
import Button from "./Button";
import { FaHeart } from "react-icons/fa";
import PaymentIcons from "../../components/Layout/Footer/PaymentIcons";
import styles from "./ProductActions.module.css";
import { MdOutlineCalendarMonth } from "react-icons/md";
import Delivery from "./Delivery";

function ProductActions({
  product,
  quantity,
  onQuantityChange,
  onAddToCart,
  isInWishlist,
  onToggleWishlist,
}) {
  return (
    <div className={styles.actions}>
      <div className={styles.quantity}>
        <QuantityControl
          quantity={quantity}
          onQuantityChange={onQuantityChange}
        />
        <Button
          className={styles.wishlist}
          onClick={() => onToggleWishlist(product)}
        >
          <FaHeart color={isInWishlist(product) ? "red" : "black"} /> Add to
          Wishlist
        </Button>
      </div>
      <Button className={styles.addBtn} onClick={onAddToCart}>
        Add to Cart
      </Button>
      <div className={styles.icons}>
        <PaymentIcons />
      </div>
      <Delivery />

      <div className={styles.calendar}>
        <MdOutlineCalendarMonth className={styles.calendarIcons} />
        <span>Estimated delivery between 07 November - 13 November. </span>
      </div>
    </div>
  );
}

export default ProductActions;
