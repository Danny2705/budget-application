import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

export default function LineGraph() {
  const options = {
    responsive: true,
    plugins: {
      dataLabels: {
        display: false,
      },

      legend: {
        position: "top",
      },
    },

    scales: {
      y: {
        grid: {
          color: "grey",
        },
        ticks: {
          display: true,
        },
      },
      x: {
        grid: {
          color: "green",
        },
        ticks: {
          display: true,
        },
      },
    },
  };

  const LineGraphData = {
    labels: ["January", "February", "March", "April", "May"],
    datasets: [
      {
        label: "Money Spent",
        data: [100, 2000, 400, 1100, 250, 500, 400],
        fill: false,
        borderColor: "Green",
        backgroundColor: "rgb(255, 16, 240)",
        pointRadius: 1,
      },
      {
        label: "Budget Limit",
        data: [200, 1500, 500, 2000, 500, 550, 1000],
        fill: false,
        borderColor: "Red",
        backgroundColor: "rgb(255, 16, 240)",
        pointRadius: 1,
      },
    ],
  };

  return (
    <div className="w-2/3 h-full py-10">
      <Line options={options} data={LineGraphData} />
    </div>
  );
}
