// Reference: a) "builder IO" - https://www.builder.io/ b) figma
// Create new budget component
import React, { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import DateCalendar from "./DateCalendar";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useSelector } from "react-redux";
import { db } from "../../utils/firebase";
import toast from "react-hot-toast";

// MODED from ChatGPT: { can you write me a calender i can use in that component? }
export default function NewBudget({ getData, handleClick }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [selectedStartDate, setSelectedStartDate] = useState("");
  const [selectedEndDate, setSelectedEndDate] = useState("");
  const user = useSelector((state) => state.auth.user);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const docData = {
      title,
      amount,
      startDate: selectedStartDate,
      endDate: selectedEndDate,
      createdAt: serverTimestamp(),
    };

    try {
      if (amount.trim() === "" || isNaN(Number(amount))) {
        toast.error("Amount must be a valid number");
      } else if (
        docData.title !== "" &&
        docData.amount !== "" &&
        docData.startDate !== "" &&
        docData.endDate !== ""
      ) {
        await addDoc(collection(db, `users/${user.uid}/budget`), docData);

        setTitle("");
        setAmount("");
        setSelectedStartDate("");
        setSelectedEndDate("");
        getData();
        handleClick();
        toast.success("Budget created successfully");
      } else {
        toast.error("Please enter all of the fields");
      }
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };
  return (
    <div className='flex items-center justify-center h-screen'>
      <form
        className='flex flex-col py-8 px-6 bg-white rounded-3xl border border-fuchsia-800 border-solid max-w-sm'
        onSubmit={handleSubmit}
      >
        <div className='self-center text-xl font-bold text-black tracking-[1.5px]'>
          New Budget
        </div>
        <div className='flex flex-col mt-6 w-full text-sm text-zinc-600'>
          <div className='flex gap-2 p-2 bg-purple-300 rounded-lg border border-solid border-fuchsia-800 border-opacity-0'>
            <div className='fa-solid fa-tag p-1'></div>
            <input
              className='flex-auto bg-transparent outline-none'
              placeholder='Budget Title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className='flex gap-2 p-2 mt-4 bg-purple-300 rounded-lg border border-solid border-fuchsia-800 border-opacity-0'>
            <div className='fa-solid fa-coins p-1'></div>
            <input
              className='flex-auto bg-transparent outline-none'
              placeholder='Set Amount'
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div className='flex gap-2 p-2 mt-4 bg-purple-300 rounded-lg border border-solid border-fuchsia-800 border-opacity-0'>
            <div className='fa-regular fa-calendar-days p-1 cursor-pointer'></div>
            <span className='flex-auto bg-transparent text-[gray] cursor-pointer'>
              Select budget period
            </span>
          </div>

          <div>
            <DateCalendar
              selectedStartDate={selectedStartDate}
              selectedEndDate={selectedEndDate}
              setSelectedStartDate={setSelectedStartDate}
              setSelectedEndDate={setSelectedEndDate}
            />
          </div>
        </div>
        <button
          type='submit'
          className='flex justify-center items-center mt-6 px-6 py-2 text-sm font-semibold text-black bg-indigo-300 rounded-xl border border-fuchsia-800 border-solid'
        >
          Save New Budget
        </button>
      </form>
    </div>
  );
}
