import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/dist/client/router";
import HomeNav from "directsecondyearadmission/navItem/HomeNav";
import Image from "next/image";
// components
import { useContext } from "react";
import collegeContext from "directsecondyearadmission/Context/collegeContext";

import { useUserAuth } from "directsecondyearadmission/Context/UserAuthContext";
import { useUserContext } from "directsecondyearadmission/Context/UserContext";
import VerifyPhone from "directsecondyearadmission/Components/VerifyPhone";
import VerifyEmail from "directsecondyearadmission/Components/VerifyEmail";
import ChangeEmail from "directsecondyearadmission/Components/ChangeEmail";

export const SideUserData = () => {
  const router = useRouter();
  const context = useContext(collegeContext);
  return (
    <div className=" p-5  bgColor text-white shadow-sm mb-5 flex flex-col justify-between items-center rounded-sm">
      <div className="border shadow-md bg-white p-5 pColor font-bold text-2xl h-20 w-20 flex justify-center items-center rounded-full mb-5">
        {context.username.charAt(0).toUpperCase()}
      </div>
      <div>
        <p className=" font-semibold  text-base text-center  ">
          Welcome to DSY consultancy !
        </p>
        <h1 className=" py-2 text-center text-base">
          <i className="bi bi-person-fill mr-2"></i>

          {context.username}
        </h1>
        <div className="flex mt-2 justify-center items-center  sm:mt-0  flex-col ">
          {router.pathname == "/Profile" ? (
            ""
          ) : (
            <Link
              href="/Profile"
              target="_blank"
              className=" text-center  font-semibold  text-xs"
            >
              Mange your profile
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default function HomeLayout({ children }) {
  const router = useRouter();
  const { user } = useUserAuth();
  const { emailVerified, phoneNumber } = user ? user : {};
  // console.log(user);
  const { allUserDetail } = useUserContext();

  const ListItem = (props) => {
    return (
      <li>
        <Link
          href={props.location}
          className={`flex items-center ${
            router.pathname == props.location && "bg-sky-100 font-semibold"
          }  mb-2 px-4 p-2 my-1 navItem   rounded-sm hover:bg-sky-100  hover:font-semibold`}
        >
          <i className={`bi ${props.icon} mr-2`}></i>
          <span className="text-sm">{props.name}</span>
        </Link>
      </li>
    );
  };

  if (user) {
    return (
      <>
        <section className="body-font md:mt-20   mt-0 px-5">
          {/* <UserData /> */}
          <div className="container  gap-5  flex m-auto  ">
            <aside
              className={` bg-white w-full hidden md:block p-5 md:w-1/5  shadow-md rounded-sm `}
            >
              <div className="rounded-sm ">
                {/* <SideUserData /> */}
                <ul className="mb-2">
                  <li>
                    <Link
                      href="/Profile"
                      target="_blank"
                      className={`flex items-center ${
                        router.pathname == "/Profile" &&
                        "bg-sky-100 font-semibold"
                      }  mb-2 px-4 p-2 my-1 navItem hover:bg-sky-100 hover:font-semibold  rounded-sm`}
                    >
                      <i className={`bi bi-person-fill mr-2`}></i>
                      <span className="text-sm">Profile</span>
                    </Link>
                  </li>
                  {HomeNav.map((item, index) => {
                    return (
                      <ListItem
                        key={index}
                        location={item.location}
                        name={item.name}
                        icon={item.icon}
                      />
                    );
                  })}

                  {(allUserDetail.role === process.env.NEXT_PUBLIC_ADMINKEY ||
                    allUserDetail.role === process.env.NEXT_PUBLIC_ROOTKEY) && (
                    <li>
                      <Link
                        href="/Admin/AllContact"
                        className={`flex items-center ${
                          router.pathname == "/Admin/AllContact" &&
                          "bg-sky-100 font-semibold"
                        }  mb-2 px-4 p-2 my-1 navItem hover:bg-sky-100 hover:font-semibold  rounded-sm`}
                      >
                        <i className={`bi bi-bar-chart-line-fill mr-2`}></i>
                        <span className="text-sm">Dashboard</span>
                      </Link>
                    </li>
                  )}
                </ul>
              </div>

              {/* <div className="sideAds">Space for ads</div> */}
            </aside>

            {emailVerified === false || phoneNumber === null ? (
              <div className="md:w-4/5 bg-white p-5   w-full h-screen  gap-10 flex  flex-col justify-center items-center  overflow-y-scroll mt-20  md:mt-0 ">
                {emailVerified === false && (
                  <div className="p-5 w-full md:w-96 flex justify-center bg-gray-100 rounded-sm flex-col ">
                    <div className="flex justify-center">
                      <div className="w-20 h-20 mb-5 text-red-500 bg-white rounded-full  grid place-items-center">
                        <i className="bi bi-envelope-fill  text-3xl "></i>
                      </div>{" "}
                    </div>
                    <h3 className="font-semibold">
                      Check your Email to Verify
                    </h3>
                    <VerifyEmail />
                  </div>
                )}
                {/* <ChangeEmail /> */}
                {phoneNumber === null && (
                  <div className="p-5 w-full md:w-96 itce flex justify-center bg-gray-100 rounded-sm flex-col ">
                    <div className="flex justify-center">
                      <div className="w-20 h-20 mb-5 text-blue-500 bg-white rounded-full  grid place-items-center">
                        <i className="bi bi-telephone-fill  text-3xl "></i>
                      </div>{" "}
                    </div>
                    <h3 className="font-semibold">Verify your phone Number</h3>
                    <VerifyPhone />
                  </div>
                )}
              </div>
            ) : (
              <div className="md:w-4/5 w-full h-screen  overflow-y-scroll mt-20  md:mt-0 ">
                {children}
              </div>
            )}
          </div>
        </section>
      </>
    );
  }
  return (
    <>
      <section className="body-font  mt-20 mx-5 ">
        <div className="container m-auto">
          <div className="bg-white p-5   border flex sm:flex-row flex-col-reverse items-center  justify-between rounded-sm ">
            <div className="flex flex-col sm:w-2/4 w-full ">
              <div>
                <p className="text-base font-semibold ">
                  Sorry! You are not a DSY user
                </p>
                <p className="text-sm mt-3  text-slate-400">
                  Login Now for Become a + User
                </p>
              </div>

              <Link href="/SignIn" legacyBehavior>
                <button type="button" className="pBtn px-10 mt-5 py-3">
                  Login
                </button>
              </Link>
            </div>

            <div className="sm:mb-0 mb-10">
              <Image width={200} height={150} src="/img/loginUser.svg" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
