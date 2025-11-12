import React, { useEffect, useRef, useState } from "react";
import styles from "./NavModal.module.css";
import { Link } from "react-router-dom";
import { MdArrowForwardIos } from "react-icons/md";
import { resetFilters } from "../../../redux/slice/productSlice";
import { useDispatch } from "react-redux";
import LanguageSelect from "./LanguageSelect";
import CurrencySelect from "./CurrencySelect";
import Button from "../../../pages/Product/Button";

function NavModal({ onClose }) {
  const modalRef = useRef(null);

  const [isOpen, setIsOpen] = useState("menu");

  const dispatch = useDispatch();

  const nav = [
    { to: "/", title: "HOME" },
    { to: "/shop", title: "SHOP" },
    { to: "/", title: "PRODUCTS" },
    { to: "/", title: "FEATURES" },
    { to: "/", title: "DEAL ZONE" },
    { to: "/", title: "BLOG" },
  ];

  function handleClickOutside(e) {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose(); // Clicked outside modal → close
    }
  }

  useEffect(() => {
    // Listen for clicks on whole document
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.modalOverlay}>
      <div ref={modalRef} className={styles.modal}>
        <span onClick={onClose} className={styles.close}>
          &times;
        </span>
        <nav className={styles.nav}>
          <div className={styles.btn}>
            <Button
              className={`${isOpen === "menu" ? styles.active : ""}`}
              onClick={() => setIsOpen("menu")}
            >
              Menu
            </Button>
            <Button
              className={`${isOpen === "categories" ? styles.active : ""}`}
              onClick={() => setIsOpen("categories")}
            >
              Categories
            </Button>
          </div>
          <ul className={styles.navbar}>
            {nav.map((nav, index) => (
              <li key={index}>
                <Link
                  to={nav.to}
                  onClick={
                    nav.to === "/shop"
                      ? () => dispatch(resetFilters())
                      : undefined
                  }
                  className={styles.navigate}
                >
                  {nav.title}
                </Link>
              </li>
            ))}

            <li className={styles.navigate}>
              NEED HELP?
              <span>Call: +41 525 523 5687</span>
            </li>

            <LanguageSelect />
            <CurrencySelect />
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default NavModal;
