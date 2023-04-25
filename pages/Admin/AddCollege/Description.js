import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import "suneditor/dist/css/suneditor.min.css"; // Import Sun Editor's CSS File
import AddCollegeDetails from "../AddCollegeDetails";
import InstituteCheck from "./InstituteCheck";
import Toastmsg from "directsecondyearadmission/Components/Toastmsg";
import { useAdminContext } from "directsecondyearadmission/Context/AdminContext";

const Stepper = () => {
  return (
    <ol className="flex items-center w-full text-sm font-medium p-5 bg-white text-center text-gray-500 dark:text-gray-400 sm:text-base">
      <Link href="/Admin/AddCollege/CollegeDetail" legacyBehavior>
        <li className="flex md:w-full cursor-pointer items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700">
          <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:font-light after:text-gray-200 dark:after:text-gray-500">
            <span className="mr-2">1</span>
            College <span className="hidden sm:inline-flex sm:ml-2">Info</span>
          </span>
        </li>
      </Link>
      <Link href="/Admin/AddCollege/AddDepartment" legacyBehavior>
        <li className="flex md:w-full cursor-pointer items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700">
          <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:font-light after:text-gray-200 dark:after:text-gray-500">
            <span className="mr-2">2</span>
            Department{" "}
            <span className="hidden sm:inline-flex sm:ml-2">Info</span>
          </span>
        </li>
      </Link>

      <Link href="/Admin/TextEditor" legacyBehavior>
        <li className="flex items-center cursor-pointer  text-blue-600 dark:text-blue-500">
          <svg
            aria-hidden="true"
            className="w-4 h-4 mr-2 sm:w-5 sm:h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            ></path>
          </svg>
          Description
        </li>
      </Link>
    </ol>
  );
};
// import { buttonList } from "suneditor-react";
const SunEditor = dynamic(() => import("suneditor-react"), {
  ssr: false,
});

const TextEditor = () => {
  const [loader, setloader] = useState(false);
  const { addDescription } = useAdminContext();
  const CollegeTextEditor = () => {
    const [description, setDescription] = useState("");
    const [insCode, setinsCode] = useState("");

    const addDetails = async (e) => {
      setloader(true);
      e.preventDefault();
      await addDescription(description, insCode);
      setloader(false);
    };

    return (
      <AddCollegeDetails>
        <Stepper />

        <div className=" container m-auto p-5 bg-white">
          <Toastmsg />
          <InstituteCheck />
          <form onSubmit={addDetails}>
            <div className="  mr-1 mb-2  w-full">
              <label
                className="block text-grey-darker text-sm font-bold mb-2"
                htmlFor="InsCode"
              >
                Institute Code
              </label>
              <input
                className=" bg-white border  w-full rounded-sm outline-none  py-2 px-3 text-grey-darker"
                type="number"
                onChange={(e) => {
                  setinsCode(e.target.value);
                }}
                value={insCode}
                name="insCode"
                placeholder="Ex. 1001"
              />
            </div>
            <SunEditor
              // value={description}
              onChange={(content) => {
                setDescription(content);
              }}
              placeholder="Write brief information"
              height="100%"
              setOptions={{
                mode: "Classic",

                rtl: false,

                katex: "window.katex",

                imageGalleryUrl:
                  "https://etyswjpn79.execute-api.ap-northeast-1.amazonaws.com/suneditor-demo",

                videoFileInput: false,

                tabDisable: false,
                buttonList: [
                  [
                    "undo",

                    "redo",

                    "font",

                    "fontSize",

                    "formatBlock",

                    "paragraphStyle",

                    "blockquote",

                    "bold",

                    "underline",

                    "italic",

                    "strike",

                    "subscript",

                    "superscript",

                    "fontColor",

                    "hiliteColor",

                    "textStyle",

                    "removeFormat",

                    "outdent",

                    "indent",

                    "align",

                    "horizontalRule",

                    "list",

                    "lineHeight",

                    "table",

                    "link",

                    "image",

                    "video",

                    "audio",

                    "math",

                    "imageGallery",

                    "fullScreen",

                    "showBlocks",

                    "codeView",

                    "preview",

                    "print",

                    "save",

                    "template",
                  ],
                ],

                "lang(In nodejs)": "en",
              }}
            />
            <button
              disabled={loader ? true : false}
              type="submit"
              className="flex gap-5 pBtn px-10 mt-5 py-3"
            >
              {loader && (
                <img
                  src="/img/loadingSpinner.gif"
                  className="w-5"
                  alt="spinner"
                />
              )}
              Submit
            </button>
          </form>
        </div>
      </AddCollegeDetails>
    );
  };

  return (
    <>
      <CollegeTextEditor />
    </>
  );
};

export default TextEditor;
