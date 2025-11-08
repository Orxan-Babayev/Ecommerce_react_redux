import { BsBoxSeam } from "react-icons/bs";
import { BiMessageDetail } from "react-icons/bi";
import { HiOutlineReceiptRefund } from "react-icons/hi";
import { BsShieldCheck } from "react-icons/bs";

import SectionWrapper from "../SectionWrapper";

import Feature from "./Features";
import { memo } from "react";
import styles from "./Features.module.css";

const Order = memo(() => {
  const features = [
    {
      id: 1,
      icon: <BsBoxSeam size={30} color="#fff" />,
      title: "FREE DELIVERY",
      subtitle: "For all orders over $120",
    },
    {
      id: 2,
      icon: <BiMessageDetail size={30} color="#fff" />,
      title: "24/7 HELP CENTER",
      subtitle: "Dedicated 24/7 support",
    },
    {
      id: 3,
      icon: <HiOutlineReceiptRefund size={30} color="#fff" />,
      title: "SATISFIED OR REFUNDED",
      subtitle: "Free returns within 14 days",
    },
    {
      id: 4,
      icon: <BsShieldCheck size={30} color="#fff" />,
      title: "100% SECURE PAYMENTS",
      subtitle: "Accept all payment methods",
    },
  ];
  return (
    <SectionWrapper title="Why Shop With Us" data={features}>
      <div className={styles.orderColor}>
        <ul className={`container ${styles.list} `}>
          {features.map((feature) => (
            <Feature key={feature.id} feature={feature} />
          ))}
        </ul>
      </div>
    </SectionWrapper>
  );
});

Order.displayName = "Order";

export default Order;
