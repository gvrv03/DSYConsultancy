import React, { useState, useRef } from "react";
import { useDownloadExcel } from "react-export-table-to-excel";

const CollegeCourses = ({ courses }) => {
  const tableRef = useRef(null);

  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: "College Courses",
    sheet: "College",
  });

  try {
    return (
      <div className="mt-5">
        <button
          onClick={onDownload}
          className="px-10 py-2 bg-red-500 text-white my-5"
        >
          Download Details
        </button>
        <table ref={tableRef} className="w-full border  outline-none">
          <thead className="border-none  outline-none">
            <tr className="border-none   outline-none">
              <th className="py-5 border-none bg-blue-50">Sr. No.</th>
              <th className="py-5 border-none bg-blue-50">Choice Code</th>
              <th className="px-5 border-none bg-blue-50 text-left">
                Course Name
              </th>
              <th className="py-3 border-none bg-blue-50">Annual Fees</th>
            </tr>
          </thead>

          <tbody>
            {courses.map((item, index) => {
              return (
                <tr className="border-none " key={index}>
                  <td className="border-none py-1 mx-5 px-5  border-slate-500 text-center font-bold">
                    {index + 1}
                  </td>
                  <td className="border-none py-1 mx-5 px-5  border-slate-500 text-center">
                    {item.choiceCode}
                  </td>
                  <td className="border-none py-1 mx-5 px-5  border-slate-500 ">
                    {item.courseName}
                  </td>
                  <td className="border-none py-1 mx-5 px-5  border-slate-500 text-center">
                    {item.annalFee}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {courses.length == 0 && (
          <div className="py-5 border font-semibold text-sm text-center">
            No Data Found
          </div>
        )}
      </div>
    );
  } catch (error) {
    return <div className=" text-center font-semibold">Error Occured</div>;
  }
};

export default CollegeCourses;
