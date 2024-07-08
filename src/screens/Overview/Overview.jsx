import React from "react";
import Layout from "../Layout/Layout";

export default function Overview() {
  const incomeTableData = [
    { category: "Salary", goal: 3200, actual: 3250, diff: 50 },
    { category: "Partner Salary", goal: 2800, actual: 2800, diff: 0 },
    { category: "Side Hustle", goal: 450, actual: 460, diff: 10 },
  ];

  const expensesTableData = [
    { category: "Rent", budget: 1200, actual: 1250, diff: -50 },
    { category: "Utilities", budget: 300, actual: 280, diff: 20 },
    { category: "Groceries", budget: 500, actual: 510, diff: -10 },
  ];

  return (
    <Layout>
      <div className="mt-[90px] px-4 xl:px-20">
        <div>
          <h1 className="text-white">Overview</h1>
          <div className="p-6 bg-gray-900 text-white min-h-screen">
            <h1 className="text-3xl font-bold mb-6">Budget Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Income Table Placeholder */}
              <div className="p-4 bg-gray-800 text-white rounded-lg">
                <h2 className="text-xl font-bold mb-4">Income</h2>
                <table className="w-full">
                  <thead>
                    <tr>
                      <th>Category</th>
                      <th>Goal</th>
                      <th>Actual</th>
                      <th>Diff</th>
                    </tr>
                  </thead>
                  <tbody>
                    {incomeTableData.map((item, index) => (
                      <tr key={index}>
                        <td>{item.category}</td>
                        <td>{item.goal}</td>
                        <td>{item.actual}</td>
                        <td>{item.diff}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Expenses Table Placeholder */}
              <div className="p-4 bg-gray-800 text-white rounded-lg">
                <h2 className="text-xl font-bold mb-4">Expenses</h2>
                <table className="w-full">
                  <thead>
                    <tr>
                      <th>Category</th>
                      <th>Budget</th>
                      <th>Actual</th>
                      <th>Diff</th>
                    </tr>
                  </thead>
                  <tbody>
                    {expensesTableData.map((item, index) => (
                      <tr key={index}>
                        <td>{item.category}</td>
                        <td>{item.budget}</td>
                        <td>{item.actual}</td>
                        <td>{item.diff}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pie Chart Placeholder */}
              <div className="col-span-2 p-4 bg-gray-800 text-white rounded-lg">
                <h2 className="text-xl font-bold mb-4">
                  Monthly Income Breakdown
                </h2>
                <div className="h-64">[Pie Chart Placeholder]</div>
              </div>

              {/* Line Graph Placeholder */}
              <div className="col-span-2 p-4 bg-gray-800 text-white rounded-lg">
                <h2 className="text-xl font-bold mb-4">Total Daily Expenses</h2>
                <div className="h-64">[Line Graph Placeholder]</div>
              </div>
            </div>
          </div>
          );
        </div>
      </div>
    </Layout>
  );
}
