import React from "react";

//chatgpt prompt: Function to format Firestore timestamp to a readable date string
const formatDate = (timestamp) => {
  if (!timestamp || !timestamp.seconds) return "";
  const date = new Date(timestamp.seconds * 1000);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

// code referenced from figma and edited by Emon//
// chatgpt prompt: "how to make the RecentBudget component responsive?" //
export default function RecentBudget({ budget }) {
  return (
    <div className='w-80 mb-5 p-4 bg-[#18001d] rounded-lg border border-main-neonPink shadow-lg hover:shadow-2xl transition-shadow duration-300'>
      <div className='flex justify-between text-white mb-4'>
        <div className='text-lg font-bold leading-5'>{budget?.title}</div>
        <div className='text-sm text-right'>
          <div>
            {formatDate(budget?.startDate)} - {formatDate(budget?.endDate)}
          </div>
          <div className='font-medium mt-2'>1 Week</div>
        </div>
      </div>
      <div className='text-right text-secondary-orangeRed text-sm font-semibold mb-4'>
        $200 out of {budget?.amount}
      </div>
      <div className='flex h-3 rounded-full overflow-hidden'>
        <div className='w-1/2 bg-secondary-pink'></div>
        <div className='w-1/2 bg-white'></div>
      </div>
    </div>
  );
}
