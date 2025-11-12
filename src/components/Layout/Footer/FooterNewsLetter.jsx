import style from "./Footer.module.css";

function FooterNewsLetter() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className={style.footerSub}>
      <p className={style.heading}>NEWSLETTER</p>

      <p className={style.email}>
        Enter your email to receive daily news and get 20% off coupon for all
        items. NO spam, we promise
      </p>

      <form onSubmit={handleSubmit} className={style.form}>
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
  );
}

export default FooterNewsLetter;
