import React from "react";
const CollegeArtical = ({ Artical, topRec }) => {
  try {
    return (
      <div className="mt-5">
        {Artical == " " && (
          <div className="py-5 font-semibold text-sm text-center">
            Artical Not Found
          </div>
        )}
        <div className="py-5" dangerouslySetInnerHTML={{ __html: Artical }} />
        <span className="text-sm m-0  font-semibold justify-start flex-wrap items-center flex  border-t-2 py-5">
          {" "}
          <div className="mr-2  mb-2">
            <i className="bi text-slate-400 bi-building-fill-gear mr-2"></i> Top
            Recruiters :
          </div>
          <div className="flex gap-2 flex-wrap ">
            {topRec.map((item, index) => {
              return (
                <div key={index} className="mr-2 text-xs h-auto px-3 border">
                  {item}
                </div>
              );
            })}{" "}
          </div>
        </span>
      </div>
    );
  } catch (error) {
    return <div className=" text-center font-semibold">Error Occured</div>;
  }
};

export default CollegeArtical;
