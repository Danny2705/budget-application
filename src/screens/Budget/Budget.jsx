import React from "react";
import Layout from "../Layout/Layout";
import SetBudgetGoal from "../../components/SetBudgetGoal/SetBudgetGoal";
import ParticleRing from "../../components/ParticleRing/ParticleRing";
import CountUp from "react-countup";
import { Bar } from "react-chartjs-2";
import LineGraph from "../../components/Chart/LineGraph";
import Quotes from "../../components/Text/GenerateRandomQuote";

export default function Budget() {
  return (
    <Layout>
      <div className='mt-[60px] text-white'>
        <h1 className='text-main-darkPink text-2xl md:text-4xl lg:text-4xl mt-20 tracking-wider px-4 xl:px-20'>
          Budget Management
        </h1>

        <div className='mt-8 px-4 xl:px-20'>
          <div className='flex flex-col lg:flex-row items-center gap-8'>
            <div className='w-full lg:w-1/2'>
              <img
                src='/lap.png'
                alt='Setting Budget Goal'
                className='w-full rounded-lg shadow-lg object-cover'
              />
            </div>
            <div className='w-full lg:w-1/2 text-center lg:text-left'>
              <h2 className='large-h1-span text-xl lg:text-5xl font-semibold text-main-darkPink h-[50px]'>
                Let's keep track of Budget Goal
              </h2>
              <p className='mt-4 text-lg leading-8'>
                <Quotes />
              </p>
              <div className='mt-6 flex flex-col items-center lg:items-start'>
                <button className='px-6 py-3 bg-main-neonPink text-white font-semibold rounded-lg shadow-md hover:bg-neon-pink transition duration-300'>
                  Create New Budget
                </button>
                {/* Using template from landingfolio website and modify the countup by myself to make the transition*/}
                <section className='py-4'>
                  <div className='max-w-5xl w-full px-4 mx-auto sm:px-6 lg:px-8'>
                    <div className='grid grid-cols-1 gap-8 text-center sm:gap-x-8 md:grid-cols-3 mt-7'>
                      <div>
                        <h3 className='font-bold text-5xl'>
                          <span className='text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-600 to-blue-600'>
                            <CountUp start={30} end={50} duration={4} />
                            <span className='large-h1-span'>+</span>
                          </span>
                        </h3>
                        <p className='mt-4 text-base lg:text-xl font-medium text-gray-300'>
                          Budgets Created
                        </p>
                        <p className='text-base mt-0.5 text-gray-500'>
                          Helping plan finances
                        </p>
                      </div>

                      <div>
                        <h3 className='font-bold text-5xl'>
                          <span className='text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-600 to-blue-600'>
                            $<CountUp start={0} end={10} duration={4} />k
                            <span className='large-h1-span'>+</span>
                          </span>
                        </h3>
                        <p className='mt-4 text-base lg:text-xl font-medium text-gray-300'>
                          Total Savings
                        </p>
                        <p className='text-base mt-0.5 text-gray-500'>
                          Across all budgets
                        </p>
                      </div>
                      <div>
                        <h3 className='font-bold text-5xl'>
                          <span className='text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-600 to-blue-600'>
                            <CountUp start={5} end={20} duration={4} />
                            <span className='large-h1-span'>+</span>
                          </span>
                        </h3>
                        <p className='mt-4 text-base lg:text-xl font-medium text-gray-300'>
                          Active Users
                        </p>
                        <p className='text-base mt-0.5 text-gray-500'>
                          Managing budgets daily
                        </p>
                      </div>
                      {/* TODO: remove from this page */}
                      <div>{/* <LineGraph/> */}</div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>

          <div className='mt-12'>
            <SetBudgetGoal />
          </div>

          <div>
            <ParticleRing />
          </div>
        </div>
      </div>
    </Layout>
  );
}
