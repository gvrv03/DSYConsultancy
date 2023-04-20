import { useContext } from "react";
import { createContext } from "react";
import baseUrl from "directsecondyearadmission/baseUrl";
import { useState } from "react";
import { useEffect } from "react";
import { useUserAuth } from "./UserAuthContext";
import Calender from "directsecondyearadmission/Components/Calender";

const userContext = createContext();
export function UserContexProvider({ children }) {
  const [userUID, setuserUID] = useState("");
  const [res, setres] = useState(null);
  const [allUserDetail, setallUserDetail] = useState({});
  const [coOrdinates, setcoOrdinates] = useState();

  const [calState, setCalState] = useState({
    state: "hidden",
    forWhich: "",
  });
  const closeCalender = () => {
    setCalState({
      state: "hidden",
      forWhich: "",
    });
  };

  const openCalender = (forWhat) => {
    setCalState({
      state: "grid",
      forWhich: forWhat,
    });
  };

  const getCurrentLocation = async () => {
    navigator.geolocation.getCurrentPosition(async function (position) {
      const res = await fetch("/api/updateUserLocation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          UID: localStorage.getItem("firebaseuid"),
        }),
      });

      setcoOrdinates({ data: await res.json() });
    });
  };

  // console.log(userUID);
  const getSingleUserData = async () => {
    const res = await fetch(
      baseUrl + "/api/User/" + localStorage.getItem("firebaseuid"),
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const userData = await res.json();
    if (userData.error) {
      return {
        notFound: true,
      };
    }
    setallUserDetail(userData);
    return userData;
  };

  const getFirebaseID = () => {
    setuserUID(localStorage.getItem("firebaseuid"));
  };

  useEffect(() => {
    getFirebaseID();
    getCurrentLocation();
    getSingleUserData();
  }, [res]);

  const updateBasicDetailsUser = async (
    fullName,
    socialCategory,
    dob,
    gender,
    marStatus,
    phyChanged,
    id
  ) => {
    const res = await fetch("/api/updateBasicD", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullName: fullName,
        dob: dob,
        socialCategory: socialCategory,
        gender: gender,
        maritialStatus: marStatus,
        phyChanged: phyChanged,
        id: id,
      }),
    });

    const res2 = await res.json();
    if (res2.msg) {
      return res2.msg;
    } else {
      return res2.error;
    }
  };

  const updateUserContact = async (mobileNo, email, city, state, id) => {
    const res = await fetch("/api/updateContD", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        mobileNo,
        email,
        city,
        state,
        id,
      }),
    });

    const res2 = await res.json();
    if (res2.msg) {
      return res2.msg;
    } else {
      return res2.error;
    }
  };

  const updateEdutDetailsUser = async (
    sBoard,
    sSchool,
    sPassYear,
    sMarkType,
    sPercentage,
    cBoard,
    cSchool,
    cPassYear,
    cMarkType,
    cPercentage,
    id
  ) => {
    const res = await fetch("/api/updateEduD", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sBoard,
        sSchool,
        sPassYear,
        sMarkType,
        sPercentage,
        cBoard,
        cSchool,
        cPassYear,
        cMarkType,
        cPercentage,
        id,
      }),
    });

    const res2 = await res.json();
    if (res2.msg) {
      return res2.msg;
    } else {
      return res2.error;
    }
  };

  const preferenceDetailsUser = async (
    university,
    branch,
    location,
    collegeType,
    needLoan,
    id
  ) => {
    const res = await fetch("/api/updatePrefD", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        university,
        branch,
        location,
        collegeType,
        needLoan,
        id,
      }),
    });

    const res2 = await res.json();
    if (res2.msg) {
      return res2.msg;
    } else {
      return res2.error;
    }
  };

  const reportIssue = async (issue, objectId) => {
    const res = await fetch("/api/reportIssue", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        issue: issue,
        objectID: objectId,
      }),
    });

    const res2 = await res.json();
    if (res2.msg) {
      return res2.msg;
    } else {
      return res2.error;
    }
  };

  const schedule = async (
    name,
    scheduleTime,
    scheduleFor,
    scheduleDate,
    objectId
  ) => {
    const res = await fetch("/api/schedule", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        scheduleTime: scheduleTime,
        scheduleFor: scheduleFor,
        scheduleDate: scheduleDate,
        objectID: objectId,
      }),
    });
    const res2 = await res.json();
    return res2;
  };

  return (
    <userContext.Provider
      value={{
        reportIssue,
        updateBasicDetailsUser,
        updateUserContact,
        updateEdutDetailsUser,
        preferenceDetailsUser,
        allUserDetail,
        userUID,
        setres,

        // Calender
        closeCalender,
        schedule,
        openCalender,

        coOrdinates,
      }}
    >
      <Calender state={calState.state} forWhich={calState.forWhich} />
      {children}
    </userContext.Provider>
  );
}

export function useUserContext() {
  return useContext(userContext);
}
