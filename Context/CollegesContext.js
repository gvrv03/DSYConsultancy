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
  const [allCat, setallCat] = useState([]);

  useEffect(() => {
    const getCat = async () => {
      const res = await allCategory();
      setallCat(res);
    };
    getCat();
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
      value={{ getAllColleges, allCategory, allCat, allColleges }}
    >
      {children}
    </collegesContext.Provider>
  );
}

export function useCollegesContext() {
  return useContext(collegesContext);
}
