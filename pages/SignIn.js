import Auth from "directsecondyearadmission/Layout/Auth";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useUserAuth } from "directsecondyearadmission/Context/UserAuthContext";

const SignIn = () => {
  const [userData, setuserData] = useState({});
  const [requiredState, setRequired] = useState(false);
  const { signIn, user } = useUserAuth();
  const [msg, setmsg] = useState("");
  const router = useRouter();
  if (msg) {
    setTimeout(() => {
      setmsg("");
    }, 2000);
  }
  if (user) {
    router.push("/");
  }
  const onChange = (e) => {
    setuserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setmsg("");
    try {
      await signIn(userData.email, userData.password);
    } catch (error) {
      setmsg(error.code.slice(5, error.code.length));
    }
  };
  console.log(userData);
  return (
    <Auth>
      <div className="w-full bg-white rounded-sm shadow-lg md:mt-0 sm:max-w-md xl:p-0 ">
        <div className="px-5 space-y-4 md:space-y-6 pt-5 ">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 text-center md:text-2xl ">
            Sign In
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
              <div className="block mb-2 text-sm font-medium text-gray-900 ">
                Your email
              </div>
              <input
                type="email"
                required={requiredState}
                onChange={onChange}
                id="email"
                // value={setuserData.email ? setuserData.email : ""}
                name="email"
                className=" text-gray-900 sm:text-sm rounded-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  outline-none bg-gray-100 "
                placeholder="name@company.com"
              />
            </div>
            <div>
              <div className="block mb-2 text-sm font-medium text-gray-900 ">
                Password
              </div>
              <input
                type="password"
                required={requiredState}
                onChange={onChange}
                id="password"
                // value={setuserData.password ? setuserData.password : ""}
                name="password"
                placeholder="••••••••"
                className=" text-gray-900 sm:text-sm rounded-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  outline-none bg-gray-100 "
              />
            </div>
            <div className="flex items-center justify-between">
              <Link
                href="/Forgot"
                className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
              >
                Forgot password?
              </Link>
            </div>
            <button
              type="submit"
              className="w-full  \rounded-sm text-sm px-5 py-2.5 text-center dark:bg-primary-600 pBtn font-semibold"
            >
              Sign in
            </button>
            <p className="text-sm font-light text-gray-500  dark:text-gray-400">
              Don&apos;t have an account yet?{" "}
              <Link
                href="/SignUp"
                className="font-medium text-primary-600 hover:underline dark:text-primary-500"
              >
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </Auth>
  );
};

export default SignIn;
