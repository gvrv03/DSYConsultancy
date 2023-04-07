import HomeLayout from "directsecondyearadmission/Layout/HomeLayout";
import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

const BasicDoc = () => {
  return (
    <div className="w-full ">
      <h1 className=" font-semibold text-lg mb-5">Document</h1>
      <div className=" flex w-full  gap-5 flex-wrap ">
        <div className="sm:w-48 w-full flex flex-row  sm:flex-col bg-slate-100 p-2 ">
          <div className="max-w-xl">
            <label className="flex justify-center sm:w-full mr-5 sm:mr-0 h-20 w-20 px-4 transition bg-white border border-gray-300 border-dashed rounded-sm appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
              <span className="flex items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-3 h-3 pColor"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
                <span className="font-medium text-gray-600">
                  <span className="pColor "> Upload</span>
                </span>
              </span>
              <input type="file" name="file_upload" className="hidden" />
            </label>
          </div>
          <div>
            <h2 className="text-sm mt-5 font-semibold">10th Marksheet</h2>
            <p className="text-xs text-slate-400">
              File should be max 2mb and jpg, jpeg, png, pdf
            </p>
          </div>
        </div>
        <div className="sm:w-48 w-full flex flex-row  sm:flex-col bg-slate-100 p-2 ">
          <div className="max-w-xl">
            <label className="flex justify-center sm:w-full mr-5 sm:mr-0 h-20 w-20 px-4 transition bg-white border border-gray-300 border-dashed rounded-sm appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
              <span className="flex items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-3 h-3 pColor"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
                <span className="font-medium text-gray-600">
                  <span className="pColor "> Upload</span>
                </span>
              </span>
              <input type="file" name="file_upload" className="hidden" />
            </label>
          </div>
          <div>
            <h2 className="text-sm mt-5 font-semibold">10th Marksheet</h2>
            <p className="text-xs text-slate-400">
              File should be max 2mb and jpg, jpeg, png, pdf
            </p>
          </div>
        </div>{" "}
        <div className="sm:w-48 w-full flex flex-row  sm:flex-col bg-slate-100 p-2 ">
          <div className="max-w-xl">
            <label className="flex justify-center sm:w-full mr-5 sm:mr-0 h-20 w-20 px-4 transition bg-white border border-gray-300 border-dashed rounded-sm appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
              <span className="flex items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-3 h-3 pColor"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
                <span className="font-medium text-gray-600">
                  <span className="pColor "> Upload</span>
                </span>
              </span>
              <input type="file" name="file_upload" className="hidden" />
            </label>
          </div>
          <div>
            <h2 className="text-sm mt-5 font-semibold">10th Marksheet</h2>
            <p className="text-xs text-slate-400">
              File should be max 2mb and jpg, jpeg, png, pdf
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const AddmissionDoc = () => {
  return (
    <div className="w-full ">
      <h1 className=" font-semibold text-lg mb-5">Document</h1>
      <div className=" flex w-full  gap-5 flex-wrap ">
        <div className="sm:w-48 w-full flex flex-row  sm:flex-col bg-slate-100 p-2 ">
          <div className="max-w-xl">
            <label className="flex justify-center sm:w-full mr-5 sm:mr-0 h-20 w-20 px-4 transition bg-white border border-gray-300 border-dashed rounded-sm appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
              <span className="flex items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-3 h-3 pColor"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
                <span className="font-medium text-gray-600">
                  <span className="pColor "> Upload</span>
                </span>
              </span>
              <input type="file" name="file_upload" className="hidden" />
            </label>
          </div>
          <div>
            <h2 className="text-sm mt-5 font-semibold">12th Marksheet</h2>
            <p className="text-xs text-slate-400">
              File should be max 2mb and jpg, jpeg, png, pdf
            </p>
          </div>
        </div>
        <div className="sm:w-48 w-full flex flex-row  sm:flex-col bg-slate-100 p-2 ">
          <div className="max-w-xl">
            <label className="flex justify-center sm:w-full mr-5 sm:mr-0 h-20 w-20 px-4 transition bg-white border border-gray-300 border-dashed rounded-sm appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
              <span className="flex items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-3 h-3 pColor"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
                <span className="font-medium text-gray-600">
                  <span className="pColor "> Upload</span>
                </span>
              </span>
              <input type="file" name="file_upload" className="hidden" />
            </label>
          </div>
          <div>
            <h2 className="text-sm mt-5 font-semibold">12th Marksheet</h2>
            <p className="text-xs text-slate-400">
              File should be max 2mb and jpg, jpeg, png, pdf
            </p>
          </div>
        </div>{" "}
      </div>
    </div>
  );
};
const DocMsg = () => {
  return (
    <div className="bg-white  border shadow-md p-5 mb-5 flex sm:flex-row flex-col-reverse items-center  justify-between rounded-sm ">
      <div className="flex flex-col sm:w-2/4 w-full justify-around">
        <div>
          <p className="text-base font-semibold">
            Securely access your documents anywhere, anytime.
          </p>
          <p className="text-sm mt-3 text-slate-400">
            Upload the documents listed below to build your profile that will
            help us serve you better
          </p>
        </div>
      </div>

      <div className="sm:mb-0 mb-10">
        <Image height={100} width={200} src="/img/document.svg" alt="" />
      </div>
    </div>
  );
};
const Document = () => {
  const [docType, setDocType] = useState("basicDoc");

  const goToAdmission = () => {
    setDocType("admissionDoc");
  };

  const goToBasic = () => {
    setDocType("basicDoc");
  };

  const UserDoc = ({ children }) => {
    return (
      <div className="bg-white p-5 shadow-md rounded-sm">
        <div className="flex gap-5 p-5 bg-slate-100 ">
          <button
            onClick={goToBasic}
            className={
              docType == "basicDoc"
                ? "bg-sky-500 text-white px-5  font-semibold rounded-3xl  p-2"
                : " font-semibold"
            }
            type="button"
          >
            {" "}
            Basic Document
          </button>
          <button
            className={
              docType == "admissionDoc"
                ? "bg-sky-500 text-white px-5  font-semibold rounded-3xl  p-2"
                : " font-semibold"
            }
            onClick={goToAdmission}
            type="button"
          >
            {" "}
            Admission Proof
          </button>
        </div>
        <div className="mt-5 text-sm">{children}</div>
      </div>
    );
  };

  return (
    <HomeLayout>
       <Head>
        <title>DSY consultancy | Documents</title>
        <meta
          name="keywords"
          content="Direct Second Year Admission, Consultancy Services, Admission Assistance, Education Counseling, Admission Consultancy, College Admission Guidance, Admission Process, Admission Requirements, Engineering Admissions, After Diploma Admissions, DSY, Direct Second Year Admission Consultancy | DSY, Direct Second Year Admission Consultancy, Direct Second Year Admission, DSY consultancy, DSY consultancy | Documents"
        />

        <meta name="title" content="DSY consultancy | Documents" />
      </Head>
      <DocMsg />
      <UserDoc>
        {docType == "basicDoc" ? <BasicDoc /> : <AddmissionDoc />}
      </UserDoc>
    </HomeLayout>
  );
};

export default Document;
