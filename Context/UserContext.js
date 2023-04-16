import { useContext } from "react";
import { createContext } from "react";
import baseUrl from "directsecondyearadmission/baseUrl";
import { useState } from "react";
import { useEffect } from "react";
import { useUserAuth } from "./UserAuthContext";

const userContext = createContext();
export function UserContexProvider({ children }) {
  const { user } = useUserAuth();
  const [userUID, setuserUID] = useState("");
  const [allUserDetail, setallUserDetail] = useState({});

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

    getSingleUserData();
  }, []);

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

  return (
    <userContext.Provider
      value={{
        updateBasicDetailsUser,
        updateUserContact,
        updateEdutDetailsUser,
        preferenceDetailsUser,
        allUserDetail,
        userUID,
      }}
    >
      {children}
    </userContext.Provider>
  );
}

export function useUserContext() {
  return useContext(userContext);
}
