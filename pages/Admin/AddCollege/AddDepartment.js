import React, { useState, useEffect } from "react";
import AddCollegeDetails from "../AddCollegeDetails";
import Link from "next/link";
import InstituteCheck from "./InstituteCheck";
import { toast } from "react-toastify";
import Toastmsg from "directsecondyearadmission/Components/Toastmsg";
import { useUserContext } from "directsecondyearadmission/Context/UserContext";

const Stepper = () => {
  return (
    <ol className="flex items-center w-full text-sm font-medium p-5 bg-white text-center text-gray-500 dark:text-gray-400 sm:text-base">
      <Link href="/Admin/AddCollege/CollegeDetail" legacyBehavior>
        <li className="flex md:w-full cursor-pointer items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700">
          <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:font-light after:text-gray-200 dark:after:text-gray-500">
            <span className="mr-2">1</span>
            College <span className="hidden sm:inline-flex sm:ml-2">Info</span>
          </span>
        </li>
      </Link>
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
          Department <span className="hidden sm:inline-flex sm:ml-2">Info</span>
        </span>
      </li>

      <Link href="/Admin/AddCollege/Description" legacyBehavior>
        <li className="flex items-center cursor-pointer">
          <span className="mr-2">3</span>
          Description
        </li>
      </Link>
    </ol>
  );
};

