import { useUserContext } from "directsecondyearadmission/Context/UserContext";
import Link from "next/link";
import React from "react";

const SingleCollege = (props) => {
  const { userPref } = useUserContext();
  const { category } = userPref;
  const userCat = props.DepCategory.filter((cat) => {
    return cat.category === category;
  });
  return (
    <div className="shadow-md mb-5 bg-white  rounded-sm p-5 ">
      <div className=" flex   gap-10 justify-between md:flex-row flex-col sm:gap-5 ">
        <div className=" flex   md:flex-row flex-col sm:gap-5">
          <div className=" grid px-10 bg-slate-50 md:py-0 py-10  rounded-sm place-items-center ">
            <img
              className="rounded-full border-blue-900 border-2 h-20 w-20 "
              src={props.image}
              alt={props.collegeName}
            />
          </div>
          <div className="">
            <div className="font-bold  text-lg">
              {props.collegeName} ({props.instituteCode}){" "}
            </div>
            <div className="font-bold text-blue-900  text-xs py-2">
              {props.approvedBy}
            </div>
            <div className="font-medium mt-2 flex items-center text-xs ">
              <i className="bi text-slate-400 mr-2 text-xs bi-pin-map-fill"></i>
              <span className="text-slate-400 font-normal text-justify">
                {props.location},{" "}
                <span className="font-semibold text-sm"></span>
              </span>
            </div>
            <div className="font-medium mt-2 flex items-center text-xs ">
              <i className="bi text-slate-400 mr-2 text-xs bi-building-fill"></i>
              <span className="text-slate-800 font-bold text-xs">
                {props.department}
              </span>
            </div>

            <div className="font-medium mt-2 flex justify-between items-center pColor text-xs ">
              <div className="font-medium mt-2 flex items-center pColor text-xs ">
                <i className="bi text-slate-400 mr-2   bi-send-fill"></i>
                <div>{props.collegeType}</div>
              </div>
              <div className="font-medium mt-2 flex items-center pColor text-xs ">
                {/* <i className="bi text-slate-400 mr-2   bi-send-fill"></i> */}
                <div>{props.district}</div>
              </div>
              <div className="font-medium mt-2 flex items-center pColor text-xs ">
                <div>{props.collegeUnder}</div>
                <i className="bi text-slate-400 ml-2   bi-flag-fill"></i>
              </div>
            </div>
          </div>
        </div>
        <div className=" md:mt-5 -mt-5 flex justify-between items-center md:flex-col flex-row gap-5 ">
          <Link
            href={{
              pathname: `/CollegeDa/[id]`,
              query: {
                id: props.collegeId,
              },
            }}
            type="button"
            target="_blank"
            className="pBtn  text-center px-3 w-full text-xs py-2"
          >
            Read More
          </Link>

          <Link
            href={`tel:+91${props.contactNo}`}
            type="button"
            className="border  text-center px-3 w-full text-xs py-2"
          >
            Make a call
          </Link>
          <Link
            href={`tel:+91${props.contactNo}`}
            type="button"
            className="border  text-center px-3 w-full text-xs py-2"
          >
            Save
          </Link>
        </div>
      </div>
      <div className="mt-5 text-sm font-bold text-center bg-blue-50 border border-blue-100 py-2">
        <span>{userCat[0] ? userCat[0].category : "N/A"}</span>{" "}
        <span className="mr-2 pColor">
          Min :
          {userCat[0]
            ? userCat[0].min + "%" + "  (" + userCat[0].seatTypeMin + ") "
            : "N/A"}
        </span>{" "}
        <span className="pColor mr-1">
          {" "}
          Max :{" "}
          {userCat[0]
            ? userCat[0].max + "%" + "  (" + userCat[0].seatTypeMax + ") "
            : "N/A"}
        </span>
        <span className="pColor mr-1">
          ({userCat[0] ? userCat[0].aSeats : "N/A"})
        </span>
      </div>
    </div>
  );
};

export default SingleCollege;
