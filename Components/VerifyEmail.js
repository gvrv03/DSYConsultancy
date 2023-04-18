import { useUserAuth } from "directsecondyearadmission/Context/UserAuthContext";
import React from "react";
import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import OtpForm from "react-otp-ui";
import "react-phone-input-2/lib/style.css";
import { WidthFull } from "@mui/icons-material";
const VerifyEmail = () => {
  const [resMsg, setresMsg] = useState("");
  const { verifyEmail, user } = useUserAuth();

  const { email } = user ? user : {};

  if (resMsg) {
    setTimeout(() => {
      setresMsg("");
    }, 2000);
  }

  const handleEmail = async () => {
    const res = await verifyEmail(email, user);
    if (res.msg) {
      setresMsg(res.msg);
    } else {
      setresMsg(res.error);
    }
  };
  return (
    <div className="h-full">
      {/* <h1 className="font-bold pColor">Verify Yor Phone Number</h1> */}
      <div className="mt-2">
        <div className="flex  flex-col gap-2 justify-center">
          {resMsg && (
            <div
              className="bg-orange-100 text-sm font-semibold border-l-4 border-orange-500 text-orange-700 p-4"
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
            Resend Link
          </button>
        </div>
      </div>{" "}
    </div>
  );
};

export default VerifyEmail;
