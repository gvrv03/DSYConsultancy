import Link from "next/link";
import { useState } from "react";

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
      (<Link
        href={props.location}
        className="text-gray-700 navItem block px-4 py-2 text-sm"
        role="menuitem"
        tabIndex="-1"
        id="menu-item-0">

        {props.name}

      </Link>)
    );
  };

  return (
    <div className="relative  rounded-sm   items-center p-5 flex justify-between h-14 mb-0  bg-white w-full">
      {/* <p className="font-semibold text-slate-400">College</p> */}
      <div className="font-semibold">View Data</div>
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

export default function Dash({ children }) {
  return (
    <>
      <section className="body-font ">
        <div className="w-full h-auto ">{children}</div>
      </section>
    </>
  );
}
