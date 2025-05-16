import React from "react";
import "./Spinner.css";

const Spinner = ({ primary, secondary }) => {
  const size = primary || secondary || "3rem";
  const style = {
    width: size,
    height: size,
  };

  return <div className="spinner" style={style} />;
};

export default Spinner;
