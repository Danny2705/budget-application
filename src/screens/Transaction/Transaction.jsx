import React from "react";
import Layout from "../Layout/Layout";
import RecentBudgetTransTable from "../../components/TransactionTable/RecentBudgetTransTable";
import PieChart from "../../components/Chart/PieChart";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Quotes from "../../components/Text/GenerateRandomQuote";
import CreateNewTransactionButton from "../../components/CreateTransaction/CreateNewTransactionButton";

export default function Transaction() {
  const { id } = useParams();
  const budgets = useSelector((state) => state.budgets.budgets);
  const budgetInfo = budgets.find((budget) => budget.id === id);

  console.log("Budget ID:", budgetInfo.id);

  console.log("Budgets:", budgets);
  console.log("Budget Info:", budgetInfo);

  return (
    <Layout>
      <div className='mt-[90px] px-4 xl:px-20'>
        <h1 className='text-main-darkPink text-2xl md:text-4xl lg:text-4xl mt-20 tracking-wider text-center lg:text-left capitalize flex gap-3'>
          <div
            className='text-white font-bold 
          '
          >
            {budgetInfo?.title}
          </div>{" "}
          <div>Budget {budgetInfo?.titleLocal} Transaction Summary</div>
        </h1>
        <div className='flex flex-col lg:flex-row items-center gap-8 text-white'>
          <PieChart />
          <div className='w-full lg:w-1/2 text-center lg:text-left'>
            <h2 className='large-h1-span text-xl lg:text-5xl font-semibold text-main-darkPink py-4'>
              Master the Principles of Budget Saving
            </h2>
            <p className='mt-4 text-lg leading-8'>
              <Quotes />
            </p>
          </div>
        </div>

        <div></div>

        <RecentBudgetTransTable />
        <CreateNewTransactionButton budgetIDNo={budgetInfo.id} />
      </div>
    </Layout>
  );
}
