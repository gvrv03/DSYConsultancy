import { useContext } from "react";
import { createContext } from "react";
import baseUrl from "directsecondyearadmission/baseUrl";
import collegeContext from "./collegeContext";
import { useRouter } from "next/router";

const userContext = createContext();
export function UserContexProvider({ children }) {
  // Update Basic Details

  const { openModal } = useContext(collegeContext);
  const router = useRouter();

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
      openModal("success", res2.msg);
      router.reload();
    } else {
      openModal("fail", res2.error);
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
      openModal("success", res2.msg);
      router.reload();
    } else {
      openModal("fail", res2.error);
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
      openModal("success", res2.msg);
      router.reload();
    } else {
      openModal("fail", res2.error);
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
      openModal("success", res2.msg);
      router.reload();
    } else {
      openModal("fail", res2.error);
    }
  };

  return (
    <userContext.Provider
      value={{
        updateBasicDetailsUser,
        updateUserContact,
        updateEdutDetailsUser,
        preferenceDetailsUser,
      }}
    >
      {children}
    </userContext.Provider>
  );
}

export function useUserContext() {
  return useContext(userContext);
}
