import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import RecentBudget from "../RecentBudget/RecentBudget";
import RecentBudgetTranstable from "../TransactionTable/RecentBudgetTransTable";
import NewBudget from "../NewBudget/NewBudget.jsx";
import { FaEdit, FaPlus } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../utils/firebase.js";
import { useDispatch, useSelector } from "react-redux";
import { setBudgets } from "../../redux/budgetSlice.js";
import EditBudget from "./EditBudget.jsx";

export default function SetBudgetGoal() {
  const [activeButton, setActiveButton] = useState("activeBudgets");
  const [click, setClick] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const budgets = useSelector((state) => state.budgets.budgets);
  const dispatch = useDispatch();
  const [selectBudgetId, setSelectBudgetId] = useState(null);

  // Ask ChatGPT: can you help me convert the data object that I get from redux to JS Date for sorting the time of the latest budget
  const compareCreatedAt = (a, b) => {
    const timeA = new Date(
      a?.createdAt?.seconds * 1000 + a?.createdAt?.nanoseconds / 1000000
    );
    const timeB = new Date(
      b?.createdAt?.seconds * 1000 + b?.createdAt?.nanoseconds / 1000000
    );
    return timeB - timeA;
  };

  const handleClick = () => {
    setClick((prev) => !prev);
  };

  const handleEdit = (data) => {
    console.log(data);
    setSelectBudgetId(data);
  };

  const getData = async () => {
    const docRef = await getDocs(collection(db, `users/${user.uid}/budget`));
    const budgetData = docRef.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    dispatch(setBudgets(budgetData));
  };

  useEffect(() => {
    getData();
  }, [user.uid]);

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

        <button
          className='ml-auto bg-gray-600 w-10 h-10 flex items-center justify-center rounded-full text-white hover:bg-pink-600 transition duration-300'
          onClick={handleClick}
        >
          <FaPlus />
        </button>
      </div>

      {click && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 bg-gray-900'>
          <div className='relative w-full  backdrop-blur-sm rounded-lg p-8'>
            <NewBudget getData={getData} handleClick={handleClick} />
            <button
              className='absolute right-4 top-10 bg-gray-600 w-10 h-10 flex items-center justify-center rounded-full text-white hover:bg-pink-600 transition duration-300'
              onClick={handleClick}
            >
              <IoMdClose />
            </button>
          </div>
        </div>
      )}

      <div className='relative w-full'>
        <AnimatePresence mode='wait'>
          {activeButton === "activeBudgets" && (
            <motion.div
              key='activeBudgets'
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.3 }}
              className='flex flex-wrap gap-4 justify-between'
            >
              {budgets.length > 0 ? (
                [...budgets].sort(compareCreatedAt).map((budget, i) => (
                  <div key={i} className='flex-grow-0 relative'>
                    <RecentBudget budget={budget} />
                    <button
                      className='text-lg absolute top-0 right-0 bg-main-darkPurple p-2 rounded-lg z-10 cursor-pointer'
                      onClick={() => handleEdit(budget)}
                    >
                      <FaEdit />
                    </button>
                  </div>
                ))
              ) : (
                <button
                  className='w-80 mb-5 p-4 bg-[#18001d] rounded-lg border border-main-neonPink shadow-lg hover:shadow-2xl transition-shadow duration-300 h-[145.6px] text-lg'
                  onClick={handleClick}
                >
                  Start creating the budget
                </button>
              )}
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

        {selectBudgetId && (
          <div className='fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 bg-gray-900'>
            <div className='relative w-full  backdrop-blur-sm rounded-lg p-8'>
              <EditBudget
                data={selectBudgetId}
                getData={getData}
                onClose={() => setSelectBudgetId(null)}
              />
              <button
                className='absolute right-4 top-10 bg-gray-600 w-10 h-10 flex items-center justify-center rounded-full text-white hover:bg-pink-600 transition duration-300'
                onClick={() => setSelectBudgetId(null)}
              >
                <IoMdClose />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
