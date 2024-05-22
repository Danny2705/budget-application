import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import RecentBudget from "../RecentBudget/RecentBudget";
import RecentTransTable from "../TransactionTable/RecentTransTable";
import { FaPlus } from "react-icons/fa";

export default function SetBudgetGoal() {
  const [activeButton, setActiveButton] = useState("activeBudgets");

  return (
    <div className='p-4'>
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
          <FaPlus />
        </button>
      </div>

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
              <RecentTransTable />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
