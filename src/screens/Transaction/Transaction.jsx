import React from "react";
import Layout from "../Layout/Layout";
import RecentBudgetTransTable from "../../components/TransactionTable/RecentBudgetTransTable";
import PieChart from "../../components/Chart/PieChart";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { CreateNewTransactionButton } from "../../components/CreateTransaction/CreateNewTransactionButton";


export default function Transaction() {
  const params = useParams();
  const budgets = useSelector((state) => state.budgets.budgets);

  // SMALL FIX: run localhost:3000/transaction/{needs}
  const budgetInfo = budgets.find((budget) => budget.id === params.id);
  // console.log(budgetInfo);
  return (
    <Layout>
      <div className='mt-[90px] px-4 xl:px-20'>
        <h1 className='text-main-darkPink font-bold text-2xl md:text-4xl lg:text-4xl mt-20 tracking-wider text-center lg:text-left'>
          {budgetInfo?.title} Budget - Transaction Summary
        </h1>

        <div className='mt-8 px-4 xl:px-20 text-white'>
          <div className='flex flex-col lg:flex-row items-center gap-8'>
            <div className='w-full lg:w-1/2'>
              <h2 className='text-xl font-bold mb-4'>Budget Performance</h2>
              <PieChart />
            </div>
            <div className='w-full lg:w-1/2 text-center lg:text-left'>
              <h2 className='text-xl lg:text-2xl font-semibold text-main-darkPink'>
                Master the Principles of Budget Saving
              </h2>

              <p className='mt-4 text-lg'>
                Understanding and applying budget saving principles is essential
                for financial stability. Learn how to create a budget,
                prioritize your spending, and set achievable savings goals. Our
                resources will help you make informed decisions, avoid common
                pitfalls, and maximize your savings potential.
              </p>
            </div>
          </div>
        </div>

        <div></div>
        <div className='flex items-center w-full justify-between'>
          <h2 className='text-lg mt-12 text-main-neonPink neon-text-shadow'>
            Recent Transactions
          </h2>
          <div>
            <h3 className='text-white'>Search Bar</h3>
          </div>
        </div>
        <RecentBudgetTransTable />
        <CreateNewTransactionButton />
      </div>
    </Layout>
  );
}
