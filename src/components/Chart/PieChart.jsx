// Reference: a) "Chart.js documentation for charts" - https://www.chartjs.org/docs/latest/charts/doughnut.html#pie b) ChatGPT refence chartjs-2
//
import { Pie } from "react-chartjs-2";
import { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { transactionData } from "../TransactionTable/Data";


ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChart() {
  const [transactionLables, setTransactionLabels] = useState([]);
  const [transactionAmount, setTransactionAmount] = useState([]);
  const [randomColor, setRandomColor] = useState("");

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
        backgroundColor: randomColor,
        hoverOffset: 4,
      },
    ],
  };

  useEffect(() => {
    const transVenders = transactionData.map(
      (transaction) => transaction.Vender + " " + transaction.Category 
    );
    const transLabels = transactionData.map((transaction) => {})
    const transAmount = transactionData.map((transaction) => transaction.Total);
    const generateRandomColor = () => {
      const letters = '0123456789ABCDEF';
      let color = '#';
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    };

    const colors = transVenders.map(() => generateRandomColor());

    setTransactionAmount(transAmount);
    setTransactionLabels(transVenders);
    setRandomColor(colors);
  }, [transactionData]);

  return (
    <div>
      <div className="w-[700px] h-[500px]">
        <Pie options={options} data={pieChartData} />
      </div>
    </div>
  );
}
