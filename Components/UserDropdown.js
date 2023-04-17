import * as React from "react";
import { useUserAuth } from "directsecondyearadmission/Context/UserAuthContext";
import Link from "next/link";
import { useState } from "react";

export default function UserDropdown() {
  const { user, logOut } = useUserAuth();
  const [dropDown, setdropDown] = useState("hidden");
  const handleDrop = () => {
    if (dropDown === "hidden") {
      setdropDown("block");
    } else {
      setdropDown("hidden");
    }
  };
  return (
    <div className="relative">
      <div className="">
        <div className="w-8 h-8   rounded-full grid place-items-center bg-gray-100 cursor-pointer">
          {!user.photoURL ? (
            <i onClick={handleDrop} className="bi bi-person-fill"></i>
          ) : (
            <img
              onClick={handleDrop}
              src={user.photoURL}
              alt={user.displayName}
              className="rounded-full border-2  border-gray-400 "
            />
          )}
        </div>
      </div>

      <div
        className={`absolute  bg-white border ${dropDown} right-0 w-72 p-5 mt-5`}
      >
        <h2>
          Hello !{" "}
          <span className="font-semibold pColor">{user.displayName} </span>
        </h2>

        <div className="h-1 mt-5  bg-gray-200" />
        <Link onClick={handleDrop} href="/Profile" className="mt-5 flex gap-5">
          <i className="bi bi-person-fill"></i>
          <span className="text-gray-500">Profile</span>
        </Link>

        <Link onClick={handleDrop} href="/Help" className="mt-5 flex gap-5">
          <i className="bi bi-info-circle-fill"></i>
          <span className="text-gray-500">Help</span>
        </Link>

        <Link
          onClick={handleDrop}
          href="/AccountSetting"
          className="mt-5 flex gap-5"
        >
          <i className="bi bi-gear-fill"></i>
          <span className="text-gray-500">Account Setting</span>
        </Link>

        <button
          onClick={logOut}
          className="mt-5 pBtn w-full py-2  justify-center font-semibold flex gap-5"
        >
          <i className="bi bi-gear-fill"></i>
          <span className="">Sign Out</span>
        </button>
      </div>
    </div>
  );
}
