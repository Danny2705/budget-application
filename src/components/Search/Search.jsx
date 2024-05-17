import React from "react";
import { IoSearch } from "react-icons/io5";

export default function Search() {
  return (
    <div className='flex justify-center items-center gap-2 px-4'>
      <input
        type='text'
        placeholder='Search for expenses by item description, city, date'
        className='w-[300px] md:w-[500px] text-white bg-transparent border-2 border-[#801AE5] p-[0.15rem] md:p-2 outline-none'
      />
      <IoSearch size={30} color='grey' />
    </div>
  );
}
