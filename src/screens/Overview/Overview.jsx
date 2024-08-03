import React, { useState } from "react";
import Layout from "../Layout/Layout";
import Barchart from "../../components/Chart/BarChart";
import { Report, ExportButtons } from "../../components/BudgetAnalysis/Insights";
import useExpenseData from "../../components/Chart/BarData";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

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
      <div className="mt-[90px] px-4 xl:px-20">
        <div className="overview-header text-white flex flex-row items-center justify-between gap-0">
        <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="hover:bg-blue-500 text-white font-bold py-2 px-4 shadow inline-flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FaArrowLeft className="mr-2 text-xl" />
              </button>
          <div className="stats w-full">
            <ul className="flex flex-col items-center gap-2 w-full">
              {labelState.length > 0 && (
                <li className="flex flex-col items-center justify-center p-3 w-full bg-[#142038] rounded-md mb-4">
                  <div className="month text-3xl font-bold text-center mb-4">{labelState[currentIndex]}</div>
                  <div className="income text-3xl text-green-500 font-bold mb-2">${income}</div>
                  <div className="w-full">
                    <p className="text-center text-sm">Monthly Limit</p>
                    <div className="bar w-full bg-green-500 h-3 my-2"></div>
                  </div>
                  <div className="income text-3xl font-bold text-[#f75486] mb-2">${expenses}</div>
                  <div className="w-full">
                    <p className="text-center text-sm">Monthly Expenses</p>
                    <div className="bar w-full bg-[#f75486] h-3 my-2"></div>
                  </div>
                  <div className="income text-3xl font-bold text-[yellow] mb-2">${savings}</div>
                  <div className="w-full">
                    <p className="text-center text-sm">Monthly Savings</p>
                    <div className="bar w-full bg-[yellow] h-3 my-2" style={{ width: `${savingsPercentage}%` }}></div>
                  </div>
                  <div className="flex w-full items-center justify-between text-sm">
                    <p>{income > 0 ? `${savingsPercentage.toFixed(2)}%` : "0%"}</p>
                    <p>{savings >= 0 ? `${savings} saved` : `${-savings} overspent`}</p>
                  </div>
                </li>
              )}
            </ul>
          </div>
          <button
                onClick={handleNext}
                disabled={currentIndex === labelState.length - 1}
                className="hover:bg-blue-500 text-white font-bold py-2 px-4 shadow inline-flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FaArrowRight className="ml-2 text-xl" />
              </button>
        </div>
        <h1 className="text-main-darkPink font-bold text-2xl md:text-4xl lg:text-4xl mt-16 mb-8 tracking-wider text-center lg:text-left">
              How much are your Savings?
            </h1>
        <div className="flex py-10">
          <Barchart />
        </div>
        
        <ExportButtons />
      </div>
    </Layout>
  );
}

export default Overview;
