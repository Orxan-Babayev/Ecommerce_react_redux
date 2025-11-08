import React from "react";
import styles from "./DescriptionTab.module.css";

function DescriptionTab() {
  return (
    <div className={styles.descriptionTab}>
      <p>
        The construction lifts and smooths, giving your rear assets all they
        need for an amped-up style that screams sex appeal from every angle.
        With a chic hue, this one makes for a perfect pick this fall. So get
        your basics right and you are good to go.
      </p>
      <div className={styles.data}>
        <div>
          <h4>Features</h4>
          <ul>
            <li>High-neck style</li>
            <li>Drop shoulders</li>
            <li>Flared cuffs</li>
            <li>Asymmetrical hem</li>
            <li>70% cotton, 30% polyester.</li>
            <li>Easy to wear and versatile as Casual.</li>
          </ul>
          <h4>Composition and Care Guidelines</h4>
          <ul>
            <li>Only non-chlorine bleach when needed</li>
            <li>Use a laundry bag</li>
            <li>Medium iron</li>
            <li>Machine wash cool</li>
            <li>Dry flat. Can be dry cleaned</li>
          </ul>
        </div>
        <div>
          <h4>Size + Fit</h4>
          <ul>
            <li>Model in Brown is 5 10 and wearing size Small</li>
            <li>Measurements taken from size Small</li>
          </ul>
          <h4>Disclaimer</h4>
          <p>
            Please check the size guide before you buy. You may need one size
            bigger than other popular brands. Bring out the fashionista in you
            with this solid dress designed.
          </p>
        </div>
      </div>
    </div>
  );
}

export default DescriptionTab;
