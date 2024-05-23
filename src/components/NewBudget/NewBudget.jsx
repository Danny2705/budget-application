// Reference: a) "builder IO" - https://www.builder.io/ b) figma
// Create new budget component
import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import DateCalendar from "./Calendar";

// MODED from ChatGPT: { can you write me a calender i can use in that component? }
export default function NewBudget() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col py-8 px-6 bg-white rounded-3xl border border-fuchsia-800 border-solid max-w-sm">
        <div className="self-center text-xl font-bold text-black tracking-[1.5px]">
          New Budget
        </div>
        <div className="flex flex-col mt-6 w-full text-sm text-zinc-600">
          <div className="flex gap-2 p-2 bg-purple-300 rounded-lg border border-solid border-fuchsia-800 border-opacity-0">
            <div className="fa-solid fa-tag p-1"></div>
            <input
              className="flex-auto bg-transparent"
              placeholder="Budget Title"
            />
          </div>
          <div className="flex gap-2 p-2 mt-4 bg-purple-300 rounded-lg border border-solid border-fuchsia-800 border-opacity-0">
            <div className="fa-solid fa-coins p-1"></div>
            <input
              className="flex-auto bg-transparent"
              placeholder="Set Amount"
            />
          </div>
          <div className="flex gap-2 p-2 mt-4 bg-purple-300 rounded-lg border border-solid border-fuchsia-800 border-opacity-0">
            <div className="fa-regular fa-calendar-days p-1"></div>
            <input
              className="flex-auto bg-transparent"
              placeholder="Select budget period"
            />
          </div>
          <div>
            <DateCalendar />
          </div>
        </div>
        <button className="flex justify-center items-center mt-6">
          <div className="px-6 py-2 text-sm font-semibold text-black bg-indigo-300 rounded-xl border border-fuchsia-800 border-solid">
            Save New Budget
          </div>
        </button>
      </div>
    </div>
  );
}
