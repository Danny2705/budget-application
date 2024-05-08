import React from "react";
import Layout from "../Layout/Layout";
import { IoSearch } from "react-icons/io5";
import { useSelector } from "react-redux";
import Search from "../../components/Search/Search";
import RecentBudget from "../../components/RecentBudget/RecentBudget";

export default function Dashboard() {
  const user = useSelector((state) => state.auth.user);
  console.log(user);
  return (
    <Layout>
      <div className='mt-[90px]'>
        <div>
          <Search />
        </div>

        <h1 className='text-main-darkPink font-bold text-4xl mt-[1rem] tracking-wider px-20'>
          Good morning,{" "}
          <span className='text-[#801AE5]'>{user.displayName}!</span>
        </h1>

        <div className='h-[460px] w-full mt-[1rem]'>
          <img
            src='/banner.jpg'
            alt='Recipe Machine'
            className=' object-cover h-full w-full'
          />
        </div>

        <div className='mt-[1rem] px-20'>
          <div className='flex items-center justify-between'>
            <h2 className='text-[#E5E8EB] text-2xl font-bold tracking-wide'>
              Recent Budgets
            </h2>
            <button className='text-white'>View more budgets</button>
          </div>

          <div>
            <RecentBudget />
          </div>
        </div>
      </div>
    </Layout>
  );
}
