import styles from "./SizeSelector.module.css";

function SizeSelector({ sizes, selectedSize, handleSizeChange }) {
  return (
    <div className={styles.sizeSelector}>
      {sizes.map((size) => (
        <button
          key={size.id}
          onClick={() => handleSizeChange(size.size.name)}
          className={`${styles.sizeBtn} ${
            selectedSize === size.size.name ? styles.active : ""
          }`}
        >
          {size.size.name}
        </button>
      ))}
    </div>
  );
}

export default SizeSelector;
