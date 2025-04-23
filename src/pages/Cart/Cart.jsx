import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, increaseQuantity, decreaseQuantity } from '../../redux/slice/cartSlice.js';
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiShoppingCart } from "react-icons/ci";
import cart from './cart.module.scss'
import { Link } from 'react-router-dom';

const Cart = () => {

    const cartItems = useSelector(state => state.cart.items);
    const total = useSelector(state => state.cart.total);
    const dispatch = useDispatch();

    const handleIncreaseQuantity = (item) => {
        dispatch(increaseQuantity(item)); // Отправляем действие на увеличение количества
    };

    const handleDecreaseQuantity = (item) => {
        dispatch(decreaseQuantity(item)); // Отправляем действие на уменьшение количества
    };

    const handleRemoveItem = (item) => {
        dispatch(removeItem(item)); // Отправляем действие на удаление
    };


    return (
        <div className={cart.page}>
            <div className={cart.cont}>

                <h2 className={cart.header}>Shopping cart</h2>
                {cartItems.length === 0 ? (
                    <div className={cart.text}>
                        <CiShoppingCart size={130} color='grey' />
                        <p className={cart.login}>No Products in the Cart</p>
                      
                        <button className={cart.btn}>CONTINUE SHOPPING</button>
                     
                        <h5 className={cart.h5}>Have an account?</h5>
                        <p className={cart.login}> <Link className={cart.link}>Log in</Link> to check out faster.</p>
                    </div>
                 ) : ( 
                    <>
                    <div className={cart.info}>
                        {cartItems.map((item, index) => (
                            <div key={index} className={cart.item}>


                               
                                    <div className={cart.img}>
                                        <img className={cart.image} src={item.image} alt={item.name} />

                                    </div>
                                 
                                <div>

                                    <h3 className={cart.title}>{item.title}</h3>
                            
                                    <p className={cart.size}>Size: {item.size}</p>
                                </div>    

                                    <p className={cart.price}>${(item.price * item.quantity).toFixed(2)}</p>
                                    <div className={cart.quantity}>
                                        <button onClick={() => handleDecreaseQuantity(item)}>-</button>
                                        <p>{item.quantity}</p>
                                        <button onClick={() => handleIncreaseQuantity(item)}>+</button>

                                    </div>
                                    <RiDeleteBin6Line className={cart.bin} onClick={() => handleRemoveItem(item)} />
                            
                            </div>

                        ))}
                        
                    </div>

                        <div className={cart.total}>
                            <div className={cart.tprice}>
                                <span>Total Price: </span>
                                <p> ${total.toFixed(2)}</p>

                            </div>
                            <button className={cart.check}>Check Out</button>
                        </div>

                    </>
                 )} 
            </div>
        </div>
    )
}

export default Cart