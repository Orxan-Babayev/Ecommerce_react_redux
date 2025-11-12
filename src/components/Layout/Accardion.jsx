import logo from "../../assets/logo-dark.png";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import PaymentIcons from "./Footer/PaymentIcons";
import { Link } from "react-router-dom";
import { useState } from "react";
import style from "./Accordion.module.css";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import FooterLogo from "./Footer/FooterLogo";
import FooterNewsLetter from "./Footer/FooterNewsLetter";

function Accardion() {
  const [openIndex, setOpenIndex] = useState(null);

  const data = [
    {
      id: "INFORMATION",
      content: [
        "Latest News",
        "Career",
        " My Account",
        "My Cart",
        "Orders and Returns",
        "Contact Us",
      ],
    },
    {
      id: "CUSTOMER SERVICE",
      content: [
        "Privacy Policy",
        "Terms & Conditions",
        "Shipping & Returns",
        "Help & FAQs",
        "Refund Policy",
        "Customer Service",
      ],
    },
  ];

  function ToggleIndex(index) {
    openIndex === index ? setOpenIndex(null) : setOpenIndex(index);
  }

  return (
    <footer className={style.footer}>
      <div className={`container ${style.footerGap} `}>
        <div className={style.grid}>
          {data.map((data, index) => (
            <nav key={data.id} className={style.accordion}>
              <p onClick={() => ToggleIndex(index)} className={style.heading}>
                {data.id}
                {openIndex === index ? <IoIosArrowUp /> : <IoIosArrowDown />}
              </p>

              <ul
                className={`${style.footerNav} ${
                  openIndex === index ? style.open : ""
                }`}
              >
                {data.content.map((dat, index) => (
                  <li key={index}>
                    <Link to="/" className={style.footerLink}>
                      {dat}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <FooterLogo />
        <FooterNewsLetter />

        <div className="container">
          <div className={style.footerGrid}>
            <p className={style.copyright}>
              &copy; {new Date().getFullYear()},Vogal. All Rights Reserved.
            </p>
            <div className={style.paymentIcon}>
              <PaymentIcons />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Accardion;
