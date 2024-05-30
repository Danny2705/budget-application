import React from "react";
import Layout from "../Layout/Layout";
import RecentBudgetTransTable from "../../components/TransactionTable/RecentBudgetTransTable";
import PieChart from "../../components/Chart/PieChart";
import BarChart from "../../components/Chart/BarChart";

export default function Transaction() {
  return (
    <Layout>
      <div className="mt-[90px] px-4 xl:px-20">
        <h1 className="text-main-darkPink font-bold text-2xl md:text-4xl lg:text-4xl mt-20 tracking-wider text-center lg:text-left">
          Budget Name 1 Transaction Summary
        </h1>

        <div className="mt-8 px-4 xl:px-20 text-white">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="w-full lg:w-1/2">
              <img
                src="/calculator.png"
                alt="Calculator"
                className="w-full rounded-lg shadow-lg object-cover"
              />
            </div>
            <div className="w-full lg:w-1/2 text-center lg:text-left">
              <h2 className="text-xl lg:text-2xl font-semibold text-main-darkPink">
                Master the Principles of Budget Saving
              </h2>
              <p className="mt-4 text-lg">
                Understanding and applying budget saving principles is
                essential for financial stability. Learn how to create a budget,
                prioritize your spending, and set achievable savings goals. Our
                resources will help you make informed decisions, avoid common
                pitfalls, and maximize your savings potential.
              </p>
            </div>
          </div>
        </div>

        <div>
          <div className="w-full lg:w-1/2 flex flex-col gap-4 m-24">
            <div className="rounded-lg p-6 bg-white">
              <h2 className="text-xl font-bold mb-4">
                Budget Performance
              </h2>
              <div className="">
                <PieChart />
                <BarChart />
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center w-full justify-between">
          <h2 className="text-lg mt-12 text-main-neonPink neon-text-shadow">
            Recent Transactions
          </h2>
          <div>
            <h3 className="text-white">Search Bar</h3>
          </div>
        </div>

        <RecentBudgetTransTable />
      </div>
    </Layout>
  );
}
