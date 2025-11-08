import { useDispatch, useSelector } from "react-redux";
import { toggleWishlist } from "../../redux/slice/wishlistSlice";
import { selectWishlistItems } from "../../redux/slice/wishlistSlice";
import { useCallback } from "react";

const useWishlist = () => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector(selectWishlistItems);
  // const isInWishlist = wishlistItems.some((product) => product.id === item.id);

  const handleToggleWishlist = useCallback(
    (item) => {
      dispatch(toggleWishlist(item));
    },
    [dispatch]
  );

  const isInWishlist = useCallback(
    (item) => wishlistItems.some((product) => product.id === item?.id),
    [wishlistItems]
  );

  return { isInWishlist, handleToggleWishlist };
};

export default useWishlist;
