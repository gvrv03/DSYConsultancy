import { useRouter } from "next/router";
import React from "react";
import { useUserAuth } from "directsecondyearadmission/Context/UserAuthContext";
const Steps = () => {
  const { user } = useUserAuth();
  const router = useRouter();
  const cardList = [
    {
      icon: "bi-person-check-fill",
      name: "Complete your profile",
      desc: "Complete your profile to receive college recommendations",
    },
    {
      icon: " bi-building-fill",
      name: "Find college",
      desc: "Find college based on your Category, Percentage and Near you",
    },
    {
      icon: "bi-people-fill",
      name: "Get expert help",
      desc: "Get expert help to upload documents, pay the fee, confirm admission, and claim gift",
    },
  ];

  const Card = (props) => {
    return (
      <div
        data-aos="fade-up"
        className="p-4 bg-white  shadow-md md:h-auto h-auto max-w-md flex flex-col text-center items-center"
      >
        <div className="w-20 h-20 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-5 flex-shrink-0">
          <i className={`bi ${props.icon} text-3xl`}></i>
        </div>
        <div className="flex-grow">
          <h2 className="text-gray-900 text-lg title-font font-medium mb-3">
            {props.name}
          </h2>
          <p className="leading-relaxed text-base">{props.desc}</p>
        </div>
      </div>
    );
  };

  return (
    <section className="text-gray-600  body-font">
      <div className="container px-5 mx-auto">
        <div className="text-center mb-20">
          <h1
            data-aos="fade-up"
            className="sm:text-3xl text-2xl font-medium title-font text-gray-900 mb-4"
          >
            Process
          </h1>
          <p
            data-aos="fade-up"
            className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto text-gray-500s"
          >
            End-to-end Finding College & Admission Process Simplified
          </p>
          <div className="flex mt-6 justify-center">
            <div className="w-16 h-1 rounded-full bg-indigo-500 inline-flex"></div>
          </div>
        </div>
        <div className="flex items-center gap-5 flex-col md:flex-row justify-between">
          <div>
            <div className=" flex flex-col gap-5">
              {cardList.map((item, index) => {
                return (
                  <Card
                    icon={item.icon}
                    name={item.name}
                    desc={item.desc}
                    key={index}
                  />
                );
              })}
            </div>
          </div>
          <div>
            <img src="/img/steps.svg" alt="" srcSet="" />
          </div>
        </div>

        {user && (
          <button
            data-aos="fade-up"
            onClick={function () {
              router.push("/Home");
            }}
            className="flex mx-auto mt-16 px-10 py-2  rounded-sm pBtn text-lg"
          >
            Get Started
          </button>
        )}
      </div>
    </section>
  );
};

export default Steps;
