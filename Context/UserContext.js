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
  const { response, signWithGoogle } = useUserAuth();
  const [allUserDetail, setallUserDetail] = useState({});
  const [allUsers, setallUsers] = useState([]);
  const [coOrdinates, setcoOrdinates] = useState();

  const [userPref, setuserPref] = useState({
    category: "",
    college: "",
    branch: "",
    district: "",
    collegeType: "",
    university: "",
  });
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
  const addFeedback = async (uName, message, objID) => {
    const res = await fetch("/api/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uName,
        message,
        objID,
      }),
    });

    return res.json();
  };

  async function getallUsers() {
    const res = await fetch(baseUrl + "/api/signUp", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    setallUsers(data);
    return data;
  }

  const addContact = async (uName, phoneNo, email, message) => {
    const res = await fetch("/api/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uName,
        phoneNo,
        email,
        message,
      }),
    });

    return res.json();
  };

  const openCalender = (forWhat) => {
    setCalState({
      state: "grid",
      forWhich: forWhat,
    });
  };

  const getCityByLongLat = async (long, lati) => {
    const res = await fetch(
      `https://us1.locationiq.com/v1/reverse?key=pk.d5ab121ede3d7781118559aadc917331&lat=${lati}&lon=${long}&format=json`
    );

    return await res.json();
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
    setallUserDetail(userData);
    const { preferences, basicDetails } = userData;
    setuserPref({
      category: basicDetails.socialCategory,
      college: preferences.university,
      branch: preferences.branch,
      district: preferences.location,
      collegeType: preferences.collegeType,
      university: preferences.university,
    });

    return userData;
  };

  const getFirebaseID = () => {
    setuserUID(localStorage.getItem("firebaseuid"));
  };

  useEffect(() => {
    getFirebaseID();
    getCurrentLocation();
    getSingleUserData();
    getallUsers();
  }, [res, response, signWithGoogle]);

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
    id,
    CatSeatType
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
        CatSeatType,
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
        addContact,
        // Calender
        closeCalender,
        allUsers,
        addFeedback,
        schedule,
        openCalender,
        getCityByLongLat,
        coOrdinates,
        userPref,
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
