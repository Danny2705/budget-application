import React from "react";
// code referenced from figma and edited by Emon//
export default function RecentBudget() {
  return (
    <div className="max-md:max-w-full">
    <div className="flex gap-5 max-md:flex-col max-md:gap-0">
      <div className="flex flex-col w-[32%] max-md:ml-0 max-md:w-full">
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
          <div className="flex flex-col justify-center mt-1.5 rounded-2xl border border-fuchsia-800 border-solid bg-zinc-500 mr-1">
            <div className="shrink-0 rounded-2xl border border-fuchsia-800 border-solid bg-zinc-600 h-[18px]" />
          </div>
        </div>
      </div>
      <div className="flex flex-col ml-5 w-[32%] max-md:ml-0 max-md:w-full">
        <div className="flex flex-col grow py-3 pl-2.5 mx-auto w-full bg-purple-300 rounded-2xl border border-black border-solid shadow-[0px_4px_4px_rgba(0,0,0,0.25)] max-md:mt-7">
          <div className="flex gap-5 justify-between text-black max-md:mr-1">
            <div className="text-base font-bold leading-5">
              Budget Name #2
              <br />
            </div>
            <div className="flex flex-col self-start text-sm">
              <div className="leading-[130%] pr-1">03/04/2024 - 10/04/2024 </div>
              <div className="self-end font-medium mt-4 pr-1">1 Week</div>
            </div>
          </div>
          <div className="self-end mt-8 text-sm leading-5 pr-1  text-black">
            $200 out of $500
          </div>
          <div className="flex flex-col justify-center mt-1.5 rounded-2xl border border-fuchsia-800 border-solid bg-zinc-500 mr-1">
            <div className="shrink-0 rounded-2xl border border-fuchsia-800 border-solid bg-zinc-600 h-[18px]" />
          </div>
        </div>
      </div>
      <div className="flex flex-col ml-5 w-[32%] max-md:ml-0 max-md:w-full">
        <div className="flex flex-col grow py-3 pl-2.5 mx-auto w-full bg-purple-300 rounded-2xl border border-black border-solid shadow-[0px_4px_4px_rgba(0,0,0,0.25)] max-md:mt-7">
          <div className="flex gap-5 justify-between text-black max-md:mr-1">
            <div className="text-base font-bold leading-5">
              Budget Name #3
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
          <div className="flex flex-col justify-center mt-1.5 rounded-2xl border border-fuchsia-800 border-solid bg-zinc-500 mr-1">
            <div className="shrink-0 rounded-2xl border border-fuchsia-800 border-solid bg-zinc-600 h-[18px]" />
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}
