import React from "react";
import Dashboard from "./Dashboard";
import baseUrl from "../../baseUrl";
import { getColleges } from "directsecondyearadmission/quieries/adminQuieries";
import { useState } from "react";
import { useEffect } from "react";
import Loader2 from "../Components/Loader2";
const AllColleges = () => {
  // console.log(props);

  const [data, setdata] = useState(null);
  useEffect(() => {
    const getAllColleges = async () => {
      const data = await getColleges();
      setdata(data);
    };
    getAllColleges();
  }, []);

  return (
    <Dashboard>
      <div className="px-5  font-semibold text-slate-400 bg-white">
        All Colleges
      </div>

      <div className="h-full mt-5 mx-5 overflow-scroll">
        <table className=" border-none w-full overflow-x-scroll">
          <thead className="border-none  text-sm ">
            <tr className="bg-blue-50 border-none">
              <th className="border-none py-3  text-center px-3">Sr. No.</th>
              <th className="border-none py-3  text-center px-3">Images</th>
              <th className="border-none py-3 text-left px-3">Name</th>
              <th className="border-none py-3 text-left px-3">University</th>
              <th className="border-none py-3 text-left px-3">College Under</th>
              <th className="border-none py-3 text-left px-3">College Type</th>
              <th className="border-none py-3 text-left px-3">City</th>
              <th className="border-none py-3  text-center px-3">
                Institute Code
              </th>
              <th className="border-none py-3  text-center px-3">Added by</th>
            </tr>
          </thead>
          <tbody className="mt-10 text-xs">
            {data &&
              data.map((i, index) => {
                return (
                  <tr className="border-none  mt-10" key={index}>
                    <td className="px-3 py-2   mt-2 border-none font-bold text-lg text-center">
                      <span className="text-black">{index + 1}</span>
                    </td>
                    <td className="px-3 py-2  mt-2 border-none  grid place-items-center ">
                      {" "}
                      <img
                        src={i.image}
                        className="w-10 h-10 rounded-full  border border-blue-900"
                        alt=""
                      />{" "}
                    </td>
                    <td className="px-3 py-2  mt-2 border-none">{i.name}</td>
                    <td className="px-3 py-2  mt-2 border-none">
                      {i.university}
                    </td>
                    <td className="px-3 py-2  mt-2 border-none">
                      {" "}
                      {i.collegeUnder}{" "}
                    </td>
                    <td className="px-3 py-2  mt-2 border-none">
                      {i.collegeType}{" "}
                    </td>
                    <td className="px-3 py-2  mt-2 border-none">
                      {i.location.city}{" "}
                    </td>
                    <td className="px-3 py-2  mt-2 border-none text-center">
                      {i.instituteCode}{" "}
                    </td>
                    <td className="px-3 py-2  mt-2 border-none font-bold text-center">
                      {i.addedBy}{" "}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        {!data && <Loader2 />}
      </div>
    </Dashboard>
  );
};
export default AllColleges;
