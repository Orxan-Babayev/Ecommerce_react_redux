import { CiShoppingCart } from "react-icons/ci";
import { Link } from "react-router-dom";
import cart from "./emptyCart.module.css";

function EmptyCart() {
  return (
    <div className={cart.text}>
      <CiShoppingCart size={130} color="grey" />
      <p className={cart.login}>No Products in the Cart</p>
      <button className={cart.btn}>CONTINUE SHOPPING</button>
      <h5 className={cart.h5}>Have an account?</h5>
      <p className={cart.login}>
        {" "}
        <Link className={cart.link}>Log in</Link> to check out faster.
      </p>
    </div>
  );
}
export default EmptyCart;
