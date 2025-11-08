import Checkbox from "./Checkbox";
import { toggleBrand } from "../../redux/slice/productSlice";
import { memo } from "react";

const BrandFilter = ({ brands, selectedBrands }) => (
  <Checkbox
    items={brands}
    selectedItems={selectedBrands}
    toggleAction={toggleBrand}
    label="Brands"
    itemKey="brand"
    ariaLabelPrefix="Filter by"
    variant="button"
  />
);

const MemoizeBrandFilter = memo(BrandFilter);

export default MemoizeBrandFilter;
