import { useContext } from "react";
import { createContext } from "react";
import baseUrl from "directsecondyearadmission/baseUrl";
import { useEffect } from "react";
import { useState } from "react";

const collegesContext = createContext();
export function CollegeContexProvider({ children }) {
  // to get All Colleges
  async function getAllColleges() {
    // for show all Colleges
    const res = await fetch(baseUrl + "/api/Colleges", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    return data;
  }

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
    <collegesContext.Provider value={{ getAllColleges, allCategory }}>
      {children}
    </collegesContext.Provider>
  );
}

export function useCollegesContext() {
  return useContext(collegesContext);
}
