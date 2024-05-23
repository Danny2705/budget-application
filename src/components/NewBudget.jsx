// Reference: a) "builder IO" - https://www.builder.io/ b) figma
// Create new budget component
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
  isAfter,
  isBefore,
  isEqual,
} from "date-fns";
import "@fortawesome/fontawesome-free/css/all.min.css";
// MODED from ChatGPT: { can you write me a calender i can use in that component? }

function DateCalendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);

  const renderHeader = () => {
    const dateFormat = "MMMM yyyy";
    return (
      <div className="flex justify-between items-center p-2">
        <div className="cursor-pointer" onClick={prevMonth}>
          <i className="fas fa-chevron-left"></i>
        </div>
        <div className="text-sm font-bold">
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
        <div className="flex-1 text-center p-1 text-xs" key={i}>
          {format(addDays(startDate, i), dateFormat).toUpperCase()}
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
            className={`flex-1 p-1 text-center cursor-pointer text-xs ${
              !isSameMonth(day, monthStart)
                ? "text-gray-400"
                : isSameDay(day, selectedStartDate) ||
                  isSameDay(day, selectedEndDate)
                ? "bg-purple-700 text-white rounded-lg"
                : isWithinRange(day, selectedStartDate, selectedEndDate)
                ? "bg-purple-300 text-white rounded-lg"
                : "hover:bg-purple-300 "
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
    if (!selectedStartDate || (selectedStartDate && selectedEndDate)) {
      setSelectedStartDate(day);
      setSelectedEndDate(null);
    } else if (
      selectedStartDate &&
      !selectedEndDate &&
      day > selectedStartDate
    ) {
      setSelectedEndDate(day);
    }
  };

  const isWithinRange = (date, startDate, endDate) => {
    if (!startDate || !endDate) return false;
    return (
      (isAfter(date, startDate) || isEqual(date, startDate)) &&
      (isBefore(date, endDate) || isEqual(date, endDate))
    );
  };

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(addMonths(currentMonth, -1));
  };

  return (
    <div className="flex rounded-lg my-2 py-2 shadow-lg gap-2 mt-6">
      <div className="w-full max-w-sm mx-auto">
        {renderHeader()}
        {renderDays()}
        {renderCells()}
      </div>
    </div>
  );
}

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
              type="text"
              required
              placeholder="Budget Title"
            />
          </div>
          <div className="flex gap-2 p-2 mt-4 bg-purple-300 rounded-lg border border-solid border-fuchsia-800 border-opacity-0">
            <div className="fa-solid fa-coins p-1"></div>
            <input
              className="flex-auto bg-transparent"
              type="number"
              min={1}
              max={99}
              required
              placeholder="Set Amount"
            />
          </div>
          <div className="flex gap-2 p-2 mt-4 bg-purple-300 rounded-lg border border-solid border-fuchsia-800 border-opacity-0">
            <div className="fa-regular fa-calendar-days p-1"></div>
            <input
              type="date"
              className="flex-auto bg-transparent"
              placeholder="Select budget period"
            />
          </div>
          <DateCalendar />
        </div>
        <div className="flex justify-center items-center mt-6">
          <div className="px-6 py-2 text-sm font-semibold text-black bg-indigo-300 rounded-xl border border-fuchsia-800 border-solid">
            Save New Budget
          </div>
        </div>
      </div>
    </div>
  );
}