const AddDepartment = () => {
  const [requiredState, setRequired] = useState(false);
  const [depDetails, setDepDetails] = useState({});
  const [token, setToken] = useState("");
  const { userUID } = useUserContext();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    }
  }, []);
  const onChange = (e) => {
    setDepDetails({
      ...depDetails,
      [e.target.name]: e.target.value,
    });
  };

  const addDep = async (e) => {
    e.preventDefault();
    const { courseName, annualFees, choiceCode, insCode } = depDetails;
    onSubmit(courseName, annualFees, choiceCode, insCode);
  };

  const onSubmit = async (courseName, annualFees, choiceCode, insCode) => {
    const res = await fetch("/api/addDepartment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: userUID,
      },
      body: JSON.stringify({
        courseName: courseName,
        instituteCode: insCode,
        annalFee: annualFees,
        choiceCode: choiceCode,
      }),
    });

    const res2 = await res.json();
    if (res2.msg) {
      toast.success(res2.msg, {});
    } else {
      toast.error(res2.error, {});
    }
  };

  const AddImage = () => {
    const [addImage, setAddImage] = useState({});

    const onChange = (e) => {
      setAddImage({
        ...addImage,
        [e.target.name]: e.target.value,
      });
    };

    const addImages = async (e) => {
      e.preventDefault();
      const { cImage, insCode } = addImage;
      onSubmit(cImage, insCode);
    };

    const onSubmit = async (cImage, insCode) => {
      const res = await fetch("/api/addImages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          instituteCode: insCode,
          imageUrl: cImage,
        }),
      });

      const res2 = await res.json();
      if (res2.msg) {
        toast.success(res2.msg, {});
      } else {
        toast.error(res2.error, {});
      }
    };

    return (
      <div className="flex mb-4 mt-5 flex-wrap sm:flex-nowrap">
        <form onSubmit={addImages} className="  mr-1 mb-2  w-full">
          <label
            className="block text-grey-darker text-sm font-bold mb-2"
            htmlFor="CName"
          >
            Add Images
          </label>
          <div className="grid gap-5 grid-cols-3">
            <input
              className=" bg-white border  outline-none w-full rounded-sm  py-2 px-3 text-grey-darker"
              type="text"
              placeholder="Ex. 1001"
              required={requiredState}
              onChange={onChange}
              value={addImage.insCode ? addImage.insCode : ""}
              name="insCode"
            />
            <input
              className=" bg-white border  outline-none w-full rounded-sm  py-2 px-3 text-grey-darker"
              type="text"
              placeholder="image Link"
              required={requiredState}
              onChange={onChange}
              value={addImage.cImage ? addImage.cImage : ""}
              name="cImage"
            />
            <button type="submit" className="pBtn px-10 py-3">
              Add Image
            </button>
          </div>
        </form>
      </div>
    );
  };

  const AddCat = () => {
    const [catDetails, setCatDetails] = useState({});

    const onChange = (e) => {
      setCatDetails({
        ...catDetails,
        [e.target.name]: e.target.value,
      });
    };

    const addCat = async (e) => {
      e.preventDefault();
      const { category, Annualfees, Min, Max, Seats, choiceCode } = catDetails;
      onSubmit(category, Annualfees, Min, Max, Seats, choiceCode);
    };

    const onSubmit = async (
      category,
      Annualfees,
      Min,
      Max,
      Seats,
      choiceCode
    ) => {
      const res = await fetch("/api/addCategory", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          category: category,
          min: Min,
          max: Max,
          aFees: Annualfees,
          aSeats: Seats,
          choiceCode: choiceCode,
        }),
      });

      const res2 = await res.json();
      if (res2.msg) {
        toast.success(res2.msg, {});
      } else {
        toast.error(res2.error, {});
      }
    };

    return (
      <div className=" rounded-sm mt-10">
        <h1 className="text-sm font-bold">Category</h1>

        <div className="w-full  ">
          <div className="  w-full rounded-sm bg-slate-50 mt-5 p-3  ">
            <form
              onSubmit={addCat}
              className="grid grid-cols-2 sm:grid-cols-3 gap-2"
            >
              <input
                type="text"
                placeholder="Category"
                required={requiredState}
                onChange={onChange}
                value={catDetails.category ? catDetails.category : ""}
                name="category"
                className="text-xs px-2 py-3 bg-white  outline-none border rounded-sm "
              />
              <input
                type="text"
                placeholder="Annual fees"
                required={requiredState}
                onChange={onChange}
                value={catDetails.Annualfees ? catDetails.Annualfees : ""}
                name="Annualfees"
                className="text-xs px-2 py-3 bg-white  outline-none border rounded-sm "
              />
              <input
                type="text"
                placeholder="Min"
                required={requiredState}
                onChange={onChange}
                value={catDetails.Min ? catDetails.Min : ""}
                name="Min"
                className="text-xs px-2 py-3 bg-white  outline-none border rounded-sm "
              />
              <input
                type="text"
                placeholder="Max"
                required={requiredState}
                onChange={onChange}
                value={catDetails.Max ? catDetails.Max : ""}
                name="Max"
                className="text-xs px-2 py-3 bg-white  outline-none border rounded-sm "
              />
              <input
                type="text"
                placeholder="Seats"
                required={requiredState}
                onChange={onChange}
                value={catDetails.Seats ? catDetails.Seats : ""}
                name="Seats"
                className="text-xs px-2 py-3 bg-white  outline-none border rounded-sm "
              />

              <input
                type="text"
                placeholder="choiceCode"
                required={requiredState}
                onChange={onChange}
                value={catDetails.choiceCode ? catDetails.choiceCode : ""}
                name="choiceCode"
                className="text-xs px-2 py-3 bg-white  outline-none border rounded-sm "
              />
              <button type="submit" className=" pBtn px-10 py-3 text-sm ">
                Add Category
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  };
  return (
    <AddCollegeDetails>
      <Stepper />
      <div className="w-full p-5 h-auto bg-white ">
        <Toastmsg />
        <InstituteCheck />

        <form onSubmit={addDep}>
          <div className="flex mb-4 flex-wrap bg sm:flex-nowrap">
            <div className="sm:w-1/2  mr-1 mb-2  w-full">
              <label
                className="block text-grey-darker text-sm font-bold mb-2"
                htmlFor="CName"
              >
                Course Name
              </label>
              <input
                className=" bg-white border  outline-none w-full rounded-sm  py-2 px-3 text-grey-darker"
                type="text"
                placeholder="Enter Course name"
                onChange={onChange}
                required={requiredState}
                value={depDetails.courseName ? depDetails.courseName : ""}
                name="courseName"
              />
            </div>
            <div className="sm:w-1/2   w-full">
              <label
                className="block text-grey-darker text-sm font-bold mb-2"
                htmlFor="AFees"
              >
                Annual Fees
              </label>
              <input
                className=" bg-white w-full outline-none border rounded-sm  py-2 px-3 text-grey-darker"
                id="Afees"
                type="number"
                required={requiredState}
                placeholder="Annual fees"
                onChange={onChange}
                value={depDetails.annualFees ? depDetails.annualFees : ""}
                name="annualFees"
              />
            </div>
          </div>

          <div className="flex mb-4 flex-wrap bg sm:flex-nowrap">
            <div className="sm:w-1/2  mr-1 mb-2  w-full">
              <label
                className="block text-grey-darker text-sm font-bold mb-2"
                htmlFor="CCode"
              >
                Choice Code
              </label>
              <input
                className=" bg-white border  outline-none w-full rounded-sm  py-2 px-3 text-grey-darker"
                type="text"
                placeholder="Enter Choice code"
                onChange={onChange}
                required={requiredState}
                value={depDetails.choiceCode ? depDetails.choiceCode : ""}
                name="choiceCode"
              />
            </div>

            <div className="sm:w-1/2   w-full">
              <label
                className="block text-grey-darker text-sm font-bold mb-2"
                htmlFor="InsCode"
              >
                Institute Code
              </label>
              <input
                className=" bg-white border  outline-none w-full rounded-sm  py-2 px-3 text-grey-darker"
                type="number"
                onChange={onChange}
                required={requiredState}
                value={depDetails.insCode ? depDetails.insCode : ""}
                name="insCode"
                placeholder="Enter College name"
              />
            </div>
          </div>
          <button type="submit" className="pBtn px-10 py-2">
            Add Department
          </button>
        </form>

        <AddCat />
        <AddImage />
      </div>
    </AddCollegeDetails>
  );
};

export default AddDepartment;
