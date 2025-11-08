import { useNavigate } from "react-router-dom";

export function useShopNavigation() {
  const navigate = useNavigate();

  const goToShop = ({ category, subcategory, brand } = {}) => {
    const params = new URLSearchParams();
    console.log(category, subcategory);

    if (category) params.set("category", category);
    if (subcategory) params.set("subcategory", subcategory);

    if (Array.isArray(brand)) {
      brand.forEach((b) => params.append("brand", b));
    } else if (brand) {
      params.set("brands", brand);
    }

    navigate(`/shop?${params.toString()}`);
    console.log(params.toString());
  };

  return { goToShop };
}
