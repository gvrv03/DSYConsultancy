import { useContext } from "react";
import { createContext } from "react";
import baseUrl from "directsecondyearadmission/baseUrl";
import { useState } from "react";
import { useEffect } from "react";
import { useUserAuth } from "./UserAuthContext";
import PopUpModal from "directsecondyearadmission/Components/PopUpModal";
import { useUserContext } from "./UserContext";

const AdminContext = createContext();
export function AdminContexProvider({ children }) {
  const { user ,Uid} = useUserAuth();
  const [allDepartments, setallDepartments] = useState("");
  const [allSchedule, setallSchedule] = useState([]);
  const [allfeedbacks, setallfeedbacks] = useState([]);
  const [toastMsg, settoastMsg] = useState({
    state: "hidden",
    icon: "success",
    msg: "Already Exist",
  });
  const closeModal = () => {
    settoastMsg({
      state: "hidden",
      icon: "",
      msg: "",
    });
  };

  const openModal = (icon, msg) => {
    settoastMsg({
      state: "block",
      icon: icon,
      msg: msg,
    });
  };

  const getAllSchedule = async () => {
    const res = await fetch("/api/schedule", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    setallSchedule(data);
  };

  const getAllFeedback = async () => {
    const res = await fetch("/api/feedback", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    setallfeedbacks(data);
  };

  const getAllDepartment = async () => {
    const res = await fetch("/api/addDepartment", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    setallDepartments(data);
  };

  const addDepartment = async (courseName, annualFees, choiceCode, insCode) => {
    const res = await fetch("/api/addDepartment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: Uid,
      },
      body: JSON.stringify({
        courseName: courseName,
        instituteCode: insCode,
        annalFee: annualFees,
        choiceCode: choiceCode,
      }),
    });

    const res2 = await res.json();
    if (res2.msg) {
      openModal("success", res2.msg);
    } else {
      openModal("fail", res2.error);
    }
  };

  async function addCollegeData(
    cName,
    insCode,
    cUnder,
    cType,
    approvedBy,
    rating,
    university,
    addressLine,
    taluka,
    district,
    city,
    longitude,
    latitude,
    iFranmeLoc,
    imageLogo,
    phoneNo,
    cWebsite,
    cEmail,
    topRecuriter
  ) {
    const res = await fetch("/api/Colleges", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: Uid,
      },
      body: JSON.stringify({
        name: cName,
        instituteCode: insCode,
        iframe: iFranmeLoc,
        collegeUnder: cUnder,
        collegeType: cType,
        university: university,
        addressLine: addressLine,
        taluka: taluka,
        district: district,
        addedBy: user.displayName,
        city: city,
        latitude: latitude,
        longitude: longitude,
        rating: rating,
        contactNo: phoneNo,
        website: cWebsite,
        email: cEmail,
        approvedBy: approvedBy,
        image: imageLogo,
        topRecruiters: topRecuriter,
      }),
    });

    const res2 = await res.json();
    if (res2.msg) {
      openModal("success", res2.msg);
    } else {
      openModal("fail", res2.error);
    }
  }

  const addDescription = async (collegeDetail, insCode) => {
    const res = await fetch("/api/addDescription", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: Uid,
      },
      body: JSON.stringify({
        collegeDetail: collegeDetail,
        instituteCode: insCode,
      }),
    });
    const res2 = await res.json();
    if (res2.msg) {
      openModal("success", res2.msg);
    } else {
      openModal("fail", res2.error);
    }
  };

  const addImagesData = async (cImage, insCode) => {
    const res = await fetch("/api/addImages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: Uid,
      },
      body: JSON.stringify({
        instituteCode: insCode,
        imageUrl: cImage,
      }),
    });

    const res2 = await res.json();
    if (res2.msg) {
      openModal("success", res2.msg);
    } else {
      openModal("fail", res2.error);
    }
  };

  const addUserCategory = async (
    category,
    Annualfees,
    Min,
    Max,
    Seats,
    choiceCode,
    seatTypeMax,
    seatTypeMin
  ) => {
    const res = await fetch("/api/addCategory", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: Uid,
      },
      body: JSON.stringify({
        category: category,
        min: Min,
        max: Max,
        aFees: Annualfees,
        aSeats: Seats,
        choiceCode: choiceCode,
        seatTypeMax: seatTypeMax,
        seatTypeMin: seatTypeMin,
      }),
    });

    const res2 = await res.json();
    if (res2.msg) {
      openModal("success", res2.msg);
    } else {
      openModal("fail", res2.error);
    }
  };

  useEffect(() => {
    getAllDepartment();
    getAllSchedule();
    getAllFeedback();
  }, []);

  return (
    <AdminContext.Provider
      value={{
        getAllDepartment,
        addCollegeData,
        addImagesData,
        allSchedule,
        addDescription,
        allDepartments,
        addUserCategory,
        allfeedbacks,
        addDepartment, // popup
        openModal,
        closeModal,
      }}
    >
      <PopUpModal
        state={toastMsg.state}
        icon={toastMsg.icon}
        msg={toastMsg.msg}
      />
      {children}
    </AdminContext.Provider>
  );
}

export function useAdminContext() {
  return useContext(AdminContext);
}
