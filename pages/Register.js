import React, { useState } from "react";
import Auth from "directsecondyearadmission/Layout/Auth";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";

const Register = () => {
  const [userDetail, setUserDetail] = useState({});
  const [requiredState, setRequired] = useState(false);
  const router = useRouter();
  const [usermsg, setUserMsg] = useState({
    msgM: "",
    styleM: "hidden",
  });

  const alert = (msg) => {
    setUserMsg({ msgM: msg, styleM: "block" });
    setTimeout(() => {
      setUserMsg({ styleM: "hidden" });
    }, 2000);
  };

  const onChange = (e) => {
    setUserDetail({
      ...userDetail,
      [e.target.name]: e.target.value,
    });
  };
  const registerUser = async (e) => {
    e.preventDefault();
    const { username, fName, email, password, cPassword } = userDetail;
    onSubmit(username, fName, email, password, cPassword);
  };

  async function onSubmit(username, fName, email, password, cPassword) {
    const res = await fetch("/api/signUp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        fName: fName,
        email: email,
        password: password,
        cpassword: cPassword,
      }),
    });

    const res2 = await res.json();
    if (res2.msg) {
      alert(res2.msg);
      setTimeout(() => {
        router.push("/Login");
      }, 2000);
    } else {
      alert(res2.error);
    }
  }

  return (
    <Auth>
      <Head>
        <title>DSY consultancy | Register</title>
        <meta
          name="keywords"
          content="Direct Second Year Admission, Consultancy Services, Admission Assistance, Education Counseling, Admission Consultancy, College Admission Guidance, Admission Process, Admission Requirements, Engineering Admissions, After Diploma Admissions, DSY, Direct Second Year Admission Consultancy | DSY, Direct Second Year Admission Consultancy, Direct Second Year Admission, DSY consultancy, DSY consultancy | Register"
        />

        <meta name="title" content="DSY consultancy | Register" />
      </Head>
      <form
        method="POST"
        onSubmit={registerUser}
        className="lg:w-2/6 md:w-1/2 bg-white   p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0"
      >
        <h2 className="text-gray-900 text-center text-lg font-medium title-font mb-5">
          Sign Up
        </h2>

        <div
          className={`text-xs  text-center ${usermsg.styleM} bg-red-50 text-red-900 py-4 font-semibold border border-red-200`}
        >
          {usermsg.msgM}
        </div>

        <div className="relative mb-4 mt-5">
          <label htmlFor="Username" className="leading-7 text-sm text-gray-600">
            Username
          </label>
          <input
            type="text"
            id="Username"
            required={requiredState}
            onChange={onChange}
            value={userDetail.username ? userDetail.username : ""}
            name="username"
            className="w-full bg-white rounded-sm  border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>

        <div className="relative mb-4">
          <label htmlFor="fullName" className="leading-7 text-sm text-gray-600">
            Full Name
          </label>
          <input
            type="text"
            required={requiredState}
            id="fullName"
            onChange={onChange}
            value={userDetail.fName ? userDetail.fName : ""}
            name="fName"
            className="w-full bg-white rounded-sm  border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>

        <div className="relative mb-4">
          <label htmlFor="email" className="leading-7 text-sm text-gray-600">
            E-mail
          </label>
          <input
            type="email"
            id="email"
            onChange={onChange}
            value={userDetail.email ? userDetail.email : ""}
            name="email"
            required={requiredState}
            className="w-full bg-white rounded-sm  border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
        <div className="relative mb-4">
          <label htmlFor="password" className="leading-7 text-sm text-gray-600">
            Password
          </label>
          <input
            type="password"
            id="password"
            required={requiredState}
            onChange={onChange}
            value={userDetail.password ? userDetail.password : ""}
            name="password"
            className="w-full bg-white rounded-sm  border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>

        <div className="relative mb-4">
          <label
            htmlFor="cpassword"
            className="leading-7 text-sm text-gray-600"
          >
            Conform Password
          </label>
          <input
            type="password"
            required={requiredState}
            id="cpassword"
            onChange={onChange}
            value={userDetail.cPassword ? userDetail.cPassword : ""}
            name="cPassword"
            className="w-full bg-white rounded-sm  border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>

        <div className="relative flex mb-4">
          <label
            htmlFor="term"
            className="leading-7 text-justify text-sm text-gray-600"
          >
            By clicking Sign Up, you agree to our{" "}
            <span className="pColor">
              {" "}
              <a href="/" className="font-semibold">
                Terms
              </a>
              ,
              <a href="/" className="font-semibold">
                {" "}
                Privacy Policy
              </a>
            </span>{" "}
            and
            <span className="pColor">
              <a href="/" className="font-semibold">
                {" "}
                Cookies Policy
              </a>
              .
            </span>
          </label>
        </div>

        <button
          type="submit"
          className=" border-0 py-2 px-8 focus:outline-none pBtn rounded-sm  text-lg"
        >
          Sign Up
        </button>
        <p className="text-xs text-center text-gray-500 mt-3">
          <Link href="/Login">
             Already have an Accouunt ?
          </Link>
        </p>
      </form>
    </Auth>
  );
};

export default Register;
