import React, { useEffect, useRef } from "react";
import "./wishlistModal.css";
import { useSelector, useDispatch } from "react-redux";
import { removeFromWishlist } from "../../../../redux/slice/wishlistSlice";
import { MdDeleteOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const WishlistModal = ({ showModal, handleCloseModal }) => {
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const dispatch = useDispatch();
  const modalRef = useRef(null); // Create a ref for the modal container
  const navigate = useNavigate();

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
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Remove the event listener when the modal is hidden
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showModal, handleCloseModal]);

  return (
    <>
      {showModal && (
        <div className="wishlist-modal">
          <div className="wishlist-modal-content" ref={modalRef}>
            <span className="modalClose" onClick={handleCloseModal}>
              &times;
            </span>
            <h4>Wishlist</h4>

            <div>
              {wishlistItems && wishlistItems.length > 0 ? (
                wishlistItems.map((item, index) => (
                  <div key={index} className="wishlist-product-info">
                    <img src={item.image} alt={item.name} />
                    <div className="wishlist-details">
                      <h3>{item.title}</h3>

                      <span>Price: ${item.price}</span>
                      <MdDeleteOutline
                        className="wishlist_remove"
                        onClick={() => handleRemoveFromWishlist(item)}
                      ></MdDeleteOutline>
                    </div>
                  </div>
                ))
              ) : (
                <p>Your wishlist is empty.</p>
              )}
            </div>
            <button
              onClick={() => {
                handleCloseModal();
                navigate("/wishlist");
              }}
              className="wishlist_close_btn"
            >
              Go to Wishlsit
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default WishlistModal;
