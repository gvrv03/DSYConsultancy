import { useAdminContext } from "directsecondyearadmission/Context/AdminContext";
import collegeContext from "directsecondyearadmission/Context/collegeContext";
import { useCollegesContext } from "directsecondyearadmission/Context/CollegesContext";
import { useUserAuth } from "directsecondyearadmission/Context/UserAuthContext";
import { useUserContext } from "directsecondyearadmission/Context/UserContext";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { useContext } from "react";
import ModelHeader from "./ModelHeader";

const PreferenceDetails = () => {
  const [modalOpen, setModalOpen] = useState("hidden");
  const [requiredState, setRequired] = useState(false);
  const { user } = useUserAuth();
  const { preferenceDetailsUser, setres, allUserDetail } = useUserContext();
  const {
    allDepartments,
    allColleges,
    allRemDubDistrict,
    allRemDubDepartments,
    allCatSeatType,
    allRemDubUniversity,
  } = useCollegesContext();

  const [resMsg, setresMsg] = useState("");

  if (!allDepartments) {
    return (
      <div>
        <div className="bg-white shadow-md p-5 mt-5 grid place-items-center rounded-sm h-52">
          <img src="/img/loadingSpinner.gif" className="w-10" alt="spinner" />
        </div>
      </div>
    );
  }
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
      const {
        university,
        branch,
        location,
        collegeType,
        needLoan,
        CatSeatType,
      } = preferenceDetails;
      const res = await preferenceDetailsUser(
        university,
        branch,
        location,
        collegeType,
        needLoan,
        user.uid,
        CatSeatType
      );
      setresMsg(res)
      setres(Math.random());
    };

    return (
      <div className={`fixed top-0 ${modalOpen} left-0 h-full  w-full   `}>
        <div className="z-10  relative w-full flex justify-center  items-center h-full modalColor">
          <div className="absolute h-full w-full  sm:w-4/6 sm:h-4/5  mt-24 sm:mt-0 rounded-sm bg-white">
            <ModelHeader toggle={toggleUser} name="Preferences" />
            <form
              onSubmit={updatePreftDetails}
              className="w-full sm:mt-14 mt-5 px-5 sm:px-0 grid place-items-center"
            >
              {resMsg && (
                <div
                  className="bg-orange-100 text-sm w-full sm:w-2/4  mb-10 font-semibold border-l-4 border-orange-500 text-orange-700 px-4 py-2"
                  role="alert"
                >
                  <p> {resMsg}</p>
                </div>
              )}
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
                    <option value=""> ----Select----</option>
                    {allRemDubUniversity.map((item, index) => {
                      return (
                        <option
                          key={index}
                          value={item}
                          className="text-left text-sm"
                        >
                          {item}
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

                    {allRemDubDepartments.sort().map((item, index) => {
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
                    htmlFor="CatSeatType"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Seat type
                  </label>
                  <select
                    id="CatSeatType"
                    required={requiredState}
                    onChange={onChange}
                    value={
                      preferenceDetails.CatSeatType
                        ? preferenceDetails.CatSeatType
                        : ""
                    }
                    name="CatSeatType"
                    className="w-full bg-white rounded-sm  border border-gray-300 text-base outline-none text-gray-700 py-1 px-3 "
                  >
                    <option value="---Select---">---Select---</option>

                    {allCatSeatType.map((item, index) => {
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
                  <select
                    placeholder="Enter District"
                    required={requiredState}
                    onChange={onChange}
                    value={
                      preferenceDetails.location
                        ? preferenceDetails.location
                        : ""
                    }
                    name="location"
                    className="w-full bg-white rounded-sm  border border-gray-300 text-base outline-none text-gray-700 py-1 px-3 "
                  >
                    <option value="">---Select---</option>
                    {allRemDubDistrict &&
                      allRemDubDistrict.map((item, index) => {
                        return (
                          <option
                            key={index}
                            value={item}
                            className="text-left text-sm"
                          >
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
  const preferenceDetail = allUserDetail.preferences;
  if (!preferenceDetail) {
    return (
      <div className="bg-white shadow-md p-5 mt-5 grid place-items-center rounded-sm h-52">
        <img src="/img/loadingSpinner.gif" className="w-10" alt="spinner" />
      </div>
    );
  }
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
        <div className="md:w-2/6 w-full pb-5">
          <div className="text-slate-400 text-sm">Univercity</div>
          <div className="text-sm">{preferenceDetail.university}</div>
        </div>
        <div className="md:w-2/6 w-full pb-5">
          <div className="text-slate-400 text-sm">Branch</div>
          <div className="text-sm">{preferenceDetail.branch}</div>
        </div>
        <div className="md:w-2/6 w-full pb-5">
          <div className="text-slate-400 text-sm">Location</div>
          <div className="text-sm">{preferenceDetail.location}</div>
        </div>
      </div>
      <div className=" flex flex-wrap mt-3  items-center">
        <div className="md:w-2/6 w-full pb-5">
          <div className="text-slate-400 text-sm">College Type</div>
          <div className="text-sm">{preferenceDetail.collegeType}</div>
        </div>
        <div className="md:w-2/6 w-full pb-5">
          <div className="text-slate-400 text-sm">Seat Type</div>
          <div className="text-sm">{preferenceDetail.CatSeatType}</div>
        </div>
        <div className="md:w-2/6 w-full pb-5">
          <div className="text-slate-400 text-sm">Need a loan?</div>
          <div className="text-sm">{preferenceDetail.needLoan}</div>
        </div>
      </div>
    </div>
  );
};
export default PreferenceDetails;
