import collegeContext from "directsecondyearadmission/Context/collegeContext";
import { useUserAuth } from "directsecondyearadmission/Context/UserAuthContext";
import { useUserContext } from "directsecondyearadmission/Context/UserContext";
import { allCategory } from "directsecondyearadmission/quieries/CollegeDataQuieries";
import { useRouter } from "next/router";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import ModelHeader from "./ModelHeader";

const BasicDetails = ({ userData }) => {
  const router = useRouter();
  const { updateBasicDetailsUser } = useUserContext();
  const [modalOpen, setModalOpen] = useState("hidden");
  const { user } = useUserAuth();
  const toggleUser = () => {
    if (modalOpen == "hidden") {
      setModalOpen("block");
    } else {
      setModalOpen("hidden");
    }
  };
  const BasicDetailModal = () => {
    const [basicDetails, setBasicDetails] = useState({});
    const onChange = (e) => {
      setBasicDetails({
        ...basicDetails,
        [e.target.name]: e.target.value,
      });
    };

    const updateBasicDetails = async (e) => {
      e.preventDefault();
      const { fullName, socialCategory, dob, gender, marStatus, phyChanged } =
        basicDetails;

      updateBasicDetailsUser(
        fullName,
        socialCategory,
        dob,
        gender,
        marStatus,
        phyChanged,
        user.uid
      );
    };

    const [allCat, setallCat] = useState([]);
    useEffect(() => {
      const getCat = async () => {
        const res = await allCategory();
        setallCat(res);
      };
      getCat();
    }, []);

    return (
      <div className={`fixed top-0 ${modalOpen} left-0 h-full  w-full   `}>
        <div className="z-10  relative w-full flex justify-center  items-center h-full modalColor">
          <div className="absolute h-full w-full  sm:w-4/6 sm:h-4/5  mt-24 sm:mt-0 rounded-sm bg-white">
            <ModelHeader toggle={toggleUser} name="Basic Detail" />
            <form
              onSubmit={updateBasicDetails}
              className="w-full sm:mt-14 mt-5 px-5 sm:px-0 grid place-items-center"
            >
              <div className="grid grid-cols-1  w-full sm:grid-cols-2 gap-5 sm:w-2/4 ">
                <div className="flex flex-col ">
                  <label
                    htmlFor="Name"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="Name"
                    onChange={onChange}
                    value={basicDetails.fullName ? basicDetails.fullName : ""}
                    name="fullName"
                    className="w-full bg-white rounded-sm  border border-gray-300 text-base outline-none text-gray-700 py-1 px-3 "
                  />
                </div>
                <div className="flex flex-col ">
                  <label
                    htmlFor="SCategory"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Social Category
                  </label>
                  <select
                    onChange={onChange}
                    value={
                      basicDetails.socialCategory
                        ? basicDetails.socialCategory
                        : ""
                    }
                    name="socialCategory"
                    className="w-full bg-white rounded-sm  border border-gray-300 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  >
                    <option value="">Your Social Category</option>

                    {allCat.map((cat, index) => {
                      return (
                        <option key={index} value={cat.Category}>
                          {cat.Category}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="flex flex-col ">
                  <label
                    htmlFor="DOB"
                    className="leading-7 text-sm text-gray-600"
                  >
                    DOB
                  </label>
                  <input
                    type="date"
                    id="DOB"
                    onChange={onChange}
                    value={basicDetails.dob ? basicDetails.dob : ""}
                    name="dob"
                    className="w-full bg-white rounded-sm  border border-gray-300 text-base outline-none text-gray-700 py-1 px-3 "
                  />
                </div>
                <div className="flex flex-col ">
                  <label
                    htmlFor="Gender"
                    className="leading-7 text-sm text-gray-600"
                  >
                    You are
                  </label>
                  <div className="grid items-center grid-cols-3">
                    <div>
                      <input
                        className="mr-2"
                        type="radio"
                        value="Male"
                        onChange={onChange}
                        checked={basicDetails.gender === "Male"}
                        name="gender"
                      />
                      <span>Male</span>
                    </div>
                    <div>
                      <input
                        className="mr-2"
                        type="radio"
                        name="gender"
                        value="Female"
                        onChange={onChange}
                        checked={basicDetails.gender === "Female"}
                      />
                      <span>Female </span>
                    </div>
                    <div>
                      <input
                        className="mr-2"
                        type="radio"
                        name="gender"
                        value="Other"
                        onChange={onChange}
                        checked={basicDetails.gender === "Other"}
                      />
                      <span>Other</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col ">
                  <label
                    htmlFor="Status"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Your Marital Status (Optional)
                  </label>
                  <div className="grid items-center grid-cols-3">
                    <div>
                      <input
                        className="mr-2"
                        type="radio"
                        value="Married"
                        name="marStatus"
                        onChange={onChange}
                        checked={basicDetails.marStatus === "Married"}
                      />
                      <span>Married</span>
                    </div>
                    <div>
                      <input
                        className="mr-2"
                        type="radio"
                        name="marStatus"
                        value="Unmarried"
                        onChange={onChange}
                        checked={basicDetails.marStatus === "Unmarried"}
                      />
                      <span>Unmarried </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col ">
                  <label
                    htmlFor="Changed"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Are you physically challenged?
                  </label>
                  <div className="grid items-center grid-cols-3">
                    <div>
                      <input
                        className="mr-2"
                        type="radio"
                        name="phyChanged"
                        value="Yes"
                        onChange={onChange}
                        checked={basicDetails.phyChanged === "Yes"}
                      />
                      <span>Yes</span>
                    </div>
                    <div>
                      <input
                        className="mr-2"
                        type="radio"
                        name="phyChanged"
                        value="No"
                        onChange={onChange}
                        checked={basicDetails.phyChanged === "No"}
                      />
                      <span>No </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-5">
                <button type="submit" className="pBtn px-10 py-3 mt-10">
                  Submit
                </button>
                <button type="reset" className="border px-10 py-3 mt-10">
                  {" "}
                  Reset
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };

  const basicDetail = userData.basicDetails;
  return (
    <div className="bg-white p-5 shadow-md rounded-sm ">
      <BasicDetailModal />
      <div className="header flex pb-2  justify-between items-center">
        <h1 className="text-lg font-bold">Basic Details</h1>
        <i
          className="bi bi-pencil-square font-extrabold text-2xl cursor-pointer "
          onClick={toggleUser}
        ></i>
      </div>

      <div className=" flex flex-wrap mt-3 justify-between items-center">
        <div className="w-2/6 detailWrap">
          <div className="text-slate-400 text-sm">Full Name</div>
          <div className="text-sm">{basicDetail.fName}</div>
        </div>
        <div className="w-2/6 detailWrap">
          <div className="text-slate-400 text-sm">DOB</div>
          <div className="text-sm"> {basicDetail.dob}</div>
        </div>
        <div className="w-2/6 detailWrap">
          <div className="text-slate-400 text-sm">Social Category</div>
          <div className="text-sm"> {basicDetail.socialCategory}</div>
          <div className="text-sm"></div>
        </div>
      </div>

      <div className=" flex flex-wrap mt-2 justify-between items-center">
        <div className="w-2/6 detailWrap">
          <div className="text-slate-400 text-sm">Gender</div>
          <div className="text-sm">{basicDetail.gender}</div>
        </div>
        <div className="w-2/6 detailWrap">
          <div className="text-slate-400 text-sm">Marital Status</div>
          <div className="text-sm">{basicDetail.maritialStatus}</div>
        </div>
        <div className="w-2/6 detailWrap">
          <div className="text-slate-400 text-sm">Physically Challenged</div>
          <div className="text-sm">{basicDetail.phyChanged}</div>
        </div>
      </div>
    </div>
  );
};

export default BasicDetails;
