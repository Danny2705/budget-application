import React from "react";

//chatgpt prompt: Function to format Firestore timestamp to a readable date string
// code referenced from figma and edited by Emon//
// chatgpt prompt: "how to make the RecentBudget component responsive?" //
const formatDate = (timestamp) => {
  if (!timestamp || !timestamp.seconds) return "";
  const date = new Date(timestamp.seconds * 1000);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const calculatePeriod = (startDate, endDate) => {
  const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
  const diffDays = Math.round(Math.abs((startDate - endDate) / oneDay));

  if (diffDays <= 7) {
    return "1 Week";
  } else if (diffDays <= 14) {
    return "2 Weeks";
  } else if (diffDays <= 21) {
    return "3 Weeks";
  } else if (diffDays <= 30) {
    return "1 Month";
  } else if (diffDays <= 60) {
    return "2 Months";
  } else if (diffDays <= 90) {
    return "3 Months";
  } else if (diffDays <= 120) {
    return "4 Months";
  } else if (diffDays <= 180) {
    return "6 Months";
  } else if (diffDays <= 365) {
    return "1 Year";
  } else {
    return "More than 1 Year";
  }
};

export default function RecentBudget({ budget }) {
  const startDate = new Date(budget?.startDate.seconds * 1000);
  const endDate = new Date(budget?.endDate.seconds * 1000);
  const period = calculatePeriod(startDate, endDate);

  return (
    <div className='w-80 mb-5 p-4 bg-[#18001d] rounded-lg border border-main-neonPink shadow-lg hover:shadow-2xl transition-shadow duration-300'>
      <div className='flex justify-between text-white mb-4'>
        <div className='text-lg font-bold leading-5'>{budget?.title}</div>
        <div className='text-sm text-right'>
          <div>
            {formatDate(budget?.startDate)} - {formatDate(budget?.endDate)}
          </div>
          <div className='font-medium mt-2'>{period}</div>
        </div>
      </div>
      <div className='text-right text-secondary-orangeRed text-sm font-semibold mb-4'>
        $200 out of ${budget?.amount}
      </div>
      <div className='flex h-3 rounded-full overflow-hidden'>
        <div className='w-1/2 bg-secondary-pink'></div>
        <div className='w-1/2 bg-white'></div>
      </div>
    </div>
  );
}
