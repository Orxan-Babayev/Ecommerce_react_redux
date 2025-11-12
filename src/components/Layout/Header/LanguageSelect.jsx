import { useState } from "react";
import styles from "./NavModal.module.css";

function LanguageSelect() {
  const languages = [
    {
      id: "english",
      label: "English",
      src: "https://img.icons8.com/color/48/great-britain.png",
    },
    {
      id: "french",
      label: "French",
      src: "https://img.icons8.com/color/48/france.png",
    },
    {
      id: "german",
      label: "German",
      src: "https://img.icons8.com/color/48/germany.png",
    },
  ];

  const [isSelected, setIsSelected] = useState("english");

  return (
    <div>
      <p className={styles.language}>Language</p>
      <ul className={styles.ul}>
        {languages.map((language, index) => (
          <li
            key={index}
            className={`${isSelected === language.id ? styles.selected : ""}`}
            onClick={() => setIsSelected(language.id)}
          >
            <img width="20" height="25" src={language.src} alt={language.id} />
            {language.label}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LanguageSelect;
