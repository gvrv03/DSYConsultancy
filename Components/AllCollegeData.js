import { useCollegesContext } from "directsecondyearadmission/Context/CollegesContext";
import { useUserContext } from "directsecondyearadmission/Context/UserContext";
import { collegeByUnder } from "directsecondyearadmission/quieries/quieries";
import React from "react";
import { useState } from "react";
import SingleCollege from "./SingleCollege";

const AllCollegesData = ({ toggleUser, userOpen }) => {
  const {
    allDepartments,
    allColleges,
    allRemDubDistrict,
    allRemDubDepartments,
    allRemDubUniversity,
  } = useCollegesContext();
  const { allUserDetail, userPref } = useUserContext();
  const { category, college, branch, district, university, collegeType } =
    userPref;
  const [selectedCollegeUnder, setSelectedCollegeUnder] = useState([]);
  const [districtClg, setdistrictClg] = useState("");
  const [UniversityClg, setUniversityClg] = useState("");
  const [clgName, setclgName] = useState("");
  const [depCol, setdepCol] = useState("");

  //   checkbox Handler
  const onChangeCollegeUnderHandler = (under, isChecked) => {
    isChecked
      ? setSelectedCollegeUnder((prevUnder) => [...prevUnder, under])
      : setSelectedCollegeUnder(
          selectedCollegeUnder.filter((und) => und !== under)
        );
  };

  // College Under Filter
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
    return (
      <div className="px-5">
        <select
          value={districtClg === "" ? district : districtClg}
          onChange={function (e) {
            setdistrictClg(e.target.value);
          }}
          className=" outline-none w-full py-2 rounded-sm border"
        >
          <option value="all" className="text-center font-bold py-2">
            {" "}
            All District
          </option>
          {allRemDubDistrict &&
            allRemDubDistrict.map((item, index) => {
              return (
                <option
                  key={index}
                  value={item}
                  className="text-center text-sm"
                >
                  {item}
                </option>
              );
            })}
        </select>
      </div>
    );
  };

  const UniversityFilter = () => {
    return (
      <select
        value={UniversityClg === "" ? university : UniversityClg}
        onChange={function (e) {
          setUniversityClg(e.target.value);
        }}
        className=" outline-none w-full py-2 rounded-sm border"
      >
        <option value="all" className="text-center font-bold py-2">
          {" "}
          All University
        </option>
        {allRemDubUniversity &&
          allRemDubUniversity.map((item, index) => {
            return (
              <option key={index} value={item} className="text-center text-sm">
                {item}
              </option>
            );
          })}
      </select>
    );
  };
  const CollegeFilter = () => {
    return (
      <select
        onChange={(e) => {
          setclgName(e.target.value);
        }}
        value={clgName}
        className="border w-full outline-none text-sm px-2 py-2"
        placeholder="Search College"
      >
        <option value="all">All College</option>
        {allColleges &&
          allColleges.map((item, index) => {
            return (
              <option key={index} value={item.name}>
                {item.name}
              </option>
            );
          })}
      </select>
    );
  };

  const DepartmentFilter = () => {
    return (
      <select
        value={depCol === "" ? branch : depCol}
        onChange={(e) => {
          setdepCol(e.target.value);
        }}
        className="border w-full outline-none text-sm px-2 py-2"
        placeholder="Search College"
      >
        <option value="all" className="text-center">
          All
        </option>
        {allRemDubDepartments.map((item, index) => {
          return (
            <option key={index} value={item}>
              {item}
            </option>
          );
        })}
      </select>
    );
  };
  return (
    <div className=" h-full flex  overflow-y-scroll gap-5 w-full  ">
      <div className=" h-full flex flex-col  overflow-y-scroll md:w-2/3 w-full ">
        {allDepartments.length === 0 && (
          <div className="w-full h-screen grid place-items-center bg-white">
            <img src="/img/loadingSpinner.gif" className="w-20" alt="spinner" />
          </div>
        )}

        {allDepartments &&
          allDepartments.map((department, indexDep) => {
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
                  category={category}
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
      <div
        onClick={toggleUser}
        className={`h-full fixed ${userOpen}  opacity-50 cursor-pointer  top-16 bg-black  block md:hidden w-full`}
      />
      <div
        className={`h-full md:top-0 flex-col md:flex md:relative fixed w-4/5 ${userOpen} md:right-0 top-16 bg-white  shadow-md overflow-y-scroll md:w-2/6`}
      >
        <div className="md:hidden block bg-gray-50 p-5">
          <button onClick={toggleUser}>
            <i className="bi bi-x-lg border rounded-md p-2" />
          </button>{" "}
        </div>

        <div className="flex  p-5">
          <i className="bi bi-funnel-fill mr-4"></i>
          <span className="text-slate-400">Filter</span>
        </div>

        <CollegeUnder />
        <div className="h-1 mx-5 my-5 bg-slate-50" />

        <DistrictFilter />
        <div className="h-1 mx-5 mt-5 bg-slate-50" />

        <div className="flex  p-5">
          <i className="bi bi-search font-bold mr-4"></i>
          <span className="text-slate-400">College</span>
        </div>

        <div className="w-full px-5 bg-white">
          <CollegeFilter />
        </div>

        <div className="flex  p-5 mt-5">
          <i className="bi bi-buildings-fill font-bold mr-4"></i>
          <span className="text-slate-400">Department</span>
        </div>

        <div className="w-full px-5 bg-white">
          <DepartmentFilter />
        </div>

        <div className="flex  p-5 mt-5">
          <i className="bi bi-buildings font-bold mr-4"></i>
          <span className="text-slate-400">University</span>
        </div>

        <div className="w-full px-5 bg-white">
          <UniversityFilter />
        </div>
      </div>
    </div>
  );
};

export default AllCollegesData;
