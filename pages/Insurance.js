import HomeLayout from "directsecondyearadmission/Layout/HomeLayout";
import React from "react";
import Image from "next/image";
import Head from "next/head";
import { useUserContext } from "directsecondyearadmission/Context/UserContext";
import Link from "next/link";
const Insurance = () => {
  const { allUserDetail, openCalender } = useUserContext();
  if (allUserDetail.profileCompletion < 100) {
    return (
      <HomeLayout>
      <div className=" h-full container grid place-items-center m-auto bg-white p-5">
        <div className="w-96 bg-gray-100 p-5 grid place-items-center">
          <img src="/img/incomplete.svg" className="h-32 mb-10" alt=""  />
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
        <title>DSY consultancy | Insurance</title>
        <meta
          name="keywords"
          content="Direct Second Year Admission,Direct Second year Engineering Admission, Consultancy Services, Admission Assistance, Education Counseling, Admission Consultancy, College Admission Guidance, Admission Process, Admission Requirements, Engineering Admissions, After Diploma Admissions, DSY, Direct Second Year Admission Consultancy | DSY, Direct Second Year Admission Consultancy, Direct Second Year Admission, DSY consultancy, DSY consultancy | Home"
        />

        <meta name="title" content="DSY consultancy | Insurance" />
      </Head>
      <div className="flex flex-col gap-5">
        <div className="bg-white p-5  w-full  shadow-md border flex sm:flex-row flex-col-reverse items-center  justify-between rounded-sm ">
          <div className="flex flex-col sm:w-2/4 w-full ">
            <div>
              <p className="text-base font-semibold ">
                Sorry! Seems like you have no Insurance
              </p>
              <p className="text-sm mt-3  text-slate-400">
                Need help deciding the right insurance plan for you?
              </p>
            </div>

            <button
              onClick={() => {
                openCalender("Insurance");
              }}
              type="button"
              className="pBtn px-10 mt-5 py-3"
            >
              {" "}
              Schedule a call
            </button>
          </div>

          <div className="sm:mb-0 mb-10">
            <Image width={200} height={150} src="/img/Insurance.svg" />
          </div>
        </div>

        <div className="bg-white p-5  w-full  flex flex-col gap-2 shadow-md border rounded-sm ">
          <h1 className="text-lg  font-semibold">
            We believe education should continue uninterrupted at any cost!
          </h1>
          <p className="text-justify text-gray-400">
            If the Covid situation has taught us anything, it is that nothing is
            constant. You have taken admission to the college of your choice,
            and are studying your dream course and living your college life to
            the hilt, but there could emerge situations that could stop your
            progress and have your world crashing down.
          </p>
        </div>

        <div className="bg-white p-5  w-full  flex flex-col gap-2 shadow-md border rounded-sm ">
          <h1 className="text-lg  font-semibold">How it work? </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-gray-100 p-5">
              <div>
                <h1 className="text-xs  font-semibold">How to apply?</h1>
                <ul className="mt-2 ml-5">
                  <li className="text-sm list-disc text-justify">
                    Free offering with admissions done only through DSY Common
                    Application Form platform.
                  </li>
                  <li className="text-sm list-disc text-justify">
                    Insurance will be realised after acknowledgement of fees.
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-gray-100 p-5">
              <div>
                <h1 className="text-xs  font-semibold">Who can avail?</h1>
                <ul className="mt-2 ml-5">
                  <li className="text-sm list-disc text-justify">
                    Your blood relative will be eligible to avail insurance.
                  </li>
                  <li className="text-sm list-disc text-justify">
                    Whoever you appoint as the nominee can also avail.
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-gray-100 p-5">
              <div>
                <h1 className="text-xs  font-semibold">When to claim</h1>
                <ul className="mt-2 ml-5">
                  <li className="text-sm list-disc text-justify">
                    Personal Accident (PA).
                  </li>
                  <li className="text-sm list-disc text-justify">
                    Permanent / Partial Disability (does not cover pre-existing
                    diseases).
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-gray-100 p-5">
              <div>
                <h1 className="text-xs  font-semibold">Get Amount</h1>
                <ul className="mt-2 ml-5">
                  <li className="text-sm list-disc text-justify">
                    INR 1 lakh for a period of 6 months.
                  </li>
                  <li className="text-sm list-disc text-justify">
                    INR 2K/ day for 30 days in case of hospitalisation.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
};

export default Insurance;
