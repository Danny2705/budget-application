import React from "react";
import Layout from "../Layout/Layout";
import NewBudget from "../../components/NewBudget/NewBudget";

export default function Transaction() {
  // TODO:see calendar component render on page
  // REMOVE component and insert where needed
  return (
    <Layout>
      <h1 className="mt-[60px]"></h1>
      <div>
        <NewBudget />
      </div>
    </Layout>
  );
}
