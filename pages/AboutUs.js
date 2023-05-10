import React from "react";

const links = [
  { name: "Open roles", href: "#" },
  { name: "Internship program", href: "#" },
  { name: "Our values", href: "#" },
  { name: "Meet our leadership", href: "#" },
];
const stats = [
  { name: "Offices worldwide", value: "12" },
  { name: "Full-time colleagues", value: "300+" },
  { name: "Hours per week", value: "40" },
  { name: "Paid time off", value: "Unlimited" },
];

const AboutUs = () => {
  return (
    <div className="bg-white  mt-20 container m-auto p-5">
      <div class="flex flex-col text-center w-full ">
        <h1 class="text-2xl font-medium title-font mb-4 text-gray-900 tracking-widest">
          About Us
        </h1>
      </div>
      <div>
        <p class="w-full px-5 mx-auto leading-relaxed text-base text-justify">
          Welcome to Direct Second Year Engineering Admission Consultancy! Our
          mission is to assist students in securing admission to the engineering
          college of their choice. We understand the challenges that come with
          the admission process and aim to provide personalized guidance and
          support to every student who approaches us.
        </p>
        <br />
        <p class="w-full px-5 mx-auto leading-relaxed text-base text-justify">
          Our team consists of experienced professionals who have extensive
          knowledge about the engineering admission process. We are committed to
          staying up-to-date with the latest trends and changes in the admission
          process, so we can provide the best advice and support to our clients.
        </p>
        <br />
        <p class="w-full px-5 mx-auto leading-relaxed text-base text-justify">
          We understand that every student is unique and has different needs and
          preferences when it comes to selecting an engineering college. That's
          why we take a personalized approach to every client we work with. We
          listen to their needs and provide customized guidance and support to
          help them achieve their goals.
        </p>
        <br />
        <p class="w-full px-5 mx-auto leading-relaxed text-base text-justify">
          If you're looking for expert guidance and support to secure admission
          to the engineering college of your choice, look no further than Direct
          Second Year Engineering Admission Consultancy. Contact us today to
          learn more about our services and how we can help you.
        </p>
      </div>

      <div className="mt-5">
        <section class="text-gray-600 body-font">
          <div class="container   mx-auto">
            <div class="flex flex-col text-center w-full ">
              <h1 class="text-2xl font-medium title-font mb-4 text-gray-900 tracking-widest">
                Developed By
              </h1>
            </div>
            <div class="grid grid-cols-2 md:grid-cols-4">
              <Teams
                img="/img/maleUser.svg"
                name="Gaurav Narnaware"
                />
              <Teams
                img="/img/maleUser.svg"
                name="Om Raut"
                />{" "}
              <Teams
                img="/img/maleUser.svg"
                name="Pranav Ambadkar"
                />
              <Teams
                img="/img/femaleUser.svg"
                name="Sakshi More"
                />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

const Teams = (props) => {
  return (
    <div class="p-4 w-full">
      <div class="flex flex-col justify-center items-center p-5 gap-5 bg-gray-100">
        <img
          alt="team"
          class="flex-shrink-0 rounded-lg w-32 h-32 object-cover object-center sm:mb-0 mb-4"
          src={props.img}
        />
        <div class="flex-grow flex flex-col justify-center items-center ">
          <h2 class="title-font font-medium text-xs sm:text-lg text-gray-900">
            {props.name}
          </h2>
          <h3 class="text-gray-500 text-sm md:text-sm mb-3">{props.role}</h3>
          <span class="inline-flex">
            <a class="text-gray-500">
              <svg
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                class="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
              </svg>
            </a>
            <a class="ml-2 text-gray-500">
              <svg
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                class="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
              </svg>
            </a>
            <a class="ml-2 text-gray-500">
              <svg
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                class="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
              </svg>
            </a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
