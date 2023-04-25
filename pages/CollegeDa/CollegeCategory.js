import React, { useState, useRef } from "react";
import { useDownloadExcel } from "react-export-table-to-excel";

const CollegeCategory = ({ category, name }) => {
  const tableRef = useRef(null);

  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: name,
    sheet: "CutOffs",
  });

  try {
    return (
      <div className="mt-5 overflow-x-scroll">
        <button
          onClick={onDownload}
          className="px-10 py-2 bg-red-500 text-white my-5"
        >
          Download Details
        </button>
        <table ref={tableRef} className="w-full border  outline-none">
          <thead className="border-none  outline-none">
            <tr className="border-none   outline-none">
              <th className="py-3 border-none bg-blue-50">Choice Code</th>
              <th className="px-10 border-none bg-blue-50 text-left">
                Course Name
              </th>
              <th className="py-3 border-none bg-blue-50">Category</th>
              <th className="px-3 border-none bg-blue-50 ">Max %</th>
              <th className="py-3 border-none bg-blue-50">Seat Type Max %</th>
              <th className="py-3 border-none bg-blue-50">Min %</th>
              <th className="py-3 border-none bg-blue-50">Seat Type Min %</th>
              <th className="py-3 border-none bg-blue-50">Annual Fees</th>
              <th className="py-3 border-none bg-blue-50">Seats</th>
            </tr>
          </thead>
          <tbody className="overflow-x-scroll">
            {category.map((cat, indexCast) => {
              const {
                category,
                min,
                max,
                CollegeDepartment,
                aFees,
                aSeats,
                seatTypeMin,
                seatTypeMax,
              } = cat ? cat : {};
              const { choiceCode, courseName } = CollegeDepartment;

              return (
                <tr className="border-none " key={indexCast}>
                  <td className="border-none py-1 mx-5 px-5 text-center border-slate-500 ">
                    {choiceCode}
                  </td>
                  <td className="border-none py-1 mx-5 px-5 text-left border-slate-500 ">
                    {courseName}
                  </td>
                  <td className="border-none py-1 mx-5 px-5 border-slate-500 text-center">
                    {category}
                  </td>
                  <td className="border-none py-1 mx-5 px-5 border-slate-500 text-center">
                    {max}
                  </td>
                  <td className="border-none py-1 mx-5 px-5 border-slate-500 text-center">
                    {seatTypeMax}
                  </td>{" "}
                  <td className="border-none py-1 mx-5 px-5 border-slate-500 text-center">
                    {min}
                  </td>
                  <td className="border-none py-1 mx-5 px-5 border-slate-500 text-center">
                    {seatTypeMin}
                  </td>
                  <td className="border-none py-1 mx-5 px-5 border-slate-500 text-center">
                    {aFees}
                  </td>
                  <td className="border-none py-1 mx-5 px-5 border-slate-500 text-center">
                    {aSeats}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {category.length == 0 && (
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

export default CollegeCategory;
