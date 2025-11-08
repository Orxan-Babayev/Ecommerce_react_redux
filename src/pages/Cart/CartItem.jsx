import React from "react";
import { useDispatch } from "react-redux";
import {
  removeItem,
  increaseQuantity,
  decreaseQuantity,
} from "../../redux/slice/cartSlice.js";
import { RiDeleteBin6Line } from "react-icons/ri";
import cart from "./cart.module.scss";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  return (
    <div className={cart.item}>
      <div className={cart.detail}>
        <div className={cart.img}>
          <img className={cart.image} src={item.image} alt={item.name} />
        </div>
        <div>
          <h3 className={cart.title}>{item.title}</h3>
          <span className={cart.size}>Size: {item.size.toUpperCase()}</span>
        </div>
      </div>
      <p className={cart.price}>${item.price.toFixed(2)}</p>
      <div className={cart.detail}>
        <div className={cart.quantityBtn}>
          <button
            className={cart.btn}
            onClick={() => dispatch(decreaseQuantity(item))}
          >
            -
          </button>
          <div className={cart.quantity}>{item.quantity}</div>
          <button
            className={cart.btn}
            onClick={() => dispatch(increaseQuantity(item))}
          >
            +
          </button>
        </div>
        <RiDeleteBin6Line
          size={16}
          onClick={() => dispatch(removeItem(item))}
        />
      </div>
      <p className={cart.price}>${(item.price * item.quantity).toFixed(2)}</p>
    </div>
  );
};

export default React.memo(CartItem);
