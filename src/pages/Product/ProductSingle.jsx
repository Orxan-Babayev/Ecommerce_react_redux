import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductById } from "../../redux/slice/detailSlice";
import { useParams } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../redux/slice/wishlistSlice";
import { addItem, updateCartItemQuantity } from "../../redux/slice/cartSlice";

const ProductSingle = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const item = useSelector((state) =>
    state.productdetail.products.find((product) => product.id === Number(id))
  );
  console.log(item);
  //  change and selector plsce to slicer  and this id is id where i get from url and and i send it to slicer and find product where id

  const wishlistItems = useSelector((state) => state.wishlist.items);

  // why i needv  wishlistitems in this

  const cartItems = useSelector((state) => state.cart.items);

  // add cartItems why i need in this page

  const [quantity, setQuantity] = useState(1); // Local state for quantity
  //  why i need this quntity because i have quentity in slicer

  const [selectedSize, setSelectedSize] = useState(""); // Local state for selected size

  //  and this where i will use

  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [dispatch, id]);

  const handleSizeChange = (size) => {
    setSelectedSize(size);
    setQuantity(1);
  };

  const isInWishlist = (item) => {
    return wishlistItems.some((product) => product.id === item.id);
  };

  const handleAddToCart = () => {
    if (selectedSize) {
      const existingCartItem = cartItems.find(
        (product) => product.id === item.id && product.size === selectedSize
      );
      if (existingCartItem) {
        const newQuantity = existingCartItem.quantity + quantity;
        dispatch(
          updateCartItemQuantity({ id: item.id, quantity: newQuantity })
        );
      } else {
        dispatch(addItem({ ...item, quantity, size: selectedSize }));
      }
      setQuantity(1);
      setSelectedSize("");
    } else {
      alert("Select Color");
    }
  };

  const handleToggleWishlist = () => {
    if (isInWishlist(item)) {
      dispatch(removeFromWishlist(item));
    } else {
      dispatch(addToWishlist(item));
    }
  };

  console.log("Product from useSelector:", item);

  if (!item) {
    return <div>Product not found</div>;
  }

  return (
    <div>
      <img src={item.image} alt="" />
      <h2>{item.title}</h2>
      <p>{item.description}</p>
      <p>{item.category_name}</p>
      <p>In Stock: {item.InStock.stockCount}</p>
      {/* item  page */}
      {item.sizes && (
        <div className="product_sizes">
          <p>Sizes:</p>
          <ul>
            {item.sizes.map((size) => (
              <li
                key={size.id}
                className={selectedSize === size.name ? "selected" : ""}
                onClick={() => handleSizeChange(size.name)}
              >
                {size.name}
              </li>
            ))}
          </ul>
        </div>
      )}
      <div>
        <div>
          <button
            onClick={() =>
              setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1))
            }
          >
            -
          </button>
          <span>{quantity}</span>
          <button
            onClick={() => setQuantity((prevQuantity) => prevQuantity + 1)}
          >
            +
          </button>
        </div>
        <button className="product_detailed_add_btn" onClick={handleAddToCart}>
          Add to Cart
        </button>
        <button
          className="product_detailed_wish_btn"
          onClick={handleToggleWishlist}
        >
          {isInWishlist(item) ? <FaHeart color="red" /> : <FaHeart />}
        </button>
      </div>
    </div>
  );
};

export default ProductSingle;
