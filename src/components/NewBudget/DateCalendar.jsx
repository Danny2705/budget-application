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
  isTomorrow,
  isYesterday,
} from "date-fns";
import "@fortawesome/fontawesome-free/css/all.min.css";

// MODED from ChatGPT: { can you write me a calender i can use in that component? }

export default function DateCalendar({
  selectedStartDate,
  selectedEndDate,
  setSelectedStartDate,
  setSelectedEndDate,
}) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const prevMonth = () => {
    setCurrentMonth(addMonths(currentMonth, -1));
  };

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const renderHeader = () => {
    const dateFormat = "MMMM yyyy";
    return (
      <div className='flex justify-between items-center p-2'>
        <div className='cursor-pointer' onClick={prevMonth}>
          <i className='fas fa-chevron-left'></i>
        </div>
        <div className='text-sm font-bold'>
          {format(currentMonth, dateFormat)}
        </div>
        <div className='cursor-pointer' onClick={nextMonth}>
          <i className='fas fa-chevron-right'></i>
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
        <div className='flex-1 text-center p-1 text-xs' key={i}>
          {format(addDays(startDate, i), dateFormat).toUpperCase()}
        </div>
      );
    }
    return <div className='flex'>{days}</div>;
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
            className={`flex-1 p-4 text-center cursor-pointer text-xs ${
              !isSameMonth(day, monthStart)
                ? "text-gray-400"
                : isSameDay(day, selectedStartDate) ||
                  isSameDay(day, selectedEndDate)
                ? "bg-purple-700 text-white rounded-full"
                : isWithinRange(day, selectedStartDate, selectedEndDate)
                ? "bg-purple-300 text-white"
                : "hover:bg-purple-300 rounded-full"
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
        <div className='flex w-full' key={day}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className='flex flex-wrap'>{rows}</div>;
  };

  return (
    <div className='flex rounded-lg my-6 py-2 shadow-lg gap-2'>
      <div className='w-full max-w-sm mx-auto'>
        {renderHeader()}
        {renderDays()}
        {renderCells()}
      </div>
    </div>
  );
}
