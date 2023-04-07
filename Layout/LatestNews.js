import React, { useState } from "react";
import Link from "next/link";
// components

export default function Latest({ children }) {
  const items = [
    {
      icon: "bi-house-door-fill",
      name: "Home",
      location: "/Home",
    },
    {
      icon: "bi-person-fill",
      name: "Profile",
      location: "/Profile",
    },
    {
      icon: "bi-buildings-fill",
      name: "Colleges",
      location: "/College",
    },

    {
      icon: "bi-file-earmark-fill",
      name: "Document",
      location: "/",
    },
    {
      icon: "bi-key-fill",
      name: "Insurance",
      location: "/Insurance",
    },
    {
      icon: "bi-bar-chart-line-fill",
      name: "Dashboard",
      location: "/Admin/AllContact",
    },

    {
      icon: "bi-headset",
      name: "Counsellor",
      location: "/Counsellor",
    },
    {
      icon: "bi-gear-fill",
      name: "Account Setting",
      location: "/",
    },
    {
      icon: "bi-info-circle-fill",
      name: "Help",
      location: "/",
    },
  ];

  const ListItem = (props) => {
    return (
      <li>
        <Link
          href={props.location}
          className="flex items-center p-2 my-1 navItem   rounded-sm ">

          <i className={`bi ${props.icon} mr-2`}></i>
          <span className="text-sm">{props.name}</span>

        </Link>
      </li>
    );
  };

  const [openNav, setOpenNav] = useState("");
  const toggleNav = () => {
    if (openNav === "") {
      setOpenNav("openNav");
    } else {
      setOpenNav("");
    }
  };

  const [userOpen, setUserOpen] = useState("hidden");
  const toggleUser = () => {
    if (userOpen == "hidden") {
      setUserOpen("block");
    } else {
      setUserOpen("hidden");
    }
  };

  const UserData = () => {
    return (
      <div className=" bg-white m-auto mt-30 mb-10  p-5 flex-wrap   "></div>
    );
  };
  return (
    <>
      <section className="body-font  px-5">
        <UserData />
        <div className="container   home  ">
          <div className="open  ">
            <i
              className="bi colorBlack bi-list cursor-pointer "
              onClick={toggleNav}
            ></i>

            <div>
              <i className="bi bi-funnel-fill mr-4" onClick={toggleUser}></i>
              <span onClick={toggleUser} className="text-slate-400">
                Filter
              </span>
            </div>
          </div>
          <aside className={`screenSidebar ${openNav}  rounded-sm `}>
            <div className="rounded-sm">
              <i
                className="bi bi-x-lg colorBlack close "
                onClick={toggleNav}
              ></i>
              <ul className="mb-2">
                {items.map((item, index) => {
                  return (
                    <ListItem
                      key={index}
                      location={item.location}
                      name={item.name}
                      icon={item.icon}
                    />
                  );
                })}
              </ul>
            </div>

            <div className="sideAds">Space for ads</div>
          </aside>

          <div className="screenLayout ">{children}</div>
        </div>
      </section>
    </>
  );
}
