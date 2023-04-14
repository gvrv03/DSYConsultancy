import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export const LoginStatus = () => {
  return (
    <div className="text-center w-full text-sm font-semibold rounded-sm bg-blue-50 border-blue-100 border p-5 ">
      <Image src="/img/loginUser.svg" width={100} height={100} />
      <p className="mt-5">Login Now For More Features</p>
      <Link href="/SignIn" legacyBehavior>
        <p className="font-bold cursor-pointer  pBtn py-2 mt-2 ">Login</p>
      </Link>
    </div>
  );
};
export default function CollegeLayout({ children }) {
  return (
    <>
      <section className="body-font  h-screen  overflow-scroll   ">
        <div className="container flex  md:flex-row gap-5 flex-col  justify-between mt-20 m-auto ">
          <div className="  md:mt-0 wfull md:w-4/5 ">{children}</div>

          <div className="rounded-sm wfull md:mx-0 mx-5 p-5 h-screen  right-0 md:w-1/5 bg-white ">
            <LoginStatus />
          </div>
        </div>
      </section>
    </>
  );
}
