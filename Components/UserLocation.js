import { useUserContext } from "directsecondyearadmission/Context/UserContext";
import Link from "next/link";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const UserLocation = ({ userDetails, modalstate }) => {
  const { getCityByLongLat } = useUserContext();
  if (!userDetails) {
    return <div>Waiting...</div>;
  }

  const {
    id,
    user,
    cred,
    bDetails,
    cDetails,
    eDetails,
    pDetails,
    coOrdinatesDetails,
    profileCom,
    plan,
    notifi,
  } = userDetails ? userDetails : {};
  const { fName, dob, socialCategory, maritialStatus, phyChanged, gender } =
    bDetails;
    
  const { mobileNo } = cDetails;
  const { userPhoto, email, password, firebaseID } = cred;
  const { latitude, longitude } = coOrdinatesDetails;
  const [curLocation, setcurLocation] = useState({});

  useEffect(() => {
    const getCity = async () => {
      try {
        const res = await getCityByLongLat(longitude, latitude);
        setcurLocation(res);
      } catch (error) {
        setcurLocation({ error: "Fetch Error" });
      }
    };

    getCity();
  }, [modalstate]);

  return (
    <div>
      <div className="flex justify-between">
        <div className="px-5 py-3 text-xs bg-gray-100 rounded-full font-light">
          {" "}
          <i className="bi bi-key-fill pColor mr-2" /> {id}
        </div>
        <div className="px-5 py-3 text-xs bg-gray-100 rounded-full font-semibold">
          <i className="bi bi-trophy-fill mr-2 pColor" />
          {plan}
        </div>
      </div>

      <div className="mt-10 flex flex-col gap-5 items-center justify-center w-full ">
        <div className="w-36">
          <CircularProgressbarWithChildren value={profileCom}>
            {/* Put any JSX content in here that you'd like. It'll be vertically and horizonally centered. */}
            <img className="rounded-full w-4/5" src={userPhoto} alt="doge" />
          </CircularProgressbarWithChildren>
        </div>

        <div className="px-5 py-2 bg-gray-100 rounded-full text-sm font-semibold">
          {" "}
          <i className="bi bi-person-fill pColor mr-2" /> {fName}
        </div>
      </div>

      <div className="my-5 text-center flex gap-5 justify-center items-center text-xs font-semibold">
        <div>
          <i className="bi mr-2 bi-envelope-fill" />
          <Link href={`mailto:${email}`}>{email}</Link>
        </div>
        <div>
          <i className="bi   mr-2 bi-telephone-fill" />
          <Link href={`tel:+91${mobileNo}`}>{mobileNo}</Link>
        </div>
      </div>

      <div className="p-5 mt-10 font-semibold text-center rounded-sm bg-gray-100">
        {curLocation.display_name ? curLocation.display_name : "Not found"}
      </div>
    </div>
  );
};

export default UserLocation;
