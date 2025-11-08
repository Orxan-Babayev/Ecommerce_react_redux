import { CiShoppingCart } from "react-icons/ci";
import { Link } from "react-router-dom";
import cart from "./emptyCart.module.css";
import Button from "../Product/Button";

function EmptyCart() {
  return (
    <div className={cart.text}>
      <CiShoppingCart size={150} color="grey" />
      <p className={cart.login}>No Products in the Cart</p>
      <Button className={cart.btn}>CONTINUE SHOPPING</Button>
      <h5>Have an account?</h5>
      <p>
        <Link className={cart.link}>Log in</Link> to check out faster.
      </p>
    </div>
  );
}
export default EmptyCart;
