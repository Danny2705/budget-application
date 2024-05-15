import React from "react";
import Layout from "../Layout/Layout";
import { IoSearch } from "react-icons/io5";
import { useSelector } from "react-redux";
import Search from "../../components/Search/Search";
import RecentBudget from "../../components/RecentBudget/RecentBudget";
import BudgetImage from "../../components/BudgetImage/BudgetImage";
// import UploadTrans from "../../components/UploadTrans/UploadTrans";

export default function Dashboard() {
  const user = useSelector((state) => state.auth.user);
  console.log(user);
  return (
    <Layout>
      <div className='mt-[90px]'>
        <div>
          <Search />
        </div>

        <h1 className='intro-text text-main-darkPink font-bold text-4xl mt-[1rem] tracking-wider px-20 flex gap-2'>
          Good morning,
          <span className='text-[#801AE5]'>{user.displayName}!</span>
        </h1>

        <div className='h-[460px] w-full mt-[1rem]'>
          <img
            src='/banner.jpg'
            alt='Recipe Machine'
            className=' object-cover h-full w-full'
          />
        </div>

        <div className='mt-4 px-20'>
          <div className='flex items-center justify-between'>
            <h2 className='text-[#E5E8EB] text-2xl font-bold tracking-wide'>
              Recent Budgets
            </h2>
            <button className='text-white'>View more budgets</button>
          </div>

          <div>
            <RecentBudget />
          </div>

          <div className='mt-6'>
            <BudgetImage />
          </div>

          {/* <div>
            <UploadTrans />
          </div> */}
        </div>
      </div>
    </Layout>
  );
}
