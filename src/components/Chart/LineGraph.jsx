// Reference: a) "Chart.js documentation for charts" - https://www.chartjs.org/docs/latest/charts/doughnut.html#pie b) ChatGPT refence chartjs-2
// NOT USED YET: TODO? change to a line chart
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
  scales,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

export default function LineGraph() {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  // const labels = ["January", "February", "March", "April", "May",];
  const LineGraphData = {
    labels: ["January", "February", "March", "April", "May"],
    datasets: [
      {
        label: "Money Spent",
        data: [100, 2000, 400, 1100, 250, 500, 400],
        fill: false,
        showLine: true,
        color: "white",
        borderColor: "Green",
        backgroundColor: "rgb(255, 16, 240)",
      }, {
        label: "Budget Limit",
        data: [200, 1500, 500, 2000, 500, 550, 1000],
        fill: false,
        showLine: true,
        borderColor: "Red",
        backgroundColor: "rgb(255, 16, 240)"
      }
    ],
    // Need fixing
    options: {
      scales: {
        y: {
          grid: {
            color: "white",
          },
        },
        x: {
          grid: {
            color: "white",
          },
        },
      },
    },
  };

  return (
    <div>
      <div className="w-[600px] h-[400px]">
        <div>
          <Line options={options} data={LineGraphData} />
        </div>
      </div>
    </div>
  );
}
