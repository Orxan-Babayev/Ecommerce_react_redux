import Checkbox from "./Checkbox";
import { toggleColor } from "../../redux/slice/productSlice";
import styles from "./ColorFilter.module.css";
import { memo } from "react";

const ColorFilter = ({ colors, selectedColors }) => (
  <Checkbox
    items={colors}
    selectedItems={selectedColors}
    toggleAction={toggleColor}
    label="Colors"
    itemKey="color"
    ariaLabelPrefix="Filter by"
    hideCheckbox // Hide checkbox for swatch-only display
    variant="button"
  >
    {(item) => (
      <span
        className={styles.colorSwatch}
        style={{ backgroundColor: item.color }}
        aria-hidden="true"
      />
    )}
  </Checkbox>
);

const MemoizeColorFilter = memo(ColorFilter);

export default MemoizeColorFilter;
