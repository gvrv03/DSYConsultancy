import React from "react";
import { useState } from "react";

const CollegeAddress = ({ maps, locationCollege }) => {
  const { addressLine, taluka, district, city, longitude, latitude } =
    locationCollege;

  try {
    return (
      <div className=" flex gap-5 flex-col sm:flex-row">
        <div className="overflow-scroll grid place-items-center w-full">
          <div className="" dangerouslySetInnerHTML={{ __html: maps }} />
        </div>
        <div className="w-full">
          <div className="font-bold  text-lg">
            Address Line :{" "}
            <span className="font-normal text-base">{addressLine} </span>
          </div>
          <div className="font-bold mt-5 text-lg">
            Taluka : <span className="font-normal text-base">{taluka} </span>
          </div>
          <div className="font-bold mt-5 text-lg">
            District :{" "}
            <span className="font-normal text-base">{district} </span>
          </div>
          <div className="font-bold mt-5 text-lg">
            City : <span className="font-normal text-base">{city} </span>
          </div>
          <div className="font-bold mt-5 text-lg">
            Co-ordinates :{" "}
            <span className="font-normal text-base">
              {longitude} ,{latitude}{" "}
            </span>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    return <div className=" text-center font-semibold">Error Occured</div>;
  }
};

export default CollegeAddress;
