import React from "react";

export default function RecentBudget() {
  return (
    <div className='flex items-center justify-between mx-auto gap-4 mt-[1rem]'>
      <div className='bg-[#FEE71C] w-[320px] h-[139px] rounded-lg px-4 py-2 flex flex-col justify-between'>
        <h3 className='text-xl font-medium'>Budget 1</h3>
        <span className='text-[3rem] font-bold'>$2000</span>
      </div>
      <div className='bg-[#0FC36E] w-[320px] h-[139px] rounded-lg px-4 py-2 flex flex-col justify-between'>
        <h3 className='text-xl font-medium'>Budget 2</h3>
        <span className='text-[3rem] font-bold'>$1200</span>
      </div>
      <div className='bg-[#D5623B] w-[320px] h-[139px] rounded-lg px-4 py-2 flex flex-col justify-between'>
        <h3 className='text-xl font-medium'>Budget 3</h3>
        <span className='text-[3rem] font-bold'>$1000</span>
      </div>
      <div className='bg-[#FEE71C] w-[320px] h-[139px] rounded-lg px-4 py-2 flex flex-col justify-between'>
        <h3 className='text-xl font-medium'>Budget 4</h3>
        <span className='text-[3rem] font-bold'>$1000</span>
      </div>
    </div>
  );
}
