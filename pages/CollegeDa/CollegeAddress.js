import Link from "next/link";
import React from "react";
import { useState } from "react";

const CollegeAddress = ({ maps, locationCollege, contacts }) => {
  try {
    const { addressLine, taluka, district, city, longitude, latitude } =
      locationCollege;
    return (
      <div className=" flex gap-5 flex-col sm:flex-row">
        <div className="overflow-scroll grid place-items-center w-full">
          <div className="" dangerouslySetInnerHTML={{ __html: maps }} />
        </div>
        <div className="w-full">
          <div>
            {" "}
            <div className="font-bold  text-lg">
              Address Line :{" "}
              <span className="font-normal text-base">{addressLine} </span>
            </div>
            <div className="font-bold mt-2 text-lg">
              Taluka : <span className="font-normal text-base">{taluka} </span>
            </div>
            <div className="font-bold mt-2 text-lg">
              District :{" "}
              <span className="font-normal text-base">{district} </span>
            </div>
            <div className="font-bold mt-2 text-lg">
              City : <span className="font-normal text-base">{city} </span>
            </div>
            <div className="font-bold mt-2 text-lg">
              Co-ordinates :{" "}
              <span className="font-normal text-base">
                {longitude} ,{latitude}{" "}
              </span>
            </div>
          </div>

          <div className="p-5 bg-blue-50 mt-10">
            <h1 className="font-semibold text-center bgColor p-5 text-white">
              Contact Info
            </h1>
            <div className=" flex flex-col mt-5 gap-2">
              <span className="font-semibold">
                Conatct No :{" "}
                <Link
                  href={`tel:+91${contacts.contactNo}`}
                  className="font-light"
                >
                  {contacts.contactNo}
                </Link>{" "}
              </span>
              <span className="font-semibold">
                College Email :{" "}
                <span className="font-light">{contacts.email}</span>
              </span>
              <Link href={contacts.website} className=" font-semibold">
                College Website:{" "}
                <span className="text-blue-600 font-light">{contacts.website}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    return <div className=" text-center font-semibold">Error Occured</div>;
  }
};

export default CollegeAddress;
