import Dash from "directsecondyearadmission/Layout/Dash";
import HomeLayout from "directsecondyearadmission/Layout/HomeLayout";
import React, { useEffect } from "react";
import baseUrl from "../../baseUrl";
import { useContext } from "react";
import collegeContext from "directsecondyearadmission/Context/collegeContext";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import { useUserContext } from "directsecondyearadmission/Context/UserContext";

const HeaderFilter = () => {
  const [userOpen, setUserOpen] = useState("hidden");
  const toggleUser = () => {
    if (userOpen == "hidden") {
      setUserOpen("block");
    } else {
      setUserOpen("hidden");
    }
  };

  const items = [
    {
      icon: "bi-house-door-fill",
      Name: "Contact Us",
      Location: "/Admin/AllContact",
    },

    {
      icon: "bi-buildings-fill",
      Name: "Users",
      Location: "/Admin/AllUsers",
    },
    {
      icon: "bi-buildings-fill",
      Name: "Colleges",
      Location: "/Admin/AllColleges",
    },
    {
      icon: "bi-buildings-fill",
      Name: "Latest Updates",
      Location: "/Admin/AllLatestUpdates",
    },
    {
      icon: "bi-buildings-fill",
      Name: "Blog Post",
      Location: "/Admin/AllBlogs",
    },
    {
      icon: "bi-buildings-fill",
      Name: "All Schedule",
      Location: "/Admin/AllSchedule",
    },
    {
      icon: "bi-buildings-fill",
      Name: "Add College",
      Location: "/Admin/AddCollege/CollegeDetail",
    },
    {
      icon: "bi-person-fill",
      Name: "Feedback",
      Location: "/Admin/AllFeedback",
    },
  ];

  const NavItem = (props) => {
    return (
      <Link
        href={props.location}
        className="text-gray-700 navItem block px-4 py-2 text-sm"
        role="menuitem"
        tabIndex="-1"
        id="menu-item-0"
      >
        {props.name}
      </Link>
    );
  };

  return (
    <div className="relative  rounded-sm mt-5  items-center p-5 flex justify-between h-14 mb-0  bg-white w-full">
      {/* <p className="font-semibold text-slate-400">College</p> */}
      <div className="font-semibold">Dashboard</div>
      <div className="cursor-pointer relative">
        <i className="bi bi-three-dots-vertical " onClick={toggleUser}></i>

        <div
          className={`absolute ${userOpen} right-0 z-10 mt-2 w-56 origin-top-right rounded-sm bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex="-1"
        >
          <div className="py-1" role="none">
            {items.map((item, index) => {
              return (
                <NavItem
                  location={item.Location}
                  name={item.Name}
                  key={index}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

const Dashboard = ({ children }) => {
  const { allUserDetail } = useUserContext();

  const HeaderAdmin = () => {
    const [data, setData] = useState({});
    useEffect(() => {
      const status = async () => {
        const res = await fetch(baseUrl + "/api/Colleges", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();

        const res2 = await fetch(baseUrl + "/api/getAllContacts", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data2 = await res2.json();

        const res3 = await fetch(baseUrl + "/api/signUp", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data3 = await res3.json();

        setData({ colleges: data, contacts: data2, users: data3 });
      };
      status();
    }, []);

    return (
      <section className="text-gray-600 rounded-sm bg-white body-font">
        <div className="container px-5 py-5 mx-auto">
          <div className="flex flex-wrap -m-4 text-center">
            <div className="p-4 sm:w-1/4 w-1/2">
              <h2 className="title-font font-medium sm:text-4xl text-3xl text-gray-900">
                {data.users ? data.users.length : "..."}
              </h2>
              <p className="leading-relaxed">Users</p>
            </div>
            <div className="p-4 sm:w-1/4 w-1/2">
              <h2 className="title-font font-medium sm:text-4xl text-3xl text-gray-900">
                {data.colleges ? data.colleges.length : "..."}
              </h2>
              <p className="leading-relaxed">Colleges</p>
            </div>
            <div className="p-4 sm:w-1/4 w-1/2">
              <h2 className="title-font font-medium sm:text-4xl text-3xl text-gray-900">
                {data.contacts ? data.contacts.length : "..."}
              </h2>
              <p className="leading-relaxed">Contacts</p>
            </div>
            <div className="p-4 sm:w-1/4 w-1/2">
              <h2 className="title-font font-medium sm:text-4xl text-3xl text-gray-900">
                4
              </h2>
              <p className="leading-relaxed">Blog</p>
            </div>
          </div>
        </div>
      </section>
    );
  };

  if (
    allUserDetail.role === process.env.NEXT_PUBLIC_ADMINKEY ||
    allUserDetail.role === process.env.NEXT_PUBLIC_ROOTKEY
  ) {
    return (
      <HomeLayout>
        <HeaderAdmin />
        <HeaderFilter />
        <div className="overflow-scroll bg-white h-full">
          <Dash>{children}</Dash>
        </div>
      </HomeLayout>
    );
  } else {
    return (
      <HomeLayout>
        <div className="overflow-scroll p-5 bg-white h-full">Access Denied</div>
      </HomeLayout>
    );
  }
};

export default Dashboard;
