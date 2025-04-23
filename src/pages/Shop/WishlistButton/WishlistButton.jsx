import React, { useState } from 'react';
import {  RiHeartFill } from "react-icons/ri";
import { CiHeart } from "react-icons/ci";




const WishlistButton = ({ product, isInWishlist, handleToggleWishlist }) => {
    const [isAdded, setIsAdded] = useState(isInWishlist(product));

    const handleToggle = () => {
        handleToggleWishlist(product);
        setIsAdded(!isAdded); // Toggle the state when button is clicked
    };

    return (
        <button className={`wishlist-button ${isAdded ? 'added' : ''}`} onClick={handleToggle}>
            {isAdded ? <RiHeartFill className="wishlist-icon" /> : <CiHeart className="wishlist-icon" />}
        </button>
    );
};

export default WishlistButton;