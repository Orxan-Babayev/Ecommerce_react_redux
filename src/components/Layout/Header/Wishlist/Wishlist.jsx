import React, { useEffect, useRef } from 'react';
import './wishlistModal.css';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromWishlist } from '../../../../redux/slice/wishlistSlice';
import { MdDeleteOutline } from "react-icons/md";

const WishlistModal = ({ showModal, handleCloseModal }) => {
    const wishlistItems = useSelector(state => state.wishlist.items);
    const dispatch = useDispatch();
    const modalRef = useRef(null); // Create a ref for the modal container

    // Function to handle removal from wishlist
    const handleRemoveFromWishlist = (item) => {
        dispatch(removeFromWishlist(item));
    };

    useEffect(() => {
        // Add event listener to detect clicks outside of the modal
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                handleCloseModal();
            }
        };

        // Add the event listener when the modal is shown
        if (showModal) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        // Remove the event listener when the modal is hidden
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showModal, handleCloseModal]);

    return (
        <>
            {showModal && (
                <div className="wishlist-modal">
                    <div className="wishlist-modal-content" ref={modalRef}>
                        <h2>Wishlist</h2>
                        {wishlistItems && wishlistItems.length > 0 ? (
                            wishlistItems.map((item, index) => (
                                <div key={index} className="wishlist-product-info">
                                    <img src={item.image} alt={item.name} />
                                    <div className="wishlist-details">
                                        <h3>{item.name}</h3>
                                        <p>Price: ${item.price}</p>
                                        <MdDeleteOutline className='wishlist_remove' onClick={() => handleRemoveFromWishlist(item)}></MdDeleteOutline>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>Your wishlist is empty.</p>
                        )}
                        <button className='wishlist_close_btn' onClick={handleCloseModal}>Close</button>
                    </div>
                </div>
            )}
        </>
    );
}

export default WishlistModal;