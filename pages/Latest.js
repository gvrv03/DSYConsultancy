import LatestNews from "directsecondyearadmission/Layout/LatestNews";
import React, { useState } from "react";
import Link from "next/link";
import Head from "next/head";

const BreadCrumb = () => {
  const [userOpen, setUserOpen] = useState("hidden");
  const toggleUser = () => {
    if (userOpen == "hidden") {
      setUserOpen("block");
    } else {
      setUserOpen("hidden");
    }
  };

  const items = [
    {
      Name: "Category",
      Location: "/",
    },
    {
      Name: "Course",
      Location: "/",
    },
    {
      Name: "Rating",
      Location: "/",
    },
    {
      Name: "Rating",
      Location: "/",
    },
  ];

  const NavItem = (props) => {
    return (
      (<Link
        href={props.location}
        className="text-gray-700 navItem block px-4 py-2 text-sm"
        role="menuitem"
        tabIndex="-1"
        id="menu-item-0">

        {props.name}

      </Link>)
    );
  };

  return (
    <nav
      aria-label="breadcrumb"
      className="w-full  flex justify-between items-center  p-4 bg-white"
    >
      <ol className="flex h-8 space-x-2">
        <li className="flex items-center">
          <Link
            href="/"
            rel="noopener noreferrer"
            title="Back to homepage"
            className="hover:underline">

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
            Latest News
          </a>
        </li>
      </ol>

      <div className="cursor-pointer relative">
        <i className="bi bi-funnel-fill mr-4" onClick={toggleUser}></i>
        <span onClick={toggleUser} className="text-slate-400">
          Filter
        </span>

        <div
          className={`absolute ${userOpen} right-0 z-10 mt-2 w-56 origin-top-right rounded-sm bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex="-1"
        >
          <div className="py-1" role="none">
            {items.map((item, index) => {
              return (
                <NavItem
                  location={item.Location}
                  name={item.Name}
                  key={index}
                />
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

const Latest = () => {
  const NewsBlog = () => {
    return (
      <Link href="/" legacyBehavior>
        <article className="flex flex-col bg-white cursor-pointer ">
          <p
            rel="noopener noreferrer"
            aria-label="Te nulla oportere reprimique his dolorum"
          >
            <img
              className="object-cover cursor-pointer w-full h-52 "
              src="https://source.unsplash.com/200x200/?fashion?1"
            />
          </p>
          <div className="flex flex-col flex-1 p-6">
            <p
              rel="noopener noreferrer"
              aria-label="Te nulla oportere reprimique his dolorum"
            ></p>
            <a
              rel="noopener noreferrer"
              className="text-xs tracking-wider uppercase hover:underline dark:text-violet-400"
            >
              Convenire
            </a>
            <h3 className="flex-1 cursor-pointer py-2 text-lg font-semibold leading-snug">
              Te nulla oportere reprimique his dolorum
            </h3>
            <div className="flex flex-wrap justify-between pt-3 space-x-2 text-xs dark:text-gray-400">
              <span>June 1, 2020</span>
            </div>
          </div>
        </article>
      </Link>
    );
  };

  return (
    <section className="mt-20 px-5">
      <Head>
        <title>DSY consultancy | Latest Updates</title>
        <meta
          name="keywords"
          content="Direct Second Year Admission, Consultancy Services, Admission Assistance, Education Counseling, Admission Consultancy, College Admission Guidance, Admission Process, Admission Requirements, Engineering Admissions, After Diploma Admissions, DSY, Direct Second Year Admission Consultancy | DSY, Direct Second Year Admission Consultancy, Direct Second Year Admission, DSY consultancy, DSY consultancy | Latest Updates"
        />

        <meta name="title" content="DSY consultancy | Latest Updates" />
      </Head>
      <div className="container  mx-auto space-y-8">
        <BreadCrumb />
        <div className="grid overflow-y-scroll h-screen grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-4">
          <NewsBlog />
          <NewsBlog />
          <NewsBlog />
          <NewsBlog />
          <NewsBlog />
          <NewsBlog />
          <NewsBlog />
          <NewsBlog />
          <NewsBlog />
          <NewsBlog />
          <NewsBlog />
          <NewsBlog />
          <NewsBlog />
          <NewsBlog />
          <NewsBlog />
        </div>
      </div>
    </section>
  );
};

export default Latest;
