import { useAdminContext } from "directsecondyearadmission/Context/AdminContext";
import { useUserContext } from "directsecondyearadmission/Context/UserContext";
import HomeLayout from "directsecondyearadmission/Layout/HomeLayout";
import React from "react";
import { useState } from "react";

const Feedback = () => {
  const { addFeedback, allUserDetail } = useUserContext();
  const [feedback, setFeedback] = useState({});
  const { openModal } = useAdminContext();
  const onChange = (e) => {
    setFeedback({
      ...feedback,
      [e.target.name]: e.target.value,
    });
  };
  const addFeed = async (e) => {
    e.preventDefault();
    const { uName, msg } = feedback;
    const res = await addFeedback(uName, msg, allUserDetail._id);
    if (res.msg) {
      return openModal("success", res.msg);
    } else {
      return openModal("fail", res.error);
    }
  };
  return (
    <HomeLayout>
      <section class="bg-white h-full shadow-lg ">
        <div class="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
          <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 ">
            Leave us a Feedback
          </h2>
          <p class="mb-8 lg:mb-16 font-light text-center text-gray-500  sm:text-xl">
            Please provide your valuable feedback and something something ...
          </p>
          <form onSubmit={addFeed} class="space-y-8">
            <div className="relative mb-4">
              <label htmlFor="Name" className="leading-7 text-sm text-gray-600">
                Name
              </label>
              <input
                type="text"
                id="Name"
                required={true}
                onChange={onChange}
                value={feedback.uName ? feedback.uName : ""}
                name="uName"
                className="w-full bg-white rounded-sm border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>

            <div className="relative mb-4">
              <label
                htmlFor="message"
                className="leading-7 text-sm text-gray-600"
              >
                Message
              </label>
              <textarea
                id="message"
                onChange={onChange}
                value={feedback.msg ? feedback.msg : ""}
                name="msg"
                className="w-full bg-white rounded-sm border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                data-gramm="false"
                required={true}
                wt-ignore-input="true"
              ></textarea>
            </div>
            <button
              type="submit"
              class="py-3 px-5 text-sm font-medium text-center pBtn rounded-lg bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 "
            >
              Send message
            </button>
          </form>
        </div>
      </section>
    </HomeLayout>
  );
};

export default Feedback;
