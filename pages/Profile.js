import HomeLayout from "directsecondyearadmission/Layout/HomeLayout";
import React, { useState, useEffect } from "react";
import baseUrl from "directsecondyearadmission/baseUrl";

import Link from "next/link";
import Head from "next/head";
import collegeContext from "directsecondyearadmission/Context/collegeContext";
import { useContext } from "react";
import { useRouter } from "next/router";
import { getUserData } from "directsecondyearadmission/quieries/UserDataQuieries";
import { allColleges } from "directsecondyearadmission/quieries/CollegeDataQuieries";
const Profile = ({ userData, CollegeData }) => {
  const currentYear = new Date().getFullYear();
  const context = useContext(collegeContext);
  const [requiredState, setRequired] = useState(false);
  const router = useRouter();
  const [token, setToken] = useState("");

  const districtName = CollegeData.map((item) => item.location.district);
  const removeDubDist = CollegeData.filter(
    (district, index) =>
      !districtName.includes(district.location.district, index + 1)
  );

  const univercityName = CollegeData.map((item) => item.university);
  const removeDubUniversity = CollegeData.filter(
    (university, index) =>
      !univercityName.includes(university.university, index + 1)
  );

  let depName = [];
  CollegeData.map((item) =>
    item.department.map((course) => {
      depName.push(course.courseName);
    })
  );

  const removeDubBranch = depName.filter(
    (course, index) => !depName.includes(course, index + 1)
  );

  useEffect(() => {
    localStorage.setItem("userName", userData.credentails.fName);
    localStorage.setItem("profileCompletion", userData.profileCompletion);
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    }
  }, []);

  const [modalOpen, setModalOpen] = useState("hidden");
  const toggleUser = () => {
    if (modalOpen == "hidden") {
      setModalOpen("block");
    } else {
      setModalOpen("hidden");
    }
  };

  const ModelHeader = (props) => {
    return (
      <header className="bgColor p-5 flex justify-between items-center rounded-sm">
        <div className="flex justify-center items-center gap-5">
          <i
            onClick={toggleUser}
            className="bi bi-arrow-left text-2xl text-white cursor-pointer"
          ></i>
          <span className="border-b-2 border-yellow-300 text-base font-semibold text-white">
            {props.name}
          </span>
        </div>
        <div>
          <i
            onClick={toggleUser}
            className=" text-2xl text-white cursor-pointer bi bi-x-lg"
          ></i>
        </div>
      </header>
    );
  };

  const BasicDetails = () => {
    const [modalOpen, setModalOpen] = useState("hidden");

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
        onSubmit(
          fullName,
          socialCategory,
          dob,
          gender,
          marStatus,
          phyChanged,
          userData._id
        );
      };

      const onSubmit = async (
        fullName,
        socialCategory,
        dob,
        gender,
        marStatus,
        phyChanged,
        id
      ) => {
        const res = await fetch("/api/updateBasicD", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": token,
          },
          body: JSON.stringify({
            fullName: fullName,
            dob: dob,
            socialCategory: socialCategory,
            gender: gender,
            maritialStatus: marStatus,
            phyChanged: phyChanged,
            id: id,
          }),
        });

        const res2 = await res.json();
        if (res2.msg) {
          context.openModal("success", res2.msg);
          router.reload();
        } else {
          context.openModal("fail", res2.error);
        }
      };

      return (
        <div className={`fixed top-0 ${modalOpen} left-0 h-full  w-full   `}>
          <div className="z-10  relative w-full flex justify-center  items-center h-full modalColor">
            <div className="absolute h-full w-full  sm:w-4/6 sm:h-4/5  mt-24 sm:mt-0 rounded-sm bg-white">
              <ModelHeader name="Basic Detail" />
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
                      required={requiredState}
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
                      required={requiredState}
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
                      <option value="General">General</option>
                      <option value="ST">ST</option>
                      <option value="OBC">OBC</option>
                      <option value="SC">SC</option>
                      <option value="VJ/NT">VJ/NT</option>
                      <option value="OPEN">OPEN</option>
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
                      required={requiredState}
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
                          required={requiredState}
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
                          required={requiredState}
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
                          required={requiredState}
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
                          required={requiredState}
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
                          required={requiredState}
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
                          required={requiredState}
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
                          required={requiredState}
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

  const ContactDetails = () => {
    const [modalOpen, setModalOpen] = useState("hidden");
    const toggleUser = () => {
      if (modalOpen == "hidden") {
        setModalOpen("block");
      } else {
        setModalOpen("hidden");
      }
    };
    const ContactDetailModal = () => {
      const [contactDetails, setContactDetails] = useState({});
      const onChange = (e) => {
        setContactDetails({
          ...contactDetails,
          [e.target.name]: e.target.value,
        });
      };

      const updateContDetails = async (e) => {
        e.preventDefault();
        const { mobileNo, email, city, state } = contactDetails;
        onSubmit(mobileNo, email, city, state, userData._id);
      };

      const onSubmit = async (mobileNo, email, city, state, id) => {
        const res = await fetch("/api/updateContD", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": token,
          },
          body: JSON.stringify({
            mobileNo,
            email,
            city,
            state,
            id,
          }),
        });

        const res2 = await res.json();
        if (res2.msg) {
          context.openModal("success", res2.msg);
          router.reload();
        } else {
          context.openModal("fail", res2.error);
        }
      };

      return (
        <div className={`fixed top-0 ${modalOpen} left-0 h-full  w-full   `}>
          <div className="z-10  relative w-full flex justify-center  items-center h-full modalColor">
            <div className="absolute h-full w-full  sm:w-4/6 sm:h-4/5  mt-24 sm:mt-0 rounded-sm bg-white">
              <ModelHeader name="Contact Detail" />
              <form
                onSubmit={updateContDetails}
                className="w-full sm:mt-14 mt-5 px-5 sm:px-0 grid place-items-center"
              >
                <div className="grid grid-cols-1  w-full sm:grid-cols-2 gap-5 sm:w-2/4 ">
                  <div className="flex flex-col ">
                    <label
                      htmlFor="MoNum"
                      className="leading-7 text-sm text-gray-600"
                    >
                      Mobile Number
                    </label>
                    <input
                      type="number"
                      id="MoNum"
                      required={requiredState}
                      onChange={onChange}
                      value={
                        contactDetails.mobileNo ? contactDetails.mobileNo : ""
                      }
                      name="mobileNo"
                      className="w-full bg-white rounded-sm  border border-gray-300 text-base outline-none text-gray-700 py-1 px-3 "
                    />
                  </div>
                  <div className="flex flex-col ">
                    <label
                      htmlFor="email"
                      className="leading-7 text-sm text-gray-600"
                    >
                      E-mail
                    </label>
                    <input
                      type="email"
                      required={requiredState}
                      onChange={onChange}
                      value={contactDetails.email ? contactDetails.email : ""}
                      name="email"
                      className="w-full bg-white rounded-sm  border border-gray-300 text-base outline-none text-gray-700 py-1 px-3 "
                    />
                  </div>

                  <div className="flex flex-col ">
                    <label
                      htmlFor="state"
                      className="leading-7 text-sm text-gray-600"
                    >
                      State
                    </label>
                    <input
                      type="text"
                      id="state"
                      required={requiredState}
                      onChange={onChange}
                      value={contactDetails.state ? contactDetails.state : ""}
                      name="state"
                      className="w-full bg-white rounded-sm  border border-gray-300 text-base outline-none text-gray-700 py-1 px-3 "
                    />
                  </div>
                  <div className="flex flex-col ">
                    <label
                      htmlFor="city"
                      className="leading-7 text-sm text-gray-600"
                    >
                      City
                    </label>
                    <input
                      type="text"
                      required={requiredState}
                      onChange={onChange}
                      value={contactDetails.city ? contactDetails.city : ""}
                      name="city"
                      className="w-full bg-white rounded-sm  border border-gray-300 text-base outline-none text-gray-700 py-1 px-3 "
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-5">
                  <button type="submit" className="pBtn px-10 py-3 mt-10">
                    {" "}
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

    const contactDetail = userData.contactDetails;
    return (
      <div className="bg-white shadow-md p-5 mt-5 rounded-sm">
        <ContactDetailModal />
        <div className="header flex pb-2  justify-between items-center">
          <h1 className="text-lg font-bold">Contact Details</h1>
          <i
            className="bi bi-pencil-square font-extrabold text-2xl cursor-pointer "
            onClick={toggleUser}
          ></i>
        </div>

        <div className=" flex flex-wrap mt-3 justify-between items-center">
          <div className="w-2/6 detailWrap">
            <div className="text-slate-400 text-sm">Mobile No.</div>
            <div className="text-sm">{contactDetail.mobileNo}</div>
          </div>
          <div className="w-2/6 detailWrap">
            <div className="text-slate-400 text-sm">E-mail Address</div>
            <div className="text-sm">{userData.credentails.email}</div>
          </div>
          <div className="w-2/6 detailWrap">
            <div className="text-slate-400 text-sm">City</div>
            <div className="text-sm">{contactDetail.city}</div>
          </div>
        </div>

        <div className=" flex flex-wrap mt-2 justify-between items-center">
          <div className="w-2/6 detailWrap">
            <div className="text-slate-400 text-sm">State</div>
            <div className="text-sm">{contactDetail.state} </div>
          </div>
        </div>
      </div>
    );
  };

  const EducationDetails = () => {
    const [modalOpen, setModalOpen] = useState("hidden");
    const toggleUser = () => {
      if (modalOpen == "hidden") {
        setModalOpen("block");
      } else {
        setModalOpen("hidden");
      }
    };
    const EducationDetailModal = () => {
      const [eductaionDetails, setEductaionDetails] = useState({});
      const onChange = (e) => {
        setEductaionDetails({
          ...eductaionDetails,
          [e.target.name]: e.target.value,
        });
      };

      const updateEdutDetails = async (e) => {
        e.preventDefault();
        const {
          sBoard,
          sSchool,
          sPassYear,
          sMarkType,
          sPercentage,
          cBoard,
          cSchool,
          cPassYear,
          cMarkType,
          cPercentage,
        } = eductaionDetails;
        onSubmit(
          sBoard,
          sSchool,
          sPassYear,
          sMarkType,
          sPercentage,
          cBoard,
          cSchool,
          cPassYear,
          cMarkType,
          cPercentage,
          userData._id
        );
      };

      const onSubmit = async (
        sBoard,
        sSchool,
        sPassYear,
        sMarkType,
        sPercentage,
        cBoard,
        cSchool,
        cPassYear,
        cMarkType,
        cPercentage,
        id
      ) => {
        const res = await fetch("/api/updateEduD", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": token,
          },
          body: JSON.stringify({
            sBoard,
            sSchool,
            sPassYear,
            sMarkType,
            sPercentage,
            cBoard,
            cSchool,
            cPassYear,
            cMarkType,
            cPercentage,
            id,
          }),
        });

        const res2 = await res.json();
        if (res2.msg) {
          context.openModal("success", res2.msg);
          router.reload();
        } else {
          context.openModal("fail", res2.error);
        }
      };
      return (
        <div className={`fixed top-0 ${modalOpen} left-0 h-full  w-full   `}>
          <div className="z-10  relative w-full flex justify-center overflow-y-scroll  items-center h-full modalColor">
            <div className="absolute overflow-y-scroll h-full w-full  sm:w-4/6 sm:h-4/5  mt-24 sm:mt-0 rounded-sm bg-white">
              <ModelHeader name="Education Detail" />
              <form
                onSubmit={updateEdutDetails}
                className="w-full px-5  pb-10 pt-5 sm:pt-0 mt-5 grid overflow-y-scroll place-items-center"
              >
                <h2 className=" w-full font-semibold  sm:w-2/4">
                  Class X (required)
                </h2>
                <div className="grid grid-cols-1  w-full sm:grid-cols-2 gap-5 sm:w-2/4 ">
                  <div className="flex flex-col ">
                    <label
                      htmlFor="Board"
                      className="leading-7 text-sm text-gray-600"
                    >
                      Board
                    </label>
                    <select
                      required={requiredState}
                      onChange={onChange}
                      value={
                        eductaionDetails.sBoard ? eductaionDetails.sBoard : ""
                      }
                      name="sBoard"
                      className="w-full bg-white rounded-sm  border border-gray-300 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    >
                      <option value="Select">---Select---</option>
                      <option value="ICSE">ICSE</option>
                      <option value="CBSE">CBSE</option>
                      <option value="MSBSHSE">MSBSHSE</option>
                      <option value="OTHER">OTHER</option>
                    </select>
                  </div>
                  <div className="flex flex-col ">
                    <label
                      htmlFor="SName"
                      className="leading-7 text-sm text-gray-600"
                    >
                      School Name
                    </label>
                    <input
                      type="text"
                      required={requiredState}
                      onChange={onChange}
                      value={
                        eductaionDetails.sSchool ? eductaionDetails.sSchool : ""
                      }
                      name="sSchool"
                      className="w-full bg-white rounded-sm  border border-gray-300 text-base outline-none text-gray-700 py-1 px-3 "
                    />
                  </div>

                  <div className="flex flex-col ">
                    <label
                      htmlFor="PassYear"
                      className="leading-7 text-sm text-gray-600"
                    >
                      Pass Year
                    </label>
                    <input
                      required={requiredState}
                      onChange={onChange}
                      value={
                        eductaionDetails.sPassYear
                          ? eductaionDetails.sPassYear
                          : ""
                      }
                      name="sPassYear"
                      className="w-full bg-white rounded-sm  border border-gray-300 text-base outline-none text-gray-700 py-1 px-3 "
                    />
                  </div>
                  <div className="flex flex-col ">
                    <label
                      htmlFor="mType"
                      className="leading-7 text-sm text-gray-600"
                    >
                      Mark Type
                    </label>
                    <select
                      required={requiredState}
                      onChange={onChange}
                      value={
                        eductaionDetails.sMarkType
                          ? eductaionDetails.sMarkType
                          : ""
                      }
                      name="sMarkType"
                      className="w-full bg-white rounded-sm  border border-gray-300 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    >
                      <option value="Select">---Select---</option>
                      <option value="Percentage">Percentage</option>
                      <option value="CGPA">CGPA</option>
                    </select>
                  </div>
                  <div className="flex flex-col ">
                    <label
                      htmlFor="Marks"
                      className="leading-7 text-sm text-gray-600"
                    >
                      Enter your Marks
                    </label>
                    <input
                      type="number"
                      required={requiredState}
                      onChange={onChange}
                      value={
                        eductaionDetails.sPercentage
                          ? eductaionDetails.sPercentage
                          : ""
                      }
                      name="sPercentage"
                      className="w-full bg-white rounded-sm  border border-gray-300 text-base outline-none text-gray-700 py-1 px-3 "
                    />
                  </div>
                </div>

                <div className="sm:w-2/4 w-full mt-5 border" />
                <h2 className=" w-full mt-5 font-semibold  sm:w-2/4">
                  Diploma (required)
                </h2>

                <div className="grid grid-cols-1  w-full sm:grid-cols-2 gap-5 sm:w-2/4 ">
                  <div className="flex flex-col ">
                    <label
                      htmlFor="Board"
                      className="leading-7 text-sm text-gray-600"
                    >
                      Board
                    </label>
                    <input
                      type="text"
                      required={requiredState}
                      onChange={onChange}
                      value={
                        eductaionDetails.cBoard ? eductaionDetails.cBoard : ""
                      }
                      name="cBoard"
                      className="w-full bg-white rounded-sm  border border-gray-300 text-base outline-none text-gray-700 py-1 px-3 "
                    />
                  </div>
                  <div className="flex flex-col ">
                    <label
                      htmlFor="SName"
                      className="leading-7 text-sm text-gray-600"
                    >
                      College Name
                    </label>
                    <input
                      type="text"
                      required={requiredState}
                      onChange={onChange}
                      value={
                        eductaionDetails.cSchool ? eductaionDetails.cSchool : ""
                      }
                      name="cSchool"
                      className="w-full bg-white rounded-sm  border border-gray-300 text-base outline-none text-gray-700 py-1 px-3 "
                    />
                  </div>

                  <div className="flex flex-col ">
                    <label
                      htmlFor="PassYear"
                      className="leading-7 text-sm text-gray-600"
                    >
                      Pass Year
                    </label>
                    <input
                      type="number"
                      required={requiredState}
                      onChange={onChange}
                      value={
                        eductaionDetails.cPassYear
                          ? eductaionDetails.cPassYear
                          : ""
                      }
                      name="cPassYear"
                      className="w-full bg-white rounded-sm  border border-gray-300 text-base outline-none text-gray-700 py-1 px-3 "
                    />
                  </div>
                  <div className="flex flex-col ">
                    <label
                      htmlFor="mType"
                      className="leading-7 text-sm text-gray-600"
                    >
                      Mark Type
                    </label>
                    <select
                      required={requiredState}
                      onChange={onChange}
                      value={
                        eductaionDetails.cMarkType
                          ? eductaionDetails.cMarkType
                          : ""
                      }
                      name="cMarkType"
                      className="w-full bg-white rounded-sm  border border-gray-300 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    >
                      <option value="Select">---Select---</option>
                      <option value="CGPA">CGPA</option>
                      <option value="Percentage">Percentage</option>
                    </select>
                  </div>
                  <div className="flex flex-col ">
                    <label
                      htmlFor="Marks"
                      className="leading-7 text-sm text-gray-600"
                    >
                      Enter your Marks
                    </label>
                    <input
                      type="number"
                      required={requiredState}
                      onChange={onChange}
                      value={
                        eductaionDetails.cPercentage
                          ? eductaionDetails.cPercentage
                          : ""
                      }
                      name="cPercentage"
                      className="w-full bg-white rounded-sm  border border-gray-300 text-base outline-none text-gray-700 py-1 px-3 "
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-5">
                  <button type="submit" className="pBtn px-10 py-3 mt-10">
                    Submit
                  </button>
                  <button type="reset" className="border px-10 py-3 mt-10">
                    Reset
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      );
    };

    const EducationDetail = userData.educationDetails;
    return (
      <div className="bg-white p-5 shadow-md rounded-sm mt-5">
        <EducationDetailModal />
        <div className="header flex pb-2  justify-between items-center">
          <h1 className="text-lg font-bold">Education Details</h1>
          <i
            onClick={toggleUser}
            className="bi bi-pencil-square font-extrabold text-2xl cursor-pointer "
          ></i>
        </div>
        <h3 className="text-base text-slate-500 sm:font-semibold font-bold ">
          Class X
        </h3>
        <div className=" flex flex-wrap mt-3 justify-between items-center">
          <div className="w-2/6 detailWrap">
            <div className="text-slate-400 text-sm">Board</div>
            <div className="text-sm">{EducationDetail.ssc.board}</div>
          </div>
          <div className="w-2/6 detailWrap">
            <div className="text-slate-400 text-sm">School</div>
            <div className="text-sm">{EducationDetail.ssc.school}</div>
          </div>
          <div className="w-2/6 detailWrap">
            <div className="text-slate-400 text-sm">Passing Year</div>
            <div className="text-sm">{EducationDetail.ssc.passingYear}</div>
          </div>
        </div>

        <div className=" flex flex-wrap mt-2 justify-between items-center">
          <div className="w-2/6 detailWrap">
            <div className="text-slate-400 text-sm">Mark Type</div>
            <div className="text-sm">{EducationDetail.ssc.markType}</div>
          </div>
          <div className="w-2/6 detailWrap">
            <div className="text-slate-400 text-sm">Percentage/CGPA</div>
            <div className="text-sm">{EducationDetail.ssc.percentage}</div>
          </div>
          <div className="w-2/6 detailWrap" />
        </div>
        <div className="border-b-2 mt-5" />
        <h3 className="text-base text-slate-500 sm:font-semibold font-bold mt-5">
          Diploma
        </h3>
        <div className=" flex flex-wrap mt-3 justify-between items-center">
          <div className="w-2/6 detailWrap">
            <div className="text-slate-400 text-sm">Board</div>
            <div className="text-sm">{EducationDetail.diploma.board}</div>
          </div>
          <div className="w-2/6 detailWrap">
            <div className="text-slate-400 text-sm">College</div>
            <div className="text-sm">{EducationDetail.diploma.school}</div>
          </div>
          <div className="w-2/6 detailWrap">
            <div className="text-slate-400 text-sm">Passing Year</div>
            <div className="text-sm">{EducationDetail.diploma.passingYear}</div>
          </div>
        </div>

        <div className=" flex flex-wrap mt-2 justify-between items-center">
          <div className="w-2/6 detailWrap">
            <div className="text-slate-400 text-sm">Mark Type</div>
            <div className="text-sm">{EducationDetail.diploma.markType}</div>
          </div>
          <div className="w-2/6 detailWrap">
            <div className="text-slate-400 text-sm">Percentage/CGPA</div>
            <div className="text-sm">{EducationDetail.diploma.percentage}</div>
          </div>
          <div className="w-2/6 detailWrap" />
        </div>
      </div>
    );
  };

  const PreferenceDetails = () => {
    const [modalOpen, setModalOpen] = useState("hidden");
    const toggleUser = () => {
      if (modalOpen == "hidden") {
        setModalOpen("block");
      } else {
        setModalOpen("hidden");
      }
    };
    const PreferenceesDetailModal = () => {
      const [preferenceDetails, setPreferenceDetails] = useState({});
      const onChange = (e) => {
        setPreferenceDetails({
          ...preferenceDetails,
          [e.target.name]: e.target.value,
        });
      };
      const updatePreftDetails = async (e) => {
        e.preventDefault();
        const { university, branch, location, collegeType, needLoan } =
          preferenceDetails;
        onSubmit(
          university,
          branch,
          location,
          collegeType,
          needLoan,
          userData._id
        );
      };

      const onSubmit = async (
        university,
        branch,
        location,
        collegeType,
        needLoan,
        id
      ) => {
        const res = await fetch("/api/updatePrefD", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": token,
          },
          body: JSON.stringify({
            university,
            branch,
            location,
            collegeType,
            needLoan,
            id,
          }),
        });

        const res2 = await res.json();
        if (res2.msg) {
          context.openModal("success", res2.msg);
          router.reload();
        } else {
          context.openModal("fail", res2.error);
        }
      };
      return (
        <div className={`fixed top-0 ${modalOpen} left-0 h-full  w-full   `}>
          <div className="z-10  relative w-full flex justify-center  items-center h-full modalColor">
            <div className="absolute h-full w-full  sm:w-4/6 sm:h-4/5  mt-24 sm:mt-0 rounded-sm bg-white">
              <ModelHeader name="Preferences" />
              <form
                onSubmit={updatePreftDetails}
                className="w-full sm:mt-14 mt-5 px-5 sm:px-0 grid place-items-center"
              >
                <div className="grid grid-cols-1  w-full sm:grid-cols-2 gap-5 sm:w-2/4 ">
                  <div className="flex flex-col ">
                    <label
                      htmlFor="University"
                      className="leading-7 text-sm text-gray-600"
                    >
                      University
                    </label>
                    <select
                      className="w-full bg-white rounded-sm  border border-gray-300 text-base outline-none text-gray-700 py-1 px-3 "
                      required={requiredState}
                      onChange={onChange}
                      value={
                        preferenceDetails.university
                          ? preferenceDetails.university
                          : ""
                      }
                      name="university"
                    >
                      {removeDubUniversity.sort().map((item, index) => {
                        return (
                          <option
                            key={index}
                            value={item.university}
                            className="text-left text-sm"
                          >
                            {item.university}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="flex flex-col ">
                    <label
                      htmlFor="Branch"
                      className="leading-7 text-sm text-gray-600"
                    >
                      Branch
                    </label>
                    <select
                      id="Branch"
                      required={requiredState}
                      onChange={onChange}
                      value={
                        preferenceDetails.branch ? preferenceDetails.branch : ""
                      }
                      name="branch"
                      className="w-full bg-white rounded-sm  border border-gray-300 text-base outline-none text-gray-700 py-1 px-3 "
                    >
                      <option value="">---Select---</option>

                      {removeDubBranch.sort().map((item, index) => {
                        return (
                          <option value={item} key={index}>
                            {item}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="flex flex-col ">
                    <label
                      htmlFor="CType"
                      className="leading-7 text-sm text-gray-600"
                    >
                      What type of college you are interested in?
                    </label>
                    <select
                      required={requiredState}
                      onChange={onChange}
                      value={
                        preferenceDetails.collegeType
                          ? preferenceDetails.collegeType
                          : ""
                      }
                      name="collegeType"
                      className="w-full bg-white rounded-sm  border border-gray-300 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    >
                      <option value="">---Select---</option>
                      <option value="Government">Government</option>
                      <option value="Non-Government">Non-Government</option>
                      <option value="Both">Both</option>
                    </select>
                  </div>

                  <div className="flex flex-col ">
                    <label
                      htmlFor="City"
                      className="leading-7 text-sm text-gray-600"
                    >
                      District
                    </label>
                    <input
                      placeholder="Enter District"
                      type="text"
                      list="District"
                      required={requiredState}
                      onChange={onChange}
                      value={
                        preferenceDetails.location
                          ? preferenceDetails.location
                          : ""
                      }
                      name="location"
                      className="w-full bg-white rounded-sm  border border-gray-300 text-base outline-none text-gray-700 py-1 px-3 "
                    />
                    <datalist id="District" name="district">
                      {removeDubDist.map((item, index) => {
                        return (
                          <option
                            key={index}
                            value={item.location.district}
                            className="text-left text-sm"
                          >
                            {item.location.district}
                          </option>
                        );
                      })}
                    </datalist>
                  </div>

                  <div className="flex flex-col ">
                    <label
                      htmlFor="CType"
                      className="leading-7 text-sm text-gray-600"
                    >
                      Need a Loan?
                    </label>
                    <div className="grid items-center grid-cols-3">
                      <div>
                        <input
                          className="mr-2"
                          type="radio"
                          name="needLoan"
                          value="Yes"
                          required={requiredState}
                          onChange={onChange}
                          checked={preferenceDetails.needLoan === "Yes"}
                        />
                        <span>Yes</span>
                      </div>
                      <div>
                        <input
                          className="mr-2"
                          type="radio"
                          name="needLoan"
                          value="No"
                          required={requiredState}
                          onChange={onChange}
                          checked={preferenceDetails.needLoan === "No"}
                        />
                        <span>No </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-5">
                  <button type="submit" className="pBtn px-10 py-3 mt-10">
                    {" "}
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
    const preferenceDetail = userData.preferences;
    return (
      <div className="bg-white shadow-md p-5 mt-5 rounded-sm">
        <PreferenceesDetailModal />
        <div className="header flex pb-2  justify-between items-center">
          <h1 className="text-lg font-bold">Preferences</h1>
          <i
            onClick={toggleUser}
            className="bi bi-pencil-square font-extrabold text-2xl cursor-pointer "
          ></i>
        </div>

        <div className=" flex flex-wrap mt-3 justify-between items-center">
          <div className="w-2/6 detailWrap">
            <div className="text-slate-400 text-sm">Univercity</div>
            <div className="text-sm">{preferenceDetail.university}</div>
          </div>
          <div className="w-2/6 detailWrap">
            <div className="text-slate-400 text-sm">Branch</div>
            <div className="text-sm">{preferenceDetail.branch}</div>
          </div>
          <div className="w-2/6 detailWrap">
            <div className="text-slate-400 text-sm">Location</div>
            <div className="text-sm">{preferenceDetail.location}</div>
          </div>
        </div>
        <div className=" flex flex-wrap mt-3  items-center">
          <div className="w-2/6 detailWrap">
            <div className="text-slate-400 text-sm">College Type</div>
            <div className="text-sm">{preferenceDetail.collegeType}</div>
          </div>
          <div className="w-2/6 detailWrap">
            <div className="text-slate-400 text-sm">Need a loan?</div>
            <div className="text-sm">{preferenceDetail.needLoan}</div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <HomeLayout>
      <Head>
        <title>DSY consultancy | Profile</title>
        <meta
          name="keywords"
          content="Direct Second Year Admission, Consultancy Services, Admission Assistance, Education Counseling, Admission Consultancy, College Admission Guidance, Admission Process, Admission Requirements, Engineering Admissions, After Diploma Admissions, DSY, Direct Second Year Admission Consultancy | DSY, Direct Second Year Admission Consultancy, Direct Second Year Admission, DSY consultancy, DSY consultancy | Profile"
        />

        <meta name="title" content="DSY consultancy | Profile" />
      </Head>
      <BasicDetails />
      <ContactDetails />
      <EducationDetails />
      <PreferenceDetails />
    </HomeLayout>
  );
};
export async function getServerSideProps(context) {
  const { id } = context.query;
  // const context = useContext(collegeContext);
  const userData = await getUserData(id);

  const CollegeData = await allColleges();

  return {
    props: { userData, CollegeData },
  };
}
export default Profile;
