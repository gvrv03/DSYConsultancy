import { useContext } from "react";
import { createContext } from "react";
import baseUrl from "directsecondyearadmission/baseUrl";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

const collegesContext = createContext();
export function CollegeContexProvider({ children }) {
  // to get All Colleges
  const [allColleges, setallColleges] = useState([]);
  const [allDepartments, setallDepartments] = useState([]);
  const [allRemDubDistrict, setallRemDubDistrict] = useState([]);
  const [allRemDubDepartments, setallRemDubDepartments] = useState([]);
  const [allRemDubCategory, setallRemDubCategory] = useState([]);
  const [allRemDubUniversity, setallRemDubUniversity] = useState([]);
  const [allCat, setallCat] = useState([]);
  const [allCatSeatType, setallCatSeatType] = useState([]);

  const getAllDepartment = async () => {
    const res = await fetch("/api/addDepartment", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    setallDepartments(data);

    const allDepName = data.map((item) => {
      return item.courseName;
    });
    
    const removeDubBranch =
      allDepName &&
      allDepName.filter(
        (course, index) => !allDepName.includes(course, index + 1)
      );
    setallRemDubDepartments(removeDubBranch);
  };

  const getCat = async () => {
    const res = await allCategory();
    setallCat(res);

    const allUsersCategory = res.map((item) => {
      return item.category;
    });
    
    const removeDubCategory =
      allUsersCategory &&
      allUsersCategory.filter(
        (course, index) => !allUsersCategory.includes(course, index + 1)
      );

    setallRemDubCategory(removeDubCategory);

    const allUsersCategorySeatType = res.map((item) => {
      return item.seatTypeMin;
    });

    const removeDubCategorySeatType =
      allUsersCategorySeatType &&
      allUsersCategorySeatType.filter(
        (course, index) => !allUsersCategorySeatType.includes(course, index + 1)
      );
    setallCatSeatType(removeDubCategorySeatType);
  };
  useEffect(() => {
    getCat();
    getAllDepartment();
  }, []);

  async function getAllColleges() {
    // for show all Colleges
    const res = await axios.get(baseUrl + "/api/Colleges", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.data;
    setallColleges(data);

    const allCollegeDist = data.map((item) => {
      return item.location.district;
    });
    const removeDubDistrict =
      allCollegeDist &&
      allCollegeDist.filter(
        (course, index) => !allCollegeDist.includes(course, index + 1)
      );
    setallRemDubDistrict(removeDubDistrict);

    const allCollegeUniversity = data.map((item) => {
      return item.university;
    });
    const removeDubUniversity =
      allCollegeUniversity &&
      allCollegeUniversity.filter(
        (course, index) => !allCollegeUniversity.includes(course, index + 1)
      );
    setallRemDubUniversity(removeDubUniversity);

    return data;
  }

  useEffect(() => {
    getAllColleges();
  }, []);

  // for show all Category
  async function allCategory() {
    // for show all Colleges
    const res = await fetch(baseUrl + "/api/getCategory", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    return data;
  }

  return (
    <collegesContext.Provider
      value={{
        getAllColleges,
        allCategory,
        allCat,
        allColleges,
        allDepartments,
        allRemDubDepartments,
        allRemDubDistrict,
        allRemDubUniversity,
        allRemDubCategory,
        allCatSeatType,
      }}
    >
      {children}
    </collegesContext.Provider>
  );
}

export function useCollegesContext() {
  return useContext(collegesContext);
}
