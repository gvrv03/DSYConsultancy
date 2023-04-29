import React, { useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import Rating from "@mui/material/Rating";
import baseUrl from "directsecondyearadmission/baseUrl";
import { getSingleCollegeData } from "directsecondyearadmission/quieries/CollegeDataQuieries";
import CollegeArtical from "./CollegeArtical";
import CollegeCourses from "./CollegeCourses";
import CollegeCategory from "./CollegeCategory";
import CollegeAddress from "./CollegeAddress";
import CollegeImages from "./CollegeImages";
import { useCollegesContext } from "directsecondyearadmission/Context/CollegesContext";

export default function CollegeData({ College, Departments, category }) {
  const rouuter = useRouter();
  const [count, setCount] = useState(1);
  var approvedBy = College.approvedBy.split(",");
  var topRec = College.topRecruiters.split(",");
  const collegeUrl = baseUrl + "/CollegeDa/" + rouuter.query.id;

  const CInfoData = ({ children }) => {
    return (
      <div className="bg-white  mt-5 rounded-sm">
        <div className="flex gap-5 sm:overflow-hidden overflow-x-scroll p-3  border rounded-sm ">
          <button
            onClick={function () {
              setCount(1);
            }}
            className={
              count == 1
                ? "bg-sky-500 text-white px-5  mr-5 font-semibold rounded-3xl  p-2"
                : " font-semibold mr-5"
            }
            type="button"
          >
            {" "}
            Overview
          </button>

          <button
            onClick={function () {
              setCount(2);
            }}
            className={
              count == 2
                ? "bg-sky-500 text-white px-5  mr-5 font-semibold rounded-3xl  p-2"
                : " font-semibold mr-5"
            }
            type="button"
          >
            {" "}
            Courses
          </button>
          <button
            onClick={function () {
              setCount(3);
            }}
            className={
              count == 3
                ? "bg-sky-500 text-white px-5  mr-5 font-semibold rounded-3xl  p-2"
                : " font-semibold mr-5"
            }
            type="button"
          >
            {" "}
            CutOffs
          </button>
          <button
            onClick={function () {
              setCount(4);
            }}
            className={
              count == 4
                ? "bg-sky-500 text-white px-5  mr-5 font-semibold rounded-3xl  p-2"
                : " font-semibold mr-5"
            }
            type="button"
          >
            {" "}
            Gallery
          </button>
          <button
            onClick={function () {
              setCount(5);
            }}
            className={
              count == 5
                ? "bg-sky-500 text-white px-5  mr-5 font-semibold rounded-3xl  p-2"
                : " font-semibold mr-5"
            }
            type="button"
          >
            {" "}
            Contacts
          </button>
        </div>
        <div className="mt-5 text-sm">{children}</div>
      </div>
    );
  };

  return (
    <>
      <Head>
        <title>{College.name}</title>
        <meta name="keywords" content={College.name} />
        <meta name="title" content={College.name} />
        <meta name="description" content={College.name + College.university} />
        <meta name="author" content={College.addedBy} />
        {/* <!-- Open Graph / Facebook --> */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={collegeUrl} />
        <meta property="og:title" content={College.name} />
        <meta
          property="og:description"
          content={College.name + College.university}
        />
        <meta property="og:image" content="/img/hero.png" />

        {/* <!-- Twitter --> */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={collegeUrl} />
        <meta property="twitter:title" content={College.name} />
        <meta
          property="twitter:description"
          content={College.name + College.university}
        />
        <meta property="twitter:image" content="/img/hero.png" />
      </Head>

      <div className="container bg-white rounded-sm mt-14  sm:mt-20 p-5 mx-auto space-y-12">
        <article className=" ">
          <div className=" flex border-b-2 justify-between items-center">
            <div className="space-y-6  w-full  pb-5">
              <h1 className="text-2xl font-bold sm:text-3xl md:tracking-tight ">
                {College.name} ({College.instituteCode})
              </h1>
              <p className="text-sm font-bold ">
                University :{" "}
                <span className="font-normal text-sm">
                  {" "}
                  {College.university}{" "}
                </span>
              </p>

              <div className="grid sm:flex grid-cols-2  gap-5  ">
                <div>
                  <Rating
                    name="half-rating-read"
                    defaultValue={College.rating}
                    size="small"
                    readOnly
                  />
                </div>
                <span className="text-sm  m-0  font-semibold">
                  <i className="bi text-slate-400 mr-2 bi-pin-map-fill"></i>
                  Location :{" "}
                  <span className="font-normal"> {College.location.city}</span>
                </span>
                <span className="text-sm  m-0  font-semibold">
                  <i className="bi text-slate-400 mr-2   bi-flag-fill"></i>
                  <span className="font-normal"> {College.collegeUnder}</span>
                </span>
                <span className="text-sm  m-0  font-semibold">
                  <i className="bi text-slate-400 mr-2   bi-send-fill"></i>
                  <span className="font-normal"> {College.collegeType}</span>
                </span>
              </div>
              <span className="text-sm m-0  font-semibold  flex ">
                {" "}
                <i className="bi text-slate-400 bi-award-fill mr-2"></i>{" "}
                <span className="mr-2 ">Approved By : </span>
                {approvedBy.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="mr-2 text-xs h-auto px-3 border"
                    >
                      {item}
                    </div>
                  );
                })}
              </span>

              <div className="mt-5 flex justify-between items-center text-sm font-semibold">
                <span>
                  <i className="bi text-slate-400 mr-2   bi-pen-fill"></i>
                  Written By :{" "}
                  <span className=" font-normal">{College.addedBy}</span>{" "}
                </span>

                <span>
                  <i className="bi text-slate-400 mr-2   bi-eye-fill"></i>
                  <span className=" font-normal"> {College.views}</span>{" "}
                </span>
              </div>
            </div>

            <div className="hidden md:grid  mr-20 place-items-center">
              <img src={College.image} alt="" />
            </div>
          </div>
          <div></div>

          <CInfoData>
            {count == 1 && (
              <CollegeArtical
                topRec={topRec}
                Artical={College.fullDescription}
              />
            )}
            {count == 2 && <CollegeCourses courses={Departments} />}
            {count == 3 && (
              <CollegeCategory category={category} name={College.name} />
            )}
            {count == 4 && <CollegeImages images={College.images} />}
            {count == 5 && (
              <CollegeAddress
                contacts={College.contacts}
                maps={College.iframe}
                locationCollege={College.location}
              />
            )}
          </CInfoData>
        </article>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  try {
    const { id } = context.query;
    const posts = await getSingleCollegeData(id);
    return {
      props: {
        College: posts.clgDetail,
        Departments: posts.department,
        category: posts.category,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    
    };
  }
}
