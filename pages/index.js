import Pricing from "directsecondyearadmission/Components/Pricing";
import Link from "next/link";
import Steps from "directsecondyearadmission/Components/Steps";
import Typewriter from "typewriter-effect";
import Background from "../public/img/heroBG.svg";
import { useContext, useState, useEffect } from "react";
import Head from "next/head";
import collegeContext from "directsecondyearadmission/Context/collegeContext";
import { useRouter } from "next/router";
import Loading from "directsecondyearadmission/Components/Loading";
import { useUserAuth } from "directsecondyearadmission/Context/UserAuthContext";
import NewsLetter from "directsecondyearadmission/Components/NewsLetter";
import MarquHome from "directsecondyearadmission/Components/MarquHome";
import { useCollegesContext } from "directsecondyearadmission/Context/CollegesContext";
import SectionTitle from "directsecondyearadmission/Components/sectionTitle";
import Benefits from "directsecondyearadmission/Components/benefits";
import {
  benefitOne,
  benefitTwo,
} from "directsecondyearadmission/Components/data";
const CollegeCard = () => {
  const { allColleges } = useCollegesContext();
  const Card = (props) => {
    const { image, collegeType, collegeUnder, name, contacts } = props;

    return (
      <div className="flex  shadow-md flex-col hover:bg-blue-900 hover:text-white bg-white  flex-1 p-6">
        <div className="bg-sky-50 mb-5 grid place-items-center p-5 ">
          <img className="w-32 h-32 rounded-full" src={image} alt="" />
        </div>
        <div>
          <p
            rel="noopener noreferrer"
            aria-label="Te nulla oportere reprimique his dolorum"
          ></p>
          <a
            rel="noopener noreferrer"
            className="text-xs tracking-wider uppercase hover:underline "
          >
            {collegeType}, {collegeUnder}
          </a>
          <h3 className="flex-1 cursor-pointer py-2 text-lg font-semibold leading-snug">
            {name}
          </h3>
          <div className="flex flex-wrap justify-between pt-3 space-x-2 text-xs ">
            <span>{contacts.website}</span>
          </div>
        </div>
      </div>
    );
  };
  return (
    <>
      <Link href="/" legacyBehavior>
        <article className="flex w-96 p-4 flex-row gap-5 cursor-pointer ">
          {allColleges &&
            allColleges.map((item, index) => {
              const { image, collegeType, collegeUnder, name, contacts } = item;
              return (
                <Card
                  key={index}
                  image={image}
                  collegeType={collegeType}
                  collegeUnder={collegeUnder}
                  name={name}
                  contacts={contacts}
                />
              );
            })}
        </article>
      </Link>
    </>
  );
};

