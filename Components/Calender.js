import { useAdminContext } from "directsecondyearadmission/Context/AdminContext";
import { useUserAuth } from "directsecondyearadmission/Context/UserAuthContext";
import { useUserContext } from "directsecondyearadmission/Context/UserContext";
import React from "react";
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
const Calender = (props) => {
  const { schedule, allUserDetail } = useUserContext();
  const [value, onChange] = useState(new Date());

  const [time, settime] = useState("05:30");

  const { closeCalender } = useUserContext();
  const { user } = useUserAuth();
  const [resMsg, setresMsg] = useState("");
  if (resMsg) {
    setTimeout(() => {
      setresMsg("");
    }, 5000);
  }

  const onSchedule = async () => {
    const res = await schedule(
      user.displayName,
      time,
      props.forWhich,
      value,
      allUserDetail._id
    );

    if (res.msg) {
      setresMsg(res.msg);
    } else {
      setresMsg(res.error);
    }
  };
  return (
    <div
      className={`fixed z-50 w-full h-full top-0 ${props.state} place-items-center  left-0 right-0`}
    >
      <div
        onClick={closeCalender}
        className="absolute w-full h-full top-0 lightBlack backdrop-blur-md left-0 right-0"
      />
      <div className="z-50 bg-white p-5 rounded-sm">
        <Calendar
          className="rounded-sm font-semibold p-5"
          onChange={onChange}
          value={value}
        />
        <input
          type="time"
          value={time}
          onChange={(e) => {
            settime(e.target.value);
          }}
          className="w-full border my-2 py-2 outline-none px-5"
        />
        {resMsg && (
          <div
            className="bg-orange-100 text-sm w-full my-5 font-semibold border-l-4 border-orange-500 text-orange-700 px-4 py-2"
            role="alert"
          >
            <p> {resMsg}</p>
          </div>
        )}
        <div className="flex gap-5">
          <button
            onClick={closeCalender}
            type="button "
            className=" border w-full hover:bg-sky-50 py-2 font-semibold mt-5"
          >
            Close
          </button>
          <button
            onClick={onSchedule}
            type="button "
            className=" pBtn font-semibold w-full py-2 mt-5"
          >
            Schedule Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Calender;
