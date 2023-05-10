import AllCollegesData from "directsecondyearadmission/Components/AllCollegeData";
import { useUserContext } from "directsecondyearadmission/Context/UserContext";
import HomeLayout from "directsecondyearadmission/Layout/HomeLayout";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";

const College = () => {
  const [userOpen, setUserOpen] = useState("-right-full");
  const { allUserDetail } = useUserContext();
  const toggleUser = () => {
    if (userOpen == "-right-full") {
      setUserOpen("right-0");
    } else {
      setUserOpen("-right-full");
    }
  };

  const router = useRouter();
  try {
    if (allUserDetail.profileCompletion < 100) {
      return (
        <HomeLayout>
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
        </HomeLayout>
      );
    }

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
        <HeaderFilter toggleUser={toggleUser} />
        <AllCollegesData toggleUser={toggleUser} userOpen={userOpen} />
      </HomeLayout>
    );
  } catch (error) {
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
        <HeaderFilter toggleUser={toggleUser} />

        <div className="bg-white h-full grid place-items-center p-5">
          <div className="text-center">
            <h1>Opp's some unexpected error occur !</h1>
            <button
              onClick={() => {
                router.reload();
              }}
              className="px-5 py-2 mt-5 pBtn"
            >
              Try again !
            </button>
          </div>
        </div>
      </HomeLayout>
    );
  }
};

const HeaderFilter = ({ toggleUser }) => {
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
          <i onClick={toggleUser} className="bi bi-funnel-fill mr-4"></i>
          <span onClick={toggleUser} className="text-slate-400">
            Filter
          </span>
        </div>
      </div>
    </>
  );
};

export default College;
