import React from "react";

const Section = ({ id, type, text }) => {
  return (
    <section
      key={id}
      className={`message ${type}`}
    >
      <p>
        {text}
      </p>
    </section>
  );
};

export default Section;