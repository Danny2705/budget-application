import React, { useState } from "react";
import Layout from "../Layout/Layout";
import Barchart from "../../components/Chart/BarChart";
import { Report, ExportButtons } from "../../components/BudgetAnalysis/Insights";
import useExpenseData from "../../components/Chart/BarData";

const Overview = () => {
  const { labelState, totalMoneySpent, totalBudgetLimit } = useExpenseData();
  const [currentIndex, setCurrentIndex] = useState(0);

  const reportData = labelState.map((month) => {
    const spent = totalMoneySpent[month] || 0;
    const budgetLimit = totalBudgetLimit[month] || 0;
    const savings = budgetLimit - spent;

    const [monthName, year] = month.split(" ");
    return {
      month: monthName,
      year: year,
      totalIncome: budgetLimit,
      totalExpenses: spent,
      totalSavings: savings,
    };
  });

  const handleNext = () => {
    if (currentIndex < reportData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const currentMonthData = reportData[currentIndex];

  return (
    <Layout>
      <div className="mt-[90px] px-4 xl:px-20">
        <div className="overview-header text-white flex flex-col items-center justify-between gap-2">
          <div className="stats w-full">
            <ul className="flex flex-col items-center gap-2 w-full">
              <li className="flex flex-col items-center justify-center p-3 w-full bg-[#142038] rounded-md mb-4">
                <div className="month text-3xl font-bold text-center mb-4">
                  {`${currentMonthData.month} ${currentMonthData.year}`}
                </div>
                <div className="income text-3xl text-green-500 font-bold mb-2">
                  ${currentMonthData.totalIncome}
                </div>
                <div className="w-full">
                  <p className="text-center text-sm">Total Income</p>
                  <div className="bar w-full bg-green-500 h-3 my-2"></div>
                </div>
                <div className="income text-3xl font-bold text-[#f75486] mb-2">
                  ${currentMonthData.totalExpenses}
                </div>
                <div className="w-full">
                  <p className="text-center text-sm">Total Expenses</p>
                  <div className="bar w-full bg-[#f75486] h-3 my-2"></div>
                </div>
                <div className="income text-3xl font-bold text-[yellow] mb-2">
                  ${currentMonthData.totalSavings}
                </div>
                <div className="w-full">
                  <p className="text-center text-sm">Total Savings</p>
                  <div className="bar w-full bg-[yellow] h-3 my-2"></div>
                </div>
                <div className="flex w-full items-center justify-between text-sm">
                  <p>{currentMonthData.totalIncome > 0 ? `${(currentMonthData.totalExpenses / currentMonthData.totalIncome) * 100}%` : "0%"}</p>
                  <p>{currentMonthData.totalSavings >= 0 ? `${currentMonthData.totalSavings} saved` : `${-currentMonthData.totalSavings} overspent`}</p>
                </div>
              </li>
            </ul>
          </div>
          <div className="flex justify-between w-full mt-4">
            <button
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              disabled={currentIndex === reportData.length - 1}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>

        <div className="flex py-10">
          <Barchart />
        </div>
        
        <ExportButtons />
      </div>
    </Layout>
  );
};

export default Overview;
