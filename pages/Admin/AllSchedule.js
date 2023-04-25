import React from "react";
import Dashboard from "./Dashboard";
import Loader2 from "../../Components/Loader2";

import exportFromJSON from "export-from-json";
import { useAdminContext } from "directsecondyearadmission/Context/AdminContext";
import Link from "next/link";
const AllSchedule = () => {
  const { allSchedule } = useAdminContext();
  const fileName = "Schedule";
  const exportType = "xls";
  const ExportToExcel = () => {
    exportFromJSON({ allSchedule, fileName, exportType });
  };

  return (
    <Dashboard>
      <div className="px-5 font-semibold text-slate-400 bg-white">
        All Schedule
      </div>
      <button
        type="button"
        onClick={ExportToExcel}
        className="bg-red-500 px-10 py-2 m-5 text-white"
      >
        Download XLS
      </button>
      <div className="h-full mt-5 mx-5 overflow-scroll ">
        <table className=" border-none  overflow-x-scroll w-full ">
          <thead className="border-none  w-full text-sm ">
            <tr className="bg-blue-50  border-none w-full">
              <th className="border-none py-3  text-left px-3">Sr. No.</th>
              <th className="border-none py-3  text-left px-3">Name</th>
              <th className="border-none py-3 text-left px-3">For</th>
              <th className="border-none py-3 text-left px-3">Date</th>
              <th className="border-none py-3 text-left px-3">Time</th>
              <th className="border-none py-3 text-left px-3">Phone</th>
              <th className="border-none py-3 text-center px-3">Delete</th>
            </tr>
          </thead>
          <tbody className="mt-10 text-xs">
            {allSchedule &&
              allSchedule.map((i, index) => {
                return (
                  <tr className="border-none  mt-10" key={index}>
                    <td className="px-3 py-2   mt-2 border-none font-bold text-lg text-left">
                      <span className="text-black">{index + 1}</span>
                    </td>
                    <td className="px-3 py-2  mt-2 border-none text-left ">
                      {i.name}
                    </td>
                    <td className="px-3 py-2  mt-2 border-none">
                      {i.scheduleFor}
                    </td>
                    <td className="px-3 py-2  mt-2 border-none">
                      {i.scheduleDate}
                    </td>
                    <td className="px-3 py-2  mt-2 border-none">
                      {i.scheduleTime}
                    </td>
                    <td className="px-3 py-2  mt-2 border-none">
                      {i.UserData.contactDetails.mobileNo}
                    </td>
                    <td className="px-3 py-2 grid place-items-center  mt-2 border-none">
                      <div className=" flex gap-2 justify-center items-center">
                        <i className="bi  font-bold text-md cursor-pointer text-red-600 border p-1 rounded-md  bi-trash3-fill"></i>
                        <Link
                          href={`tel:${i.UserData.contactDetails.mobileNo}`}
                        >
                          <i className="bi bi-telephone-fill text-md p-1 border  rounded-md pColor" />
                        </Link>
                        <Link
                          href={`mailto:${i.UserData.contactDetails.email}`}
                        >
                          <i className="bi  font-bold text-md  border p-1 rounded-md text-red-600  bi-envelope-fill"></i>
                        </Link>
                      </div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        {allSchedule && allSchedule.length === 0 && (
          <div className="  border mt-5 p-5 text-center w-full font-semibold">
            No Data Found
          </div>
        )}
        {!allSchedule && <Loader2 />}
      </div>
    </Dashboard>
  );
};

export default AllSchedule;
