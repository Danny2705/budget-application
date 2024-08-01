import React from "react";
import Layout from "../Layout/Layout";

export default function Overview() {
  return (
    <Layout>
      <div className='mt-[90px] px-4 xl:px-20'>
        <div className='overview-header text-white flex items-center justify-between gap-2'>
          <div className='month flex-1'>
            <h1 className=' text-5xl bg-[#142038] py-[2.85rem] p-8 text-center font-bold  rounded-md'>
              January
            </h1>
          </div>

          <div className='stats flex-[1.5]'>
            <ul className='flex items-center gap-2 w-full'>
              <li className='flex flex-col items-center justify-center p-3 flex-1 bg-[#142038] w-full  rounded-md'>
                <div className='income text-3xl text-green-500 font-bold'>
                  $6,175
                </div>
                <div className='w-full mt-3'>
                  <p className='text-center text-sm'>Total Income</p>
                  <div className='bar w-full bg-green-500 h-3 my-2'></div>
                </div>
                <div className='flex w-full items-center justify-between text-sm text-green-500'>
                  <p>101%</p>
                  <p>$50 over goal</p>
                </div>
              </li>
              <li className='flex flex-col items-center justify-center p-3 flex-1 bg-[#142038] w-full  rounded-md'>
                <div className='income text-3xl font-bold text-[#f75486]'>
                  $2,765
                </div>
                <div className='w-full mt-3'>
                  <p className='text-center text-sm'>Total Expenses</p>
                  <div className='bar w-full bg-[#f75486] h-3 my-2'></div>
                </div>
                <div className='flex w-full items-center justify-between text-sm text-[#f75486]'>
                  <p>100%</p>
                  <p>On goal</p>
                </div>
              </li>
              <li className='flex flex-col items-center justify-center p-3 flex-1 bg-[#142038] w-full  rounded-md'>
                <div className='income text-3xl font-bold text-[yellow]'>
                  $2,510
                </div>
                <div className='w-full mt-3'>
                  <p className='text-center text-sm'>Total Savings</p>
                  <div className='bar w-full bg-[yellow] h-3 my-2'></div>
                </div>
                <div className='flex w-full items-center justify-between text-sm text-[yellow]'>
                  <p>93%</p>
                  <p>$175 under goal</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
}

/**
 * import React from 'react';

const Overview = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <header className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Monthly Overview</h1>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-4 rounded-lg shadow text-center border-l-4 border-green-500">
          <h2 className="text-xl font-semibold text-gray-700">Total Income</h2>
          <p className="text-2xl font-bold text-gray-900">$6,175</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow text-center border-l-4 border-red-500">
          <h2 className="text-xl font-semibold text-gray-700">Total Expenses</h2>
          <p className="text-2xl font-bold text-gray-900">$2,765</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow text-center border-l-4 border-yellow-500">
          <h2 className="text-xl font-semibold text-gray-700">Total Savings</h2>
          <p className="text-2xl font-bold text-gray-900">$2,510</p>
        </div>
      </div>
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Monthly Budget Analysis</h2>
        <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center text-gray-600 text-xl">
          Bar Graph Here
        </div>
      </div>
      <div className="text-center">
        <button className="bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md m-2 hover:bg-blue-700 transition duration-300">
          Download PDF Report
        </button>
        <button className="bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md m-2 hover:bg-blue-700 transition duration-300">
          Download CSV
        </button>
        <button className="bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md m-2 hover:bg-blue-700 transition duration-300">
          Download Excel
        </button>
      </div>
    </div>
  );
};

export default Overview;

 * **/