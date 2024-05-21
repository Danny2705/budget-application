import React from "react";
import Layout from "../Layout/Layout";

// TODO: see calendar component render on page
// REMOVE component and insert where needed
import NewBudget from "../../components/NewBudget";

export default function Budget() {
  return (
    <Layout>
      <h1 className='mt-[60px] text-white'>Budget</h1>
      <div>
        <NewBudget/>
      </div>
    </Layout>
  );
}
