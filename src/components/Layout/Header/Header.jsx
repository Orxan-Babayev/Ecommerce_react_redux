
import { RiArrowDropDownLine } from "react-icons/ri"
import { Link } from 'react-router-dom'
import { CiSearch } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import { CiHeart } from "react-icons/ci";
import { GrPowerReset } from "react-icons/gr";
import { BsCart2 } from "react-icons/bs";
import headerstyles from './header.module.scss'
import logo from '../../../assets/logo-dark.avif'
import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchQuery, selectSearchQuery } from '../../../redux/slice/productSlice'; 
import Wishlist from './Wishlist/Wishlist';



const Header = () => {
  const [showWishlistModal, setShowWishlistModal] = useState(false);
  const searchQuery = useSelector(selectSearchQuery);
  const dispatch = useDispatch();
  const [query, setQuery] = useState(searchQuery);
  const navigate = useNavigate(); 
  const wishlistItems = useSelector(state => state.wishlist.items);

 
  const handleWishlistIconClick = () => {
    setShowWishlistModal(true);
};
  const handleSearch = () => {
    dispatch(setSearchQuery(query)); // Dispatch the action to set the search query in the Redux store
    navigate(`/shop?search=${encodeURIComponent(query)}`); // Navigate to the shop page with search query as URL parameter
    setQuery('');
};

  const handleReset = () => {
    setQuery(''); // Clear the search query
    dispatch(setSearchQuery('')); // Dispatch the action to clear the search query in the Redux store
};


 const totalWishlistQuantity = wishlistItems.length;

const handleInputChange = (e) => {
  setQuery(e.target.value); // Update the local state with the input value
};
  return (
    <>
      <header className={headerstyles.head}>

        <div className={headerstyles.top}>

          <div className={headerstyles.contact}>
            <span>
              AVAILABLE 24/7 AT +566 4444 9940
            </span>
          </div>
          <div className={headerstyles.order}>
            <span>
              FREE DELIVERY ON ORDERS OVER $120. DON’T MISS.
            </span>
          </div>
          <div className={headerstyles.modal}>
            <div className={headerstyles.lang}>
              <svg xmlns="http://www.w3.org/2000/svg" id="flag-icons-gb" viewBox="0 0 640 480" width='15px' height='12px'>
                <path fill="#012169" d="M0 0h640v480H0z" />
                <path fill="#FFF" d="m75 0 244 181L562 0h78v62L400 241l240 178v61h-80L320 301 81 480H0v-60l239-178L0 64V0h75z" />
                <path fill="#C8102E" d="m424 281 216 159v40L369 281h55zm-184 20 6 35L54 480H0l240-179zM640 0v3L391 191l2-44L590 0h50zM0 0l239 176h-60L0 42V0z" />
                <path fill="#FFF" d="M241 0v480h160V0H241zM0 160v160h640V160H0z" />
                <path fill="#C8102E" d="M0 193v96h640v-96H0zM273 0v480h96V0h-96z" />
              </svg>

              <span>ENGLISH</span>
              <RiArrowDropDownLine className={headerstyles.dropicon} />
            </div>
            <div className={headerstyles.curren}>
              <span>
                USD $
              </span>
              <RiArrowDropDownLine className={headerstyles.dropicon} />
            </div>
          </div>
        </div>
        <nav className={headerstyles.nav}>
          <div className={headerstyles.logo}>
            <Link to={'/'}>
              <img src={logo} alt="" />
            </Link>
          </div>

          <ul className={headerstyles.navbar}>
            <li>
              <Link className={headerstyles.navigate} >HOME</Link>
            </li>
            <li>
              <Link to={'/shop'} className={headerstyles.navigate}>SHOP</Link>
            </li>
            <li>
              <Link className={headerstyles.navigate}>PRODUCTS</Link>
            </li>
            <li>
              <Link className={headerstyles.navigate}>FEATURES</Link>
            </li>
            <li>
              <Link className={headerstyles.navigate}>DEAL ZONE</Link>
            </li>
            <li>
              <Link className={headerstyles.navigate}>BLOG</Link>
            </li>
          </ul>
          <ul className={headerstyles.icons}>
       
            <Link>  <li>
         
                  
                       
                    <input
                        type="text"
                        value={query}
                        onChange={handleInputChange}
                      
                        placeholder="Search products..."
                       
                    />

                    <CiSearch  onClick={handleSearch}></CiSearch>
                
                <GrPowerReset  onClick={handleReset}></GrPowerReset> Reset button to clear the search query
             
            </li> </Link>
            <Link>  <li><CiUser /></li> </Link>
            <Link>  <li><CiHeart onClick={handleWishlistIconClick} /> {totalWishlistQuantity}</li> </Link>
        <li>     <Link to={'/cart'}>  <BsCart2 /></Link></li> 
          </ul>
        </nav>
        <div>
        <Wishlist
                showModal={showWishlistModal}
                handleCloseModal={() => setShowWishlistModal(false)}
                />
        </div>


      </header>
    </>
  )
}

export default Header