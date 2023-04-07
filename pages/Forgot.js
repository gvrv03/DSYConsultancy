import Auth from "directsecondyearadmission/Layout/Auth";
import React from "react";
import Head from "next/head";
import Link from "next/link";

const Forgot = () => {
  return (
    <Auth>
       <Head>
        <title>DSY consultancy | Forgot Password</title>
        <meta
          name="keywords"
          content="Direct Second Year Admission, Consultancy Services, Admission Assistance, Education Counseling, Admission Consultancy, College Admission Guidance, Admission Process, Admission Requirements, Engineering Admissions, After Diploma Admissions, DSY, Direct Second Year Admission Consultancy | DSY, Direct Second Year Admission Consultancy, Direct Second Year Admission, DSY consultancy, DSY consultancy | Forgot Password"
        />

        <meta name="title" content="DSY consultancy | Forgot Password" />
      </Head>
      <form className="lg:w-2/6 md:w-1/2 bg-white    p-8 flex flex-col md:ml-auto w-full mt-10  md:mt-0">
        <h2 className="text-gray-900 text-center text-lg font-medium title-font mb-5">
          Forgot Password
        </h2>

        <div className="text-xs text-center bg-red-50 text-red-900 py-4 font-semibold border border-red-200">
          Invalid E-mail
        </div>
        <div className=" mt-5 relative mb-4">
          <label htmlFor="email" className="leading-7 text-sm text-gray-600">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full bg-white rounded-sm  border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>

        <button className=" border-0 py-2 px-8 focus:outline-none pBtn rounded-sm  text-lg">
          Sign In
        </button>
        <p className="text-xs text-center text-gray-500 mt-3">
          <Link href="/Login">
             Login
          </Link>
        </p>
      </form>
    </Auth>
  );
};

export default Forgot;
