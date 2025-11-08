import React from "react";
import styles from "./DescriptionTab.module.css";

function ReturnTab() {
  return (
    <div className={styles.descriptionTab}>
      <h4>DELIVERY</h4>
      <ul>
        <li>Dispatch: Within 24 Hours</li>
        <li>Free shipping across all products on a minimum purchase of $50.</li>
        <li>International delivery time - 7-10 business days</li>
        <li>Cash on delivery might be available</li>
        <li>Easy 30 days returns and exchanges</li>
      </ul>
      <h4>RETURNS</h4>
      <p>
        If you do not like the product you can return it within 15 days - no
        questions asked. This excludes bodysuits, swimwear and clearance sale
        items. We have an easy and hassle free return policy. Please look at our
        Delivery & Returns section for further information.
      </p>
    </div>
  );
}

export default ReturnTab;
