// Reference: a) "builder IO" - https://www.builder.io/ b) figma
// Create new budget component
import "@fortawesome/fontawesome-free/css/all.min.css";
import { addDays, startOfDay } from "date-fns";

export function dateCalendar() {
  const date = new Date();
  const tommorow = addDays(date, 1);
  return date, tommorow;
}

export default function CreateBudget() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col py-10 bg-white rounded-3xl border border-fuchsia-800 border-solid max-w-[726px]">
        <div className="self-center text-3xl font-bold text-black tracking-[2.1px]">
          New Budget
        </div>
        <div className="flex flex-col px-12 mt-8 w-full text-base text-zinc-600 max-md:px-5 max-md:max-w-full">
          <div className="flex gap-2 p-2.5 bg-purple-300 rounded-lg border border-solid border-fuchsia-800 border-opacity-0 max-md:flex-wrap">
            <div className="fa-solid fa-tag p-1"></div>
            <input
              className="flex-auto my-auto max-md:max-w-full bg-transparent"
              placeholder="Budget Title"
            />
          </div>
          <div className="flex gap-2 p-2.5 mt-6 bg-purple-300 rounded-lg border border-solid border-fuchsia-800 border-opacity-0 h-[43px] max-md:max-w-full">
            <div className="fa-solid fa-coins p-1"></div>
            <input
              className="flex-auto my-auto max-md:max-w-full bg-transparent"
              placeholder="Set Amount"
            />
          </div>
          <div className="flex gap-2 p-2.5 mt-6 bg-purple-300 rounded-lg border border-solid border-fuchsia-800 border-opacity-0 h-[43px] max-md:max-w-full">
            <div className="fa-regular fa-calendar-days p-1"></div>
            <input
              className="flex-auto my-auto max-md:max-w-full bg-transparent"
              placeholder="Select budget period"
            />
          </div>
          <div>your date is{() => dateCalendar()}</div>
        </div>
        <div className="p-2">
          <div className="justify-center items-center px-16 py-4 mt-6 text-xl font-semibold tracking-widest text-black bg-indigo-300 rounded-2xl border border-fuchsia-800 border-solid max-md:px-5 max-md:max-w-full">
            Save New Budget
          </div>
        </div>
      </div>
    </div>
  );
}
