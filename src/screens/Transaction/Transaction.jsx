import React from "react";
import Layout from "../Layout/Layout";
import RecentBudgetTransTable from "../../components/TransactionTable/RecentBudgetTransTable";
import PieChart from "../../components/Chart/PieChart";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Quotes from "../../components/Text/GenerateRandomQuote";

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
          {budgetInfo?.title} Budget Transaction Summary
        </h1>

        <div className='mt-8 px-4 xl:px-20 text-white'>
          <div className='flex flex-col lg:flex-row items-center gap-0'>
            <div className='w-full lg:w-1/2'>
              <PieChart />
            </div>
            <div className='w-full lg:w-1/2 text-center lg:text-left'>
              <h2 className='large-h1-span text-xl lg:text-5xl font-semibold text-main-darkPink h-[50px]'>
                Master the Principles of Budget Saving
              </h2>

              <p className='mt-4 text-lg'>
                <Quotes/>
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
      </div>
    </Layout>
  );
}
