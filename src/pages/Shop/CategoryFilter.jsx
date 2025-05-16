import { useDispatch } from "react-redux";
import { setCategory, setSubcategory } from "../../redux/slice/productSlice";
import Select from "./Select";

const CategoryFilter = ({
  categories,
  selectedCategory,
  selectedSubcategory,
}) => {
  const dispatch = useDispatch();

  const subcategories = selectedCategory
    ? categories.find((cat) => cat.name === selectedCategory)?.sub_categories ||
      []
    : [];

  return (
    <>
      <Select
        value={selectedCategory}
        onChange={(value) => dispatch(setCategory(value))}
        options={categories}
        placeholder="All Categories"
        ariaLabel="Select category"
        noOptionsMessage="No categories available"
      />
      <Select
        value={selectedSubcategory}
        onChange={(value) => dispatch(setSubcategory(value || ""))}
        options={subcategories}
        placeholder="All Subcategories"
        disabled={!selectedCategory}
        ariaLabel="Select subcategory"
        noOptionsMessage="No subcategories available"
      />
    </>
  );
};

export default CategoryFilter;
