import React, { useState, useEffect } from "react";
import Layout from "../Layout/Layout";
import Search from "../../components/Search/Search";
import RecentBudget from "../../components/RecentBudget/RecentBudget";
import BudgetImage from "../../components/BudgetImage/BudgetImage";
import Scan from "../../components/Scan/Scan";
import RecentTransaction from "../../components/RecentTransaction/RecentTransaction";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaEdit } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import LineGraph from "../../components/Chart/LineGraph";

export default function Dashboard() {
  const budgets = useSelector((state) => state.budgets.budgets);
  const [isLoading, setIsLoading] = useState(true);
  const user = useSelector((state) => state.auth.user);
  console.log(user);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

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
      <div className="mt-[90px]">
        <div>
          <Search />
        </div>

        <div className="relative h-[300px] lg:h-[700px] md:h-[600px] sm:h-[500px] xl:h-[880px] w-full mt-[1rem] flex items-start justify-between px-4 xl:px-20">
          <h1 className="main-span font-bold mt-4 tracking-wider z-10 w-full text-[12vw] lg:w-[70%] xl:text-[7rem] lg:text-[6rem] md:text-[5.5rem] sm:text-[4rem] right-0 text-right px-4 xl:px-20">
            Innovative Scanning
          </h1>
          <div className="w-full flex flex-col justify-end items-end mt-[250px]">
            <div className="flex gap-4 my-10">
              <button className="text-white border border-main-neonPink px-[25px] py-[9px] z-10 duration-700 transition-all hover:bg-gradient-to-br hover:from-pink-600 hover:via-red-500 hover:to-purple-700 text-lg">
                Dive into our Technology
              </button>

              <button className="text-white bg-main-neonPink px-[25px] py-[9px] z-10 hover:bg-gradient-to-br hover:from-pink-600 hover:via-red-500 hover:to-purple-700 duration-500 transition-all text-lg">
                Learn about our Mission
              </button>
            </div>

            <h2 className="text-white max-w-[19ch] text-2xl font-bold mb-4">
              Welcome to VioVault
            </h2>
            <p className="text-white w-full text-[20px] text-right leading-[160%] max-w-[30ch]">
              Seamlessly manage your{" "}
              <span className="text-main-neonPink">finances</span> with advanced
              receipt <span className="text-main-neonPink">scanning</span> and{" "}
              <span className="text-main-neonPink">expense tracking</span>{" "}
              capabilities.
            </p>
          </div>
          <img
            src="/receipt-background.png"
            alt="Receipt Background"
            className="absolute left-0 object-cover h-full z-0 w-full lg:w-[70%] xl:w-[80%] overflow-hidden"
          />
        </div>

        <div className="mt-4 px-4 xl:px-20">
          <div className="flex items-center justify-between">
            <h2 className="large-h1-span my-2 text-lg md:text-2xl font-bold tracking-wide">
              Recent Budgets
            </h2>
            <Link to="/budget">
              <button className="text-white text-sm">View more budgets</button>
            </Link>
          </div>

          <div className="grid grid-cols-4 gap-8">
            {/* ask ChatGPT to solve the problem: How can I solve this problem when I try to sort a new Date Cannot assign to read only property '0' of object '[object Array]'*/}
            {isLoading ? (
              Array(4)
                .fill()
                .map((_, i) => (
                  <div key={i} className="w-80 py-2">
                    <Skeleton height={150} />
                  </div>
                ))
            ) : budgets.length > 0 ? (
              [...budgets]
                .sort(compareCreatedAt)
                .slice(0, 4)
                .map((budget, i) => (
                  <div
                    key={i}
                    className="flex-grow-0 relative my-2 items-center"
                  >
                    <RecentBudget budget={budget} />
                    <button className="text-lg absolute top-0 right-0 bg-main-darkPurple p-2 rounded-lg z-10 cursor-pointer text-white">
                      <FaEdit />
                    </button>
                  </div>
                ))
            ) : (
              <Link to="/budget">
                <button className="w-80 mb-5 p-4 bg-[#18001d] rounded-lg border border-main-neonPink shadow-lg hover:shadow-2xl transition-shadow duration-300 h-[145.6px] text-lg text-white">
                  Click to start budgeting
                </button>
              </Link>
            )}
          </div>

          <div>{isLoading ? <Skeleton height={450} /> : <BudgetImage />}</div>

          <div className="">
            <LineGraph />
          </div>

          <div className="mt-5">
            <h2 className="large-h1-span text-lg md:text-2xl font-bold tracking-wide">
              Recent Transactions
            </h2>
            {isLoading ? (
              <Skeleton count={1} height={350} />
            ) : (
              <RecentTransaction />
            )}
          </div>

          <div className="mt-5">
            <h2 className="large-h1-span text-lg md:text-2xl font-bold tracking-wider text-center ">
              Intelligent OCR Technology
            </h2>
            {isLoading ? <Skeleton height={300} /> : <Scan />}
          </div>
        </div>
      </div>
    </Layout>
  );
}
