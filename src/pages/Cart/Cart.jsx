import { useSelector } from "react-redux";
import cart from "./cart.module.scss";
import EmptyCart from "./EmptyCart.jsx";
import CartItem from "./CartItem.jsx";
import CartTotal from "./CartTotal.jsx";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const total = useSelector((state) => state.cart.total);

  return (
    <div className={cart.container}>
      <div className={cart.cont}>
        <h1 className={cart.header}>Shopping cart</h1>
        {cartItems.length === 0 ? (
          <EmptyCart />
        ) : (
          <>
            <div className={cart.info}>
              {cartItems.map((item, index) => (
                <CartItem key={index} item={item} />
              ))}
            </div>
            <CartTotal total={total} />
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
