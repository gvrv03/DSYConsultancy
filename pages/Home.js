import HomeLayout from "directsecondyearadmission/Layout/HomeLayout";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import collegeContext from "directsecondyearadmission/Context/collegeContext";
import { useRouter } from "next/router";
import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import { GetCurrentLocation } from "directsecondyearadmission/quieries/GetCurrentLocation";
import { useUserAuth } from "directsecondyearadmission/Context/UserAuthContext";
const Home = () => {
  const context = useContext(collegeContext);
  const loginStatus = context.loginStatus;
  const [coOrdinates, setcoOrdinates] = useState({});
  const [token, setToken] = useState("");

  const { user } = useUserAuth();

  console.log(user);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    }

    navigator.geolocation.getCurrentPosition(function (position) {
      setcoOrdinates({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    });

    const updateLocation = async () => {
      const res = await fetch("/api/updateUserLocation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          latitude: coOrdinates.latitude,
          longitude: coOrdinates.longitude,
        }),
      });

      console.log(await res.json());
    };
    // GetCurrentLocation(coOrdinates.latitude, coOrdinates.longitude, token);
    updateLocation();
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

          <button type="button" className="pBtn px-10 mt-5 py-3">
            {" "}
            Schedule a call
          </button>
        </div>

        <div className="sm:mb-0 mb-10">
          {/* <img width={100} src="/img/counsellor2.svg" alt="" /> */}
          <Image src="/img/counsellor2.svg" width={250} height={150} />
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

          <button type="button" className="pBtn px-10 mt-5 py-3">
            {" "}
            Schedule a call
          </button>
        </div>

        <div className="sm:mb-0 mb-10">
          <Image width={250} src="/img/Insurance.svg" height={150} alt="" />
        </div>
      </div>
    );
  };
  const HeaderCard = () => {
    const name = user.displayName;
    const [progress, setProgress] = useState(context.profileCompletion);
    return (
      <div className="mb-5   shadow-md border">
        <div className="bg-white p-5   flex sm:flex-row flex-col-reverse items-center w-full  justify-between rounded-sm ">
          <div className="flex flex-col sm:w-2/4 w-full justify-around">
            <div>
              <p className="text-base font-semibold">
                Hey {name}, Your profile is incomplete !
              </p>
              <p className="text-sm mt-3 text-slate-400">
                Complete your profile and we will help you in building better
                college recommendations for you.
              </p>
            </div>
            <Link
              href={{
                pathname: `/Profile`,
                query: {
                  id: context.userId,
                },
              }}
              legacyBehavior
            >
              <button
                type="button"
                className="font-bold bg-slate-600 text-white px-10 mt-5 py-3"
              >
                {" "}
                Complete Your Profile
              </button>
            </Link>
          </div>

          <div className="sm:mb-0  mb-10">
            <img width={200} src="/img/counsellor.svg" alt="" />
          </div>
        </div>

        <div className="w-full p-5 bg-white">
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
    );
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
      <HeaderCard />
      <div className="md:flex-row flex-col flex gap-5 ">
        <CounsellorCard />
        <InsuranceCard />
      </div>
    </HomeLayout>
  );
};

export default Home;
