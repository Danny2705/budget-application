import { Pie } from "react-chartjs-2";
import { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  plugins,
} from "chart.js";
import { transactionData } from "../TransactionTable/Data";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

export default function PieChart() {
  const [transactionLabels, setTransactionLabels] = useState([]);
  const [transactionAmount, setTransactionAmount] = useState([]);
  const [randomColor, setRandomColor] = useState([]);

  const options = {
    responsive: true,
    plugins: {
      datalabels: {
        color: "#fff",
        display: true,
        // reference from chatGPT: code was not modified
        formatter: (value, context) => {
          let sum = 0;
          const dataArr = context.chart.data.datasets[0].data;
          dataArr.forEach((data) => {
            sum += data;
          });
          const percentage = ((value * 100) / sum).toFixed(1) + "%";
          const digit = "$" + value;
          return digit + "\n" + percentage;
        },
      },
      legend: {
        position: "left",
      },
    },
  };

  const pieChartData = {
    labels: transactionLabels,
    datasets: [
      {
        label: "Money spent",
        data: transactionAmount,
        borderColor: "none",
        backgroundColor: randomColor,
        hoverOffset: 4,
      },
    ],
  };

  // Reference from ChatGPT: { i want to be able to iterate through transactions and sum the prices}
  useEffect(() => {
    // Create a map to hold the total amount for each category
    const categoryAmountMap = new Map();
    transactionData.forEach((transaction) => {
      const category = transaction.Category;
      const amount = parseFloat(transaction.Total);
      if (categoryAmountMap.has(category)) {
        categoryAmountMap.set(
          category,
          categoryAmountMap.get(category) + amount
        );
      } else {
        categoryAmountMap.set(category, amount);
      }
    });

    // Extract the unique categories and their corresponding total amounts
    const transCategories = Array.from(categoryAmountMap.keys());
    const transAmounts = Array.from(categoryAmountMap.values());

    const generateRandomColor = () => {
      const letters = "0123456789ABCDEF";
      let color = "#";
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    };

    const colors = transCategories.map(() => generateRandomColor());

    setTransactionLabels(transCategories);
    setTransactionAmount(transAmounts);
    setRandomColor(colors);
  }, []);

  return (
    <div>
      <div className="w-[700px] h-[500px]">
        <Pie options={options} data={pieChartData} />
      </div>
    </div>
  );
}
