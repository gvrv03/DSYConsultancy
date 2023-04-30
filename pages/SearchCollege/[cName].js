import { useCollegesContext } from "directsecondyearadmission/Context/CollegesContext";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const CollegeCard = (props) => {
  return (
    <div className="  bg-white  h-96 flex flex-col shadow-md justify-between  rounded-sm  p-5">
      <div className="h-32 grid bg-slate-50 rounded-sm place-items-center ">
        <img
          className="rounded-full border-blue-900 border-2 h-20 w-20 "
          src={props.image}
          alt={props.cName}
        />
      </div>
      <div className="font-bold flex justify-between  text-blue-900  text-xs py-2">
        <div>{props.approvedBy}</div>
        <div>
          <i className="bi text-slate-400 mr-2 text-xs bi-eye-fill"></i>

          {props.views}
        </div>{" "}
      </div>
      <div className="font-bold  text-base ">{props.cName} </div>
      <div className="font-medium mt-2 flex items-center text-xs ">
        <i className="bi text-slate-400 mr-5 text-xs bi-pin-map-fill"></i>
        <span className="text-slate-400 font-normal text-justify">
          {props.address} {props.district}
        </span>
      </div>

      <div className="font-medium mt-2 flex justify-between items-center pColor text-xs ">
        <div className="font-medium mt-2 flex items-center pColor text-xs ">
          <i className="bi text-slate-400 mr-2   bi-send-fill"></i>
          <div>{props.collegeType}</div>
        </div>
        <div className="font-medium mt-2 flex items-center pColor text-xs ">
          <div>{props.collegeUnder}</div>
          <i className="bi text-slate-400 ml-2   bi-flag-fill"></i>
        </div>
      </div>

      <div className=" mt-5 flex  gap-5 w-full justify-center items-center">
        <Link
          href={{
            pathname: `/CollegeDa/[id]`,
            query: {
              id: props.id,
            },
          }}
          type="button"
          target="_blank"
          className="pBtn w-2/4 text-center px-3 text-xs py-2"
        >
          Read More
        </Link>

        <Link
          href={`tel:+91${props.contacts}`}
          type="button"
          className="border w-2/4 text-center px-3 text-xs py-2"
        >
          Make a call
        </Link>
      </div>
    </div>
  );
};
const CollegesSearch = () => {
  const router = useRouter();
  const { allColleges } = useCollegesContext();
  const { cName } = router.query;
  const afterSearch =
    allColleges &&
    allColleges.filter((item) => {
      return item.name.toLowerCase().includes(cName.toLowerCase());
    });
  return (
    <div className="mt-16 conatiner m-auto p-5">
      <div className="bg-white container p-5 m-auto ">
        Home {">"} College {">"} {cName}
      </div>
      <div className="container grid mt-5 grid-cols-1  md:grid-cols-4 gap-5 m-auto ">
        {afterSearch &&
          afterSearch.map((item, index) => {
            return (
              <CollegeCard
                key={index}
                approvedBy={item.approvedBy}
                id={item._id}
                cName={item.name}
                collegeUnder={item.collegeUnder}
                collegeType={item.collegeType}
                address={item.location.addressLine}
                contacts={item.contacts.contactNo}
                district={item.location.district}
                image={item.image}
                views={item.views}
              />
            );
          })}
      </div>
      {afterSearch.length === 0 && (
        <div className=" bg-white  container m-auto ">{cName} Not Found</div>
      )}
    </div>
  );
};

export default CollegesSearch;
