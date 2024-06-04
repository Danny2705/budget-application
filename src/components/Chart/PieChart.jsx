// Reference: a) "Chart.js documentation for charts" - https://www.chartjs.org/docs/latest/charts/doughnut.html#pie b) ChatGPT refence chartjs-2
//
import { Pie } from "react-chartjs-2";
import { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { transactionData } from "../TransactionTable/Data";


ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChart({ transactionDetails }) {
  const [transactionLables, setTransactionLabels] = useState([]);
  const [transactionAmount, setTransactionAmount] = useState([]);
  // const [randomColor, setRandomColor] = useState("");

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "left",
      },
    },
  };

  const pieChartData = {
    labels: transactionLables,
    datasets: [
      {
        label: "Pie Chart Describing transaction category versus money spent",
        data: transactionAmount,
        borderColor: "none",
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
        ],
        hoverOffset: 4,
      },
    ],
  };
  // can possibly add dates to differentiate categories in piechart
  useEffect(() => {
    const transVenders = transactionData.map(
      (transaction) => transaction.Vender + " " + transaction.Category // + transaction.Date
    );
    const transAmount = transactionData.map((transaction) => transaction.Total);
    // Generate random color feature 
    // const generateRandomColor = () => {
    //   setRandomColor(Math.random().toString(16).substr(-6));
    // }
    setTransactionAmount(transAmount);
    setTransactionLabels(transVenders);
  }, [transactionData]);

  return (
    <div>
      <div className="w-[700px] h-[500px]">
        <Pie options={options} data={pieChartData} />
      </div>
    </div>
  );
}
