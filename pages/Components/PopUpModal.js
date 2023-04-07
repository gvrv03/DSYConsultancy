import react, { useState } from "react";
import { useContext } from "react";
import collegeContext from "directsecondyearadmission/Context/collegeContext";
export default function PopUpModal(props) {
  const context = useContext(collegeContext);

  return (
    <div
      id="popup-modal"
      tabIndex="-1"
      className={`fixed ${props.state} top-0 left-0 p-4 lightBlack  z-50  w-full h-full grid place-items-center`}
    >
      <div className="relative ">
        <div className="relative bg-white rounded-sm shadow ">
          <button
            type="button"
            className="absolute top-3 right-2.5  bg-transparent hover:bg-gray-200 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center  "
            data-modal-hide="popup-modal"
          >
            <svg
              onClick={function () {
                context.closeModal();
              }}
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span  className="sr-only">
              Close modal
            </span>
          </button>
          <div className="p-6 w-96 text-center">
            <div className="w-full text-center  grid place-items-center">
              <img
                src={`/aniIcon/${props.icon}.gif `}
                width={70}
                alt=""
              />
            </div>
            <h3 className="mb-5 text-lg font-normal mt-5">{props.msg}</h3>
            <button
              onClick={function () {
                context.closeModal();
              }}
              data-modal-hide="popup-modal"
              type="button"
              className="text-white pBtn hover:bg-red-800  focus:ring-red-300  font-medium rounded-sm text-sm inline-flex  px-16 py-2.5 text-center "
            >
              Ok
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
