import Checkbox from "./Checkbox";
import { toggleBrand } from "../../redux/slice/productSlice";

const BrandFilter = ({ brands, selectedBrands }) => (
  <Checkbox
    items={brands}
    selectedItems={selectedBrands}
    toggleAction={toggleBrand}
    label="Brands"
    itemKey="brand"
    ariaLabelPrefix="Filter by"
  />
);

export default BrandFilter;
