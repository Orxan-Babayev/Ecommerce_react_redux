import styles from "./Order.module.scss";
import { MdOutlineMessage } from "react-icons/md";
import { CiDeliveryTruck } from "react-icons/ci";
import { HiOutlineReceiptRefund } from "react-icons/hi";
import { RiSecurePaymentFill } from "react-icons/ri";
import SectionWrapper from "../SectionWrapper";
import Feature from "./Features";

const Order = () => {
  const features = [
    {
      id: 1,
      icon: <CiDeliveryTruck size={40} color="#d7d7d7d" />,
      title: "FREE DELIVERY",
      subtitle: "For all orders over $120",
    },
    {
      id: 2,
      icon: <MdOutlineMessage size={30} color="#d7d7d7d" />,
      title: "24/7 HELP CENTER",
      subtitle: "Dedicated 24/7 support",
    },
    {
      id: 3,
      icon: <HiOutlineReceiptRefund size={30} color="#d7d7d7d" />,
      title: "SATISFIED OR REFUNDED",
      subtitle: "Free returns within 14 days",
    },
    {
      id: 4,
      icon: <RiSecurePaymentFill size={30} color="#d7d7d7d" />,
      title: "100% SECURE PAYMENTS",
      subtitle: "Accept all payment methods",
    },
  ];
  return (
    <SectionWrapper title="Why Shop With Us" data={features}>
      <div className={styles.container}>
        {features.map((feature) => (
          <Feature key={feature.id} feature={feature} />
        ))}
      </div>
    </SectionWrapper>
  );
};

export default Order;
