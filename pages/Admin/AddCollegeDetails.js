import React, { useState } from "react";
import AddDepartment from "./AddCollege/AddDepartment";
import CollegeDetail from "./AddCollege/CollegeDetail";
import Dashboard from "./Dashboard";

const AddCollegeDetails = ({ children }) => {
  return (
    <Dashboard>
      <div className=" font-semibold text-slate-400 bg-white px-5">
        Add College
      </div>

      {children}
    </Dashboard>
  );
};

export default AddCollegeDetails;
