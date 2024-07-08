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
  const { month, totalMoneySpent, totalBudgetLimit } = useExpenseData();
  const labels = Object.keys(totalMoneySpent);
  const spentData = labels.map((label) => totalMoneySpent[label]);

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Monthly Budget Analysis',
      },
      tooltip: {
        enabled: true,
        mode: 'index',
        intersect: false,
      },
      legend: {
        position: 'top',
      },
      datalabels: {
        anchor: 'end',
        align: 'top',
        formatter: (value) => `${value}`,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          color: 'white',
          text: 'Month',
        },
        grid: {
          display: false,
        },
      },
      y: {
        title: {
          display: true,
          color: 'white',
          text: 'Amount ($)',
        },
        grid: {
          display: true,
        },
      },
    },
    barPercentage: 0.8, // Adjust as needed to keep bars grouped
    categoryPercentage: 0.5, // Adjust to increase space between months
  };
  
  const defaultBarData = {
    labels: ["January", "February", "March", "April", "May"],
    datasets: [
      {
        label: "Money Spent",
        data: spentData,
        borderColor: "rgba(255, 0, 0, 1)",
        backgroundColor: "rgba(255, 0, 0, 0.5)",
      },
      {
        label: "Budget Limit",
        data: [200, 1500, 500, 2000, 500],
        borderColor: "rgba(0, 255, 0, 1)",
        backgroundColor: "rgba(0, 255, 0, 0.5)",
      },
    ],
  };

  return (
    <div className="w-2/3">
      <Bar options={options} data={defaultBarData} />
    </div>
  );
}
