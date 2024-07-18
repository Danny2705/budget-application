import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import useExpenseData from "./BarData";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels,
  Filler
);

export default function Barchart() {
  const { labels, totalMoneySpent, totalBudgetLimit } = useExpenseData();
  const moneySpent = labels.map((month) => totalMoneySpent[month]);
  const budgetLimit = labels.map((month) => totalBudgetLimit[month]);

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Monthly Budget Analysis",
      },
      tooltip: {
        enabled: true,
        mode: "index",
        intersect: false,
      },
      legend: {
        position: "top",
      },
      datalabels: {
        anchor: "end",
        align: "top",
        formatter: (value) => `${value}`,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          color: "white",
          text: "Month",
          font: { size: 16 },
        },
        grid: {
          display: false,
        },
      },
      y: {
        title: {
          display: true,
          color: "white",
          text: "Amount ($)",
          font: { size: 16 },
        },
        grid: {
          display: true,
        },
      },
    },
    barPercentage: 1.0,
    categoryPercentage: 0.7,
  };

  const BarData = {
    labels: labels,
    datasets: [
      {
        label: "Money Spent",
        data: moneySpent,
        borderColor: "rgba(255, 0, 0, 1)",
        backgroundColor: "rgba(255, 0, 0, 0.5)",
      },
      {
        label: "Budget Limit",
        data: budgetLimit,
        borderColor: "rgba(0, 255, 0, 1)",
        backgroundColor: "rgba(0, 255, 0, 0.5)",
      },
    ],
  };

  return (
    <div className="w-2/3">
      <Bar options={options} data={BarData} />
    </div>
  );
}
