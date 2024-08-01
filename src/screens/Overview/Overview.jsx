import React, { useState } from "react";
import Layout from "../Layout/Layout";
import Barchart from "../../components/Chart/BarChart";
import { useSelector } from "react-redux";
import useExpenseData from "../../components/Chart/BarData";
import { ReportDocument, ExportButtons } from "../../components/BudgetAnalysis/Insights";

const Overview = () => {
  const { labelState, totalMoneySpent, totalBudgetLimit } = useExpenseData();

  return (
    <Layout>
      <div className="mt-[90px] px-4 xl:px-20">
        <div className="overview-header text-white flex flex-col items-center justify-between gap-2">
          <div className="stats w-full">
            <ul className="flex flex-col items-center gap-2 w-full">
              {labelState.map((month, index) => {
                const spent = totalMoneySpent[month] || 0;
                const budgetLimit = totalBudgetLimit[month] || 0;
                const savings = budgetLimit - spent;
                return (
                  <li key={index} className="flex flex-col items-center justify-center p-3 w-full bg-[#142038] rounded-md mb-4">
                    <div className="month text-3xl font-bold text-center mb-4">{month}</div>
                    <div className="income text-3xl text-green-500 font-bold mb-2">${budgetLimit}</div>
                    <div className="w-full">
                      <p className="text-center text-sm">Total Income</p>
                      <div className="bar w-full bg-green-500 h-3 my-2"></div>
                    </div>
                    <div className="income text-3xl font-bold text-[#f75486] mb-2">${spent}</div>
                    <div className="w-full">
                      <p className="text-center text-sm">Total Expenses</p>
                      <div className="bar w-full bg-[#f75486] h-3 my-2"></div>
                    </div>
                    <div className="income text-3xl font-bold text-[yellow] mb-2">${savings}</div>
                    <div className="w-full">
                      <p className="text-center text-sm">Total Savings</p>
                      <div className="bar w-full bg-[yellow] h-3 my-2"></div>
                    </div>
                    <div className="flex w-full items-center justify-between text-sm">
                      <p>{budgetLimit > 0 ? `${(spent / budgetLimit) * 100}%` : "0%"}</p>
                      <p>{savings >= 0 ? `${savings} saved` : `${-savings} overspent`}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="flex py-10">
          <Barchart />
        </div>
        
        <ExportButtons />
      </div>
    </Layout>
  );
}

export default Overview;
