import { useDispatch } from "react-redux";
import { resetFilters } from "../../redux/slice/productSlice";
import styles from "./Shop.module.scss";

const ResetButton = () => {
  const dispatch = useDispatch();

  return (
    <button
      onClick={() => dispatch(resetFilters())}
      className={styles.resetButton}
      aria-label="Reset all filters"
    >
      Reset Filters
    </button>
  );
};

export default ResetButton;
