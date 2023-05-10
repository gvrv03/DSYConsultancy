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
  const [spinner, setspinner] = useState(false);


  const sendOTPClient = async (e) => {
    e.preventDefault();
    setspinner(true);
    if (phoneNo) {
      const res = await sendOTP(phoneNo);
      if (res.msg) {
        setresMsg(res.msg);
        setsendCode(true);
      } else {
        setresMsg(res.error);
      }
      setspinner(false);
    } else {
      setresMsg("Enter Phone Number");
      setspinner(false);
    }
  };

  const resendOTP= async (e) => {
    e.preventDefault();
    setspinner(true);
    if (phoneNo) {
      const res = await sendOTP(phoneNo);
      if (res.msg) {
        setresMsg(res.msg);
        setsendCode(true);
      } else {
        setresMsg(res.error);
      }
      setspinner(false);
    } else {
      setresMsg("Enter Phone Number");
      setspinner(false);
    }
  };

  if (resMsg) {
    setTimeout(() => {
      setresMsg("");
    }, 2000);
  }



  const verifyOTPClient = async (e) => {
    e.preventDefault();
    setspinner(true);

    const res = await verifyOTPServer(parseInt(verifyOTP));
    if (res.msg) {
      setresMsg(res.msg);
      setsendCode(false);
      setspinner(false);
    } else {
      setresMsg(res.error);
      setspinner(false);
    }
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
            <div
              className="bg-orange-100 text-sm font-semibold border-l-4 border-orange-500 text-orange-700 p-4"
              role="alert"
            >
              <p> {resMsg}</p>
            </div>
          )}
          {!sendCode && <div id="recaptcha-container"></div>}
          {!sendCode && (
            <button
              onClick={sendOTPClient}
              type="button"
              disabled={spinner ? true : false}
              className=" rounded-sm flex justify-center items-center gap-10 pBtn px-10 py-2 "
            >
              {spinner && (
                <img
                  src="/img/loadingSpinner.gif"
                  className="w-5"
                  alt="spinner"
                />
              )}
              Send Code{" "}
            </button>
          )}
          {sendCode && (
            <div className="mt-5 flex flex-col gap-2">
              <OtpForm
                containerStyle={WidthFull}
                onChange={handleOnChange}
                numberOfInputs={6}
                secureInput={false}
              />
              <div>
                <button
                  onClick={resendOTP}
                  type="button"
                  className=" pColor float-right font-semibold my-2 "
                >
                  Resend OTP ?
                </button>
              </div>
              <button
                onClick={verifyOTPClient}
                disabled={spinner ? true : false}
                type="button"
                className="  rounded-sm flex justify-center gap-10 items-center pBtn  px-10 py-2 "
              >
                {spinner && (
                  <img
                    src="/img/loadingSpinner.gif"
                    className="w-5"
                  />
                )}
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
