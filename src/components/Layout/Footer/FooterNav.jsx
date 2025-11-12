import style from "./Footer.module.css";
import { Link } from "react-router-dom";

function FooterNav({ heading, links }) {
  return (
    <nav className={style.navCol}>
      <p className={style.heading}>{heading}</p>
      <ul className={style.footerNav}>
        {links.map((link, index) => (
          <li key={index}>
            <Link to="/" className={style.footerLink}>
              {link}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default FooterNav;
