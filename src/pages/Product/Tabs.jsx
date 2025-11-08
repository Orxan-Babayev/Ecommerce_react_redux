import React, { useState } from "react";
import styles from "./Tabs.module.css";
import DescriptionTab from "./DescriptionTab";
import ReturnTab from "./ReturnTab";
import GeneralTab from "./GeneralTab";

function Tabs() {
  const [tab, setTab] = useState("description");

  const tabs = [
    { id: "description", label: "Product Description" },
    { id: "return", label: "Shipping & Returns" },
    { id: "review", label: "Product Reviews" },
    { id: "general", label: "General Tab" },
  ];

  return (
    <div className={styles.container}>
      <ul className={styles.tabs}>
        {tabs.map((t) => (
          <li
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`${tab === t.id ? styles.active : ""}`}
          >
            {t.label}
          </li>
        ))}
      </ul>
      {tab === "description" && <DescriptionTab />}
      {tab === "return" && <ReturnTab />}
      {tab === "general" && <GeneralTab />}
    </div>
  );
}

export default Tabs;
