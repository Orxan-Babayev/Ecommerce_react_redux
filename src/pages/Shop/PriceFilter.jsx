import { useCallback, useState, useEffect, memo } from "react";
import { useDispatch } from "react-redux";
import { setPriceFilter } from "../../redux/slice/productSlice";
import { debounce } from "lodash";
import PriceInput from "./PriceInput";
import ErrorMessage from "./ErrorMessage";
import styles from "./PriceFilter.module.css";

const PriceFilter = ({ minPrice, maxPrice }) => {
  const dispatch = useDispatch();
  const [priceError, setPriceError] = useState(null);
  const [tempMaxPrice, setTempMaxPrice] = useState(maxPrice?.toString() ?? "");

  const debouncedSetPriceFilter = useCallback(
    debounce((priceFilter, tempValue) => {
      if (
        priceFilter.maxPrice !== null &&
        priceFilter.minPrice !== null &&
        priceFilter.maxPrice < priceFilter.minPrice
      ) {
        setPriceError("Max price cannot be less than min price");
      } else {
        setPriceError(null);
      }
      dispatch(setPriceFilter(priceFilter));
      setTempMaxPrice(priceFilter.maxPrice?.toString() ?? "");
    }, 400),
    [dispatch]
  );

  useEffect(() => {
    return () => {
      debouncedSetPriceFilter.cancel();
    };
  }, [debouncedSetPriceFilter]);

  const handlePriceChange = (field, value) => {
    if (field === "minPrice") {
      const parsedValue = value === "" ? null : Number(value);
      setPriceError(null);
      debouncedSetPriceFilter({
        minPrice: parsedValue,
        maxPrice,
      });
    } else if (field === "maxPrice") {
      setTempMaxPrice(value);
      const parsedValue = value === "" ? null : Number(value);
      debouncedSetPriceFilter(
        {
          minPrice,
          maxPrice: parsedValue,
        },
        value
      );
    }
  };

  const handlePriceBlur = (field, value) => {
    if (field === "maxPrice" && value !== "") {
      const parsedValue = Number(value);
      if (minPrice !== null && parsedValue < minPrice) {
        setPriceError("Max price cannot be less than min price");
        return;
      }
    }
    setPriceError(null);
  };

  return (
    <div>
      <span className={styles.priceLabel}>Price</span>
      <div className={styles.priceFilter}>
        <PriceInput
          value={minPrice ?? ""}
          onChange={(value) => handlePriceChange("minPrice", value)}
          placeholder="Min Price"
          min={0}
          ariaLabel="Minimum price"
          className={styles.priceInput}
        />
        <span className={styles.dash}>-</span>
        <PriceInput
          value={tempMaxPrice}
          onChange={(value) => handlePriceChange("maxPrice", value)}
          onBlur={(value) => handlePriceBlur("maxPrice", value)}
          placeholder="Max Price"
          min={Math.max(minPrice || 0, 0)}
          ariaLabel="Maximum price"
          className={`${styles.priceInput} ${
            priceError ? styles.errorInput : ""
          }`}
        />
        <ErrorMessage error={priceError} className={styles.errorMessage} />
      </div>
    </div>
  );
};

const MemoizePriceFilter = memo(PriceFilter);

export default MemoizePriceFilter;
