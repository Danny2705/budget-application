import React from "react";

// code referenced from figma and edited by Emon//
// chatgpt prompt: "how to make the RecentBudget component responsive?" //
export default function RecentBudget() {
  return (
    <div className="max-md:max-w-full w-full">
    <div className="flex flex-wrap gap-5 max-md:flex-col max-md:gap-0">
      <div className="flex flex-col w-full max-md:ml-0 max-md:w-full">
        <div className="flex flex-col grow py-3 pl-2.5 mx-auto w-full bg-purple-300 rounded-2xl border border-black border-solid shadow-[0px_4px_4px_rgba(0,0,0,0.25)] max-md:mt-7">
          <div className="flex gap-5 justify-between text-black">
            <div className="text-base font-bold leading-5">
              Budget Name #1
              <br />
            </div>
            <div className="flex flex-col self-start text-sm">
              <div className="leading-[130%] pr-1">03/04/2024 - 10/04/2024 </div>
              <div className="self-end font-medium mt-4 pr-1">1 Week</div>
            </div>
          </div>
          <div className="self-end mt-8 text-sm leading-5 pr-1 text-black">
            $200 out of $500
          </div>
           {/* chatgpt prompt: "how to add overflow-hidden to the div below?" */}
          <div className="flex mt-1.5 h-[18px] rounded-2xl border border-fuchsia-800 border-solid bg-zinc-500 mr-1 overflow-hidden">
        <div className="w-1/2 bg-zinc-600" />
          <div className="w-1/2 bg-purple-500" />
          </div>
        </div>
      </div>
          </div>
        </div>
  );
}
