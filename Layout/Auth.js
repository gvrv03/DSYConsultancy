import React from "react";
import { useContext } from "react";
import collegeContext from "directsecondyearadmission/Context/collegeContext";
import { useRouter } from "next/router";

export default function Auth({ children }) {
  const context = useContext(collegeContext);
  const router = useRouter();
  console.log(context);
  if (context.loginStatus) {
    router.push("/");
  }
  return (
    <>
      <section className="text-gray-600 h-screen  overflow-y-scroll grid sm:place-items-center place-items-start md:mt-20 body-font">
        <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">
          <div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
            <h1 className="title-font font-medium text-3xl text-gray-900">
              Slow-carb next level shoindcgoitch ethical authentic, poko
              scenester
            </h1>
            <p className="leading-relaxed mt-4">
              Poke slow-carb mixtape knausgaard, typewriter street art gentrify
              hammock starladder roathse. Craies vegan tousled etsy austin.
            </p>
          </div>
          {children}
        </div>
      </section>
    </>
  );
}
