import HomeLayout from "directsecondyearadmission/Layout/HomeLayout";
import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { collegeByUnder } from "directsecondyearadmission/quieries/quieries";
import { allColleges } from "directsecondyearadmission/quieries/CollegeDataQuieries";
import { useEffect } from "react";
import Loader2 from "directsecondyearadmission/Components/Loader2";
import Slider from "@mui/material/Slider";

import { useAdminContext } from "directsecondyearadmission/Context/AdminContext";
import { useUserAuth } from "directsecondyearadmission/Context/UserAuthContext";
import { useUserContext } from "directsecondyearadmission/Context/UserContext";

function valuetext(value) {
  return `${value}°C`;
}

const College = () => {
  const { allDepartments } = useAdminContext();
  const { allUserDetail } = useUserContext();
  const { basicDetails } = allUserDetail;
  let Category = basicDetails && basicDetails.socialCategory;

  if (allUserDetail.profileCompletion != 100) {
    return (
      <div className="mt-20 container grid place-items-center m-auto bg-white p-5">
        <div className="w-96 bg-gray-100 p-5 grid place-items-center">
          <div className="font-semibold">
            Please Complete Your Profile First !
          </div>{" "}
          <div className=" mt-5">
            <Link href="/Profile" className="pBtn  px-5 py-2  w-full">
              Complete Profile
            </Link>
          </div>
        </div>
      </div>
    );
  }
  // checkbox handler function
  const [selectedCollegeUnder, setSelectedCollegeUnder] = useState([]);
  const [district, setdistrict] = useState("");
  const onChangeCollegeUnderHandler = (under, isChecked) => {
    isChecked
      ? setSelectedCollegeUnder((prevUnder) => [...prevUnder, under])
      : setSelectedCollegeUnder(
          selectedCollegeUnder.filter((und) => und !== under)
        );
  };

  const [finalFilterColeges, setfinalFilterColeges] = useState({});
  // console.log(allDepartments);
  // Sorting lists

  const items = [
    {
      Name: "Category",
      Location: "/",
    },
    {
      Name: "Rating",
      Location: "/",
    },
    {
      Name: "Near Me",
      Location: "/",
    },
    {
      Name: "Rating",
      Location: "/",
    },
  ];

  // filter for College Under
  const undercolleges = collegeByUnder(
    selectedCollegeUnder,
    allDepartments,
    district,
    Category
  );

  // College Under Components
  const CollegeUnder = () => {
    const checkBoxItem = ["Government", "Private"];

    return (
      <div className="  px-5  grid grid-cols-2 gap-5">
        {checkBoxItem.map((item, index) => {
          return (
            <div className="flex gap-2    items-center" key={index}>
              <input
                type="checkbox"
                checked={selectedCollegeUnder.includes(item)}
                onChange={(e) =>
                  onChangeCollegeUnderHandler(item, e.target.checked)
                }
              />
              <label className="text-xs">{item}</label>
            </div>
          );
        })}
      </div>
    );
  };

  // sorting items components
  const SortCollege = () => {
    return (
      <div className="p-5">
        {items.map((item, index) => {
          return (
            <div
              key={index}
              className="py-2 cursor-pointer  hover:bg-sky-100 hover:pl-10 hover:font-semibold"
            >
              {item.Name}
            </div>
          );
        })}
      </div>
    );
  };

  const DistrictFilter = () => {
    const districtName =
      allDepartments &&
      allDepartments.map((item) => item.CollegeDetails.location.district);
    const removeDubDist =
      allDepartments &&
      allDepartments.filter(
        (district, index) =>
          !districtName.includes(
            district.CollegeDetails.location.district,
            index + 1
          )
      );

    return (
      <div className="px-5">
        <select
          value={district}
          onChange={function (e) {
            setdistrict(e.target.value);
          }}
          className=" outline-none w-full py-2 rounded-sm border"
        >
          <option value="" className="text-center font-bold py-2">
            {" "}
            All District
          </option>
          {removeDubDist &&
            removeDubDist.map((item, index) => {
              return (
                <option
                  key={index}
                  value={item.CollegeDetails.location.district}
                  className="text-center text-sm"
                >
                  {item.CollegeDetails.location.district}
                </option>
              );
            })}
        </select>
      </div>
    );
  };

  const AllCollegesData = () => {
    const [search, setsearch] = useState("");
    const [depCol, setdepCol] = useState("");
    const SingleCollege = (props) => {
      console.log();
      const userCat = props.DepCategory.filter((cat) => {
        return cat.category === props.category;
      });
      return (
        <div className="shadow-md mb-5 bg-white  rounded-sm p-5 ">
          <div className=" flex   gap-10 justify-between md:flex-row flex-col sm:gap-5 ">
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

    const afterSearch =
      undercolleges &&
      undercolleges.filter((college) => {
        if (search === "") {
          return college;
        }
        return college.cName.toLowerCase().includes(search.toLowerCase());
      });

    let depName = [];
    afterSearch &&
      afterSearch.map((item) => {
        depName.push(item.courseName);
      });

    const removeDubBranch = depName.filter(
      (course, index) => !depName.includes(course, index + 1)
    );

    const depFilter =
      afterSearch &&
      afterSearch.filter((college) => {
        if (depCol === "") {
          return college;
        }
        return college.courseName.toLowerCase() === depCol.toLowerCase();
      });

    // for slider
    const [value, setValue] = React.useState([20, 37]);
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    return (
      <div className=" h-full flex  overflow-y-scroll gap-5 w-full  ">
        <div className=" h-full flex flex-col  overflow-y-scroll md:w-2/3 w-full ">
          {!undercolleges && (
            <div className="w-full h-screen grid place-items-center bg-white">
              <img
                src="/img/loadingSpinner.gif"
                className="w-20"
                alt="spinner"
              />
            </div>
          )}
          {depFilter &&
            depFilter.map((department, indexDep) => {
              const {
                name,
                instituteCode,
                collegeUnder,
                collegeType,
                location,

                contacts,
                approvedBy,
                image,
                _id,
              } = department.CollegeDetails;

              const { DepCategory } = department;
              return (
                <span key={indexDep}>
                  <SingleCollege
                    collegeName={name}
                    approvedBy={approvedBy}
                    DepCategory={DepCategory}
                    collegeType={collegeType}
                    collegeId={_id}
                    category={Category}
                    location={location.addressLine}
                    district={location.district}
                    instituteCode={instituteCode}
                    image={image}
                    contactNo={contacts.contactNo}
                    department={department.courseName}
                    collegeUnder={collegeUnder}
                  />
                </span>
              );
            })}
        </div>
        <div className=" h-full  flex-col md:flex hidden bg-white  shadow-md overflow-y-scroll w-2/6 ">
          <div className="flex  p-5">
            <i className="bi bi-funnel-fill mr-4" onClick={toggleUser}></i>
            <span onClick={toggleUser} className="text-slate-400">
              Filter
            </span>
          </div>

          <CollegeUnder />
          <div className="h-1 mx-5 my-5 bg-slate-50" />

          <DistrictFilter />
          <div className="h-1 mx-5 mt-5 bg-slate-50" />

          <div className="flex  p-5">
            <i className="bi bi-search font-bold mr-4" onClick={toggleUser}></i>
            <span className="text-slate-400">Search</span>
          </div>

          <div className="w-full px-5 bg-white">
            <input
              type="text"
              onChange={(e) => {
                setsearch(e.target.value);
              }}
              className="border w-full outline-none text-sm px-2 py-2"
              placeholder="Search College"
            />
          </div>

          <div className="flex  p-5 mt-5">
            <i
              className="bi bi-buildings-fill font-bold mr-4"
              onClick={toggleUser}
            ></i>
            <span className="text-slate-400">Department</span>
          </div>
          <div className="w-full px-5 bg-white">
            <select
              onChange={(e) => {
                setdepCol(e.target.value);
              }}
              className="border w-full outline-none text-sm px-2 py-2"
              placeholder="Search College"
            >
              <option value="" className="text-center">
                All
              </option>
              {removeDubBranch.map((item, index) => {
                return (
                  <option key={index} value={item}>
                    {item}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </div>
    );
  };

  const [userOpen, setUserOpen] = useState("hidden");
  const toggleUser = () => {
    if (userOpen == "hidden") {
      setUserOpen("block");
    } else {
      setUserOpen("hidden");
    }
  };

  const HeaderFilter = () => {
    const items = [
      {
        Name: "Category",
        Location: "/",
      },
      {
        Name: "Course",
        Location: "/",
      },
      {
        Name: "Rating",
        Location: "/",
      },
      {
        Name: "Near Me",
        Location: "/",
      },
      {
        Name: "Rating",
        Location: "/",
      },
    ];

    // College Under Components
    const CollegeUnder = () => {
      const checkBoxItem = ["Government", "Private"];

      return (
        <div className="  px-5  grid grid-cols-2 gap-5">
          {checkBoxItem.map((item, index) => {
            return (
              <div className="flex gap-2    items-center" key={index}>
                <input
                  type="checkbox"
                  checked={selectedCollegeUnder.includes(item)}
                  onChange={(e) =>
                    onChangeCollegeUnderHandler(item, e.target.checked)
                  }
                />
                <label className="text-xs">{item}</label>
              </div>
            );
          })}
        </div>
      );
    };

    const DistrictFilter = () => {
      const districtName =
        allDepartments &&
        allDepartments.map((item) => item.CollegeDetails.location.district);
      const removeDubDist =
        allDepartments &&
        allDepartments.filter(
          (district, index) =>
            !districtName.includes(
              district.CollegeDetails.location.district,
              index + 1
            )
        );

      return (
        <div className="px-5">
          <select
            value={district}
            onChange={function (e) {
              setdistrict(e.target.value);
            }}
            className=" outline-none w-full py-2 rounded-sm border"
          >
            <option value="" className="text-center font-bold py-2">
              {" "}
              All District
            </option>
            {removeDubDist &&
              removeDubDist.map((item, index) => {
                return (
                  <option
                    key={index}
                    value={item.CollegeDetails.location.district}
                    className="text-center text-sm"
                  >
                    {item.CollegeDetails.location.district}
                  </option>
                );
              })}
          </select>
        </div>
      );
    };

    return (
      <>
        <div className="relative mb-5 rounded-sm    shadow-md items-center p-5 flex justify-between h-14  bg-white w-full">
          <div>
            <ol className="flex h-8 space-x-2">
              <li className="flex items-center">
                <Link
                  href="/"
                  rel="noopener noreferrer"
                  title="Back to homepage"
                  className="hover:underline"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5 pr-1 dark:text-gray-400"
                  >
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                  </svg>
                </Link>
              </li>

              <li className="flex items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                  aria-hidden="true"
                  fill="currentColor"
                  className="w-2 h-2 mt-1 transform rotate-90 fill-current dark:text-gray-600"
                >
                  <path d="M32 30.031h-32l16-28.061z"></path>
                </svg>
                <a
                  rel="noopener noreferrer"
                  href="#"
                  className="flex items-center px-1 capitalize hover:underline cursor-default"
                >
                  Colleges
                </a>
              </li>
            </ol>
          </div>

          <div className="cursor-pointer relative block md:hidden">
            <i className="bi bi-funnel-fill mr-4" onClick={toggleUser}></i>
            <span onClick={toggleUser} className="text-slate-400">
              Filter
            </span>
            <div
              className={`absolute ${userOpen} right-0 z-10 mt-2 w-80 origin-top-right rounded-sm bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-button"
              tabIndex="-1"
            >
              <div className="py-5" role="none">
                <CollegeUnder />
                <div className="h-1 mx-5 my-5 bg-slate-50" />
                <DistrictFilter />
                <div className="h-1  mx-5 my-5 bg-slate-50" />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <HomeLayout>
      <Head>
        <title>DSY consultancy | Colleges</title>
        <meta
          name="keywords"
          content="Direct Second Year Admission, Consultancy Services, Admission Assistance, Education Counseling, Admission Consultancy, College Admission Guidance, Admission Process, Admission Requirements, Engineering Admissions, After Diploma Admissions, DSY, Direct Second Year Admission Consultancy | DSY, Direct Second Year Admission Consultancy, Direct Second Year Admission, DSY consultancy, DSY consultancy | Colleges"
        />
        <meta name="title" content="DSY consultancy | Colleges" />
      </Head>
      <HeaderFilter />
      <AllCollegesData />
    </HomeLayout>
  );
};

export default College;
