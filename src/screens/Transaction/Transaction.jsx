import React from "react";
import Layout from "../Layout/Layout";
import RecentBudgetTransTable from "../../components/TransactionTable/RecentBudgetTransTable";
import PieChart from "../../components/Chart/PieChart";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Quotes from "../../components/Text/GenerateRandomQuote";
import CreateNewTransactionButton from "../../components/CreateTransaction/CreateNewTransactionButton";

export default function Transaction() {
  const params = useParams();
  const budgets = useSelector((state) => state.budgets.budgets);
  const budgetInfo = budgets.find((budget) => budget.id === params.id);

  return (
    <Layout>
      <div className="mt-[90px] px-4 xl:px-20">
        <h1 className="text-main-darkPink text-2xl md:text-4xl lg:text-4xl mt-20 tracking-wider text-center lg:text-left capitalize flex gap-3">
          <div
            className="text-white font-bold 
          "
          >
            {budgetInfo?.title}
          </div>{" "}
          <div>Budget Transaction Summary</div>
        </h1>
        <div className="flex flex-col lg:flex-row items-center gap-8 text-white">
          <PieChart />
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <h2 className="large-h1-span text-xl lg:text-5xl font-semibold text-main-darkPink py-4">
              Master the Principles of Budget Saving
            </h2>
            <p className="mt-4 text-lg leading-8">
              <Quotes />
            </p>
          </div>
        </div>

        <div></div>
        <div className="flex items-center w-full justify-between">
          <h2 className="text-lg mt-12 text-main-neonPink neon-text-shadow">
            Recent Transactions
          </h2>
          <div>
            <h3 className="text-white">Search Bar</h3>
          </div>
        </div>
        <RecentBudgetTransTable />
        <CreateNewTransactionButton/>
      </div>
    </Layout>
  );
}
