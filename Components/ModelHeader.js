import React from "react";

const ModelHeader = (props) => {
  return (
    <header className="bgColor p-5 flex justify-between items-center rounded-sm">
      <div className="flex justify-center items-center gap-5">
        <i
          onClick={props.toggle}
          className="bi bi-arrow-left text-2xl text-white cursor-pointer"
        ></i>
        <span className="border-b-2 border-yellow-300 text-base font-semibold text-white">
          {props.name}
        </span>
      </div>
      <div>
        <i
          onClick={props.toggle}
          className=" text-2xl text-white cursor-pointer bi bi-x-lg"
        ></i>
      </div>
    </header>
  );
};

export default ModelHeader;
