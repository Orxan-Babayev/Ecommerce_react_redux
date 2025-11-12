import React, { useEffect, useState } from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import { Outlet } from "react-router-dom";
import Accardion from "./Accardion";

const Layout = () => {
  const [isMobile, setIsMobile] = useState(innerWidth < 768);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 768);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <Header />

      <main>
        <Outlet />
      </main>

      {!isMobile && <Footer />}
      {isMobile && <Accardion />}
    </>
  );
};

export default Layout;
