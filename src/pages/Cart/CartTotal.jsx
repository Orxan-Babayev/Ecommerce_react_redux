import React from "react";
import cart from "./cart.module.scss";
import Button from "../Product/Button";
import Delivery from "../Product/Delivery";
import { Link } from "react-router-dom";

const CartTotal = ({ total }) => {
  return (
    <div className={cart.total}>
      <div>
        <div className={cart.tprice}>
          <p>Add a Gift Wrap to your order, For $5.00</p>
          <Button className={cart.add}> Add A Gift Wrapper</Button>
        </div>
        <form className={cart.text} action="">
          <label htmlFor="">Add Special instructions for your order</label>
          <textarea name="" id=""></textarea>
        </form>
      </div>
      <div className={cart.check}>
        <Delivery />
        <form action="">
          <label className={cart.coupon} htmlFor="">
            Coupon Code
          </label>
          <input type="text" />
          <label className={cart.label} htmlFor="">
            Coupon code will be applied on the checkout page
          </label>
        </form>
        <div className={cart.totalTax}>
          <div className={cart.totals}>
            <span>Total </span>
            <span> ${total.toFixed(2)}</span>
          </div>
          <div className={cart.tax}>
            Tax included. <Link to=""> Shipping</Link> calculated at checkout.
          </div>
        </div>
        <Button className={cart.btn}>Check Out</Button>
      </div>
    </div>
  );
};

export default CartTotal;
