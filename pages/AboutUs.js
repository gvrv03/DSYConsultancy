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
      <h1 className="text-3xl font-bold text-center my-5 ">About Us</h1>
      <p className="text-lg mb-4 text-justify">
        Welcome to Direct Second Year Engineering Admission Consultancy! Our
        mission is to assist students in securing admission to the engineering
        college of their choice. We understand the challenges that come with the
        admission process and aim to provide personalized guidance and support
        to every student who approaches us.
      </p>
      <p className="text-lg mb-4 text-justify">
        Our team consists of experienced professionals who have extensive
        knowledge about the engineering admission process. We are committed to
        staying up-to-date with the latest trends and changes in the admission
        process, so we can provide the best advice and support to our clients.
      </p>
      <p className="text-lg mb-4 text-justify">
        We understand that every student is unique and has different needs and
        preferences when it comes to selecting an engineering college. That's
        why we take a personalized approach to every client we work with. We
        listen to their needs and provide customized guidance and support to
        help them achieve their goals.
      </p>
      <p className="text-justify text-lg">
        If you're looking for expert guidance and support to secure admission to
        the engineering college of your choice, look no further than Direct
        Second Year Engineering Admission Consultancy. Contact us today to learn
        more about our services and how we can help you.
      </p>
    </div>
  );
};

export default AboutUs;
