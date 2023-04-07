import { getAllContacts } from "directsecondyearadmission/quieries/UserDataQuieries";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import baseUrl from "directsecondyearadmission/baseUrl";
import Dashboard from "./Dashboard";
import Loader2 from "../Components/Loader2";

const AllContact = () => {
  const [data, setdata] = useState(null);
  useEffect(() => {
    const getContactData = async () => {
      const data = await getAllContacts();
      setdata(data);
    };
    getContactData();
  }, []);

  console.log(data);

  return (
    <Dashboard>
      <div className="px-5 font-semibold text-slate-400 bg-white">
        All Contact
      </div>

      <div className="mt-5 mx-5 w-full   ">
        <table className=" border-none  overflow-x-scroll w-full ">
          <thead className="border-none  w-full text-sm ">
            <tr className="bg-blue-50  border-none w-full">
              <th className="border-none py-3  text-left px-3">Sr. No.</th>
              <th className="border-none py-3  text-left px-3">User Name</th>
              <th className="border-none py-3 text-left px-3">Phone No</th>
              <th className="border-none py-3 text-left px-3">Email</th>
              <th className="border-none py-3 text-left px-3">Message</th>
              <th className="border-none py-3 text-left px-3">Location</th>
              <th className="border-none py-3 text-center px-3">Delete</th>
            </tr>
          </thead>
          <tbody className="mt-10 text-xs">
            {data &&
              data.map((i, index) => {
                return (
                  <tr className="border-none  mt-10" key={index}>
                    <td className="px-3 py-2   mt-2 border-none font-bold text-lg text-left">
                      <span className="text-black">{index + 1}</span>
                    </td>
                    <td className="px-3 py-2  mt-2 border-none text-left ">
                      {i.uName}
                    </td>
                    <td className="px-3 py-2  mt-2 border-none">
                      {" "}
                      {i.phoneNo}
                    </td>
                    <td className="px-3 py-2  mt-2 border-none">{i.email}</td>
                    <td className="px-3 py-2  mt-2 border-none">{i.message}</td>
                    <td className="px-3 py-2  mt-2 border-none">sdf</td>
                    <td className="px-3 py-2 grid place-items-center  mt-2 border-none">
                      <button className="">
                        <i className="bi  font-bold text-2xl text-red-600 bi-trash3-fill"></i>
                      </button>
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

export default AllContact;
