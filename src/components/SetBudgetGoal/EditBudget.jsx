import React, { useState, useEffect } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../utils/firebase";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import DateCalendar from "../NewBudget/DateCalendar";

export default function EditBudget({ data, onClose, getData }) {
  const [title, setTitle] = useState(data.title);
  const [amount, setAmount] = useState(data.amount);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    setTitle(data.title);
    setAmount(data.amount);
    if (data.startDate && data.startDate.seconds) {
      setSelectedStartDate(new Date(data.startDate.seconds * 1000));
    }
    if (data.endDate && data.endDate.seconds) {
      setSelectedEndDate(new Date(data.endDate.seconds * 1000));
    }
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      title === "" ||
      amount === "" ||
      isNaN(Number(amount)) ||
      !selectedStartDate ||
      !selectedEndDate
    ) {
      toast.error("Please fill out all fields correctly.");
      return;
    }

    const docData = {
      title,
      amount,
      startDate: selectedStartDate,
      endDate: selectedEndDate,
    };

    try {
      const budgetDoc = doc(db, `users/${user.uid}/budget`, data.id);
      await updateDoc(budgetDoc, docData);

      getData();
      toast.success("Budget updated successfully");
      onClose();
    } catch (error) {
      console.error("Error updating document: ", error);
      toast.error("Error updating budget");
    }
  };

  return (
    <div className='flex items-center justify-center h-screen'>
      <form
        className='flex flex-col py-8 px-6 bg-white rounded-3xl border border-fuchsia-800 border-solid max-w-sm'
        onSubmit={handleSubmit}
      >
        <div className='self-center text-xl font-bold text-black tracking-[1.5px]'>
          Edit Budget
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
          Save Updated Budget
        </button>
      </form>
    </div>
  );
}
