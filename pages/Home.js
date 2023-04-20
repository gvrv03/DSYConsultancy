import HomeLayout from "directsecondyearadmission/Layout/HomeLayout";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import collegeContext from "directsecondyearadmission/Context/collegeContext";
import { useRouter } from "next/router";
import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import { useUserAuth } from "directsecondyearadmission/Context/UserAuthContext";
import { useUserContext } from "directsecondyearadmission/Context/UserContext";
import VerifyPhone from "directsecondyearadmission/Components/VerifyPhone";
const Home = () => {
  const { openCalender } = useUserContext();
  const [token, setToken] = useState("");
  const { allUserDetail, coOrdinates } = useUserContext();
  console.log(coOrdinates);
  const { user } = useUserAuth();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    }
  }, []);

  const CounsellorCard = () => {
    return (
      <div className="bg-white p-5 shadow-md flex sm:flex-row  flex-col-reverse items-center  justify-between rounded-sm ">
        <div className="flex flex-col sm:w-2/4 w-full justify-around">
          <div>
            <p className="text-base font-semibold">
              Talk to our Expert Counsellors
            </p>
            <p className="text-sm mt-3 text-slate-400">
              Our expert counsellors are ready to help you to complete your
              admission process.
            </p>
          </div>

          <button
            onClick={() => {
              openCalender("Counselling");
            }}
            type="button"
            className="pBtn px-10 mt-5 py-3"
          >
            {" "}
            Schedule a call
          </button>
        </div>

        <div className="sm:mb-0 mb-10">
          {/* <img width={100} src="/img/counsellor2.svg" alt="" /> */}
          <Image
            alt="DSY counsellor"
            src="/img/counsellor2.svg"
            width={130}
            height={130}
          />
        </div>
      </div>
    );
  };

  const InsuranceCard = () => {
    return (
      <div className="bg-white p-5 flex sm:flex-row shadow-md flex-col-reverse items-center  justify-between rounded-sm ">
        <div className="flex flex-col sm:w-2/4 w-full justify-around">
          <div>
            <p className="text-base font-semibold">DSY Insurance</p>
            <p className="text-sm mt-3 text-slate-400">
              Get yourself or your parents covered with an insurance and
              continue uninterrupted education.
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
          <Image
            width={130}
            height={130}
            src="/img/Insurance.svg"
            alt="DSY Insurance"
          />
        </div>
      </div>
    );
  };
  const HeaderCard = () => {
    const name = user.displayName;
    const [progress, setProgress] = useState(allUserDetail.profileCompletion);

    if (allUserDetail.profileCompletion != 100) {
      return (
        <div className="  w-full shadow-md border">
          <div className="bg-white p-5   flex sm:flex-row flex-col-reverse items-center w-full  justify-between rounded-sm ">
            <div className="flex flex-col sm:w-2/4 w-full justify-around">
              <div>
                <p className="text-base  font-semibold">
                  Hey <span className="pColor">{name}</span> , Your profile is
                  incomplete !
                </p>
                <p className="text-sm mt-3 text-justify text-slate-400">
                  Complete your profile and we will help you in building better
                  college recommendations for you.
                </p>
              </div>
              <Link href="/Profile" legacyBehavior>
                <button
                  type="button"
                  className="font-bold bg-slate-600 text-white px-10 mt-5 py-3"
                >
                  {" "}
                  Complete Your Profile
                </button>
              </Link>
              <div className="w-full py-5 bg-white">
                <div className="w-full bg-gray-200 rounded-full dark:bg-gray-200">
                  <div
                    className="bg-slate-400 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
                    style={{ width: progress + "%" }}
                  >
                    {" "}
                    {progress}%
                  </div>
                </div>
              </div>
            </div>

            <div className="sm:mb-0  mb-10">
              <Image
                width={180}
                height={130}
                src="/img/counsellor.svg"
                alt="DSY counsellor"
              />
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="w-full shadow-md border">
          <div className="bg-white p-5   flex sm:flex-row flex-col-reverse items-center w-full  justify-between rounded-sm ">
            <div className="flex flex-col sm:w-2/4 w-full justify-around">
              <div>
                <p className="text-base font-semibold">
                  Hey <span className="pColor">{name}</span> , Your profile is
                  Complete !
                </p>
                <p className="text-sm mt-3 text-slate-400">
                  Enjoy our Services
                </p>
              </div>
            </div>

            <div className="sm:mb-0  mb-10">
              <Image
                width={180}
                height={130}
                src="/img/counsellor.svg"
                alt="DSY counsellor"
              />
            </div>
          </div>
        </div>
      );
    }
  };
  return (
    <HomeLayout>
      <Head>
        <title>DSY consultancy | Home</title>
        <meta
          name="keywords"
          content="Direct Second Year Admission, Consultancy Services, Admission Assistance, Education Counseling, Admission Consultancy, College Admission Guidance, Admission Process, Admission Requirements, Engineering Admissions, After Diploma Admissions, DSY, Direct Second Year Admission Consultancy | DSY, Direct Second Year Admission Consultancy, Direct Second Year Admission, DSY consultancy, DSY consultancy | Home"
        />

        <meta name="title" content="DSY consultancy | Home" />
      </Head>

      <div className="flex md:flex-row flex-col gap-5 justify-between items-start mb-5">
        <HeaderCard />
        <div className=" p-5  w-full md:max-w-sm   bg-white shadow-md rounded-sm">
          <h2 className="mb-5 font-bold">Update Phone Number</h2>
          <VerifyPhone />
        </div>
      </div>
      <div className="md:flex-row flex-col flex gap-5 ">
        <CounsellorCard />
        <InsuranceCard />
      </div>
    </HomeLayout>
  );
};

export default Home;
