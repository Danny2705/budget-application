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
  barPercentage: 1.0,
  categoryPercentage: 1.0,
};

const BarData = {
  labels: ["January", "February", "March", "April", "May"],
  datasets: [
    {
      label: "Money Spent",
      data: [100, 2000, 400, 1100, 250],
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

export default function Barchart() {
  return (
    <div className="w-2/3 h-full py-10">
      <Bar options={options} data={BarData} />
    </div>
  );
}
