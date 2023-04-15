import { useUserAuth } from "directsecondyearadmission/Context/UserAuthContext";
import React from "react";
import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import OtpForm from "react-otp-ui";
import "react-phone-input-2/lib/style.css";
import { WidthFull } from "@mui/icons-material";
const VerifyPhone = () => {
  const [sendCode, setsendCode] = useState(false);
  const [phoneNo, setphoneNo] = useState("");
  const [verifyOTP, setverifyOTP] = useState("");
  const [resMsg, setresMsg] = useState("");
  const { sendOTP, verifyOTPServer, user } = useUserAuth();
  console.log(user);
  const sendOTPClient = async (e) => {
    e.preventDefault();
    if (phoneNo) {
      const res = await sendOTP(phoneNo);
      setresMsg(res);
      setsendCode(true);
    } else {
      setresMsg("Enter Phone Number");
    }
  };

  if (resMsg) {
    setTimeout(() => {
      setresMsg("");
    }, 2000);
  }

  const verifyOTPClient = async (e) => {
    e.preventDefault();
    const res = await verifyOTPServer(parseInt(verifyOTP));
    setresMsg(res);
    setsendCode(false);
  };

  const handleOnChange = (data) => {
    setverifyOTP(
      data.digit1 +
        data.digit2 +
        data.digit3 +
        data.digit4 +
        data.digit5 +
        data.digit6
    );
  };

  return (
    <div className="h-full">
      {/* <h1 className="font-bold pColor">Verify Yor Phone Number</h1> */}
      <div className="mt-2">
        <div className="flex  flex-col gap-2 justify-center">
          <PhoneInput country={"us"} value={phoneNo} onChange={setphoneNo} />
          {resMsg && (
            <div className="bg-red-100 px-10 py-1  border-2 border-red-200 text-center text-red-700 font-semibold">
              {resMsg}
            </div>
          )}
          {!sendCode && <div id="recaptcha-container"></div>}
          {!sendCode && (
            <button
              onClick={sendOTPClient}
              type="button"
              className=" rounded-sm pBtn px-10 py-2 "
            >
              Send Code{" "}
            </button>
          )}
          {sendCode && (
            <div className="mt-5 flex flex-col gap-2">
              <OtpForm
                className=""
                containerStyle={WidthFull}
                onChange={handleOnChange}
                numberOfInputs={6}
                secureInput={false}
              />
              <button
                onClick={verifyOTPClient}
                type="button"
                className="  rounded-sm pBtn mt-5 px-10 py-2 "
              >
                Verify OTP
              </button>
            </div>
          )}
        </div>
      </div>{" "}
    </div>
  );
};

export default VerifyPhone;
