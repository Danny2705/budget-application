import { Pie } from "react-chartjs-2";
import { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
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
        color: "black",
        display: true,
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
        position: "bottom",
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
        backgroundColor: [
          "#ffe6f2",
          "#ffccdd",
          "#ffb3c9",
          "#ff99b5",
          "#ff80a0",
          "#ff668c",
          "#ff4d78",
          "#ff3363",
          "#ff1a4f",
          "#ff003b",
        ],
        hoverOffset: 4,
      },
    ],
  };

  // Generate a range of pink shades from light to dark
  const generatePinkShades = (numShades) => {
    const shades = [];
    for (let i = 0; i < numShades; i++) {
      const ratio = i / (numShades - 1);
      const r = 255;
      const g = Math.floor(192 * (1 - ratio)); // Adjust green component
      const b = Math.floor(203 * (1 - ratio)); // Adjust blue component
      shades.push(`rgb(${r}, ${g}, ${b})`);
    }
    return shades;
  };

  useEffect(() => {
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

    const transCategories = Array.from(categoryAmountMap.keys());
    const transAmounts = Array.from(categoryAmountMap.values());

    const colors = generatePinkShades(transCategories.length);

    setTransactionLabels(transCategories);
    setTransactionAmount(transAmounts);
    setRandomColor(colors);
  }, []);

  return (
    <div className="flex justify-center align-middle"> 
      <div className="w-1/2">
        <Pie options={options} data={pieChartData} />
      </div>
    </div>
  );
}
