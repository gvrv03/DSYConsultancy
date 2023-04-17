import Auth from "directsecondyearadmission/Layout/Auth";
import React from "react";
import Link from "next/link";
import { useState } from "react";
import { useUserAuth } from "directsecondyearadmission/Context/UserAuthContext";
import { useRouter } from "next/router";

const SignIn = () => {
  const [userData, setuserData] = useState({});
  const { signUp, user } = useUserAuth();
  const [requiredState, setRequired] = useState(true);
  const [msg, setmsg] = useState("");
  if (msg) {
    setTimeout(() => {
      setmsg("");
    }, 2000);
  }
  const router = useRouter();
  const onChange = (e) => {
    setuserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setmsg("");

    const res = await signUp(
      userData.email,
      userData.password,
      userData.userName,
      userData.gender
    );
    if (res.msg) {
      setmsg(res.msg);
    } else {
      setmsg(res.error);
    }
  };
  return (
    <Auth>
      <div className="w-full bg-white rounded-sm shadow-lg md:mt-0 sm:max-w-md xl:p-0 ">
        <div className="px-5 space-y-4 md:space-y-6 pt-5 ">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 text-center md:text-2xl ">
            Sign Up
          </h1>
          {msg && (
            <div
              className="bg-orange-100 text-sm w-full  mb-10 font-semibold border-l-4 border-orange-500 text-orange-700 px-4 py-2"
              role="alert"
            >
              <p> {msg}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
            <div>
              <label
                htmlFor="Name"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Your Name
              </label>
              <input
                type="text"
                required={requiredState}
                onChange={onChange}
                name="userName"
                className=" text-gray-900 sm:text-sm rounded-sm  outline-none block w-full p-2.5 bg-gray-100 "
                placeholder="Your Name"
              />
            </div>
            <div>
              <label
                htmlFor="gender"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                You are
              </label>
              <div className=" flex gap-5">
                <div className="flex justify-start gap-2 text-xs">
                  <input
                    type="radio"
                    required={requiredState}
                    onChange={onChange}
                    name="gender"
                    value="Male"
                    className=" text-gray-900 sm:text-sm rounded-sm  outline-none block w-full p-2.5 bg-gray-100 "
                    placeholder="Your Name"
                  />
                  <span>Male</span>
                </div>
                <div className="flex justify-start gap-2 text-xs">
                  <input
                    type="radio"
                    required={requiredState}
                    onChange={onChange}
                    name="gender"
                    value="Female"
                    className=" text-gray-900 sm:text-sm rounded-sm  outline-none block w-full p-2.5 bg-gray-100 "
                    placeholder="Your Name"
                  />
                  <span>Female</span>
                </div>
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Your email
              </label>
              <input
                type="email"
                id="email"
                required={requiredState}
                onChange={onChange}
                name="email"
                className=" text-gray-900 sm:text-sm rounded-sm  outline-none block w-full p-2.5 bg-gray-100   "
                placeholder="name@company.com"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Password
              </label>
              <input
                type="password"
                required={requiredState}
                onChange={onChange}
                name="password"
                id="password"
                placeholder="••••••••"
                className=" text-gray-900 sm:text-sm rounded-sm  outline-none block w-full p-2.5 bg-gray-100   "
              />
            </div>

            <p className="text-xs text-justify">
              By clicking Sign Up, you agree to our Terms, Privacy Policy and
              Cookies Policy.
            </p>
            <button
              type="submit"
              className="w-full  text-white pBtn rounded-sm text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 font-semibold"
            >
              Sign Up
            </button>
            <p className="text-sm font-light text-gray-500  ">
              Already Have an Account?{" "}
              <Link
                href="/SignIn"
                className="font-medium text-primary-600 hover:underline dark:text-primary-500"
              >
                Sign In
              </Link>
            </p>
          </form>
        </div>
      </div>
    </Auth>
  );
};

export default SignIn;
