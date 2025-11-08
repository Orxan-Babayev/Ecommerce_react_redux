import { useDispatch } from "react-redux";
import { setCategory, setSubcategory } from "../../redux/slice/productSlice";
import styles from "./CategoryFilter.module.css";
import CategoryButtonGroup from "./CategoryButtonGroup";
import { memo } from "react";

const CategoryFilter = ({
  categories,
  selectedCategory,
  selectedSubcategory,
}) => {
  const dispatch = useDispatch();

  const subcategories = selectedCategory
    ? categories.find((cat) => cat.name.toLowerCase() === selectedCategory)
        ?.subCategories || []
    : [];
  console.log(selectedCategory);
  console.log(subcategories);

  return (
    <>
      <div className={styles.categories}>
        <CategoryButtonGroup
          options={categories}
          value={selectedCategory}
          onChange={(value) => dispatch(setCategory(value))}
          placeholder="All Categories"
          ariaLabel="Category"
          noOptionsMessage="No categories available"
          showAll
        />
        {selectedCategory && (
          <CategoryButtonGroup
            value={selectedSubcategory}
            onChange={(value) => dispatch(setSubcategory(value || ""))}
            options={subcategories}
            placeholder="All Subcategories"
            disabled={!selectedCategory}
            ariaLabel="Subcategory"
            noOptionsMessage="No subcategories available"
          />
        )}
        {/* <Select
          value={selectedCategory}
          onChange={(value) => dispatch(setCategory(value))}
          options={categories}
          placeholder="All Categories"
          ariaLabel="Category"
          noOptionsMessage="No categories available"
          showAll
        />
        <Select
          value={selectedSubcategory}
          onChange={(value) => dispatch(setSubcategory(value || ""))}
          options={subcategories}
          placeholder="All Subcategories"
          disabled={!selectedCategory}
          ariaLabel="Subcategory"
          noOptionsMessage="No subcategories available"
          showAll={false}
        /> */}
      </div>
    </>
  );
};
const MemoizeCategoryFilter = memo(CategoryFilter);

export default MemoizeCategoryFilter;
