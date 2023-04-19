import { useUserAuth } from "directsecondyearadmission/Context/UserAuthContext";
import React from "react";
import { useState } from "react";
const ChangeEmail = () => {
  const [resMsg, setresMsg] = useState("");
  const { newEmailUpdate, user, verifyEmail } = useUserAuth();
  const [useremail, setUserEmail] = useState("");
  const [spinner, setspinner] = useState(false);
  const [sendMale, setsendMale] = useState(false);

  if (resMsg) {
    setTimeout(() => {
      setresMsg("");
    }, 2000);
  }
  console.log(useremail);

  const handleEmail = async (e) => {
    e.preventDefault();
    setspinner(true);
    if (useremail === "") {
      setresMsg("Enter the Email");
      setspinner(false);
    } else {
      const res = await newEmailUpdate(useremail);
      if (res.msg) {
        const res2 = await verifyEmail(useremail, user);

        if (res2.msg) {
          setresMsg(res2.msg);
          setspinner(false);
          setsendMale(true);
        } else {
          setresMsg(res.error);
          setspinner(false);
        }
      } else {
        setresMsg(res.error);
        setspinner(false);
      }
    }
  };

  const handleVerify = async () => {
    setspinner(true);

    if (res.msg) {
      setresMsg(res.msg);
      setspinner(false);
    } else {
      setresMsg(res.error);
      setspinner(false);
    }
  };

  return (
    <div className="h-full">
      <div className="mt-2">
        <div className="flex  flex-col gap-2 justify-center">
          <input
            type="email"
            onChange={(e) => {
              setUserEmail(e.target.value);
            }}
            placeholder="Enter new Email"
            className=" mt-5 border outline-none  rounded-sm flex justify-center gap-10 items-center px-5 py-2"
          />
          {resMsg && (
            <div
              className="bg-orange-100 text-sm font-semibold border-l-4 border-orange-500 text-orange-700 px-4 py-2"
              role="alert"
            >
              <p> {resMsg}</p>
            </div>
          )}

          <button
            type="button"
            onClick={handleEmail}
            className=" mt-5 rounded-sm flex justify-center gap-10 items-center pBtn  px-10 py-2 "
          >
            {spinner && (
              <img
                src="https://media.tenor.com/wpSo-8CrXqUAAAAj/loading-loading-forever.gif"
                className="w-5"
                alt="spinner"
              />
            )}
            Verify Email
          </button>
        </div>
      </div>{" "}
    </div>
  );
};

export default ChangeEmail;