const AppDown = () => {
  return (
    <section className=" w-full md:block hidden text-gray-600 body-font">
      <div className="container  pt-24 mx-auto flex items-center md:flex-row flex-col">
        <div className="flex flex-col md:pr-10 md:mb-0 mb-6 pr-0 w-full md:w-auto md:text-left text-center">
          <h2 className="text-xs text-indigo-500 tracking-widest font-medium title-font mb-1">
            Download our Application
          </h2>
          <h1 className="md:text-3xl text-2xl font-medium title-font text-gray-900">
            DSY Consultancy
          </h1>
        </div>
        <div className="flex md:ml-auto md:mr-0 mx-auto items-center flex-shrink-0 space-x-4">
          <button className="bg-white inline-flex py-3 px-5 rounded-sm items-center hover:bg-gray-200 focus:outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="w-6 h-6"
              viewBox="0 0 512 512"
            >
              <path d="M99.617 8.057a50.191 50.191 0 00-38.815-6.713l230.932 230.933 74.846-74.846L99.617 8.057zM32.139 20.116c-6.441 8.563-10.148 19.077-10.148 30.199v411.358c0 11.123 3.708 21.636 10.148 30.199l235.877-235.877L32.139 20.116zM464.261 212.087l-67.266-37.637-81.544 81.544 81.548 81.548 67.273-37.64c16.117-9.03 25.738-25.442 25.738-43.908s-9.621-34.877-25.749-43.907zM291.733 279.711L60.815 510.629c3.786.891 7.639 1.371 11.492 1.371a50.275 50.275 0 0027.31-8.07l266.965-149.372-74.849-74.847z"></path>
            </svg>
            <span className="ml-4 flex items-start flex-col leading-none">
              <span className="text-xs text-gray-600 mb-1">GET IT ON</span>
              <span className="title-font font-medium">Google Play</span>
            </span>
          </button>
          <button className="bg-white inline-flex py-3 px-5 rounded-sm items-center hover:bg-gray-200 focus:outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="w-6 h-6"
              viewBox="0 0 305 305"
            >
              <path d="M40.74 112.12c-25.79 44.74-9.4 112.65 19.12 153.82C74.09 286.52 88.5 305 108.24 305c.37 0 .74 0 1.13-.02 9.27-.37 15.97-3.23 22.45-5.99 7.27-3.1 14.8-6.3 26.6-6.3 11.22 0 18.39 3.1 25.31 6.1 6.83 2.95 13.87 6 24.26 5.81 22.23-.41 35.88-20.35 47.92-37.94a168.18 168.18 0 0021-43l.09-.28a2.5 2.5 0 00-1.33-3.06l-.18-.08c-3.92-1.6-38.26-16.84-38.62-58.36-.34-33.74 25.76-51.6 31-54.84l.24-.15a2.5 2.5 0 00.7-3.51c-18-26.37-45.62-30.34-56.73-30.82a50.04 50.04 0 00-4.95-.24c-13.06 0-25.56 4.93-35.61 8.9-6.94 2.73-12.93 5.09-17.06 5.09-4.64 0-10.67-2.4-17.65-5.16-9.33-3.7-19.9-7.9-31.1-7.9l-.79.01c-26.03.38-50.62 15.27-64.18 38.86z"></path>
              <path d="M212.1 0c-15.76.64-34.67 10.35-45.97 23.58-9.6 11.13-19 29.68-16.52 48.38a2.5 2.5 0 002.29 2.17c1.06.08 2.15.12 3.23.12 15.41 0 32.04-8.52 43.4-22.25 11.94-14.5 17.99-33.1 16.16-49.77A2.52 2.52 0 00212.1 0z"></path>
            </svg>
            <span className="ml-4 flex items-start flex-col leading-none">
              <span className="text-xs text-gray-600 mb-1">
                Download on the
              </span>
              <span className="title-font font-medium">App Store</span>
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

const Home = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setTimeout(() => setLoading(true), 1000);
  }, []);
  const listUser = [
    {
      name: "Users",
      number: "1000",
      icon: "bi-person-fill",
    },
    {
      name: "Admission",
      number: "20",
      icon: "bi-person-fill-check",
    },
    {
      name: "Registrations",
      number: "500",
      icon: "bi-ui-checks",
    },
  ];
  const { user } = useUserAuth();

  const HomeAds = () => {
    return (
      <>
        <div className="container m-auto px-5">
          <div className="ads ">Space for Advertisement</div>
        </div>
      </>
    );
  };

  return (
    <>
      {!loading ? (
        <Loading />
      ) : (
        <>
          <Head>
            <title>Direct Second Year Admission Consultancy | DSY</title>
            <meta
              name="keywords"
              content="Direct Second Year Admission,Direct Second year Engineering Admission, Consultancy Services, Admission Assistance, Education Counseling, Admission Consultancy, College Admission Guidance, Admission Process, Admission Requirements, Engineering Admissions, After Diploma Admissions, DSY, Direct Second Year Admission Consultancy | DSY, Direct Second Year Admission Consultancy, Direct Second Year Admission, DSY consultancy, DSY consultancy | Home"
            />

            <meta
              name="title"
              content="DSY consultancy | Direct Second Year Admission Consultancy"
            />
          </Head>
          <MarquHome />

          <section className=" bg-white  h-screen py-10  md:-mt-28 text-black    ">
            <div
              data-aos="fade-up"
              data-aos-delay="100"
              className="container mx-auto flex px-5  md:justify-between justify-start h-full  pt-0 md:flex-row flex-col items-center"
            >
              <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left  md:mb-0 items-center text-center">
                <h1 className="title-font text-left font-normal sm:text-4xl text-3xl   ">
                  <span className="font-bold"> Direct Second Year</span>{" "}
                  Admission&nbsp;
                  <br className="hidden lg:inline-block" />
                  Consultancy
                </h1>
                <p className="   opacity-70 text-justify leading-relaxed mt-5">
                  Get help from our Direct Second Year Admission Consultancy to
                  secure admission to second year engineering courses in
                  Maharashtra. Contact us today to start your journey towards a
                  successful engineering career.
                </p>

                <div className="py-5 flex text-left w-full sm:text-left font-bold text-xl ">
                  We help&nbsp;
                  <span className="pColor ntext-left">
                    <Typewriter
                      options={{
                        strings: ["to find Best College", "to get Admission"],
                        autoStart: true,
                        loop: true,
                      }}
                    />
                  </span>
                </div>

                <div className="flex w-full  justify-start ">
                  <Link href="/College" legacyBehavior>
                    <button className="inline-flex font-semibold pBtn border-0 py-2  px-6 focus:outline-none  rounded-sm text-lg">
                      Find College
                    </button>
                  </Link>
                  {!user && (
                    <Link href="/SignIn" legacyBehavior>
                      <button className="ml-4 font-semibold inline-flex pColor border py-2 px-6 focus:outline-none hover:bg-gray-200 rounded-sm text-lg">
                        Sign In
                      </button>
                    </Link>
                  )}
                </div>
                {/* <AppDown /> */}
              </div>

              <div className="mt-10 md:mt-0">
                <img
                  className="object-cover object-center w-full rounded-sm"
                  alt="hero"
                  src="/hero.svg"
                />
              </div>
            </div>
          </section>

          <div className="w-full bg-blue-900 text-white flex">
            <div className="rounded-lg container  m-auto w-full grid grid-flow-row sm:grid-flow-row grid-cols-1 sm:grid-cols-3 py-9 divide-y-2 sm:divide-y-0 sm:divide-x-2 divide-gray-100 bg-white-500 z-10">
              {listUser.map((listUsers, index) => (
                <div
                  data-aos="fade-up"
                  // data-aos-delay={300}
                  className="flex items-center justify-start sm:justify-center py-4 sm:py-6 w-8/12 px-4 sm:w-auto mx-auto sm:mx-0"
                  key={index}
                >
                  <div className="flex mx-auto w-40 sm:w-auto">
                    <div className="flex items-center justify-center bg-slate-100 w-12 h-12 mr-6 rounded-full">
                      <i className={`bi ${listUsers.icon} text-black `}></i>
                    </div>
                    <div className="flex flex-col">
                      <p className="text-xl text-black-600 font-bold">
                        {listUsers.number}+
                      </p>
                      <p className="text-lg text-black-500">{listUsers.name}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="absolute bg-black-600 opacity-5 w-11/12 roudned-lg h-64 sm:h-48 top-0 mt-8 mx-auto left-0 right-0"></div>
          </div>

          <SectionTitle pretitle="Top Institutes" title="Our Top Colleges ?" />
          <section data-aos="fade-up" className="text-gray-600 body-font">
            <div className="container px-5 py-5 mx-auto">
              <div className="text-center mb-20">
                <marquee width="100%" direction="left" scrollamount="12">
                  <CollegeCard />
                </marquee>
              </div>
            </div>
          </section>

          <SectionTitle pretitle="DSY" title=" Why to choose DSY?" />

          <Benefits data={benefitOne} />
          <SectionTitle pretitle="Steps" title="Gateway to  go through DSY" />

          <Benefits imgPos="right" data={benefitTwo} />
          <SectionTitle
            pretitle="Pricing"
            title="Enable subscription for upgrading Services"
          />

          <Pricing />
          {/* <Teams /> */}

          <NewsLetter />
        </>
      )}
    </>
  );
};

export default Home;
