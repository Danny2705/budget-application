import React, { useState } from "react";
import Layout from "../Layout/Layout";
import Barchart from "../../components/Chart/BarChart";
import useExpenseData from "../../components/Chart/BarData";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import ExportButtons from "../../components/BudgetAnalysis/Insights";

const Overview = () => {
  const { labelState, totalMoneySpent, totalBudgetLimit } = useExpenseData();
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < labelState.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const calculateSavings = (income, expenses) => {
    return income - expenses;
  };

  const calculateSavingsPercentage = (income, savings) => {
    return income > 0 ? (savings / income) * 100 : 0;
  };

  const income = totalBudgetLimit[labelState[currentIndex]] || 0;
  const expenses = totalMoneySpent[labelState[currentIndex]] || 0;
  const savings = calculateSavings(income, expenses);
  const savingsPercentage = calculateSavingsPercentage(income, savings);

  return (
    <Layout>
      <div className='mt-[90px] px-4 xl:px-20'>
        <div className='overview-header text-white flex items-center justify-between gap-2'>
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className='hover:bg-blue-500 text-white font-bold py-2 px-4 shadow inline-flex items-center disabled:opacity-50 disabled:cursor-not-allowed'
          >
            <FaArrowLeft className='mr-2 text-xl' /> Previous Month
          </button>
          <div className='month flex-1'>
            <h1 className='text-5xl bg-[#142038] py-[2.85rem] p-8 text-center font-bold rounded-md'>
              {labelState[currentIndex]}
            </h1>
          </div>
          <button
            onClick={handleNext}
            disabled={currentIndex === labelState.length - 1}
            className='hover:bg-blue-500 text-white font-bold py-2 px-4 shadow inline-flex items-center disabled:opacity-50 disabled:cursor-not-allowed'
          >
            Next Month <FaArrowRight className='ml-2 text-xl' />
          </button>
        </div>

        <div className='stats flex-[1.5] mt-8'>
          <ul className='flex items-center gap-2 w-full'>
            <li className='flex flex-col items-center justify-center p-3 flex-1 bg-[#142038] w-full rounded-md'>
              <div className='income text-3xl text-green-500 font-bold'>
                ${income}
              </div>
              <div className='w-full mt-3 text-white p-2'>
                <p className='text-center text-xl'>Total Monthly Limit</p>
              </div>
              <div className='flex w-full items-center justify-between text-sm text-green-500'>
                <p>{savingsPercentage.toFixed(2)}% Achieved</p>
                <p>
                  {savings >= 0
                    ? `$${savings.toFixed(2)} saved`
                    : `${-savings.toFixed(2)} overspent`}
                </p>
              </div>
            </li>

            <li className='flex flex-col items-center justify-center p-3 flex-1 bg-[#142038] w-full rounded-md'>
              <div className='income text-3xl font-bold text-[#f75486]'>
                ${expenses.toFixed(2)}
              </div>
              <div className='w-full mt-3 text-white p-2'>
                <p className='text-center text-xl'>Total Monthly Expenses</p>
              </div>
              <div className='flex w-full items-center justify-between text-sm text-[#f75486]'>
                <p>
                  {income > 0
                    ? `${((expenses / income) * 100).toFixed(2)}% Achieved`
                    : "0%"}
                </p>
                <p>On Goal</p>
              </div>
            </li>

            <li className='flex flex-col items-center justify-center p-3 flex-1 bg-[#142038] w-full rounded-md'>
              <div className='income text-3xl font-bold text-[yellow]'>
                ${savings.toFixed(2)}
              </div>
              <div className='w-full mt-3 text-white p-2'>
                <p className='text-center text-xl'>Total Monthly Savings</p>
              </div>
              <div className='flex w-full items-center justify-between text-sm text-[yellow]'>
                <p>{savingsPercentage.toFixed(2)}% Achieved</p>
                <p>${savings.toFixed(2)} Under Goal</p>
              </div>
            </li>
          </ul>
        </div>

        <h1 className='text-main-darkPink font-bold text-2xl md:text-4xl lg:text-4xl mt-16 mb-8 tracking-wider text-center lg:text-left'>
          Track Your Monthly Savings
        </h1>
        <div className='flex py-10'>
          <Barchart />
        </div>

        <div className="mt-10">

          <ExportButtons />
        </div>
      </div>
    </Layout>
  );
};

export default Overview;
