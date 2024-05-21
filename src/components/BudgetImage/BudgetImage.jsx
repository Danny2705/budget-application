import React from "react";

export default function BudgetImage() {
  return (
    <div className=' h-[[calc(100vw*0.6)]] md:h-[900px] lg:h-[calc(100vw*0.35)] xl:h-[calc(100vw*0.35)] bg-main-lightPurple rounded-t-xl lg:rounded-xl flex flex-col lg:flex-row justify-between items-center overflow-hidden mt-6'>
      <div className='w-full lg:w-1/2 p-4 lg:p-16 flex flex-col justify-center items-center'>
        <span className='text-xl lg:text-5xl text-[#31164c] font-bold text-center mb-4'>
          Struggling with keeping track of money?
          <span className='block'>
            <img
              src='./light.png'
              alt='Yellow Light'
              className='w-7 mx-auto lg:w-10'
            />
          </span>
        </span>
        <button className=' text-base lg:text-xl text-black p-2 lg:p-4 bg-[#A52FCE] text-center rounded-md lg:rounded-xl'>
          Set Budget Goal
        </button>
      </div>

      <div className='w-full lg:w-1/2 overflow-hidden'>
        <img
          src='./pig.jpg'
          alt='Pink Pig'
          className='w-full h-auto lg:h-full rounded-t-xl lg:rounded-xl'
        />
      </div>
    </div>
  );
}
