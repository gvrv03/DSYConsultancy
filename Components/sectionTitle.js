import React from "react";
import Container from "./container";

const SectionTitle = (props) => {
  return (
    <Container
      className={`flex w-full flex-col mt-4 ${
        props.align === "left" ? "" : "items-center justify-center text-center"
      }`}
    >
      {props.pretitle && (
        <div
          data-aos="fade-up"
          className="text-sm font-bold tracking-wider text-indigo-600 uppercase"
        >
          {props.pretitle}
        </div>
      )}

      {props.title && (
        <h2
          data-aos="fade-up"
          className="max-w-2xl mt-3 text-3xl font-bold leading-snug tracking-tight text-gray-800 lg:leading-tight lg:text-4xl "
        >
          {props.title}
        </h2>
      )}
    </Container>
  );
};

export default SectionTitle;
