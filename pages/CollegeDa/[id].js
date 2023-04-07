import HomeLayout from "directsecondyearadmission/Layout/HomeLayout";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/dist/client/router";
import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Head from "next/head";
import Rating from "@mui/material/Rating";
import baseUrl from "directsecondyearadmission/baseUrl";
import { getSingleCollegeData } from "directsecondyearadmission/quieries/CollegeDataQuieries";

const CollegeCard = () => {
  return (
    <>
      <div className="flex flex-col w-full sm:w-80 bg-slate-100 cursor-pointer ">
        <p
          rel="noopener noreferrer"
          aria-label="Te nulla oportere reprimique his dolorum"
        >
          <img
            className="object-cover cursor-pointer w-full h-52 "
            src="https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=1600"
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
          <Link
            target="_blank"
            href={{
              pathname: `/CollegeDa/[id]`,
              query: {
                id: "HeyCollegeswala",
                cName: "COEP",
              },
            }}
            className="flex-1 cursor-pointer py-2 text-lg font-semibold leading-snug"
          >
            Te nulla oportere reprimique his dolorum
          </Link>
          <div className="flex flex-wrap justify-between pt-3 space-x-2 text-xs dark:text-gray-400">
            <span>June 1, 2020</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default function CollegeData({College}) {
  const rouuter = useRouter();
  const [count, setCount] = useState(1);
  const data = "";
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
            Address
          </button>
        </div>
        <div className="mt-5 text-sm">{children}</div>
      </div>
    );
  };

  const CollegeArtical = (props) => {
    return (
      <div className="mt-5">
        {props.Artical == " " && (
          <div className="py-5 font-semibold text-sm text-center">
            Artical Not Found
          </div>
        )}
        <div dangerouslySetInnerHTML={{ __html: props.Artical }} />
        <span className="text-sm m-0  font-semibold  flex  border-t-2 py-5">
          {" "}
          <i className="bi text-slate-400 bi-building-fill-gear mr-2"></i>{" "}
          <span className="mr-2 ">Top Recruiters : </span>
          {topRec.map((item, index) => {
            return (
              <div key={index} className="mr-2 text-xs h-auto px-3 border">
                {item}
              </div>
            );
          })}
        </span>
      </div>
    );
  };
  const CollegeCourses = ({ courses }) => {
    return (
      <div className="mt-5">
        <table className="w-full border  outline-none">
          <thead className="border-none  outline-none">
            <tr className="border-none   outline-none">
              <th className="py-3 border-none bg-blue-50">Sr. No.</th>
              <th className="py-3 border-none bg-blue-50">Choice Code</th>
              <th className="px-10 border-none bg-blue-50 text-left">
                Course Name
              </th>
              <th className="py-3 border-none bg-blue-50">Annual Fees</th>
            </tr>
          </thead>

          <tbody>
            {courses.map((item, index) => {
              return (
                <tr className="border-none " key={index}>
                  <td className="border-none border-slate-500 text-center font-bold">
                    {index + 1}
                  </td>
                  <td className="border-none border-slate-500 text-center">
                    {item.choiceCode}
                  </td>
                  <td className="border-none border-slate-500 px-10">
                    {item.courseName}
                  </td>
                  <td className="border-none border-slate-500 text-center">
                    {item.annalFee}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {courses.length == 0 && (
          <div className="py-5 border font-semibold text-sm text-center">
            No Data Found
          </div>
        )}
      </div>
    );
  };
  const CollegeCategory = ({ category }) => {
    return (
      <div className="mt-5 overflow-x-scroll">
        <table className="w-full border  outline-none">
          <thead className="border-none  outline-none">
            <tr className="border-none   outline-none">
              <th className="py-3 border-none bg-blue-50">Choice Code</th>
              <th className="px-10 border-none bg-blue-50 text-left">
                Course Name
              </th>
              <th className="py-3 border-none bg-blue-50">Category</th>
              <th className="px-3 border-none bg-blue-50 ">Min %</th>
              <th className="py-3 border-none bg-blue-50">Max %</th>
              <th className="py-3 border-none bg-blue-50">Annual Fees</th>
              <th className="py-3 border-none bg-blue-50">Seats</th>
            </tr>
          </thead>
          {category.map((item, index) => {
            return (
              <tbody key={index} className="overflow-x-scroll">
                {item.categories.map((category, indexCast) => {
                  return (
                    <tr className="border-none " key={indexCast}>
                      <td className="border-none text-center border-slate-500 ">
                        {item.choiceCode}
                      </td>
                      <td className="border-none text-left border-slate-500 px-10">
                        {item.courseName}
                      </td>
                      <td className="border-none border-slate-500 text-center">
                        {category.category}
                      </td>
                      <td className="border-none border-slate-500 text-center">
                        {category.min}
                      </td>
                      <td className="border-none border-slate-500 text-center">
                        {category.max}
                      </td>
                      <td className="border-none border-slate-500 text-center">
                        {category.aFees}
                      </td>
                      <td className="border-none border-slate-500 text-center">
                        {category.aSeats}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            );
          })}
        </table>
        {category.length == 0 && (
          <div className="py-5 border font-semibold text-sm text-center">
            No Data Found
          </div>
        )}
      </div>
    );
  };

  const CollegeAddress = (props) => {
    return (
      <div className=" flex gap-5 flex-col sm:flex-row">
        <div className="overflow-scroll grid place-items-center w-full">
          <div className="" dangerouslySetInnerHTML={{ __html: props.maps }} />
        </div>
        <div className="w-full">
          <div className="font-bold  text-lg">
            Address Line :{" "}
            <span className="font-normal text-base">
              {props.locationCollege.addressLine}{" "}
            </span>
          </div>
          <div className="font-bold mt-5 text-lg">
            Taluka :{" "}
            <span className="font-normal text-base">
              {props.locationCollege.taluka}{" "}
            </span>
          </div>
          <div className="font-bold mt-5 text-lg">
            District :{" "}
            <span className="font-normal text-base">
              {props.locationCollege.district}{" "}
            </span>
          </div>
          <div className="font-bold mt-5 text-lg">
            City :{" "}
            <span className="font-normal text-base">
              {props.locationCollege.city}{" "}
            </span>
          </div>
          <div className="font-bold mt-5 text-lg">
            Co-ordinates :{" "}
            <span className="font-normal text-base">
              {props.locationCollege.longitude} ,
              {props.locationCollege.latitude}{" "}
            </span>
          </div>
        </div>
      </div>
    );
  };

  const CollegeImages = ({ images }) => {
    return (
      <div className="">
        {images.length == 0 ? (
          <div className="py-5 border font-semibold text-sm text-center">
            No Images Found
          </div>
        ) : (
          <Box sx={{ height: 1000, overflowY: "scroll" }}>
            <ImageList variant="masonry" cols={4} gap={8}>
              {images.map((item, index) => (
                <ImageListItem key={index}>
                  <img src={`${item}`} loading="lazy" />
                </ImageListItem>
              ))}
            </ImageList>
          </Box>
        )}
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
          <div className="space-y-6 border-b-2 pb-5">
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
                  <div key={index} className="mr-2 text-xs h-auto px-3 border">
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

          <div></div>

          <CInfoData>
            {count == 1 && <CollegeArtical Artical={College.fullDescription} />}
            {count == 2 && <CollegeCourses courses={College.department} />}
            {count == 3 && <CollegeCategory category={College.department} />}
            {count == 4 && <CollegeImages images={College.images} />}
            {count == 5 && (
              <CollegeAddress
                maps={College.iframe}
                locationCollege={College.location}
              />
              
            )}
          </CInfoData>
        </article>
        <div>
          <div className="space-y-2 mt-5">
            <h4 className="text-lg font-semibold">More Colleges</h4>
            <div className="flex  gap-5 flex-wrap ">
              <CollegeCard />
              <CollegeCard />
              <CollegeCard />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.query;
  const posts = await getSingleCollegeData(id);
  return {
    props: { College: posts },
  };
}
