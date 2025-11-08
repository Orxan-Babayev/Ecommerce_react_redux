import { useDispatch } from "react-redux";
import { setSortingOption } from "../../redux/slice/productSlice";
import DropdownSelect from "./DropdownSelect";
import { memo } from "react";

const SortFilter = ({ sortingOption }) => {
  const dispatch = useDispatch();

  const sortOptions = [
    {
      id: "price_low_to_high",
      name: "price_low_to_high",
      value: "Price: Low to High",
    },
    {
      id: "price_high_to_low",
      name: "price_high_to_low",
      value: "Price: High to Low",
    },
  ];

  return (
    <DropdownSelect
      value={sortingOption}
      onChange={(value) => dispatch(setSortingOption(value))}
      options={sortOptions}
      placeholder="Sort By"
      ariaLabel="Sort products"
      noOptionsMessage="No sorting options available"
    />
  );
};

const MemoizeSortFilter = memo(SortFilter);

export default MemoizeSortFilter;
