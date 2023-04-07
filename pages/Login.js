import Auth from "directsecondyearadmission/Layout/Auth";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import { useContext } from "react";
import collegeContext from "directsecondyearadmission/Context/collegeContext";

const Login = () => {
  const status = useContext(collegeContext);

  const [userDetail, setUserDetail] = useState([]);
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
  const loginUser = async (e) => {
    e.preventDefault();
    const { username, password } = userDetail;
    onSubmit(username, password);
  };

  async function onSubmit(username, password) {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: username,
        password: password,
      }),
    });

    const res2 = await res.json();

    if (res2.msg) {
      localStorage.setItem("userDetail", JSON.stringify(res2.userDetail));
      localStorage.setItem("token", res2.token);
      status.setUsername(res2.userDetail.credentails.fName);
      localStorage.setItem("userName", res2.userDetail.credentails.fName);
      localStorage.setItem("userRole", res2.userDetail.role);
      localStorage.setItem("userId", res2.userDetail._id);
      localStorage.setItem(
        "profileCompletion",
        res2.userDetail.profileCompletion
      );

      status.setToken(res2.token);
      status.setadminKey(res2.userDetail.role);
      status.setProfileCompletion(res2.userDetail.profileCompletion);
      status.setUserId(res2.userDetail._id);
      status.setuserAllData(res2.userDetail);
      status.setLoginStatus(true);
      alert(res2.msg);
      setTimeout(() => {
        router.push("/");
      }, 2000);
    } else {
      alert(res2.error);
    }
  }

  return (
    <Auth>
      <Head>
        <title>DSY consultancy | Login</title>
        <meta
          name="keywords"
          content="Direct Second Year Admission, Consultancy Services, Admission Assistance, Education Counseling, Admission Consultancy, College Admission Guidance, Admission Process, Admission Requirements, Engineering Admissions, After Diploma Admissions, DSY, Direct Second Year Admission Consultancy | DSY, Direct Second Year Admission Consultancy, Direct Second Year Admission, DSY consultancy, DSY consultancy | Login"
        />

        <meta name="title" content="DSY consultancy | Login" />
      </Head>
      <form
        onSubmit={loginUser}
        className="lg:w-2/6 md:w-1/2 bg-white   p-8 flex flex-col md:ml-auto w-full mt-10  md:mt-0"
      >
        <h2 className="text-gray-900 font-bold text-center text-lg title-font mb-5">
          Welcome Back !
        </h2>
        <h2 className="text-gray-900 text-center text-lg font-medium title-font mb-5">
          Sign In
        </h2>
        <div
          className={`text-xs  text-center ${usermsg.styleM} bg-red-50 text-red-900 py-4 font-semibold border border-red-200`}
        >
          {usermsg.msgM}
        </div>
        <div className="relative mb-4 mt-5">
          <label htmlFor="Username" className="leading-7 text-sm text-gray-600">
            Email
          </label>
          <input
            type="email"
            id="Username"
            required={requiredState}
            onChange={onChange}
            value={userDetail.username ? userDetail.username : ""}
            name="username"
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
        <div className="mb-4">
          <Link href="/Forgot" className="text-sm float-right pColor">
            Forgotten Password ?
          </Link>{" "}
        </div>
        <button
          type="submit"
          className=" border-0 py-2 px-8 focus:outline-none pBtn rounded-sm  text-lg"
        >
          Sign In
        </button>
        <p className="text-xs text-center text-gray-500 mt-3">
          <Link href="/Register">
             Create a New Accouunt
          </Link>
        </p>
      </form>
    </Auth>
  );
};

export default Login;
