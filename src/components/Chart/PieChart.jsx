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

  // Generate shades of dark pink
  const generateDarkPinkShades = (numShades) => {
    const shades = [];
    for (let i = 0; i < numShades; i++) {
      // Generate shades by varying the red and blue values while keeping the green value low
      const r = 231 - i * 5;
      const g = 84 - i * 2;
      const b = 128 + i * 5;
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

    const colors = generateDarkPinkShades(transCategories.length);

    setTransactionLabels(transCategories);
    setTransactionAmount(transAmounts);
    setRandomColor(colors);
  }, []);

  return (
    <div>
      <div className="w-3/4">
        <Pie options={options} data={pieChartData} />
      </div>
    </div>
  );
}
