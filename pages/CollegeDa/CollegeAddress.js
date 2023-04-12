import React from "react";

const CollegeAddress = (props) => {
  return (
    <div className=" flex gap-5 flex-col sm:flex-row">
      <div className="overflow-scroll grid place-items-center w-full">
        <div className="" dangerouslySetInnerHTML={{ __html: props.maps }} />
      </div>
      <div className="w-full">  
        <div className="font-bold  text-lg">
          Address Line :{" "}
          <span className="font-normal text-base">
            {props.locationCollege.addressLine}{" "}
          </span>
        </div>
        <div className="font-bold mt-5 text-lg">
          Taluka :{" "}
          <span className="font-normal text-base">
            {props.locationCollege.taluka}{" "}
          </span>
        </div>
        <div className="font-bold mt-5 text-lg">
          District :{" "}
          <span className="font-normal text-base">
            {props.locationCollege.district}{" "}
          </span>
        </div>
        <div className="font-bold mt-5 text-lg">
          City :{" "}
          <span className="font-normal text-base">
            {props.locationCollege.city}{" "}
          </span>
        </div>
        <div className="font-bold mt-5 text-lg">
          Co-ordinates :{" "}
          <span className="font-normal text-base">
            {props.locationCollege.longitude} ,{props.locationCollege.latitude}{" "}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CollegeAddress;
