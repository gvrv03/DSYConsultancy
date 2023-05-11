import { useUserAuth } from "directsecondyearadmission/Context/UserAuthContext";
import Auth from "directsecondyearadmission/Layout/Auth";
import Link from "next/link";
import React from "react";
import { useState } from "react";

const Forgot = () => {
  const [userData, setuserData] = useState({});
  const [requiredState, setRequired] = useState(true);
  const [msg, setmsg] = useState("");
  const { resetPassword, user } = useUserAuth();

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
      await resetPassword(userData.email);
      setmsg("Check your Email");
    } catch (error) {
      setmsg(error.code);
    }
  };

  const Forgotten = () => {
    return (
      <div className="w-full bg-white p-5 rounded-sm shadow-lg md:mt-0 sm:max-w-md  ">
        <div className="  pt-5 ">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 text-center md:text-2xl ">
            Forgot Password
          </h1>
          {msg != "" && (
            <h3 className="bg-red-100 text-center py-2 border border-red-200 font-bold text-red-700">
              {msg}
            </h3>
          )}

          <form onSubmit={handleSubmit} className=" flex flex-col gap-4">
            <div>
              <div className="block mb-2 text-sm font-medium text-gray-900 ">
                Your email
              </div>
              <input
                type="email"
                required={requiredState}
                onChange={onChange}
                id="email"
                value={userData ? userData.email : ""}
                name="email"
                className=" text-gray-900 sm:text-sm rounded-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  outline-none bg-gray-100 "
                placeholder="name@company.com"
              />
            </div>

            <button
              type="submit"
              className="w-full pBtn rounded-sm text-sm px-5 py-2.5 text-center font-semibold"
            >
              Forgot Password
            </button>
            
            <p className="text-sm font-light text-center text-gray-500  dark:text-gray-400">
              Don&apos;t have an account yet ?{" "}
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
    );
  };
  if (user) {
    return (
      <div className="w-full h-screen grid place-items-center p-5">
        <Forgotten />
      </div>
    );
  }
  return (
    <Auth>
      <Forgotten />
    </Auth>
  );
};

export default Forgot;
