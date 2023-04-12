import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/dist/client/router";
import HomeNav from "directsecondyearadmission/navItem/HomeNav";
import Image from "next/image";
// components
import { useContext } from "react";
import collegeContext from "directsecondyearadmission/Context/collegeContext";

import {
  PUBLIC_ADMINKEY,
  PUBLIC_ROOTKEY,
} from "directsecondyearadmission/quieries/UserKeys";
import { useUserAuth } from "directsecondyearadmission/Context/UserAuthContext";

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
              href={{
                pathname: `/Profile`,
                query: {
                  id: user.uid,
                },
              }}
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
  const context = useContext(collegeContext);
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

  const UserData = () => {
    const router = useRouter();
    return (
      <div className="bgColor m-auto  hidden  mb-5  p-5 flex-wrap  text-white  justify-between md:flex items-center container rounded-sm">
        <div className="avtarP">{context.username.charAt(0).toUpperCase()}</div>
        <div className="mt-2 sm:mt-0  ">
          <h1 className="text-center font-semibold text-2xl">
            {context.username}
          </h1>
          <p className=" text-center text-xs">Welcome to DSY consultancy !</p>
        </div>
        <div className="flex mt-2  sm:mt-0  flex-col items-center">
          {router.pathname == "/Profile" ? (
            ""
          ) : (
            <Link
              href={{
                pathname: `/Profile`,
                query: {
                  id: context.userId,
                },
              }}
              className=" text-xs"
            >
              Mange your profile
            </Link>
          )}
          <a href="/" className=" text-xs">
            Track your Admission journey
          </a>
        </div>
      </div>
    );
  };

  if (user) {
    return (
      <>
        <section className="body-font md:mt-20   mt-0 px-5">
          {/* <UserData /> */}
          <div className="container    home  ">
            <aside className={`screenSidebar shadow-md rounded-sm `}>
              <div className="rounded-sm">
                {/* <SideUserData /> */}
                <ul className="mb-2">
                  <li>
                    <Link
                      href={{
                        pathname: `/Profile`,
                        query: {
                          id: user.uid,
                          // cName: props.collegeName.replace(" ", "+"),
                        },
                      }}
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

                  {(context.adminKey == PUBLIC_ADMINKEY ||
                    context.adminKey == PUBLIC_ROOTKEY) && (
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

            <div className="screenLayout mt-20 md:mt-0 ">{children}</div>
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
                  Login Now for Become a User
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
