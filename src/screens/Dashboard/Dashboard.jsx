import React from "react";
import Layout from "../Layout/Layout";
import Search from "../../components/Search/Search";
import RecentBudget from "../../components/RecentBudget/RecentBudget";
import BudgetImage from "../../components/BudgetImage/BudgetImage";
import Scan from "../../components/Scan/Scan";
import RecentTransaction from "../../components/RecentTransaction/RecentTransaction";
import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <Layout>
      <div className='mt-[90px]'>
        <div>
          <Search />
        </div>

        <div className='relative h-[300px] lg:h-[700px] w-full mt-[1rem] flex items-start justify-between px-4 xl:px-20'>
          <h1 className='main-span font-bold mt-4 tracking-wider z-10 w-[55%] lg:w-[70%] right-0 text-right px-4 xl:px-20'>
            Innovative Scanning
          </h1>
          <img
            src='/receipt-background.png'
            alt='Receipt Background'
            className='absolute left-0 object-cover h-full z-0 w-[60%] lg:w-[70%] xl:w-[80%]'
          />
        </div>

        <div className='mt-4 px-4 xl:px-20'>
          <div className='flex items-center justify-between'>
            <h2 className='large-h1-span my-2 text-lg md:text-2xl font-bold tracking-wide'>
              Recent Budgets
            </h2>
            <Link to='/budget'>
              <button className='text-white text-sm'>View more budgets</button>
            </Link>
          </div>

          <div className='flex flex-wrap w-full justify-between'>
            <RecentBudget />
            <RecentBudget />
            <RecentBudget />
          </div>

          <div>
            <BudgetImage />
          </div>

          <div className='mt-5'>
            <h2 className='large-h1-span text-lg md:text-2xl font-bold tracking-wide'>
              Recent Transactions
            </h2>
            <RecentTransaction />
          </div>

          <div className='mt-5'>
            <h2 className='large-h1-span text-lg md:text-2xl font-bold tracking-wider text-center '>
              Intelligent OCR Technology
            </h2>
            <Scan />
          </div>
        </div>
      </div>
    </Layout>
  );
}
