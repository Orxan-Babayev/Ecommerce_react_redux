import { useDispatch } from "react-redux";
import { setSortingOption } from "../../redux/slice/productSlice";
import Select from "./Select";

const SortFilter = ({ sortingOption }) => {
  const dispatch = useDispatch();

  const sortOptions = [
    { id: "price_low_to_high", name: "Price: Low to High" },
    { id: "price_high_to_low", name: "Price: High to Low" },
  ];

  return (
    <Select
      value={sortingOption}
      onChange={(value) => dispatch(setSortingOption(value))}
      options={sortOptions}
      placeholder="Sort By"
      ariaLabel="Sort products"
      noOptionsMessage="No sorting options available"
    />
  );
};

export default SortFilter;
