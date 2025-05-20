import { useDispatch, useSelector } from "react-redux";
import { toggleWishlist } from "../../redux/slice/wishlistSlice";
import { selectWishlistItems } from "../../redux/slice/wishlistSlice";

const useWishlist = (item) => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector(selectWishlistItems);
  const isInWishlist = wishlistItems.some((product) => product.id === item.id);

  const handleToggleWishlist = () => {
    dispatch(toggleWishlist(item));
  };

  return { isInWishlist, handleToggleWishlist };
};

export default useWishlist;
