import React from "react";
import Layout from "../Layout/Layout";
import Search from "../../components/Search/Search";
import RecentBudget from "../../components/RecentBudget/RecentBudget";
import BudgetImage from "../../components/BudgetImage/BudgetImage";
import Scan from "../../components/Scan/Scan";
import RecentTransaction from "../../components/RecentTransaction/RecentTransaction";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaEdit } from "react-icons/fa";

export default function Dashboard() {
  const budgets = useSelector((state) => state.budgets.budgets);

  const compareCreatedAt = (a, b) => {
    const timeA = new Date(
      a?.createdAt?.seconds * 1000 + a?.createdAt?.nanoseconds / 1000000
    );
    const timeB = new Date(
      b?.createdAt?.seconds * 1000 + b?.createdAt?.nanoseconds / 1000000
    );
    return timeB - timeA;
  };

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

          <div className='flex flex-wrap justify-between items-center'>
            {/* ask ChatGPT to solve the problem: How can I solve this problem when I try to sort a new Date Cannot assign to read only property '0' of object '[object Array]'*/}
            {budgets.length > 0 ? (
              [...budgets]
                .sort(compareCreatedAt)
                .slice(0, 4)
                .map((budget, i) => (
                  <div key={i} className='flex-grow-0 relative'>
                    <RecentBudget budget={budget} />
                    <button
                      className='text-lg absolute top-0 right-0 bg-main-darkPurple p-2 rounded-lg z-10 cursor-pointer text-white'
                      // onClick={() => handleEdit(budget)}
                    >
                      <FaEdit />
                    </button>
                  </div>
                ))
            ) : (
              <Link to='/budget'>
                <button className='w-80 mb-5 p-4 bg-[#18001d] rounded-lg border border-main-neonPink shadow-lg hover:shadow-2xl transition-shadow duration-300 h-[145.6px] text-lg'>
                  Click to start budgeting
                </button>
              </Link>
            )}
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
