import React from "react";

export default function BudgetImage() {
  return (
    <div className=' h-[[calc(100vw*0.6)]] md:h-[900px] lg:h-[calc(100vw*0.35)] xl:h-[calc(100vw*0.3)] bg-main-lightPurple rounded-xl flex flex-col lg:flex-row justify-between items-center overflow-hidden'>
      <div className='w-full lg:w-1/2 p-10 lg:p-16 flex flex-col justify-center items-center'>
        <span className='text-3xl lg:text-5xl text-[#31164c] font-bold text-center mb-4'>
          Struggling with keeping track of money?
          <span className='block'>
            <img
              src='./light.png'
              alt='Yellow Light'
              className='w-10 mx-auto lg:mx-0'
            />
          </span>
        </span>
        <button className='text-lg lg:text-xl text-black p-4 bg-[#A52FCE] text-center'>
          Set Budget Goal
        </button>
      </div>

      <div className='w-full lg:w-1/2 overflow-hidden'>
        <img
          src='./pig.jpg'
          alt='Pink Pig'
          className='w-full h-auto lg:h-full rounded-xl'
        />
      </div>
    </div>
  );
}
