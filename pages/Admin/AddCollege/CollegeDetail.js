import React, { useState, useEffect } from "react";
import AddCollegeDetails from "../AddCollegeDetails";
import Link from "next/link";
import InstituteCheck from "./InstituteCheck";
import Toastmsg from "directsecondyearadmission/pages/Components/Toastmsg";
import { toast } from "react-toastify";
import { useContext } from "react";
import collegeContext from "directsecondyearadmission/Context/collegeContext";
import PopUpModal from "directsecondyearadmission/pages/Components/PopUpModal";
const CollegeDetail = () => {
  const context = useContext(collegeContext);
  console.log(context.username);
  const [cDetails, setCDetails] = useState({});
  const [requiredState, setRequired] = useState(false);
  const [token, setToken] = useState("");

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    }
  }, []);
  const onChange = (e) => {
    setCDetails({
      ...cDetails,
      [e.target.name]: e.target.value,
    });
  };

  const addCollege = async (e) => {
    e.preventDefault();
    const {
      cName,
      insCode,
      cUnder,
      cType,
      approvedBy,
      rating,
      university,
      addressLine,
      taluka,
      district,
      city,
      longitude,
      latitude,
      iFranmeLoc,
      imageLogo,
      phoneNo,
      cWebsite,
      cEmail,
      topRecuriter,
    } = cDetails;
    onSubmit(
      cName,
      insCode,
      cUnder,
      cType,
      approvedBy,
      rating,
      university,
      addressLine,
      taluka,
      district,
      city,
      longitude,
      latitude,
      iFranmeLoc,
      imageLogo,
      phoneNo,
      cWebsite,
      cEmail,
      topRecuriter
    );
  };

  async function onSubmit(
    cName,
    insCode,
    cUnder,
    cType,
    approvedBy,
    rating,
    university,
    addressLine,
    taluka,
    district,
    city,
    longitude,
    latitude,
    iFranmeLoc,
    imageLogo,
    phoneNo,
    cWebsite,
    cEmail,
    topRecuriter
  ) {
    const res = await fetch("/api/Colleges", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token,
      },
      body: JSON.stringify({
        name: cName,
        instituteCode: insCode,
        iframe: iFranmeLoc,
        collegeUnder: cUnder,
        collegeType: cType,
        university: university,
        addressLine: addressLine,
        taluka: taluka,
        district: district,
        addedBy: context.username,
        city: city,
        latitude: latitude,
        longitude: longitude,
        rating: rating,
        contactNo: phoneNo,
        website: cWebsite,
        email: cEmail,
        approvedBy: approvedBy,
        image: imageLogo,
        topRecruiters: topRecuriter,
      }),
    });

    const res2 = await res.json();
    if (res2.msg) {
      context.openModal("success", res2.msg);
    } else {
      context.openModal("fail", res2.error);
    }
  }

  return (
    <>
      <AddCollegeDetails>
        <Toastmsg />
        <Stepper />
        <div className="w-full px-5 h-auto bg-white ">
          <InstituteCheck />
        </div>
        <form
          onSubmit={addCollege}
          className="w-full px-5 pt-0 h-auto bg-white "
        >
          <div className="flex mb-4 flex-wrap bg sm:flex-nowrap">
            <div className="sm:w-1/2  mr-1 mb-2  w-full">
              <label
                className="block text-grey-darker text-sm font-bold mb-2"
                htmlFor="CollegeName"
              >
                College Name
              </label>
              <input
                required={requiredState}
                className=" bg-white border  w-full rounded-sm outline-none  py-2 px-3 text-grey-darker"
                type="text"
                onChange={onChange}
                value={cDetails.cName ? cDetails.cName : ""}
                name="cName"
                placeholder="Enter College name"
              />
            </div>
            <div className="sm:w-1/2   w-full">
              <label
                className="block text-grey-darker text-sm font-bold mb-2"
                htmlFor="InstituteCode"
              >
                Institute Code
              </label>
              <input
                required={requiredState}
                className=" bg-white w-full border rounded-sm  outline-none py-2 px-3 text-grey-darker"
                id="InstituteCode"
                type="number"
                onChange={onChange}
                value={cDetails.insCode ? cDetails.insCode : ""}
                name="insCode"
                placeholder="Institute Code"
              />
            </div>
          </div>
          <div className="flex mb-4 flex-wrap bg sm:flex-nowrap">
            <div className="sm:w-1/2  mr-1  mb-2 w-full">
              <label
                className="block text-grey-darker text-sm font-bold mb-2"
                htmlFor="CollegeUnder"
              >
                College Under
              </label>
              <select
                onChange={onChange}
                value={cDetails.cUnder ? cDetails.cUnder : ""}
                name="cUnder"
                className=" bg-white border  w-full rounded-sm  py-2 px-3 text-grey-darker"
              >
                <option value="Government">---Select---</option>
                <option value="Government">Government</option>
                <option value="Private">Private</option>
              </select>
            </div>
            <div className="sm:w-1/2  w-full">
              <label
                className="block text-grey-darker text-sm font-bold mb-2"
                htmlFor="CollegeType"
              >
                College Type
              </label>
              <select
                onChange={onChange}
                value={cDetails.cType ? cDetails.cType : ""}
                name="cType"
                className=" bg-white border  w-full rounded-sm  py-2 px-3 text-grey-darker"
              >
                <option value="Government">---Select---</option>

                <option value="Autonomous">Autonomous</option>
                <option value="Non-Autonomous">Non-Autonomous</option>
              </select>
            </div>
          </div>

          <div className="flex mb-4 flex-wrap bg sm:flex-nowrap">
            <div className="sm:w-1/2 mb-2 mr-1  w-full">
              <label
                className="block text-grey-darker text-sm font-bold mb-2"
                htmlFor="ApprovedBy"
              >
                Approved By
              </label>
              <input
                required={requiredState}
                className=" bg-white border rounded-sm  w-full outline-none py-2 px-3 text-grey-darker"
                id="ApprovedBy"
                onChange={onChange}
                value={cDetails.approvedBy ? cDetails.approvedBy : ""}
                name="approvedBy"
                type="text"
                placeholder="Enter Approved By"
              />
            </div>
            <div className="sm:w-1/2  mr-1  w-full">
              <label
                className="block text-grey-darker text-sm font-bold mb-2"
                htmlFor="Rating"
              >
                Rating
              </label>
              <input
                required={requiredState}
                className=" bg-white border rounded-sm  w-full outline-none py-2 px-3 text-grey-darker"
                id="Rating"
                type="text"
                onChange={onChange}
                value={cDetails.rating ? cDetails.rating : ""}
                name="rating"
                placeholder="Enter Rating"
              />
            </div>
          </div>

          <div className="mb-4">
            <label
              className="block text-grey-darker text-sm font-bold mb-2"
              htmlFor="University"
            >
              University
            </label>
            <input
              required={requiredState}
              className=" bg-white border rounded-sm  w-full outline-none py-2 px-3 text-grey-darker"
              id="University"
              type="text"
              onChange={onChange}
              value={cDetails.university ? cDetails.university : ""}
              name="university"
              placeholder="University "
            />
          </div>

          <div className=" font-semibold text-slate-400 bg-white py-5">
            Location
          </div>

          <div className="flex mb-4 flex-wrap bg sm:flex-nowrap">
            <div className="sm:w-1/2 mb-2  mr-1  w-full">
              <label
                className="block text-grey-darker text-sm font-bold mb-2"
                htmlFor="AddressLine"
              >
                Address Line
              </label>
              <input
                required={requiredState}
                className=" bg-white border rounded-sm  w-full outline-none py-2 px-3 text-grey-darker"
                id="AddressLine"
                onChange={onChange}
                value={cDetails.addressLine ? cDetails.addressLine : ""}
                name="addressLine"
                type="text"
                placeholder="Enter College Address"
              />
            </div>
            <div className="sm:w-1/2  mr-1  w-full">
              <label
                className="block text-grey-darker text-sm font-bold mb-2"
                htmlFor="Taluka"
              >
                Taluka
              </label>
              <input
                required={requiredState}
                className=" bg-white border rounded-sm  w-full outline-none py-2 px-3 text-grey-darker"
                id="Taluka"
                type="text"
                onChange={onChange}
                value={cDetails.taluka ? cDetails.taluka : ""}
                name="taluka"
                placeholder="Enter Taluka"
              />
            </div>
          </div>

          <div className="flex mb-4 flex-wrap bg sm:flex-nowrap">
            <div className="sm:w-1/2  mr-1  w-full">
              <label
                className="block text-grey-darker text-sm font-bold mb-2"
                htmlFor="District"
              >
                District
              </label>
              <input
                required={requiredState}
                className=" bg-white border rounded-sm  w-full outline-none py-2 px-3 text-grey-darker"
                id="District"
                type="text"
                onChange={onChange}
                value={cDetails.district ? cDetails.district : ""}
                name="district"
                placeholder="Enter District"
              />
            </div>
            <div className="sm:w-1/2  mr-1  w-full">
              <label
                className="block text-grey-darker text-sm font-bold mb-2"
                htmlFor="City"
              >
                City
              </label>
              <input
                required={requiredState}
                className=" bg-white border rounded-sm  w-full outline-none py-2 px-3 text-grey-darker"
                id="City"
                type="text"
                onChange={onChange}
                value={cDetails.city ? cDetails.city : ""}
                name="city"
                placeholder="Enter City"
              />
            </div>
          </div>

          <div className="flex mb-4 flex-wrap bg sm:flex-nowrap">
            <div className="sm:w-1/2  mr-1 mb-2  w-full">
              <label
                className="block text-grey-darker text-sm font-bold mb-2"
                htmlFor="Longitute"
              >
                Longitude
              </label>
              <input
                required={requiredState}
                className=" bg-white border rounded-sm  w-full outline-none py-2 px-3 text-grey-darker"
                id="Longitude"
                type="text"
                onChange={onChange}
                value={cDetails.longitude ? cDetails.longitude : ""}
                name="longitude"
                placeholder="Enter Longitute"
              />
            </div>
            <div className="sm:w-1/2  mr-1  w-full">
              <label
                className="block text-grey-darker text-sm font-bold mb-2"
                htmlFor="Latitute"
              >
                Latitute
              </label>
              <input
                required={requiredState}
                className=" bg-white border rounded-sm  w-full outline-none py-2 px-3 text-grey-darker"
                id="Latitute"
                onChange={onChange}
                value={cDetails.latitude ? cDetails.latitude : ""}
                name="latitude"
                type="text"
                placeholder="Enter Latitute"
              />
            </div>
          </div>

          <div className="mb-4">
            <label
              className="block text-grey-darker text-sm font-bold mb-2"
              htmlFor="iFrameLocation"
            >
              IFrame Location
            </label>
            <input
              required={requiredState}
              className=" bg-white border rounded-sm  w-full outline-none py-2 px-3 text-grey-darker"
              id="iFrameLocation"
              type="text"
              onChange={onChange}
              value={cDetails.iFranmeLoc ? cDetails.iFranmeLoc : ""}
              name="iFranmeLoc"
              placeholder="Ex: <iframe>...</iframe>"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-grey-darker text-sm font-bold mb-2"
              htmlFor="image"
            >
              Image
            </label>
            <input
              required={requiredState}
              className=" bg-white border rounded-sm  w-full outline-none py-2 px-3 text-grey-darker"
              id="image"
              type="text"
              onChange={onChange}
              value={cDetails.imageLogo ? cDetails.imageLogo : ""}
              name="imageLogo"
              placeholder="Ex: http://localhost:3000/img/hero.png"
            />
          </div>

          <div className=" font-semibold text-slate-400 bg-white py-5">
            Contact Information
          </div>

          <div className="flex mb-4 flex-wrap bg sm:flex-nowrap">
            <div className="sm:w-1/2 mb-2 mr-1  w-full">
              <label
                className="block text-grey-darker text-sm font-bold mb-2"
                htmlFor="ContactNO"
              >
                Contact NO
              </label>
              <input
                required={requiredState}
                className=" bg-white border rounded-sm  w-full outline-none py-2 px-3 text-grey-darker"
                id="ContactNO"
                onChange={onChange}
                value={cDetails.phoneNo ? cDetails.phoneNo : ""}
                name="phoneNo"
                type="number"
                placeholder="Enter Contact NO"
              />
            </div>
            <div className="sm:w-1/2  mr-1  w-full">
              <label
                className="block text-grey-darker text-sm font-bold mb-2"
                htmlFor="Website"
              >
                Website
              </label>
              <input
                required={requiredState}
                className=" bg-white border rounded-sm  w-full outline-none py-2 px-3 text-grey-darker"
                id="Website"
                type="text"
                onChange={onChange}
                value={cDetails.cWebsite ? cDetails.cWebsite : ""}
                name="cWebsite"
                placeholder="Enter Website"
              />
            </div>
          </div>

          <div className="mb-4">
            <label
              className="block text-grey-darker text-sm font-bold mb-2"
              htmlFor="Email"
            >
              E-mail
            </label>
            <input
              required={requiredState}
              className=" bg-white border rounded-sm  w-full outline-none py-2 px-3 text-grey-darker"
              id="Email"
              onChange={onChange}
              value={cDetails.cEmail ? cDetails.cEmail : ""}
              name="cEmail"
              type="email"
              placeholder="Enter Email"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-grey-darker text-sm font-bold mb-2"
              htmlFor="TopRecruiters"
            >
              Top Recruiters
            </label>
            <input
              required={requiredState}
              className=" bg-white border rounded-sm  w-full outline-none py-2 px-3 text-grey-darker"
              id="TopRecruiters"
              onChange={onChange}
              value={cDetails.topRecuriter ? cDetails.topRecuriter : ""}
              name="topRecuriter"
              type="text"
              placeholder="Enter Top Recruiters"
            />
          </div>

          <button className=" w-32 pBtn px-5 py-3  " type="submit">
            Submit
          </button>
        </form>
      </AddCollegeDetails>
    </>
  );
};

const Stepper = () => {
  return (
    <ol className="flex items-center w-full text-sm font-medium p-5 bg-white text-center text-gray-500 dark:text-gray-400 sm:text-base">
      <li className="flex md:w-full items-center text-blue-600 dark:text-blue-500 sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700">
        <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:font-light after:text-gray-200 dark:after:text-gray-500">
          <svg
            aria-hidden="true"
            className="w-4 h-4 mr-2 sm:w-5 sm:h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            ></path>
          </svg>
          College <span className="hidden sm:inline-flex sm:ml-2">Info</span>
        </span>
      </li>

      <Link href="/Admin/AddCollege/AddDepartment" legacyBehavior>
        <li className="flex md:w-full cursor-pointer items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700">
          <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:font-light after:text-gray-200 dark:after:text-gray-500">
            <span className="mr-2">2</span>
            Department{" "}
            <span className="hidden sm:inline-flex sm:ml-2">Info</span>
          </span>
        </li>
      </Link>

      <Link href="/Admin/AddCollege/Description" legacyBehavior>
        <li className="flex items-center cursor-pointer">
          <span className="mr-2">3</span>
          Description
        </li>
      </Link>
    </ol>
  );
};

export default CollegeDetail;
