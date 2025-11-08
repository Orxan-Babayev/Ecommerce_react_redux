import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home/Home";
import Shop from "./pages/Shop/Shop";
import ProductSingle from "./pages/Product/ProductSingle";
import Cart from "./pages/Cart/Cart";
import NotFound from "./pages/NotFound/NotFound";
import "./global.css";
import Wishlist from "./pages/Wishlist";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductSingle />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
