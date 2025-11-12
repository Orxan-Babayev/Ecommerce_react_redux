import { Link } from "react-router-dom";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import logo from "../../../assets/logo-dark.png";
import style from "./Footer.module.css";

function FooterLogo() {
  return (
    <div className={style.logoCol}>
      <Link to={"/"} className={style.logo}>
        <img src={logo} alt="Vogal logo" />
      </Link>

      <p className={style.text}>
        Ut enim ad minim veniam, quis nostrud exercitation laboris nisi ut
        aliquip ex ea commodo consequat.Ut enim ad minim veniam,quis nostrud
        exercitation
      </p>

      <p className={style.heading}>KEEP IN TOUCH</p>

      <ul className={style.socialLinks}>
        {[FaFacebookF, FaTwitter, FaInstagram, FaYoutube].map((Icon, index) => (
          <li key={index}>
            <Link to="/" className={style.footerLink}>
              <Icon className={style.socialIcon} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FooterLogo;
