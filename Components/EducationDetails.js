import collegeContext from "directsecondyearadmission/Context/collegeContext";
import { useUserAuth } from "directsecondyearadmission/Context/UserAuthContext";
import { useUserContext } from "directsecondyearadmission/Context/UserContext";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { useContext } from "react";
import ModelHeader from "./ModelHeader";

const EducationDetails = () => {
  const [modalOpen, setModalOpen] = useState("hidden");
  const [requiredState, setRequired] = useState(false);
  const { user } = useUserAuth();
  const { updateEdutDetailsUser, setres, allUserDetail } = useUserContext();
  const [resMsg, setresMsg] = useState("");
  if (resMsg) {
    setTimeout(() => {
      setresMsg("");
    }, 2000);
  }
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
      const res = await updateEdutDetailsUser(
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
        user.uid
      );
      setresMsg(res);
      setres(Math.random());
    };

    return (
      <div className={`fixed top-0 ${modalOpen} left-0 h-full  w-full   `}>
        <div className="z-10  relative w-full flex justify-center overflow-y-scroll  items-center h-full modalColor">
          <div className="absolute overflow-y-scroll h-full w-full  sm:w-4/6 sm:h-4/5  mt-24 sm:mt-0 rounded-sm bg-white">
            <ModelHeader toggle={toggleUser} name="Education Detail" />
            <form
              onSubmit={updateEdutDetails}
              className="w-full px-5  pb-10 pt-5 sm:pt-0 mt-5 grid overflow-y-scroll place-items-center"
            >
              {resMsg && (
                <div
                  className="bg-orange-100 text-sm w-full sm:w-2/4  mb-10 font-semibold border-l-4 border-orange-500 text-orange-700 px-4 py-2"
                  role="alert"
                >
                  <p> {resMsg}</p>
                </div>
              )}
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

  const EducationDetail = allUserDetail.educationDetails;
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
        <div className="md:w-2/6 w-full pb-5">
          <div className="text-slate-400 text-sm">Board</div>
          <div className="text-sm">{EducationDetail.ssc.board}</div>
        </div>
        <div className="md:w-2/6 w-full pb-5">
          <div className="text-slate-400 text-sm">School</div>
          <div className="text-sm">{EducationDetail.ssc.school}</div>
        </div>
        <div className="md:w-2/6 w-full pb-5">
          <div className="text-slate-400 text-sm">Passing Year</div>
          <div className="text-sm">{EducationDetail.ssc.passingYear}</div>
        </div>
      </div>

      <div className=" flex flex-wrap mt-2 justify-between items-center">
        <div className="md:w-2/6 w-full pb-5">
          <div className="text-slate-400 text-sm">Mark Type</div>
          <div className="text-sm">{EducationDetail.ssc.markType}</div>
        </div>
        <div className="md:w-2/6 w-full pb-5">
          <div className="text-slate-400 text-sm">Percentage/CGPA</div>
          <div className="text-sm">{EducationDetail.ssc.percentage}</div>
        </div>
        <div className="md:w-2/6 w-full pb-5" />
      </div>
      <div className="border-b-2 mt-5" />
      <h3 className="text-base text-slate-500 sm:font-semibold font-bold mt-5">
        Diploma
      </h3>
      <div className=" flex flex-wrap mt-3 justify-between items-center">
        <div className="md:w-2/6 w-full pb-5">
          <div className="text-slate-400 text-sm">Board</div>
          <div className="text-sm">{EducationDetail.diploma.board}</div>
        </div>
        <div className="md:w-2/6 w-full pb-5">
          <div className="text-slate-400 text-sm">College</div>
          <div className="text-sm">{EducationDetail.diploma.school}</div>
        </div>
        <div className="md:w-2/6 w-full pb-5">
          <div className="text-slate-400 text-sm">Passing Year</div>
          <div className="text-sm">{EducationDetail.diploma.passingYear}</div>
        </div>
      </div>

      <div className=" flex flex-wrap mt-2 justify-between items-center">
        <div className="md:w-2/6 w-full pb-5">
          <div className="text-slate-400 text-sm">Mark Type</div>
          <div className="text-sm">{EducationDetail.diploma.markType}</div>
        </div>
        <div className="md:w-2/6 w-full pb-5">
          <div className="text-slate-400 text-sm">Percentage/CGPA</div>
          <div className="text-sm">{EducationDetail.diploma.percentage}</div>
        </div>
        <div className="md:w-2/6 w-full pb-5" />
      </div>
    </div>
  );
};
export default EducationDetails;
