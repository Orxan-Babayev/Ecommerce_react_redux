import QuantityControl from "./QuantityControl";
import Button from "./Button";
import { FaHeart } from "react-icons/fa";

function ProductActions({
  quantity,
  onQuantityChange,
  onAddToCart,
  isInWishlist,
  onToggleWishlist,
}) {
  return (
    <div>
      <QuantityControl
        quantity={quantity}
        onQuantityChange={onQuantityChange}
      />
      <Button className="product_detailed_add_btn" onCLick={onAddToCart}>
        Add to Cart
      </Button>
      <Button className="product_detailed_wish_btn" onClick={onToggleWishlist}>
        <FaHeart color={isInWishlist ? "red" : "black"} />
      </Button>
    </div>
  );
}

export default ProductActions;
