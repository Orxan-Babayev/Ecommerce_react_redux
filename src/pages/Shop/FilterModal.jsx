import React, { useEffect, useRef } from "react";
import styles from "./FilterModal.module.css";

function FilterModal({ children, onClose }) {
  const modalRef = useRef(null);

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
        {children}
      </div>
    </div>
  );
}

export default FilterModal;
