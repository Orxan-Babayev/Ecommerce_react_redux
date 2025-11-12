import { useState } from "react";
import styles from "./NavModal.module.css";

function CurrencySelect() {
  const currency = [
    { id: "aud", label: "AUD $" },
    { id: "cny", label: "CNY $" },
    { id: "eur", label: "EUR $" },
    { id: "gbr", label: "GBR $" },
    { id: "inr", label: "INR $" },
    { id: "usd", label: "USD $" },
  ];

  const [isCurrency, setIsCurrency] = useState("usd");

  return (
    <li>
      <p className={styles.language}>Currency</p>
      <ul className={styles.ul}>
        {currency.map((currency, index) => (
          <li
            key={index}
            className={`${isCurrency === currency.id ? styles.currency : ""}`}
            onClick={() => setIsCurrency(currency.id)}
          >
            {currency.label}
          </li>
        ))}
      </ul>
    </li>
  );
}

export default CurrencySelect;
