import React from "react";
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
}) => {
  return (
    <>
      {loading && <Spinner primary="5rem" />}
      {error && <Error error={error} onRetry={onRetry} />}
      {!loading && !error && !data.length ? (
        <NoData />
      ) : (
        <section className={styles.container}>
          <div className={styles.header}>
            <h2 className={styles.main}>{title}</h2>
            {subtitle && <p>{subtitle}</p>}
          </div>
          {children}
        </section>
      )}
    </>
  );
};

export default SectionWrapper;
