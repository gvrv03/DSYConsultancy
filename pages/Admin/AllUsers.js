import { getallUsers } from "directsecondyearadmission/quieries/adminQuieries";
import React from "react";
import { useState, useEffect } from "react";
import Dashboard from "./Dashboard";
import { useContext } from "react";
import collegeContext from "directsecondyearadmission/Context/collegeContext";
import { useRouter } from "next/router";
import {
  PUBLIC_ADMINKEY,
  PUBLIC_ROOTKEY,
} from "directsecondyearadmission/quieries/UserKeys";
import Loader2 from "../Components/Loader2";

const AllUsers = () => {
  const context = useContext(collegeContext);
  const [data, setdata] = useState(null);
  const [token, setToken] = useState("");
  const [checkUser, setcheckUser] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    }

    const getUsers = async () => {
      setdata(await getallUsers());
    };
    getUsers();
  }, []);

  const router = useRouter();
  const handleRole = async (userRole, id) => {
    const res = await fetch("/api/updateRole", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        newRole: userRole,
        id: id,
      }),
    });

    const res2 = await res.json();
    if (res2.msg) {
      context.openModal("success", res2.msg);
      router.reload();
    } else {
      context.openModal("fail", res2.error);
    }
  };
  return (
    <Dashboard>
      <div className="px-5 font-semibold text-slate-400 bg-white">
        All Users
      </div>
      <div className="h-full mt-5 mx-5 overflow-scroll">
        <table className=" border-none w-full overflow-x-scroll">
          <thead className="border-none  text-sm ">
            <tr className="bg-blue-50 border-none">
              <th className="border-none py-3  text-left px-3">Sr. No.</th>
              <th className="border-none py-3  text-left px-3">Name</th>
              <th className="border-none py-3 text-left px-3">Username</th>
              <th className="border-none py-3 text-left px-3">Email</th>
              <th className="border-none py-3 text-left px-3">Gender</th>
              <th className="border-none py-3 text-left px-3">Location</th>
              <th className="border-none py-3 text-left px-3">Subscription</th>
              <th className="border-none py-3  text-left px-3">
                profile Completion
              </th>
              <th className="border-none py-3 text-center px-3">Role</th>
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
                      {i.credentails.fName}
                    </td>
                    <td className="px-3 py-2  mt-2 border-none">
                      {" "}
                      {i.credentails.username}
                    </td>
                    <td className="px-3 py-2  mt-2 border-none">
                      {i.credentails.email}
                    </td>
                    <td className="px-3 py-2  mt-2 border-none">
                      {i.basicDetails.gender}
                    </td>
                    <td className="px-3 py-2  mt-2 border-none">
                      {i.coOrdinates.longitude} ,{i.coOrdinates.latitude}
                    </td>
                    <td className="px-3 py-2  mt-2 border-none">
                      {i.subscription}
                    </td>
                    <td className="px-3 py-2  mt-2 border-none text-left">
                      {i.profileCompletion}%
                    </td>
                    <td className="px-3 py-2 font-semibold  text-xs mt-2 cursor-pointer flex justify-between items-center border-none text-left">
                      <div
                        onClick={() =>
                          handleRole(
                            i.role == "user" ? PUBLIC_ADMINKEY : "user",
                            i._id
                          )
                        }
                      >
                        {i.role == PUBLIC_ROOTKEY ? "Root" : i.role}
                      </div>
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

export default AllUsers;
