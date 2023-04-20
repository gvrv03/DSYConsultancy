import { getallUsers } from "directsecondyearadmission/quieries/adminQuieries";
import React, { Component } from "react";
import { useState, useEffect } from "react";
import Dashboard from "./Dashboard";
import { useContext } from "react";
import collegeContext from "directsecondyearadmission/Context/collegeContext";
import { useRouter } from "next/router";
import {
  PUBLIC_ADMINKEY,
  PUBLIC_ROOTKEY,
} from "directsecondyearadmission/quieries/UserKeys";
import Loader2 from "../../Components/Loader2";

import exportFromJSON from "export-from-json";
import { useUserContext } from "directsecondyearadmission/Context/UserContext";
import { useAdminContext } from "directsecondyearadmission/Context/AdminContext";
import UserLocation from "directsecondyearadmission/Components/UserLocation";

const AllUsers = () => {
  const { openModal } = useAdminContext();
  const [modalstate, setmodalstate] = useState("hidden");
  const [data, setdata] = useState(null);
  const [userDetails, setuserDetails] = useState("");
  const { userUID } = useUserContext();

  const fileName = "UsersData";
  const exportType = "xls";

  const jsonData = data;
  console.log(jsonData);
  const ExportToExcel = () => {
    exportFromJSON({ jsonData, fileName, exportType });
  };

  useEffect(() => {
    const getUsers = async () => {
      setdata(await getallUsers());
    };
    getUsers();
  }, [openModal]);

  const handleRole = async (userRole, id) => {
    const res = await fetch("/api/updateRole", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: userUID,
      },
      body: JSON.stringify({
        newRole: userRole,
        id: id,
      }),
    });

    const res2 = await res.json();
    if (res2.msg) {
      openModal("success", res2.msg);
    } else {
      openModal("fail", res2.error);
    }
  };
  return (
    <Dashboard>
      <div className="px-5 font-semibold text-slate-400 bg-white">
        All Users
      </div>
      <button
        type="button"
        onClick={ExportToExcel}
        className="bg-red-500 px-10 py-2 m-5 text-white"
      >
        Download XLS
      </button>
      <div className="h-full mt-5 mx-5 overflow-scroll">
        <table className=" border-none w-full overflow-x-scroll">
          <thead className="border-none  text-sm ">
            <tr className="bg-blue-50 border-none">
              <th className="border-none py-3  text-left px-3">Sr. No.</th>
              <th className="border-none py-3  text-left px-3">Photo</th>
              <th className="border-none py-3 text-left px-3">Name</th>
              <th className="border-none py-3 text-left px-3">Email</th>
              <th className="border-none py-3 text-left px-3">Gender</th>
              <th className="border-none py-3 text-left px-3">Location</th>
              <th className="border-none py-3 text-left px-3">Subscription</th>
              <th className="border-none py-3  text-left px-3">
                profile Completion
              </th>
              <th className="border-none py-3 text-center px-3">Role</th>
              <th className="border-none py-3 text-center px-3">Details</th>
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
                      <img
                        className="border rounded-full  w-10 h-10"
                        src={i.credentails.userPhoto}
                        alt={i.credentails.fName}
                      />
                    </td>
                    <td className="px-3 py-2  mt-2 border-none">
                      {" "}
                      {i.credentails.fName}
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
                      <button
                        onClick={() => {
                          i.role != process.env.NEXT_PUBLIC_ROOTKEY &&
                            handleRole(
                              i.role == "user"
                                ? process.env.NEXT_PUBLIC_ADMINKEY
                                : "user",
                              i._id
                            );
                        }}
                      >
                        {i.role == PUBLIC_ROOTKEY ? "Root" : i.role}
                      </button>
                    </td>
                    <td className="px-3 font-semibold pColor py-2  mt-2 border-none text-left">
                      <button
                        onClick={() => {
                          setmodalstate("grid");
                          setuserDetails({
                            id: i._id,
                            user: i.role,
                            cred: i.credentails,
                            bDetails: i.basicDetails,
                            cDetails: i.contactDetails,
                            eDetails: i.educationDetails,
                            pDetails: i.preferences,
                            coOrdinatesDetails: i.coOrdinates,
                            profileCom: i.profileCompletion,
                            plan: i.subscription,
                            notifi: i.notification,
                          });
                        }}
                      >
                        View Detail
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>

        <div
          className={`fixed  z-40 p-5  top-0 left-0 ${modalstate} place-items-center right-0 h-screen`}
        >
          <div
            onClick={() => {
              setmodalstate("hidden");
            }}
            className="absolute w-full h-full top-0 lightBlack cursor-pointer backdrop-blur-sm left-0 right-0"
          />
          <div className="z-50 w-full md:w-4/12  bg-white p-5 rounded-sm">
            <div className="text-right  mb-5">
              <i
                onClick={() => {
                  setmodalstate("hidden");
                }}
                className="bi bi-x-lg font-bold cursor-pointer "
              />
            </div>
            <UserLocation userDetails={userDetails} modalstate={modalstate} />
          </div>
        </div>
        {!data && <Loader2 />}
      </div>
    </Dashboard>
  );
};

export default AllUsers;
