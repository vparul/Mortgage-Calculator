import React from "react";
import EmptyIllustration from "../../assets/images/illustration-empty.svg";

const Result = () => {
  return (
    <div className="bg-slate-900 flex-col flex-1 flex items-center justify-center px-8 rounded-bl-[3.5rem] rounded-3xl rounded-tl-none">
      <img src={EmptyIllustration} alt="empty-illustration" />
      <h1 className="text-white text-2xl mt-4 font-bold">Results shown here</h1>
      <h6 className="text-slate-500 text-md font-semibold text-center text-wrap mt-4">
        Complete the form and click "calculate repayments" to see what your
        monthly repayments would be.
      </h6>
    </div>
  );
};

export default Result;
