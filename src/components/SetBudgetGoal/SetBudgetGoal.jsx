import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import RecentBudget from "../RecentBudget/RecentBudget";
import RecentBudgetTranstable from "../TransactionTable/RecentBudgetTransTable";
import NewBudget from "../NewBudget/NewBudget.jsx";
import { FaPlus } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

export default function SetBudgetGoal() {
  const [activeButton, setActiveButton] = useState("activeBudgets");
  const [click, setClick] = useState(false);

  const handleClick = () => {
    setClick((prev) => !prev);
  };

  return (
    <div className='p-4 relative'>
      <div className='flex gap-2 mb-6 text-lg w-full'>
        <button
          className={`py-2 px-3 rounded ${
            activeButton === "activeBudgets"
              ? "text-[#f910f9] bg-black border-white border"
              : "text-[grey] bg-gray-200"
          }`}
          onClick={() => setActiveButton("activeBudgets")}
        >
          Active Budgets
        </button>
        <button
          className={`py-2 px-3 rounded ${
            activeButton === "budgetHistory"
              ? "text-[#f910f9] bg-black border-white border"
              : "text-[grey] bg-gray-200"
          }`}
          onClick={() => setActiveButton("budgetHistory")}
        >
          Budget History
        </button>

        <button className='ml-auto bg-gray-600 w-10 h-10 flex items-center justify-center rounded-full text-white hover:bg-pink-600 transition duration-300'>
          <FaPlus onClick={handleClick} />
        </button>
      </div>

      {click && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 bg-gray-900'>
          <div className='relative w-full  backdrop-blur-sm rounded-lg p-8'>
            <NewBudget />
            <button
              className='absolute right-4 top-10 bg-gray-600 w-10 h-10 flex items-center justify-center rounded-full text-white hover:bg-pink-600 transition duration-300'
              onClick={handleClick}
            >
              <IoMdClose />
            </button>
          </div>
        </div>
      )}

      <div className='relative'>
        <AnimatePresence mode='wait'>
          {activeButton === "activeBudgets" && (
            <motion.div
              key='activeBudgets'
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.3 }}
              className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'
            >
              <RecentBudget />
              <RecentBudget />
              <RecentBudget />
              <RecentBudget />
              <RecentBudget />
            </motion.div>
          )}

          {activeButton === "budgetHistory" && (
            <motion.div
              key='budgetHistory'
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className='w-full'
            >
              <RecentBudgetTranstable />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
