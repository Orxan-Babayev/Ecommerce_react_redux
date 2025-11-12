import style from "./Footer.module.css";
import PaymentIcons from "./PaymentIcons";
import FooterNav from "./FooterNav";
import FooterLogo from "./FooterLogo";
import FooterNewsLetter from "./FooterNewsLetter";

const Footer = () => {
  const info = [
    "Latest News",
    "Career",
    "My Account",
    "My Cart",
    "Orders and Returns",
    "Contact Us",
  ];

  const custom = [
    "Privacy Policy",
    "Terms & Conditions",
    "Shipping & Returns",
    "Help & FAQs",
    "Refund Policy",
    "Customer Service",
  ];

  return (
    <footer className={style.footer}>
      <div className={`container margin-bottom-md`}>
        <div className={style.grid}>
          <FooterLogo />
          <FooterNav heading={"INFORMATION"} links={info} />
          <FooterNav heading={"CUSTOM SERVICES"} links={custom} />
          <FooterNewsLetter />
        </div>
      </div>
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
    </footer>
  );
};

export default Footer;
