import React from "react";

const Feature = ({ feature }) => {
  return (
    <div>
      {feature.icon}
      <div>
        <span>{feature.title}</span>
        <span>{feature.subtitle}</span>
      </div>
    </div>
  );
};

export default Feature;
