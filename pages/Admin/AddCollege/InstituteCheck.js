import React, { useState } from "react";
import { useContext, useEffect } from "react";
import CollegeState from "directsecondyearadmission/Context/CollegeState";
import collegeContext from "directsecondyearadmission/Context/collegeContext";
const InstituteCheck = () => {
  const context = useContext(collegeContext);

  const [instituteCode, setInstituteCode] = useState({});
  const [message, setMessage] = useState("");
  const onChange = (e) => {
    setInstituteCode({
      ...instituteCode,
      [e.target.name]: e.target.value,
    });
  };

  const [token, setToken] = useState("");

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    }
  }, []);

  const onCheck = async (e) => {
    e.preventDefault();
    const { insCode } = instituteCode;
    onSubmit(insCode);
  };
  const onSubmit = async (insCode) => {
    const res = await fetch("/api/checkCollege", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        instituteCode: insCode,
      }),
    });

    const res2 = await res.json();
    if (res2.msg) {
      setMessage(res2.msg);
    } else {
      setMessage(res2.error);
    }
  };
  return (
    <div>
      <div className="mb-5 ">
        <form onSubmit={onCheck}>
          <label
            className="block text-grey-darker text-sm font-bold mb-2"
            htmlFor="InstituteCode"
          >
            Institute Code :
          </label>
          <input
            placeholder="Ex. 1001"
            onChange={onChange}
            value={instituteCode.insCode ? instituteCode.insCode : ""}
            name="insCode"
            type="number"
            required={true}
            className="  rounded-sm outline-none  px-2 py-1 bg-white  border"
          />
          <button
            type="submit"
            className="bg-red-500 px-5 text-white text-base font-semibold py-1 ml-5"
          >
            Check
          </button>
        </form>
        <div className="text-xs mt-2 text-red-700 font-semibold  ">
          {message}
        </div>
      </div>
    </div>
  );
};

export default InstituteCheck;
