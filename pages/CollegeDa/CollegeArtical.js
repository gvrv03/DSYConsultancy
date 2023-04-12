import React from "react";
const CollegeArtical = ({ Artical, topRec }) => {
  return (
    <div className="mt-5">
      {Artical == " " && (
        <div className="py-5 font-semibold text-sm text-center">
          Artical Not Found
        </div>
      )}
      <div dangerouslySetInnerHTML={{ __html: Artical }} />
      <span className="text-sm m-0  font-semibold  flex  border-t-2 py-5">
        {" "}
        <i className="bi text-slate-400 bi-building-fill-gear mr-2"></i>{" "}
        <span className="mr-2 ">Top Recruiters : </span>
        {topRec.map((item, index) => {
          return (
            <div key={index} className="mr-2 text-xs h-auto px-3 border">
              {item}
            </div>
          );
        })}
      </span>
    </div>
  );
};

export default CollegeArtical;
