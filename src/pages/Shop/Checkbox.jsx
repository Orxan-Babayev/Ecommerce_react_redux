import { useDispatch } from "react-redux";
import styles from "./Checkbox.module.css";

const Checkbox = ({
  items,
  selectedItems,
  toggleAction,
  label,
  itemKey,
  ariaLabelPrefix,
  children,
  hideCheckbox = false, // New prop to hide checkbox
}) => {
  const dispatch = useDispatch();

  return (
    <div className={styles.checkboxGroup} aria-labelledby={`${label}-label`}>
      <span id={`${label}-label`} className={styles.checkboxLabel}>
        {label}
      </span>
      {items.length > 0 ? (
        items.map((item) => (
          <label
            key={item.id}
            className={`${styles.checkboxItem} ${
              selectedItems.includes(item[itemKey]) ? styles.selected : ""
            }`}
          >
            <input
              type="checkbox"
              checked={selectedItems.includes(item[itemKey])}
              onChange={() => dispatch(toggleAction(item[itemKey]))}
              aria-label={`${ariaLabelPrefix} ${item[itemKey]}`}
              className={hideCheckbox ? styles.hiddenCheckbox : ""}
            />
            {children ? children(item) : item[itemKey]}
          </label>
        ))
      ) : (
        <p className={styles.noOptions}>No {label.toLowerCase()} available</p>
      )}
    </div>
  );
};

export default Checkbox;
