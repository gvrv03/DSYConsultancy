import React, { useEffect, useState } from "react";
import Link from "next/link";
import UserDropdown from "./UserDropdown";
import baseUrl from "../../baseUrl";
import TopNav from "directsecondyearadmission/navItem/TopNav";
import HomeNav from "directsecondyearadmission/navItem/HomeNav";
import { useContext } from "react";
import collegeContext from "directsecondyearadmission/Context/collegeContext";
import { LoginStatus } from "directsecondyearadmission/Layout/CollegeLayout";
import { useRouter } from "next/router";
const Nav = () => {
  const status = useContext(collegeContext);
  // console.log(userData);
  // console.log(status.userAllData.credentails);
  const [nav, setnav] = useState("hidden");
  const router = useRouter
  const [overlay, setOverlay] = useState("");
  const user = status.loginStatus;
  const userD = status.userAllData.credentails;

  const closeNav = () => {
    if (nav == "block") {
    }
  };

  const ListItem = (props) => {
    return (
      <li  className = {` ${
        router.pathname == props.location && "text-blue-600"
      } block   py-2  pl-3 pr-4 text-sm rounded-sm  md:p-0`}>
        <Link href={props.location} onClick={closeNav} aria-current="page">

          <i
            className={`${props.icon} p-1 px-2  rounded-sm text-slate-800 bi text-sm  mr-1`}
          ></i>
          {props.name}

        </Link>
      </li>
    );
  };

  const [userOpen, setUserOpen] = useState("hidden");
  const toggleUser = () => {
    if (userOpen == "hidden") {
      setUserOpen("block");
    } else {
      setUserOpen("hidden");
    }
  };
  const SearchDropdown = () => {
    return (
      <>
        <section className="relative">
          <div
            onClick={toggleUser}
            type="button"
            className="h-8 mr-0 w-8 rounded-full flex items-center justify-center font-semibold  sm:h-10 sm:w-10 cursor-pointer "
            // src="/img/logo.svg"
            alt="User dropdown"
          >
            <i className="bi font-bold text-xl bi-search"></i>
          </div>
        </section>
      </>
    );
  };

  return <>
    <nav className="bg-white  sm:px-4 py-2.5 0 fixed w-full z-20 top-0 left-0 border-b border-gray-200 ">
      <div className="container  flex px-5 flex-wrap items-center justify-between mx-auto">
        <Link href="/" className="">

          <img
            src="/img/DSY.svg"
            className="md:h- h-10 mr-3 sm:h-9"
            alt="Flowbite Logo"
          />
          <span className="self-center text-xl font-semibold whitespace-nowrap pColor">
            {/* DSY */}
          </span>

        </Link>
        <div className="flex items-center md:order-2">
          {!user && (
            <Link href="/Login" legacyBehavior>
              <button
                type="button"
                className="text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-sm text-sm px-5 py-2.5 text-center mr-3  pBtn dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Get started
              </button>
            </Link>
          )}
          {user && <UserDropdown />}
          <SearchDropdown />
          <button
            onClick={function () {
              setnav("block");
            }}
            type="button"
            className="inline-flex items-center p-2  text-sm md:hidden colorBlack"
            aria-controls="navbar-sticky"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>

        <div
          className={`items-center justify-between navUI hidden ${overlay} w-full md:flex md:w-auto md:order-1`}
          id="navbar-sticky"
        >
          <ul
            className={`md:flex flex-col  hidden  bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white  `}
          >
            {TopNav.map((item, index) => {
              return (
                <ListItem
                  key={index}
                  location={item.location}
                  name={item.name}
                  icon={item.icon}
                />
              );
            })}
          </ul>
        </div>
      </div>
    </nav>

    {/* Scroll Dropdown */}
    <div
      className={`fixed bg-black bg-opacity-40  filter   ${userOpen} px-2    h-screen mt-0   z-10  py-5 w-full transition-all  rounded-sm shadow-lg focus:outline-none`}
    >
      <form
        className=" container relative flex justify-between items-center gap-5 bg-white px-5 py-3 m-auto shadow-sm"
        role="none"
      >
        <input
          type="search"
          placeholder="Search College..."
          className=" outline-none w-full  rounded-sm   text-sm bg-white rounded-r-none"
        />

        <i className="bi font-bold text-xl bi-search cursor-pointer "></i>
      </form>
    </div>

    <div
      className={`fixed w-full h-full overflow top-0 z-20  md:hidden ${nav}`}
    >
      <div
        className="absolute w-full h-full top-0 z-20 lightBlack  cursor-pointer"
        onClick={function () {
          setnav("hidden");
        }}
      />
      <div className="absolute overflow-y-scroll w-4/5 h-full top-0 z-20  bg-white">
        {user ? (
          <div className=" flex  flex-col justify-between items-start  bgColor w-full top-0 p-5">
            <div className="w-24 grid place-items-center h-24 rounded-full overflow-hidden mb-5 border-white border-4 ">
              <span className="font-extrabold  grid place-items-center  text-black bg-white w-full h-full text-5xl">
                {status.username.charAt(0)}
              </span>
            </div>
            <h1 className="text-white  font-bold text-xl">
              Welcome to DSY Consultancy
            </h1>
            <h1 className="text-white my-4  font-semibold text-lg">
              {userD.fName}
            </h1>
            <Link
              href={{
                pathname: `/Profile`,
                query: {
                  id: status.userId,
                },
              }}
              className=" text-slate-400 text-sm">
              Manage Your Profile 
            </Link>
          </div>
        ) : (
          <div className="mx-5 py-5 font-bold text-2xl pColor border-b">
            {/* DSY */}
            <img src="/img/DSY.svg" alt="" className="w-24" />
          </div>
        )}
        <div className="p-5">
          {TopNav.map((item, index) => {
            return (
              <div className="flex  items-center mb-2" key={index}>
                <i
                  className={`${item.icon} p-1 px-2 bg-blue-50 rounded-sm text-slate-800 bi text-sm  mr-5`}
                ></i>
                <Link href={item.location} legacyBehavior>
                  <button
                    onClick={function () {
                      setnav("hidden");
                    }}
                    className=" w-full text-xs font-light text-left "
                  >
                    {item.name}
                  </button>
                </Link>
              </div>
            );
          })}
          {!user && (
            <div className="rounded-sm  mt-5    mb-2">
              <LoginStatus />
            </div>
          )}
        </div>
        {user == true && (
          <>
            <div className="border mx-5" />
            <div className="p-5">
              <div className="flex  items-center  mb-2">
                <i
                  className={`bi-person-fill p-1 px-2 bg-blue-50 rounded-sm  text-sm text-slate-800 bi mr-5`}
                ></i>
                <Link
                  href={{
                    pathname: `/Profile`,
                    query: {
                      id: status.userId,
                    },
                  }}
                  legacyBehavior>
                  <button
                    onClick={function () {
                      setnav("hidden");
                    }}
                    className=" w-full  text-xs font-light text-left "
                  >
                    Profile
                  </button>
                </Link>
              </div>
              {HomeNav.map((item, index) => {
                return (
                  <div className="flex  items-center  mb-2" key={index}>
                    <i
                      className={`${item.icon} p-1 px-2 bg-blue-50 rounded-sm   text-sm text-slate-800 bi mr-5`}
                    ></i>
                    <Link href={item.location} legacyBehavior>
                      <button
                        onClick={function () {
                          setnav("hidden");
                        }}
                        className=" w-full  text-xs font-light text-left "
                      >
                        {item.name}
                      </button>
                    </Link>
                  </div>
                );
              })}

              {status.userAllData.role == status.adminKey && (
                <div className="flex  items-center  mb-2">
                  <i
                    className={`bi-bar-chart-line-fill p-1 px-2 bg-blue-50 rounded-sm   text-sm text-slate-800 bi mr-5`}
                  ></i>
                  <Link href="/Admin/AllContact" legacyBehavior>
                    <button
                      onClick={function () {
                        setnav("hidden");
                      }}
                      className=" w-full  text-xs font-light text-left "
                    >
                      Dashboard
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  </>;
};

export default Nav;
