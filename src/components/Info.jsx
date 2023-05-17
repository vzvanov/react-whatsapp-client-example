import React from "react";

const Info = ({ text }) => {
  return (
    <div
      className={`info`}
    >
      <p>
        {text}
      </p>
    </div>
  );
};

export default Info;