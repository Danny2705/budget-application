// Reference: a) "builder IO" - https://www.builder.io/ b) figma
// Create new budget component
import "@fortawesome/fontawesome-free/css/all.min.css";
import React, { useState } from "react";
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  format,
  isSameMonth,
  isSameDay,
  addMonths,
} from "date-fns";

export function DateCalendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const renderHeader = () => {
    const dateFormat = "MMMM yyyy";
    return (
      <div className="flex justify-between items-center p-4">
        <div className="cursor-pointer" onClick={prevMonth}>
          <i className="fas fa-chevron-left"></i>
        </div>
        <div className="text-lg font-bold">
          {format(currentMonth, dateFormat)}
        </div>
        <div className="cursor-pointer" onClick={nextMonth}>
          <i className="fas fa-chevron-right"></i>
        </div>
      </div>
    );
  };

  const renderDays = () => {
    const dateFormat = "EEE";
    const days = [];

    let startDate = startOfWeek(currentMonth);

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="flex-1 text-center p-2" key={i}>
          {format(addDays(startDate, i), dateFormat)}
        </div>
      );
    }

    return <div className="flex">{days}</div>;
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const dateFormat = "d";
    const rows = [];

    let days = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, dateFormat);
        const cloneDay = day;
        days.push(
          <div
            className={`flex-1 p-2 text-center cursor-pointer ${
              !isSameMonth(day, monthStart)
                ? "text-gray-400"
                : isSameDay(day, selectedDate)
                ? "bg-blue-500 text-white rounded-full"
                : "hover:bg-gray-200"
            }`}
            key={day}
            onClick={() => onDateClick(cloneDay)}
          >
            <span>{formattedDate}</span>
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="flex w-full" key={day}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="flex flex-wrap">{rows}</div>;
  };

  const onDateClick = (day) => {
    setSelectedDate(day);
  };

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(addMonths(currentMonth, -1));
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {renderHeader()}
      {renderDays()}
      {renderCells()}
    </div>
  );
}
// console.log(DateCalendar());

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
          <DateCalendar />
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
