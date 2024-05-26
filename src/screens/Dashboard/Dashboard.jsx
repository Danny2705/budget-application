import React, { useState, useEffect } from "react";
import Layout from "../Layout/Layout";
import { useSelector } from "react-redux";
import Search from "../../components/Search/Search";
import RecentBudget from "../../components/RecentBudget/RecentBudget";
import BudgetImage from "../../components/BudgetImage/BudgetImage";
import Scan from "../../components/Scan/Scan";
import RecentTransaction from "../../components/RecentTransaction/RecentTransaction";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const user = useSelector((state) => state.auth.user);
  const [greets, setGreets] = useState("");

  useEffect(() => {
    const getGreeting = () => {
      const date = new Date();
      const currentHour = date.getHours();
      if (currentHour >= 6 && currentHour < 12) {
        setGreets("Good morning");
      } else if (currentHour >= 12 && currentHour < 18) {
        setGreets("Good afternoon");
      } else if (currentHour >= 18 && currentHour < 24) {
        setGreets("Good evening");
      } else {
        setGreets("Welcome back");
      }
    };

    // chatGPT asking for "update greeting every minute without refreshing the page "
    // Initial call to set greeting
    getGreeting();

    // Update greeting every minute
    const intervalId = setInterval(getGreeting, 60000);

    // Cleanup function to clear interval
    return () => clearInterval(intervalId);

  }, [user]);

  return (
    <Layout>
      <div className="mt-[90px]">
        <div>
          <Search />
        </div>

        <h1 className="text-main-neonPink font-bold text-xl md:text-4xl lg:text-4xl mt-4 tracking-wider px-4 xl:px-20">
          {greets}, <span className="text-[#801AE5]">{user.displayName}!</span>
        </h1>

        <div className="h-[300px] lg:h-[460px] w-full mt-[1rem]">
          <img
            src="/banner.jpg"
            alt="Recipe Machine"
            className=" object-cover h-full w-full"
          />
        </div>

        <div className='mt-4 px-4 xl:px-20'>
          <div className='flex items-center justify-between'>
            <h2 className='large-h1-span my-2 text-lg md:text-2xl font-bold tracking-wide'>
              Recent Budgets
            </h2>
            <Link to='/budget'>
              <button className='text-white text-sm'>
                View more budgets
              </button>
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
