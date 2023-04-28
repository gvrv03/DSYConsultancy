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

function valuetext(value) {
  return `${value}°C`;
}

const College = () => {
  const { allDepartments } = useAdminContext();

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
    district
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
    const SingleCollege = (props) => {
      return (
        <div className=" flex   shadow-md mb-5 gap-10 justify-between md:flex-row flex-col sm:gap-5 bg-white  rounded-sm p-5 ">
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
      );
    };

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
          {undercolleges &&
            undercolleges.map((department, indexDep) => {
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
              return (
                <span key={indexDep}>
                  <SingleCollege
                    collegeName={name}
                    approvedBy={approvedBy}
                    collegeType={collegeType}
                    collegeId={_id}
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
          <div className="flex  px-5 pt-5">
            <i className="bi bi-funnel-fill mr-4" onClick={toggleUser}></i>
            <span onClick={toggleUser} className="text-slate-400">
              Sort
            </span>
          </div>
          <SortCollege />
          <div className="flex  p-5">
            <i className="bi bi-funnel-fill mr-4" onClick={toggleUser}></i>
            <span onClick={toggleUser} className="text-slate-400">
              Filter
            </span>
          </div>

          <CollegeUnder />
          <div className="h-1 mx-5 my-5 bg-slate-50" />

          <DistrictFilter />
          <div className="h-1 mx-5 my-5 bg-slate-50" />

          <div className="p-5">
            <Slider
              getAriaLabel={() => "Temperature range"}
              value={value}
              onChange={handleChange}
              valueLabelDisplay="auto"
              getAriaValueText={valuetext}
            />
          </div>
        </div>
      </div>
    );
  };

  const NavItem = (props) => {
    return (
      <Link
        href={props.location}
        className="text-gray-700 hover:bg-sky-100 pl-5  block  mx-5 py-2 text-sm"
        role="menuitem"
        tabIndex="-1"
        id="menu-item-0"
      >
        {props.name}
      </Link>
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
    const [search, setSearch] = useState("");

    const inputChangedHandler = (e) => {
      e.preventDefault();
      setSearch(e.target.value);
    };

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

    const [value, setValue] = React.useState([20, 37]);
    const handleChange = (event, newValue) => {
      setValue(newValue);
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
                {items.map((item, index) => {
                  return (
                    <NavItem
                      location={item.Location}
                      name={item.Name}
                      key={index}
                    />
                  );
                })}
                <div className="h-1 mx-5 my-5 bg-slate-50" />
                <CollegeUnder />
                <div className="h-1 mx-5 my-5 bg-slate-50" />
                <DistrictFilter />
                <div className="h-1  mx-5 my-5 bg-slate-50" />
                <div className="p-5">
                  <Slider
                    getAriaLabel={() => "Temperature range"}
                    value={value}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                    getAriaValueText={valuetext}
                  />
                </div>
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
