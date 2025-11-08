import Spinner from "../Shop/Spinner";
import Error from "../Shop/Error";
import NoData from "../Shop/NoData";
import styles from "./SectionWrapper.module.css";

const SectionWrapper = ({
  title,
  subtitle,
  loading,
  error,
  onRetry,
  data,
  children,
  className = {},
}) => {
  return (
    <section className={`${styles.wrapper} ${className ? className : ""}`}>
      {loading && <Spinner primary="5rem" />}
      {error && <Error error={error} onRetry={onRetry} />}
      {!loading && !error && data.length === 0 && <NoData />}
      {!loading && !error && data.length > 0 && (
        <>
          <div className="container">
            <div className={styles.header}>
              <h2 className={styles.heading}>{title}</h2>
              {subtitle && <p className={styles.subheading}>{subtitle}</p>}
            </div>
          </div>
          {children}
        </>
      )}
    </section>
  );
};

export default SectionWrapper;
