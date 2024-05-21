import React from "react";
import Layout from "../Layout/Layout";
import { useSelector } from "react-redux";
import Search from "../../components/Search/Search";
import RecentBudget from "../../components/RecentBudget/RecentBudget";
import BudgetImage from "../../components/BudgetImage/BudgetImage";
import Scan from "../../components/Scan/Scan";
import RecentTransaction from "../../components/RecentTransaction/RecentTransaction";

export default function Dashboard() {
  const user = useSelector((state) => state.auth.user);
  console.log(user);
  return (
    <Layout>
      <div className='mt-[90px]'>
        <div>
          <Search />
        </div>

        <h1 className=' text-main-darkPink font-bold text-xl md:text-4xl lg:text-4xl mt-4 tracking-wider px-4 xl:px-20'>
          Good morning,{" "}
          <span className='text-[#801AE5]'>{user.displayName}!</span>
        </h1>

        <div className='h-[300px] lg:h-[460px] w-full mt-[1rem]'>
          <img
            src='/banner.jpg'
            alt='Recipe Machine'
            className=' object-cover h-full w-full'
          />
        </div>

        <div className='mt-4 px-4 xl:px-20'>
          <div className='flex items-center justify-between'>
            <h2 className='text-[#E5E8EB] text-lg md:text-2xl font-bold tracking-wide'>
              Recent Budgets
            </h2>
            <button className='text-white text-sm'>View more budgets</button>
          </div>

          <div className="flex items-center w-full gap-10">
            <RecentBudget />
            <RecentBudget />
            <RecentBudget />
          </div>

          <div>
            <BudgetImage />
          </div>
    
          <div className="mt-5">
      
            <h2 className='text-[#E5E8EB] text-lg md:text-2xl font-bold tracking-wide'>
              Recent Budgets
            </h2>
            <RecentTransaction />
          </div>
          
          <div>
            <Scan />
          </div>
        </div>
      </div>
    </Layout>
  );
}
