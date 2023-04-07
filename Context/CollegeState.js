import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import collegeContext from "./collegeContext";
import Toastmsg from "directsecondyearadmission/pages/Components/Toastmsg";
import { useRouter } from "next/router";
import PopUpModal from "directsecondyearadmission/pages/Components/PopUpModal";

const CollegeState = (props) => {
  const router = useRouter();
  const [loginStatus, setLoginStatus] = useState(false); //login status
  const [toastMsg, settoastMsg] = useState({
    state: "hidden",
    icon: "success",
    msg: "Already Exist",
  });

  const closeModal = () => {
    settoastMsg({
      state: "hidden",
      icon: "",
      msg: "",
    });
  };

  const openModal = (icon, msg) => {
    settoastMsg({
      state: "block",
      icon: icon,
      msg: msg,
    });
  };

  const [userId, setUserId] = useState("");
  const [username, setUsername] = useState("");
  const [adminKey, setadminKey] = useState("user");
  const [token, setToken] = useState("");
  const [profileCompletion, setProfileCompletion] = useState(null);

  const [userAllData, setuserAllData] = useState({});
  useEffect(() => {
    if (localStorage.getItem("token")) {
    

      setUserId(localStorage.getItem("userId"));
      setProfileCompletion(localStorage.getItem("profileCompletion"));
      setToken(localStorage.getItem("token"));
      setUsername(localStorage.getItem("userName"));
      setLoginStatus(true);


      setadminKey(localStorage.getItem("userRole"))

      const userDetails = localStorage.getItem("userDetail");
      if (userDetails) {
        setuserAllData(JSON.parse(userDetails));
      }
    }
  }, []);

  //   Logout function
  const logOut = () => {
    if (localStorage.getItem("token")) {
      localStorage.removeItem("token");
      localStorage.removeItem("userName");
      localStorage.removeItem("userId");
      localStorage.removeItem("profileCompletion");
      localStorage.removeItem("userDetail");
      toast.success("Logout Succesfully", {});
      router.push("/");
      router.reload();
    }
  };

  return (
    <collegeContext.Provider
      value={{
        adminKey,
        setadminKey,
        username,
        setUsername,
        userId,
        setUserId,
        loginStatus,
        setLoginStatus,
        userAllData,
        setuserAllData,
        logOut,

        profileCompletion,
        setProfileCompletion,

        // popup
        openModal,
        closeModal,

        // token
        token,
        setToken,
      }}
    >
      <PopUpModal
        state={toastMsg.state}
        icon={toastMsg.icon}
        msg={toastMsg.msg}
      />
      <Toastmsg />
      {props.children}
    </collegeContext.Provider>
  );
};
export default CollegeState;
