import React from "react";
const PriceCard = ({price}) => {
  return (
    <div data-aos="fade-up" className="mb-4 overflow-hidden rounded-lg w-full shadow-lg">
      <div className="px-6 py-8 bg-white  sm:p-10 sm:pb-6">
        <div className="flex justify-center">
          <span className="inline-flex px-4 py-1 text-sm font-semibold leading-5 tracking-wide uppercase rounded-full ">
            Team Plan
          </span>
        </div>
        <div className="flex justify-center mt-4 text-6xl font-extrabold leading-none ">
          <span className="ml-1 mr-3 text-xl font-medium leading-8 text-gray-500 ">
            from
          </span>
          ₹{price}
          <span className="pt-8 ml-1 text-2xl font-medium leading-8 text-gray-500 ">
            /month
          </span>
        </div>
      </div>
      <div className="px-6 pt-6 pb-8 bg-white  sm:p-10 sm:pt-6">
        <ul>
          <li className="flex items-start mt-4">
            <div className="flex-shrink-0">
              <svg
                className="w-6 h-6 text-green-500"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            </div>
            <p className="ml-3 text-base leading-6 text-gray-700 ">
              $10/month per user
            </p>
          </li>
          <li className="flex items-start mt-4">
            <div className="flex-shrink-0">
              <svg
                className="w-6 h-6 text-green-500"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            </div>
            <p className="ml-3 text-base leading-6 text-gray-700 ">
              Unlimited number of projects
            </p>
          </li>
          <li className="flex items-start mt-4">
            <div className="flex-shrink-0">
              <svg
                className="w-6 h-6 text-green-500"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            </div>
            <p className="ml-3 text-base leading-6 text-gray-700 ">
              Cancel anytime
            </p>
          </li>
        </ul>
        <div className="mt-6 rounded-md shadow">
          <a
            href="#"
            className="flex items-center justify-center px-5 py-3 text-base font-medium leading-6 text-white transition duration-150 ease-in-out bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-500 focus:outline-none focus:shadow-outline"
          >
            Start team plan
          </a>
        </div>
      </div>
    </div>
  );
};

const Pricing = () => {
  return (
    <>
      <section className="p-5 text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <h1
              data-aos="fade-up"
              className="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900"
            >
              Pricing
            </h1>
            <p data-aos="fade-up">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere
              impedit alias fugit natus nesciunt, modi nisi nobis ducimus! Unde,
              magni!
            </p>
            <div data-aos="fade-up" className="flex mt-6 justify-center">
              <div className="w-16 h-1 rounded-full bg-indigo-500 inline-flex"></div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row  gap-5 justify-center -m-4">
            <PriceCard price="1000"/>
            <PriceCard price="2000"/>
            <PriceCard price="3000"/>
          </div>
        </div>
      </section>
    </>
  );
};

export default Pricing;
