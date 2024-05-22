import React from "react";
import Layout from "../Layout/Layout";
import LineChart from "../../components/LineChart";
import RecentBudgetTransTable from "../../components/TransactionTable/RecentBudgetTransTable";

// Sample data
const sampleData = [
  { date: new Date(2023, 0, 1), value: 30 },
  { date: new Date(2023, 0, 2), value: 20 },
  { date: new Date(2023, 0, 3), value: 50 },
  { date: new Date(2023, 0, 4), value: 40 },
  { date: new Date(2023, 0, 5), value: 60 },
  { date: new Date(2023, 0, 6), value: 30 },
  { date: new Date(2023, 0, 7), value: 70 },
];

export default function Transaction() {
  return (
    <Layout>
      <div className='mt-[90px] px-4 xl:px-20'>
        <h1 className='text-main-darkPink font-bold text-2xl md:text-4xl lg:text-4xl mt-20 tracking-wider text-center lg:text-left'>
          Budget Name 1 Transaction Summary
        </h1>

        <div className='mt-8 flex flex-col lg:flex-row items-center gap-8'>
          <div className='w-full lg:w-1/2'>
            <img
              src='/calculator.png'
              alt='Calculator'
              className='w-full rounded-lg shadow-lg object-cover'
            />
          </div>
          <div className='w-full lg:w-1/2 flex flex-col gap-4'>
            <div className='bg-white bg-opacity-75 backdrop-blur-md rounded-lg p-6 shadow-lg'>
              <h2 className='text-xl font-bold mb-4 text-neon-pink'>
                Budget Performance
              </h2>
              <LineChart data={sampleData} width={600} height={450} />
            </div>
          </div>
        </div>
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
