import logo from "../../../assets/logo-dark.png";
import style from "./Footer.module.css";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import PaymentIcons from "./PaymentIcons";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className={style.footer}>
      <div className={`container margin-bottom-md`}>
        <div className={style.grid}>
          <div className={style.logoCol}>
            <Link to={"/"} className={style.logo}>
              <img src={logo} alt="Vogal logo" />
            </Link>

            <p className={style.text}>
              Ut enim ad minim veniam, quis nostrud exercitation laboris nisi ut
              aliquip ex ea commodo consequat.Ut enim ad minim veniam,quis
              nostrud exercitation
            </p>

            <p className={style.heading}>KEEP IN TOUCH</p>

            <ul className={style.socialLinks}>
              <li>
                <Link to="/" className={style.footerLink}>
                  <FaFacebookF className={style.socialIcon} />
                </Link>
              </li>
              <li>
                <Link to="/" className={style.footerLink}>
                  <FaTwitter className={style.socialIcon} />
                </Link>
              </li>
              <li>
                <Link to="/" className={style.footerLink}>
                  <FaInstagram className={style.socialIcon} />
                </Link>
              </li>
              <li>
                <Link to="/" className={style.footerLink}>
                  <FaYoutube className={style.socialIcon} />
                </Link>
              </li>
            </ul>
          </div>

          <nav className={style.navCol}>
            <p className={style.heading}>INFORMATION</p>
            <ul className={style.footerNav}>
              <li>
                <Link to="/" className={style.footerLink}>
                  Latest News
                </Link>
              </li>
              <li>
                <Link to="/" className={style.footerLink}>
                  Career
                </Link>
              </li>
              <li>
                <Link to="/" className={style.footerLink}>
                  My Account
                </Link>
              </li>
              <li>
                <Link to="/" className={style.footerLink}>
                  My Cart
                </Link>
              </li>
              <li>
                <Link to="/" className={style.footerLink}>
                  Orders and Returns
                </Link>
              </li>
              <li>
                <Link to="/" className={style.footerLink}>
                  Contact Us
                </Link>
              </li>
            </ul>
          </nav>

          <nav className={style.navCol}>
            <p className={style.heading}>CUSTOMER SERVICE</p>
            <ul className={style.footerNav}>
              <li>
                <Link to="/" className={style.footerLink}>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/" className={style.footerLink}>
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/" className={style.footerLink}>
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link to="/" className={style.footerLink}>
                  Help & FAQs
                </Link>
              </li>
              <li>
                <Link to="/" className={style.footerLink}>
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link to="/" className={style.footerLink}>
                  Customer Service
                </Link>
              </li>
            </ul>
          </nav>

          <div className={style.footerSub}>
            <p className={style.heading}>NEWSLETTER</p>

            <p className={style.email}>
              Enter your email to receive daily news and get 20% off coupon for
              all items. NO spam, we promise
            </p>

            <form className={style.form} action="#" method="post">
              <input
                className={style.input}
                type="email"
                placeholder="Email address"
                required
              />
              <button className={style.btn} type="submit">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="container">
        <div className={style.footerGrid}>
          <p className={style.copyright}>
            &copy; 2024,Vogal. All Rights Reserved.
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
