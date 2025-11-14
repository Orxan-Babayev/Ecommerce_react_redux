import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  setSearchQuery,
  selectSearchQuery,
  fetchData,
} from "../../../redux/slice/productSlice";
import styles from "./header.module.css";

import Nav from "./Nav";
import SearchBar from "./SearchBar";
import HeaderIcons from "./HeaderIcons";
import Logo from "./Logo";
import WishlistModal from "./Wishlist/WishlistModal";
import { GiHamburgerMenu } from "react-icons/gi";
import NavModal from "./NavModal";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchQuery = useSelector(selectSearchQuery);
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const totalWishlistQuantity = wishlistItems.length;

  const [showWishlistModal, setShowWishlistModal] = useState(false);
  const [query, setQuery] = useState(searchQuery);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 1024);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSearch = useCallback(() => {
    if (!query.trim()) return;
    dispatch(setSearchQuery(query));
    navigate("/shop");
    setQuery("");
  }, [query, dispatch, navigate]);

  const handleReset = useCallback(() => {
    dispatch(setSearchQuery(""));
    setQuery("");
  }, [dispatch]);

  const handleWishlistClick = useCallback(() => {
    setShowWishlistModal(true);
  }, []);

  useEffect(() => {
    dispatch(
      fetchData({
        searchQuery,
      })
    );
  }, [dispatch, searchQuery]);

  return (
    <>
      <header className={styles.header}>
        <div>
          {isMobile && (
            <>
              <GiHamburgerMenu onClick={() => setIsModalOpen(true)} />
              {isModalOpen && (
                <NavModal onClose={() => setIsModalOpen(false)} />
              )}
            </>
          )}
          <Logo />
        </div>
        {!isMobile && (
          <div className={styles.head}>
            <nav className={styles.nav}>
              <Nav />
            </nav>
          </div>
        )}
        <SearchBar
          query={query}
          setQuery={setQuery}
          onSearch={handleSearch}
          onReset={handleReset}
        />
        <HeaderIcons
          wishlistCount={totalWishlistQuantity}
          onWishlistClick={handleWishlistClick}
        />
        <WishlistModal
          showModal={showWishlistModal}
          handleCloseModal={() => setShowWishlistModal(false)}
        />
      </header>
    </>
  );
};

export default Header;
