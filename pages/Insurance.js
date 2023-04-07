import HomeLayout from "directsecondyearadmission/Layout/HomeLayout";
import React from "react";
import Image from "next/image";
import Head from "next/head";
const Insurance = () => {
  return (
    <HomeLayout>
      <Head>
        <title>DSY consultancy | Insurance</title>
        <meta
              name="keywords"
              content="Direct Second Year Admission,Direct Second year Engineering Admission, Consultancy Services, Admission Assistance, Education Counseling, Admission Consultancy, College Admission Guidance, Admission Process, Admission Requirements, Engineering Admissions, After Diploma Admissions, DSY, Direct Second Year Admission Consultancy | DSY, Direct Second Year Admission Consultancy, Direct Second Year Admission, DSY consultancy, DSY consultancy | Home"
            />

            <meta
              name="title"
              content="DSY consultancy | Insurance"
            />
      </Head>
      <div className="bg-white p-5   shadow-md border flex sm:flex-row flex-col-reverse items-center  justify-between rounded-sm ">
        <div className="flex flex-col sm:w-2/4 w-full ">
          <div>
            <p className="text-base font-semibold ">
              Sorry! Seems like you have no Insurance
            </p>
            <p className="text-sm mt-3  text-slate-400">
              Need help deciding the right insurance plan for you?
            </p>
          </div>

          <button type="button" className="pBtn px-10 mt-5 py-3">
            {" "}
            Schedule a call
          </button>
        </div>

        <div className="sm:mb-0 mb-10">
          <Image
            width={200}
            height={150}
            src="/img/Insurance.svg"
          />
        </div>
      </div>
    </HomeLayout>
  );
};

export default Insurance;
