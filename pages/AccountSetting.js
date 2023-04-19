import HomeLayout from "directsecondyearadmission/Layout/HomeLayout";
import React from "react";
import Head from "next/head";
import Link from "next/link";
import { useUserContext } from "directsecondyearadmission/Context/UserContext";
import { useState } from "react";
import VerifyPhone from "directsecondyearadmission/Components/VerifyPhone";
import ChangeEmail from "directsecondyearadmission/Components/ChangeEmail";

const NotiRemind = () => {
  return (
    <div className="bg-white   shadow-md border p-5  rounded-sm ">
      <div className="flex flex-col sm:w-2/4 w-full justify-around">
        <div>
          <p className="font-bold text-lg">Notification & Reminders</p>
          <p className="text-sm font-semibold text-slate-600 mt-3 ">
            Never miss important reminders & notifications about the latest
            education news and your admission journey status
          </p>
        </div>

        <div className="mt-5 flex gap-5">
          <div>
            <div className="form-check form-switch flex justify-start items-center">
              <label
                className="form-check-label text-xs mr-2 inline-block "
                htmlFor="flexSwitchCheckDefault"
              >
                SMS
              </label>
              <input
                type="checkbox"
                role="switch"
                className="outline-none bg-white"
                id="flexSwitchCheckDefault"
              />
            </div>
          </div>

          <div>
            <div className="form-check form-switch flex justify-start items-center">
              <label
                className="form-check-label text-xs mr-2 inline-block "
                htmlFor="flexSwitchCheckDefault"
              >
                E-mail
              </label>
              <input
                type="checkbox"
                className="bg-white"
                role="switch"
                id="flexSwitchCheckDefault"
              />
            </div>
          </div>

          <div>
            <div className="form-check form-switch flex justify-start items-center">
              <label
                className="form-check-label text-xs mr-2 inline-block "
                htmlFor="flexSwitchCheckDefault"
              >
                Whatsapp
              </label>
              <input
                type="checkbox"
                role="switch"
                className="bg-white"
                id="flexSwitchCheckDefault"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ReportIssue = () => {
  const { reportIssue, allUserDetail } = useUserContext();
  const [issue, setissue] = useState("");
  const [resMsg, setresMsg] = useState("");
  if (resMsg) {
    setTimeout(() => {
      setresMsg("");
    }, 2000);
  }
  const onChange = (e) => {
    setissue({
      ...issue,
      [e.target.name]: e.target.value,
    });
  };
  const handleClick = async (e) => {
    e.preventDefault();
    const res = await reportIssue(issue.issueName, allUserDetail._id);
    setresMsg(res);
    // console.log(res);
  };
  return (
    <div className="bg-white p-5  shadow-md mt-5 rounded-sm ">
      <p className="font-bold text-lg">Report an Issue</p>

      <textarea
        onChange={onChange}
        value={issue.issueName ? issue.issueName : ""}
        name="issueName"
        rows="5"
        placeholder="Which issue do you have?"
        className="border w-full mt-5 bg-white   outline-none p-5 text-sm"
      ></textarea>

      {resMsg && (
        <div
          className="bg-orange-100 text-sm w-full mb-10 font-semibold border-l-4 border-orange-500 text-orange-700 px-4 py-2"
          role="alert"
        >
          <p> {resMsg}</p>
        </div>
      )}

      <div className="flex justify-end mt-5">
        <button
          onClick={handleClick}
          type="button"
          className="pBtn px-10 rounded-sm   w-52 py-2"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

const PasswordChange = () => {
  return (
    <div className=" bg-white p-5  flex flex-col justify-between gap-2 w-full">
      {" "}
      <h4 className="font-semibold mb-5">Change Password</h4>
      <input
        type="text"
        placeholder="Enter the password"
        className="border outline-none rounded-sm w-full px-2 py-2"
      />
      <Link href="/Forgot" className="text-xs text-right w-full ">
        Forgot Password ?
      </Link>
      <button className="pBtn py-2">Update Password</button>
    </div>
  );
};

const EmailChange = () => {
  return (
    <div className=" bg-white p-5  flex flex-col gap-2 w-full">
      {" "}
      <h4 className="font-semibold mb-5">Change E-mail</h4>
      <ChangeEmail />
    </div>
  );
};

const AccountSetting = () => {
  return (
    <HomeLayout>
      <Head>
        <title>DSY consultancy | Account Setting</title>
        <meta
          name="keywords"
          content="Direct Second Year Admission, Consultancy Services, Admission Assistance, Education Counseling, Admission Consultancy, College Admission Guidance, Admission Process, Admission Requirements, Engineering Admissions, After Diploma Admissions, DSY, Direct Second Year Admission Consultancy | DSY, Direct Second Year Admission Consultancy, Direct Second Year Admission, DSY consultancy, DSY consultancy | Account Setting"
        />

        <meta name="title" content="DSY consultancy | Account Setting" />
      </Head>
      <NotiRemind />
      <ReportIssue />
      <div className=" mt-5 flex flex-col md:flex-row gap-5">
        <EmailChange />
        <PasswordChange />
        <div className="bg-white h-auto p-5 w-full">
          <h4 className="font-semibold mb-5">Update Phone Number</h4>
          <VerifyPhone />
        </div>
      </div>
    </HomeLayout>
  );
};

export default AccountSetting;
