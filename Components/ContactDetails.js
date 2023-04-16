import { useUserAuth } from "directsecondyearadmission/Context/UserAuthContext";
import { useUserContext } from "directsecondyearadmission/Context/UserContext";
import React from "react";
import { useState } from "react";
import ModelHeader from "./ModelHeader";

const ContactDetails = ({ userData }) => {
  const [modalOpen, setModalOpen] = useState("hidden");
  const [requiredState, setRequired] = useState(false);

  const { user } = useUserAuth();
  const { updateUserContact } = useUserContext();
  const [resMsg, setresMsg] = useState("");
  if (resMsg) {
    setTimeout(() => {
      setresMsg("");
    }, 2000);
  }

  const toggleUser = () => {
    if (modalOpen == "hidden") {
      setModalOpen("block");
    } else {
      setModalOpen("hidden");
    }
  };
  const ContactDetailModal = () => {
    const [contactDetails, setContactDetails] = useState({});
    const onChange = (e) => {
      setContactDetails({
        ...contactDetails,
        [e.target.name]: e.target.value,
      });
    };

    const updateContDetails = async (e) => {
      e.preventDefault();
      const { email, city, state } = contactDetails;
      const res = await updateUserContact(
        user.phoneNumber,
        email,
        city,
        state,
        user.uid
      );
      setresMsg(res);
    };

    return (
      <div className={`fixed top-0 ${modalOpen} left-0 h-full  w-full   `}>
        <div className="z-10  relative w-full flex justify-center  items-center h-full modalColor">
          <div className="absolute h-full w-full  sm:w-4/6 sm:h-4/5  mt-24 sm:mt-0 rounded-sm bg-white">
            <ModelHeader toggle={toggleUser} name="Contact Detail" />
            <form
              onSubmit={updateContDetails}
              className="w-full sm:mt-14 mt-5 px-5 sm:px-0 grid place-items-center"
            >
              {resMsg && (
                <div
                  class="bg-orange-100 text-sm w-full sm:w-2/4  mb-10 font-semibold border-l-4 border-orange-500 text-orange-700 px-4 py-2"
                  role="alert"
                >
                  <p> {resMsg}</p>
                </div>
              )}
              <div className="grid grid-cols-1   sm:grid-cols-2 gap-5 w-full sm:w-2/4 ">
                <div className="flex flex-col ">
                  <label
                    htmlFor="email"
                    className="leading-7 text-sm text-gray-600"
                  >
                    E-mail
                  </label>
                  <input
                    type="email"
                    required={requiredState}
                    onChange={onChange}
                    value={contactDetails.email ? contactDetails.email : ""}
                    name="email"
                    className="w-full bg-white rounded-sm  border border-gray-300 text-base outline-none text-gray-700 py-1 px-3 "
                  />
                </div>

                <div className="flex flex-col ">
                  <label
                    htmlFor="state"
                    className="leading-7 text-sm text-gray-600"
                  >
                    State
                  </label>
                  <input
                    type="text"
                    id="state"
                    required={requiredState}
                    onChange={onChange}
                    value={contactDetails.state ? contactDetails.state : ""}
                    name="state"
                    className="w-full bg-white rounded-sm  border border-gray-300 text-base outline-none text-gray-700 py-1 px-3 "
                  />
                </div>
                <div className="flex flex-col ">
                  <label
                    htmlFor="city"
                    className="leading-7 text-sm text-gray-600"
                  >
                    City
                  </label>
                  <input
                    type="text"
                    required={requiredState}
                    onChange={onChange}
                    value={contactDetails.city ? contactDetails.city : ""}
                    name="city"
                    className="w-full bg-white rounded-sm  border border-gray-300 text-base outline-none text-gray-700 py-1 px-3 "
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-5">
                <button type="submit" className="pBtn px-10 py-3 mt-10">
                  {" "}
                  Submit
                </button>
                <button type="reset" className="border px-10 py-3 mt-10">
                  {" "}
                  Reset
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };

  const contactDetail = userData.contactDetails;
  return (
    <div className="bg-white shadow-md  p-5 mt-5 rounded-sm">
      <ContactDetailModal />
      <div className="header flex pb-2  justify-between items-center">
        <h1 className="text-lg font-bold">Contact Details</h1>
        <i
          className="bi bi-pencil-square font-extrabold text-2xl cursor-pointer "
          onClick={toggleUser}
        ></i>
      </div>

      <div className=" flex flex-wrap mt-3 justify-between items-center">
        <div className="md:w-2/6 w-full pb-5 ">
          <div className="text-slate-400 text-sm">Mobile No.</div>
          <div className="text-sm">{user.phoneNumber}</div>
        </div>
        <div className="md:w-2/6 w-full pb-5">
          <div className="text-slate-400 text-sm">E-mail Address</div>
          <div className="text-sm">{user.email}</div>
        </div>
        <div className="md:w-2/6 w-full pb-5">
          <div className="text-slate-400 text-sm">City</div>
          <div className="text-sm">{contactDetail.city}</div>
        </div>
      </div>

      <div className=" flex flex-wrap mt-2 justify-between items-center">
        <div className="md:w-2/6 w-full pb-5">
          <div className="text-slate-400 text-sm">State</div>
          <div className="text-sm">{contactDetail.state} </div>
        </div>
      </div>
    </div>
  );
};
export default ContactDetails;
