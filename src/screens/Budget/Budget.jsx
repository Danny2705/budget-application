import React from "react";
import Layout from "../Layout/Layout";
import SetBudgetGoal from "../../components/SetBudgetGoal/SetBudgetGoal";
import ParticleRing from "../../components/ParticleRing/ParticleRing";

export default function Budget() {
  return (
    <Layout>
      <div className='mt-[60px] text-white'>
        <h1 className='text-main-darkPink font-bold text-2xl md:text-4xl lg:text-4xl mt-20 tracking-wider px-4 xl:px-20 text-center lg:text-left'>
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
              <h2 className='large-h1-span text-xl lg:text-5xl font-semibold text-main-darkPink w-[500px] h-[100px]'>
                Let's keep track of your Budget Goal
              </h2>
              <p className='mt-4 text-lg w-[500px] leading-8'>
                Effective budgeting is key to financial success. Use our tools
                and tips to manage your budget, set financial goals, and track
                your progress. Whether you are saving for a big purchase or just
                trying to manage your monthly expenses, we've got you covered.
              </p>
              <div className='mt-6 flex flex-col items-center lg:items-start'>
                <button className='px-6 py-3 bg-main-neonPink text-white font-semibold rounded-lg shadow-md hover:bg-neon-pink transition duration-300'>
                  Create New Budget
                </button>
                <div className='mt-4 text-lg'>
                  <ul className='flex items-center gap-4 money'>
                    {/* <img src='/coin.png' alt='Coin' width={150} />
                    <img src='/dollar.png' alt='' width={150} />
                    <img src='/card.png' alt='' width={150} /> */}
                  </ul>
                </div>
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
