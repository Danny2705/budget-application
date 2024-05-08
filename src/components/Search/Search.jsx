import React from "react";
import { IoSearch } from "react-icons/io5";

export default function Search() {
  return (
    <div className='flex justify-center items-center ml-[3rem] gap-2 px-4'>
      <input
        type='text'
        placeholder='Search for expenses by item description, city, date'
        className='w-[500px] text-white bg-transparent border-2 border-[#801AE5] px-2 py-2 outline-none'
      />
      <IoSearch size={30} color='grey' />
    </div>
  );
}
