import React from "react";

// code referenced from figma and edited by Emon//

export default function RecentBudget() {
  return (
    <div className='flex flex-col w-full sm:w-[calc(50%-20px)] lg:w-[calc(33.33%-20px)] mb-5'>
      <div className='flex flex-col grow py-3 px-2.5 mx-auto w-full bg-[#18001d] rounded-md border border-main-neonPink shadow shadow-main-neonPink'>
        <div className='flex gap-5 justify-between text-white'>
          <div className='text-base font-bold leading-5 text-secondary-orangeRed'>
            Budget Name #1
            <br />
          </div>
          <div className='flex flex-col self-start text-sm'>
            <div className='leading-[130%] pr-1'>03/04/2024 - 10/04/2024</div>
            <div className='self-end font-medium mt-4 pr-1'>1 Week</div>
          </div>
        </div>
        <div className='self-end mt-8 text-sm leading-5 pr-1 text-secondary-red'>
          $200 out of $500
        </div>
        <div className='flex mt-1.5 h-[18px] rounded-2xl mr-1 overflow-hidden'>
          <div className='w-1/2 bg-secondary-pink' />
          <div className='w-1/2 bg-white' />
        </div>
      </div>
    </div>
  );
}
