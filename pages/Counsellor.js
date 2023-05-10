import HomeLayout from "directsecondyearadmission/Layout/HomeLayout";
import React from "react";
import Head from "next/head";
import Image from "next/image";
import { useUserContext } from "directsecondyearadmission/Context/UserContext";
import Link from "next/link";
const Counsellor = () => {
  const { openCalender } = useUserContext();
  const { allUserDetail } = useUserContext();
  if (allUserDetail.profileCompletion < 100) {
    return (
      <HomeLayout>
        <div className="mt-20 container grid place-items-center m-auto bg-white p-5">
          <div className="w-96 bg-gray-100 p-5 grid place-items-center">
            <div className="font-semibold">
              Please Complete Your Profile First !
            </div>{" "}
            <div className=" mt-5">
              <Link href="/Profile" className="pBtn  px-5 py-2  w-full">
                Complete Profile
              </Link>
            </div>
          </div>
        </div>
      </HomeLayout>
    );
  }
  return (
    <HomeLayout>
      <Head>
        <title>DSY consultancy | Counsellor</title>
        <meta
          name="keywords"
          content="Direct Second Year Admission, Consultancy Services, Admission Assistance, Education Counseling, Admission Consultancy, College Admission Guidance, Admission Process, Admission Requirements, Engineering Admissions, After Diploma Admissions, DSY, Direct Second Year Admission Consultancy | DSY, Direct Second Year Admission Consultancy, Direct Second Year Admission, DSY consultancy, DSY consultancy | Counsellor"
        />

        <meta name="title" content="DSY consultancy | Counsellor" />
      </Head>
      <div className="flex flex-col gap-5">
        <div className="bg-white shadow-md   border p-5 flex sm:flex-row flex-col-reverse items-center  justify-between rounded-sm ">
          <div className="flex flex-col sm:w-2/4 w-full justify-around">
            <div>
              <p className="text-base font-semibold">
                Hi Gaurav Narnaware, we are here to help you.
              </p>
              <p className="text-sm mt-3 text-slate-400">
                Our experts will help you in your entire admission journey.
              </p>
            </div>

            <button
              onClick={() => {
                openCalender("Counselling");
              }}
              type="button"
              className="pBtn px-10 mt-5 py-3"
            >
              {" "}
              Schedule a call
            </button>
          </div>

          <div className="sm:mb-0 mb-10">
            <Image width={200} height={150} src="/img/counsellor.svg" alt="" />
          </div>
        </div>

        <div className="bg-blue-900 shadow-md   border p-5 flex sm:flex-row flex-col-reverse items-center  justify-between rounded-sm ">
          <div className="flex  border p-5 flex-col md:flex-row border-white items-center   w-full justify-between">
            <h1 className="text-white font-bold">
              Tell us! How was your experience with DSY Consultancy ?
            </h1>
            <Link
              href="/Feedback"
              className="font-bold pBtn px-5 md:w-auto w-full text-center mt-5 md:mt-0 py-2 rounded-sm"
            >
              Share yor Feedback
            </Link>
          </div>
        </div>

        <Link
          target="_blank"
          href="https://googleads.g.doubleclick.net/aclk?sa=l&ai=CfPRJMYhTZJ2cNYGJ2wTo3LrIBZGcmoRwh_6PxZMRi6Su5Lk6EAEgmJ_oJ2Dl2uaDvA6gAfymsLMCyAECqAMByAPJBKoEigJP0DjMS75khS9r4gHCo8d8eCrv5FFe3pOvBh0Op67CETrDn85yqD0Zq8SBjTCy46EFExVEQ_YEKfizOvYmjLcG2ZV5-3Vi84NJb2H9F8wGqcX3d_7cwYB6NbzMh6TPIS614Qgcdh2KOKpHxeh40ewMkq15mfH_ZpXTxuq7U5S3G_p-WbPrkqzEud5farCAN-2WInA9gA1sQrOpAs53-AxY9hvcNK5A-Hv2xCNJ55m54QF2d_eYDC-jHrHyY8M4J-_IxS2DEuUeetHdaF2EioqBHTnAxSnko1rlQ3N3luK8fU_xmbcPsaq9gNjVChSaljtbplooe91ntgTKGnltWOV6VtgZ2ZhLdqO26cAE7q2KvKIEkAYBoAYCgAfs2M_MAYgHAZAHAqgHjs4bqAeT2BuoB-6WsQKoB_6esQKoB6SjsQKoB9XJG6gHpr4bqAeaBqgH89EbqAeW2BuoB6qbsQKoB4OtsQKoB_-esQKoB9-fsQLYBwHSCBgIABACGBoyAQA6CJ_QgICAgAQQSL39wTqxCaOUBK7h1LJsgAoBmAsByAsBuAwB2BMC0BUBmBYB-BYBgBcB&ae=1&num=1&cid=CAQSQgBygQiDsVsAOKVdPPLNZWWY1uSaMU06y6Y4tzad0wmiQo-gzw0Xv52NuRZjq5P8Ic0lIbSLR_LObGIi08ivLS1QrBgB&sig=AOD64_03xdUJ82-a33CCXoky6aW1A0JKuQ&client=ca-pub-9655830461045889&rf=2&nb=17&adurl=https://quillbot.com/upgrade/teams%3Futm_medium%3Dpaid_search%26utm_source%3Dgoogle%26utm_campaign%3Dteamplan_rm_developing%26campaign_type%3Ddisplay%26gclid%3DCj0KCQjwr82iBhCuARIsAO0EAZwOnm2HWWF-2RPI898__qFUOupj6H3sk1Nam5WE-FskYUHsGa10jvkaApvkEALw_wcB"
        >
          <img
            className="w-full"
            src="
          https://tpc.googlesyndication.com/simgad/4793566322975384347?sqp=4sqPyQQrQikqJwhfEAEdAAC0QiABKAEwCTgDQPCTCUgAUAFYAWBfcAJ4AcUBLbKdPg&rs=AOga4qlrjIziWwpMcGDwS21L2kwS3yIc0A "
            alt=""
          />
        </Link>
      </div>
    </HomeLayout>
  );
};

export default Counsellor;
